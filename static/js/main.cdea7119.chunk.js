(this["webpackJsonpbare-lige-ometer"]=this["webpackJsonpbare-lige-ometer"]||[]).push([[0],{29:function(e,n,t){e.exports=t(53)},52:function(e,n,t){},53:function(e,n,t){"use strict";t.r(n);var r,o=t(0),a=t.n(o),c=t(22),i=t.n(c),l=t(27),u=t(10),s=t(8),f=t(4),d=t(5);!function(e){e.Background="#ecf0f1",e.Header="#464a4e",e.Success="#00b894",e.Warning="#fdcb6e",e.Error="#d63031"}(r||(r={}));var v=[r.Success,r.Warning,r.Error];function h(){var e=Object(f.a)(["\n  position: absolute;\n  top: 0;\n  right: 0;\n\n  &:hover svg {\n    fill: ",";\n  }\n"]);return h=function(){return e},e}var g,p=d.a.a(h(),r.Success),w=function(){return o.createElement(p,{href:"https://github.com/mrodalgaard/bare-lige-ometer.git"},o.createElement("svg",{xmlns:"http://www.w3.org/2000/svg",width:"80",height:"80",viewBox:"0 0 250 250",fill:r.Background},o.createElement("path",{d:"M0 0l115 115h15l12 27 108 108V0z",fill:r.Header}),o.createElement("path",{d:"M128 109c-15-9-9-19-9-19 3-7 2-11 2-11-1-7 3-2 3-2 4 5 2 11 2 11-3 10 5 15 9 16"}),o.createElement("path",{d:"M115 115s4 2 5 0l14-14c3-2 6-3 8-3-8-11-15-24 2-41 5-5 10-7 16-7 1-2 3-7 12-11 0 0 5 3 7 16 4 2 8 5 12 9s7 8 9 12c14 3 17 7 17 7-4 8-9 11-11 11 0 6-2 11-7 16-16 16-30 10-41 2 0 3-1 7-5 11l-12 11c-1 1 1 5 1 5z"})))},b=t(9);function m(){var e=Object(f.a)(["\n  display: block;\n  margin: 0 auto;\n  width: 100%;\n\n  background: transparent;\n  border: 0;\n  outline: 0;\n  font-size: 30px;\n  color: ",";\n  text-align: center;\n"]);return m=function(){return e},e}!function(e){e.title="title",e.value="value"}(g||(g={}));var E=d.a.input(m(),r.Header),O=function(){var e=Object(o.useState)(""),n=Object(b.a)(e,2),t=n[0],r=n[1],c=Object(s.d)(g.title,s.c),i=Object(b.a)(c,2),l=i[0],u=i[1],f=Object(o.useRef)(null);return Object(o.useEffect)((function(){var e;void 0!==l&&null!==l?r(l):null===f||void 0===f||null===(e=f.current)||void 0===e||e.focus()}),[r]),Object(o.useEffect)((function(){u(t||void 0)}),[t,u]),a.a.createElement(E,{ref:f,type:"text",value:t,onChange:function(e){return r(e.target.value)}})},j=t(26),x=function(e){return Math.min(100,Math.max(0,e))};function k(){var e=Object(f.a)(["\n  display: flex;\n\n  canvas {\n    flex: 1;\n    max-height: calc(100vh - 260px);\n    width: 100%;\n  }\n"]);return k=function(){return e},e}var M=d.a.div(k()),R=function(){var e=Object(o.useState)(0),n=Object(b.a)(e,2),t=n[0],c=n[1],i=Object(s.d)(g.value,s.a),l=Object(b.a)(i,2),u=l[0],f=l[1],d=Object(o.useRef)(null),h=Object(o.useRef)(null);Object(o.useEffect)((function(){void 0!==u&&null!==u&&c(x(u))}),[c]),Object(o.useEffect)((function(){var e;f(t||void 0),null===h||void 0===h||null===(e=h.current)||void 0===e||e.set(t)}),[t,f]);return Object(o.useEffect)((function(){var e={angle:0,lineWidth:.4,radiusScale:1,pointer:{length:.55,strokeWidth:.1,color:r.Header},limitMax:!1,limitMin:!0,highDpiSupport:!0,staticZones:v.map((function(e,n){return{strokeStyle:e,min:Math.floor(n*(100/v.length)),max:Math.ceil((n+1)*(100/v.length))}}))};h.current=new j.Gauge(d.current).setOptions(e),h.current.maxValue=100,h.current.setMinValue(0),h.current.set(0)}),[]),a.a.createElement(M,{onClick:function(e){return n=e.clientX/window.screen.width,c(Math.round(x(100*n)));var n}},a.a.createElement("canvas",{ref:d}))};function S(){var e=Object(f.a)(["\n  margin: 0;\n  font-size: 15px;\n"]);return S=function(){return e},e}function y(){var e=Object(f.a)(["\n  position: absolute;\n  top: 6px;\n  left: 12px;\n\n  color: ",";\n  cursor: pointer;\n\n  &:hover svg {\n    fill: ",";\n  }\n"]);return y=function(){return e},e}var C=d.a.a(y(),r.Header,r.Success),W=d.a.p(S()),B=function(){var e=Object(o.useState)(!1),n=Object(b.a)(e,2),t=n[0],r=n[1];Object(o.useEffect)((function(){t&&setTimeout((function(){return r(!1)}),3e3)}),[t,r]);return o.createElement(C,{onClick:function(){var e={title:"BARE-LIGE-O'METER",url:window.location.href};(function(e){var n=window.navigator;if(null===n||void 0===n?void 0:n.share)try{return n.share(e),!0}catch(t){}return!1}(e)||function(e){var n,t;return!!(null===(n=window.navigator)||void 0===n||null===(t=n.clipboard)||void 0===t?void 0:t.writeText)&&(window.navigator.clipboard.writeText(e.url),!0)}(e))&&r(!0)}},o.createElement("svg",{xmlns:"http://www.w3.org/2000/svg",width:"56",height:"56",viewBox:"0 0 576 512",fill:"currentColor"},o.createElement("path",{d:"M568.482 177.448L424.479 313.433C409.3 327.768 384 317.14 384 295.985v-71.963c-144.575.97-205.566 35.113-164.775 171.353 4.483 14.973-12.846 26.567-25.006 17.33C155.252 383.105 120 326.488 120 269.339c0-143.937 117.599-172.5 264-173.312V24.012c0-21.174 25.317-31.768 40.479-17.448l144.003 135.988c10.02 9.463 10.028 25.425 0 34.896zM384 379.128V448H64V128h50.916a11.99 11.99 0 0 0 8.648-3.693c14.953-15.568 32.237-27.89 51.014-37.676C185.708 80.83 181.584 64 169.033 64H48C21.49 64 0 85.49 0 112v352c0 26.51 21.49 48 48 48h352c26.51 0 48-21.49 48-48v-88.806c0-8.288-8.197-14.066-16.011-11.302a71.83 71.83 0 0 1-34.189 3.377c-7.27-1.046-13.8 4.514-13.8 11.859z"})),t&&o.createElement(W,null,"copied"))};function H(){var e=Object(f.a)(["\n  font-size: 80px;\n  color: ",";\n  text-align: center;\n  margin-bottom: 10px;\n"]);return H=function(){return e},e}var z=d.a.h1(H(),r.Header),A=function(){return a.a.createElement(z,null,"BARE-LIGE-O'METER")},T=function(){return a.a.createElement(l.a,null,a.a.createElement(s.b,{ReactRouterRoute:u.a},a.a.createElement(B,null),a.a.createElement(w,null),a.a.createElement(A,null),a.a.createElement(O,null),a.a.createElement(R,null)))},V=(t(52),Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/)));function L(e,n){navigator.serviceWorker.register(e).then((function(e){e.onupdatefound=function(){var t=e.installing;null!=t&&(t.onstatechange=function(){"installed"===t.state&&(navigator.serviceWorker.controller?(console.log("New content is available and will be used when all tabs for this page are closed. See https://bit.ly/CRA-PWA."),n&&n.onUpdate&&n.onUpdate(e)):(console.log("Content is cached for offline use."),n&&n.onSuccess&&n.onSuccess(e)))})}})).catch((function(e){console.error("Error during service worker registration:",e)}))}i.a.render(a.a.createElement(T,null),document.getElementById("root")),function(e){if("serviceWorker"in navigator){if(new URL(".",window.location.href).origin!==window.location.origin)return;window.addEventListener("load",(function(){var n="".concat(".","/service-worker.js");V?(!function(e,n){fetch(e).then((function(t){var r=t.headers.get("content-type");404===t.status||null!=r&&-1===r.indexOf("javascript")?navigator.serviceWorker.ready.then((function(e){e.unregister().then((function(){window.location.reload()}))})):L(e,n)})).catch((function(){console.log("No internet connection found. App is running in offline mode.")}))}(n,e),navigator.serviceWorker.ready.then((function(){console.log("This web app is being served cache-first by a service worker. To learn more, visit https://bit.ly/CRA-PWA")}))):L(n,e)}))}}()}},[[29,1,2]]]);