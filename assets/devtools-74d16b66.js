import{j as x,a as W,b as j,g as $}from"./index-c08745a0.js";import{e as m}from"./messenger-provider-716706b6.js";import{i as R}from"./plugins/core/outputs/index-56ac0f40.js";import"./preload-helper-75e41364.js";window.require=function(e){throw new Error(`Cannot find module '${e}'`)};function w({code:e,lang:s,devtoolsWindow:{simport:n}}){const[o,r]=React.useState(void 0);n("ui/components/code_highlighter/CodeHighlighter.js").then(({highlightNode:i})=>r(()=>i));const t=React.useRef(null);return React.useEffect(()=>{const i=t.current;i&&(i.textContent=e,o==null||o(i,`text/${s}`))},[e,s,o]),x.jsx("pre",{ref:t,style:{cursor:"text",userSelect:"text",whiteSpace:"pre-wrap",margin:"0",padding:"0 4px"}})}let d=[];function b(e){d=e,l.forEach(s=>s(d))}const l=[],y=e=>(l.push(e),m.send("compile"),()=>{const s=l.indexOf(e);l.splice(s,1)});function E(){return React.useSyncExternalStore(y,()=>d)}function P({UI:e,devtoolsWindow:{simport:s}}){const n=E(),o=React.useMemo(()=>n.find(({name:t})=>t.endsWith("(compile error)")),[n]),r=React.useMemo(()=>o?n.filter(({name:t})=>t.endsWith("(compile error)")).map(({text:t})=>t).join(`

`):n.filter(({name:t})=>t.endsWith(".js")).map(({name:t,text:i,editorText:a,tsCompilerResultText:h})=>`// @filename:${t}
${a.match(/^\/\/ @devtools.output.compiled\r?\n/)?i:h}`).join(`

`),[o,n]);return x.jsx(w,{code:r,lang:o?"text":"javascript",devtoolsWindow:{simport:s}})}function C({UI:e,devtoolsWindow:{simport:s}}){const n=E();return x.jsx(w,{code:React.useMemo(()=>n.filter(({name:o})=>o.endsWith(".d.ts")).map(({name:o,text:r})=>`// @filename:${o}
${r}`).join(`

`),[n]),lang:"typescript",devtoolsWindow:{simport:s}})}const{babelTransformOptions:H={}}=$(R)??{},F=W({panels:[j("outputs.js",".JS","react",P),j("outputs.d.ts",".D.TS","react",C)],load(){let e;function s(r){const t=e;e=()=>{t==null||t(),r==null||r()}}const n=m.on("run",()=>{d.forEach(({name:r,text:t})=>{if(r==="/index.js")try{e==null||e(),s((0,eval)(`(function () { const module = { exports: {} }; const exports = module.exports; ${t}; return module.exports; })()`).dispose)}catch(i){console.error(i)}})}),o=m.on("compile-completed",r=>{const i=Object.entries(r).reduce((a,[h,{originalText:u,outputFiles:S}])=>a.concat(S.map(({name:c,text:f,tsCompilerResultText:p})=>{var g;if(c.endsWith(".js")){c=c.slice(7);try{return{name:c,text:((g=Babel.transform(f,{presets:["es2015"],...H,filename:c}))==null?void 0:g.code)??"",editorText:u,tsCompilerResultText:p}}catch(v){return{name:`${c} (compile error)`,originalText:f,text:v.message,editorText:u,tsCompilerResultText:p}}}return{name:c,text:f,editorText:u,tsCompilerResultText:p}})),[]);b(i)});return()=>{n==null||n(),o==null||o(),e==null||e()}}});export{F as default};
