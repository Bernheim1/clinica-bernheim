(()=>{"use strict";var e,h={},g={};function r(e){var n=g[e];if(void 0!==n)return n.exports;var t=g[e]={id:e,loaded:!1,exports:{}};return h[e].call(t.exports,t,t.exports,r),t.loaded=!0,t.exports}r.m=h,e=[],r.O=(n,t,i,o)=>{if(!t){var a=1/0;for(f=0;f<e.length;f++){for(var[t,i,o]=e[f],d=!0,c=0;c<t.length;c++)(!1&o||a>=o)&&Object.keys(r.O).every(b=>r.O[b](t[c]))?t.splice(c--,1):(d=!1,o<a&&(a=o));if(d){e.splice(f--,1);var l=i();void 0!==l&&(n=l)}}return n}o=o||0;for(var f=e.length;f>0&&e[f-1][2]>o;f--)e[f]=e[f-1];e[f]=[t,i,o]},r.n=e=>{var n=e&&e.__esModule?()=>e.default:()=>e;return r.d(n,{a:n}),n},(()=>{var n,e=Object.getPrototypeOf?t=>Object.getPrototypeOf(t):t=>t.__proto__;r.t=function(t,i){if(1&i&&(t=this(t)),8&i||"object"==typeof t&&t&&(4&i&&t.__esModule||16&i&&"function"==typeof t.then))return t;var o=Object.create(null);r.r(o);var f={};n=n||[null,e({}),e([]),e(e)];for(var a=2&i&&t;"object"==typeof a&&!~n.indexOf(a);a=e(a))Object.getOwnPropertyNames(a).forEach(d=>f[d]=()=>t[d]);return f.default=()=>t,r.d(o,f),o}})(),r.d=(e,n)=>{for(var t in n)r.o(n,t)&&!r.o(e,t)&&Object.defineProperty(e,t,{enumerable:!0,get:n[t]})},r.f={},r.e=e=>Promise.all(Object.keys(r.f).reduce((n,t)=>(r.f[t](e,n),n),[])),r.u=e=>e+"."+{198:"6be54581dba1f98efe0c",358:"386a1093e08c5a26efa0",392:"66295cf6dcb6eb85cece",540:"a1d66c5b0235b525e787",986:"e1e59803486012090934"}[e]+".js",r.miniCssF=e=>"styles.a301ea7576065f8c19c5.css",r.hmd=e=>((e=Object.create(e)).children||(e.children=[]),Object.defineProperty(e,"exports",{enumerable:!0,set:()=>{throw new Error("ES Modules may not assign module.exports or exports.*, Use ESM export syntax, instead: "+e.id)}}),e),r.o=(e,n)=>Object.prototype.hasOwnProperty.call(e,n),(()=>{var e={},n="clinica:";r.l=(t,i,o,f)=>{if(e[t])e[t].push(i);else{var a,d;if(void 0!==o)for(var c=document.getElementsByTagName("script"),l=0;l<c.length;l++){var s=c[l];if(s.getAttribute("src")==t||s.getAttribute("data-webpack")==n+o){a=s;break}}a||(d=!0,(a=document.createElement("script")).charset="utf-8",a.timeout=120,r.nc&&a.setAttribute("nonce",r.nc),a.setAttribute("data-webpack",n+o),a.src=r.tu(t)),e[t]=[i];var u=(v,b)=>{a.onerror=a.onload=null,clearTimeout(p);var y=e[t];if(delete e[t],a.parentNode&&a.parentNode.removeChild(a),y&&y.forEach(_=>_(b)),v)return v(b)},p=setTimeout(u.bind(null,void 0,{type:"timeout",target:a}),12e4);a.onerror=u.bind(null,a.onerror),a.onload=u.bind(null,a.onload),d&&document.head.appendChild(a)}}})(),r.r=e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},r.nmd=e=>(e.paths=[],e.children||(e.children=[]),e),(()=>{var e;r.tu=n=>(void 0===e&&(e={createScriptURL:t=>t},"undefined"!=typeof trustedTypes&&trustedTypes.createPolicy&&(e=trustedTypes.createPolicy("angular#bundler",e))),e.createScriptURL(n))})(),r.p="",(()=>{var e={666:0};r.f.j=(i,o)=>{var f=r.o(e,i)?e[i]:void 0;if(0!==f)if(f)o.push(f[2]);else if(666!=i){var a=new Promise((s,u)=>f=e[i]=[s,u]);o.push(f[2]=a);var d=r.p+r.u(i),c=new Error;r.l(d,s=>{if(r.o(e,i)&&(0!==(f=e[i])&&(e[i]=void 0),f)){var u=s&&("load"===s.type?"missing":s.type),p=s&&s.target&&s.target.src;c.message="Loading chunk "+i+" failed.\n("+u+": "+p+")",c.name="ChunkLoadError",c.type=u,c.request=p,f[1](c)}},"chunk-"+i,i)}else e[i]=0},r.O.j=i=>0===e[i];var n=(i,o)=>{var c,l,[f,a,d]=o,s=0;for(c in a)r.o(a,c)&&(r.m[c]=a[c]);if(d)var u=d(r);for(i&&i(o);s<f.length;s++)r.o(e,l=f[s])&&e[l]&&e[l][0](),e[f[s]]=0;return r.O(u)},t=self.webpackChunkclinica=self.webpackChunkclinica||[];t.forEach(n.bind(null,0)),t.push=n.bind(null,t.push.bind(t))})()})();