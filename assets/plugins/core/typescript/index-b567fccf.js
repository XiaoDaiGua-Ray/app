import{_ as b,c as $,e as O,f as D,j as d,d as ae}from"../../../index-c08745a0.js";import{l as se,n as le,o as pe,q as ue,c as z,m as L,U as de,t as ge,D as fe,f as me,P as ne,Q as he,r as ye,h as ve}from"../../../messenger-provider-716706b6.js";import{M as je}from"../../../Menu-6cfd44eb.js";function re(e){return function n(s,r,i){switch(arguments.length){case 0:return n;case 1:return b(s)?n:$(function(t,c){return e(s,t,c)});case 2:return b(s)&&b(r)?n:b(s)?$(function(t,c){return e(t,r,c)}):b(r)?$(function(t,c){return e(s,t,c)}):O(function(t){return e(s,r,t)});default:return b(s)&&b(r)&&b(i)?n:b(s)&&b(r)?$(function(t,c){return e(t,c,i)}):b(s)&&b(i)?$(function(t,c){return e(t,r,c)}):b(r)&&b(i)?$(function(t,c){return e(s,t,c)}):b(s)?O(function(t){return e(t,r,i)}):b(r)?O(function(t){return e(s,t,i)}):b(i)?O(function(t){return e(s,r,t)}):e(s,r,i)}}}function H(e){return Object.prototype.toString.call(e)==="[object Object]"}function be(e){if(e==null)throw new TypeError("Cannot convert undefined or null to object");for(var n=Object(e),s=1,r=arguments.length;s<r;){var i=arguments[s];if(i!=null)for(var t in i)D(t,i)&&(n[t]=i[t]);s+=1}return n}const we=typeof Object.assign=="function"?Object.assign:be;var xe=O(function(n){return we.apply(null,[{}].concat(n))});const Se=xe;var Me=re(function(n,s,r){var i={},t;s=s||{},r=r||{};for(t in s)D(t,s)&&(i[t]=D(t,r)?n(t,s[t],r[t]):s[t]);for(t in r)D(t,r)&&!D(t,i)&&(i[t]=r[t]);return i}),Ee=re(function e(n,s,r){return Me(function(i,t,c){return H(t)&&H(c)?e(n,t,c):n(i,t,c)},s,r)}),$e=$(function(n,s){return Ee(function(r,i,t){return i},n,s)});const Re=$e;const V=jotai.atom({target:4,module:99,moduleResolution:2,declaration:!0,allowSyntheticDefaultImports:!0,lib:["esnext","dom","esnext.disposable"]}),ie=jotai.atom([]),J=jotai.atom([]);function U(e){return e.indexOf("@")===0&&e.indexOf("/")!==-1&&(e=e.substr(1).replace("/","__")),e}const Oe=(e,n)=>{const s=e.createSourceFile("file.ts",n,e.ScriptTarget.Latest,!0),r={},i=t=>{if(e.isModuleDeclaration(t)&&t.name&&e.isIdentifier(t.name)&&t.body&&e.isModuleBlock(t.body)){const c=[t];let p=t,o=t.parent;for(;o&&e.isModuleDeclaration(o)&&o.name&&e.isIdentifier(o.name);)c.unshift(o),p=o,o=o.parent;const u=c.map(a=>a.name.text).join(".");r[u]||(r[u]=[]),r[u].push({...p,top:t})}e.forEachChild(t,i)};return i(s),r},De=(e,n)=>{const s=e.preProcessFile(n),r=e.libMap||new Map;return s.referencedFiles.concat(s.importedFiles).concat(s.libReferenceDirectives).filter(t=>!t.fileName.endsWith(".d.ts")).filter(t=>!r.has(t.fileName)).map(t=>{let c;if(!t.fileName.startsWith(".")){c="latest";const p=n.slice(t.end).split(`
`)[0];p.includes("// @version: ")&&(c=p.split("// @version: ")[1].trim())}return{module:t.fileName,version:c,position:[t.pos,t.end]}})},Ce=e=>{if(["assert","assert/strict","async_hooks","buffer","child_process","cluster","console","constants","crypto","dgram","diagnostics_channel","dns","dns/promises","domain","events","fs","fs/promises","http","http2","https","inspector","module","net","os","path","path/posix","path/win32","perf_hooks","process","punycode","querystring","readline","repl","stream","stream/promises","stream/consumers","stream/web","string_decoder","sys","timers","timers/promises","tls","trace_events","tty","url","util","util/types","v8","vm","wasi","worker_threads","zlib"].includes(e.replace("node:","")))return"node";const[s="",r=""]=e.split("/");return s.startsWith("@")?`${s}/${r}`:s},S=Symbol("moduleLoadingState"),k=Symbol("moduleLoadError"),I=Symbol("meta"),T=new Map,B=new Map;async function Q(e,n,s={forceReload:!1}){var c,p;T.has(e)||T.set(e,{});const r=T.get(e);try{n=(await C.calcVersion(e,n)).version}catch(o){console.error(o),r[n]={[S]:"error",[k]:`Version ${n} of module ${e} does not exist`}}const i=`${e}@${n}[${(c=s.ext)==null?void 0:c.join(",")}]`;if(B.get(i)!==!0||s.forceReload){r[n]={[S]:"loading"};try{const o=await C.getFileTree(e,n),u=await Promise.all(o.files.filter(({name:h})=>{var f;return h==="/package.json"?!0:((f=s.ext)==null?void 0:f.some(w=>h.endsWith(w)))??!0}).map(async({name:h})=>({name:h,content:await C.getFileContent(o.moduleName,o.version,h)}))),a=T.get(e),m=JSON.parse(((p=u.find(({name:h})=>h==="/package.json"))==null?void 0:p.content)??"{}");a[n]={[S]:"loaded",[I]:m,...Object.fromEntries(u.map(({name:h,content:f})=>[h,f]))}}catch(o){if(o instanceof Error)r[n]={[S]:"error",[k]:o.message};else throw o}B.set(i,!0)}const t=r[n];if(t[S]==="loaded")return t;throw t[S]==="error"?new Error(t[k]):new Error(`Module ${e}@${n} is not loaded yet`)}function _e(e){const{typings:n,types:s,exports:r}=e;return(n==null?void 0:n.endsWith(".d.ts"))||(s==null?void 0:s.endsWith(".d.ts"))||Object.entries(r??{}).some(([,i])=>{var t,c;return typeof i=="string"?i.endsWith(".d.ts"):((t=i.types)==null?void 0:t.endsWith(".d.ts"))||((c=i.typings)==null?void 0:c.endsWith(".d.ts"))})}async function oe(e,n,s=0){if(console.log(`Resolving ${e}@${n}`,s),s>2)return console.error("Dependency tree is too deep"),{};let r=await Q(e,n,{ext:[".d.ts"]});const i={[e]:r},t=r[I];let c={};if(!_e(t))try{const o=`@types/${U(e)}`;r=await Q(o,n,{ext:[".d.ts"]}),i[o]=r,c=r[I]}catch(o){console.error(`Failed to load type for ${e}@${n} and @types/${U(e)}@${n}`,o)}const p=Object.assign(t.dependencies??{},c.dependencies??{});if(p){const o=await Promise.all([...Object.entries(p).map(([u,a])=>oe(u,a,s+1))]);Object.assign(i,o)}return i}const N=Symbol("depLoadError");async function X(e){return(await Promise.allSettled(e.map(([n,s])=>oe(n,s)))).reduce((n,s,r)=>{const[i,t]=e[r];return s.status==="rejected"?(console.error(`Failed to load ${i}@${t}
`,s.reason),n[`${i}@${t}`]={[N]:s.reason.message}):n[`${i}@${t}`]=s.value,n},{})}function Y(e,n,s={}){Object.entries(e).filter(([i,t])=>{var c;return t[N]&&((c=s.onDepLoadError)==null||c.call(s,{depName:i,error:new Error(t[N])})),!t[N]}).flatMap(([,i])=>Object.entries(i)).forEach(([i,t])=>{if(t[S]==="loaded"){Object.entries(t).forEach(([c,p])=>n({moduleName:i,filePath:c,content:p}));return}t[S]})}async function Te(e,n,s,r={}){const i=s.filter(u=>!n.some(({module:a})=>a===u.module)),t=n.filter(u=>!s.some(({module:a})=>a===u.module)),c=await X(i.map(({module:u,version:a})=>[u,a??"latest"])),p=await X(t.map(({module:u,version:a})=>[u,a??"latest"])),o=Object.entries(e.languages.typescript.typescriptDefaults.getExtraLibs()).map(([u,a])=>[u,a.content]);Y(p,({filePath:u})=>{const a=o.findIndex(([m])=>m===u);a!==-1&&o.splice(a,1)}),Y(c,({moduleName:u,filePath:a,content:m})=>{const h=o.findIndex(([f])=>f===a);h!==-1&&o.splice(h,1),o.push([`file:///node_modules/${u}${a}`,m])},{onDepLoadError:r.onDepLoadError}),!(Object.keys(p).length===0&&Object.keys(c).length===0)&&e.languages.typescript.typescriptDefaults.setExtraLibs(o.reduce((u,[a,m])=>u.concat([{filePath:a,content:m}]),[]))}async function F(e,n){const s=await fetch(e,n);if(s.ok)return await s.json();throw new Error(`Failed to load ${e}`)}var C;(e=>{e.getTagsAndVersions=n=>F(`https://data.jsdelivr.com/v1/package/npm/${n}`,{cache:"no-store"}),e.calcVersion=(n,s)=>F(`https://data.jsdelivr.com/v1/package/resolve/npm/${n}@${s}`),e.getFileTree=async(n,s)=>({...await F(`https://data.jsdelivr.com/v1/package/npm/${n}@${s}/flat`),moduleName:n,version:s}),e.getFileContent=async(n,s,r)=>{const i=`https://cdn.jsdelivr.net/npm/${n}@${s}${r}`,t=await fetch(i);if(t.ok)return t.text();throw new Error(`Failed to load file ${r} from ${n}@${s}`)}})(C||(C={}));const Ne=jotai.getDefaultStore();let K=()=>{},P=new Promise(e=>{K=e}),Z=[];function Le(e){let n="pending";return Promise.race([e.then(()=>n="fulfilled"),e.catch(()=>n="rejected"),new Promise(s=>setTimeout(()=>s(n),0))])}const ee="_modelDecorationIds",Ve=se(e=>{const n=e.createDecorationsCollection(),s=e,r=s[ee]??(s[ee]=new Map);let i;return i={},{decorationsCollection:n,modelDecorationIds:r,dependencyLoadErrorReason:i}},(e,{decorationsCollection:n,modelDecorationIds:s})=>{var t;const r=(t=e.getModel())==null?void 0:t.uri.toString();if(!r)return;const i=s.get(r);i&&(e.removeDecorations(i),s.delete(r),n.clear())},{anytime:async()=>{await Le(P)==="fulfilled"&&(P=new Promise(e=>K=e))}}),ke=(e,n,s)=>Ve(n,e,{languages:["javascript","typescript"]},async(r,{mountInitValue:{modelDecorationIds:i,decorationsCollection:t,dependencyLoadErrorReason:c},isCancel:p})=>{const o=r.uri.toString(),u=i.get(o)??i.set(o,[]).get(o),a=r.getValue(),m=await s,h=Ne.get(J).reduce((g,{filePath:v})=>{var y;const l=(y=/((?:@[^/]*\/)?[^/]+)/.exec(v))==null?void 0:y[1];return l&&!g.includes(l)&&g.push(l),g},[]),f=De(m,a).filter(g=>!g.module.startsWith(".")).filter(g=>!h.includes(g.module)).map(g=>({...g,module:Ce(g.module)})).reduce((g,v)=>(g.findIndex(({module:y})=>y===v.module)===-1&&g.push(v),g),[]);let w=()=>{};Te(n,Z,f,{onDepLoadError({depName:g,error:v}){c[g]=`⚠️ ${v.message}`}}).then(()=>{p.value||w()}),Z=f,K(f),e.removeDecorations(u);const j=f.map(g=>{const[v,l]=g.position,y=r.getPositionAt(v),M=r.getPositionAt(l),_=new n.Range(y.lineNumber,y.column+1,M.lineNumber,M.column+1),R=`ts__button-decoration ts__button-decoration__position-${v}__${l}`;return{loadModule:g.module,loadedVersion:g.version??"latest",range:_,options:{isWholeLine:!0,after:{content:"⚡️ Downloading...",inlineClassName:R}}}}),x=t.set(j);return i.set(o,x),w=()=>{e.removeDecorations(x);const g=j.map(l=>{const y=c[`${l.loadModule}@${l.loadedVersion}`];return Re({options:{after:{content:y??`@${l.loadedVersion}`}}},l)}),v=t.set(g);i.set(o,v)},()=>{}}),te="ppd-plugins-typescript-glyph-margin",Fe=(e,n,s,r,i)=>({getDomNode(){const t=document.createElement("div");return t.innerHTML=r,i==null||i(t),t},getPosition(){return{lane:e.editor.GlyphMarginLane.Right,zIndex:100,range:new e.Range(s,1,s,1)}},getId:()=>`${te} ${te}__${s}`}),Ae=se((e,n)=>{const s=[];return{glyphMarginWidgets:s,addGlyph:(r,i,t)=>{if(!e.getModel())throw new Error("model not found");const p=Fe(n,e,r,i,t);return e.addGlyphMarginWidget(p),s.push(p),e.updateOptions({glyphMargin:!0}),p.getId()},removeGlyph:r=>{const i=s.findIndex(t=>t.getId()===r);i!==-1&&(e.removeGlyphMarginWidget(s[i]),s.splice(i,1)),s.length===0&&e.updateOptions({glyphMargin:!1})}}},(e,{glyphMarginWidgets:n})=>{e.updateOptions({glyphMargin:!1}),n.forEach(s=>e.removeGlyphMarginWidget(s))},{watchEventKeys:[...le,"onDidChangeModelDecorations"],anytime(e,...n){if(pe(e,"onDidChangeModelDecorations")){const[s]=n;if(!s.affectsMinimap)throw ue.instance}}}),We=(e,n,s)=>{const r=new Map;return Ae(n,e,{languages:["javascript","typescript"]},async(i,{mountInitValue:{addGlyph:t,removeGlyph:c}})=>{const p=await s,o=i.uri.toString(),u=i.getValue(),[a,m]=r.get(o)??[];let h;m&&a===u?h=m:(h=Oe(p,u),r.set(o,[u,h]));const f=e.getVisibleRanges(),w=[];return Object.entries(h).filter(([j])=>["describe","it"].some(x=>j.startsWith(x))).map(([j,x])=>x.reduce((g,v)=>{const l=i.getPositionAt(v.top.pos).lineNumber;let y=l,M=!1,_=1;return f.forEach(({startLineNumber:R,endLineNumber:q})=>{if(l>=q&&l<=R){M=!0;return}if(l<=R)return;const G=R-_;y-=G===0?0:G-1,_=q}),M?g:g.concat([[y,j,v]])},[]).flat()).forEach(([j,x,g])=>{const v=x.startsWith("describe");w.push(t(j,`<span class='${z("codicon",`codicon-run${v?"-all":""}`)}'></span>`,l=>{l.onclick=()=>{L.then(y=>y.display("warning","Running test is not supported yet")),l.innerHTML=`<span class="${z("codicon","codicon-run-errors")}"></span>`}}))}),()=>w.forEach(j=>c(j))})};const ce=e=>({target:e.languages.typescript.ScriptTarget,module:e.languages.typescript.ModuleKind,jsx:e.languages.typescript.JsxEmit,moduleResolution:e.languages.typescript.ModuleResolutionKind,newLine:e.languages.typescript.NewLineKind});function Ie(e,n){var i;const s={...n},r=ce(e);for(const[t,c]of Object.entries(n))t in r&&(s[t]=(i=r==null?void 0:r[t])==null?void 0:i[c]);return s}function Pe(e,n){var i;const s={...n},r=ce(e);for(const[t,c]of Object.entries(n))if(t in r){const p=(i=Object.entries(r[t]).find(([,o])=>o===c))==null?void 0:i[0];if(p)s[t]=Number(p);else throw new Error(`Enum key "${t}" unable to resolve value "${c}"`)}return s}const Je=React.forwardRef(function(n,s){const r=de(),[i,t]=jotai.useAtom(V),c=React.useMemo(()=>r?JSON.stringify(Ie(r,i),null,2):"{}",[r,i]),p=ge(),o=React.useCallback(async u=>{r&&p(setTimeout(()=>{if(u)try{const a=JSON.parse(u);t(Pe(r,a))}catch(a){console.error(a)}},500))},[p,r,t]);return React.useEffect(()=>{r&&async function(){const m=(await fetch("https://json.schemastore.org/tsconfig").then(h=>h.json())).definitions.compilerOptionsDefinition.properties.compilerOptions;m.properties.moduleResolution={description:"Specify how TypeScript looks up a file from a given module specifier.",type:"string",anyOf:[{enum:["Classic","NodeJs","Bundler"]},{pattern:"^(([Nn]ode)|([Nn]ode16)|([Nn]ode\\.?[Jj]s)|([Nn]ode[Nn]ext)|([Cc]lassic)|([Bb]undler))$"}],default:"NodeJs",markdownDescription:`(The Configure is overridden by Power Playground)

Specify how TypeScript looks up a file from a given module specifier.

See more: https://www.typescriptlang.org/tsconfig#moduleResolution`},m.properties.lib.items.anyOf.push({pattern:"^[Ee][Ss][Nn][Ee][Xx][Tt](\\.([Dd][Ii][Ss][Pp][Oo][Ss][Aa][Bb][Ll][Ee]))?$"}),r.languages.json.jsonDefaults.setDiagnosticsOptions({validate:!0,schemas:[{uri:"https://json.schemastore.org/tsconfig",fileMatch:["tsconfig.json"],schema:m}]})}()},[r]),d.jsx(fe,{ref:s,title:"TypeScript CompilerOptions",className:"ts-compiler-options-configurator",children:d.jsx(me,{language:"json",options:{minimap:{enabled:!1}},height:"500px",path:"tsconfig.json",value:c,onChange:o})})}),Ke=()=>{const e=React.useRef(null);return d.jsxs(d.Fragment,{children:[d.jsx(Je,{ref:e}),d.jsx(ne,{style:{cursor:"pointer"},offset:[0,3],content:d.jsx(d.Fragment,{children:"Configure TypeScript CompilerOptions"}),onClick:()=>{var n;return(n=e.current)==null?void 0:n.open()},children:d.jsx("div",{className:"cldr codicon codicon-settings"})})]})},E={distCategory:["latest","next","beta","rc","insiders","tag-for-publishing-older-releases","dev"],distTagEnum:{latest:"5.2.2","5.2.2":"latest",next:"5.3.0-dev.20230915","5.3.0-dev.20230915":"next",beta:"5.2.0-beta","5.2.0-beta":"beta",rc:"5.2.1-rc","5.2.1-rc":"rc",insiders:"4.6.2-insiders.20220225","4.6.2-insiders.20220225":"insiders","tag-for-publishing-older-releases":"4.1.6","4.1.6":"tag-for-publishing-older-releases",dev:"3.9.4","3.9.4":"dev"},versions:["5.2.2","5.1.6","5.0.4","4.9.5","4.8.4","4.7.4","4.6.4","4.5.5","4.4.4","4.3.5","4.2.4","4.1.6","4.0.8","3.9.10","3.8.3","3.7.7","3.6.5","3.5.3","3.4.5","3.3.4000","5.2.2","5.3.0-dev.20230915","5.2.0-beta","5.2.1-rc","4.6.2-insiders.20220225","4.1.6","3.9.4"],suggestedVersions:["5.2.2","5.1.6","5.0.4","4.9.5","4.8.4","4.7.4","4.6.4","4.5.5","4.4.4","4.3.5","4.2.4","4.1.6","4.0.8","3.9.10","3.8.3","3.7.7","3.6.5","3.5.3","3.4.5","3.3.4000"]},qe=()=>{const[e,n]=React.useState(0),[s,r]=React.useState(!1),[i,t]=React.useState(null),[c,p]=React.useState(),o=React.useRef(new AbortController),u=React.useRef(!1);return React.useEffect(()=>{if(!u.current){u.current=!0;return}return s||(r(!0),fetch("https://registry.npmmirror.com/-/package/typescript/dist-tags",{signal:o.current.signal}).then(a=>a.json()).then(a=>{p(a),t(null)}).catch(t).finally(()=>{r(!1),o.current=new AbortController})),()=>o.current.abort()},[o,s,e]),{data:c,fetching:s,error:i,reFetch:()=>n(e+1)}},Ge=({searchParams:e,shareState:n})=>{const s=e.get("typescript")??e.get("ts")??e.get("tsv")??e.get("tsv"),r=e.get("tag")??e.get("dist-tag")??e.get("distTag")??e.get("dist_tag")??s,{data:i,fetching:t,error:c}=qe(),p=React.useMemo(()=>c!==null&&i?i:null,[i,c]),o=React.useMemo(()=>p?Object.fromEntries(Object.entries(p).flatMap(([l,y])=>[[l,y],[y,l]])):E.distTagEnum,[p]),u=React.useMemo(()=>p?Object.keys(p):E.distCategory,[p]),a=React.useMemo(()=>n.typescriptVersion??(s!==null&&E.suggestedVersions.includes(s)?s:r?o[r]:E.versions[0]),[o,r,s,n.typescriptVersion]),m=n.changeTypescriptVersion,h=React.useMemo(()=>a===void 0?!1:E.suggestedVersions.indexOf(a)===-1,[a]),f=React.useMemo(()=>{if(a!==void 0)return h?o==null?void 0:o[a]:a},[o,h,a]),w=React.useRef(!1);React.useEffect(()=>{if(f!==void 0){if(w.current)return;w.current=!0,m==null||m(f)}},[m,f]);const j=React.useContext(he),x=React.useMemo(()=>E.suggestedVersions.map(l=>{const y=(l==="3.3.3333"?"3.3.3":l==="3.3.4000"?"3.3.4":l)+(o[l]?` (${o[l]})`:"");return{id:l,value:o[l]??l,title:y}}),[o]),g=React.useMemo(()=>u.map(l=>({id:l,value:o[l]??l,title:`${l} (${o[l]})`})),[u,o]),v=React.useMemo(()=>{let l;return t?l=()=>[{id:"fetching",title:"Fetching..."}]:l=y=>x.concat(g).filter(({title:M})=>!y||M.includes(y)),l.defaultId=E.suggestedVersions.includes(a)?a:o[a]??a,l.options={placeholder:"Select TypeScript Version"},l},[o,t,x,g,a]);return React.useEffect(()=>j.register("typescript.versions",v),[j,v]),d.jsxs(ne,{content:d.jsxs(d.Fragment,{children:["Monaco Editor is using TypeScript@",o[a]??a," as language service.(Click to change version)"]}),style:{cursor:"pointer",userSelect:"none"},offset:[0,3],onClick:async()=>{try{const l=await j.run("typescript.versions");"id"in l&&(l.value?m==null||m(l.value.toString()):L.then(y=>y.display("error",d.jsxs(d.Fragment,{children:[d.jsx("h3",{children:"Invalid TypeScript Version"}),d.jsxs("p",{children:["Version ",d.jsx("code",{children:l.id})," is not available."]}),d.jsxs("p",{children:["Click ",d.jsx("a",{href:"/TODO",children:"it"})," and find help."]})]})))),"text"in l&&console.log("text",l)}catch(l){console.error(l)}},children:["TypeScript@",a]})};const A="ppd-plugins-typescript-topbar-langs",ze=({shareState:e})=>{const{language:n,changeLanguage:s}=e,r=26;return d.jsx(je,{style:{order:-100},className:A,items:[{id:"typescript",title:"TypeScript",content:d.jsxs("span",{className:`${A}__mi`,children:[d.jsx("img",{width:r,alt:"typescript",src:"https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg"}),"TypeScript"]})},{id:"javascript",title:"JavaScript",content:d.jsxs("span",{className:`${A}__mi`,children:[d.jsx("img",{width:r,alt:"javascript",src:"https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg"}),"JavaScript"]})}],onSelect:i=>s==null?void 0:s(i.id),children:d.jsx("img",{alt:n,src:`https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${n}/${n}-original.svg`})})},He=[({searchParams:e,editor:n})=>{const[s,r]=React.useState(),i=React.useRef(!0),t=React.useCallback(f=>{ye.config({paths:{vs:`https://typescript.azureedge.net/cdn/${f}/monaco/min/vs`}}),r(f),e.set("typescript",f);const w=n==null?void 0:n.getValue(),j=w?"#"+btoa(encodeURIComponent(w)):location.hash;history.replaceState(null,"","?"+e.toString()+j),i.current?i.current=!1:location.reload()},[n,e]),[c,p]=React.useState(e.get("lang")==="javascript"?"javascript":"typescript");function o(f){p(f),e.set("lang",f),history.replaceState(null,"","?"+e.toString()+location.hash)}const u=React.useMemo(()=>`/index.${c==="javascript"?"js":"ts"}`,[c]),[a,m]=React.useState();React.useEffect(()=>{function f(w){w.target instanceof HTMLScriptElement&&w.target.src.startsWith("https://typescript.azureedge.net/cdn/")&&m(`TypeScript@${s} unavailable`)}return addEventListener("error",f,!0),()=>removeEventListener("error",f)},[s]);const h=React.useMemo(()=>s?null:d.jsxs("section",{style:{display:"flex",alignItems:"center",justifyContent:"center",flexDirection:"column"},children:[d.jsx("div",{style:{position:"relative",width:72,height:72,backgroundColor:"#4272ba",userSelect:"none"},children:d.jsx("span",{style:{position:"absolute",right:5,bottom:-2,fontSize:30,fontWeight:"blob"},children:"TS"})}),a?d.jsx("span",{children:a}):d.jsxs("span",{children:["Downloading TypeScript",s&&d.jsxs(d.Fragment,{children:["@",d.jsx("code",{children:s})]})," ..."]})]}),[a,s]);return{curFilePath:u,typescriptVersion:s,changeTypescriptVersion:t,language:c,changeLanguage:o,loadingNode:h}}],W=jotai.getDefaultStore(),Ue={use:He,useShare({curFilePath:e,language:n,typescriptVersion:s},r){const[i]=jotai.useAtom(V),t=React.useMemo(()=>{if(!(!r||!s))return n==="javascript"?r.languages.typescript.javascriptDefaults:r.languages.typescript.typescriptDefaults},[n,r,s]);React.useEffect(()=>{!t||!r||(t.setCompilerOptions({...t.getCompilerOptions(),...i}),console.group("monaco detail data"),console.log("typescript.version",r.languages.typescript.typescriptVersion),console.log("typescript.CompilerOptions",r.languages.typescript.typescriptDefaults.getCompilerOptions()),console.groupEnd())},[i,t,r]);const[c]=jotai.useAtom(ie),[p]=jotai.useAtom(J);React.useEffect(()=>{if(!(!t||!r))return c.forEach(({content:o,filePath:u})=>{r.editor.createModel(o,n==="javascript"?"javascript":"typescript",r.Uri.parse(u))}),p.forEach(({content:o,filePath:u})=>{r.editor.createModel(o,n==="javascript"?"javascript":"typescript",r.Uri.parse(`file:///node_modules/${u}`))}),()=>{r.editor.getModels().forEach(o=>{o.uri.path!==e&&o.dispose()})}},[r,e,n,t,c,p]),ve("mousedown",o=>{o.target instanceof HTMLElement&&o.target.classList.contains("ts__button-decoration")&&L.then(u=>u.display("warning","Switching dependency version is not supported yet"))})},preload(e){return function(n){return()=>n.forEach(s=>s())}([e.editor.addCommand({id:"typescript-imports",run(){L.then(n=>n.display("warning","Switching dependency version is not supported yet"))}}).dispose,e.languages.registerCodeLensProvider(["javascript","typescript"],{async provideCodeLenses(n,s){if(n.isDisposed())return;const r=await P;if(s.isCancellationRequested)return;const i=[];return r.forEach(t=>{const[c]=t.position,p=n.getPositionAt(c),o=new e.Range(p.lineNumber,p.column,p.lineNumber,p.column);i.push({range:o,id:"typescript-imports",command:{id:"typescript-imports",title:"Switch @latest",arguments:[t.module,"latest"]}},{range:o,id:"typescript-imports",command:{id:"typescript-imports",title:"@beta",arguments:[t.module,"beta"]}},{range:o,command:{id:"typescript-imports",title:`[${t.module}]`,arguments:[t.module]}})}),{lenses:i,dispose:()=>{}}}}).dispose])},load:(e,n)=>{const s=require;let r;const i=new Promise(t=>{r===void 0?s(["vs/language/typescript/tsWorker"],()=>{r=window.ts,t(window.ts)}):t(r)});return[ke(e,n,i),We(e,n,i)]},topbar:[ze],statusbar:[Ge,Ke]},Ye=ae("typescript",e=>(e!=null&&e.compilerOptions&&W.set(V,Se([V.init,e.compilerOptions])),e!=null&&e.extraFiles&&W.set(ie,e.extraFiles),e!=null&&e.extraModules&&W.set(J,e.extraModules),{editor:Ue}));export{Ye as _,Re as m};
