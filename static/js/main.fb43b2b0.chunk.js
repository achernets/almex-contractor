(this["webpackJsonpalmex-contractor"]=this["webpackJsonpalmex-contractor"]||[]).push([[0],{102:function(e,t,n){e.exports={wrapper:"logo_wrapper__3vcav",text:"logo_text__1Cx8t"}},139:function(e,t,n){e.exports={loader:"loader_loader__2sbTU"}},141:function(e,t,n){e.exports={wrapper:"start-app-fail_wrapper__39QCk"}},147:function(e,t){},153:function(e,t,n){e.exports=n(241)},158:function(e,t,n){},168:function(e,t){},241:function(e,t,n){"use strict";n.r(t);var a={};n.r(a),n.d(a,"setThrift",(function(){return ae})),n.d(a,"MrkClientServiceClient",(function(){return ne}));var r=n(0),o=n.n(r),c=n(3),l=n.n(c),s=(n(158),n(20)),i=n(73),u=n(245),p=n(248),m=n(76),f=n(66),g=n(67),d=n(74),v=n(68),h=n(75),w=n(55),b=n(16),x=n.n(b),j=n(48),_=n(21),E=n(2),y=n.n(E),O=n(246),k=n(250),I=n(244),T=n(28),C=n.n(T),S=n(24),N=function(e){function t(){var e,n;Object(f.a)(this,t);for(var a=arguments.length,r=new Array(a),o=0;o<a;o++)r[o]=arguments[o];return(n=Object(d.a)(this,(e=Object(v.a)(t)).call.apply(e,[this].concat(r)))).setlang=function(e){var t,a;return x.a.async((function(r){for(;;)switch(r.prev=r.next){case 0:if(n.props.locale!==e.value){r.next=3;break}return r.abrupt("return",null);case 3:return r.prev=3,r.next=6,x.a.awrap(fetch("".concat("/almex-contractor","translates/").concat(e.value,".json")));case 6:return t=r.sent,r.next=9,x.a.awrap(t.json());case 9:a=r.sent,n.props.loadTranslations(Object(j.a)({},e.value,a)),n.props.setLocale(e.value),localStorage.setItem("lang",e.value),C.a.locale(e.value),r.next=19;break;case 16:r.prev=16,r.t0=r.catch(3),O.a.error({key:"locale_not_found",message:S.I18n.t("common.error"),description:S.I18n.t("SignIn.locale_not_found")});case 19:case"end":return r.stop()}}),null,null,[[3,16]])},n}return Object(h.a)(t,e),Object(g.a)(t,[{key:"render",value:function(){var e=this,t=this.props,n=t.locale,a=t.language;return o.a.createElement(k.a,null,o.a.createElement(I.a.Text,{onClick:function(){return e.setlang(a)},className:y()(w.item,a.value===n?w.active:null)},a.value))}}]),t}(r.Component),A=Object(s.connect)((function(e){return{locale:e.i18n.locale}}),(function(e){return Object(_.bindActionCreators)({loadTranslations:S.loadTranslations,setLocale:S.setLocale},e)}))(N),L=function(e){function t(){return Object(f.a)(this,t),Object(d.a)(this,Object(v.a)(t).apply(this,arguments))}return Object(h.a)(t,e),Object(g.a)(t,[{key:"render",value:function(){var e=this.props.list,t=void 0===e?[]:e;return o.a.createElement(p.a,{className:w.list,type:"flex",justify:"center",align:"middle",gutter:16},t.map((function(e){return o.a.createElement(A,{key:e.value,language:e})})))}}]),t}(r.PureComponent),R=Object(s.connect)((function(e){return{list:e.i18n.list}}))(L),P=n(102),M=function(){return o.a.createElement("div",{className:P.wrapper},o.a.createElement("img",{src:"/assets/img/Logo.svg",alt:"logo"}),o.a.createElement("span",{className:P.text},"contractor"))},W=u.a.Content,B=function(){return o.a.createElement(u.a,{className:m.container},o.a.createElement(W,{className:m.wrapper},o.a.createElement(p.a,{className:m.content},o.a.createElement(M,null),o.a.createElement(R,null))))},F=n(139),G=n(243),J=function(){return o.a.createElement("div",{className:F.loader},o.a.createElement(G.a,null))},D=n(249),H=n(247),U=n(141),z=function(){return o.a.createElement(p.a,{type:"flex",justify:"center",align:"middle",className:U.wrapper},o.a.createElement(D.a,{message:"Error: failed to connect, server not responding",description:o.a.createElement(p.a,{type:"flex",justify:"center"},o.a.createElement(H.a,{type:"danger",onClick:function(){return window.location.reload()}},"Try again")),type:"error"}))},Q=Object(s.connect)((function(e){return{loading:e.asyncInitialState.loading,error:e.asyncInitialState.error}}))((function(e){var t=e.loading;return null!==e.error?o.a.createElement(z,null):o.a.createElement(o.a.Fragment,null,t?o.a.createElement(J,null):o.a.createElement(i.d,null,o.a.createElement(i.b,{exact:!0,path:"/signIn",component:B}),o.a.createElement(i.a,{to:"/signIn"})))}));Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));var X=n(53),$=n(127),q=n(142),K=n(57),V=n(72),Y={token:localStorage.getItem("token")||null,user:null,isFetching:!1},Z=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:Y,t=arguments.length>1?arguments[1]:void 0;return t.type,e},ee=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},t=arguments.length>1?arguments[1]:void 0;return t.type,e},te=n(50),ne=null,ae=function(e){var t;return x.a.async((function(n){for(;;)switch(n.prev=n.next){case 0:t=e.THRIFT,ne=new window.MrkClientServiceClient(new window.Thrift.Protocol(new window.Thrift.Transport("".concat(t.URL,"/").concat(t.API,"/thrift/mrk-client-json"))));case 2:case"end":return n.stop()}}))},re=n(145),oe=function(e){return new Promise((function(t,n){var a,r,o,c,l,s,i,u,p;return x.a.async((function(m){for(;;)switch(m.prev=m.next){case 0:return a=e(),r=Object(te.a)({},a.auth),m.prev=2,m.next=5,x.a.awrap(fetch("".concat("/almex-contractor","web-config.json")));case 5:return o=m.sent,m.next=8,x.a.awrap(o.json());case 8:return c=m.sent,m.next=11,x.a.awrap(ae(c));case 11:if(null===r.token){m.next=24;break}return m.prev=12,m.next=15,x.a.awrap(ne.isAuthSessionExpired(r.token));case 15:m.sent&&(r=Object(te.a)({},r,{token:null})),m.next=24;break;case 19:m.prev=19,m.t0=m.catch(12),m.t0,r=Object(te.a)({},r,{token:null}),localStorage.removeItem("token");case 24:return m.next=26,x.a.awrap(ne.getAllLanguages());case 26:return l=m.sent,m.next=29,x.a.awrap(ne.getInfo());case 29:return s=m.sent,i=localStorage.getItem("lang")||c.LANG,m.next=33,x.a.awrap(fetch("".concat("/almex-contractor","translates/").concat(i,".json")));case 33:return u=m.sent,m.t1=j.a,m.t2={},m.t3=i,m.next=39,x.a.awrap(u.json());case 39:m.t4=m.sent,p=(0,m.t1)(m.t2,m.t3,m.t4),C.a.locale(i),t(Object(te.a)({},a,{auth:r,settings:Object(te.a)({},s,{},c),i18n:{locale:i,translations:p,list:Object(re.reduce)(l,(function(e,t,n){return e.push({name:t,value:n}),e}),[])}})),m.next=49;break;case 45:m.prev=45,m.t5=m.catch(2),m.t5,n(m.t5);case 49:case"end":return m.stop()}}),null,null,[[2,45],[12,19]])}))},ce=n(146),le=n(26),se=Object(le.a)(),ie=function(){var e,t=[q.a.withExtraArgument(a),Object($.a)(se),K.middleware(oe)],n=[Object(ce.composeWithDevTools)(_.applyMiddleware.apply(void 0,t))];return Object(_.createStore)((e=se,K.outerReducer(Object(_.combineReducers)({router:Object(X.b)(e),asyncInitialState:K.innerReducer,i18n:S.i18nReducer,modals:V.reducer,auth:Z,settings:ee}))),_.compose.apply(void 0,n))}();Object(S.syncTranslationWithStore)(ie);var ue,pe=ie,me=n(147),fe=Object(V.ModalRoot)(pe);console.log("production"),console.log("/almex-contractor"),ue=Q,l.a.render(o.a.createElement(s.Provider,{store:pe},o.a.createElement(X.a,{history:se},o.a.createElement(ue,null),o.a.createElement(fe,{modalComponents:me}))),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()}))},55:function(e,t,n){e.exports={list:"languages_list__1NJHh",item:"languages_item__g1mgX",active:"languages_active__3h82-"}},76:function(e,t,n){e.exports={wrapper:"signin_wrapper__31duv",content:"signin_content__2p7Gu",container:"signin_container__jIzED",button:"signin_button__bG6AB",form:"signin_form__3OtOE"}}},[[153,1,2]]]);
//# sourceMappingURL=main.fb43b2b0.chunk.js.map