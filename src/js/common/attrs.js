"use strict";
/**
 * 2015.02.28
 * 属性类
 * version: 1.0.0
 * 提供最基础的 set get
 *
 * 属性初始化
 * initAttrs({
 * 		'name1': 'value1',
 * 		'name2': {value: 'name2'},
 * 		'name3': {set: function(){}, get: function(){}}
 * });
 * 属性设置
 * set('name1', 'value1');
 * set('name2', {value: 'value2'});
 * set('name1', {set: function(){}, get: function(){}});
 *
 * BUG:无法修复
 * var person = new Base({
		title: {
			get: function(){
				return '???';
			}
		},
		kiss: {
			get: function(){
				return this.title; //这个是可以用的
				return this.title + '!!!'; //这个是用不了的	==> return person.get('title') + '!!!'; 不支持新API的浏览器只能这样写
			}
		}
	});
	console.log(person.get('kiss'));
 * 
 * 
 */
define(function(require, exports) {

	//依赖
	var Class = require('class');

	//变量
	var objectDefineProperty = Object.defineProperty,
		REX = /\w+/g;

	//事件类
	var Attrs = Class.create({
		//初始化
		initAttrs: function(config){
			var me = this;
			me.__attrs__ = me.__attrs__ || {};
			me.__attrsName__ = me.__attrsName__ || [];
			eachObj(config, function(val, key){
				me.set(key, val);
			});
		},
		/**
		 * [set description]
		 * 没有这个属性:
		 * 		有配置 	:设置配置
		 * 		没配置	:设置默认
		 * 	已经存在属性
		 * 		有配置	:覆盖配置
		 * 		没配置	:设置值
		 */
		set: function(name, value, option){
			var me = this,
				attrs = me.getAttrs('attrs'),
				attrsName = me.getAttrs('attrsName'),
				attrVal = attrs[name],
				newOption;
			//堆入数组 唯一
			!attrVal && attrsName.push(name);
			/**
			 * set('name', {value:'a1'}), set('name', {set:function(){},get:function(){}});
			 */
			if(isObject(value)){
				option = value;
				value = option.value;
			}
			newOption = mixOptin(value, option);
			//ECMA 5.0
			if(!objectDefineProperty){
				if(attrVal && !option){
					attrs[name] = value;
				}else{
					objectDefineProperty(attrs, name, newOption);

				}
			}else{
				fixSet(
					attrVal && !option ? attrVal : (attrs[name] = newOption), 
					newOption.value, 
					name,
					attrVal,
					attrs
				);
			}
			return me;
		},
		//获取
		get: function(name){
			var me = this,
				attrs = me.getAttrs('attrs');
			//ECMA 5.0
			if(!objectDefineProperty){
				return attrs[name];
			}else{
				return fixGet(attrs[name], attrs);
			}
		},
		//获取attr
		getAttrs: function(key){
			var me = this,
				some = me['__'+key+'__'];
			if(!some){
				me.initAttrs();
				return me['__'+key+'__'];
			}else{
				return some;
			}
		},
		//遍历
		eachAttrs: function(callback){
			var me = this,
				attrs = me.getAttrs('attrs'),
				attrsName = me.getAttrs('attrsName');
			eachArr(attrsName, function(val, key){
				callback(me.get(val), val);
			});
			return me;
		},
		//删除
		removeAttrs: function(keys){
			var me = this,
				attrs = me.getAttrs('attrs'),
				attrsName = me.getAttrs('attrsName');
			keys.replace(REX, function(a){
				var index;
				if( (index  = indexOfArr(attrsName, a)) !== -1){
					attrsName.splice(index, 1);
					delete attrs[a];
				}
			})
			return me;
		},
		//清除
		clearAttrs: function(){
			var me = this;
			me.__attrs__ = {};
			me.__attrsName__ = [];
			return me;
		}
	});

	//函数
	//默认空函数
	function K(k){
		return k;
	}
	//判断是否是对象
	function isObject(obj){
		return !!obj && Object.prototype.toString.call(obj) === '[object Object]';
	}
	//查询
	function indexOfArr(arr, ele, formIndex){
		if(arr.indexOf){
			return arr.indexOf(ele, formIndex);
		}else{
			var length = arr.length;
			formIndex = ~~formIndex;
			for(; formIndex < length; formIndex++){
				if(arr[formIndex] === ele){
					return formIndex;
				}
			}
			return -1;
		}
	}
	//遍历数组
	function eachArr(arr, callback, context){
		if(!arr.forEach){
			return arr.forEach(callback, context);
		}else{
			var index = 0,
				length = arr.length;
			for(; index < length; index++){
				callback.call(context, arr[index], index, arr);
			}
		}
	}
	//遍历对象
	function eachObj(obj, callback){
		for(var key in obj){
			if(obj.hasOwnProperty(key)){
				callback(obj[key], key);
			}
		}
	}
	//复制
	function cloneConfig(config){
		var O = {};
		eachObj(config, function(val, key){
			O[key] = val;
		});
		return O;
	}
	//判断是否存在 set get
	function noSetGet(option){
		return !option || !option.set && !option.get;
	}
	//格式化writable(只读)
	function formatWritable(writable){
		return writable === void 0 ? true : !! writable;
	}
	//混合value, option
	function mixOptin(value, option){
		option = option || {};
		//如果value存在设置默认可读为true
		if(noSetGet(option)){
			return {
				value: option.value || value,
				writable: formatWritable(option.writable),
				enumerable: true,
				configurable: true,
				__isAttr__: true
			}
		}else{
			return {
				get: option.get || K,
				set: option.set || K,
				enumerable: true,
				configurable: true,
				__isAttr__: true
			}
		}
	}
	//修正的set
	function fixSet(option, value, name, attrVal, attrs){
		if(noSetGet(option)){
			if(formatWritable(attrVal && attrVal.writable)){
				option.value = value;
			}else{
				throw 'TypeError: Cannot redefine property: ' + name;
			}
		}else{
			attrVal && option.set.call(attrs, value);
		}
	}
	//修正的get, 使用递归，来获取可能的值
	function fixGet(option, attrs){
		var val;
		if(noSetGet(option)){
			return option && option.value || option;
		}else{
			val = option.get.call(attrs);
			if(val && val.__isAttr__){
				return fixGet(val, attrs);
			}else{
				return val;
			}
		}
	}

	//返回
	return Attrs;

});