"use strict";

import './style.less';

// 依赖
const React = require('react');
const limit = require('limit');

// 组件类
class Rate extends React.Component {
	constructor(){
		super(...arguments);
	}
	render(){
		let me = this;
		let props = me.props;
		let Actions = props.Actions;
		return (
			<div className="websocket">
				<ul>
					{props.strList.map((val, key) => {
						return <li key={key}>{props.sysName} {val.fromName}$ {val.val}</li>
					})}
				</ul>
				<div className='ch-edit' >
					{props.sysName} {props.myName}$ {props.message}<input ref="input" onKeyDown={Actions.keydown}  />
				</div>
			</div>
		);
	}
	componentDidMount(){
		let me = this;
		let {refs, props} = me;
		let {input} = refs;
		let Actions = props.Actions;
		let isMark = false;
		let WIN = $(window);
		input = $(input);
		input.on('compositionstart', () => {
			isMark = true;
		});
		input.on('compositionend', () => {
			isMark = false;
		});
		input.on('input', (e) => {
			if( !isMark ){
				Actions.input(e);
				input.val('');
			};
		});
		WIN.on('click', () => {
			input.focus();
		});
		Actions.initWS();
	}
};

module.exports = Rate;

