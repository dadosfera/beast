(window.webpackJsonp=window.webpackJsonp||[]).push([[20],{"1/AD":function(t,e,n){"use strict";n.r(e),n.d(e,"NgdExampleModule",function(){return f});var i=n("tyNb"),o=n("XNiG"),c=n("LRne"),r=n("3E0/"),s=n("1G5W"),u=n("MGne"),h=n("hzLA"),p=n("fXoL"),a=n("4vXS"),d=[{path:"",component:function(){function t(t,e,n,i,c){this.communicator=t,this.themeService=e,this.router=n,this.analytics=i,this.document=c,this.destroy$=new o.a}return t.prototype.ngOnInit=function(){this.setupId(),this.subscribeOnThemeSwitch(),this.analytics.trackEvent("initExampleView",this.id)},t.prototype.ngAfterViewInit=function(){var t=this;Object(c.a)(null).pipe(Object(r.a)(500)).subscribe(function(){return t.sendHeight()})},t.prototype.ngOnDestroy=function(){this.destroy$.next(),this.destroy$.complete()},t.prototype.setupId=function(){this.id=this.getId()},t.prototype.subscribeOnThemeSwitch=function(){var t=this;this.communicator.receive(this.id).pipe(Object(s.a)(this.destroy$)).subscribe(function(e){return t.changeTheme(e)})},t.prototype.changeTheme=function(t){this.themeService.changeTheme(t.theme),this.sendHeight()},t.prototype.getId=function(){var t=this.router.url.split("/");return t.splice(0,2),t.join("/")},t.prototype.sendHeight=function(){this.communicator.send({id:this.id,height:this.document.body.clientHeight})},t.\u0275fac=function(e){return new(e||t)(p.Qb(h.d),p.Qb(a.a),p.Qb(i.c),p.Qb(h.a),p.Qb(u.b))},t.\u0275cmp=p.Kb({type:t,selectors:[["ngd-example"]],decls:1,vars:0,template:function(t,e){1&t&&p.Rb(0,"router-outlet")},directives:[i.h],styles:["[_nghost-%COMP%]{display:block;background-color:#f1f2f3}"]}),t}(),children:[{path:"",loadChildren:function(){return n.e(22).then(n.bind(null,"/fP5")).then(function(t){return t.PlaygroundModule})}},{path:"**",component:function(){function t(t){this.themeService=t,this.themeService.changeTheme("default")}return t.\u0275fac=function(e){return new(e||t)(p.Qb(a.a))},t.\u0275cmp=p.Kb({type:t,selectors:[["ngd-example-404"]],decls:1,vars:0,template:function(t,e){1&t&&p.Kc(0," Example not found. ")},styles:["[_nghost-%COMP%]{-webkit-box-align:center;-ms-flex-align:center;align-items:center;display:-webkit-box;display:-ms-flexbox;display:flex;color:grey;-webkit-box-pack:center;-ms-flex-pack:center;justify-content:center;height:5rem}"]}),t}()}]}],l=function(){function t(){}return t.\u0275mod=p.Ob({type:t}),t.\u0275inj=p.Nb({factory:function(e){return new(e||t)},imports:[[i.g.forChild(d)],i.g]}),t}(),f=function(){function t(){}return t.\u0275mod=p.Ob({type:t}),t.\u0275inj=p.Nb({factory:function(e){return new(e||t)},imports:[[l]]}),t}()}}]);