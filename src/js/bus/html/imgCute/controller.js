"use strict";
	
// 依赖
const Control = require('common/myReflux/control');

class Controller extends Control {
	state = {
		src: '',
		x: 0,
		y: 0
	}
	onChangeSrc(src){
		let me = this;
		let {state} = me;
		state.src = src;
		me.updateComponent();
	}
	onChangePos(x, y){
		let me = this;
		let {state} = me;
		state.x = x;
		state.y = y;
		me.updateComponent();
	}
};

module.exports = Controller;