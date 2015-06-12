"use strict";
/**
 * 新风格的计划入口
 * 邵红亮
 */
define(function(require, exports, module) {

	/*--依赖--*/
	var $ = require('$'), //JQ
		util = require('common/util'),//工具类
		handlerbars = require('common/handlerbars');//模板

	/*--变量--*/
	var domUtil = {},
		maybeCallback = util.maybeCallback;

	/*--函数--*/
	
	//接口:util
	domUtil.util = util;

	//接口:jQuery
	domUtil.jQuery = $;

	//接口:handlerbars
	domUtil.handlerbars = handlerbars;

	//接口:closest
	domUtil.closest = function(node, query){
		return $(node).closest(query);
	}

	//接口:显示
	domUtil.show = function(query){
		$(query).removeClass('fn-hide');
	}

	//接口:隐藏
	domUtil.hide = function(query){
		$(query).addClass('fn-hide');
	}
	
	//接口:不可用
	domUtil.disabledTrue = function(query){
		$(query).find('input,select,textarea,button').prop('disabled', true);
	}
	//可用
	domUtil.disabledFalse = function(query){
		$(query).find('input,select,textarea,button').prop('disabled', false);
	}
	//解析数组
	var setArray = domUtil.setArray = function(obj){
		return arrPro.slice.call(obj, 0);
	}
	//可以break的each
	var breakEach = domUtil.breakEach = function(LIST, FACTOR, CONTEXT) {
		var index = 0,
			length;
		if(LIST){
			for (length = LIST.length; index < length; index++) {
				if (FACTOR.call(CONTEXT, LIST[index], index, LIST)) {
					break;
				}
			}
		}
	}
	//获取值
	domUtil.getInputValue = function(table, name){
		return table.find('[name="'+name+'"]').val();
	}
	//跳转
	domUtil.redirect = function(url){
		location.href = url;
	}
	//解析参数
	domUtil.paseParam = function(name, obj, factory){
		var rev = {};
		factory = factory || K;
		rev[name] = JSON.stringify(factory(obj));
		return rev;
	}
	//构建参数,{"inspectionRecordDoVo.inspectors":"value"}格式的转换为{"inspectionRecordDoVo":{"inspectors":"value"}}
	domUtil.paseParamToObj =function(data){
		var result = {};
		for (var name in data) {
			var value = data[name],
				tempObj = {};
			if (name.match(/\./)) {
				var tempArr = name.split('.'),
					nameSpace = tempArr[0];
				if (tempArr.length == 3) {
					tempObj[tempArr[1]] = tempObj[tempArr[1]] || {};
					tempObj[tempArr[1]][tempArr[2]] = value;
				} else {
					tempObj[tempArr[1]] = value;
				}
				if (!result[nameSpace]) {
					result[nameSpace] = tempObj;
				} else {
					result[nameSpace] = $.extend({}, result[nameSpace], tempObj);
				}
			} else {
				result[name] = value;
			}
		}
		return result;
	};
    domUtil.paseObjToJSON =function(data) {
        var result ={};
        for (var name in data) {
            result[name] = typeof data[name] =="object"? JSON.stringify(data[name]):data[name];
        }
        return result;
    };
	/**
	 * 可能的写法
	 * 1.ajax('a.json', {}, 'get', function(){});
	 * 2.ajax('a.json', {}, function(){});
	 * 3.ajax('a.json', function(){});
	 */
	domUtil.ajax = function(URL, DATA, TYPE, CALLBACK) {
		//3.ajax('a.json', function(){});
		if (typeof DATA === 'function') {
			CALLBACK = maybeCallback(DATA);
			DATA = {};
			TYPE = 'get';
		}
		//2.ajax('a.json', {}, function(){});
		else if (typeof TYPE === 'function') {
			CALLBACK = maybeCallback(TYPE);
			TYPE = 'get';
		}
		//1.ajax('a.json', {}, 'get', function(){});
		else {
			CALLBACK = maybeCallback(CALLBACK);
		}
		return $.ajax({
			url: URL,
			dataType: 'json',
			type: TYPE,
			data: DATA,
			timeout: 100000,
			cache: false,
			success: function(json) {
				if (!json.hasError) {
					CALLBACK(null, json.content);
				} else {
					CALLBACK('系统异常！', json.errors);
				}
			},
			error: function(e) {
				//CALLBACK('系统异常！', e);
			}
		});
	}
	domUtil.http = function(URL, DATA, TYPE, CALLBACK){
		//3.ajax('a.json', function(){});
		if (typeof DATA === 'function') {
			CALLBACK = maybeCallback(DATA);
			DATA = {};
			TYPE = 'post';
		}
		//2.ajax('a.json', {}, function(){});
		else if (typeof TYPE === 'function') {
			CALLBACK = maybeCallback(TYPE);
			TYPE = 'post';
		}
		//1.ajax('a.json', {}, 'get', function(){});
		else {
			CALLBACK = maybeCallback(CALLBACK);
		}
		return $.ajax({
			url: URL,
			dataType: 'json',
			type: TYPE,
			data: DATA,
			timeout: 100000,
			cache: false,
			success: function(json) {
				var content;
				if (json.hasError) {
					CALLBACK('系统异常！', json.errors);
				} else {
					content = json.content;
					if(!content.isSuccess){
						CALLBACK(content.message, content);
					}else{
						CALLBACK(null, content.retValue, content.message, content);
					}
				}
			},
			error: function(e) {
				//CALLBACK('系统异常！', e);
			}
		});
	}
	//反序列化
	domUtil.unSerialize = function(FORM, JSON, FACTOR){
		var name, i = 0, val;
		FACTOR = FACTOR || util.K;
		JSON = FACTOR(JSON);
		if (FORM.nodeName !== 'FORM') {
			FORM = $(FORM).find('input,select,textarea,button');
		}
		for (; obj = FORM[i++];) {
			if ((name = obj.name) && (val = JSON[name])) {
				obj.value = val;
			}
		}
	}
	//序列化
	domUtil.serialize = function(FORM, FACTOR) {
		var i = 0,
			obj,
			name,
			parseArr = [],
			arr = [],
			json = {};
		FACTOR = FACTOR || util.K;
		if (FORM.nodeName !== 'FORM') {
			FORM = $(FORM).find('input,select,textarea,button');
		}
		for (; obj = FORM[i++];) {
			if ((name = obj.name) && (obj.disabled === false)) {
				switch(obj.type){
					case 'radio':
						if(!obj.checked){
							continue;
						}
					break;
					//对于checkbox的特殊处理
					case 'checkbox':
						if(obj.checked){
							if(!json[name]){
								json[name] = [];
								parseArr.push(name);
							}
							json[name].push($.trim(obj.value));
						}
						continue;
					break;
				}
				json[name] = $.trim(obj.value);
			}
		}
		breakEach(parseArr, function(item){
			json[item] = json[item].join(',');
		});
		return FACTOR(json);
	}
	//输入事件
	domUtil.oninput = function(node, callback){
		node = $(node);
		var oldVal = node.val(),
			guid;
		if('oninput' in node[0]){
			node.on('input', function(){
				var newVal = node.val();
				callback.call(node, oldVal, newVal) && (oldVal = newVal);
			});
		}else{
			guid = 0;
			node.on('propertychange', function(e){
				if(!guid++){
					var newVal = node.val();
					callback.call(node, oldVal, newVal) && (oldVal = newVal);
					setTimeout(function(){guid = 0},0);
				}
			})
		}
	}

	return domUtil;

})