"use strict";
/**
 * 模型
 */
define(function(require, exports, module) {
	
	// 依赖
	const $ = require('$');
	const React = require('react');
	const Control = require('common/myReflux/control');
	const limit = require('common/limit2.0');

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
			let me = this,
				state = me.state;
			state.page = page;
			me.updateComponent().then(state.onChange.bind(me, page));
		}
	};

	return Controller;

});