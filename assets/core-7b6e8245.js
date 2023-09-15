import{j as e}from"./index-c08745a0.js";import{E as R,v as _,c as b,m as j,U as $,x as I,h as L,M as z,R as D,P as q,i as A,y as F,F as T}from"./messenger-provider-716706b6.js";import{N as y}from"./NotImplemented-a8514140.js";import"./copyToClipboard-445aa5b6.js";const H="ppd-bottom-status";function U(){const{plugins:n,...u}=React.useContext(R),h=React.useMemo(()=>n.filter(o=>{var i;return(i=o.editor)==null?void 0:i.statusbar}).flatMap(o=>{var i;return((i=o.editor)==null?void 0:i.statusbar)??[]}),[n]);return e.jsx("div",{className:`monaco-editor ${H}`,children:h.map((o,i)=>e.jsx(o,{...u},i))})}const O="/app/assets/PP_P-929f1e81.svg",P="ppd-left-bar";function W(n){const{activePanel:u,togglePanel:h}=_(),{plugins:o}=React.useContext(R),i=React.useMemo(()=>o.filter(t=>{var m;return(m=t.editor)==null?void 0:m.leftbar}).flatMap(t=>{var m;return((m=t.editor)==null?void 0:m.leftbar)??[]}),[o]),c=React.useMemo(()=>i.filter(t=>t.placement===void 0||t.placement==="top"),[i]),v=React.useMemo(()=>i.filter(t=>t.placement==="bottom"),[i]),g=t=>t.map(({id:m,icon:C})=>e.jsx("button",{className:b({active:(u==null?void 0:u.id)===m}),onClick:()=>h(m),children:typeof C=="string"?e.jsx("span",{className:`cldr codicon codicon-${C}`}):C},m));return e.jsxs("div",{className:b(P,n.className),style:n.style,children:[e.jsxs("div",{className:`${P}__top`,children:[g(c),e.jsx("button",{onClick:()=>j.then(t=>t.display("warning",e.jsx(y,{}))),children:e.jsx("span",{className:"cldr codicon codicon-heart"})}),e.jsx("button",{onClick:()=>j.then(t=>t.display("warning",e.jsx(y,{}))),children:e.jsx("span",{className:"cldr codicon codicon-source-control"})}),e.jsx("button",{onClick:()=>j.then(t=>t.display("warning",e.jsx(y,{}))),children:e.jsx("span",{className:"cldr codicon codicon-book"})}),e.jsx("button",{onClick:()=>j.then(t=>t.display("warning",e.jsx(y,{}))),children:e.jsx("span",{className:"cldr codicon codicon-extensions"})})]}),e.jsxs("div",{className:`${P}__bottom`,children:[g(v),e.jsx("button",{onClick:()=>j.then(t=>t.display("warning",e.jsx(y,{}))),children:e.jsx("span",{className:"cldr codicon codicon-account"})}),e.jsx("button",{onClick:()=>j.then(t=>t.display("warning",e.jsx(y,{}))),children:e.jsx("span",{className:"cldr codicon codicon-gear"})}),e.jsx("img",{src:O,alt:"Power Playground menu icon."})]})]})}const Y="ppd-top-bar";function Z({className:n}){const{plugins:u,...h}=React.useContext(R),o=React.useMemo(()=>u.filter(i=>{var c;return(c=i.editor)==null?void 0:c.topbar}).flatMap(i=>{var c;return((c=i.editor)==null?void 0:c.topbar)??[]}),[u]);return e.jsx("div",{className:b(Y,n),children:o.map((i,c)=>e.jsx(i,{...h},c))})}const w="ppd-editor-zone";function X(n){const{enableMenuSwitch:u=!0}=n,h=React.useRef(new URLSearchParams(location.search)),[o,i]=React.useState(null),c=React.useMemo(()=>Object.values(n.plugins??{}).filter(a=>!!a),[n.plugins]),v=c.reduce((a,s)=>{var r,l;return{...a,...(l=(r=s.editor)==null?void 0:r.use)==null?void 0:l.reduce((p,f)=>({...p,...f==null?void 0:f({searchParams:h.current,editor:o})}),{})}},{}),{code:g,setCode:t,loadingNode:m,curFilePath:C,language:k}=v;if(t===void 0)throw new Error("You must register a plugin to provide `setCode` function");const d=$();React.useEffect(()=>{if(!d)return;const a=c.map(s=>{var r,l;return(l=(r=s==null?void 0:s.editor)==null?void 0:r.preload)==null?void 0:l.call(r,d)});return()=>a.forEach(s=>s==null?void 0:s())},[d,c]),React.useEffect(()=>{if(!d||!o)return;const a=o;try{d.editor.addKeybindingRule({keybinding:d.KeyMod.CtrlCmd|d.KeyMod.Shift|d.KeyCode.KeyP,command:"editor.action.quickCommand"})}catch(s){console.error(s);const r=a._standaloneKeybindingService.getKeybindings(),l=r.findIndex(p=>p.command==="editor.action.quickCommand");l!==-1&&r.splice(l,1),a._standaloneKeybindingService.addDynamicKeybinding("editor.action.quickCommand",d.KeyMod.CtrlCmd|d.KeyMod.Shift|d.KeyCode.KeyP,()=>{o.trigger("whatever","editor.action.quickCommand",{})})}},[o,d]),c.forEach(a=>{var s,r;return(r=(s=a==null?void 0:a.editor)==null?void 0:s.useShare)==null?void 0:r.call(s,v,d)});const[S,M]=React.useState("light");React.useEffect(()=>onThemeChange(M),[]);const[x,E]=jotai.useAtom(I),K=React.useRef(null);React.useEffect(()=>{if(o)return o.setPosition(K.current??{lineNumber:1,column:1}),o.focus(),()=>{K.current=o.getPosition()??null}},[k,o]),React.useEffect(()=>{if(!d||!o)return;const a=c.map(s=>{var l,p;const r=(p=(l=s==null?void 0:s.editor)==null?void 0:l.load)==null?void 0:p.call(l,o,d);if(typeof r=="function")return r;if(Array.isArray(r))return r.reduce((f,N)=>()=>(f==null||f(),N==null?void 0:N()),()=>{})});return()=>a.forEach(s=>s==null?void 0:s())},[d,o,c]),L("keydown",a=>{a.key==="\\"&&(a.metaKey||a.ctrlKey)&&E(!x)});const B=React.useMemo(()=>jotai.createStore(),[]);return e.jsx(R.Provider,{value:{searchParams:h.current,plugins:c,shareState:v},children:e.jsx(z.Provider,{value:{monaco:d,editorInstance:o,store:{code:[g,t],theme:[S,M]}},children:e.jsx(jotai.Provider,{store:B,children:e.jsxs(D,{className:b(w,n.className),style:{...n.style,"--border-scale":5,width:"var(--editor-width, 50%)",minWidth:"var(--editor-min-width)",maxWidth:"var(--editor-max-width)",height:"var(--editor-height, 50%)",minHeight:"var(--editor-min-height)",maxHeight:"var(--editor-max-height)"},resizable:n.resizable??{right:!0},onBorderBtnClick:n.onBorderBtnClick,children:[u&&e.jsx(q,{placement:"right",className:b(`${w}__menu-switch`,{"is-active":x}),content:e.jsxs(e.Fragment,{children:[x?"Hide activity bar":"Show activity bar",e.jsx("br",{}),e.jsxs("kbd",{children:[A?"⌘":"Ctrl"," + \\"]})]}),onClick:()=>E(!x),children:e.jsx("span",{className:b("cldr codicon",x?"codicon-menu":"codicon-layout-activitybar-left")})}),e.jsx(W,{style:{width:x?void 0:0,padding:x?void 0:0}}),e.jsx(F,{}),e.jsxs("div",{className:`${w}__container`,children:[e.jsx(Z,{className:u&&x?"is-active":void 0}),m??e.jsx(T,{language:k,options:{automaticLayout:!0,scrollbar:{vertical:"hidden",verticalSliderSize:0,verticalScrollbarSize:0}},theme:S==="light"?"vs":"vs-dark",loading:m,path:`file://${C}`,value:g,onChange:a=>t(a??""),onMount:a=>(i(a),a.focus())}),e.jsx(U,{})]})]})})})})}function ee(n){return n??{}}export{X as E,ee as d};
