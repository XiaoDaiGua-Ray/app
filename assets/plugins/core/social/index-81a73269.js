import{j as e,d}from"../../../index-c08745a0.js";import{d as m,P as p,i as x,m as h,b as o}from"../../../messenger-provider-716706b6.js";import{N as u}from"../../../NotImplemented-a8514140.js";const j="social__share",_=()=>{const[r,t]=React.useState(null),{popper:l,visible:c,changeVisible:i,whenClickOtherAndHide:a}=m({referenceElement:r,className:"ppd-contextmenu",content:e.jsxs(e.Fragment,{children:[e.jsxs("div",{className:"ppd-contextmenu__item",tabIndex:0,children:[e.jsx("span",{className:"cldr codicon codicon-issues"}),"Copy as Markdown Issue"]}),e.jsxs("div",{className:"ppd-contextmenu__item",tabIndex:0,children:[e.jsx("span",{className:"cldr codicon codicon-link"}),"Copy as Markdown Link"]}),e.jsxs("div",{className:"ppd-contextmenu__item",tabIndex:0,children:[e.jsx("span",{className:"cldr codicon codicon-file-media"}),"Copy as Markdown with Image"]}),e.jsxs("div",{className:"ppd-contextmenu__item",tabIndex:0,children:[e.jsx("span",{className:"cldr codicon codicon-twitter"}),"Share to Twitter"]}),e.jsxs("div",{className:"ppd-contextmenu__item",tabIndex:0,children:[e.jsx("span",{children:"□"}),"Open in CodeSandbox"]}),e.jsxs("div",{className:"ppd-contextmenu__item",tabIndex:0,children:[e.jsx("span",{children:"⚡️"}),"Open in StackBlitz"]})]}),placement:"right-start",arrowVisible:!1});return React.useEffect(()=>{function n(s){a(s),removeEventListener("click",n)}if(c){const s=setTimeout(()=>addEventListener("click",n),100);return()=>{clearTimeout(s),removeEventListener("click",n)}}},[a,c]),e.jsxs(e.Fragment,{children:[l,e.jsxs(p,{className:j,style:{order:-99},placement:"top",content:e.jsxs(e.Fragment,{children:["Share to Social   ",e.jsxs("kbd",{children:[x?"⌘":"Ctrl"," + SHIFT + S"]}),e.jsx("br",{}),e.jsx("span",{style:{color:"gray"},children:"(Change mode by context menu.)"})]}),offset:[0,6],children:[e.jsx("button",{onClick:()=>h.then(n=>n.display("warning",e.jsx(u,{}))),onContextMenu:n=>{n.preventDefault(),t(o(n.clientX,n.clientY)),i(!0)},children:e.jsx("span",{className:"cldr codicon codicon-link",style:{transform:"rotate(-45deg)"}})}),e.jsx("span",{className:"ppd-contextmenu__trigger cldr codicon codicon-triangle-right",onClick:n=>{t(o(n.clientX,n.clientY)),i(!0)}})]})]})},v=d({editor:{topbar:[_]}});export{v as _};
