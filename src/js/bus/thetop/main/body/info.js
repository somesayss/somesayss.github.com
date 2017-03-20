"use strict";

import './style.less';

// 依赖
const React = require('react');
const limit = require('limit');

// 组件类
class Info extends React.Component {
	constructor(){
		super(...arguments);
		let me = this;
	}
	render(){
		let me = this;
		let props = me.props;
		let num = Actions(me).getMovieNumber();
		return (
			<div className="thetop-info">
				我已经看过<span className="ch-num">{num}</span>部电影
			</div>
		);
	}
};

module.exports = Info;

