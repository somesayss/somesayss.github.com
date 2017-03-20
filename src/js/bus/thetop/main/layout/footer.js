"use strict";

import './style.less';

// 依赖
const React = require('react');
const limit = require('limit');

// 组件类
class Footer extends React.Component {
	constructor(){
		super(...arguments);
		let me = this;
	}
	render(){
		let me = this;
		let props = me.props;
		return (
			<div className="thetop-footer">
				<div className="ch-main">
					<span className="thetop-logo-min">T</span>
					Author: <a href="https:github.com/somesayss" target="_blank">github.com/somesayss</a>
				</div>
			</div>
		);
	}
	
};

module.exports = Footer;

