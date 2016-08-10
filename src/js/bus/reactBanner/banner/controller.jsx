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
			index: 0
		}
		static defaultProps = {
			// 总页数
			imgList: [
				'http://img2.imgtn.bdimg.com/it/u=1838667359,2037109965&fm=11&gp=0.jpg',
				'http://car0.autoimg.cn/car/upload/2015/2/4/2015020408241038726411.jpg',
				'http://car3.autoimg.cn/cardfs/product/g16/M0E/D8/EC/autohomecar__wKgH5lZBfjaAZVScAALkdGd87AQ374.jpg'
			],
			width: 400,
			height: 250,
			// 抛出接口
			onChange: limit.K
		}
		static propTypes = {
			onChange: React.PropTypes.func
		}
		onChange(index){
			let me = this;
			let {state, props} = me.getAttr();
			state.index = index;
			me.updateComponent().then(props.onChange.bind(me, index));
		}
	};

	return Controller;

});