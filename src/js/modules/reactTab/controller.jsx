"use strict";
/**
 * 模型
 */
define(function(require, exports, module) {
	
	// 依赖
	const [$, Reflux] = [require('$'), require('reflux')]; 

	// 行为
	let Actions = Reflux.createActions(['add', 'get', 'det', 'edit', 'save', 'input']);

	// 存储
	let Store = Reflux.createStore({
		listenables: [Actions],
		store: {
			nameList: ['张三', '李四'],
			personName: '',
			editorNum: null
		},
		getInitialState(){
			return this.store;
		},
		onAdd(){
			var me = this,
				store = me.store;
			store.nameList.push(store.personName);
			store.personName = '';
			me.trigger(store);
		},
		onGet(){

		},
		onDet(e){
			var me = this,
				store = me.store,
				index = $(e.target).data('param');
			store.nameList.splice(index, 1);
			me.trigger(store);
		},
		onEdit(e){
			var me = this,
				store = me.store,
				index = $(e.target).data('param');
			store.editorNum = index;
			store.personName = store.nameList[index];
			me.trigger(store);
		},
		onSave(){
			var me = this,
				store = me.store;
			store.nameList[store.editorNum] = store.personName;
			store.personName = '';
			store.editorNum = null;
			me.trigger(store);
		},
		onInput(key){
			var me = this,
				store = me.store;
			store.personName = key.personName;
			me.trigger(store);
		}
	});

	return {Actions, Store};

});