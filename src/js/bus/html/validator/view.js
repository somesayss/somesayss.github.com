"use strict";

import './style.less';

import Input from 'modules/input/index';
import Validator from 'modules/validator/index';

// 组件类
class View extends React.Component {
	render(){
		let me = this;
		let {props} = me;
		let {originData} = props;
		return (
			<div className="form">
				<Validator executeSuccess={Actions(me).success}>
					{/* 文本框 */}
					<Input type="text" 
						onChange={Actions(me).change.bind(null, 'name')}
						value={originData.name}
						placeholder="请填写姓名"
						rule="required"
						errMessage="姓名必填"
						name="name" /><br /><br />
					{/* 数字 */}
					<Input type="number" 
						onChange={Actions(me).change.bind(null, 'number')}
						value={originData.number}
						placeholder="请填写数字"
						rule="required"
						errMessage="数字必填"
						name="number" /><br /><br />
					{/* 密码 */}
					<Input type="password" 
						onChange={Actions(me).change.bind(null, 'pwd')}
						value={originData.pwd}
						placeholder="请填写密码"
						rule="required,min(3),max(8)"
						errMessage="密码必填,最小三位,最大8位"
						name="pwd" /><br /><br />
					<Input type="password" 
						placeholder="请填写相同的密码"
						rule={function(val){ if(val === ''){return '请填写密码'};if( val !== originData.pwd ){return '请填写相同的密码';} }}
						name="pwd1" /><br /><br />
					{/* 多选 */}
					<Input type="calendar" 
						onChange={Actions(me).change.bind(null, 'time')}
						value={originData.time}
						placeholder="请选择日期"
						rule="required"
						errMessage="日期必填"
						name="time" /><br /><br />
					<Input type="calendarRange" 
						onChange={Actions(me).change.bind(null, 'timeRange')}
						value={originData.timeRange}
						placeholder="请选择日期区间"
						rule="required"
						errMessage="日期必填"
						name="timeRange" /><br /><br />
					{/* 单选 */}
					<Input type="select"
						onChange={Actions(me).change.bind(null, 'age')}
						value={originData.age}
						rule="required"
						errMessage="请选择"
						name="age" >
						<option value="">请选择</option>
						<option value="17">a17</option>
						<option value="18">a18</option>
						<option value="19">a19</option>
						<option value="20">a20</option>
					</Input><br /><br />
					<Input type="multiple"
						onChange={Actions(me).change.bind(null, 'duoxuan')}
						value={originData.duoxuan}
						rule="required"
						errMessage="请选择"
						placeholder="请选择"
						name="duoxuan" >
						<option value="17">a17</option>
						<option value="18">a18</option>
						<option value="19">a19</option>
						<option value="20">a20</option>
						<option value="21">a21</option>
					</Input><br /><br />
					{/* 文件上传 */}
					<Input type="file" name="file" value="上 传" /><br /><br />
					{/* 文本域 */}
					<Input type="textarea"
						onChange={Actions(me).change.bind(null, 'content')}
						rule="required,max(11)"
						errMessage="文本不能为空,最大长度11"
						placeholder="请填写文本"
						value={originData.content}
						name="content" /><br /><br />
					{/* 提交按钮 */}
					<Input type="submit" value="确 定" />
					{/* 重置按钮 */}
					<Input type="reset" className="fn-ML5" value="重 置" />
					{/* 普通按钮 */}
					<Input type="button" className="fn-ML5" value="点 击" />
				</Validator>
			</div>
		);
	}
};

export default View;

