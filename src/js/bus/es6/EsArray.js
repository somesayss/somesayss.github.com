"use strict";
/**
 * 业务
 */
define(function(require, exports, module) {

	// 依赖
	var React = require('react'),
		Code = require('./code'),
		limit = require('limit'),
		Template = require('./template');

	// 类
	var EsArray = React.createClass({displayName: "EsArray",
		render: function(){
			var me = this,
				props = me.props;
			return (
				React.createElement("div", null, 
					React.createElement(Template, {title: props.title, attr: "Array.from()"}, 
						"把拥有length的对象转化成数组，对于空位进行统一处理", 
						React.createElement(Code, null, 
							'Array.from(function(a, b){})', " //[undefined, undefined] ", React.createElement("br", null), 
							'Array.from({length: 3})', " //[undefined, undefined, undefined]"
						), 
						"兼容性方法可以是", 
						React.createElement(Code, null, 
							 '' + from
						)
					), 
					React.createElement(Template, {title: props.title, attr: "Array.of()"}, 
						"数组初始化，相当于", 
						React.createElement(Code, null, 
							 '' + of
						)
					)
				)
			);
		}
	});


function from(obj, iterator, context){
	var arr = [];
	if( obj && obj.length ){
		// 不考虑IE8的话可以这样写 push.apply(arr, obj);
		Array.prototype.push.apply(arr, Array.prototype.slice.call(obj));
		return Array.prototype.map.call(arr, iterator, context);
	}else{
		return arr;
	};
};

function of(){
	return Array.prototype.slice.call(arguments);
};

	
	limit.log('log', '哈哈哈哈，我是日志1');
	limit.log('error', '哈哈哈哈，我是日志2');
	limit.log('warn', '哈哈哈哈，我是日志3');

	return EsArray;

});