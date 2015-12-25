"use strict";
/**
 * 组件类
 */
define(function(require, exports, module) {

	// 接口
	module.exports = {
		Text: require('./text'),
		Select: require('./select'),
		RadioList: require('./radio-list'),
		CheckboxList: require('./checkbox-list'),
		Textarea: require('./textarea'),
		Input: require('./input'),
		Button: require('./button'),
		Link: require('./link')
	};

});