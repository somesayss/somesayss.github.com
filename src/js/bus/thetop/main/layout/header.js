"use strict";

import './style.less';

// 依赖
const React = require('react');
const limit = require('limit');

// 组件类
class Header extends React.Component {
	constructor(){
		super(...arguments);
		let me = this;
	}
	render(){
		let me = this;
		let props = me.props;
		return (
			<div className="thetop-Header">
				<div className="ch-main">
					<span className="thetop-logo">T</span>
					<span className="thetop-title">
						我们不产生数据，我们只是互联网的搬运工
						<span className="ch-line"></span>
					</span>
				</div>
			</div>
		);
	}
	
};

module.exports = Header;

