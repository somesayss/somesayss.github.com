"use strict";
/**
 * 业务
 */
define(function(require, exports, module) {

	// 依赖
	var $ = require('$'),
		Event = require('events'),
		limit = require('limit');

	// 全局性事件
	var myEvent = new Event();

	// 构建参数类
	var Param = React.createClass({
		change: function(){
			myEvent.trigger('changeHandler');
		},
		render: function() {
			return (
				<div className="param">
					<div>
						<input name="name" type="text" className="fn-input fn-Wi180" defaultValue={this.props.name} onChange={this.change} />
					</div>
					<div className="fn-MaTo10">
					<select name="sex" className="fn-select fn-Wi200" onChange={this.change}>
						{limit.map(this.props.results, function(val) {
				          	return <option key={val.key} value={val.value}>{val.key}</option>;
				        })}
					</select>
					</div>
				</div>
			);
		}
	});

	// 构建列表类
	var List = React.createClass({
		// 初始化的时候执行的方法
		componentDidMount: function(){
			var me = this;
			myEvent.on('changeHandler', function(){
				me.setState( {
					a: me.props.list.push({
						"name": "小黄",
						"sex": "男",
						"age": 19
					})
				} );
			});
		},
		render: function(){
			return (
				<div className="fn-Wi500 fn-MaTo10">
					<table className="fn-table fn-table-ho" width="100%">
						<thead>
							<tr>
								<th>姓名</th>
								<th>性别</th>
								<th>年龄</th>
							</tr>
						</thead>
						<tbody>
							{limit.map(this.props.list, function(val) {
					          	return (
					          		<tr key={val.name}>
										<td>{val.name}</td>
										<td>{val.sex}</td>
										<td>{val.age}</td>
									</tr>
					          	);
					        })}
						</tbody>
					</table>
				</div>
			);
		}
	});

	// 主体
	var SearchList = React.createClass({
		render: function(){
			return (
				// 这是必要的包含，我晕
				<div>
					<Param {...this.props} />
	    			<List {...this.props}/>
	    		</div>
			);
		}
	});

	// 初始化
	var config = {
		name: "小明",
		results: [{key: "男", value: "male"}, {key: "女", value: "female"}],
		list: [{
			"name": "小明",
			"sex": "男",
			"age": 19
		}, {
			"name": "小红",
			"sex": "女",
			"age": 18
		}]
	};

	// 置入文档
	ReactDOM.render(
	    <SearchList {...config} />,
	    document.getElementById('search')
  	);


});