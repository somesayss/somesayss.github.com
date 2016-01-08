"use strict";
/**
 * 模型
 */
define(function(require, exports, module) {

	// 依赖
	var $ = require('$'),
		Reflux = require('reflux'),
		React = require('react'),
		ReactDOM = require('reactDOM'),
		limit = require('limit'),
		ReactForm = require('modules/reactForm/main');

	// 关闭limitJS log
	limit.logClosed = true;

	// 测试Refulx方法
	// require('./exReflux');

	// Action
		var SchoolActions = Reflux.createActions(['add', 'get', 'det', 'edit', 'save', 'input']);

	// Store
		var SchoolStore = Reflux.createStore({
			listenables: [SchoolActions],
			store: {
				nameList: ['张三', '李四'],
				personName: '',
				editorNum: null
			},
			getInitialState: function(){
				return this.store;
			},
			onAdd: function(){
				var me = this,
					store = me.store;
				store.nameList.push(store.personName);
				store.personName = '';
				me.trigger(store);
			},
			onGet: function(){

			},
			onDet: function(e){
				var me = this,
					store = me.store,
					index = $(e.target).data('param');
				store.nameList.splice(index, 1);
				me.trigger(store);
			},
			onEdit: function(e){
				var me = this,
					store = me.store,
					index = $(e.target).data('param');
				store.editorNum = index;
				store.personName = store.nameList[index];
				me.trigger(store);
			},
			onSave: function(){
				var me = this,
					store = me.store;
				store.nameList[store.editorNum] = store.personName;
				store.personName = '';
				store.editorNum = null;
				me.trigger(store);
			},
			onInput: function(key){
				var me = this,
					store = me.store;
				store.personName = key.personName;
				me.trigger(store);
			}
		});
		
	// View
		var School = React.createClass({
			mixins: [ Reflux.connect(SchoolStore) ],
			enterPressHandle: function(){
				var me = this,
					state = me.state;
				if(state.editorNum === null){
					SchoolActions.add();
				}else{
					SchoolActions.save();
				};
			},
			render: function(){
				var me = this,
					props = me.props,
					state = me.state;
				return (
					<div className="fn-FoSiEm12">
						<table className="fn-table fn-table-data fn-LiHeEm20" width="200">
							<thead>
								<tr>
									<th width="30">序号</th>
									<th>姓名</th>
									<th width="60">操作</th>
								</tr>
							</thead>
							<tbody>
								{
									state.nameList.map(function(val, key){
										return (
											<tr key={key}>
												<td>{ limit.padStart( key + 1, '0', 2 ) }</td>
												<td>{val}</td>
												<td>
													<ReactForm.Link className="fn-MaRi5" text="删除" data-param={key} onClick={ SchoolActions.det } />
													<ReactForm.Link text="编辑" data-param={key}  onClick={ SchoolActions.edit }/>
												</td>
											</tr>
										);
									})
								}
							</tbody>
						</table>
						<h2 className="fn-MaTo10">
							<ReactForm.Text placeholder="请输入姓名" value={ state.personName } name="personName" 
								onChange={ SchoolActions.input }
								onEnterPress={ me.enterPressHandle } />
							{
								state.editorNum === null ? 
								<ReactForm.Button value="新 增" className="fn-MaLe5" onClick={ SchoolActions.add } /> : 
								<ReactForm.Button value="保 存" className="fn-MaLe5" onClick={ SchoolActions.save } />
								
							}
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