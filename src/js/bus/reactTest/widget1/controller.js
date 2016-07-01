"use strict";
/**
 * 模型
 */

define(function (require, exports, module) {

	// 依赖
	var $ = require('$');
	var Control = require('common/control');

	return Control({
		store: {
			name: 'shao',
			list: ['a1', 'a2', 'a3']
		},
		getInitialState: function getInitialState() {
			return this.store;
		},
		onChange: function onChange() {
			var me = this,
			    store = me.store;
			store.name += ' hong';
			store.title = 'aaa';
			me.updateComponent();
		},
		onListChange: function onListChange(key) {
			var me = this,
			    store = me.store;
			store.list[key] += ' xixi';
			me.updateComponent();
		}
	});
});