(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[541],{4764:function(e,n,r){"use strict";r.d(n,{Z:function(){return B}});var t=r(5893),o=r(6265),a=r(7294),s=r(809),i=r.n(s),l=r(2447),c=r(6940),d=r(5033),_=r(3958),u=r(1892),p=r(2931),b=r(1889),m=r.n(b),f=r(155),h=r(7516),x=r(4017),g=function(e){return(0,t.jsxs)("span",{style:{display:"flex",alignItems:"center"},children:[(0,t.jsx)(h.pu9,{style:{fontSize:".9em",marginRight:"-.2em"}}),e.value]})},j=(0,c.$j)(null,(function(e){return{closeProductModal:function(){return e(d.LL())}}}))((function(e){if(!e.productId)return(0,t.jsx)("p",{children:"productId prop must be passed"});var n=(0,a.useState)(!0),r=n[0],o=n[1],s=(0,a.useState)(!1),c=s[0],d=s[1],b=(0,a.useState)(null),h=b[0],j=b[1];(0,a.useEffect)((function(){(function(){var n=(0,l.Z)(i().mark((function n(){var r;return i().wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return o(!0),n.next=3,k(e.productId);case 3:(r=n.sent)?(j(r),d(!1),o(!1)):(d(!0),o(!1));case 5:case"end":return n.stop()}}),n)})));return function(){return n.apply(this,arguments)}})()()}),[]);var k=function(){var e=(0,l.Z)(i().mark((function e(n){var r;return i().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,u.Z.get("/restaurant-settings/products/".concat(n));case 3:return r=e.sent,e.abrupt("return",r.data);case 7:return e.prev=7,e.t0=e.catch(0),console.log(e.t0),e.abrupt("return",null);case 11:case"end":return e.stop()}}),e,null,[[0,7]])})));return function(n){return e.apply(this,arguments)}}(),v=null;if(r||c)c&&(v=(0,t.jsx)("p",{children:"Failed getting product"}));else{var y=h.name,M=h.description,O=h.price,N=h.sideProducts,w=h.categories,P=h.image;v=(0,t.jsxs)(a.Fragment,{children:[(0,t.jsx)(f.R5A,{className:m().CloseModal,onClick:e.close}),(0,t.jsxs)("header",{className:m().Header,children:[P&&P.formats.small&&(0,t.jsxs)(a.Fragment,{children:[(0,t.jsx)(x.Z,{className:m().HeaderProductImg,src:P.formats.small.url,alt:"product image",layout:"fill"}),(0,t.jsx)("div",{className:m().HeaderProductImgOverlay})]}),(0,t.jsxs)("div",{className:m().HeaderContentBox,children:[(0,t.jsx)("h2",{className:m().HeaderTitle,children:y}),O>0&&(0,t.jsx)("span",{className:m().ProductPrice,children:(0,t.jsx)(g,{value:O})})]})]}),(0,t.jsxs)("main",{className:m().Main,children:[M&&(0,t.jsx)("p",{className:m().ProductDescription,children:M}),N.length>0&&(0,t.jsxs)("div",{children:[(0,t.jsx)("h4",{className:m().SideOrdersTitle,children:"Side Orders"}),(0,t.jsx)("ul",{className:m().SideOrders,children:N.map((function(e){var n=e.additionalCost>0&&(0,t.jsxs)("span",{className:m().ProductExtraCost,children:["+$",e.additionalCost.toFixed(2)]});return(0,t.jsxs)("li",{className:m().SideOrderItem,children:[e.name," ",n]},e.id)}))})]}),(0,t.jsxs)("div",{children:[(0,t.jsx)("h4",{className:m().CategoriesListTitle,children:"Categories"}),(0,t.jsx)("ul",{className:m().CategoriesList,children:w.map((function(e,n){return(0,t.jsx)("li",{className:m().CategoryListItem,children:e.title},n)}))})]})]})]})}return(0,t.jsx)(_.Z,{open:!0,handleClose:e.close,children:(0,t.jsxs)("div",{className:m().ProductModal,children:[r&&(0,t.jsx)(p.Z,{color:"black"}),v]})})})),k=r(1664),v=[{label:"Home",link:"/"},{label:"Menu",link:"/menu"},{label:"Order",link:"/ordering"},{label:"Contact",link:"/contact"}],y=function(e){return(0,t.jsx)("div",{className:e.navLinksClass,children:v.map((function(n,r){return(0,t.jsx)(k.default,{href:n.link,children:(0,t.jsx)("a",{className:e.navLinkClass,onClick:e.click,children:n.label})},"navLink-".concat(r))}))})},M=r(1649),O=r(3854),N=r(1668),w=(0,c.$j)((function(e){return{businessData:e.layout.businessData}}))((function(e){var n=(0,a.useState)(!1),r=n[0],o=n[1],s=function(){return o(!1)},i=e.businessData?e.businessData.companyName:"Company Name",l=r&&"sideBar__drop";return(0,t.jsxs)("div",{children:[!r&&(0,t.jsx)("div",{className:"sideBar__menu-btn",onClick:function(){return o(!0)},children:(0,t.jsx)(O.Cq1,{})}),(0,t.jsx)("div",{children:(0,t.jsxs)("div",{className:"sideBar ".concat(l),children:[(0,t.jsx)(M.FMH,{onClick:s,className:"sideBar__close"}),(0,t.jsx)(N.Z,{href:"/",className:"sideBar-title",onClick:s,children:i}),(0,t.jsx)(y,{navLinksClass:"sideBar__navLinks",navLinkClass:"sideBar__navLink",click:s})]})})]})})),P=(0,c.$j)((function(e){return{businessData:e.layout.businessData}}))((function(e){var n=e.businessData?e.businessData.companyName:"Company Name";return(0,t.jsxs)("nav",{className:"navbar",children:[(0,t.jsx)(N.Z,{href:"/",className:"nav__title",children:n}),(0,t.jsx)(y,{navLinksClass:"nav__links",navLinkClass:"nav__link"})]})})),C=function(){return(0,t.jsxs)("div",{children:[(0,t.jsx)(w,{}),(0,t.jsx)(P,{})]})},L=r(2714),D=r.n(L),I=(0,c.$j)((function(e){return{flashMessage:e.layout.flashMessage}}),(function(e){return{closeFlashMessage:function(){return e(d.Ms())}}}))((function(e){var n=e.flashMessage;if(n.isTemporary){var r=n.visibilityTime||5e3;setTimeout((function(){return e.closeFlashMessage()}),r)}return(0,t.jsx)(Wrapper,{children:(0,t.jsxs)("div",{className:D().FlashMessage,children:[!n.isTemporary&&(0,t.jsx)("span",{onClick:function(){return e.closeFlashMessage()},children:"XX"}),n.content]})})})),S=r(9111),Z=r(9352),H=r(471),E=r(9583),R=function(){var e=(0,a.useState)(null),n=e[0],r=e[1];(0,a.useEffect)((function(){(function(){var e=(0,l.Z)(i().mark((function e(){var n;return i().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,u.Z.get("/business-info");case 2:n=e.sent,r(n.data);case 4:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}})()()}),[]);var o=null;return n&&(o=(0,t.jsx)("footer",{className:"footer",children:(0,t.jsxs)("div",{className:"global__container",children:[(0,t.jsxs)("div",{className:"footer-content",children:[(0,t.jsx)("h2",{className:"company-name",children:n.companyName}),(0,t.jsxs)("div",{className:"section__info",children:[(0,t.jsx)("h3",{className:"section__info-title",children:"Info"}),null!==n&&(0,t.jsx)(S.Z,{businessInfo:n,labelClass:"business-info__label"})]}),(0,t.jsxs)("div",{className:"section__social-media",children:[(0,t.jsx)("h3",{className:"section__social-media-title",children:"Social Media"}),(0,t.jsx)("a",{href:n.facebookURL,target:"__blank",children:(0,t.jsx)(Z.IRO,{className:"social-icon"})}),(0,t.jsx)("a",{href:n.instagramURL,target:"__blank",children:(0,t.jsx)(Z.Adh,{className:"social-icon"})}),(0,t.jsx)("a",{href:n.yelpURL,target:"__blank",children:(0,t.jsx)(E.Uzy,{className:"social-icon"})})]})]}),(0,t.jsxs)("span",{className:"copyright-line",children:[" ",(0,t.jsx)(H.KIW,{className:"copyright-icon"})," Copyright 2021 ",n.companyName," - All Rights Reserved "]})]})})),o};function T(e,n){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var t=Object.getOwnPropertySymbols(e);n&&(t=t.filter((function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable}))),r.push.apply(r,t)}return r}function F(e){for(var n=1;n<arguments.length;n++){var r=null!=arguments[n]?arguments[n]:{};n%2?T(Object(r),!0).forEach((function(n){(0,o.Z)(e,n,r[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):T(Object(r)).forEach((function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(r,n))}))}return e}var B=(0,c.$j)((function(e){return{isProductModalOpen:e.layout.isProductModalOpen,productModalProps:e.layout.productModalData.props,flashMessage:e.layout.flashMessage}}),(function(e){return{closeProductModal:function(){return e(d.LL())}}}))((function(e){var n=e.isProductModalOpen,r=e.productModalProps,o=e.closeProductModal;return(0,t.jsx)("div",{className:"layout",children:(0,t.jsxs)("div",{className:"site-content",children:[(0,t.jsx)(C,{}),e.flashMessage&&e.flashMessage.open&&(0,t.jsx)(I,{}),n?(0,t.jsx)(j,F(F({},r),{},{close:o})):null,e.children,(0,t.jsx)("div",{className:"footer-margin"}),(0,t.jsx)(R,{})]})})}))},8576:function(e,n,r){"use strict";var t=r(5893),o=r(809),a=r.n(o),s=r(2447),i=r(7294),l=r(9008),c=r(1892),d=r(4155);n.Z=function(e){var n=e.title,r=e.description,o=(0,i.useState)(null),_=o[0],u=o[1];(0,i.useEffect)((function(){(function(){var e=(0,s.Z)(a().mark((function e(){var n;return a().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,c.Z.get("/seo");case 2:n=e.sent,u(n.data);case 4:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}})()()}),[]);var p=null;return _&&(p=(0,t.jsxs)(i.Fragment,{children:[(0,t.jsxs)("title",{children:[" ",n," | ",_.title]}),(0,t.jsx)("meta",{name:"description",content:r||_.description}),(0,t.jsx)("meta",{property:"og:title",content:_.title}),(0,t.jsx)("meta",{property:"og:description",content:_.description}),(0,t.jsx)("meta",{property:"og:url",content:d.env.SITE_URL}),(0,t.jsx)("meta",{property:"og:type",content:"website"})]})),(0,t.jsxs)(l.default,{children:[(0,t.jsx)("link",{rel:"icon",type:"image/png",sizes:"32x32",href:"/favicon-32x32.png"}),(0,t.jsx)("link",{rel:"icon",type:"image/png",sizes:"16x16",href:"/favicon-16x16.png"}),(0,t.jsx)("link",{rel:"apple-touch-icon",sizes:"180x180",href:"/apple-touch-icon.png"}),(0,t.jsx)("link",{rel:"manifest",href:"/site.webmanifest"}),(0,t.jsx)("link",{rel:"shortcut icon",href:"/favicon.ico"}),(0,t.jsx)("meta",{name:"viewport",content:"width=device-width, initial-scale=1"}),p]})}},3958:function(e,n,r){"use strict";var t=r(5893),o=r(7294),a=r(2714),s=r.n(a);n.Z=function(e){return(0,o.useEffect)((function(){var e=document.querySelector("body");return e.classList.add("js__stop-overflow"),function(){e.classList.remove("js__stop-overflow")}}),[]),(0,t.jsxs)("div",{children:[(0,t.jsx)("div",{className:s().backdrop,onClick:e.handleClose}),e.children]})}},9111:function(e,n,r){"use strict";var t=r(5893),o=(r(7294),r(3386)),a=r(5521),s=r.n(a);n.Z=function(e){var n=e.businessInfo,r=e.labelClass,a=e.detailClass,i=[s().Label,r&&r].join(" "),l=[s().Detail,a&&a].join(" ");return(0,t.jsxs)("div",{className:s().Details,children:[(0,t.jsxs)("div",{className:s().Row,children:[(0,t.jsx)("h4",{className:i,children:"Address"}),(0,t.jsx)("p",{className:l,children:n.location})]}),(0,t.jsxs)("div",{className:s().Row,children:[(0,t.jsx)("h4",{className:i,children:"Email"}),(0,t.jsx)("p",{className:l,children:n.email})]}),(0,t.jsxs)("div",{className:s().Row,children:[(0,t.jsx)("h4",{className:i,children:"Phone"}),(0,t.jsx)("p",{className:l,children:(0,o.wj)(n.phone)})]}),n.phone2&&(0,t.jsxs)("div",{className:s().Row,children:[(0,t.jsx)("h4",{className:i,children:"Phone 2"}),(0,t.jsx)("p",{className:l,children:(0,o.wj)(n.phone2)})]})]})}},4017:function(e,n,r){"use strict";var t=r(6265),o=r(5893),a=(r(7294),r(5675));function s(e,n){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var t=Object.getOwnPropertySymbols(e);n&&(t=t.filter((function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable}))),r.push.apply(r,t)}return r}function i(e){for(var n=1;n<arguments.length;n++){var r=null!=arguments[n]?arguments[n]:{};n%2?s(Object(r),!0).forEach((function(n){(0,t.Z)(e,n,r[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):s(Object(r)).forEach((function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(r,n))}))}return e}var l=function(e){return e.src};n.Z=function(e){return(0,o.jsx)(a.default,i(i({},e),{},{loader:l}))}},1668:function(e,n,r){"use strict";var t=r(6265),o=r(5893),a=r(8347),s=(r(7294),r(1664));function i(e,n){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var t=Object.getOwnPropertySymbols(e);n&&(t=t.filter((function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable}))),r.push.apply(r,t)}return r}function l(e){for(var n=1;n<arguments.length;n++){var r=null!=arguments[n]?arguments[n]:{};n%2?i(Object(r),!0).forEach((function(n){(0,t.Z)(e,n,r[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):i(Object(r)).forEach((function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(r,n))}))}return e}n.Z=function(e){var n=e.children,r=e.href,t=e.as,i=(0,a.Z)(e,["children","href","as"]);return(0,o.jsx)(s.default,{href:r,as:t,children:(0,o.jsx)("a",l(l({},i),{},{children:n}))})}},2931:function(e,n,r){"use strict";var t=r(5893),o=(r(7294),r(9163).ZP.div.withConfig({displayName:"spinner__Wrapper",componentId:"ezdx4g-0"})([".loader,.loader:before,.loader:after{border-radius:50%;width:2.5em;height:2.5em;-webkit-animation-fill-mode:both;animation-fill-mode:both;-webkit-animation:load7 1.8s infinite ease-in-out;animation:load7 1.8s infinite ease-in-out;}.loader{color:",";font-size:10px;margin:80px auto;position:relative;text-indent:-9999em;-webkit-transform:translateZ(0);-ms-transform:translateZ(0);transform:translateZ(0);-webkit-animation-delay:-0.16s;animation-delay:-0.16s;}.loader:before,.loader:after{content:'';position:absolute;top:0;}.loader:before{left:-3.5em;-webkit-animation-delay:-0.32s;animation-delay:-0.32s;}.loader:after{left:3.5em;}@-webkit-keyframes load7{0%,80%,100%{box-shadow:0 2.5em 0 -1.3em;}40%{box-shadow:0 2.5em 0 0;}}@keyframes load7{0%,80%,100%{box-shadow:0 2.5em 0 -1.3em;}40%{box-shadow:0 2.5em 0 0;}}"],(function(e){return e.color||"#ffffff"})));n.Z=function(e){return(0,t.jsx)(o,{color:e.color,children:(0,t.jsx)("div",{className:"loader",children:"Loading..."})})}},2714:function(e){e.exports={btn:"backdrop_btn__2iLKi","btn-sm":"backdrop_btn-sm__1WOSA","btn-md":"backdrop_btn-md__3f1Rf","btn-xl":"backdrop_btn-xl__s0VeV","btn-block":"backdrop_btn-block__3-xME","btn-warning":"backdrop_btn-warning__1DKiQ","btn-danger":"backdrop_btn-danger__THnE1","btn-primary":"backdrop_btn-primary__3TI1y","btn-secondary":"backdrop_btn-secondary__1MCxf","btn-success":"backdrop_btn-success__exGGc","btn-info":"backdrop_btn-info__2poQP","btn-dark":"backdrop_btn-dark__2WAc7","btn-light":"backdrop_btn-light__15yFg","d-flex":"backdrop_d-flex__27XmE","d-mb-flex":"backdrop_d-mb-flex__EYnUg","d-med-flex":"backdrop_d-med-flex__1XLok","d-lg-flex":"backdrop_d-lg-flex__2jNij","d-block":"backdrop_d-block__ArPf2","d-mb-block":"backdrop_d-mb-block__i0BiC","d-med-block":"backdrop_d-med-block__2Koqd","d-lg-block":"backdrop_d-lg-block__15fbm","d-inline-block":"backdrop_d-inline-block__3I6S7","d-mb-inline-block":"backdrop_d-mb-inline-block__20gAK","d-med-inline-block":"backdrop_d-med-inline-block__jG9b9","d-lg-inline-block":"backdrop_d-lg-inline-block__21NIB","d-grid":"backdrop_d-grid__EW2Zt","d-mb-grid":"backdrop_d-mb-grid__2gpB3","d-med-grid":"backdrop_d-med-grid__VL5RN","d-lg-grid":"backdrop_d-lg-grid__3nQ7d","d-inline":"backdrop_d-inline__1DehQ","d-mb-inline":"backdrop_d-mb-inline__ewgHd","d-med-inline":"backdrop_d-med-inline__3Wp1C","d-lg-inline":"backdrop_d-lg-inline__2VqxU","d-none":"backdrop_d-none__2QYns","d-mb-none":"backdrop_d-mb-none__2RRRI","d-med-none":"backdrop_d-med-none__1HKHK","d-lg-none":"backdrop_d-lg-none__2FKey",clearfix:"backdrop_clearfix__20byy","global__section-padding":"backdrop_global__section-padding__3hvch","full-cover":"backdrop_full-cover__2fSH-","basic-input":"backdrop_basic-input__6V6CO","remove-default-list-style":"backdrop_remove-default-list-style__6w4Kl","global__text-container":"backdrop_global__text-container__29DK0",global__container:"backdrop_global__container__XkC7Y",backdrop:"backdrop_backdrop__3iQ1e",backdropContent:"backdrop_backdropContent__1B-So"}},5521:function(e){e.exports={Row:"businessInfo_Row__2et8L",Details:"businessInfo_Details__3oRe9",Detail:"businessInfo_Detail__3cFUx",Label:"businessInfo_Label__12O8J"}},1889:function(e){e.exports={btn:"productModal_btn__6qMsL","btn-sm":"productModal_btn-sm__qRDT1","btn-md":"productModal_btn-md__2UUUi","btn-xl":"productModal_btn-xl__D3uu9","btn-block":"productModal_btn-block__oIAC5","btn-warning":"productModal_btn-warning__tFMtV","btn-danger":"productModal_btn-danger__P3WIq","btn-primary":"productModal_btn-primary__W9A6P","btn-secondary":"productModal_btn-secondary__2eyFk","btn-success":"productModal_btn-success__36rB6","btn-info":"productModal_btn-info__ldpZ1","btn-dark":"productModal_btn-dark__2r0sb","btn-light":"productModal_btn-light__nvKuU","d-flex":"productModal_d-flex__3sMM7","d-mb-flex":"productModal_d-mb-flex__rsQ-b","d-med-flex":"productModal_d-med-flex__3c98A","d-lg-flex":"productModal_d-lg-flex__BpMtI","d-block":"productModal_d-block__3gzxK","d-mb-block":"productModal_d-mb-block__IBbmL","d-med-block":"productModal_d-med-block__3gLfk","d-lg-block":"productModal_d-lg-block__ErStI","d-inline-block":"productModal_d-inline-block__3M3FO","d-mb-inline-block":"productModal_d-mb-inline-block__3L_M6","d-med-inline-block":"productModal_d-med-inline-block__rTfdM","d-lg-inline-block":"productModal_d-lg-inline-block__3Sutx","d-grid":"productModal_d-grid__37KqP","d-mb-grid":"productModal_d-mb-grid___Z9us","d-med-grid":"productModal_d-med-grid__114MO","d-lg-grid":"productModal_d-lg-grid__3deh1","d-inline":"productModal_d-inline__1SGav","d-mb-inline":"productModal_d-mb-inline__nnn2a","d-med-inline":"productModal_d-med-inline__TvL4p","d-lg-inline":"productModal_d-lg-inline__U4f8n","d-none":"productModal_d-none__2jHTA","d-mb-none":"productModal_d-mb-none__2gEhH","d-med-none":"productModal_d-med-none__2y9Th","d-lg-none":"productModal_d-lg-none__Bwmsm",clearfix:"productModal_clearfix__3izqn","global__section-padding":"productModal_global__section-padding__zE_kb","full-cover":"productModal_full-cover__28O7D","basic-input":"productModal_basic-input__345Vv","remove-default-list-style":"productModal_remove-default-list-style__3wwFK","global__text-container":"productModal_global__text-container__2vRMs",global__container:"productModal_global__container__3byz0",ProductModal:"productModal_ProductModal__d4l-2",Header:"productModal_Header__28vyZ",HeaderProductImg:"productModal_HeaderProductImg__21AAt",HeaderProductImgOverlay:"productModal_HeaderProductImgOverlay__2aVGi",HeaderContentBox:"productModal_HeaderContentBox__qw5D-",HeaderTitle:"productModal_HeaderTitle__1aVFK",ProductPrice:"productModal_ProductPrice__2ATcj",CloseModal:"productModal_CloseModal__1LFwy",ProductExtraCost:"productModal_ProductExtraCost__1TyCw",Main:"productModal_Main__34Kfd",ProductDescription:"productModal_ProductDescription__2ds5m",CategoriesListTitle:"productModal_CategoriesListTitle__3gtrW",SideOrdersTitle:"productModal_SideOrdersTitle__39qjm",CategoryListItem:"productModal_CategoryListItem__TVH1H",SideOrderItem:"productModal_SideOrderItem__2CNU9",SideOrders:"productModal_SideOrders__NjrHa",CategoriesList:"productModal_CategoriesList__6Rv_9"}}}]);