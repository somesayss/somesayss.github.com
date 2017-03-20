"use strict";

import './style.less';

// 依赖
const React = require('react');
const limit = require('limit');
const Rainbow = require('modules/color/index');

const colorList = [
	'#000',
	'#060',
	'#0C0',
	'#300',
	'#360',
	'#3C0',
	'#600',
	'#660',
	'#6C0',
	'#900'
];
// 组件类
class Rate extends React.Component {
	constructor(){
		super(...arguments);
	}
	render(){
		let me = this;
		let props = me.props;
		let color = '#666';
		if( props.myId ){
			color = colorList[props.myId - 1];
		};
		return (
			<div className="websocket">
				<ul>
					{props.strList.map((val, key) => {
						return <li key={key}
							style={ {color:colorList[val.id - 1]} }
							>{val.displayName || `游客${val.id}`}$ {val.value}</li>
					})}
				</ul>
				<div className='ch-edit' style={ {color: color} }>
					{props.myName || `游客${props.myId}`}$ {props.message}<input ref="input" onKeyDown={Actions(me).keydown}  />
				</div>
			</div>
		);
	}
	componentDidMount(){
		let me = this;
		let {refs, props} = me;
		let {input} = refs;
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
				Actions(me).input(e);
				input.val('');
			};
		});
		WIN.on('click', () => {
			input.focus();
		});
		Actions(me).initWS();
	}
};

module.exports = Rate;

