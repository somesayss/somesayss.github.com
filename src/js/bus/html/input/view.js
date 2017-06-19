"use strict";

import './style.less';

const Input = require('modules/input/index');

// 组件类
class Title extends React.Component {
	render(){
		let me = this;
		let {props} = me;
		return (
			<div className="form">
				<Input type="text" 
					value={props.data.name} 
					name="name"
					validaor={props.validaor} />
				<br /><br />
				<Input type="text" 
					value={props.data.age} 
					name="age"
					validaor={props.validaor} />
				<br /><br />
				<Input type="button" value="保 存" onClick={function(){ props.validaor.execute() }} />
				<Input type="button" value="消 失" onClick={Actions(me).hideAge} className="fn-ML5" />
			</div>
		);
	}
};

module.exports = Title;