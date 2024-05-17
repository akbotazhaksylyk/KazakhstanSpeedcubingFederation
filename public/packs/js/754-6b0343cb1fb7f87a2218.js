/*! For license information please see 754-6b0343cb1fb7f87a2218.js.LICENSE.txt */
"use strict";(self.webpackChunk=self.webpackChunk||[]).push([[754],{83615:function(t,n,r){r.d(n,{Z:function(){return a},I:function(){return u}});var e=r(53481),o=r(19927),i=r(68980),c=r.p+"static/lib/leaflet-wca/marker-icon-red-8b9022a66c7385bf5864.png",u=new e.Icon({iconUrl:c,shadowUrl:i,iconSize:[25,41],iconAnchor:[12,41],popupAnchor:[1,-34],shadowSize:[41,41]}),a=new e.Icon({iconUrl:o,shadowUrl:i,iconSize:[25,41],iconAnchor:[12,41],popupAnchor:[1,-34],shadowSize:[41,41]})},92562:function(t,n,r){r.d(n,{k:function(){return v},V:function(){return y}});var e=r(18294),o=r(29122),i=r(66048);function c(){c=function(){return n};var t,n={},r=Object.prototype,e=r.hasOwnProperty,o=Object.defineProperty||function(t,n,r){t[n]=r.value},i="function"==typeof Symbol?Symbol:{},u=i.iterator||"@@iterator",a=i.asyncIterator||"@@asyncIterator",s=i.toStringTag||"@@toStringTag";function f(t,n,r){return Object.defineProperty(t,n,{value:r,enumerable:!0,configurable:!0,writable:!0}),t[n]}try{f({},"")}catch(t){f=function(t,n,r){return t[n]=r}}function p(t,n,r,e){var i=n&&n.prototype instanceof g?n:g,c=Object.create(i.prototype),u=new A(e||[]);return o(c,"_invoke",{value:S(t,r,u)}),c}function l(t,n,r){try{return{type:"normal",arg:t.call(n,r)}}catch(t){return{type:"throw",arg:t}}}n.wrap=p;var h="suspendedStart",d="suspendedYield",v="executing",y="completed",m={};function g(){}function b(){}function w(){}var _={};f(_,u,(function(){return this}));var j=Object.getPrototypeOf,O=j&&j(j(G([])));O&&O!==r&&e.call(O,u)&&(_=O);var x=w.prototype=g.prototype=Object.create(_);function L(t){["next","throw","return"].forEach((function(n){f(t,n,(function(t){return this._invoke(n,t)}))}))}function P(t,n){function r(o,i,c,u){var a=l(t[o],t,i);if("throw"!==a.type){var s=a.arg,f=s.value;return f&&"object"==typeof f&&e.call(f,"__await")?n.resolve(f.__await).then((function(t){r("next",t,c,u)}),(function(t){r("throw",t,c,u)})):n.resolve(f).then((function(t){s.value=t,c(s)}),(function(t){return r("throw",t,c,u)}))}u(a.arg)}var i;o(this,"_invoke",{value:function(t,e){function o(){return new n((function(n,o){r(t,e,n,o)}))}return i=i?i.then(o,o):o()}})}function S(n,r,e){var o=h;return function(i,c){if(o===v)throw new Error("Generator is already running");if(o===y){if("throw"===i)throw c;return{value:t,done:!0}}for(e.method=i,e.arg=c;;){var u=e.delegate;if(u){var a=E(u,e);if(a){if(a===m)continue;return a}}if("next"===e.method)e.sent=e._sent=e.arg;else if("throw"===e.method){if(o===h)throw o=y,e.arg;e.dispatchException(e.arg)}else"return"===e.method&&e.abrupt("return",e.arg);o=v;var s=l(n,r,e);if("normal"===s.type){if(o=e.done?y:d,s.arg===m)continue;return{value:s.arg,done:e.done}}"throw"===s.type&&(o=y,e.method="throw",e.arg=s.arg)}}}function E(n,r){var e=r.method,o=n.iterator[e];if(o===t)return r.delegate=null,"throw"===e&&n.iterator.return&&(r.method="return",r.arg=t,E(n,r),"throw"===r.method)||"return"!==e&&(r.method="throw",r.arg=new TypeError("The iterator does not provide a '"+e+"' method")),m;var i=l(o,n.iterator,r.arg);if("throw"===i.type)return r.method="throw",r.arg=i.arg,r.delegate=null,m;var c=i.arg;return c?c.done?(r[n.resultName]=c.value,r.next=n.nextLoc,"return"!==r.method&&(r.method="next",r.arg=t),r.delegate=null,m):c:(r.method="throw",r.arg=new TypeError("iterator result is not an object"),r.delegate=null,m)}function T(t){var n={tryLoc:t[0]};1 in t&&(n.catchLoc=t[1]),2 in t&&(n.finallyLoc=t[2],n.afterLoc=t[3]),this.tryEntries.push(n)}function k(t){var n=t.completion||{};n.type="normal",delete n.arg,t.completion=n}function A(t){this.tryEntries=[{tryLoc:"root"}],t.forEach(T,this),this.reset(!0)}function G(n){if(n||""===n){var r=n[u];if(r)return r.call(n);if("function"==typeof n.next)return n;if(!isNaN(n.length)){var o=-1,i=function r(){for(;++o<n.length;)if(e.call(n,o))return r.value=n[o],r.done=!1,r;return r.value=t,r.done=!0,r};return i.next=i}}throw new TypeError(typeof n+" is not iterable")}return b.prototype=w,o(x,"constructor",{value:w,configurable:!0}),o(w,"constructor",{value:b,configurable:!0}),b.displayName=f(w,s,"GeneratorFunction"),n.isGeneratorFunction=function(t){var n="function"==typeof t&&t.constructor;return!!n&&(n===b||"GeneratorFunction"===(n.displayName||n.name))},n.mark=function(t){return Object.setPrototypeOf?Object.setPrototypeOf(t,w):(t.__proto__=w,f(t,s,"GeneratorFunction")),t.prototype=Object.create(x),t},n.awrap=function(t){return{__await:t}},L(P.prototype),f(P.prototype,a,(function(){return this})),n.AsyncIterator=P,n.async=function(t,r,e,o,i){void 0===i&&(i=Promise);var c=new P(p(t,r,e,o),i);return n.isGeneratorFunction(r)?c:c.next().then((function(t){return t.done?t.value:c.next()}))},L(x),f(x,s,"Generator"),f(x,u,(function(){return this})),f(x,"toString",(function(){return"[object Generator]"})),n.keys=function(t){var n=Object(t),r=[];for(var e in n)r.push(e);return r.reverse(),function t(){for(;r.length;){var e=r.pop();if(e in n)return t.value=e,t.done=!1,t}return t.done=!0,t}},n.values=G,A.prototype={constructor:A,reset:function(n){if(this.prev=0,this.next=0,this.sent=this._sent=t,this.done=!1,this.delegate=null,this.method="next",this.arg=t,this.tryEntries.forEach(k),!n)for(var r in this)"t"===r.charAt(0)&&e.call(this,r)&&!isNaN(+r.slice(1))&&(this[r]=t)},stop:function(){this.done=!0;var t=this.tryEntries[0].completion;if("throw"===t.type)throw t.arg;return this.rval},dispatchException:function(n){if(this.done)throw n;var r=this;function o(e,o){return u.type="throw",u.arg=n,r.next=e,o&&(r.method="next",r.arg=t),!!o}for(var i=this.tryEntries.length-1;i>=0;--i){var c=this.tryEntries[i],u=c.completion;if("root"===c.tryLoc)return o("end");if(c.tryLoc<=this.prev){var a=e.call(c,"catchLoc"),s=e.call(c,"finallyLoc");if(a&&s){if(this.prev<c.catchLoc)return o(c.catchLoc,!0);if(this.prev<c.finallyLoc)return o(c.finallyLoc)}else if(a){if(this.prev<c.catchLoc)return o(c.catchLoc,!0)}else{if(!s)throw new Error("try statement without catch or finally");if(this.prev<c.finallyLoc)return o(c.finallyLoc)}}}},abrupt:function(t,n){for(var r=this.tryEntries.length-1;r>=0;--r){var o=this.tryEntries[r];if(o.tryLoc<=this.prev&&e.call(o,"finallyLoc")&&this.prev<o.finallyLoc){var i=o;break}}i&&("break"===t||"continue"===t)&&i.tryLoc<=n&&n<=i.finallyLoc&&(i=null);var c=i?i.completion:{};return c.type=t,c.arg=n,i?(this.method="next",this.next=i.finallyLoc,m):this.complete(c)},complete:function(t,n){if("throw"===t.type)throw t.arg;return"break"===t.type||"continue"===t.type?this.next=t.arg:"return"===t.type?(this.rval=this.arg=t.arg,this.method="return",this.next="end"):"normal"===t.type&&n&&(this.next=n),m},finish:function(t){for(var n=this.tryEntries.length-1;n>=0;--n){var r=this.tryEntries[n];if(r.finallyLoc===t)return this.complete(r.completion,r.afterLoc),k(r),m}},catch:function(t){for(var n=this.tryEntries.length-1;n>=0;--n){var r=this.tryEntries[n];if(r.tryLoc===t){var e=r.completion;if("throw"===e.type){var o=e.arg;k(r)}return o}}throw new Error("illegal catch attempt")},delegateYield:function(n,r,e){return this.delegate={iterator:G(n),resultName:r,nextLoc:e},"next"===this.method&&(this.arg=t),m}},n}function u(t,n,r,e,o,i,c){try{var u=t[i](c),a=u.value}catch(s){return void r(s)}u.done?n(a):Promise.resolve(a).then(e,o)}function a(t,n){for(var r=0;r<n.length;r++){var e=n[r];e.enumerable=e.enumerable||!1,e.configurable=!0,"value"in e&&(e.writable=!0),Object.defineProperty(t,s(e.key),e)}}function s(t){var n=function(t,n){if("object"!=typeof t||!t)return t;var r=t[Symbol.toPrimitive];if(void 0!==r){var e=r.call(t,n||"default");if("object"!=typeof e)return e;throw new TypeError("@@toPrimitive must return a primitive value.")}return("string"===n?String:Number)(t)}(t,"string");return"symbol"==typeof n?n:String(n)}function f(t,n,r){return n=l(n),function(t,n){if(n&&("object"===typeof n||"function"===typeof n))return n;if(void 0!==n)throw new TypeError("Derived constructors may only return object or undefined");return function(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}(t)}(t,p()?Reflect.construct(n,r||[],l(t).constructor):n.apply(t,r))}function p(){try{var t=!Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){})))}catch(t){}return(p=function(){return!!t})()}function l(t){return l=Object.setPrototypeOf?Object.getPrototypeOf.bind():function(t){return t.__proto__||Object.getPrototypeOf(t)},l(t)}function h(t,n){return h=Object.setPrototypeOf?Object.setPrototypeOf.bind():function(t,n){return t.__proto__=n,t},h(t,n)}var d=function(t){function n(){return function(t,n){if(!(t instanceof n))throw new TypeError("Cannot call a class as a function")}(this,n),f(this,n,arguments)}var r,e,s,p,l;return function(t,n){if("function"!==typeof n&&null!==n)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(n&&n.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),Object.defineProperty(t,"prototype",{writable:!1}),n&&h(t,n)}(n,t),r=n,e=[{key:"endpoint",value:function(){var t=(arguments.length>0&&void 0!==arguments[0]?arguments[0]:{}).query,n=this.getParamString({q:t});return"".concat(i.L5,"?").concat(n)}},{key:"search",value:(p=c().mark((function t(n){var r,e,i,u;return c().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return r=n.query,e=this.endpoint({query:r}),t.next=4,(0,o.V)(e);case 4:return i=t.sent,t.next=7,i.json();case 7:return u=t.sent,t.abrupt("return",this.parse({data:u}));case 9:case"end":return t.stop()}}),t,this)})),l=function(){var t=this,n=arguments;return new Promise((function(r,e){var o=p.apply(t,n);function i(t){u(o,r,e,i,c,"next",t)}function c(t){u(o,r,e,i,c,"throw",t)}i(void 0)}))},function(t){return l.apply(this,arguments)})}],e&&a(r.prototype,e),s&&a(r,s),Object.defineProperty(r,"prototype",{writable:!1}),n}(e.e4),v=new d,y={url:"https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",attribution:"&copy; <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a>"}},29122:function(t,n,r){function e(t,n){for(var r=0;r<n.length;r++){var e=n[r];e.enumerable=e.enumerable||!1,e.configurable=!0,"value"in e&&(e.writable=!0),Object.defineProperty(t,o(e.key),e)}}function o(t){var n=function(t,n){if("object"!=typeof t||!t)return t;var r=t[Symbol.toPrimitive];if(void 0!==r){var e=r.call(t,n||"default");if("object"!=typeof e)return e;throw new TypeError("@@toPrimitive must return a primitive value.")}return("string"===n?String:Number)(t)}(t,"string");return"symbol"==typeof n?n:String(n)}function i(t,n,r){return n=s(n),function(t,n){if(n&&("object"===typeof n||"function"===typeof n))return n;if(void 0!==n)throw new TypeError("Derived constructors may only return object or undefined");return function(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}(t)}(t,u()?Reflect.construct(n,r||[],s(t).constructor):n.apply(t,r))}function c(t){var n="function"===typeof Map?new Map:void 0;return c=function(t){if(null===t||!function(t){try{return-1!==Function.toString.call(t).indexOf("[native code]")}catch(n){return"function"===typeof t}}(t))return t;if("function"!==typeof t)throw new TypeError("Super expression must either be null or a function");if("undefined"!==typeof n){if(n.has(t))return n.get(t);n.set(t,r)}function r(){return function(t,n,r){if(u())return Reflect.construct.apply(null,arguments);var e=[null];e.push.apply(e,n);var o=new(t.bind.apply(t,e));return r&&a(o,r.prototype),o}(t,arguments,s(this).constructor)}return r.prototype=Object.create(t.prototype,{constructor:{value:r,enumerable:!1,writable:!0,configurable:!0}}),a(r,t)},c(t)}function u(){try{var t=!Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){})))}catch(t){}return(u=function(){return!!t})()}function a(t,n){return a=Object.setPrototypeOf?Object.setPrototypeOf.bind():function(t,n){return t.__proto__=n,t},a(t,n)}function s(t){return s=Object.setPrototypeOf?Object.getPrototypeOf.bind():function(t){return t.__proto__||Object.getPrototypeOf(t)},s(t)}r.d(n,{o:function(){return l},V:function(){return p}});var f=function(t){function n(t,r,e){var o;return function(t,n){if(!(t instanceof n))throw new TypeError("Cannot call a class as a function")}(this,n),(o=i(this,n,[t])).response=r,o.json=e,o}return function(t,n){if("function"!==typeof n&&null!==n)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(n&&n.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),Object.defineProperty(t,"prototype",{writable:!1}),n&&a(t,n)}(n,t),r=n,o&&e(r.prototype,o),c&&e(r,c),Object.defineProperty(r,"prototype",{writable:!1}),r;var r,o,c}(c(Error));function p(t,n){var r=n||{};r.headers||(r.headers={});var e=document.querySelector("meta[name=csrf-token]");return e&&(r.headers["X-CSRF-Token"]=e.content),fetch(t,r)}function l(t){return p(t,arguments.length>1&&void 0!==arguments[1]?arguments[1]:{}).then((function(t){return t.json().then((function(n){if(!t.ok)throw new f("".concat(t.status,": ").concat(t.statusText,"\n").concat(n.error),t,n);return{data:n,headers:t.headers}}))}))}},66048:function(t,n,r){function e(t,n){return function(t){if(Array.isArray(t))return t}(t)||function(t,n){var r=null==t?null:"undefined"!=typeof Symbol&&t[Symbol.iterator]||t["@@iterator"];if(null!=r){var e,o,i,c,u=[],a=!0,s=!1;try{if(i=(r=r.call(t)).next,0===n){if(Object(r)!==r)return;a=!1}else for(;!(a=(e=i.call(r)).done)&&(u.push(e.value),u.length!==n);a=!0);}catch(t){s=!0,o=t}finally{try{if(!a&&null!=r.return&&(c=r.return(),Object(c)!==c))return}finally{if(s)throw o}}return u}}(t,n)||function(t,n){if(!t)return;if("string"===typeof t)return o(t,n);var r=Object.prototype.toString.call(t).slice(8,-1);"Object"===r&&t.constructor&&(r=t.constructor.name);if("Map"===r||"Set"===r)return Array.from(t);if("Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r))return o(t,n)}(t,n)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function o(t,n){(null==n||n>t.length)&&(n=t.length);for(var r=0,e=new Array(n);r<n;r++)e[r]=t[r];return e}function i(t){var n=Object.fromEntries(Object.entries(t).filter((function(t){var n=e(t,2),r=(n[0],n[1]);return null!==r&&void 0!==r})));return new URLSearchParams(n).toString()}r.d(n,{$K:function(){return ht},A:function(){return v},Ar:function(){return K},Bg:function(){return l},C_:function(){return d},FZ:function(){return g},Gp:function(){return U},H9:function(){return p},HF:function(){return j},HJ:function(){return A},KR:function(){return pt},KV:function(){return D},Kh:function(){return u},L5:function(){return C},Lf:function(){return y},Lu:function(){return X},Ms:function(){return wt},NW:function(){return at},No:function(){return m},O0:function(){return B},PW:function(){return W},Pc:function(){return G},QN:function(){return ct},SY:function(){return T},T5:function(){return f},TX:function(){return $},VB:function(){return bt},Vm:function(){return s},WP:function(){return Y},ZC:function(){return yt},ZS:function(){return rt},Zx:function(){return R},_s:function(){return J},b6:function(){return V},bF:function(){return E},bL:function(){return ut},bt:function(){return lt},cC:function(){return P},cg:function(){return H},eB:function(){return z},eQ:function(){return Z},ei:function(){return tt},fP:function(){return b},fj:function(){return Q},g6:function(){return dt},gT:function(){return it},gU:function(){return F},gb:function(){return et},hs:function(){return c},iC:function(){return N},l8:function(){return a},mQ:function(){return mt},oi:function(){return nt},p0:function(){return I},pV:function(){return M},qG:function(){return ot},qy:function(){return q},rC:function(){return w},rL:function(){return O},sX:function(){return gt},t7:function(){return k},tA:function(){return x},uC:function(){return _},up:function(){return ft},wr:function(){return st},xI:function(){return vt},yb:function(){return S},yk:function(){return h},yr:function(){return L}});var c=function(t){return"/persons/".concat(t)},u="/persons",a=function(t,n){return"/competitions/".concat(t,"/admin/results/").concat(n,"/new")},s=function(t){return"/admin/results/".concat(t)},f=function(t){return"/admin/results/".concat(t,"/edit")},p=function(t){return"/posts.".concat(arguments.length>1&&void 0!==arguments[1]?arguments[1]:"json","?page=").concat(t)},l=function(t,n){var r=arguments.length>2&&void 0!==arguments[2]?arguments[2]:void 0,e=arguments.length>3&&void 0!==arguments[3]?arguments[3]:void 0,o=arguments.length>4&&void 0!==arguments[4]?arguments[4]:void 0,i=arguments.length>5&&void 0!==arguments[5]?arguments[5]:"json",c=new URLSearchParams("per_page=".concat(t,"&page=").concat(n));return r&&r.length>0&&c.append("tags","".concat(r)),o&&c.append("competitions","".concat(o)),e&&c.append("q",e),"/incidents.".concat(i,"?").concat(c.toString())},h="/incidents/new",d=function(t){return"/incidents/".concat(t)},v="/",y="/competitions",m=function(t){return"/competitions/".concat(t)},g=function(t){return"/competitions/".concat(t,"/report")},b=function(t){return"/api/v0/competitions/".concat(t)},w=function(t,n){return"/api/v0/competitions/".concat(t,"/results/").concat(n)},_=function(t,n){return"/competitions/".concat(t,"/results/all?event=").concat(n)},j=function(t){return"/api/v0/search?q=".concat(t)},O=function(t){return"/api/v0/search/competitions?q=".concat(t)},x=function(t,n){return"/api/v0/competitions/".concat(t,"/scrambles/").concat(n)},L=function(t){return"/competitions/".concat(t,"/admin/check-existing-results")},P=function(t,n){return"/admin/check_regional_records?competition_id=".concat(t,"&event_id=").concat(n)},S=function(t){return"/admin/events_data/".concat(t)},E="/admin/compute_auxiliary_data",T=function(t){var n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:void 0,r=arguments.length>2&&void 0!==arguments[2]?arguments[2]:void 0,e=arguments.length>3&&void 0!==arguments[3]?arguments[3]:void 0,o=new URLSearchParams("person_id=".concat(t));return n&&(o.append("competition_id",n),r&&(o.append("event_id",r),e&&o.append("round_type_id",e))),"/admin/fix_results?".concat(o.toString())},k="/persons/new_id",A=function(t){return"/api/v0/persons/".concat(t)},G=function(t){return"/api/v0/users/".concat(t)},I=function(t){return"/api/v0/search/persons?q=".concat(t)},R=function(t){return"/api/v0/search/users?q=".concat(t)},C="/api/v0/geocoding/search",q=function(t){return"/competitions/".concat(t,"/announcement_data")},N=function(t){return"/competitions/".concat(t,"/user_preferences")},U=function(t){return"/competitions/".concat(t,"/confirmation_data")},F=function(t){return"/competitions/".concat(t,"/announce")},M=function(t){var n=arguments.length>1&&void 0!==arguments[1]&&arguments[1];return"/competitions/".concat(t,"/cancel?undo=").concat(n)},B=function(t){return"/competitions/".concat(t,"/close_full_registration")},H=function(t){return"/competitions/".concat(t,"/user_preference/notifications")},V=function(t){return"/competitions/".concat(t,"/confirm")},z="/competitions/edit/nearby-competitions-json",Z="/competitions/edit/series-eligible-competitions-json",K="/competitions/edit/registration-collisions-json",Q="/competitions/edit/calculate_dues",W="/admin/posting-index.json",X="/admin/start-posting",Y=function(t){return"/competitions/".concat(t,"/admin/import-results")},D=function(t){return"/competitions/".concat(t,"/admin/upload-results")},$=function(t){var n=new URLSearchParams;return n.append("groupType",t),"/api/v0/user_groups?".concat(n.toString())},J="/api/v0/user_groups",tt=function(t){return"/api/v0/user_groups/".concat(t)},nt=function(t,n){return"/api/v0/user_roles/dummyRoleId?userId=".concat(t)},rt="/api/v0/user_roles/dummyRoleId",et="/wfc/country-bands",ot="/panel/pending-claims",it="/competitions/for_senior",ct="/wfc/competitions_export",ut=function(t){return"/teams/".concat(t)},at="/api/v0/wfc/xero_users",st="/api/v0/wfc/dues_redirects",ft=function(t){return"/panel/pending-claims/".concat(t)},pt=function(t){var n=t.display,r=t.years,e=t.delegate;return"/competitions?".concat(i({display:n,years:r,delegate:e}))},lt=function(t){return"/competitions/for_senior/".concat(t)},ht="/admin/check_regional_records",dt=25,vt="/delegates",yt="/teams-committees-councils",mt="/translators",gt=function(t){return"/users/".concat(t,"/edit/avatar_thumbnail")},bt={users:{me:{permissions:"/api/v0/users/me/permissions"}},persons:{show:function(t){return"/api/v0/persons/".concat(t)}},wrt:{edit:function(t){return"/api/v0/wrt/persons/".concat(t)},destroy:function(t){return"/api/v0/wrt/persons/".concat(t)},resetClaimCount:function(t){return"/api/v0/wrt/persons/".concat(t,"/reset_claim_count")}},userRoles:{listOfUser:function(t,n){var r=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{},e=r.isActive,o=r.isGroupHidden,c=r.status,u=r.groupType;return"/api/v0/user_roles/user/".concat(t,"?").concat(i({sort:n,isActive:e,isGroupHidden:o,status:c,groupType:u}))},listOfGroup:function(t,n){var r=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{},e=r.isActive,o=r.isGroupHidden,c=r.status,u=r.isLead;return"/api/v0/user_roles/group/".concat(t,"?").concat(i({sort:n,isActive:e,isGroupHidden:o,status:c,isLead:u}))},listOfGroupType:function(t,n){var r=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{},e=r.status,o=r.isActive,c=r.extraMetadata,u=r.isLead;return"/api/v0/user_roles/group-type/".concat(t,"?").concat(i({sort:n,status:e,isActive:o,extraMetadata:c,isLead:u}))},create:function(){return"/api/v0/user_roles"},update:function(t){return"/api/v0/user_roles/".concat(t)},delete:function(t){return"/api/v0/user_roles/".concat(t)},search:function(t,n){return"/api/v0/user_roles/search?".concat(i({query:t,groupType:n}))}},userGroups:{list:function(t,n){var r=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{},e=r.isActive,o=r.parentGroupId;return"/api/v0/user_groups?".concat(i({groupType:t,sort:n,isActive:e,parentGroupId:o}))}},competitions:{list:"/api/v0/competitions"},delegates:{list:"/api/v0/delegates",searchIndex:"/api/v0/delegates/search-index"}},wt={board:{regionsManager:"/panel/board#regions-manager"},wst:{translators:"/panel/wst#translators"},wrt:{editPerson:function(t){return"/panel/wrt?wcaId=".concat(t,"#edit-person")}}}}}]);
//# sourceMappingURL=754-6b0343cb1fb7f87a2218.js.map