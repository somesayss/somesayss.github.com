"use strict";

import './style.less';

const LimitTitle = require('modules/title/index');

// 组件类
class Title extends React.Component {
	constructor(){
		super(...arguments);
	}
	render(){
		return (
			<div className="title">
				<LimitTitle>123123123123123123123123123123123123123123123123123123123123123123123123123123123123</LimitTitle>
				<span className="a1">左上</span>
				<span className="a2">右上</span>
				<span className="a3">左下</span>
				<span className="a4">右下</span>
			</div>
		);
	}
};

module.exports = Title;