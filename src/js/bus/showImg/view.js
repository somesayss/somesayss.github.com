"use strict";

import './style.less';

// 依赖
const React = require('react');
const limit = require('limit');

// 图片
const imgShow = require('../../../imgs/tutu.jpg');

// 组件类
class Page extends React.Component {
	constructor(){
		super(...arguments);
	}
	render(){
		return (
			<div>
				<div className="imgshow1"></div>
				<div className="imgshow2"></div>
				<img width="200" height="200" src={imgShow} />
			</div>
		);
	}
};

module.exports = Page;

