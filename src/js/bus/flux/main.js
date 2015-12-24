"use strict";
/**
 * 模型
 */
define(function(require, exports, module) {

	var Reflux = require('reflux'),
		React = require('react'),
		ReactDOM = require('reactDOM');

	
	// Action
		// 全局Action方法
		Reflux.ActionMethods.logSom = function() { console.log('logSom'); };
		// 单个
		var addItem = Reflux.createAction();
		// 多个
		var Actions = Reflux.createActions(['detItem', 'editItem']);
		// 异步 Promise
		var getItem = Reflux.createAction({
			asyncResult: true,
			preEmit: function(key){
				console.log('查之前', key);
				return 'aaa';
			},
			shouldEmit: function(key){
				console.log(key);
				return true; //如果没有返回默认是flase不触发
			}
		});
		

	// Store
		// 全局Store方法
		Reflux.StoreMethods.checkSam = function(){
			console.log('checkSam');
		};
		// 混入方法
		var needMix = {
			checkSom: function(){
				console.log('checkSom');
			}
		};
		var dataStore = Reflux.createStore({
			//混入
			mixins: [needMix],
			listenables: [Actions],	// 多次监听 这样写
			init: function(){
				this.listenTo(addItem, 'add');
				// this.listenToMany(Actions); // 多次监听 也可以这样写
				this.listenTo(getItem, 'get');
				this.checkSom();
				this.checkSam();
			},
			add: function(key){
				console.log('增');
			},
			onDetItem: function(key){ //多次监听的默认写法
				console.log('删');
			},
			onEditItem: function(key){
				console.log('改');
			},
			get: function(key){
				setTimeout(function(){
					getItem.completed([{name: 'bbb'}])
				}, 1000);
			}
		});

		addItem({name: 'xxx'});	// 异步触发 addItem() 会默认调用 triggerAsync
		Actions.detItem.trigger('xxx');	// 同步触发 或者增加配置{sync: true} 这个会triggerAsync先调用
		getItem('xxx').then(function(data){  console.log('查') }); // 异步 Promise
		Actions.editItem('xxx');
		Actions.editItem.logSom();



	// View




});