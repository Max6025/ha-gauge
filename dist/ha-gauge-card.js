"use strict";(()=>{var ze=Object.defineProperty;var Ct=Object.getOwnPropertyDescriptor;var f=(r,e)=>()=>(r&&(e=r(r=0)),e);var Tt=(r,e)=>{for(var t in e)ze(r,t,{get:e[t],enumerable:!0})};var $=(r,e,t,i)=>{for(var n=i>1?void 0:i?Ct(e,t):e,o=r.length-1,a;o>=0;o--)(a=r[o])&&(n=(i?a(e,t,n):a(n))||n);return i&&n&&ze(e,t,n),n};var ie,ne,he,qe,q,Ge,G,pe,re,fe=f(()=>{ie=window,ne=ie.ShadowRoot&&(ie.ShadyCSS===void 0||ie.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,he=Symbol(),qe=new WeakMap,q=class{constructor(e,t,i){if(this._$cssResult$=!0,i!==he)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e,this.t=t}get styleSheet(){let e=this.o,t=this.t;if(ne&&e===void 0){let i=t!==void 0&&t.length===1;i&&(e=qe.get(t)),e===void 0&&((this.o=e=new CSSStyleSheet).replaceSync(this.cssText),i&&qe.set(t,e))}return e}toString(){return this.cssText}},Ge=r=>new q(typeof r=="string"?r:r+"",void 0,he),G=(r,...e)=>{let t=r.length===1?r[0]:e.reduce((i,n,o)=>i+(a=>{if(a._$cssResult$===!0)return a.cssText;if(typeof a=="number")return a;throw Error("Value passed to 'css' function must be a 'css' function result: "+a+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(n)+r[o+1],r[0]);return new q(t,r,he)},pe=(r,e)=>{ne?r.adoptedStyleSheets=e.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet):e.forEach(t=>{let i=document.createElement("style"),n=ie.litNonce;n!==void 0&&i.setAttribute("nonce",n),i.textContent=t.cssText,r.appendChild(i)})},re=ne?r=>r:r=>r instanceof CSSStyleSheet?(e=>{let t="";for(let i of e.cssRules)t+=i.cssText;return Ge(t)})(r):r});var ge,oe,Be,Nt,We,ve,Ke,_e,ye,w,ae=f(()=>{fe();fe();oe=window,Be=oe.trustedTypes,Nt=Be?Be.emptyScript:"",We=oe.reactiveElementPolyfillSupport,ve={toAttribute(r,e){switch(e){case Boolean:r=r?Nt:null;break;case Object:case Array:r=r==null?r:JSON.stringify(r)}return r},fromAttribute(r,e){let t=r;switch(e){case Boolean:t=r!==null;break;case Number:t=r===null?null:Number(r);break;case Object:case Array:try{t=JSON.parse(r)}catch{t=null}}return t}},Ke=(r,e)=>e!==r&&(e==e||r==r),_e={attribute:!0,type:String,converter:ve,reflect:!1,hasChanged:Ke},ye="finalized",w=class extends HTMLElement{constructor(){super(),this._$Ei=new Map,this.isUpdatePending=!1,this.hasUpdated=!1,this._$El=null,this._$Eu()}static addInitializer(e){var t;this.finalize(),((t=this.h)!==null&&t!==void 0?t:this.h=[]).push(e)}static get observedAttributes(){this.finalize();let e=[];return this.elementProperties.forEach((t,i)=>{let n=this._$Ep(i,t);n!==void 0&&(this._$Ev.set(n,i),e.push(n))}),e}static createProperty(e,t=_e){if(t.state&&(t.attribute=!1),this.finalize(),this.elementProperties.set(e,t),!t.noAccessor&&!this.prototype.hasOwnProperty(e)){let i=typeof e=="symbol"?Symbol():"__"+e,n=this.getPropertyDescriptor(e,i,t);n!==void 0&&Object.defineProperty(this.prototype,e,n)}}static getPropertyDescriptor(e,t,i){return{get(){return this[t]},set(n){let o=this[e];this[t]=n,this.requestUpdate(e,o,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this.elementProperties.get(e)||_e}static finalize(){if(this.hasOwnProperty(ye))return!1;this[ye]=!0;let e=Object.getPrototypeOf(this);if(e.finalize(),e.h!==void 0&&(this.h=[...e.h]),this.elementProperties=new Map(e.elementProperties),this._$Ev=new Map,this.hasOwnProperty("properties")){let t=this.properties,i=[...Object.getOwnPropertyNames(t),...Object.getOwnPropertySymbols(t)];for(let n of i)this.createProperty(n,t[n])}return this.elementStyles=this.finalizeStyles(this.styles),!0}static finalizeStyles(e){let t=[];if(Array.isArray(e)){let i=new Set(e.flat(1/0).reverse());for(let n of i)t.unshift(re(n))}else e!==void 0&&t.push(re(e));return t}static _$Ep(e,t){let i=t.attribute;return i===!1?void 0:typeof i=="string"?i:typeof e=="string"?e.toLowerCase():void 0}_$Eu(){var e;this._$E_=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$Eg(),this.requestUpdate(),(e=this.constructor.h)===null||e===void 0||e.forEach(t=>t(this))}addController(e){var t,i;((t=this._$ES)!==null&&t!==void 0?t:this._$ES=[]).push(e),this.renderRoot!==void 0&&this.isConnected&&((i=e.hostConnected)===null||i===void 0||i.call(e))}removeController(e){var t;(t=this._$ES)===null||t===void 0||t.splice(this._$ES.indexOf(e)>>>0,1)}_$Eg(){this.constructor.elementProperties.forEach((e,t)=>{this.hasOwnProperty(t)&&(this._$Ei.set(t,this[t]),delete this[t])})}createRenderRoot(){var e;let t=(e=this.shadowRoot)!==null&&e!==void 0?e:this.attachShadow(this.constructor.shadowRootOptions);return pe(t,this.constructor.elementStyles),t}connectedCallback(){var e;this.renderRoot===void 0&&(this.renderRoot=this.createRenderRoot()),this.enableUpdating(!0),(e=this._$ES)===null||e===void 0||e.forEach(t=>{var i;return(i=t.hostConnected)===null||i===void 0?void 0:i.call(t)})}enableUpdating(e){}disconnectedCallback(){var e;(e=this._$ES)===null||e===void 0||e.forEach(t=>{var i;return(i=t.hostDisconnected)===null||i===void 0?void 0:i.call(t)})}attributeChangedCallback(e,t,i){this._$AK(e,i)}_$EO(e,t,i=_e){var n;let o=this.constructor._$Ep(e,i);if(o!==void 0&&i.reflect===!0){let a=(((n=i.converter)===null||n===void 0?void 0:n.toAttribute)!==void 0?i.converter:ve).toAttribute(t,i.type);this._$El=e,a==null?this.removeAttribute(o):this.setAttribute(o,a),this._$El=null}}_$AK(e,t){var i;let n=this.constructor,o=n._$Ev.get(e);if(o!==void 0&&this._$El!==o){let a=n.getPropertyOptions(o),c=typeof a.converter=="function"?{fromAttribute:a.converter}:((i=a.converter)===null||i===void 0?void 0:i.fromAttribute)!==void 0?a.converter:ve;this._$El=o,this[o]=c.fromAttribute(t,a.type),this._$El=null}}requestUpdate(e,t,i){let n=!0;e!==void 0&&(((i=i||this.constructor.getPropertyOptions(e)).hasChanged||Ke)(this[e],t)?(this._$AL.has(e)||this._$AL.set(e,t),i.reflect===!0&&this._$El!==e&&(this._$EC===void 0&&(this._$EC=new Map),this._$EC.set(e,i))):n=!1),!this.isUpdatePending&&n&&(this._$E_=this._$Ej())}async _$Ej(){this.isUpdatePending=!0;try{await this._$E_}catch(t){Promise.reject(t)}let e=this.scheduleUpdate();return e!=null&&await e,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){var e;if(!this.isUpdatePending)return;this.hasUpdated,this._$Ei&&(this._$Ei.forEach((n,o)=>this[o]=n),this._$Ei=void 0);let t=!1,i=this._$AL;try{t=this.shouldUpdate(i),t?(this.willUpdate(i),(e=this._$ES)===null||e===void 0||e.forEach(n=>{var o;return(o=n.hostUpdate)===null||o===void 0?void 0:o.call(n)}),this.update(i)):this._$Ek()}catch(n){throw t=!1,this._$Ek(),n}t&&this._$AE(i)}willUpdate(e){}_$AE(e){var t;(t=this._$ES)===null||t===void 0||t.forEach(i=>{var n;return(n=i.hostUpdated)===null||n===void 0?void 0:n.call(i)}),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(e)),this.updated(e)}_$Ek(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$E_}shouldUpdate(e){return!0}update(e){this._$EC!==void 0&&(this._$EC.forEach((t,i)=>this._$EO(i,this[i],t)),this._$EC=void 0),this._$Ek()}updated(e){}firstUpdated(e){}};w[ye]=!0,w.elementProperties=new Map,w.elementStyles=[],w.shadowRootOptions={mode:"open"},We==null||We({ReactiveElement:w}),((ge=oe.reactiveElementVersions)!==null&&ge!==void 0?ge:oe.reactiveElementVersions=[]).push("1.6.3")});function at(r,e){if(!Array.isArray(r)||!r.hasOwnProperty("raw"))throw Error("invalid template strings array");return Ye!==void 0?Ye.createHTML(e):e}function L(r,e,t=r,i){var n,o,a,c;if(e===I)return e;let s=i!==void 0?(n=t._$Co)===null||n===void 0?void 0:n[i]:t._$Cl,l=K(e)?void 0:e._$litDirective$;return(s==null?void 0:s.constructor)!==l&&((o=s==null?void 0:s._$AO)===null||o===void 0||o.call(s,!1),l===void 0?s=void 0:(s=new l(r),s._$AT(r,t,i)),i!==void 0?((a=(c=t)._$Co)!==null&&a!==void 0?a:c._$Co=[])[i]=s:t._$Cl=s),s!==void 0&&(e=L(r,s._$AS(r,e.values),s,i)),e}var be,se,F,Ye,we,S,it,Ot,P,W,K,nt,Dt,$e,B,Ze,Je,D,Xe,Qe,rt,ot,x,v,I,u,et,M,Mt,Y,xe,Z,V,Ae,Pt,Se,Ee,ke,tt,st,le=f(()=>{se=window,F=se.trustedTypes,Ye=F?F.createPolicy("lit-html",{createHTML:r=>r}):void 0,we="$lit$",S=`lit$${(Math.random()+"").slice(9)}$`,it="?"+S,Ot=`<${it}>`,P=document,W=()=>P.createComment(""),K=r=>r===null||typeof r!="object"&&typeof r!="function",nt=Array.isArray,Dt=r=>nt(r)||typeof(r==null?void 0:r[Symbol.iterator])=="function",$e=`[ 	
\f\r]`,B=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,Ze=/-->/g,Je=/>/g,D=RegExp(`>|${$e}(?:([^\\s"'>=/]+)(${$e}*=${$e}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),Xe=/'/g,Qe=/"/g,rt=/^(?:script|style|textarea|title)$/i,ot=r=>(e,...t)=>({_$litType$:r,strings:e,values:t}),x=ot(1),v=ot(2),I=Symbol.for("lit-noChange"),u=Symbol.for("lit-nothing"),et=new WeakMap,M=P.createTreeWalker(P,129,null,!1);Mt=(r,e)=>{let t=r.length-1,i=[],n,o=e===2?"<svg>":"",a=B;for(let c=0;c<t;c++){let s=r[c],l,d,m=-1,h=0;for(;h<s.length&&(a.lastIndex=h,d=a.exec(s),d!==null);)h=a.lastIndex,a===B?d[1]==="!--"?a=Ze:d[1]!==void 0?a=Je:d[2]!==void 0?(rt.test(d[2])&&(n=RegExp("</"+d[2],"g")),a=D):d[3]!==void 0&&(a=D):a===D?d[0]===">"?(a=n!=null?n:B,m=-1):d[1]===void 0?m=-2:(m=a.lastIndex-d[2].length,l=d[1],a=d[3]===void 0?D:d[3]==='"'?Qe:Xe):a===Qe||a===Xe?a=D:a===Ze||a===Je?a=B:(a=D,n=void 0);let p=a===D&&r[c+1].startsWith("/>")?" ":"";o+=a===B?s+Ot:m>=0?(i.push(l),s.slice(0,m)+we+s.slice(m)+S+p):s+S+(m===-2?(i.push(void 0),c):p)}return[at(r,o+(r[t]||"<?>")+(e===2?"</svg>":"")),i]},Y=class r{constructor({strings:e,_$litType$:t},i){let n;this.parts=[];let o=0,a=0,c=e.length-1,s=this.parts,[l,d]=Mt(e,t);if(this.el=r.createElement(l,i),M.currentNode=this.el.content,t===2){let m=this.el.content,h=m.firstChild;h.remove(),m.append(...h.childNodes)}for(;(n=M.nextNode())!==null&&s.length<c;){if(n.nodeType===1){if(n.hasAttributes()){let m=[];for(let h of n.getAttributeNames())if(h.endsWith(we)||h.startsWith(S)){let p=d[a++];if(m.push(h),p!==void 0){let H=n.getAttribute(p.toLowerCase()+we).split(S),y=/([.?@])?(.*)/.exec(p);s.push({type:1,index:o,name:y[2],strings:H,ctor:y[1]==="."?Ae:y[1]==="?"?Se:y[1]==="@"?Ee:V})}else s.push({type:6,index:o})}for(let h of m)n.removeAttribute(h)}if(rt.test(n.tagName)){let m=n.textContent.split(S),h=m.length-1;if(h>0){n.textContent=F?F.emptyScript:"";for(let p=0;p<h;p++)n.append(m[p],W()),M.nextNode(),s.push({type:2,index:++o});n.append(m[h],W())}}}else if(n.nodeType===8)if(n.data===it)s.push({type:2,index:o});else{let m=-1;for(;(m=n.data.indexOf(S,m+1))!==-1;)s.push({type:7,index:o}),m+=S.length-1}o++}}static createElement(e,t){let i=P.createElement("template");return i.innerHTML=e,i}};xe=class{constructor(e,t){this._$AV=[],this._$AN=void 0,this._$AD=e,this._$AM=t}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(e){var t;let{el:{content:i},parts:n}=this._$AD,o=((t=e==null?void 0:e.creationScope)!==null&&t!==void 0?t:P).importNode(i,!0);M.currentNode=o;let a=M.nextNode(),c=0,s=0,l=n[0];for(;l!==void 0;){if(c===l.index){let d;l.type===2?d=new Z(a,a.nextSibling,this,e):l.type===1?d=new l.ctor(a,l.name,l.strings,this,e):l.type===6&&(d=new ke(a,this,e)),this._$AV.push(d),l=n[++s]}c!==(l==null?void 0:l.index)&&(a=M.nextNode(),c++)}return M.currentNode=P,o}v(e){let t=0;for(let i of this._$AV)i!==void 0&&(i.strings!==void 0?(i._$AI(e,i,t),t+=i.strings.length-2):i._$AI(e[t])),t++}},Z=class r{constructor(e,t,i,n){var o;this.type=2,this._$AH=u,this._$AN=void 0,this._$AA=e,this._$AB=t,this._$AM=i,this.options=n,this._$Cp=(o=n==null?void 0:n.isConnected)===null||o===void 0||o}get _$AU(){var e,t;return(t=(e=this._$AM)===null||e===void 0?void 0:e._$AU)!==null&&t!==void 0?t:this._$Cp}get parentNode(){let e=this._$AA.parentNode,t=this._$AM;return t!==void 0&&(e==null?void 0:e.nodeType)===11&&(e=t.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,t=this){e=L(this,e,t),K(e)?e===u||e==null||e===""?(this._$AH!==u&&this._$AR(),this._$AH=u):e!==this._$AH&&e!==I&&this._(e):e._$litType$!==void 0?this.g(e):e.nodeType!==void 0?this.$(e):Dt(e)?this.T(e):this._(e)}k(e){return this._$AA.parentNode.insertBefore(e,this._$AB)}$(e){this._$AH!==e&&(this._$AR(),this._$AH=this.k(e))}_(e){this._$AH!==u&&K(this._$AH)?this._$AA.nextSibling.data=e:this.$(P.createTextNode(e)),this._$AH=e}g(e){var t;let{values:i,_$litType$:n}=e,o=typeof n=="number"?this._$AC(e):(n.el===void 0&&(n.el=Y.createElement(at(n.h,n.h[0]),this.options)),n);if(((t=this._$AH)===null||t===void 0?void 0:t._$AD)===o)this._$AH.v(i);else{let a=new xe(o,this),c=a.u(this.options);a.v(i),this.$(c),this._$AH=a}}_$AC(e){let t=et.get(e.strings);return t===void 0&&et.set(e.strings,t=new Y(e)),t}T(e){nt(this._$AH)||(this._$AH=[],this._$AR());let t=this._$AH,i,n=0;for(let o of e)n===t.length?t.push(i=new r(this.k(W()),this.k(W()),this,this.options)):i=t[n],i._$AI(o),n++;n<t.length&&(this._$AR(i&&i._$AB.nextSibling,n),t.length=n)}_$AR(e=this._$AA.nextSibling,t){var i;for((i=this._$AP)===null||i===void 0||i.call(this,!1,!0,t);e&&e!==this._$AB;){let n=e.nextSibling;e.remove(),e=n}}setConnected(e){var t;this._$AM===void 0&&(this._$Cp=e,(t=this._$AP)===null||t===void 0||t.call(this,e))}},V=class{constructor(e,t,i,n,o){this.type=1,this._$AH=u,this._$AN=void 0,this.element=e,this.name=t,this._$AM=n,this.options=o,i.length>2||i[0]!==""||i[1]!==""?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=u}get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}_$AI(e,t=this,i,n){let o=this.strings,a=!1;if(o===void 0)e=L(this,e,t,0),a=!K(e)||e!==this._$AH&&e!==I,a&&(this._$AH=e);else{let c=e,s,l;for(e=o[0],s=0;s<o.length-1;s++)l=L(this,c[i+s],t,s),l===I&&(l=this._$AH[s]),a||(a=!K(l)||l!==this._$AH[s]),l===u?e=u:e!==u&&(e+=(l!=null?l:"")+o[s+1]),this._$AH[s]=l}a&&!n&&this.j(e)}j(e){e===u?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,e!=null?e:"")}},Ae=class extends V{constructor(){super(...arguments),this.type=3}j(e){this.element[this.name]=e===u?void 0:e}},Pt=F?F.emptyScript:"",Se=class extends V{constructor(){super(...arguments),this.type=4}j(e){e&&e!==u?this.element.setAttribute(this.name,Pt):this.element.removeAttribute(this.name)}},Ee=class extends V{constructor(e,t,i,n,o){super(e,t,i,n,o),this.type=5}_$AI(e,t=this){var i;if((e=(i=L(this,e,t,0))!==null&&i!==void 0?i:u)===I)return;let n=this._$AH,o=e===u&&n!==u||e.capture!==n.capture||e.once!==n.once||e.passive!==n.passive,a=e!==u&&(n===u||o);o&&this.element.removeEventListener(this.name,this,n),a&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){var t,i;typeof this._$AH=="function"?this._$AH.call((i=(t=this.options)===null||t===void 0?void 0:t.host)!==null&&i!==void 0?i:this.element,e):this._$AH.handleEvent(e)}},ke=class{constructor(e,t,i){this.element=e,this.type=6,this._$AN=void 0,this._$AM=t,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(e){L(this,e)}},tt=se.litHtmlPolyfillSupport;tt==null||tt(Y,Z),((be=se.litHtmlVersions)!==null&&be!==void 0?be:se.litHtmlVersions=[]).push("2.8.0");st=(r,e,t)=>{var i,n;let o=(i=t==null?void 0:t.renderBefore)!==null&&i!==void 0?i:e,a=o._$litPart$;if(a===void 0){let c=(n=t==null?void 0:t.renderBefore)!==null&&n!==void 0?n:null;o._$litPart$=a=new Z(e.insertBefore(W(),c),c,void 0,t!=null?t:{})}return a._$AI(r),a}});var Ce,Te,b,lt,ct=f(()=>{ae();ae();le();le();b=class extends w{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){var e,t;let i=super.createRenderRoot();return(e=(t=this.renderOptions).renderBefore)!==null&&e!==void 0||(t.renderBefore=i.firstChild),i}update(e){let t=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(e),this._$Do=st(t,this.renderRoot,this.renderOptions)}connectedCallback(){var e;super.connectedCallback(),(e=this._$Do)===null||e===void 0||e.setConnected(!0)}disconnectedCallback(){var e;super.disconnectedCallback(),(e=this._$Do)===null||e===void 0||e.setConnected(!1)}render(){return I}};b.finalized=!0,b._$litElement$=!0,(Ce=globalThis.litElementHydrateSupport)===null||Ce===void 0||Ce.call(globalThis,{LitElement:b});lt=globalThis.litElementPolyfillSupport;lt==null||lt({LitElement:b});((Te=globalThis.litElementVersions)!==null&&Te!==void 0?Te:globalThis.litElementVersions=[]).push("3.3.3")});var ut=f(()=>{});var Ne=f(()=>{ae();le();ct();ut()});var ce,dt=f(()=>{ce=r=>e=>typeof e=="function"?((t,i)=>(customElements.define(t,i),i))(r,e):((t,i)=>{let{kind:n,elements:o}=i;return{kind:n,elements:o,finisher(a){customElements.define(t,a)}}})(r,e)});function j(r){return(e,t)=>t!==void 0?Rt(r,e,t):It(r,e)}var It,Rt,Oe=f(()=>{It=(r,e)=>e.kind==="method"&&e.descriptor&&!("value"in e.descriptor)?{...e,finisher(t){t.createProperty(e.key,r)}}:{kind:"field",key:Symbol(),placement:"own",descriptor:{},originalKey:e.key,initializer(){typeof e.initializer=="function"&&(this[e.key]=e.initializer.call(this))},finisher(t){t.createProperty(e.key,r)}},Rt=(r,e,t)=>{e.constructor.createProperty(t,r)}});function J(r){return j({...r,state:!0})}var mt=f(()=>{Oe();});var R=f(()=>{});var ht=f(()=>{R();});var pt=f(()=>{R();});var ft=f(()=>{R();});var gt=f(()=>{R();});var De,xi,Me=f(()=>{R();xi=((De=window.HTMLSlotElement)===null||De===void 0?void 0:De.prototype.assignedElements)!=null?(r,e)=>r.assignedElements(e):(r,e)=>r.assignedNodes(e).filter(t=>t.nodeType===Node.ELEMENT_NODE)});var _t=f(()=>{R();Me();});var Pe=f(()=>{dt();Oe();mt();ht();pt();ft();gt();Me();_t()});var bt,A,$t,wt,Ie=f(()=>{"use strict";bt="1.0.0",A={min:0,max:100,decimals:1,needle:!0,animation:!0,animation_duration:900,style:"modern",sweep:180,show_ticks:!0,show_value:!0,glow:!1,segments:[{from:0,color:"#43a047"},{from:60,color:"#fdd835"},{from:85,color:"#e53935"}]},$t=[{value:"modern",label:"Modern"},{value:"neon",label:"Neon Glow"},{value:"minimal",label:"Minimal"},{value:"gradient",label:"Gradient"},{value:"flat",label:"Flat"}],wt=[{value:"180",label:"Halbkreis (180\xB0)"},{value:"270",label:"Dreiviertelkreis (270\xB0)"}]});var kt={};Tt(kt,{HaGaugeCardEditor:()=>k});var qt,Gt,k,Ue=f(()=>{"use strict";Ne();Pe();Ie();qt=[{name:"entity",selector:{entity:{domain:["sensor","number","input_number"]}}},{name:"name",selector:{text:{}}},{name:"unit",selector:{text:{}}},{name:"min",selector:{number:{mode:"box"}}},{name:"max",selector:{number:{mode:"box"}}},{name:"decimals",selector:{number:{mode:"box",min:0,max:5,step:1}}},{name:"style",selector:{select:{mode:"dropdown",options:$t}}},{name:"sweep",selector:{select:{mode:"dropdown",options:wt}}},{name:"needle",selector:{boolean:{}}},{name:"needle_color",selector:{text:{}}},{name:"show_value",selector:{boolean:{}}},{name:"show_ticks",selector:{boolean:{}}},{name:"animation",selector:{boolean:{}}},{name:"animation_duration",selector:{number:{mode:"box",min:0,max:5e3,step:50,unit_of_measurement:"ms"}}},{name:"glow",selector:{boolean:{}}},{name:"tap_action",selector:{ui_action:{}}},{name:"hold_action",selector:{ui_action:{}}},{name:"double_tap_action",selector:{ui_action:{}}}],Gt={entity:"Entity",name:"Titel (optional)",unit:"Einheit (\xFCberschreibt Entity-Einheit)",min:"Minimum",max:"Maximum",decimals:"Nachkommastellen",style:"Design",sweep:"Bogenform",needle:"Zeiger anzeigen",needle_color:"Zeigerfarbe (CSS-Farbe, leer = Standard)",show_value:"Messwert anzeigen",show_ticks:"Skalenstriche anzeigen",animation:"Animation aktivieren",animation_duration:"Animationsdauer",glow:"Leuchteffekt (Glow)",tap_action:"Tap-Aktion",hold_action:"Halten-Aktion",double_tap_action:"Doppel-Tap-Aktion"},k=class extends b{setConfig(e){var t;this._config={...A,...e,segments:(t=e.segments)!=null?t:A.segments}}render(){if(!this.hass||!this._config)return x``;let e={...this._config,sweep:String(this._config.sweep)};return x`
      <div class="editor">
        <ha-form
          .hass=${this.hass}
          .data=${e}
          .schema=${qt}
          .computeLabel=${t=>{var i;return(i=Gt[t.name])!=null?i:t.name}}
          @value-changed=${this._formValueChanged}
        ></ha-form>

        <div class="segments">
          <div class="segments-header">
            <span>Farbsegmente (Schwellenwerte)</span>
            <mwc-button @click=${this._addSegment}>+ Segment</mwc-button>
          </div>
          ${this._segments.map((t,i)=>x`
              <div class="segment-row">
                <label class="field">
                  <span class="field-label">ab Wert</span>
                  <input
                    type="number"
                    step="any"
                    .value=${String(t.from)}
                    @change=${n=>this._updateSegment(i,"from",n.target.value)}
                  />
                </label>
                <input
                  class="color-input"
                  type="color"
                  .value=${this._toHex(t.color)}
                  @input=${n=>this._updateSegment(i,"color",n.target.value)}
                />
                <label class="field">
                  <span class="field-label">Farbe (CSS)</span>
                  <input
                    type="text"
                    .value=${t.color}
                    @change=${n=>this._updateSegment(i,"color",n.target.value)}
                  />
                </label>
                <button class="remove-button" type="button" title="Entfernen" @click=${()=>this._removeSegment(i)}>
                  ✕
                </button>
              </div>
            `)}
          ${this._segments.length===0?x`<div class="hint">Keine Segmente – der Zeiger nutzt eine Standardfarbe.</div>`:u}
        </div>
      </div>
    `}get _segments(){var e;return[...(e=this._config.segments)!=null?e:[]]}_toHex(e){return/^#[0-9a-fA-F]{6}$/.test(e)?e:"#808080"}_formValueChanged(e){e.stopPropagation();let t={...e.detail.value};typeof t.sweep=="string"&&(t.sweep=Number(t.sweep)),this._config={...this._config,...t},this._fireConfigChanged()}_addSegment(){let e=[...this._config.segments,{from:this._config.max,color:"#43a047"}];this._config={...this._config,segments:e},this._fireConfigChanged()}_removeSegment(e){let t=this._config.segments.filter((i,n)=>n!==e);this._config={...this._config,segments:t},this._fireConfigChanged()}_updateSegment(e,t,i){let n=this._config.segments.map((o,a)=>{if(a!==e)return o;if(t==="from"){let c=Number(i);return{...o,from:Number.isNaN(c)?o.from:c}}return{...o,color:i}});this._config={...this._config,segments:n},this._fireConfigChanged()}_fireConfigChanged(){this.dispatchEvent(new CustomEvent("config-changed",{detail:{config:this._config}}))}};k.styles=G`
    .editor {
      display: flex;
      flex-direction: column;
      gap: 16px;
    }
    .segments {
      border-top: 1px solid var(--divider-color, #e0e0e0);
      padding-top: 12px;
    }
    .segments-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      font-weight: 500;
      margin-bottom: 8px;
    }
    .segment-row {
      display: grid;
      grid-template-columns: 1fr 40px 1fr auto;
      align-items: center;
      gap: 8px;
      margin-bottom: 8px;
    }
    .field {
      display: flex;
      flex-direction: column;
      gap: 2px;
    }
    .field-label {
      font-size: 11px;
      color: var(--secondary-text-color, #9e9e9e);
    }
    .field input {
      font: inherit;
      color: var(--primary-text-color, #212121);
      background: none;
      border: none;
      border-bottom: 1px solid var(--divider-color, #767676);
      padding: 6px 0;
      outline: none;
      min-width: 0;
    }
    .field input:focus {
      border-bottom: 2px solid var(--primary-color, #03a9f4);
    }
    .color-input {
      width: 36px;
      height: 36px;
      padding: 0;
      border: none;
      background: none;
    }
    .remove-button {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 36px;
      height: 36px;
      border-radius: 50%;
      border: none;
      background: none;
      color: var(--secondary-text-color, #9e9e9e);
      font-size: 14px;
      cursor: pointer;
    }
    .remove-button:hover {
      background: var(--secondary-background-color, rgba(127, 127, 127, 0.2));
    }
    .hint {
      color: var(--secondary-text-color, #9e9e9e);
      font-size: 12px;
    }
  `,$([j({attribute:!1})],k.prototype,"hass",2),$([J()],k.prototype,"_config",2),k=$([ce("ha-gauge-card-editor")],k)});Ne();Pe();var vt,yt;(function(r){r.language="language",r.system="system",r.comma_decimal="comma_decimal",r.decimal_comma="decimal_comma",r.space_comma="space_comma",r.none="none"})(vt||(vt={})),function(r){r.language="language",r.system="system",r.am_pm="12",r.twenty_four="24"}(yt||(yt={}));function Ht(r){return r.substr(0,r.indexOf("."))}var Ut=["closed","locked","off"];var de=function(r,e,t,i){i=i||{},t=t==null?{}:t;var n=new Event(e,{bubbles:i.bubbles===void 0||i.bubbles,cancelable:!!i.cancelable,composed:i.composed===void 0||i.composed});return n.detail=t,r.dispatchEvent(n),n};var ue=function(r){de(window,"haptic",r)},Ft=function(r,e,t){t===void 0&&(t=!1),t?history.replaceState(null,"",e):history.pushState(null,"",e),de(window,"location-changed",{replace:t})},Lt=function(r,e,t){t===void 0&&(t=!0);var i,n=Ht(e),o=n==="group"?"homeassistant":n;switch(n){case"lock":i=t?"unlock":"lock";break;case"cover":i=t?"open_cover":"close_cover";break;default:i=t?"turn_on":"turn_off"}return r.callService(o,i,{entity_id:e})},Vt=function(r,e){var t=Ut.includes(r.states[e].state);return Lt(r,e,t)},jt=function(r,e,t,i){if(i||(i={action:"more-info"}),!i.confirmation||i.confirmation.exemptions&&i.confirmation.exemptions.some(function(o){return o.user===e.user.id})||(ue("warning"),confirm(i.confirmation.text||"Are you sure you want to "+i.action+"?")))switch(i.action){case"more-info":(t.entity||t.camera_image)&&de(r,"hass-more-info",{entityId:t.entity?t.entity:t.camera_image});break;case"navigate":i.navigation_path&&Ft(0,i.navigation_path);break;case"url":i.url_path&&window.open(i.url_path);break;case"toggle":t.entity&&(Vt(e,t.entity),ue("success"));break;case"call-service":if(!i.service)return void ue("failure");var n=i.service.split(".",2);e.callService(n[0],n[1],i.service_data,i.target),ue("success");break;case"fire-dom-event":de(r,"ll-custom",i)}},Q=function(r,e,t,i){var n;i==="double_tap"&&t.double_tap_action?n=t.double_tap_action:i==="hold"&&t.hold_action?n=t.hold_action:i==="tap"&&t.tap_action&&(n=t.tap_action),jt(r,e,t,n)};function E(r){return r!==void 0&&r.action!=="none"}Ie();function Re(r,e,t){return Math.min(t,Math.max(e,r))}function xt(r,e,t,i){let n=i*Math.PI/180;return{x:r+t*Math.cos(n),y:e+t*Math.sin(n)}}function ee(r,e,t,i,n){let o=xt(r,e,t,i),a=xt(r,e,t,n),c=n-i>180?1:0;return`M ${o.x} ${o.y} A ${t} ${t} 0 ${c} 1 ${a.x} ${a.y}`}function He(r){return 270-r/2}function te(r,e,t,i){let n=Re((r-e)/(t-e||1),0,1);return He(i)+n*i}function At(r,e,t){return Re((r-e)/(t-e||1),0,1)*100}function St(r,e){var n,o;let t=[...e].sort((a,c)=>a.from-c.from),i=(o=(n=t[0])==null?void 0:n.color)!=null?o:"#43a047";for(let a of t)r>=a.from&&(i=a.color);return i}function zt(r){return 1-Math.pow(1-r,3)}function Et(r,e,t,i){if(t<=0||r===e)return i(e),()=>{};let n=!1,o=performance.now(),a=c=>{if(n)return;let s=c-o,l=Re(s/t,0,1),d=zt(l);i(r+(e-r)*d),l<1&&requestAnimationFrame(a)};return requestAnimationFrame(a),()=>{n=!0}}Ue();console.info(`%c HA-GAUGE-CARD %c v${bt} `,"color: #fff; background: #039be5; font-weight: 700; border-radius: 3px 0 0 3px; padding: 2px 0 2px 6px;","color: #039be5; background: #e1f5fe; font-weight: 700; border-radius: 0 3px 3px 0; padding: 2px 6px 2px 0;");var g=100,_=110,C=78,T=16,N=class extends b{constructor(){super(...arguments);this._displayValue=0;this._holdTriggered=!1;this._uid=Math.random().toString(36).slice(2,8);this._onPointerDown=()=>{this._holdTriggered=!1,E(this._config.hold_action)&&(this._holdTimer=window.setTimeout(()=>{this._holdTriggered=!0,Q(this,this.hass,this._config,"hold")},500))};this._onPointerUp=()=>{this._holdTimer&&(window.clearTimeout(this._holdTimer),this._holdTimer=void 0),!(this._holdTriggered||!E(this._config.tap_action))&&(E(this._config.double_tap_action)?this._tapTimer=window.setTimeout(()=>{Q(this,this.hass,this._config,"tap")},250):Q(this,this.hass,this._config,"tap"))};this._onPointerCancel=()=>{this._holdTimer&&(window.clearTimeout(this._holdTimer),this._holdTimer=void 0)};this._onDblClick=()=>{E(this._config.double_tap_action)&&(this._tapTimer&&(window.clearTimeout(this._tapTimer),this._tapTimer=void 0),Q(this,this.hass,this._config,"double_tap"))}}static async getConfigElement(){return await Promise.resolve().then(()=>(Ue(),kt)),document.createElement("ha-gauge-card-editor")}static getStubConfig(){return{entity:"",...A}}setConfig(t){var i,n;if(!t.entity)throw new Error("Bitte eine Entity ausw\xE4hlen (entity: sensor.xyz)");this._config={...A,...t,min:Number((i=t.min)!=null?i:A.min),max:Number((n=t.max)!=null?n:A.max),segments:t.segments&&t.segments.length>0?t.segments:A.segments}}getCardSize(){return 5}shouldUpdate(t){if(!this._config)return!1;if(t.has("_config")||t.has("_displayValue"))return!0;if(t.has("hass")){let i=t.get("hass");return i?i.states[this._config.entity]!==this.hass.states[this._config.entity]:!0}return!0}updated(t){(t.has("hass")||t.has("_config"))&&this._syncValue()}_syncValue(){var o;let t=this._targetValue;if(this._lastValue===void 0){this._lastValue=t,this._displayValue=t;return}if(t===this._lastValue)return;let i=this._displayValue;this._lastValue=t,(o=this._cancelAnimation)==null||o.call(this);let n=this._config.animation?this._config.animation_duration:0;this._cancelAnimation=Et(i,t,n,a=>{this._displayValue=a})}get _stateObj(){var t;return(t=this.hass)==null?void 0:t.states[this._config.entity]}get _targetValue(){let t=this._stateObj;if(!t)return this._config.min;let i=Number(t.state);return Number.isNaN(i)?this._config.min:i}get _unit(){var t,i;return this._config.unit!==void 0?this._config.unit:(i=(t=this._stateObj)==null?void 0:t.attributes.unit_of_measurement)!=null?i:""}get _name(){var t,i,n;return(n=(i=this._config.name)!=null?i:(t=this._stateObj)==null?void 0:t.attributes.friendly_name)!=null?n:this._config.entity}render(){if(!this._config||!this.hass)return x``;if(!this._stateObj)return x`
        <ha-card>
          <div class="not-found">Entity nicht gefunden: ${this._config.entity}</div>
        </ha-card>
      `;let{min:i,max:n,sweep:o,style:a,needle:c,show_ticks:s,show_value:l,glow:d}=this._config,m=Math.min(n,Math.max(i,this._displayValue)),h=He(o),p=h+o,H=te(m,i,n,o),y=this._sortedSegments,U=d||a==="neon";return x`
      <ha-card
        class="style-${a}"
        @pointerdown=${this._onPointerDown}
        @pointerup=${this._onPointerUp}
        @pointercancel=${this._onPointerCancel}
        @dblclick=${this._onDblClick}
        style=${E(this._config.tap_action)||E(this._config.hold_action)||E(this._config.double_tap_action)?"cursor:pointer":""}
      >
        <div class="card-content">
          <svg viewBox="0 0 200 170" preserveAspectRatio="xMidYMid meet">
            <defs>
              <filter id="ggb-glow-${this._uid}" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="3.2" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
              ${a==="gradient"?v`
                    <linearGradient id="ggb-gradient-${this._uid}" x1="0%" y1="0%" x2="100%" y2="0%">
                      ${y.map(O=>{let z=At(O.from,i,n);return v`<stop offset="${z}%" stop-color="${O.color}" />`})}
                    </linearGradient>
                  `:u}
            </defs>

            <path
              class="track"
              d=${ee(g,_,C,h,p)}
              fill="none"
              stroke-width=${T}
              stroke-linecap=${a==="flat"?"butt":"round"}
            />

            ${a==="minimal"?v`
                  <path
                    class="progress"
                    d=${ee(g,_,C,h,H)}
                    fill="none"
                    stroke=${St(m,y)}
                    stroke-width=${T/1.8}
                    stroke-linecap="round"
                    filter=${U?`url(#ggb-glow-${this._uid})`:u}
                  />
                `:a==="gradient"?v`
                  <path
                    class="progress"
                    d=${ee(g,_,C,h,p)}
                    fill="none"
                    stroke="url(#ggb-gradient-${this._uid})"
                    stroke-width=${T}
                    stroke-linecap="round"
                    filter=${U?`url(#ggb-glow-${this._uid})`:u}
                  />
                `:v`
                  ${y.map((O,z)=>{var Ve,je;let me=(je=(Ve=y[z+1])==null?void 0:Ve.from)!=null?je:n,Fe=te(O.from,i,n,o),Le=te(me,i,n,o);return Le<=Fe?u:v`
                      <path
                        d=${ee(g,_,C,Fe,Le)}
                        fill="none"
                        stroke=${O.color}
                        stroke-width=${T}
                        stroke-linecap=${a==="flat"?"butt":"round"}
                        filter=${U?`url(#ggb-glow-${this._uid})`:u}
                      />
                    `})}
                `}

            ${s?this._renderTicks(h,p,i,n):u}

            ${c?this._renderNeedle(H,U):u}

            ${l?v`
                  <text class="value" x="${g}" y="${_+36}" text-anchor="middle">
                    ${m.toFixed(this._config.decimals)}${this._unit?v`<tspan class="unit"> ${this._unit}</tspan>`:u}
                  </text>
                  <text class="name" x="${g}" y="${_+54}" text-anchor="middle">${this._name}</text>
                `:u}
          </svg>
        </div>
      </ha-card>
    `}get _sortedSegments(){return[...this._config.segments].sort((t,i)=>t.from-i.from)}_renderNeedle(t,i){let n=C-T/2-6;return v`
      <g
        class="needle"
        style="transform-origin: ${g}px ${_}px; transform: rotate(${t}deg);"
        filter=${i?`url(#ggb-glow-${this._uid})`:u}
      >
        <polygon points="${g-9},${_-6} ${g-9},${_+6} ${g+n},${_}" />
        <circle cx="${g}" cy="${_}" r="8" />
      </g>
    `}_renderTicks(t,i,n,o){let a=new Set([n,o,...this._sortedSegments.map(s=>s.from)]),c=Array.from(a).filter(s=>s>=n&&s<=o).sort((s,l)=>s-l);return v`
      ${c.map(s=>{let l=te(s,n,o,i-t),d=C-T/2-4,m=C+T/2+4,h=C+T/2+16,p=l*Math.PI/180,H=g+d*Math.cos(p),y=_+d*Math.sin(p),U=g+m*Math.cos(p),O=_+m*Math.sin(p),z=g+h*Math.cos(p),me=_+h*Math.sin(p);return v`
          <line class="tick" x1=${H} y1=${y} x2=${U} y2=${O} />
          <text class="tick-label" x=${z} y=${me} text-anchor="middle" dominant-baseline="middle">${s}</text>
        `})}
    `}};N.styles=G`
    :host {
      display: block;
    }
    ha-card {
      display: flex;
      align-items: center;
      justify-content: center;
      transition: background-color 180ms ease-in-out;
    }
    .card-content {
      width: 100%;
      padding: 8px 16px 12px;
    }
    svg {
      display: block;
      width: 100%;
      aspect-ratio: 200 / 170;
      overflow: visible;
    }
    .not-found {
      padding: 16px;
      color: var(--error-color, #db4437);
    }
    .track {
      stroke: var(--gauge-track-color, var(--secondary-background-color, #e0e0e0));
      opacity: 0.55;
    }
    .progress {
      transition: stroke-width 200ms ease;
    }
    .needle polygon,
    .needle circle {
      fill: var(--gauge-needle-color, var(--primary-text-color, #212121));
      transition: transform 120ms ease;
    }
    .needle {
      transition: transform 120ms linear;
    }
    .tick {
      stroke: var(--secondary-text-color, #9e9e9e);
      stroke-width: 1.5;
      opacity: 0.7;
    }
    .tick-label {
      font-size: 9px;
      fill: var(--secondary-text-color, #9e9e9e);
    }
    .value {
      font-size: 28px;
      font-weight: 600;
      fill: var(--primary-text-color, #212121);
    }
    .value .unit {
      font-size: 14px;
      font-weight: 400;
      fill: var(--secondary-text-color, #9e9e9e);
    }
    .name {
      font-size: 12px;
      fill: var(--secondary-text-color, #9e9e9e);
    }

    /* ---- Style presets ---- */
    ha-card.style-neon {
      background: var(--gauge-neon-bg, #101418);
    }
    .style-neon .value {
      fill: #fff;
    }
    .style-neon .name {
      fill: #90a4ae;
    }
    .style-neon .needle polygon,
    .style-neon .needle circle {
      fill: var(--gauge-needle-color, #fff);
    }
    .style-neon .track {
      opacity: 0.25;
    }

    .style-minimal .value {
      font-weight: 300;
    }
    .style-minimal .track {
      opacity: 0.3;
    }

    .style-flat .value {
      font-weight: 700;
      letter-spacing: -0.5px;
    }
    .style-flat .needle polygon,
    .style-flat .needle circle {
      transition: none;
    }
    .style-flat .needle {
      transition: none;
    }

    .style-gradient .progress {
      opacity: 0.95;
    }
  `,$([j({attribute:!1})],N.prototype,"hass",2),$([J()],N.prototype,"_config",2),$([J()],N.prototype,"_displayValue",2),N=$([ce("ha-gauge-card")],N);window.customCards=window.customCards||[];window.customCards.push({type:"ha-gauge-card",name:"HA Gauge Card",description:"Ein modernes, animiertes Gauge-Card mit Zeiger, Farbsegmenten und mehreren Design-Stilen.",preview:!0,documentationURL:"https://github.com/max6025/ha-gauge"});})();
/*! Bundled license information:

@lit/reactive-element/css-tag.js:
  (**
   * @license
   * Copyright 2019 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

@lit/reactive-element/reactive-element.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

lit-html/lit-html.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

lit-element/lit-element.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

lit-html/is-server.js:
  (**
   * @license
   * Copyright 2022 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

@lit/reactive-element/decorators/custom-element.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

@lit/reactive-element/decorators/property.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

@lit/reactive-element/decorators/state.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

@lit/reactive-element/decorators/base.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

@lit/reactive-element/decorators/event-options.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

@lit/reactive-element/decorators/query.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

@lit/reactive-element/decorators/query-all.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

@lit/reactive-element/decorators/query-async.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

@lit/reactive-element/decorators/query-assigned-elements.js:
  (**
   * @license
   * Copyright 2021 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

@lit/reactive-element/decorators/query-assigned-nodes.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)
*/
