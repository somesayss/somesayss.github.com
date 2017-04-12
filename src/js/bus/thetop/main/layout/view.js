"use strict";

import './style.less';

// 依赖
const React = require('react');
const limit = require('limit');
const Header = require('./header');
const Footer = require('./footer');
const titleWidget = require('modules/title/widget');

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
	componentDidMount(){
		let DOC = $(document);
		let tit = null;
		let txt = null;
		DOC.on('mouseenter', '[title]', (e) => {
			let node = $(e.target);
			txt = node.prop('title');
			node.prop('title', '');
			tit = new titleWidget({className: 'thetop-layout-title', diffX:15, diffY:15}, null, txt);
		});
		DOC.on('mouseleave', '[title]', (e) => {
			let node = $(e.target);
			tit && tit.destroy();
			txt && node.prop('title', txt);
		});
	}
};

module.exports = Layout;

