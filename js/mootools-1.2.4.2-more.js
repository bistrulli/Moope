//MooTools More, <http://mootools.net/more>. Copyright (c) 2006-2009 Aaron Newton <http://clientcide.com/>, Valerio Proietti <http://mad4milk.net> & the MooTools team <http://mootools.net/developers>, MIT Style License.

MooTools.More={version:"1.2.4.2",build:"bd5a93c0913cce25917c48cbdacde568e15e02ef"};Element.implement({tidy:function(){this.set("value",this.get("value").tidy());
},getTextInRange:function(b,a){return this.get("value").substring(b,a);},getSelectedText:function(){if(this.setSelectionRange){return this.getTextInRange(this.getSelectionStart(),this.getSelectionEnd());
}return document.selection.createRange().text;},getSelectedRange:function(){if($defined(this.selectionStart)){return{start:this.selectionStart,end:this.selectionEnd};
}var e={start:0,end:0};var a=this.getDocument().selection.createRange();if(!a||a.parentElement()!=this){return e;}var c=a.duplicate();if(this.type=="text"){e.start=0-c.moveStart("character",-100000);
e.end=e.start+a.text.length;}else{var b=this.get("value");var d=b.length;c.moveToElementText(this);c.setEndPoint("StartToEnd",a);if(c.text.length){d-=b.match(/[\n\r]*$/)[0].length;
}e.end=d-c.text.length;c.setEndPoint("StartToStart",a);e.start=d-c.text.length;}return e;},getSelectionStart:function(){return this.getSelectedRange().start;
},getSelectionEnd:function(){return this.getSelectedRange().end;},setCaretPosition:function(a){if(a=="end"){a=this.get("value").length;}this.selectRange(a,a);
return this;},getCaretPosition:function(){return this.getSelectedRange().start;},selectRange:function(e,a){if(this.setSelectionRange){this.focus();this.setSelectionRange(e,a);
}else{var c=this.get("value");var d=c.substr(e,a-e).replace(/\r/g,"").length;e=c.substr(0,e).replace(/\r/g,"").length;var b=this.createTextRange();b.collapse(true);
b.moveEnd("character",e+d);b.moveStart("character",e);b.select();}return this;},insertAtCursor:function(b,a){var d=this.getSelectedRange();var c=this.get("value");
this.set("value",c.substring(0,d.start)+b+c.substring(d.end,c.length));if($pick(a,true)){this.selectRange(d.start,d.start+b.length);}else{this.setCaretPosition(d.start+b.length);
}return this;},insertAroundCursor:function(b,a){b=$extend({before:"",defaultMiddle:"",after:""},b);var c=this.getSelectedText()||b.defaultMiddle;var g=this.getSelectedRange();
var f=this.get("value");if(g.start==g.end){this.set("value",f.substring(0,g.start)+b.before+c+b.after+f.substring(g.end,f.length));this.selectRange(g.start+b.before.length,g.end+b.before.length+c.length);
}else{var d=f.substring(g.start,g.end);this.set("value",f.substring(0,g.start)+b.before+d+b.after+f.substring(g.end,f.length));var e=g.start+b.before.length;
if($pick(a,true)){this.selectRange(e,e+d.length);}else{this.setCaretPosition(e+f.length);}}return this;}});Elements.from=function(e,d){if($pick(d,true)){e=e.stripScripts();
}var b,c=e.match(/^\s*<(t[dhr]|tbody|tfoot|thead)/i);if(c){b=new Element("table");var a=c[1].toLowerCase();if(["td","th","tr"].contains(a)){b=new Element("tbody").inject(b);
if(a!="tr"){b=new Element("tr").inject(b);}}}return(b||new Element("div")).set("html",e).getChildren();};(function(){var d=/(.*?):relay\(([^)]+)\)$/,c=/[+>~\s]/,f=function(g){var h=g.match(d);
return !h?{event:g}:{event:h[1],selector:h[2]};},b=function(m,g){var k=m.target;if(c.test(g=g.trim())){var j=this.getElements(g);for(var h=j.length;h--;
){var l=j[h];if(k==l||l.hasChild(k)){return l;}}}else{for(;k&&k!=this;k=k.parentNode){if(Element.match(k,g)){return document.id(k);}}}return null;};var a=Element.prototype.addEvent,e=Element.prototype.removeEvent;
Element.implement({addEvent:function(j,i){var k=f(j);if(k.selector){var h=this.retrieve("$moo:delegateMonitors",{});if(!h[j]){var g=function(m){var l=b.call(this,m,k.selector);
if(l){this.fireEvent(j,[m,l],0,l);}}.bind(this);h[j]=g;a.call(this,k.event,g);}}return a.apply(this,arguments);},removeEvent:function(j,i){var k=f(j);if(k.selector){var h=this.retrieve("events");
if(!h||!h[j]||(i&&!h[j].keys.contains(i))){return this;}if(i){e.apply(this,[j,i]);}else{e.apply(this,j);}h=this.retrieve("events");if(h&&h[j]&&h[j].length==0){var g=this.retrieve("$moo:delegateMonitors",{});
e.apply(this,[k.event,g[j]]);delete g[j];}return this;}return e.apply(this,arguments);},fireEvent:function(j,h,g,k){var i=this.retrieve("events");if(!i||!i[j]){return this;
}i[j].keys.each(function(l){l.create({bind:k||this,delay:g,arguments:h})();},this);return this;}});})();Element.implement({measure:function(e){var g=function(h){return !!(!h||h.offsetHeight||h.offsetWidth);
};if(g(this)){return e.apply(this);}var d=this.getParent(),f=[],b=[];while(!g(d)&&d!=document.body){b.push(d.expose());d=d.getParent();}var c=this.expose();
var a=e.apply(this);c();b.each(function(h){h();});return a;},expose:function(){if(this.getStyle("display")!="none"){return $empty;}var a=this.style.cssText;
this.setStyles({display:"block",position:"absolute",visibility:"hidden"});return function(){this.style.cssText=a;}.bind(this);},getDimensions:function(a){a=$merge({computeSize:false},a);
var f={};var d=function(g,e){return(e.computeSize)?g.getComputedSize(e):g.getSize();};var b=this.getParent("body");if(b&&this.getStyle("display")=="none"){f=this.measure(function(){return d(this,a);
});}else{if(b){try{f=d(this,a);}catch(c){}}else{f={x:0,y:0};}}return $chk(f.x)?$extend(f,{width:f.x,height:f.y}):$extend(f,{x:f.width,y:f.height});},getComputedSize:function(a){a=$merge({styles:["padding","border"],plains:{height:["top","bottom"],width:["left","right"]},mode:"both"},a);
var c={width:0,height:0};switch(a.mode){case"vertical":delete c.width;delete a.plains.width;break;case"horizontal":delete c.height;delete a.plains.height;
break;}var b=[];$each(a.plains,function(g,f){g.each(function(h){a.styles.each(function(i){b.push((i=="border")?i+"-"+h+"-width":i+"-"+h);});});});var e={};
b.each(function(f){e[f]=this.getComputedStyle(f);},this);var d=[];$each(a.plains,function(g,f){var h=f.capitalize();c["total"+h]=c["computed"+h]=0;g.each(function(i){c["computed"+i.capitalize()]=0;
b.each(function(k,j){if(k.test(i)){e[k]=e[k].toInt()||0;c["total"+h]=c["total"+h]+e[k];c["computed"+i.capitalize()]=c["computed"+i.capitalize()]+e[k];}if(k.test(i)&&f!=k&&(k.test("border")||k.test("padding"))&&!d.contains(k)){d.push(k);
c["computed"+h]=c["computed"+h]-e[k];}});});});["Width","Height"].each(function(g){var f=g.toLowerCase();if(!$chk(c[f])){return;}c[f]=c[f]+this["offset"+g]+c["computed"+g];
c["total"+g]=c[f]+c["total"+g];delete c["computed"+g];},this);return $extend(e,c);}});(function(){var a=false;window.addEvent("domready",function(){var b=new Element("div").setStyles({position:"fixed",top:0,right:0}).inject(document.body);
a=(b.offsetTop===0);b.dispose();});Element.implement({pin:function(d){if(this.getStyle("display")=="none"){return null;}var f,b=window.getScroll();if(d!==false){f=this.getPosition();
if(!this.retrieve("pinned")){var h={top:f.y-b.y,left:f.x-b.x};if(a){this.setStyle("position","fixed").setStyles(h);}else{this.store("pinnedByJS",true);
this.setStyles({position:"absolute",top:f.y,left:f.x}).addClass("isPinned");this.store("scrollFixer",(function(){if(this.retrieve("pinned")){var i=window.getScroll();
}this.setStyles({top:h.top.toInt()+i.y,left:h.left.toInt()+i.x});}).bind(this));window.addEvent("scroll",this.retrieve("scrollFixer"));}this.store("pinned",true);
}}else{var g;if(!Browser.Engine.trident){var e=this.getParent();g=(e.getComputedStyle("position")!="static"?e:e.getOffsetParent());}f=this.getPosition(g);
this.store("pinned",false);var c;if(a&&!this.retrieve("pinnedByJS")){c={top:f.y+b.y,left:f.x+b.x};}else{this.store("pinnedByJS",false);window.removeEvent("scroll",this.retrieve("scrollFixer"));
c={top:f.y,left:f.x};}this.setStyles($merge(c,{position:"absolute"})).removeClass("isPinned");}return this;},unpin:function(){return this.pin(false);},togglepin:function(){this.pin(!this.retrieve("pinned"));
}});})();(function(){var a=Element.prototype.position;Element.implement({position:function(h){if(h&&($defined(h.x)||$defined(h.y))){return a?a.apply(this,arguments):this;
}$each(h||{},function(w,u){if(!$defined(w)){delete h[u];}});h=$merge({relativeTo:document.body,position:{x:"center",y:"center"},edge:false,offset:{x:0,y:0},returnPos:false,relFixedPosition:false,ignoreMargins:false,ignoreScroll:false,allowNegative:false},h);
var s={x:0,y:0},f=false;var c=this.measure(function(){return document.id(this.getOffsetParent());});if(c&&c!=this.getDocument().body){s=c.measure(function(){return this.getPosition();
});f=c!=document.id(h.relativeTo);h.offset.x=h.offset.x-s.x;h.offset.y=h.offset.y-s.y;}var t=function(u){if($type(u)!="string"){return u;}u=u.toLowerCase();
var v={};if(u.test("left")){v.x="left";}else{if(u.test("right")){v.x="right";}else{v.x="center";}}if(u.test("upper")||u.test("top")){v.y="top";}else{if(u.test("bottom")){v.y="bottom";
}else{v.y="center";}}return v;};h.edge=t(h.edge);h.position=t(h.position);if(!h.edge){if(h.position.x=="center"&&h.position.y=="center"){h.edge={x:"center",y:"center"};
}else{h.edge={x:"left",y:"top"};}}this.setStyle("position","absolute");var g=document.id(h.relativeTo)||document.body,d=g==document.body?window.getScroll():g.getPosition(),n=d.y,i=d.x;
var e=g.getScrolls();n+=e.y;i+=e.x;var o=this.getDimensions({computeSize:true,styles:["padding","border","margin"]});var k={},p=h.offset.y,r=h.offset.x,l=window.getSize();
switch(h.position.x){case"left":k.x=i+r;break;case"right":k.x=i+r+g.offsetWidth;break;default:k.x=i+((g==document.body?l.x:g.offsetWidth)/2)+r;break;}switch(h.position.y){case"top":k.y=n+p;
break;case"bottom":k.y=n+p+g.offsetHeight;break;default:k.y=n+((g==document.body?l.y:g.offsetHeight)/2)+p;break;}if(h.edge){var b={};switch(h.edge.x){case"left":b.x=0;
break;case"right":b.x=-o.x-o.computedRight-o.computedLeft;break;default:b.x=-(o.totalWidth/2);break;}switch(h.edge.y){case"top":b.y=0;break;case"bottom":b.y=-o.y-o.computedTop-o.computedBottom;
break;default:b.y=-(o.totalHeight/2);break;}k.x+=b.x;k.y+=b.y;}k={left:((k.x>=0||f||h.allowNegative)?k.x:0).toInt(),top:((k.y>=0||f||h.allowNegative)?k.y:0).toInt()};
var j={left:"x",top:"y"};["minimum","maximum"].each(function(u){["left","top"].each(function(v){var w=h[u]?h[u][j[v]]:null;if(w!=null&&k[v]<w){k[v]=w;}});
});if(g.getStyle("position")=="fixed"||h.relFixedPosition){var m=window.getScroll();k.top+=m.y;k.left+=m.x;}if(h.ignoreScroll){var q=g.getScroll();k.top-=q.y;
k.left-=q.x;}if(h.ignoreMargins){k.left+=(h.edge.x=="right"?o["margin-right"]:h.edge.x=="center"?-o["margin-left"]+((o["margin-right"]+o["margin-left"])/2):-o["margin-left"]);
k.top+=(h.edge.y=="bottom"?o["margin-bottom"]:h.edge.y=="center"?-o["margin-top"]+((o["margin-bottom"]+o["margin-top"])/2):-o["margin-top"]);}k.left=Math.ceil(k.left);
k.top=Math.ceil(k.top);if(h.returnPos){return k;}else{this.setStyles(k);}return this;}});})();Element.implement({isDisplayed:function(){return this.getStyle("display")!="none";
},isVisible:function(){var a=this.offsetWidth,b=this.offsetHeight;return(a==0&&b==0)?false:(a>0&&b>0)?true:this.isDisplayed();},toggle:function(){return this[this.isDisplayed()?"hide":"show"]();
},hide:function(){var b;try{if((b=this.getStyle("display"))=="none"){b=null;}}catch(a){}return this.store("originalDisplay",b||"block").setStyle("display","none");
},show:function(a){return this.setStyle("display",a||this.retrieve("originalDisplay")||"block");},swapClass:function(a,b){return this.removeClass(a).addClass(b);
}});