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
		totle: 0,
		// 偏差值
		diff: 2,
		// 抛出接口
		onChangePage: limit.K,
		actionId: 'page'
	}
	static propTypes = {
		onChangePage: React.PropTypes.func
	}
	onChange(page){
		let me = this;
		let {state, props} = me;
		state.page = page;
		me.updateComponent().then(props.onChangePage.bind(me, page));
	}
};

module.exports = Controller;