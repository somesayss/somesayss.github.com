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
			nameList: ['张三', '李四'],
			personName: '',
			editorNum: null
		},
		getInitialState: function getInitialState() {
			return this.store;
		},
		onAdd: function onAdd() {
			var me = this,
			    store = me.store;
			store.nameList.push(store.personName);
			store.personName = '';
			me.updateComponent();
		},
		onGet: function onGet() {},
		onDet: function onDet(e) {
			var me = this,
			    store = me.store,
			    index = $(e.target).data('param');
			store.nameList.splice(index, 1);
			me.updateComponent();
		},
		onEdit: function onEdit(e) {
			var me = this,
			    store = me.store,
			    index = $(e.target).data('param');
			store.editorNum = index;
			store.personName = store.nameList[index];
			me.updateComponent();
		},
		onSave: function onSave() {
			var me = this,
			    store = me.store;
			if (store.nameList[store.editorNum] !== void 0) {
				store.nameList[store.editorNum] = store.personName;
			} else {
				store.nameList.push(store.personName);
			};
			store.personName = '';
			store.editorNum = null;
			me.updateComponent();
		},
		onInput: function onInput(key) {
			var me = this,
			    store = me.store;
			store.personName = key.personName;
			me.updateComponent();
		}
	});
});