import{j as i}from"./index-c08745a0.js";/* empty css                */import{u as r,L as l,b as d,S as c}from"./messenger-provider-716706b6.js";function p(){const o=React.useRef(null),t=r(o.current,[{id:"1",label:"item 1",icon:l.SpaceSymbol},{id:"2",label:"item 2",placeholder:i.jsx("code",{className:`${l.prefix}-item__placeholder`,children:"⌘ T"}),icon:"twitter"},{id:"3",label:"item 3",icon:"bell",children:[{id:"3-1",label:"item 3-1",icon:"bell-dot"},{id:"3-2",label:"item 3-2",icon:"bell-slash"}]},{id:"4",label:"item 4",icon:"terminal",children:[{id:"4-1",label:"item 4-1",icon:"terminal-bash"},{id:"4-2",label:"item 4-2",icon:"terminal-cmd"}]}],{defaultVisible:!0,onTrigger:async e=>{if(e.id==="1"&&console.log("item 1"),e.id==="2")throw new c;if(e.id==="3")throw new Error("item 3")}}),[a,s]=React.useState(null),n=r(a,[{id:"1",label:"item 1",icon:l.SpaceSymbol},{id:"2",label:"item 2",placeholder:i.jsx("code",{className:`${l.prefix}-item__placeholder`,children:"⌘ T"}),icon:"twitter"},{id:"3",label:"item 3",icon:"bell",children:[{id:"3-1",label:"item 3-1",icon:"bell-dot"},{id:"3-2",label:"item 3-2",icon:"bell-slash"}]}],{noArrow:!0,offset:[0,0],onTrigger:async e=>{if(e.id==="1"&&console.log("item 1"),e.id==="2")throw new c;if(e.id==="3")throw new Error("item 3")}});return i.jsxs(i.Fragment,{children:[t.popper,n.popper,i.jsx("button",{ref:o,onClick:()=>t.changeVisible(!t.visible),children:"Menu"}),i.jsx("button",{onContextMenu:e=>{e.preventDefault(),s(d(e.clientX,e.clientY)),n.changeVisible(!n.visible)},children:"ContextMenu"})]})}export{p as default};
