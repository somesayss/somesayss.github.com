"use strict";

import './style.less';

// 依赖
const React = require('react');
const limit = require('limit');

// 组件类
class KeySearch extends React.Component {
	constructor(){
		super(...arguments);
	}
	render(){
		let me = this;
		let	props = me.props;
		return (
			<div className="key-search" style={{width: props.width, height: props.height}}>
				<input placeholder={props.placeholder} 
					onChange={Actions(me).input} 
					onKeyDown={Actions(me).keydown}
					value={props.value} />
				<span className="ch-enter" style={{lineHeight: `${props.height - 10}px`}} onClick={Actions(me).search}>↵</span>
			</div>
		);
	}
};

module.exports = KeySearch;

