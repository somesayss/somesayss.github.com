"use strict";
/**
 * 模型
 */
define(function(require, exports, module) {

	var Reflux = require('reflux'),
		React = require('react'),
		ReactDOM = require('reactDOM');

	// Action
		// 单个
		var addItem = Reflux.createAction();
		// 多个
		var Actions = Reflux.createActions(['detItem']);
		// 异步
		// var PromisAction =

	// Store
		var dataStore = Reflux.createStore({
			init: function(){
				this.listenTo(addItem, 'add');
				this.listenTo(Actions.detItem, 'det');
			},
			add: function(model){
				console.log(model, '新增');
			},
			det: function(key){
				console.log(key, '删除');
			}
		});

		addItem({name: 'xxx'});	// 异步触发 addItem() 会默认调用 triggerAsync
		Actions.detItem.trigger('xxx');		// 同步触发 这个会triggerAsync先调用

	// View




});