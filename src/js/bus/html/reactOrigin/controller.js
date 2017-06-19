"use strict";
	
// 依赖
const Control = require('common/myReflux/control');

class Controller extends Control {
	state = {
		src: '/src/imgs/tutu.jpg'
	}
	onChangeView(){
		let me = this;
		let {state} = me;
		state.src = '/src/imgs/map.jpg';
		me.updateComponent();
	}
};

module.exports = Controller;