"use strict";

import './style.less';

const Input = require('modules/input/index');
const Textarea = require('modules/textarea/index');

// 组件类
class Title extends React.Component {
	render(){
		let me = this;
		let {props} = me;
		return (
			<div>
				<Textarea value={props.value}></Textarea>
				<Input type="button" onClick={Actions(me).changeValue} value="点 击" />
			</div>
		);
	}
};

module.exports = Title;