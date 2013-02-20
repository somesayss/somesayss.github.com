/*
	Star 	: 2012.2.3
	End 	: 2013.??.??
	version : 1.1.0
*/
~ function(){
var $ = function(){
	var C = $._ForElement;
	switch($.Typeof(arguments[0])){
		case "Object": return new C($.Array(arguments));
		case "String": return new C($.Array($.Selector(arguments[0])));
		case "Array" : if(arguments[0].length) return new C(arguments[0]);
		case "Function" : return $.Dom.ready(arguments[0]);
		default : return [];
	}
};
/*----base----*/
$.Browser = (function(){
	return {
		IE6		: !!window.ActiveXObject && !window.XMLHttpRequest,
		IE7		: !+"\v1" && !document.querySelector,
		IE8		: !+"\v1",
		IE		: !!window.attachEvent && !window.opera,
		opear	: !!window.opera
	}
})();
$.Class = {
	creat:function(){
		return function(){
			this.init.apply(this, arguments);
		}
	},
	extend:function(current,target,futher){
        for(var i in target.prototype){
            current.prototype[i] = target.prototype[i]
        }
         for(var j in futher){
            current.prototype[j] = futher[j]
        }
        var _init1 = target.prototype["init"],
            _init2 = futher["init"],
            _Parameter1 = _init1.toString().split("(")[1].split(")")[0],
            _Parameter2 = _init2.toString().split("(")[1].split(")")[0],
            _body1 = _init1.toString().split("{")[1].split("}")[0],
            _body2 = _init2.toString().split("{")[1].split("}")[0];
        eval('current.prototype.init=function('+_Parameter1+','+_Parameter2+'){'+_body1+_body2+'}');
    }
};
$.Object = {
	extend:function(target,source){
		for(var i in source) target[i] = source[i];
		return target;
	},
	clone:function(source){
		return this.extend({},source)
	},
	hasname:function(obj,name){
		try{
			var is = obj.hasOwnProperty(name);
			if(is) return is;
			return name in obj;
		}catch(e){
			return name in obj;
		}
	},
	isprototypename:function(obj,name){
		return !obj.hasOwnProperty(name) && name in obj;
	},
	isempty:function(obj){
		var i = "";
		for(i in obj) break;
		return !i;
	}
};
$.Array = function(obj){
	if(!obj.length) return [obj];
	try{
		return Array.prototype.slice.call(obj,0);
	}catch(e){
		var arr = [];
		for(var i=0,j=obj.length;i<j;i++) arr.push(obj[i]);
		return arr;
	}
};
$.Index = function(obj,objs){
	try{
		for(var i=0,j=objs.length;i<j;i++) if(obj === objs[i].dom()) return i;
		return -1;
	}catch(e){
		for(var i=0,j=objs.length;i<j;i++) if(obj == objs[i]) return i;
		return -1;
	}
};
$.Each = function(obj,fn,isdom){
	if(!obj) return;
	if(!isdom){
		for(var i=0,j=obj.length; i<j; i++) fn.call(obj[i],i,obj);
	}else{
		for(var i in obj) fn.call(obj[i],i,obj);
	}
};
$.Alert = function(msg){
	try{
		console.log(msg);
	}catch(e){
		alert(msg);
	}
};
$.log = function(msg){
	try{
		console.log(msg);
	}catch(e){}
};
$.Typeof = function(key){
	switch(Object.prototype.toString.call(key)){
	case '[object Array]' 		: return 'Array';
	case '[object String]' 		: return 'String';
	case '[object RegExp]' 		: return 'RegExp';
	case '[object Number]' 		: return 'Number';
	case '[object Function]'	: return 'Function';
	case '[object Boolean]' 	: return 'Boolean';
	default :
		switch(key){
			case null 			: return 'Null';
			case undefined 		: return 'Undefined';
			default 			: return 'Object';
		}
	}
};
$.Try = function(){
	for(var i=0,j=arguments.length;i<j;i++){
		try{
			return arguments[i]();
		}catch(e){}
	}
}
/*---Data---*/
$.Data = {
	set:function(obj,name,value){
		obj["data-som-"+name] = value;
	},
	get:function(obj,name){
		return obj["data-som-"+name];
	},
	_del:function(obj,name){
		$.Try(function(){
			delete obj[name];
		},function(){
			obj.removeAttribute(name);
		},function(){
			obj[name] = undefined;
		});
	},
	_cacherex:{
		rex1:/^data-som-/
	},
	clear:function(obj,name){
		var _data = this;
		if(!!name){
			var _name = !arguments[2] ? "data-som-"+name : name;
			if(!$.Object.hasname(obj,_name)) return;
			_data._del(obj,_name);
		}else{
			$.Each(obj,function(i,o){
				if(_data._cacherex.rex1.test(i))_data._del(o,i);
			},true)
		}
	}
}
/*---cacheRex---*/
$.cacheRex = {
	forSelector : /^#|^\./,
	forScript : /<script[^>]*>([\S\s]*?)<\/script>/img
}
/*---Array---*/
$.ArrayMethod = {
	value:function(arr){
		return arr;
	},
	clear:function(arr){
		arr.length = 0;
		return $.Use(arr);
	},
	index:function(arr,tar){
		return $.Index(tar,arr);
	},
	except:function(arr,arg){
		if($.Typeof(arg) === "Number"){
			arr.splice(arg,1);
			return $.Use(arr);
		}else{
			var i = $.Index(arg,arr);
			if(i === -1) return $.Use(arr);
			arr.splice(i,1);
			return $.Use(arr);
		}
	},
	each:function(arr,fn){
		for(var i=0,j=arr.length; i<j; i++) fn.call(arr[i],i,arr);
		return $.Use(arr);
	},
	inArray:function(arr){
		for(var i=0,j=arr.length; i<j; i++){
			if(arr[i] === arguments[1]) return true;
		}
		return false;
	},
	filter:function(arr,fun){
		var newarr = [];
		$.Use(arr).each(function(i,o){
			if (fun.call(o[i],i,o)) newarr.push(o[i]); 
		})
		return $.Use(newarr);
	},
	clone:function(arr){
		return $.Use(arr.slice(0));
	},
	concat:function(arr,arg){
		return $.Use(arr.concat(arg));
	},
	join:function(arr,arg){
		return $.Use(arr.join(arg))
	},
	pop:function(arr,arg){
		arr.pop();
		return $.Use(arr);
	},
	push:function(arr,arg){
		arr[arr.length] = arg;
		return $.Use(arr);
	},
	shift:function(arr){
		arr.shift();
		return $.Use(arr);
	},
	unshift:function(arr,arg){
		arr.unshift(arg);
		return $.Use(arr);
	},
	slice:function(){
		var arr = $.Array(arguments),arg = arr.shift();
		return $.Use([].slice.apply(arg,arr));
	},
	splice:function(){
		var arr = $.Array(arguments),arg = arr.shift();
		[].splice.apply(arg,arr);
		return $.Use(arg);
	},
	reverse:function(arr){
		return $.Use(arr.reverse());
	},
	sort:function(arr,arg){
		return $.Use(arr.sort(arg))
	}
}
/*---Number---*/
$.NumberMethod = {
	value:function(num){
		return num;
	},
	formatcolor:function(num){
		var _num = num.toString(16);
		if(num < 16) _num =  "0" + _num;
		return $.Use(_num);
	}
}
/*---String---*/
$.StringMethod = {
	value:function(str){
		return str;
	},
	strip:function(str){
		str = str.replace(/^\s+/, '').replace(/\s+$/, '');
		return $.Use(str);
	},
	stripScripts:function(str){
		return $.Use(str.replace($.cacheRex.forScript, ''));
	},
	getScripts:function(str){
		str = str.match($.cacheRex.forScript);
		$.Each(str,function(i,o){
			o[i] = o[i].replace($.cacheRex.forScript,function(a,b){
			return b;
			})
		});
		return $.Use(str);
	},
	evalScripts:function(str){
		eval(""+str);
		return $.Use(str);
	},
	getDom:function(str){
		return $.Method.tempnode(str);
	}
}
/*---Function---*/
$.FunctionMethod = {
	bind:function(){
		var args = $.Array(arguments), _fun = args.shift(), _obj = args.shift();
		return function(){
			return _fun.apply(_obj,args.concat($.Array(arguments)));
		};
	},
	name:function(fun){
		var name;
		$.Try(function(){
			name = fun.toString().match(/function (\w+)/)[1];
		},function(){
			name = '';
		});
		return name;
	},
	body:function(fun){

	}
}
/*----window----*/
$.Window = {
	outerHeight:function(){
		return window.innerHeight || document.documentElement.offsetHeight;
	},
	outerWidth:function(){
		return window.innerWidth || document.documentElement.offsetWidth;
	},
	innerHeight:function(){
		return document.documentElement.clientHeight;
	},
	innerWidth:function(){
		return document.documentElement.clientWidth;
	},
	bodyHeight:function(){
		return document.body.offsetHeight;
	},
	bodyWidth:function(){
		return document.documentElement.clientWidth;
	},
	scrollHeight:function(){
		return document.documentElement.scrollHeight;
	},
	scrollWidth:function(){
		return document.documentElement.scrollWidth;
	},
	scrollTop:function(num){
		var D = document;
		if(!!num){
			D.documentElement.scrollTop = num;
			D.body.scrollTop = num;
			return;
		}
		return D.documentElement.scrollTop || D.body.scrollTop;
	},
	scrollLeft:function(num){
		var D = document;
		if(!!num){
			D.documentElement.scrollLeft = num;
			D.body.scrollLeft = num;
			return;
		}
		return D.documentElement.scrollLeft || D.body.scrollLeft;
	},
	onload:function(fun){
		if($.Typeof(fun) !== "Function") return;
	    if(!!window.onload){
        	var oldfun = window.onload;
        	window.onload = function(){
            	oldfun();
            	fun();
            }
        }else{
       		window.onload = fun;
        }
	}
}
/*----Dom----*/
$.Dom = {
	getElementsByClassName:function(name,node){
		var eles = null;
		if(document.querySelectorAll){
			!!node ? eles = node.querySelectorAll("."+name) : eles = document.querySelectorAll("."+name);
			return eles.length === 0 ?  null : $.Array(eles);
		}		
		!!node ? eles = node.getElementsByTagName("*") : eles = document.getElementsByTagName("*");
		return $.Method._selectByclass(eles,name);
	},
	_readyarr:[],
	ready:function(fun){
		if($.Typeof(fun) !== "Function") return;
		var _this = this,_arr = _this._readyarr;
		if(_arr.push(fun) > 1) return;
		if(!$.Browser.IE8){
			$(document).bind("DOMContentLoaded",function(){
				$(document).unbind("DOMContentLoaded");
				for(var i=0,j=_arr.length;i<j;i++) _arr[i]();
				$.Use(_arr).clear();
			});
		}else{
			var img = new Image,_isread = false;
			$(document).bind("readystatechange",function(){
				if(document.readyState === "complete"){
					$(document).unbind("readystatechange");
					if(_isread) return;
					for(var i=0,j=_arr.length;i<j;i++) _arr[i]();
					_isread = true;
					$.Use(_arr).clear();
				}
			})
			~function(){
				try{
					img.doScroll();
					if(_isread) return;
					for(var i=0,j=_arr.length;i<j;i++) _arr[i]();
					_isread = true;
					$.Use(_arr).clear();
				}catch(e){
					setTimeout(arguments.callee,0);
				}
			}()
		}
	},
	contains:function(fa,ch){
		if(fa === ch) return true;
		if(fa.contains) return fa.nodeType === 9 ? true : fa.contains(ch);
		if(fa.compareDocumentPosition) return !!(fa.compareDocumentPosition(ch) & 16);
		while(ch = ch.parentNode) if(ch === fa) return true;
		return false;
	}
}
/*----Selector----*/
$.Selector = function(str,node){
	if($.Typeof(str) !== "String")return;
	var _first = str.slice(0,1),_body = null;
	$.cacheRex.forSelector.test(_first) ? _body = str.slice(1) : _body = str;
	switch(_first){
		case "#": return document.getElementById(_body);
		case ".": return $.Dom.getElementsByClassName(_body,node);
		default :
			var _tags = (node || document).getElementsByTagName(str);
			return !_tags ? null : $.Array(_tags);
	}
}
/*----Event----*/
$.Bindevent = {
	add:function(node,en,fu){
		node.addEventListener ? node.addEventListener(en,fu,false) : node.attachEvent("on" + en, fu);
		},
	remove:function(node,en,fu){
		node.removeEventListener ? node.removeEventListener(en,fu,false) : node.detachEvent("on" + en, fu);
		},
	bind:function(node,en,fu){
		var _this = this , _data = $.Data , _getData = _data.get , _setData = _data.set;
		if (!_getData(node,"event")) _setData(node,"event",{});
		if (!_getData(node,"event")[en]) _getData(node,"event")[en] = [];
		if (_getData(node,"event")[en].push(fu) > 1) return;
		if (en === "mouseenter" && !$.Object.hasname(node,"on"+en)) return $.EventFix[en](node);
		if (en === "mouseleave" && !$.Object.hasname(node,"on"+en)) return $.EventFix[en](node);
		var agent = function(e){
			var E = new $.Event(e || window.event);
			$.Each(_getData(node,"event")[en],function(){
				this.call(node,E);
			})
		};
		_setData(node,"agent"+en,agent);
		_this.add(node,en,agent);
	},
	unbind:function(node,en){
		if (en === "mouseenter" && !$.Object.hasname(node,"on"+en)) this.remove(node,"mouseover",$.Data.get(node,"agent"+en));
		else if (en === "mouseleave" && !$.Object.hasname(node,"on"+en)) this.remove(node,"mouseout",$.Data.get(node,"agent"+en));
		else this.remove(node,en,$.Data.get(node,"agent"+en));
		$.Data.clear(node,"agent"+en);
		delete $.Data.get(node,"event")[en];
		if($.Object.isempty($.Data.get(node,"event"))) $.Data.clear(node,"event");
	}
}
$.Event = function(e){
	var _this = this , D = document;
	_this.e = e;
	_this.target = e.target || e.srcElement;
	_this.pointerX = e.pageX || (e.clientX +(D.documentElement.scrollLeft || D.body.scrollLeft));
  	_this.pointerY = e.pageY || (e.clientY +(D.documentElement.scrollTop || D.body.scrollTop));
  	_this.relatedTarget = e.relatedTarget || (e.fromElement === _this.target ? e.toElement : e.fromElement);
}
$.Event.prototype = {
	stopPropagation:function(){
		var E = this.e;
		E.stopPropagation ? E.stopPropagation() : E.cancelBubble = true;
	},
	preventDefault:function(){
		var E = this.e;
		E.preventDefault ? E.preventDefault() : E.returnValue = false;
	},
	stop:function(){
		var E = this.e;
		if(E.preventDefault){E.preventDefault();E.stopPropagation();}else{E.returnValue = false;E.cancelBubble = true;}
	}
}
$.EventFix = {
	mouseenter:function(node){
		var agent = function(e){
			var E = new $.Event(e || window.event);
			var rel = E.relatedTarget;
			E.stopPropagation();
			if($.Dom.contains(node,rel)) return;
			$.Each($.Data.get(node,"event")["mouseenter"],function(){
				this.call(node,E);
			})
		}
		$.Data.set(node,"agentmouseenter",agent);
		$.Bindevent.add(node,"mouseover",agent);
	},
	mouseleave:function(node){
		var agent = function(e){
			var E = new $.Event(e || window.event);
			var rel = E.relatedTarget;
			E.stopPropagation();
			if($.Dom.contains(node,rel)) return;
			$.Each($.Data.get(node,"event")["mouseleave"],function(){
				this.call(node,E);
			})
		}
		$.Data.set(node,"agentmouseleave",agent);
		$.Bindevent.add(node,"mouseout",agent);
	}
}
/*----Element----*/
$.Method = {
	dom:function(eles,num){
        return !num ? eles[0] : eles[num];
	},
	eq:function(eles,num){
		return $(eles[num ? num : 0]);
	},
	each:function(eles,fn){
		for(var i=0,j=eles.length; i<j; i++) fn.call(eles[i],i,eles);
		return $(eles); 
	},
	index:function(eles,node){
		return $.Index(node,eles);
	},
	filter:function(eles,fun){
		var newarr = [];
		$.Use(eles).each(function(i,o){
			if (fun.call(o[i],i,o)) newarr.push(o[i]); 
		})
		return $(newarr);
	},
	slice:function(){
		var arr = $.Array(arguments),eles = arr.shift();
		return $([].slice.apply(eles,arr));
	},
	bind:function(eles,en,fu){
		$.Each(eles,function(){
			$.Bindevent.bind(this,en,fu);
		});
		return $(eles);
	},
	unbind:function(eles,en){
		$.Each(eles,function(){
			$.Bindevent.unbind(this,en);
		});
		return $(eles);
	},
	animate:function(eles,obj){
		$.Each(eles,function(){
			obj.node = this;
			new $.animate(obj);
		});
		return $(eles);
	},
	animateStop:function(eles){
		$.Each(eles,function(){
			var val = $.Data.get(this,"animate");
			if(!!val) val.stop();
		});
		return $(eles);
	},
	animateToend:function(eles){
		$.Each(eles,function(){
			var val = $.Data.get(this,"animate");
			if(!!val) val.toend();
		});
		return $(eles);
	},
    show:function(eles,str){
        switch(str){
        	case undefined:
        	case 0:
        		$.Each(eles,function(){this.style.display = "block"});
        		break;
        	case 1:
        		$.Each(eles,function(){this.style.display = "inline"});
        		break;
        	default:
        		$.Each(eles,function(){this.style.display = arguments[1]});
        }
    	return $(eles);
    },
    hide:function(eles){
    	$.Each(eles,function(){this.style.display = "none"});
    	return $(eles);
    },
    visible:function(eles) {
    	return !!eles[0].offsetWidth || $(eles[0]).css("display") !== "none";
  	},
    toggle:function(eles,type){
    	$.Each(eles,function(){
    		$.Method[$.Method.visible([this]) ? "hide" : "show"]([this],type);
    	})
    	return $(eles);
    },
    find:function(eles,str){
    	return $($.Selector(str,eles[0]));
    },
    _findnode:function(node,type){
    	while(node && node.nodeType !== 1){
    		node = node[type]
    	}
    	return node;
    },
    _findnodes:function(node,type){
    	var arr = [],other = node[type];
    	while(other !== null){
    		if(other.nodeType === 1) arr.push(other);
    		other = other[type];
    	}
    	return arr;
    },
    _select:function(nodes,str){
    	if(!str) return;
    	var _first = str.slice(0,1),_body = null;
		/^\./.test(_first) ? _body = str.slice(1) : _body = str;
		switch(_first){
			case ".": return $.Method._selectByclass(nodes,_body);
			default : return $.Method._selectBynodename(nodes,_body);
		}
    },
    _selectBynodename:function(nodes,name){
    	var arrs = [];
    	name = name.toLocaleUpperCase();
    	$.Each(nodes,function(i,o){
    		if(o[i].nodeName === name) arrs.push(o[i])
    	});
    	return arrs.length === 0 ? null : arrs;
    },
    _selectByclass:function(nodes,name){
    	var arrs = [],rex = new RegExp("\\b"+name+"\\b");
    	$.Each(nodes,function(i,o){
    		if(rex.test(o[i].className) === true) arrs.push(o[i]);
    	});
		return arrs.length === 0 ? null : arrs;
    },
    next:function(eles){
    	return $($.Method._findnode(eles[0].nextSibling,"nextSibling"));
    },
    nextAll:function(eles,str){
    	if(!str) return $($.Method._findnodes(eles[0],"nextSibling"));
    	return $($.Method._select($.Method._findnodes(eles[0],"nextSibling"),str))
    },
    prev:function(eles){
 		return $($.Method._findnode(eles[0].previousSibling,"previousSibling"));
    },
    prevAll:function(eles,str){
    	if(!str) return $($.Method._findnodes(eles[0],"previousSibling"));
    	return $($.Method._select($.Method._findnodes(eles[0],"previousSibling"),str))
    },
    siblings:function(eles,str){
    	if(!str){
    		var nexts = $.Method._findnodes(eles[0],"nextSibling");
    		var prevs = $.Method._findnodes(eles[0],"previousSibling");
    	}else{
    		var nexts = $.Method._select($.Method._findnodes(eles[0],"nextSibling"),str);
    		var prevs = $.Method._select($.Method._findnodes(eles[0],"previousSibling"),str);
    	}
		return $((nexts ? nexts : []).concat((prevs ? prevs : [])));
    },
    first:function(eles){
    	return $($.Method._findnode(eles[0].firstChild,"nextSibling"));
    },
    last:function(eles){
    	return $($.Method._findnode(eles[0].lastChild,"previousSibling"));
    },
    parent:function(eles){
    	return $(eles[0].parentNode);
    },
    children:function(eles,str){
    	var arr = [];
    	$.Each(eles[0].childNodes,function(i,o){
    		if(o[i].nodeType === 1) arr.push(o[i])
    	})
    	if(!str) return $(arr);
    	return $($.Method._select(arr,str))
    },
    remove:function(eles){
    	//cleardata -> ele
    	$.Each(eles,function(){this.parentNode.removeChild(this)});
    	return $(eles);
    },
    empty:function(ele){
    	return $(ele).html('');
    },
    tempnode:function(str){
    	var div = document.createElement("div"), temp = document.createDocumentFragment();
    	div.innerHTML = str;
    	while(div.firstChild){
    		temp.appendChild(div.firstChild);
    	}
    	return temp;
    },
    append:function(eles){
    	if($.Typeof(arguments[1]) === "String"){
    		arguments[1] = $.Method.tempnode(arguments[1]);
    	}else{
    		try{
    			arguments[1] = arguments[1].dom();
    		}catch(e){}
    	}
    	eles[0].appendChild(arguments[1]);
    	return $(eles);
    },
    prepend:function(eles){
    	if($.Typeof(arguments[1]) === "String"){
    		arguments[1] = $.Method.tempnode(arguments[1]);
    	}else{
    		try{
    			arguments[1] = arguments[1].dom();
    		}catch(e){}
    	}
    	eles[0].insertBefore(arguments[1],eles[0].firstChild);
    	return $(eles);
    },
    after:function(eles){
    	if($.Typeof(arguments[1]) === "String"){
    		arguments[1] = $.Method.tempnode(arguments[1]);
    	}else{
    		try{
    			arguments[1] = arguments[1].dom();
    		}catch(e){}
    	}
    	eles[0].parentNode.insertBefore(arguments[1],eles[0].nextSibling);
    	return $(eles);
    },
    before:function(eles){
    	if($.Typeof(arguments[1]) === "String"){
    		arguments[1] = $.Method.tempnode(arguments[1]);
    	}else{
    		try{
    			arguments[1] = arguments[1].dom();
    		}catch(e){}
    	}
    	eles[0].parentNode.insertBefore(arguments[1],eles[0]);
    	return $(eles);
    },
    replace:function(eles){
    	if($.Typeof(arguments[1]) === "String"){
    		arguments[1] = $.Method.tempnode(arguments[1]);
    	}else{
    		try{
    			arguments[1] = arguments[1].dom();
    		}catch(e){}
    	}
    	//cleardata -> ele
    	eles[0].parentNode.replaceChild(arguments[1],eles[0]);
    	return $(eles[0]);
    },
    clone:function(eles){
    	//cleardata -> ele
    	return eles[0].cloneNode(!arguments[1]);
    },
    text:function(eles,str){
    	var innerText = ("textContent" in eles[0]) ? "textContent" : "innerText";
    	if($.Typeof(str) !== 'String') return $.Use(eles[0][innerText]).strip().value();
    	//cleardata -> All
    	eles[0][innerText] = str;
    	return $(eles);
    },
    html:function(eles,str){
    	if($.Typeof(str) !== 'String') return $.Use(eles[0].innerHTML).strip().value();
        //cleardata -> All
        eles[0].innerHTML = str;
        return $(eles);
    },
    hasClass:function(eles,str){
    	if(!str) return false;
    	return new RegExp("\\b"+str+"\\b").test(eles[0].className);
    },
    addClass:function(eles,str){
    	$.Each(eles,function(){
    		if($.Method.hasClass([this],str)) return;
    		this.className = this.className + " " +str;
    	});
    	return $(eles);
    },
    removeClass:function(eles,str){
    	if(!str){
    		$.Each(eles,function(){this.className = ""});
    		return $(eles);
    	}else{
    		$.Each(eles,function(){
    			if(!$.Method.hasClass([this],str)) return;
    			this.className = $.Use(this.className.replace(str,"").replace(/\s+/g," ")).strip().value();
    		});
    		return $(eles);
    	}
    },
    toggleClass:function(eles,str){
    	var _met = $.Method;
    	$.Each(eles,function(){_met.hasClass([this],str) ? _met.removeClass([this],str) : _met.addClass([this],str)});
    	return $(eles);
    },
    css:function(eles,a,b){
    	var _val
    	$.Each(eles,function(){
    		_val = new $.style(this,a,b).fire();
    	});
    	return (_val === true) ? $(eles[0]) : _val ;
    },
    attr:function(eles,name,value){
    	if(!value){
    		var _val = eles[0].getAttributeNode(name);
    		return _val ? _val.nodeValue : null;
    	}else{
    		var _att = document.createAttribute(name);
	        _att.nodeValue = value;
	        eles[0].setAttributeNode(_att);
	        return $(eles);
    	}
    },
    removeAttr:function(eles,name){
    	if(!name) return $(eles);
    	switch(name){
	        case "class":
	        case "className":
		        eles[0].removeAttribute("class");
		        eles[0].removeAttribute("className");
		        break;
	        default: 
	         	eles[0].removeAttribute(name);
        }
        return $(eles);
    },
    position:function(eles){
    	return {
    		top:eles[0].offsetTop,
    		left:eles[0].offsetLeft
    	};
    },
    offset:function(eles){
    	var _offset = {
    		top:0,
    		left:0
    	};
		while(eles[0].offsetParent != null){
			_offset.top += eles[0].offsetTop;
			_offset.left += eles[0].offsetLeft;
			eles[0] = eles[0].offsetParent;
		}
    	return _offset;
    },
    width:function(eles){
    	eles[0].style.zoom = 1;
    	return eles[0].clientWidth - ($(eles).css("paddingRight") + $(eles).css("paddingLeft"));
    },
    innerWidth:function(eles){
    	eles[0].style.zoom = 1;
    	return eles[0].clientWidth;
    },
    outerWidth:function(eles){
    	eles[0].style.zoom = 1;
    	return eles[0].offsetWidth;
    },
    height:function(eles){
    	eles[0].style.zoom = 1;
    	return eles[0].clientHeight - ($(eles).css("paddingRight") + $(eles).css("paddingLeft"));
    },
    innerHeight:function(eles){
    	eles[0].style.zoom = 1;
    	return eles[0].clientHeight;
    },
    outerHeight:function(eles){
    	eles[0].style.zoom = 1;
    	return eles[0].offsetHeight;
    }
}

/*---BasicExtend---*/
$.Use = function(){
	switch($.Typeof(arguments[0])){
		case "Array"  : return new $._ForArray(arguments[0]);
		case "Number" : return new $._ForNumber(arguments[0]);
		case "String" : return new $._ForString(arguments[0]);
		case "Function" : return new $._ForFunction(arguments[0]);
	}
}
$._ForArray = function(arg){this.arg = arg;this.length = arg.length;};
$._ForNumber = function(arg){this.arg = arg};
$._ForString = function(arg){this.arg = arg};
$._ForFunction = function(arg){this.arg = arg};
$._ForElement = function(arg){this.arg = arg;this.length = arg.length;this.list = arg;};
$.BasicExtend = {
	special:function(oldO,newO){
		$.Each(newO,function(i,o){oldO[i] = function(){return o[i].apply(null,[this.arg].concat(Array.prototype.slice.call(arguments)))}},true);
	},
	action:function(){
		var Basic = $.BasicExtend;
		Basic.special($._ForArray.prototype,$.ArrayMethod);
		Basic.special($._ForNumber.prototype,$.NumberMethod);
		Basic.special($._ForString.prototype,$.StringMethod);
		Basic.special($._ForFunction.prototype,$.FunctionMethod);
		Basic.special($._ForElement.prototype,$.Method);
	}
}
$.BasicExtend.action();
/*----style,BASE----*/
$.style = $.Class.creat();
$.style.prototype = {
	init:function(node,pro,con){
		this.node = node;
		this.pro = pro;
		this.con = con;
		},
	_cacheRex:{
		float: $.Browser.IE8 ? "styleFloat" : "cssFloat",
		rex1: /\-(\w)/g,
		rex2: /px$/,
		rex3: /\d+/,
		rex4: /^rgb/,
		rex5: /\d+/g,
		rex6: /^#/,
		rex7: /\w/g
	},
	fire:function(){
		var _this = this;
		if($.Typeof(_this.pro) === "Object") return _this.setStyle(_this.pro);
		var	con = _this.con,
			iscon = !!con,
			pro = !iscon ? _this.formatString(_this.pro) : _this.pro,
			node = _this.node;
			newobj = {};
		switch(pro){
			case "top" 		: 
				if(!iscon) return $.Method.position([node]).top;
				break;
			case "left" 	: 
				if(!iscon) return $.Method.position([node]).left;
				break;
			case "float" 	: 
				newobj[_this._cacheRex.float] = "";
				return !iscon ? _this.getStyle(newobj) : _this.setStyle({float:con});
				break;
			case "opacity"	: 
				newobj[pro] = con;
				return _this.foropacity(newobj);
				break;
			case "width"	:
				if(!iscon){
					var _valwidth =  _this.getStyle({width:''});
					return (_valwidth === "auto") ? $.Method.width([node]) : _valwidth;
				}
				break;
			case "height"	:
				if(!iscon){
					var _valheight =  _this.getStyle({height:''});
					return (_valheight === "auto") ? $.Method.height([node]) : _valheight;
				}
				break;
		}
		newobj[pro] = con;
		return !iscon ? _this.getStyle(newobj) : _this.setStyle(newobj);
		},
	formatString:function(str){
		var _cacheRex = this._cacheRex;
		return str.replace(_cacheRex.rex1, function(a, b){
	    	return b.toUpperCase();
	  	})
	},
	formatNumber:function(num){
		var _cacheRex = this._cacheRex;
		if(_cacheRex.rex2.test(num)) {
			return parseInt(num);
		}else if(_cacheRex.rex4.test(num)){
			var _colornum = num.match(_cacheRex.rex5);
			var _temps = ''
			_colornum.each(function(i,o){
				_temps += (+o[i]).formatcolor();
			});
			return "#"+_temps;
		}else if(_cacheRex.rex6.test(num) && num.length === 4){
			return num.replace(_cacheRex.rex7,function(a,b){
				return a+a;
			}) 
		}else{
			return num;
		}
	},
	foropacity:function(newobj){
		var _this = this,
			_node = _this.node,
			_num = newobj.opacity;
		if(!!_num){
			_node.style.opacity = _num;
			_node.style.filter = "alpha(opacity="+(_num*100)+")";
		}else{
			var _value = _this.getStyle.call(_this,newobj);
			return !!_value ? +_value : 1;
		}
	},
	getStyle:function(newobj){
		var _this = this,node = _this.node,showstyle = null;
		window.getComputedStyle ? showstyle = window.getComputedStyle(node, null) : showstyle = node.currentStyle;
		for(var i in newobj) if(showstyle[i]) return _this.formatNumber(showstyle[i]);
		},
	setStyle:function(newobj){
		var _this = this,
			_oldval = _this.node.style.cssText,
			temps= !_oldval ? "" : (_oldval+";");
		for(var i in newobj) temps += i+":"+newobj[i]+";";
		if($.Object.hasname(newobj,"opacity")) temps += "filter:alpha(opacity="+(newobj["opacity"]*100)+")";
		_this.node.style.cssText = temps;
		return true;
		}
	}
/*----Animate----*/
$.animate = $.Class.creat();
$.animate.prototype = {
	init:function(opat){
		this.opat = {
			node:null,
			time:500,
			ease:"easeInOutExpo",
			callback:function(){}
			};
		$.Object.extend(this.opat,opat||{});
		this.action();
		},
	ease:{
		easeInBack: function(pos) {
				var s = 1.70158;
				return (pos) * pos * ((s + 1) * pos - s);
			},
		easeOutBack: function(pos) {
				var s = 1.70158;
				return (pos = pos - 1) * pos * ((s + 1) * pos + s) + 1;
			},
		easeInOutBack: function(pos) {
				var s = 1.70158;
				if ((pos /= 0.5) < 1) return 0.5 * (pos * pos * (((s *= (1.525)) + 1) * pos - s));
				return 0.5 * ((pos -= 2) * pos * (((s *= (1.525)) + 1) * pos + s) + 2);
			},
		bounce: function(pos) {
				if (pos < (1 / 2.75)) {
					return (7.5625 * pos * pos);
				} else if (pos < (2 / 2.75)) {
					return (7.5625 * (pos -= (1.5 / 2.75)) * pos + .75);
				} else if (pos < (2.5 / 2.75)) {
					return (7.5625 * (pos -= (2.25 / 2.75)) * pos + .9375);
				} else {
					return (7.5625 * (pos -= (2.625 / 2.75)) * pos + .984375);
				}
			},
		bouncePast: function(pos) {
				if (pos < (1 / 2.75)) {
					return (7.5625 * pos * pos);
				} else if (pos < (2 / 2.75)) {
					return 2 - (7.5625 * (pos -= (1.5 / 2.75)) * pos + .75);
				} else if (pos < (2.5 / 2.75)) {
					return 2 - (7.5625 * (pos -= (2.25 / 2.75)) * pos + .9375);
				} else {
					return 2 - (7.5625 * (pos -= (2.625 / 2.75)) * pos + .984375);
				}
			},
		linear: function(pos) {
				return pos
			},
		spring: function(pos) {
				return 1 - (Math.cos(pos * 4.5 * Math.PI) * Math.exp( - pos * 6));
			},
		easeInExpo: function(pos){
                    return (pos==0) ? 0 : Math.pow(2, 10 * (pos - 1));
                },
        easeOutExpo: function(pos){
                    return (pos==1) ? 1 : -Math.pow(2, -10 * pos) + 1;
                },
        easeInOutExpo: function(pos){
                    if(pos==0) return 0;
                    if(pos==1) return 1;
                    if((pos/=0.5) < 1) return 0.5 * Math.pow(2,10 * (pos-1));
                    return 0.5 * (-Math.pow(2, -10 * --pos) + 2);
                },
        wobble: function(pos) {
                    return (-Math.cos(pos*Math.PI*(9*pos))/2) + 0.5;
                }},
	requestAnimationFrame:function(){
		return window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame || window.oRequestAnimationFrame || function(callback) { setTimeout(callback, 1000 / 60); }
		},
	formatstring:function(str){
		if($.Typeof(str) === "Number") return str;
		return +str.match(this._cache._rex1)[0]
	},
	_cache:{
		_rex1 : /[+|-]?\d+(\.\d+)?/,
		_arr1 : ["left","top","width","height","padding-left","padding-right","font-size","line-height","padding-top","padding-bottom","opacity","margin-left","margin-right","margin-top","margin-bottom"]
	},
	action:function(){
		var _this 		= this,
			_opat 		= _this.opat,
			_animate	= _this.requestAnimationFrame(),
			_timeStar 	= new Date().getTime(),
			_ease 		= _this.ease[_opat.ease],
			_node 		= $(_opat.node),
			_array 		= _this._cache._arr1,
			_begin 		= {},
			_end 		= {},
			_change 	= {},
			_hasopacity = $.Object.hasname(_opat,"opacity"),
			_isrunit 	= false;
		$.Each(_opat,function(i,o){
			if($.Use(_array).inArray(i)){
				_isrunit = true;
				_begin[i] = _node.css(i);
				_end[i] = _this.formatstring(o[i]);
				_change[i] = _end[i] - _begin[i];
				_end[i] = _end[i]+"px";
			}
		},true);
		if(!_isrunit) return;
		if(_hasopacity){
			_begin["opacity"] = _begin["opacity"]*100;
			_change["opacity"] = _change["opacity"]*100;
			_end["opacity"] = _this.formatstring(_end["opacity"]);
		}
		_animate(function(){
			var _timeChange_	= new Date().getTime() - _timeStar,
				_this_			= _this,
				_opat_ 		 	= _opat,
				_node_ 			= _node,
				_changePos_ 	= _ease(_timeChange_ / _opat_.time),
				_nextPos = (function(){
					var newo = {};
					for(var i in _begin){
						newo[i] = _begin[i] + Math.ceil(_changePos_*_change[i])+"px";
					}	
					return newo;
				})();
			$.Data.set(_node_.dom(),"animate",_this_);
			if(_hasopacity) _nextPos["opacity"] = _this_.formatstring(_nextPos["opacity"])/100;
			if(_this_.animateStop){
				_opat_.callback();
				$.Data.clear(_node_.dom(),"animate");
				return;
			}
			if(_this_.animateToend){
				_node_.css(_end);
				_opat_.callback();
				$.Data.clear(_node_.dom(),"animate");
				return;
			}
			if(_timeChange_ >= _opat_.time){
				_node_.css(_end);
				_opat_.callback();
				$.Data.clear(_node_.dom(),"animate");
				return;
			}
			_node_.css(_nextPos);
			_animate(arguments.callee);
		})
	},
	animateStop:false,
	stop:function(){
		this.animateStop = true;
	},
	animateToend:false,
	toend:function(){
		this.animateToend = true;
	}
}
/*---img---*/
$.Imageload = $.Class.creat();
$.Imageload.prototype = {
	init:function(){
		this.opat = {
			url:null,
			node:null,
			callback:function(){}
			};
		$.Object.extend(this.opat,arguments[0]||{});
		var _url = this.opat.url;
		var _only = this.opat.only;
		if(!_url) return;
		if($.Typeof(_url) === "Array" && _url.length !== 0) this.fire();
		if($.Typeof(_url) === "String" && !this.opat.node) this.base(_url,this.opat.callback);
		if($.Typeof(_url) === "String" && this.opat.node){
			if(!this.opat.node.img)this.opat.node.img = new Image();
			this.only();	
		}
	},
	fire:function(){
		var _this = this,_opat = _this.opat,guid=0;
		$.Each(_opat.url,function(i,o){
			_this.base(o[i],function(url){
				guid++;
				if(guid < _opat.url.length) return;
				_opat.callback(url);
			})
		})
	},
	only:function(){
		var _this = this,_opat = _this.opat;
		var _url = _opat.url;
		var _img = _opat.node.img;
		_img.onload = null;
		_img.src = _url;
		if(_img.complete == false){
        	_img.onload = function(){
			_opat.callback(_url);
			};
        }else{
        	_opat.callback(_url);
        }

	},
	base:function(url,callback){
		var _opat = this.opat,_img = new Image();
        _img.src = url;
        if(_img.complete == false){
        	_img.onload = function(){
			callback(url);
			};
        }else{
        	callback(url);
        }
	}
}
/*----ui---*/
$.ui = {}
/*全局引用*/
!window["$"] ? window["$"]  = $ : window["$$"]  = $;

}();