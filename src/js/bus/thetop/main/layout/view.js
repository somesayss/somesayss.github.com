"use strict";

import './style.less';

// 依赖
const React = require('react');
const limit = require('limit');
const Header = require('./header');
const Footer = require('./footer');

// 组件类
class Layout extends React.Component {
	constructor(){
		super(...arguments);
		let me = this;
	}
	render(){
		let me = this;
		let props = me.props;
		return (
			<div className={`thetop-layout ${props.showLayout ? '' : 'fn-hide'}`} >
				<Header />
				{props.children}
				<Footer />
			</div>
		);
	}
};

module.exports = Layout;

