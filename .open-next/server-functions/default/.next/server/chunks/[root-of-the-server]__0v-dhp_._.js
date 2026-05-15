module.exports=[7682,e=>{"use strict";var t=e.i(2157),a=e.i(50227);let n=a.default.join(process.cwd(),"src/lib/templates/skills");function r(e){let t=/^---\s*\r?\n([\s\S]*?)\r?\n---\s*\r?\n?([\s\S]*)$/m.exec(e);if(!t)return{fm:{},body:e};let a=t[1],n=t[2]??"",r={};for(let e of a.split(/\r?\n/)){let t=/^([a-zA-Z_][a-zA-Z0-9_]*)\s*:\s*(.*)$/.exec(e);if(!t)continue;let a=t[1],n=t[2].trim();switch((n.startsWith('"')&&n.endsWith('"')||n.startsWith("'")&&n.endsWith("'"))&&(n=n.slice(1,-1).replace(/\\"/g,'"')),a){case"featured":{let e=Number(n);Number.isFinite(e)&&(r.featured=e);break}case"recommended":{let e=Number(n);Number.isFinite(e)&&(r.recommended=e);break}case"tags":{let e=/^\[(.*)\]$/.exec(n);e&&(r.tags=e[1].split(",").map(e=>e.trim().replace(/^["']|["']$/g,"")).map(e=>e.replace(/\\"/g,'"')).filter(Boolean));break}case"name":case"zh_name":case"en_name":case"emoji":case"description":case"category":case"scenario":case"aspect_hint":case"example_id":case"example_name":case"example_format":case"example_tagline":case"example_desc":case"example_source_url":case"example_source_label":r[a]=n}}return{fm:r,body:n.trim()}}function i(e){try{return t.default.readFileSync(e,"utf8")}catch{return}}function o(e,t,a,n){let r={id:e,zhName:t.zh_name??t.name??e,enName:t.en_name??e,emoji:t.emoji??"✨",description:t.description??"",category:t.category??"other",scenario:t.scenario??"marketing",aspectHint:t.aspect_hint??"",tags:Array.isArray(t.tags)?t.tags:[]};return"number"==typeof t.featured&&(r.featured=t.featured),"number"==typeof t.recommended&&(r.recommended=t.recommended),(t.example_id||n||a)&&(r.example={id:t.example_id??`example-${e}`,name:t.example_name??`${r.zhName} 示例`,format:t.example_format??"markdown",tagline:t.example_tagline??"",desc:t.example_desc??"",hasHtml:a,hasMd:n,...t.example_source_url?{source:{url:t.example_source_url,label:t.example_source_label??t.example_source_url}}:{}}),r}let l=null;function s(e){return/^[a-z0-9][a-z0-9-]*$/i.test(e)}e.s(["listSkills",0,function(){if(l)return l;let e=[],d=[];try{d=t.default.readdirSync(n,{withFileTypes:!0})}catch{return e}for(let l of d){if(!l.isDirectory())continue;let d=l.name;if(!s(d))continue;let c=a.default.join(n,d),u=i(a.default.join(c,"SKILL.md"));if(!u)continue;let{fm:p}=r(u),m=t.default.existsSync(a.default.join(c,"example.html")),f=t.default.existsSync(a.default.join(c,"example.md"));e.push(o(d,p,m,f))}return l=e,e},"loadSkill",0,function(e){if(!s(e))return null;let t=a.default.join(n,e),l=i(a.default.join(t,"SKILL.md"));if(!l)return null;let{fm:d,body:c}=r(l),u=i(a.default.join(t,"example.md")),p=i(a.default.join(t,"example.html"));return{...o(e,d,!!p,!!u),body:c,exampleMd:u,exampleHtml:p}}])},38986,e=>{"use strict";var t=e.i(13454),a=e.i(89464),n=e.i(25887),r=e.i(6275),i=e.i(91338),o=e.i(53896),l=e.i(5370),s=e.i(9325),d=e.i(76784),c=e.i(90061),u=e.i(46838),p=e.i(5005),m=e.i(69111),f=e.i(25362),h=e.i(41109),g=e.i(93695);e.i(92512);var v=e.i(7591),x=e.i(56796),R=e.i(7682);let y=`
你是世界级的视觉设计师 + 资深前端工程师。请输出一份**自包含的单文件 HTML**，要求：

【内容驱动数量 — 最高优先级, 覆盖模板里的任何数字】
- 模板只定义"可用版面 / 风格 / 配色 / 字体 / 组件库", **不定义** slide / 帧 / 卡片 / section 的数量。
- 输出的 slide / frame / card / section 数量**完全由【用户内容】的实际长度和信息结构决定**。必须**完整覆盖**用户内容的每一个要点、章节、数据组, **不许总结、压缩、丢弃信息**。
- 如果模板正文里写了类似"挑 6-10 张组成 deck / 输出 6-10 帧 / 3-6 张卡片"的数字, **一律视为短示例下的参考下限, 不是上限**。短内容可以低于该范围, 长内容应远超该范围 — 用户给了 12k 字符的内容, 输出 4-6 张是**严重错误**。
- 模板里的"22 个锁死版面 / 10 个磁带式版面 / N 个 layout"指的是**可复用的版式池**, 同一个版式允许在不同内容上多次出现 (例如 KPI Tower 可以连续用 3 次承载不同章节的数据), 不是页数上限。
- 推荐做法: 先把【用户内容】按语义切成若干段 (章节标题 / 论点 / 数据组 / 列表项 / 步骤), 每一段 → 至少一个独立的 slide / section / card, 然后再从模板的版式池里给每一段挑最合适的版面。宁可多页也不要把多个独立要点硬塞进一页。

【硬性技术要求】
- **禁止使用 Write / Edit / MultiEdit / Bash / Create / 任何文件系统工具**。不要把 HTML 写到任何 \`.html\` 文件里。前端直接捕获你的 stdout 文本, 文件落盘由前端负责。
- 直接把完整的 HTML 文档作为助手回复的正文流式输出。不要先说"我来生成"、"已输出至 …"之类的话。
- 文档以 \`<!DOCTYPE html>\` 开头, 末尾以 \`</html>\` 结束。
- 在 \`<head>\` 中通过 CDN 引入 Tailwind v3 Play (https://cdn.tailwindcss.com) 与所需的 Google Fonts。
- 不要引用任何外部图片 URL（除非你能保证 URL 长期有效；优先使用 CSS / SVG 内联绘制）。
- 必要的脚本（图表、动画）通过 jsdelivr CDN 引入；保持单文件可双击打开即用。
- 输出**纯 HTML**, 不要用 markdown 代码围栏包裹, 不要任何解释性文字。第一个字符必须是 \`<\`。

【设计准则 — 世界级标准】
- 排版: 中文优先 \`Noto Sans SC\` / \`Noto Serif SC\`, 英文 \`Inter\` / \`Manrope\` / \`SF Pro\` 风格。
- 色彩: 使用 1 个主色 + 2 个中性色 + 至多 1 个强调色; 大胆留白; 不使用纯黑纯白 (#000/#fff), 改用 \`#0a0a0a\` / \`#fafafa\`。
- 网格: 8 px 基线; 段落最大宽度 65 ch; 标题与正文有清晰的层级。
- 微观细节: 圆角统一 (rounded-xl/2xl), 投影柔和 (shadow-sm/lg), 边框 1px \`#e5e7eb\` / \`#262626\`。
- 动效: 仅在必要处使用 \`transition-all\` 或入场 fade-in; 不要喧宾夺主。
- 无障碍: 颜色对比度 ≥ 4.5; 重要交互有 focus 态。

【内容真实性】
- **必须使用用户提供的真实数据**, 不要编造、不要 lorem ipsum、不要 "Your text here"。
- 如果用户数据是结构化数据 (CSV/JSON), 请提取关键洞察并以图表/表格呈现。
- 中文与英文混排时, 中英文之间留半角空格 (盘古之白)。

`;async function w(e){var t,a;let n,r;try{n=await e.json()}catch{return new Response("invalid JSON body",{status:400})}let{agent:i,templateId:o,content:l,format:s="text",model:d,cwd:c,binOverride:u,editFromHtml:p,editFromContent:m}=n;if(!i||!o||!l)return new Response("missing required fields: agent, templateId, content",{status:400});let f=(0,R.loadSkill)(o);if(!f)return new Response(`unknown template: ${o}`,{status:400});p&&m?(t={templateName:f.zhName,templateAspect:f.aspectHint,newContent:l,oldContent:m,oldHtml:p,format:s},r=`你正在执行一次**最小化差异编辑** (diff-edit), 不是从 0 重新生成。

模板风格: ${t.templateName} (${t.templateAspect})
输入格式: ${t.format}

【硬性规则】
1. 仅输出完整的、修改后的 HTML。第一个字符必须是 \`<\`, 最后必须是 \`</html>\`。
2. **不要**用 markdown 围栏包裹, 不要任何解释性文字。
3. **禁止使用 Write / Edit / MultiEdit / Bash 等文件工具** — HTML 必须直接在助手回复正文里流式输出, 不要存到 \`.html\` 文件再回复"已输出至 …"。
4. 保留原 HTML 的 \`<head>\` (CDN / 字体 / 样式 / meta), 保留所有不需要变化的 DOM 结构 — 字体、配色、布局、栅格、组件结构、动画都不许改。
5. 仅根据 "旧内容 vs 新内容" 的差异, 替换或调整对应的文字 / 数据节点。
6. 如果新内容增加了条目, 沿用原有的卡片 / 行 / slide / 章节结构添加; 如果删除了条目, 移除对应的元素。
7. 如果新旧内容只差几个字, 也只改那几个字 — 不要顺手 "优化" 或 "重排"。
8. 不要捏造数据。新内容里没有的就不要写。

【旧内容】
${t.oldContent}

【新内容】
${t.newContent}

【已有 HTML — 请基于此修改, 输出完整的修改后版本】
${t.oldHtml}
`):(a={body:f.body,content:l,format:s},r=`${y}
${a.body.trim()}

【输入格式】: ${a.format}
【用户内容】:
${a.content}
`);let h=new AbortController;e.signal?.addEventListener("abort",()=>h.abort(),{once:!0});let g=(0,x.invokeAgent)({agent:i,prompt:r,model:d,cwd:c,binOverride:u,signal:h.signal});return new Response(new ReadableStream({async start(e){let t=new TextEncoder,a=!1,n=(n,r)=>{if(!a)try{e.enqueue(t.encode(`event: ${n}
data: ${JSON.stringify(r)}

`))}catch{a=!0}},r=g.getReader();try{for(;;){let{value:e,done:t}=await r.read();if(t)break;e&&n(e.type,e)}}catch(e){n("error",{message:e instanceof Error?e.message:String(e)})}finally{a=!0;try{e.close()}catch{}}},cancel(){h.abort()}}),{headers:{"Content-Type":"text/event-stream; charset=utf-8","Cache-Control":"no-cache, no-transform",Connection:"keep-alive","X-Accel-Buffering":"no"}})}e.s(["POST",0,w,"dynamic",0,"force-dynamic","runtime",0,"nodejs"],86730);var C=e.i(86730);let _=new t.AppRouteRouteModule({definition:{kind:a.RouteKind.APP_ROUTE,page:"/api/convert/route",pathname:"/api/convert",filename:"route",bundlePath:""},distDir:".next",relativeProjectDir:"",resolvedPagePath:"[project]/src/app/api/convert/route.ts",nextConfigOutput:"standalone",userland:C,...{}}),{workAsyncStorage:b,workUnitAsyncStorage:E,serverHooks:S}=_;async function N(e,t,n){n.requestMeta&&(0,r.setRequestMeta)(e,n.requestMeta),_.isDev&&(0,r.addRequestMeta)(e,"devRequestTimingInternalsEnd",process.hrtime.bigint());let x="/api/convert/route";x=x.replace(/\/index$/,"")||"/";let R=await _.prepare(e,t,{srcPage:x,multiZoneDraftMode:!1});if(!R)return t.statusCode=400,t.end("Bad Request"),null==n.waitUntil||n.waitUntil.call(n,Promise.resolve()),null;let{buildId:y,deploymentId:w,params:C,nextConfig:b,parsedUrl:E,isDraftMode:S,prerenderManifest:N,routerServerContext:A,isOnDemandRevalidate:T,revalidateOnlyGenerated:k,resolvedPathname:P,clientReferenceManifest:H,serverActionsManifest:$}=R,M=(0,l.normalizeAppPath)(x),O=!!(N.dynamicRoutes[M]||N.routes[P]),j=async()=>((null==A?void 0:A.render404)?await A.render404(e,t,E,!1):t.end("This page could not be found"),null);if(O&&!S){let e=!!N.routes[P],t=N.dynamicRoutes[M];if(t&&!1===t.fallback&&!e){if(b.adapterPath)return await j();throw new g.NoFallbackError}}let I=null;!O||_.isDev||S||(I="/index"===(I=P)?"/":I);let q=!0===_.isDev||!O,L=O&&!q;$&&H&&(0,o.setManifestsSingleton)({page:x,clientReferenceManifest:H,serverActionsManifest:$});let D=e.method||"GET",U=(0,i.getTracer)(),F=U.getActiveScopeSpan(),K=!!(null==A?void 0:A.isWrappedByNextServer),z=!!(0,r.getRequestMeta)(e,"minimalMode"),B=(0,r.getRequestMeta)(e,"incrementalCache")||await _.getIncrementalCache(e,b,N,z);null==B||B.resetRequestCache(),globalThis.__incrementalCache=B;let W={params:C,previewProps:N.preview,renderOpts:{experimental:{authInterrupts:!!b.experimental.authInterrupts},cacheComponents:!!b.cacheComponents,supportsDynamicResponse:q,incrementalCache:B,cacheLifeProfiles:b.cacheLife,waitUntil:n.waitUntil,onClose:e=>{t.on("close",e)},onAfterTaskError:void 0,onInstrumentationRequestError:(t,a,n,r)=>_.onRequestError(e,t,n,r,A)},sharedContext:{buildId:y,deploymentId:w}},G=new s.NodeNextRequest(e),V=new s.NodeNextResponse(t),X=d.NextRequestAdapter.fromNodeNextRequest(G,(0,d.signalFromNodeResponse)(t));try{let r,o=async e=>_.handle(X,W).finally(()=>{if(!e)return;e.setAttributes({"http.status_code":t.statusCode,"next.rsc":!1});let a=U.getRootSpanAttributes();if(!a)return;if(a.get("next.span_type")!==c.BaseServerSpan.handleRequest)return void console.warn(`Unexpected root span type '${a.get("next.span_type")}'. Please report this Next.js issue https://github.com/vercel/next.js`);let n=a.get("next.route");if(n){let t=`${D} ${n}`;e.setAttributes({"next.route":n,"http.route":n,"next.span_name":t}),e.updateName(t),r&&r!==e&&(r.setAttribute("http.route",n),r.updateName(t))}else e.updateName(`${D} ${x}`)}),l=async r=>{var i,l;let s=async({previousCacheEntry:a})=>{try{if(!z&&T&&k&&!a)return t.statusCode=404,t.setHeader("x-nextjs-cache","REVALIDATED"),t.end("This page could not be found"),null;let i=await o(r);e.fetchMetrics=W.renderOpts.fetchMetrics;let l=W.renderOpts.pendingWaitUntil;l&&n.waitUntil&&(n.waitUntil(l),l=void 0);let s=W.renderOpts.collectedTags;if(!O)return await (0,p.sendResponse)(G,V,i,W.renderOpts.pendingWaitUntil),null;{let e=await i.blob(),t=(0,m.toNodeOutgoingHttpHeaders)(i.headers);s&&(t[h.NEXT_CACHE_TAGS_HEADER]=s),!t["content-type"]&&e.type&&(t["content-type"]=e.type);let a=void 0!==W.renderOpts.collectedRevalidate&&!(W.renderOpts.collectedRevalidate>=h.INFINITE_CACHE)&&W.renderOpts.collectedRevalidate,n=void 0===W.renderOpts.collectedExpire||W.renderOpts.collectedExpire>=h.INFINITE_CACHE?void 0:W.renderOpts.collectedExpire;return{value:{kind:v.CachedRouteKind.APP_ROUTE,status:i.status,body:Buffer.from(await e.arrayBuffer()),headers:t},cacheControl:{revalidate:a,expire:n}}}}catch(t){throw(null==a?void 0:a.isStale)&&await _.onRequestError(e,t,{routerKind:"App Router",routePath:x,routeType:"route",revalidateReason:(0,u.getRevalidateReason)({isStaticGeneration:L,isOnDemandRevalidate:T})},!1,A),t}},d=await _.handleResponse({req:e,nextConfig:b,cacheKey:I,routeKind:a.RouteKind.APP_ROUTE,isFallback:!1,prerenderManifest:N,isRoutePPREnabled:!1,isOnDemandRevalidate:T,revalidateOnlyGenerated:k,responseGenerator:s,waitUntil:n.waitUntil,isMinimalMode:z});if(!O)return null;if((null==d||null==(i=d.value)?void 0:i.kind)!==v.CachedRouteKind.APP_ROUTE)throw Object.defineProperty(Error(`Invariant: app-route received invalid cache entry ${null==d||null==(l=d.value)?void 0:l.kind}`),"__NEXT_ERROR_CODE",{value:"E701",enumerable:!1,configurable:!0});z||t.setHeader("x-nextjs-cache",T?"REVALIDATED":d.isMiss?"MISS":d.isStale?"STALE":"HIT"),S&&t.setHeader("Cache-Control","private, no-cache, no-store, max-age=0, must-revalidate");let c=(0,m.fromNodeOutgoingHttpHeaders)(d.value.headers);return z&&O||c.delete(h.NEXT_CACHE_TAGS_HEADER),!d.cacheControl||t.getHeader("Cache-Control")||c.get("Cache-Control")||c.set("Cache-Control",(0,f.getCacheControlHeader)(d.cacheControl)),await (0,p.sendResponse)(G,V,new Response(d.value.body,{headers:c,status:d.value.status||200})),null};K&&F?await l(F):(r=U.getActiveScopeSpan(),await U.withPropagatedContext(e.headers,()=>U.trace(c.BaseServerSpan.handleRequest,{spanName:`${D} ${x}`,kind:i.SpanKind.SERVER,attributes:{"http.method":D,"http.target":e.url}},l),void 0,!K))}catch(t){if(t instanceof g.NoFallbackError||await _.onRequestError(e,t,{routerKind:"App Router",routePath:M,routeType:"route",revalidateReason:(0,u.getRevalidateReason)({isStaticGeneration:L,isOnDemandRevalidate:T})},!1,A),O)throw t;return await (0,p.sendResponse)(G,V,new Response(null,{status:500})),null}}e.s(["handler",0,N,"patchFetch",0,function(){return(0,n.patchFetch)({workAsyncStorage:b,workUnitAsyncStorage:E})},"routeModule",0,_,"serverHooks",0,S,"workAsyncStorage",0,b,"workUnitAsyncStorage",0,E],38986)},82848,e=>{e.v(e=>Promise.resolve().then(()=>e(74533)))}];

//# sourceMappingURL=%5Broot-of-the-server%5D__0v-dhp_._.js.map