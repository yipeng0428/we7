!function(a,b){var c='<div id="{{id}}" class="mui-slider mui-preview-image mui-fullscreen"><div class="mui-preview-header">{{header}}</div><div class="mui-slider-group"></div><div class="mui-preview-footer mui-hidden">{{footer}}</div><div class="mui-preview-loading"><span class="mui-spinner mui-spinner-white"></span></div></div>',d='<div class="mui-slider-item mui-zoom-wrapper {{className}}"><div class="mui-zoom-scroller"><img src="{{src}}" data-preview-lazyload="{{lazyload}}" style="{{style}}" class="mui-zoom"></div></div>',e="__DEFAULT",f=document.createElement("div"),g=function(b){this.options=a.extend(!0,{id:"__MUI_PREVIEWIMAGE",zoom:!0,header:'<span class="mui-preview-indicator"></span>',footer:""},b||{}),this.init(),this.initEvent()},h=g.prototype;h.init=function(){var b=this.options,d=document.getElementById(this.options.id);d||(f.innerHTML=c.replace(/\{\{id\}\}/g,this.options.id).replace("{{header}}",b.header).replace("{{footer}}",b.footer),document.body.appendChild(f.firstElementChild),d=document.getElementById(this.options.id)),this.element=d,this.scroller=this.element.querySelector(a.classSelector(".slider-group")),this.indicator=this.element.querySelector(a.classSelector(".preview-indicator")),this.loader=this.element.querySelector(a.classSelector(".preview-loading")),b.footer&&this.element.querySelector(a.classSelector(".preview-footer")).classList.remove(a.className("hidden")),this.addImages()},h.initEvent=function(){var b=this;a(document.body).on("click","img[data-preview-src]",function(){return b.isAnimationing()?!1:(b.open(this),!1)});var c=null,d=function(){!c&&(c=a.later(function(){b.isInAnimation=!0,b.loader.removeEventListener("tap",d),b.scroller.removeEventListener("tap",d),b.close()},300))};this.scroller.addEventListener("doubletap",function(){c&&(c.cancel(),c=null)}),this.element.addEventListener("webkitAnimationEnd",function(){b.element.classList.contains(a.className("preview-out"))?(b.element.style.display="none",b.element.classList.remove(a.className("preview-out")),c=null):(b.loader.addEventListener("tap",d),b.scroller.addEventListener("tap",d)),b.isInAnimation=!1}),this.element.addEventListener("slide",function(c){if(b.options.zoom){var d=b.element.querySelector(".mui-zoom-wrapper:nth-child("+(b.lastIndex+1)+")");d&&a(d).zoom().setZoom(1)}var e=c.detail.slideNumber;b.lastIndex=e,b.indicator&&(b.indicator.innerText=e+1+"/"+b.currentGroup.length),b._loadItem(e)})},h.isAnimationing=function(){return this.isInAnimation?!0:(this.isInAnimation=!0,!1)},h.addImages=function(a,b){this.groups={};var c=[];if(c=a?a===e?document.querySelectorAll("img[data-preview-src]:not([data-preview-group])"):document.querySelectorAll("img[data-preview-src][data-preview-group='"+a+"']"):document.querySelectorAll("img[data-preview-src]"),c.length)for(var d=0,f=c.length;f>d;d++)this.addImage(c[d])},h.addImage=function(a){var b=a.getAttribute("data-preview-group");b=b||e,this.groups[b]||(this.groups[b]=[]);var c=a.getAttribute("src");if(a.__mui_img_data&&a.__mui_img_data.src===c)this.groups[b].push(a.__mui_img_data);else{var d=a.getAttribute("data-preview-src");d||(d=c);var f={src:c,lazyload:c===d?"":d,loaded:c===d,sWidth:0,sHeight:0,sTop:0,sLeft:0,sScale:1,el:a};this.groups[b].push(f),a.__mui_img_data=f}},h.empty=function(){this.scroller.innerHTML=""},h._initImgData=function(c,d){if(!c.sWidth){var e=c.el;c.sWidth=e.offsetWidth,c.sHeight=e.offsetHeight;var f=a.offset(e);c.sTop=f.top,c.sLeft=f.left,c.sScale=Math.max(c.sWidth/b.innerWidth,c.sHeight/b.innerHeight)}d.style.webkitTransform="translate3d(0,0,0) scale("+c.sScale+")"},h._getScale=function(a,b){var c=a.width/b.width,d=a.height/b.height,e=1;return e=d>=c?a.height/(b.height*c):a.width/(b.width*d)},h._imgTransitionEnd=function(b){var c=b.target;c.classList.remove(a.className("transitioning")),c.removeEventListener("webkitTransitionEnd",this._imgTransitionEnd.bind(this))},h._loadItem=function(b,c){var d=this.scroller.querySelector(a.classSelector(".slider-item:nth-child("+(b+1)+")")),e=this.currentGroup[b],f=d.querySelector("img");if(this._initImgData(e,f),c){var g=this._getPosition(e);f.style.webkitTransitionDuration="0ms",f.style.webkitTransform="translate3d("+g.x+"px,"+g.y+"px,0) scale("+e.sScale+")",f.offsetHeight}if(!e.loaded&&f.getAttribute("data-preview-lazyload")){var h=this;h.loader.classList.add(a.className("active")),f.style.webkitTransitionDuration="0.5s",f.addEventListener("webkitTransitionEnd",h._imgTransitionEnd.bind(h)),f.style.webkitTransform="translate3d(0,0,0) scale("+e.sScale+")",this.loadImage(f,function(){e.loaded=!0,f.src=e.lazyload,h._initZoom(d,this.width,this.height),f.classList.add(a.className("transitioning")),f.addEventListener("webkitTransitionEnd",h._imgTransitionEnd.bind(h)),f.setAttribute("style",""),f.offsetHeight,h.loader.classList.remove(a.className("active"))})}else e.lazyload&&(f.src=e.lazyload),this._initZoom(d,f.width,f.height),f.classList.add(a.className("transitioning")),f.addEventListener("webkitTransitionEnd",this._imgTransitionEnd.bind(this)),f.setAttribute("style",""),f.offsetHeight;this._preloadItem(b+1),this._preloadItem(b-1)},h._preloadItem=function(b){var c=this.scroller.querySelector(a.classSelector(".slider-item:nth-child("+(b+1)+")"));if(c){var d=this.currentGroup[b];if(!d.sWidth){var e=c.querySelector("img");this._initImgData(d,e)}}},h._initZoom=function(b,c,d){if(this.options.zoom&&!b.getAttribute("data-zoomer")){var e=b.querySelector(a.classSelector(".zoom"));if("IMG"===e.tagName){var f=this,g=f._getScale({width:b.offsetWidth,height:b.offsetHeight},{width:c,height:d});a(b).zoom({maxZoom:Math.max(g,1)})}else a(b).zoom()}},h.loadImage=function(a,b){var c=function(){b&&b.call(this)},d=new Image;d.onload=c,d.onerror=c,d.src=a.getAttribute("data-preview-lazyload")},h.getRangeByIndex=function(a,b){return{from:0,to:b-1}},h._getPosition=function(a){var c=a.sLeft-b.pageXOffset,d=a.sTop-b.pageYOffset,e=(b.innerWidth-a.sWidth)/2,f=(b.innerHeight-a.sHeight)/2;return{left:c,top:d,x:c-e,y:d-f}},h.refresh=function(c,e){this.currentGroup=e;for(var f=e.length,g=[],h=this.getRangeByIndex(c,f),i=h.from,j=h.to+1,k=c,l="",m="",n=(b.innerWidth,b.innerHeight,0);j>i;i++,n++){var o=e[i],p="";o.sWidth&&(p="-webkit-transform:translate3d(0,0,0) scale("+o.sScale+");transform:translate3d(0,0,0) scale("+o.sScale+")"),m=d.replace("{{src}}",o.src).replace("{{lazyload}}",o.lazyload).replace("{{style}}",p),i===c?(k=n,l=a.className("active")):l="",g.push(m.replace("{{className}}",l))}this.scroller.innerHTML=g.join(""),this.element.style.display="block",this.element.classList.add(a.className("preview-in")),this.lastIndex=k,this.element.offsetHeight,a(this.element).slider().gotoItem(k,0),this.indicator&&(this.indicator.innerText=k+1+"/"+this.currentGroup.length),this._loadItem(k,!0)},h.openByGroup=function(a,b){a=Math.min(Math.max(0,a),this.groups[b].length-1),this.refresh(a,this.groups[b])},h.open=function(b,c){this.element.classList.contains(a.className("preview-in"))||("number"==typeof b?(c=c||e,this.addImages(c,b),this.openByGroup(b,c)):(c=b.getAttribute("data-preview-group"),c=c||e,this.addImages(c,b),this.openByGroup(this.groups[c].indexOf(b.__mui_img_data),c)))},h.close=function(c,d){this.element.classList.remove(a.className("preview-in")),this.element.classList.add(a.className("preview-out"));var e=this.scroller.querySelector(a.classSelector(".slider-item:nth-child("+(this.lastIndex+1)+")")),f=e.querySelector("img");if(f){f.classList.add(a.className("transitioning"));var g=this.currentGroup[this.lastIndex],h=this._getPosition(g),i=h.left,j=h.top;j>b.innerHeight||i>b.innerWidth||0>j||0>i?(f.style.opacity=0,f.style.webkitTransitionDuration="0.5s",f.style.webkitTransform="scale("+g.sScale+")"):(this.options.zoom&&a(f.parentNode.parentNode).zoom().toggleZoom(0),f.style.webkitTransitionDuration="0.5s",f.style.webkitTransform="translate3d("+h.x+"px,"+h.y+"px,0) scale("+g.sScale+")")}for(var k=this.element.querySelectorAll(a.classSelector(".zoom-wrapper")),l=0,m=k.length;m>l;l++)a(k[l]).zoom().destory()},h.isShown=function(){return this.element.classList.contains(a.className("preview-in"))};var i=null;a.previewImage=function(a){return i||(i=new g(a)),i},a.getPreviewImage=function(){return i}}(mui,window);