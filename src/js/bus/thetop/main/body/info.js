"use strict";

import './style.less';

// 依赖
const React = require('react');
const limit = require('limit');
const KeySearch = require('modules/keySearch/index');

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
			<div>
				<div className="thetop-info">
					我已经看过<span className="ch-num">{num}</span>部电影
				</div>
				<div className="thetop-info fn-MT10 thetop-search">
					我想找：<KeySearch width="320" placeholder="请输入电影名字" />
				</div>
			</div>
		);
	}
};

module.exports = Info;

