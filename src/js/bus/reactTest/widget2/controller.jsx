"use strict";
/**
 * 模型
 */
define(function(require, exports, module) {
	
	// 依赖
	const $ = require('$');
	const Control = require('common/myReflux/control');

	class Controller extends Control {
		store = {
			title: '默认',
			name: 'aaa'
		}
		onChange(){
			var me = this;
			me.store.name += 'bbb';
			me.updateComponent();
		}
		
	};

	return new Controller();

});