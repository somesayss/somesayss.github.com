"use strict";

import './style.less';

import Input from 'modules/input/index';

// 组件类
class Title extends React.Component {
	render(){
		let me = this;
		let {props} = me;
		return (
			<div>
				<Input type="select">
					<option value="">请选择</option>
					<option value="17">a17</option>
					<option value="18">a18</option>
					<option value="19">a19</option>
					<option value="20">a20</option>
				</Input><br /><br />
			</div>
		);
	}
};

export default Title;

