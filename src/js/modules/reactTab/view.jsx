"use strict";
/**
 * 模型
 */
define(function(require, exports, module) {

	const [
		React, 
		ReactDOM, 
		ReactForm, 
		limit, 
		SchoolActions
		] = [
			require('react'), 
			require('reactDOM'), 
			require('modules/reactForm/main'), 
			require('limit'), 
			require('./controller').Actions
		];

	limit.logClosed = true;

	class School extends React.Component {
		enterPressHandle(){
			var me = this,
				props = me.props;
			if(props.editorNum === null){
				SchoolActions.add();
			}else{
				SchoolActions.save();
			};
		}
		editHandle(e){
			var me = this;
			SchoolActions.edit(e);
			me.refs.input.refs.input.focus();
		}
		render(){ 
			var me = this,
				props = me.props;
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
								props.nameList.map(function(val, key){
									return (
										<tr key={key}>
											<td>{ limit.padStart( key + 1, '0', 2 ) }</td>
											<td>{val}</td>
											<td>
												<ReactForm.Link className="fn-MaRi5" text="删除" data-param={key} onClick={ SchoolActions.det } />
												<ReactForm.Link text="编辑" data-param={key}  onClick={ limit.bind(me.editHandle, me) }/>
											</td>
										</tr>
									);
								})
							}
						</tbody>
					</table>
					<h2 className="fn-MaTo10">
						<ReactForm.Text placeholder="请输入姓名" ref="input" value={ props.personName } name="personName" 
							onChange={ SchoolActions.input }
							onEnterPress={ limit.bind(me.enterPressHandle, me) } />
						{
							props.editorNum === null ? 
							<ReactForm.Button value="新 增" className="fn-MaLe5" onClick={ SchoolActions.add } /> : 
							<ReactForm.Button value="保 存" className="fn-MaLe5" onClick={ SchoolActions.save } />
						}
					</h2>
				</div>
			);
		}
	};

	return School;

});