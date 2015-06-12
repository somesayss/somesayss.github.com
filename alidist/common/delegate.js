"use strict";
/**
 * 审批中心详细页面
 * 邵红亮
 */
define(function(require, exports, module) {

	/*--依赖--*/
	var $ = require('$'),
		util = require('common/util');

	/*--依赖的样式--*/

	/*--变量--*/
	var delegate = {},
		SOBY = $('body'),
		on = SOBY.on,
		off = SOBY.off;

	/*--函数--*/
	//混合命名空间
	function mixNameSpace(type){
		var nameSpace = type.split('.')[1];
		return nameSpace ? type : type + '.utilEvents';
	}

	/*--接口--*/
	//绑定
	delegate.on = function(type, trigger, callback){
		SOBY.on(type, trigger, function(e){
			var self = $(this);
			if(!self.hasClass('JS-button-disabled')){
				callback && callback.call(this, e);
			}
		});
		return delegate;
	}
	//反绑定
	delegate.off = function(){
		var args = util.setArray(arguments);
		args[0] = mixNameSpace(args[0]);
		off.apply(SOBY, args);
		return delegate;
	}

	/*--返回--*/
	return delegate;

});