"use strict";
/**
 * 模型
 */
define(function(require, exports, module) {
	
	// 依赖
	const $ = require('$');
	const Control = require('common/control');

	return Control({
		store: {
			title: '默认'
		},
		getInitialState(){
			return this.store;
		}
	});

});