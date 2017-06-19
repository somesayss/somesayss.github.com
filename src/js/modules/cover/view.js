"use strict";

import './style.less';

// 依赖
const React = require('react');
const limit = require('limit');

// 组件类
class Cover extends React.Component {
	constructor(){
		super(...arguments);
	}
	render(){
		let me = this;
		let	props = me.props;
		return (
			<div
				onClick={props.onClick} 
				className="react-cover" 
				style={ {opacity: props.opacity, background: props.background} }>
				{props.children}
			</div>
		);
	}
};

module.exports = Cover;

