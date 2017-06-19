"use strict";

import './style.less';

const Select = require('modules/select/index');
const Input = require('modules/input/index');


// 组件类
class Title extends React.Component {
	render(){
		let me = this;
		let {props} = me;
		return (
			<div>
				<select style={{width:100}} multiple="true" size="2" id="select" value={['a1','a2']} onChange={function(){}}>
					<option value="a1" >a1</option>
					<option value="a2" >a2</option>
					<option value="a3">a3</option>
					<option value="a4">a4</option>
				</select><br /><br />
				<Select value="a1" 
					onChange={function(a,b,c){console.log(a,b,c)}} 
					onFocus={function(){console.log('focus')}}
					onBlur={function(){console.log('blur')}}>
					<option value=''>请选择</option>
					{props.list.map((val, key) => {
						return <option key={key} value={val}>{val}</option>
					})}
				</Select> &nbsp;
				<Input type="button" value="更 换" onClick={Actions(me).change} />
			</div>
		);
	}
};

module.exports = Title;