(window.webpackJsonp=window.webpackJsonp||[]).push([[17],{"7g0b":function(e,t,n){"use strict";n.r(t),n.d(t,"OAuth2PasswordPlaygroundModule",function(){return E});var r=n("ofXK"),o=n("3Pt+"),i=n("tk/3"),s=n("0AKQ"),a=n("F4EV"),c=n("+q8+"),l=n("+Zd3"),u=n("Abgx"),b=n("X/Iy"),g=n("89WS"),f=n("4pP6"),p=n("tyNb"),d=n("0ICW"),m=n("iVvT"),h=n("fXoL"),y=n("BDhN"),O=n("vuB0"),w=n("S+eJ"),P=n("K8rk"),k=n("Dfz9"),C=n("Unyt");function V(e,t){if(1&e){var n=h.Xb();h.Wb(0,"button",3),h.gc("click",function(){return h.Bc(n),h.kc(2).logout()}),h.Kc(1,"Sign Out"),h.Vb()}}function v(e,t){1&e&&(h.Wb(0,"nb-card-body"),h.Wb(1,"p"),h.Kc(2,"No User Authenticated"),h.Vb(),h.Vb())}function M(e,t){if(1&e&&(h.Wb(0,"nb-card"),h.Wb(1,"nb-card-body"),h.Wb(2,"h1",1),h.Kc(3,"You are currently authenticated"),h.Vb(),h.Rb(4,"p"),h.Wb(5,"p"),h.Kc(6),h.lc(7,"json"),h.Vb(),h.Wb(8,"p"),h.Kc(9),h.lc(10,"json"),h.Vb(),h.Wb(11,"p"),h.Kc(12),h.lc(13,"json"),h.Vb(),h.Ic(14,V,2,0,"button",2),h.Vb(),h.Ic(15,v,3,0,"nb-card-body",0),h.Vb()),2&e){var n=h.kc();h.Db(6),h.Mc("Current User Access Token: ",h.mc(7,5,n.token.getValue()),""),h.Db(3),h.Mc("Current User Access Token Payload : ",h.mc(10,7,n.getClaims(n.token.getValue())),""),h.Db(3),h.Mc("Current User Refresh Token: ",h.mc(13,9,n.token.getRefreshToken()),""),h.Db(2),h.qc("ngIf",n.token),h.Db(1),h.qc("ngIf",!n.token)}}function W(e,t){if(1&e&&(h.Wb(0,"li",23),h.Kc(1),h.Vb()),2&e){var n=t.$implicit;h.Db(1),h.Lc(n)}}function I(e,t){if(1&e&&(h.Wb(0,"nb-alert",19),h.Wb(1,"p",20),h.Wb(2,"b"),h.Kc(3,"Oh snap!"),h.Vb(),h.Vb(),h.Wb(4,"ul",21),h.Ic(5,W,2,1,"li",22),h.Vb(),h.Vb()),2&e){var n=h.kc(2);h.Db(5),h.qc("ngForOf",n.errors)}}function j(e,t){if(1&e&&(h.Wb(0,"li",23),h.Kc(1),h.Vb()),2&e){var n=t.$implicit;h.Db(1),h.Lc(n)}}function x(e,t){if(1&e&&(h.Wb(0,"nb-alert",24),h.Wb(1,"p",20),h.Wb(2,"b"),h.Kc(3,"Hooray!"),h.Vb(),h.Vb(),h.Wb(4,"ul",21),h.Ic(5,j,2,1,"li",22),h.Vb(),h.Vb()),2&e){var n=h.kc(2);h.Db(5),h.qc("ngForOf",n.messages)}}function _(e,t){1&e&&(h.Wb(0,"p",26),h.Kc(1," Email is required! "),h.Vb())}function q(e,t){1&e&&(h.Wb(0,"p",26),h.Kc(1," Email should be the real one! "),h.Vb())}function D(e,t){if(1&e&&(h.Ub(0),h.Ic(1,_,2,0,"p",25),h.Ic(2,q,2,0,"p",25),h.Tb()),2&e){h.kc();var n=h.yc(15);h.Db(1),h.qc("ngIf",null==n.errors?null:n.errors.required),h.Db(1),h.qc("ngIf",null==n.errors?null:n.errors.pattern)}}function K(e,t){1&e&&(h.Wb(0,"p",26),h.Kc(1," Password is required! "),h.Vb())}function A(e,t){if(1&e&&(h.Wb(0,"p",26),h.Kc(1),h.Vb()),2&e){var n=h.kc(3);h.Db(1),h.Nc(" Password should contains from ",n.getConfigValue("forms.validation.password.minLength")," to ",n.getConfigValue("forms.validation.password.maxLength")," characters ")}}function S(e,t){if(1&e&&(h.Ub(0),h.Ic(1,K,2,0,"p",25),h.Ic(2,A,2,2,"p",25),h.Tb()),2&e){h.kc();var n=h.yc(21);h.Db(1),h.qc("ngIf",null==n.errors?null:n.errors.required),h.Db(1),h.qc("ngIf",(null==n.errors?null:n.errors.minlength)||(null==n.errors?null:n.errors.maxlength))}}function z(e,t){if(1&e){var n=h.Xb();h.Wb(0,"nb-card"),h.Wb(1,"nb-card-body"),h.Wb(2,"nb-auth-block",4),h.Wb(3,"h1",5),h.Kc(4,"OAuth2 Sign In with email/password"),h.Vb(),h.Wb(5,"p",6),h.Kc(6,"Hello! Sign in with your username or email"),h.Vb(),h.Ic(7,I,6,1,"nb-alert",7),h.Ic(8,x,6,1,"nb-alert",8),h.Wb(9,"form",9,10),h.gc("ngSubmit",function(){return h.Bc(n),h.kc().login()}),h.Wb(11,"div",11),h.Wb(12,"label",12),h.Kc(13,"Email address:"),h.Vb(),h.Wb(14,"input",13,14),h.gc("ngModelChange",function(e){return h.Bc(n),h.kc().user.email=e}),h.Vb(),h.Ic(16,D,3,2,"ng-container",0),h.Vb(),h.Wb(17,"div",11),h.Wb(18,"label",15),h.Kc(19,"Password:"),h.Vb(),h.Wb(20,"input",16,17),h.gc("ngModelChange",function(e){return h.Bc(n),h.kc().user.password=e}),h.Vb(),h.Ic(22,S,3,2,"ng-container",0),h.Vb(),h.Wb(23,"button",18),h.Kc(24," Sign In "),h.Vb(),h.Vb(),h.Vb(),h.Vb(),h.Vb()}if(2&e){var r=h.yc(10),o=h.yc(15),i=h.yc(21),s=h.kc();h.Db(7),h.qc("ngIf",s.showMessages.error&&(null==s.errors?null:s.errors.length)>0&&!s.submitted),h.Db(1),h.qc("ngIf",s.showMessages.success&&(null==s.messages?null:s.messages.length)>0&&!s.submitted),h.Db(6),h.qc("ngModel",s.user.email)("status",o.dirty?o.invalid?"danger":"success":"basic")("required",s.getConfigValue("forms.validation.email.required")),h.Eb("aria-invalid",!(!o.invalid||!o.touched)||null),h.Db(2),h.qc("ngIf",o.invalid&&o.touched),h.Db(4),h.qc("ngModel",s.user.password)("status",i.dirty?i.invalid?"danger":"success":"basic")("required",s.getConfigValue("forms.validation.password.required"))("minlength",s.getConfigValue("forms.validation.password.minLength"))("maxlength",s.getConfigValue("forms.validation.password.maxLength")),h.Eb("aria-invalid",!(!i.invalid||!i.touched)||null),h.Db(2),h.qc("ngIf",i.invalid&&i.touched),h.Db(1),h.Ib("btn-pulse",s.submitted),h.qc("disabled",s.submitted||!r.valid)}}var B=[{path:"",component:function(){function e(e,t,n){void 0===t&&(t={}),this.authService=e,this.options=t,this.router=n,this.redirectDelay=0,this.showMessages={},this.strategy="",this.errors=[],this.messages=[],this.user={},this.submitted=!1,this.redirectDelay=this.getConfigValue("forms.login.redirectDelay"),this.showMessages=this.getConfigValue("forms.login.showMessages"),this.strategy=this.getConfigValue("forms.login.strategy")}return e.prototype.login=function(){var e=this;this.errors=this.messages=[],this.submitted=!0,this.authService.authenticate(this.strategy,this.user).subscribe(function(t){e.submitted=!1,e.token=t.getToken(),t.isSuccess()?e.messages=t.getMessages():e.errors=t.getErrors();var n=t.getRedirect();n&&setTimeout(function(){return e.router.navigateByUrl(n)},e.redirectDelay)})},e.prototype.logout=function(){var e=this;this.authService.logout("password").subscribe(function(t){e.token=null})},e.prototype.getConfigValue=function(e){return Object(m.b)(this.options,e,null)},e.prototype.getClaims=function(e){return e?Object(f.f)(f.b,e,this.strategy).getPayload():null},e.\u0275fac=function(t){return new(t||e)(h.Qb(y.a),h.Qb(d.b),h.Qb(p.c))},e.\u0275cmp=h.Kb({type:e,selectors:[["nb-playground-auth"]],decls:4,vars:2,consts:[[4,"ngIf"],[1,"title"],["nbButton","","status","warning",3,"click",4,"ngIf"],["nbButton","","status","warning",3,"click"],["aria-labelledby","title"],["id","title",1,"title"],[1,"sub-title"],["outline","danger","role","alert",4,"ngIf"],["outline","success","role","alert",4,"ngIf"],["aria-labelledby","title",3,"ngSubmit"],["form","ngForm"],[1,"form-control-group"],["for","input-email",1,"label"],["nbInput","","fullWidth","","name","email","id","input-email","pattern",".+@.+..+","placeholder","Email address","autofocus","",3,"ngModel","status","required","ngModelChange"],["email","ngModel"],["for","input-password",1,"label"],["nbInput","","fullWidth","","name","password","type","password","id","input-password","placeholder","Password",3,"ngModel","status","required","minlength","maxlength","ngModelChange"],["password","ngModel"],["nbButton","","fullWidth","","status","success",3,"disabled"],["outline","danger","role","alert"],[1,"alert-title"],[1,"alert-message-list"],["class","alert-message",4,"ngFor","ngForOf"],[1,"alert-message"],["outline","success","role","alert"],["class","caption status-danger",4,"ngIf"],[1,"caption","status-danger"]],template:function(e,t){1&e&&(h.Wb(0,"nb-layout"),h.Wb(1,"nb-layout-column"),h.Ic(2,M,16,11,"nb-card",0),h.Ic(3,z,25,17,"nb-card",0),h.Vb(),h.Vb()),2&e&&(h.Db(2),h.qc("ngIf",t.token),h.Db(1),h.qc("ngIf",!t.token))},directives:[O.b,O.a,r.o,w.b,w.a,P.a,o.w,o.m,o.n,k.a,o.a,o.q,o.l,o.o,o.s,o.i,o.h,C.a,r.n],pipes:[r.i],styles:["[_nghost-%COMP%]   nb-auth-block[_ngcontent-%COMP%]{margin:0 auto}"]}),e}()}],T=function(){function e(){}return e.\u0275mod=h.Ob({type:e}),e.\u0275inj=h.Nb({factory:function(t){return new(t||e)},imports:[[p.g.forChild(B)],p.g]}),e}(),E=function(){function e(){}return e.\u0275mod=h.Ob({type:e}),e.\u0275inj=h.Nb({factory:function(t){return new(t||e)},imports:[[r.c,o.g,i.c,u.a.forRoot({forms:{login:{redirectDelay:3e3,showMessages:{error:!0,success:!1},strategy:"password"}},strategies:[b.a.setup({name:"password",clientId:"Aladdin",clientSecret:"open sesame",clientAuthMethod:g.a.BASIC,baseEndpoint:"http://localhost:4400/api/auth/",token:{endpoint:"token",grantType:g.b.PASSWORD,class:f.c,requireValidToken:!0},redirect:{success:"/oauth2-password"}})]}),s.a,a.a,c.a,l.a,T]]}),e}()},K8rk:function(e,t,n){"use strict";n.d(t,"a",function(){return i});var r=n("fXoL"),o=["*"],i=function(){function e(){}return e.\u0275fac=function(t){return new(t||e)},e.\u0275cmp=r.Kb({type:e,selectors:[["nb-auth-block"]],ngContentSelectors:o,decls:1,vars:0,template:function(e,t){1&e&&(r.pc(),r.oc(0))},styles:["[_nghost-%COMP%]{display:block;max-width:35rem}[_nghost-%COMP%], [_nghost-%COMP%]     form{width:100%}[_nghost-%COMP%]     .label{display:block;margin-bottom:.5rem}[_nghost-%COMP%]     .forgot-password{text-decoration:none;margin-bottom:.5rem}[_nghost-%COMP%]     .caption{margin-top:.5rem}[_nghost-%COMP%]     .alert{text-align:center}[_nghost-%COMP%]     .title{margin-top:0;margin-bottom:.75rem;text-align:center}[_nghost-%COMP%]     .sub-title{margin-bottom:2rem;text-align:center}[_nghost-%COMP%]     .form-control-group{margin-bottom:2rem}[_nghost-%COMP%]     .form-control-group.accept-group{margin:2rem 0}[_nghost-%COMP%]     .form-control-group.accept-group, [_nghost-%COMP%]     .label-with-link{display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-pack:justify;-ms-flex-pack:justify;justify-content:space-between}[_nghost-%COMP%]     .links{text-align:center;margin-top:1.75rem}[_nghost-%COMP%]     .links .socials{margin-top:1.5rem}[_nghost-%COMP%]     .links .socials a{margin:0 1rem;text-decoration:none;vertical-align:middle}[_nghost-%COMP%]     .links .socials a.with-icon{font-size:2rem}[_nghost-%COMP%]     .another-action{margin-top:2rem;text-align:center}[_nghost-%COMP%]     .sign-in-or-up{margin-top:2rem;display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-pack:justify;-ms-flex-pack:justify;justify-content:space-between}[_nghost-%COMP%]     nb-alert .alert-message, [_nghost-%COMP%]     nb-alert .alert-title{margin:0 0 .5rem}[_nghost-%COMP%]     nb-alert .alert-message-list{list-style-type:none;padding:0;margin:0}"]}),e}()},Unyt:function(e,t,n){"use strict";n.d(t,"a",function(){return l});var r=n("fXoL"),o=n("FA0J"),i=n("rE+p"),s=n("ofXK");function a(e,t){if(1&e){var n=r.Xb();r.Wb(0,"button",1),r.gc("click",function(){return r.Bc(n),r.kc().onClose()}),r.Wb(1,"span",2),r.Kc(2,"\xd7"),r.Vb(),r.Vb()}}var c=["*"],l=function(){function e(e){this.statusService=e,this.size="",this.status="basic",this.accent="",this.outline="",this._closable=!1,this.close=new r.o}return Object.defineProperty(e.prototype,"closable",{get:function(){return this._closable},set:function(e){this._closable=Object(o.a)(e)},enumerable:!1,configurable:!0}),e.prototype.onClose=function(){this.close.emit()},Object.defineProperty(e.prototype,"tiny",{get:function(){return"tiny"===this.size},enumerable:!1,configurable:!0}),Object.defineProperty(e.prototype,"small",{get:function(){return"small"===this.size},enumerable:!1,configurable:!0}),Object.defineProperty(e.prototype,"medium",{get:function(){return"medium"===this.size},enumerable:!1,configurable:!0}),Object.defineProperty(e.prototype,"large",{get:function(){return"large"===this.size},enumerable:!1,configurable:!0}),Object.defineProperty(e.prototype,"giant",{get:function(){return"giant"===this.size},enumerable:!1,configurable:!0}),Object.defineProperty(e.prototype,"primary",{get:function(){return"primary"===this.status},enumerable:!1,configurable:!0}),Object.defineProperty(e.prototype,"success",{get:function(){return"success"===this.status},enumerable:!1,configurable:!0}),Object.defineProperty(e.prototype,"info",{get:function(){return"info"===this.status},enumerable:!1,configurable:!0}),Object.defineProperty(e.prototype,"warning",{get:function(){return"warning"===this.status},enumerable:!1,configurable:!0}),Object.defineProperty(e.prototype,"danger",{get:function(){return"danger"===this.status},enumerable:!1,configurable:!0}),Object.defineProperty(e.prototype,"basic",{get:function(){return"basic"===this.status},enumerable:!1,configurable:!0}),Object.defineProperty(e.prototype,"control",{get:function(){return"control"===this.status},enumerable:!1,configurable:!0}),Object.defineProperty(e.prototype,"primaryAccent",{get:function(){return"primary"===this.accent},enumerable:!1,configurable:!0}),Object.defineProperty(e.prototype,"successAccent",{get:function(){return"success"===this.accent},enumerable:!1,configurable:!0}),Object.defineProperty(e.prototype,"infoAccent",{get:function(){return"info"===this.accent},enumerable:!1,configurable:!0}),Object.defineProperty(e.prototype,"warningAccent",{get:function(){return"warning"===this.accent},enumerable:!1,configurable:!0}),Object.defineProperty(e.prototype,"dangerAccent",{get:function(){return"danger"===this.accent},enumerable:!1,configurable:!0}),Object.defineProperty(e.prototype,"basicAccent",{get:function(){return"basic"===this.accent},enumerable:!1,configurable:!0}),Object.defineProperty(e.prototype,"controlAccent",{get:function(){return"control"===this.accent},enumerable:!1,configurable:!0}),Object.defineProperty(e.prototype,"primaryOutline",{get:function(){return"primary"===this.outline},enumerable:!1,configurable:!0}),Object.defineProperty(e.prototype,"successOutline",{get:function(){return"success"===this.outline},enumerable:!1,configurable:!0}),Object.defineProperty(e.prototype,"infoOutline",{get:function(){return"info"===this.outline},enumerable:!1,configurable:!0}),Object.defineProperty(e.prototype,"warningOutline",{get:function(){return"warning"===this.outline},enumerable:!1,configurable:!0}),Object.defineProperty(e.prototype,"dangerOutline",{get:function(){return"danger"===this.outline},enumerable:!1,configurable:!0}),Object.defineProperty(e.prototype,"basicOutline",{get:function(){return"basic"===this.outline},enumerable:!1,configurable:!0}),Object.defineProperty(e.prototype,"controlOutline",{get:function(){return"control"===this.outline},enumerable:!1,configurable:!0}),Object.defineProperty(e.prototype,"additionalClasses",{get:function(){return this.statusService.isCustomStatus(this.status)?[this.statusService.getStatusClass(this.status)]:[]},enumerable:!1,configurable:!0}),e.\u0275fac=function(t){return new(t||e)(r.Qb(i.a))},e.\u0275cmp=r.Kb({type:e,selectors:[["nb-alert"]],hostVars:56,hostBindings:function(e,t){2&e&&(r.Fb(t.additionalClasses),r.Ib("closable",t.closable)("size-tiny",t.tiny)("size-small",t.small)("size-medium",t.medium)("size-large",t.large)("size-giant",t.giant)("status-primary",t.primary)("status-success",t.success)("status-info",t.info)("status-warning",t.warning)("status-danger",t.danger)("status-basic",t.basic)("status-control",t.control)("accent-primary",t.primaryAccent)("accent-success",t.successAccent)("accent-info",t.infoAccent)("accent-warning",t.warningAccent)("accent-danger",t.dangerAccent)("accent-basic",t.basicAccent)("accent-control",t.controlAccent)("outline-primary",t.primaryOutline)("outline-success",t.successOutline)("outline-info",t.infoOutline)("outline-warning",t.warningOutline)("outline-danger",t.dangerOutline)("outline-basic",t.basicOutline)("outline-control",t.controlOutline))},inputs:{size:"size",status:"status",accent:"accent",outline:"outline",closable:"closable"},outputs:{close:"close"},ngContentSelectors:c,decls:2,vars:1,consts:[["type","button","class","close","aria-label","Close",3,"click",4,"ngIf"],["type","button","aria-label","Close",1,"close",3,"click"],["aria-hidden","true"]],template:function(e,t){1&e&&(r.pc(),r.Ic(0,a,3,0,"button",0),r.oc(1)),2&e&&r.qc("ngIf",t.closable)},directives:[s.o],styles:["[_nghost-%COMP%]{display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-ms-flex-direction:column;flex-direction:column;position:relative}[dir=ltr]   [_nghost-%COMP%]   .close[_ngcontent-%COMP%]{right:0}[dir=rtl]   [_nghost-%COMP%]   .close[_ngcontent-%COMP%]{left:0}.close[_ngcontent-%COMP%]{position:absolute;top:0;color:inherit;background-color:transparent;border:0;-webkit-appearance:none;-moz-appearance:none;appearance:none}"]}),e}()}}]);