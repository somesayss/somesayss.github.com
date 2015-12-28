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
		var School = React.createClass({
			mixins: [ Reflux.connect(SchoolStore) ],
			render: function(){
				var me = this,
					props = me.props,
					state = me.state;
				// console.log(state);
				return (
					<div>
						<table className="fn-table fn-table-data fn-LiHeEm20" width="200">
							<thead>
								<tr>
									<th>序号</th>
									<th>姓名</th>
									<th>操作</th>
								</tr>
							</thead>
							<tbody>
								{
									state.nameList.map(function(val, key){
										return (
											<tr key={val}>
												<td>{ limit.padStart( key + 1, '0', 2 ) }</td>
												<td>{val}</td>
												<td>
													<ReactForm.Link className="fn-MaRi5" title="删除"/>
													<ReactForm.Link title="编辑"/>
												</td>
											</tr>
										);
									})
								}
							</tbody>
						</table>
						<h2 className="fn-MaTo10">
							<ReactForm.Text placeholder="请输入姓名" value={ state.personName } name="personName" onChange={ SchoolActions.input } />
							<ReactForm.Button title="新 增" className="fn-MaLe5" onClick={ SchoolActions.add } />
						</h2>
					</div>
				);
			}
		});

	// 置入文档
		ReactDOM.render(
			<School />,
		    document.getElementById('content')
	  	);


});