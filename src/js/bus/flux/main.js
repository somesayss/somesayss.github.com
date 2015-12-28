"use strict";
/**
 * 模型
 */
define(function(require, exports, module) {

	// 依赖
	var Reflux = require('reflux'),
		React = require('react'),
		ReactDOM = require('reactDOM'),
		limit = require('limit'),
		ReactForm = require('modules/reactForm/main');

	// 关闭limitJS log
	limit.logClosed = true;

	// 测试Refulx方法
	// require('./exReflux');

	// Action
		var SchoolActions = Reflux.createActions(['add', 'get', 'det', 'edit', 'input']);

	// Store
		var SchoolStore = Reflux.createStore({
			listenables: [SchoolActions],
			store: {
				nameList: ['张三', '李四'],
				personName: ''
			},
			getInitialState: function(){
				return this.store;
			},
			onAdd: function(){
				var me = this,
					store = me.store;
				store.nameList.push(store.personName);
				store.personName = '';
				this.trigger({nameList: store.nameList, personName: ''});
			},
			onGet: function(){

			},
			onDet: function(){

			},
			onEdit: function(){

			},
			onInput: function(key){
				var me = this,
					store = me.store;
				store.personName = key.personName;
			}
		});

	// View
		var School = React.createClass({displayName: "School",
			mixins: [ Reflux.connect(SchoolStore) ],
			render: function(){
				var me = this,
					props = me.props,
					state = me.state;
				// console.log(state);
				return (
					React.createElement("div", null, 
						React.createElement("table", {className: "fn-table fn-table-data fn-LiHeEm20", width: "200"}, 
							React.createElement("thead", null, 
								React.createElement("tr", null, 
									React.createElement("th", null, "序号"), 
									React.createElement("th", null, "姓名"), 
									React.createElement("th", null, "操作")
								)
							), 
							React.createElement("tbody", null, 
								
									state.nameList.map(function(val, key){
										return (
											React.createElement("tr", {key: val}, 
												React.createElement("td", null,  limit.padStart( key + 1, '0', 2) ), 
												React.createElement("td", null, val), 
												React.createElement("td", null, 
													React.createElement(ReactForm.Link, {className: "fn-MaRi5", title: "删除"}), 
													React.createElement(ReactForm.Link, {title: "编辑"})
												)
											)
										);
									})
								
							)
						), 
						React.createElement("h2", {className: "fn-MaTo10"}, 
							React.createElement(ReactForm.Text, {placeholder: "请输入姓名", value:  state.personName, name: "personName", onChange:  SchoolActions.input}), 
							React.createElement(ReactForm.Button, {title: "新 增", className: "fn-MaLe5", onClick:  SchoolActions.add})
						)
					)
				);
			}
		});

	// 置入文档
		ReactDOM.render(
			React.createElement(School, null),
		    document.getElementById('content')
	  	);


});