(window.webpackJsonp=window.webpackJsonp||[]).push([[52],{"7AKX":function(t,b,n){"use strict";n.r(b),n.d(b,"TabsetModule",function(){return I});var e=n("9bB3"),a=n("i6JN"),o=n("IVq4"),c=n("fXoL"),s=function(){function t(){}return t.\u0275mod=c.Ob({type:t}),t.\u0275inj=c.Nb({factory:function(b){return new(b||t)},imports:[[a.a,o.a]]}),t}(),i=n("0AKQ"),r=n("tyNb"),l="[_nghost-%COMP%]   p[_ngcontent-%COMP%] {\n      padding: 1.25rem;\n    }",p=function(){function t(){}return t.\u0275fac=function(b){return new(b||t)},t.\u0275cmp=c.Kb({type:t,selectors:[["nb-route-tabset-showcase-child1"]],decls:5,vars:0,template:function(t,b){1&t&&(c.Wb(0,"p"),c.Kc(1,"List of "),c.Wb(2,"strong"),c.Kc(3,"users"),c.Vb(),c.Kc(4,"."),c.Vb())},styles:[l]}),t}(),u=function(){function t(){}return t.\u0275fac=function(b){return new(b||t)},t.\u0275cmp=c.Kb({type:t,selectors:[["nb-route-tabset-showcase-child2"]],decls:5,vars:0,template:function(t,b){1&t&&(c.Wb(0,"p"),c.Kc(1,"List of "),c.Wb(2,"strong"),c.Kc(3,"orders"),c.Vb(),c.Kc(4,"."),c.Vb())},styles:[l]}),t}(),d=n("S+eJ"),W=n("FA0J"),V=n("ofXK"),f=n("FuSZ");function g(t,b){if(1&t&&c.Rb(0,"nb-icon",8),2&t){var n=c.kc(2).$implicit;c.qc("config",n.icon)}}function K(t,b){if(1&t&&(c.Wb(0,"span",9),c.Kc(1),c.Vb()),2&t){var n=c.kc(2).$implicit;c.Db(1),c.Lc(n.title)}}function m(t,b){if(1&t&&(c.Wb(0,"li",4),c.Wb(1,"a",5),c.Ic(2,g,1,1,"nb-icon",6),c.Ic(3,K,2,1,"span",7),c.Vb(),c.Vb()),2&t){var n=c.kc().$implicit;c.Ib("responsive",n.responsive),c.Db(2),c.qc("ngIf",n.icon),c.Db(1),c.qc("ngIf",n.title)}}function h(t,b){if(1&t&&c.Rb(0,"nb-icon",12),2&t){var n=c.kc(2).$implicit;c.qc("icon",n.icon)}}function T(t,b){if(1&t&&(c.Wb(0,"span",9),c.Kc(1),c.Vb()),2&t){var n=c.kc(2).$implicit;c.Db(1),c.Lc(n.title)}}function C(t,b){if(1&t){var n=c.Xb();c.Wb(0,"li",10),c.gc("click",function(t){c.Bc(n);var b=c.kc().$implicit,e=c.kc();return t.preventDefault(),e.selectTab(b)}),c.Wb(1,"a",5),c.Ic(2,h,1,1,"nb-icon",11),c.Ic(3,T,2,1,"span",7),c.Vb(),c.Vb()}if(2&t){var e=c.kc().$implicit,a=c.kc();c.Ib("responsive",e.responsive),c.qc("routerLink",e.route)("routerLinkActiveOptions",a.activeLinkOptions),c.Db(2),c.qc("ngIf",e.icon),c.Db(1),c.qc("ngIf",e.title)}}function v(t,b){if(1&t&&(c.Ub(0),c.Ic(1,m,4,4,"li",2),c.Ic(2,C,4,6,"ng-template",null,3,c.Jc),c.Tb()),2&t){var n=b.$implicit,e=c.yc(3);c.Db(1),c.qc("ngIf",n.disabled)("ngIfElse",e)}}var O=function(){function t(){this.fullWidthValue=!1,this.activeLinkOptions={exact:!0},this.changeTab=new c.o}return Object.defineProperty(t.prototype,"fullWidth",{set:function(t){this.fullWidthValue=Object(W.a)(t)},enumerable:!1,configurable:!0}),t.prototype.selectTab=function(t){this.changeTab.emit(t)},t.\u0275fac=function(b){return new(b||t)},t.\u0275cmp=c.Kb({type:t,selectors:[["nb-route-tabset"]],hostVars:2,hostBindings:function(t,b){2&t&&c.Ib("full-width",b.fullWidthValue)},inputs:{tabs:"tabs",activeLinkOptions:"activeLinkOptions",fullWidth:"fullWidth"},outputs:{changeTab:"changeTab"},decls:3,vars:1,consts:[[1,"route-tabset"],[4,"ngFor","ngForOf"],["class","route-tab disabled","tabindex","-1",3,"responsive",4,"ngIf","ngIfElse"],["enabled",""],["tabindex","-1",1,"route-tab","disabled"],["tabindex","-1",1,"tab-link"],[3,"config",4,"ngIf"],["class","tab-text",4,"ngIf"],[3,"config"],[1,"tab-text"],["routerLinkActive","active","tabindex","0",1,"route-tab",3,"routerLink","routerLinkActiveOptions","click"],[3,"icon",4,"ngIf"],[3,"icon"]],template:function(t,b){1&t&&(c.Wb(0,"ul",0),c.Ic(1,v,4,2,"ng-container",1),c.Vb(),c.Rb(2,"router-outlet")),2&t&&(c.Db(1),c.qc("ngForOf",b.tabs))},directives:[V.n,r.h,V.o,f.a,r.e,r.d],styles:['.route-tabset[_ngcontent-%COMP%]{display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-orient:horizontal;-webkit-box-direction:normal;-ms-flex-direction:row;flex-direction:row;list-style-type:none;margin:0;padding:0}.route-tabset[_ngcontent-%COMP%]   .route-tab[_ngcontent-%COMP%]{margin-bottom:-1px;text-align:center;padding:0}.route-tabset[_ngcontent-%COMP%]   .route-tab.active[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]:before{display:block}.route-tabset[_ngcontent-%COMP%]   .route-tab[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]{position:relative;text-decoration:none;display:inline-block}.route-tabset[_ngcontent-%COMP%]   .route-tab[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]:before{position:absolute;content:"";width:100%;border-radius:3px;bottom:-2px;left:0}.route-tabset[_ngcontent-%COMP%]   .route-tab[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]   nb-icon[_ngcontent-%COMP%]{vertical-align:middle}[dir=ltr]   [_nghost-%COMP%]   .tab-link[_ngcontent-%COMP%]   nb-icon[_ngcontent-%COMP%] + span[_ngcontent-%COMP%]{margin-left:.5rem}[dir=rtl]   [_nghost-%COMP%]   .tab-link[_ngcontent-%COMP%]   nb-icon[_ngcontent-%COMP%] + span[_ngcontent-%COMP%]{margin-right:.5rem}.full-width[_nghost-%COMP%]   .route-tabset[_ngcontent-%COMP%]{-ms-flex-pack:distribute;justify-content:space-around}']}),t}(),P=function(){function t(){this.tabs=[{title:"Users",icon:"person",route:"./tab1"},{title:"Orders",icon:"paper-plane-outline",responsive:!0,route:["./tab2"]},{title:"Transaction",icon:"flash-outline",responsive:!0,disabled:!0}]}return t.\u0275fac=function(b){return new(b||t)},t.\u0275cmp=c.Kb({type:t,selectors:[["nb-route-tabset-showcase"]],decls:3,vars:1,consts:[["fullWidth","",3,"tabs"]],template:function(t,b){1&t&&(c.Wb(0,"nb-card"),c.Wb(1,"nb-card-body"),c.Rb(2,"nb-route-tabset",0),c.Vb(),c.Vb()),2&t&&(c.Db(2),c.qc("tabs",b.tabs))},directives:[d.b,d.a,O],encapsulation:2}),t}(),y=n("T76v"),M=function(){function t(){}return t.\u0275fac=function(b){return new(b||t)},t.\u0275cmp=c.Kb({type:t,selectors:[["nb-tabset-badge"]],decls:27,vars:0,consts:[["tabTitle","Users","badgeText","99+","badgeStatus","danger"],["tabTitle","Orders","badgeText","12","badgePosition","bottom right","badgeStatus","warning"],["tabTitle","Transactions","badgeText","new","badgePosition","top right","badgeStatus","success"],["tabTitle","Notifications","badgeDot","","badgePosition","center start","badgeStatus","danger"]],template:function(t,b){1&t&&(c.Wb(0,"nb-card"),c.Wb(1,"nb-card-body"),c.Wb(2,"nb-tabset"),c.Wb(3,"nb-tab",0),c.Wb(4,"p"),c.Kc(5,"List of "),c.Wb(6,"strong"),c.Kc(7,"users"),c.Vb(),c.Kc(8,"."),c.Vb(),c.Vb(),c.Wb(9,"nb-tab",1),c.Wb(10,"p"),c.Kc(11,"List of "),c.Wb(12,"strong"),c.Kc(13,"orders"),c.Vb(),c.Kc(14,"."),c.Vb(),c.Vb(),c.Wb(15,"nb-tab",2),c.Wb(16,"p"),c.Kc(17,"List of "),c.Wb(18,"strong"),c.Kc(19,"transactions"),c.Vb(),c.Kc(20,"."),c.Vb(),c.Vb(),c.Wb(21,"nb-tab",3),c.Wb(22,"p"),c.Kc(23,"List of "),c.Wb(24,"strong"),c.Kc(25,"notifications"),c.Vb(),c.Kc(26,"."),c.Vb(),c.Vb(),c.Vb(),c.Vb(),c.Vb())},directives:[d.b,d.a,y.b,y.a],styles:["[_nghost-%COMP%]   nb-tab[_ngcontent-%COMP%] {\n      padding: 1.25rem;\n    }"],changeDetection:0}),t}(),w=function(){function t(){this.bellIconConfig={icon:"bell-outline",pack:"eva"}}return t.\u0275fac=function(b){return new(b||t)},t.\u0275cmp=c.Kb({type:t,selectors:[["nb-tabset-icon"]],decls:63,vars:1,consts:[["tabIcon","person-outline"],[3,"tabIcon"],["tabIcon","email-outline"],["fullWidth",""],["tabIcon","bell-outline"],["tabTitle","Users","tabIcon","person-outline","responsive",""],["tabTitle","Orders","tabIcon","bell-outline","responsive",""],["tabTitle","Transactions","tabIcon","email-outline","responsive",""]],template:function(t,b){1&t&&(c.Wb(0,"nb-card"),c.Wb(1,"nb-card-body"),c.Wb(2,"nb-tabset"),c.Wb(3,"nb-tab",0),c.Wb(4,"p"),c.Kc(5,"List of "),c.Wb(6,"strong"),c.Kc(7,"users"),c.Vb(),c.Kc(8,"."),c.Vb(),c.Vb(),c.Wb(9,"nb-tab",1),c.Wb(10,"p"),c.Kc(11,"List of "),c.Wb(12,"strong"),c.Kc(13,"orders"),c.Vb(),c.Kc(14,"."),c.Vb(),c.Vb(),c.Wb(15,"nb-tab",2),c.Wb(16,"p"),c.Kc(17,"List of "),c.Wb(18,"strong"),c.Kc(19,"transactions"),c.Vb(),c.Kc(20,"."),c.Vb(),c.Vb(),c.Vb(),c.Vb(),c.Vb(),c.Wb(21,"nb-card"),c.Wb(22,"nb-card-body"),c.Wb(23,"nb-tabset",3),c.Wb(24,"nb-tab",0),c.Wb(25,"p"),c.Kc(26,"List of "),c.Wb(27,"strong"),c.Kc(28,"users"),c.Vb(),c.Kc(29,"."),c.Vb(),c.Vb(),c.Wb(30,"nb-tab",4),c.Wb(31,"p"),c.Kc(32,"List of "),c.Wb(33,"strong"),c.Kc(34,"orders"),c.Vb(),c.Kc(35,"."),c.Vb(),c.Vb(),c.Wb(36,"nb-tab",2),c.Wb(37,"p"),c.Kc(38,"List of "),c.Wb(39,"strong"),c.Kc(40,"transactions"),c.Vb(),c.Kc(41,"."),c.Vb(),c.Vb(),c.Vb(),c.Vb(),c.Vb(),c.Wb(42,"nb-card"),c.Wb(43,"nb-card-body"),c.Wb(44,"nb-tabset"),c.Wb(45,"nb-tab",5),c.Wb(46,"p"),c.Kc(47,"List of "),c.Wb(48,"strong"),c.Kc(49,"users"),c.Vb(),c.Kc(50,"."),c.Vb(),c.Vb(),c.Wb(51,"nb-tab",6),c.Wb(52,"p"),c.Kc(53,"List of "),c.Wb(54,"strong"),c.Kc(55,"orders"),c.Vb(),c.Kc(56,"."),c.Vb(),c.Vb(),c.Wb(57,"nb-tab",7),c.Wb(58,"p"),c.Kc(59,"List of "),c.Wb(60,"strong"),c.Kc(61,"transactions"),c.Vb(),c.Kc(62,"."),c.Vb(),c.Vb(),c.Vb(),c.Vb(),c.Vb()),2&t&&(c.Db(9),c.qc("tabIcon",b.bellIconConfig))},directives:[d.b,d.a,y.b,y.a],styles:["[_nghost-%COMP%]   nb-tab[_ngcontent-%COMP%] {\n      padding: 1.25rem;\n    }"],changeDetection:0}),t}(),_=function(){function t(){}return t.\u0275fac=function(b){return new(b||t)},t.\u0275cmp=c.Kb({type:t,selectors:[["nb-tabset-showcase"]],decls:21,vars:0,consts:[["tabTitle","Users"],["tabTitle","Orders"],["tabTitle","Transactions","disabled",""]],template:function(t,b){1&t&&(c.Wb(0,"nb-card"),c.Wb(1,"nb-card-body"),c.Wb(2,"nb-tabset"),c.Wb(3,"nb-tab",0),c.Wb(4,"p"),c.Kc(5,"List of "),c.Wb(6,"strong"),c.Kc(7,"users"),c.Vb(),c.Kc(8,"."),c.Vb(),c.Vb(),c.Wb(9,"nb-tab",1),c.Wb(10,"p"),c.Kc(11,"List of "),c.Wb(12,"strong"),c.Kc(13,"orders"),c.Vb(),c.Kc(14,"."),c.Vb(),c.Vb(),c.Wb(15,"nb-tab",2),c.Wb(16,"p"),c.Kc(17,"List of "),c.Wb(18,"strong"),c.Kc(19,"transactions"),c.Vb(),c.Kc(20,"."),c.Vb(),c.Vb(),c.Vb(),c.Vb(),c.Vb())},directives:[d.b,d.a,y.b,y.a],styles:["[_nghost-%COMP%]   nb-tab[_ngcontent-%COMP%] {\n      padding: 1.25rem;\n    }"],changeDetection:0}),t}(),L=function(){function t(t){this.router=t}return t.prototype.changeTab=function(t){this.router.navigate(["tabset","tabset-test.component",t.route])},t.\u0275fac=function(b){return new(b||t)(c.Qb(r.c))},t.\u0275cmp=c.Kb({type:t,selectors:[["nb-tabset-test"]],decls:95,vars:2,consts:[["tabTitle","Tab #1"],["tabTitle","Tab #2"],["tabTitle","Tab #3"],["tabTitle","Tab #2",3,"active"],["tabTitle","Tab #3",3,"active"],["routeParam","tab",3,"changeTab"],["tabTitle","Tab #1","route","tab1"],["tabTitle","Tab #2","route","tab2"],["tabTitle","Tab #3","route","tab3"],["fullWidth",""],["tabTitle","Tab #1","badgeText","29"],["tabTitle","Tab #2","badgeText","29","badgeStatus","info","badgePosition","top left"],["tabTitle","Tab #3","badgeText","29","badgeStatus","success","badgePosition","bottom right"],["tabTitle","Tab #4","badgeText","29","badgeStatus","danger","badgePosition","bottom left"],["tabTitle","Tab #5","badgeText","29","badgeStatus","warning","badgePosition","bottom right"],["tabTitle","Tab #2","badgeText","29","badgeStatus","info","badgePosition","bottom right"],["tabTitle","Tab #3","badgeText","29","badgeStatus","success","badgePosition","top left"],["tabTitle","Tab #3","lazyLoad",""],["tabTitle","Tab #4","lazyLoad",""]],template:function(t,b){1&t&&(c.Wb(0,"nb-tabset"),c.Wb(1,"nb-tab",0),c.Wb(2,"span"),c.Kc(3,"Content #1"),c.Vb(),c.Vb(),c.Wb(4,"nb-tab",1),c.Wb(5,"span"),c.Kc(6,"Content #2"),c.Vb(),c.Vb(),c.Wb(7,"nb-tab",2),c.Wb(8,"span"),c.Kc(9,"Content #3"),c.Vb(),c.Vb(),c.Vb(),c.Wb(10,"nb-tabset"),c.Wb(11,"nb-tab",0),c.Wb(12,"span"),c.Kc(13,"Content #1"),c.Vb(),c.Vb(),c.Wb(14,"nb-tab",3),c.Wb(15,"span"),c.Kc(16,"Content #2"),c.Vb(),c.Vb(),c.Wb(17,"nb-tab",2),c.Wb(18,"span"),c.Kc(19,"Content #3"),c.Vb(),c.Vb(),c.Vb(),c.Wb(20,"nb-tabset"),c.Wb(21,"nb-tab",0),c.Wb(22,"span"),c.Kc(23,"Content #1"),c.Vb(),c.Vb(),c.Wb(24,"nb-tab",1),c.Wb(25,"span"),c.Kc(26,"Content #2"),c.Vb(),c.Vb(),c.Wb(27,"nb-tab",4),c.Wb(28,"span"),c.Kc(29,"Content #3"),c.Vb(),c.Vb(),c.Vb(),c.Wb(30,"nb-tabset",5),c.gc("changeTab",function(t){return b.changeTab(t)}),c.Wb(31,"nb-tab",6),c.Wb(32,"span"),c.Kc(33,"Content #1"),c.Vb(),c.Vb(),c.Wb(34,"nb-tab",7),c.Wb(35,"span"),c.Kc(36,"Content #2"),c.Vb(),c.Vb(),c.Wb(37,"nb-tab",8),c.Wb(38,"span"),c.Kc(39,"Content #3"),c.Vb(),c.Vb(),c.Vb(),c.Wb(40,"nb-tabset",9),c.Wb(41,"nb-tab",0),c.Wb(42,"span"),c.Kc(43,"Content #1"),c.Vb(),c.Vb(),c.Wb(44,"nb-tab",1),c.Wb(45,"span"),c.Kc(46,"Content #2"),c.Vb(),c.Vb(),c.Wb(47,"nb-tab",2),c.Wb(48,"span"),c.Kc(49,"Content #3"),c.Vb(),c.Vb(),c.Vb(),c.Wb(50,"nb-tabset",9),c.Wb(51,"nb-tab",10),c.Wb(52,"span"),c.Kc(53,"Content #1"),c.Vb(),c.Vb(),c.Wb(54,"nb-tab",11),c.Wb(55,"span"),c.Kc(56,"Content #2"),c.Vb(),c.Vb(),c.Wb(57,"nb-tab",12),c.Wb(58,"span"),c.Kc(59,"Content #3"),c.Vb(),c.Vb(),c.Wb(60,"nb-tab",13),c.Wb(61,"span"),c.Kc(62,"Content #4"),c.Vb(),c.Vb(),c.Wb(63,"nb-tab",14),c.Wb(64,"span"),c.Kc(65,"Content #5"),c.Vb(),c.Vb(),c.Vb(),c.Wb(66,"nb-tabset"),c.Wb(67,"nb-tab",10),c.Wb(68,"span"),c.Kc(69,"Content #1"),c.Vb(),c.Vb(),c.Wb(70,"nb-tab",15),c.Wb(71,"span"),c.Kc(72,"Content #2"),c.Vb(),c.Vb(),c.Wb(73,"nb-tab",16),c.Wb(74,"span"),c.Kc(75,"Content #3"),c.Vb(),c.Vb(),c.Wb(76,"nb-tab",13),c.Wb(77,"span"),c.Kc(78,"Content #4"),c.Vb(),c.Vb(),c.Wb(79,"nb-tab",14),c.Wb(80,"span"),c.Kc(81,"Content #5"),c.Vb(),c.Vb(),c.Vb(),c.Wb(82,"nb-tabset"),c.Wb(83,"nb-tab",0),c.Wb(84,"span"),c.Kc(85,"Content #1"),c.Vb(),c.Vb(),c.Wb(86,"nb-tab",1),c.Wb(87,"span"),c.Kc(88,"Content #2"),c.Vb(),c.Vb(),c.Wb(89,"nb-tab",17),c.Wb(90,"span"),c.Kc(91,"Content #3"),c.Vb(),c.Vb(),c.Wb(92,"nb-tab",18),c.Wb(93,"span"),c.Kc(94,"Content #4"),c.Vb(),c.Vb(),c.Vb()),2&t&&(c.Db(14),c.qc("active",!0),c.Db(13),c.qc("active",!0))},directives:[y.b,y.a],styles:["nb-tabset[_ngcontent-%COMP%] {\n        margin-bottom: 40px;\n      }"]}),t}(),k=[{path:"route-tabset-showcase.component",component:P,children:[{path:"",redirectTo:"tab1",pathMatch:"full"},{path:"tab1",component:p},{path:"tab2",component:u}]},{path:"tabset-badge.component",component:M},{path:"tabset-icon.component",component:w},{path:"tabset-showcase.component",component:_},{path:"tabset-test.component",component:L},{path:"tabset-test.component/:tab",component:L},{path:"tabset-width.component",component:function(){function t(){}return t.\u0275fac=function(b){return new(b||t)},t.\u0275cmp=c.Kb({type:t,selectors:[["nb-tabset-width"]],decls:15,vars:0,consts:[["fullWidth",""],["tabTitle","Users"],["tabTitle","Orders"]],template:function(t,b){1&t&&(c.Wb(0,"nb-card"),c.Wb(1,"nb-card-body"),c.Wb(2,"nb-tabset",0),c.Wb(3,"nb-tab",1),c.Wb(4,"p"),c.Kc(5,"List of "),c.Wb(6,"strong"),c.Kc(7,"users"),c.Vb(),c.Kc(8,"."),c.Vb(),c.Vb(),c.Wb(9,"nb-tab",2),c.Wb(10,"p"),c.Kc(11,"List of "),c.Wb(12,"strong"),c.Kc(13,"orders"),c.Vb(),c.Kc(14,"."),c.Vb(),c.Vb(),c.Vb(),c.Vb(),c.Vb())},directives:[d.b,d.a,y.b,y.a],styles:["[_nghost-%COMP%]   nb-tab[_ngcontent-%COMP%] {\n      padding: 1.25rem;\n    }"],changeDetection:0}),t}()},{path:"tabset-disabled.component",component:function(){function t(){}return t.\u0275fac=function(b){return new(b||t)},t.\u0275cmp=c.Kb({type:t,selectors:[["nb-tabset-disabled"]],decls:16,vars:0,consts:[["tabTitle","Users"],["tabTitle","Orders"],["tabTitle","Disabled Tab","disabled",""]],template:function(t,b){1&t&&(c.Wb(0,"nb-card"),c.Wb(1,"nb-card-body"),c.Wb(2,"nb-tabset"),c.Wb(3,"nb-tab",0),c.Wb(4,"p"),c.Kc(5,"List of "),c.Wb(6,"strong"),c.Kc(7,"users"),c.Vb(),c.Kc(8,"."),c.Vb(),c.Vb(),c.Wb(9,"nb-tab",1),c.Wb(10,"p"),c.Kc(11,"List of "),c.Wb(12,"strong"),c.Kc(13,"orders"),c.Vb(),c.Kc(14,"."),c.Vb(),c.Vb(),c.Rb(15,"nb-tab",2),c.Vb(),c.Vb(),c.Vb())},directives:[d.b,d.a,y.b,y.a],styles:["[_nghost-%COMP%]   nb-tab[_ngcontent-%COMP%] {\n      padding: 1.25rem;\n    }"],changeDetection:0}),t}()}],x=function(){function t(){}return t.\u0275mod=c.Ob({type:t}),t.\u0275inj=c.Nb({factory:function(b){return new(b||t)},imports:[[r.g.forChild(k)],r.g]}),t}(),I=function(){function t(){}return t.\u0275mod=c.Ob({type:t}),t.\u0275inj=c.Nb({factory:function(b){return new(b||t)},imports:[[e.a,s,i.a,x]]}),t}()}}]);