"use strict";
	
// 依赖
const $ = require('$');
const React = require('react');
const Control = require('common/myReflux/control');
const limit = require('limit');

class Controller extends Control {
	state = {
		// 当前在第几页
		page: 1
	}
	static defaultProps = {
		// 总页数
		totle: 100,
		// 偏差值
		diff: 2,
		// 抛出接口
		onChange: limit.K
	}
	static propTypes = {
		onChange: React.PropTypes.func
	}
	onChange(page){
		let me = this;
		let {state, props} = me.getAttr();
		state.page = page;
		me.updateComponent().then(props.onChange.bind(me, page));
	}
};

module.exports = Controller;