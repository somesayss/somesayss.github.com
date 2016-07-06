"use strict";
/**
 * 模型
 */
define(function(require, exports, module) {
	
	// 依赖
	const $ = require('$');
	const Control = require('common/myReflux/control');

	class Controller extends Control {
		constructor(...args){
			super(...args);
			this.store = {
				name: 'shao',
				list: ['a1', 'a2', 'a3'],
				show: true
			};
		}
		onShow(){
			let me = this;
			me.store.show = true;
			me.updateComponent();
		}
		onHide(){
			let me = this;
			me.store.show = false;
			me.updateComponent();
		}
		onChange(){
			let me = this,
				store = me.store;
			store.name += ' hong';
			store.title = 'aaa';
			me.updateComponent();
		}
		onListChange(key){
			let me = this,
				store = me.store;
			store.list[key] += ' xixi';
			me.updateComponent();
		}
		
	};

	return new Controller();

});