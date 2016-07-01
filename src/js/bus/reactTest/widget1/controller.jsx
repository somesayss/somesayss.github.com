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
			name: 'shao',
			list: ['a1', 'a2', 'a3']
		},
		getInitialState(){
			return this.store;
		},
		onChange(){
			let me = this,
				store = me.store;
			store.name += ' hong';
			store.title = 'aaa';
			me.updateComponent();
		},
		onListChange(key){
			let me = this,
				store = me.store;
			store.list[key] += ' xixi';
			me.updateComponent();
		}
	});

});