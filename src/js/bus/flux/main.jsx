"use strict";
/**
 * 模型
 */
define(function(require, exports, module) {

	// 依赖
	const $ = require('$'),
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

		let connect = Reflux.connect(SchoolStore);
		console.log(connect, connect.getInitialState());
		
	// View
		// mixins
		const PopupContainer = (Wrapper, Controller) => {
			class WrapperComponent extends React.Component {
				constructor(props){
					super(...arguments);
				}
				componentDidMount() {
			      console.log('HOC did mount')
			    }
			    componentWillUnmount() {
			      console.log('HOC will unmount')
			    }
			    render() {
			      return <Wrapper {...this.props} />;
			    }
			};
			return WrapperComponent;
		};

		// 定义React类 
		class School extends React.Component {
			constructor(props){
				super(...arguments);
				// 相当于[getInitialState]
				this.state = {
					personName: 'aaa'
				};
			}
			componentWillMount(){
				console.log('componentWillMount');
			}
			componentDidMount(){
				console.log('componentDidMount');
			}
			render(){
				console.log('render');
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
								
							</tbody>
						</table>
						<h2 className="fn-MaTo10">
							<ReactForm.Text placeholder="请输入姓名" value={ props.title } name="personName" />
						</h2>
					</div>
				);
			}
		};
		// 相当于[getDefaultProps]
		School.defaultProps = {a: 'a1'};

		let MySchool = PopupContainer(School);


	// 置入文档
		ReactDOM.render(
			<MySchool title="aa" />,
		    document.getElementById('content')
	  	);

	




});