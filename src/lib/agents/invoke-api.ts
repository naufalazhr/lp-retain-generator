import { type InvokeEvent } from "./invoke";

export type ApiAgentConfig = {
  id: string;
  endpoint: string;
  apiKeyEnv: string;
  defaultModel: string;
};

export const API_AGENTS: Record<string, ApiAgentConfig> = {
  byteplus: {
    id: "byteplus",
    endpoint: "https://ark.cn-beijing.volces.com/api/v3/responses",
    apiKeyEnv: "BYTEPLUS_API_KEY",
    defaultModel: "seed-2-0-pro-260328",
  },
};

export type ApiInvokeOpts = {
  agent: string;
  prompt: string;
  model?: string;
  signal?: AbortSignal;
};

type SseEvent =
  | { type: "response.output_text.delta"; delta: string }
  | { type: "response.completed"; response: { model?: string; usage?: { total_tokens?: number; completion_tokens?: number; prompt_tokens?: number }; output_text?: string } }
  | { type: "error"; error?: { message?: string; code?: string } }
  | { type: "response.output_item.done" | "response.created" | "response.in_progress" };

export function invokeApiAgent(opts: ApiInvokeOpts): ReadableStream<InvokeEvent> {
  const cfg = API_AGENTS[opts.agent];
  if (!cfg) {
    return errorStream(`unknown api agent: ${opts.agent}`);
  }
  const apiKey = (process.env[cfg.apiKeyEnv] ?? "").trim();
  if (!apiKey) {
    return errorStream(
      `${cfg.apiKeyEnv} environment variable is not set.`,
    );
  }
  const model = opts.model && opts.model !== "default" ? opts.model : cfg.defaultModel;

  return new ReadableStream<InvokeEvent>({
    async start(controller) {
      let closed = false;
      const safeEnqueue = (ev: InvokeEvent) => {
        if (closed) return;
        try { controller.enqueue(ev); } catch { closed = true; }
      };
      const safeClose = () => {
        if (closed) return;
        closed = true;
        try { controller.close(); } catch {}
      };

      safeEnqueue({
        type: "start",
        bin: `${cfg.id} (API)`,
        argv: [`POST ${cfg.endpoint}`, "--model", model],
        promptBytes: Buffer.byteLength(opts.prompt, "utf8"),
      });

      const controller2 = new AbortController();
      const onAbort = () => controller2.abort();
      opts.signal?.addEventListener("abort", onAbort, { once: true });

      try {
        const res = await fetch(cfg.endpoint, {
          method: "POST",
          headers: {
            "Content-Type": "application/json; charset=utf-8",
            Authorization: `Bearer ${apiKey}`,
          },
          body: JSON.stringify({ model, input: opts.prompt, stream: true }),
          signal: controller2.signal,
        });

        if (!res.ok) {
          const text = await res.text().catch(() => "");
          safeEnqueue({ type: "error", message: `API ${res.status}: ${text.slice(0, 500) || res.statusText}` });
          safeClose();
          return;
        }

        const reader = res.body?.getReader();
        if (!reader) {
          safeEnqueue({ type: "error", message: "No response body" });
          safeClose();
          return;
        }
        const dec = new TextDecoder();
        let buf = "";
        let usage: { total_tokens?: number; completion_tokens?: number; prompt_tokens?: number } | undefined;

        while (true) {
          const { value, done } = await reader.read();
          if (done) break;
          buf += dec.decode(value, { stream: true });

          while (true) {
            const nl = buf.indexOf("\n");
            if (nl === -1) break;
            const line = buf.slice(0, nl).trim();
            buf = buf.slice(nl + 1);
            if (!line || !line.startsWith("data:")) continue;
            const payload = line.slice(5).trim();
            if (!payload || payload === "[DONE]") continue;

            try {
              const obj = JSON.parse(payload) as SseEvent;

              if (obj.type === "response.output_text.delta" && obj.delta) {
                safeEnqueue({ type: "delta", text: obj.delta });
              }
              if (obj.type === "response.completed" && obj.response) {
                if (obj.response.model) {
                  safeEnqueue({ type: "meta", key: "model", value: obj.response.model });
                }
                usage = obj.response.usage;
                if (usage) {
                  safeEnqueue({ type: "meta", key: "usage", value: usage });
                }
              }
            } catch {
              // skip unparseable chunks
            }
          }
        }
      } catch (err) {
        if ((err as Error).name !== "AbortError") {
          safeEnqueue({ type: "error", message: err instanceof Error ? err.message : String(err) });
        }
      } finally {
        opts.signal?.removeEventListener("abort", onAbort);
        safeEnqueue({ type: "done", code: 0 });
        safeClose();
      }
    },
    cancel() {},
  });
}

function errorStream(message: string): ReadableStream<InvokeEvent> {
  return new ReadableStream<InvokeEvent>({
    start(controller) {
      controller.enqueue({ type: "error", message });
      controller.close();
    },
  });
}
