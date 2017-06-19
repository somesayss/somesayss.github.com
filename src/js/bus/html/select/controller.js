"use strict";
	
// 依赖
const Control = require('common/myReflux/control');

class Controller extends Control {
	state = {
		list: ['啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊', 'a2', 'a3', 'a4', 'a5']
	}
	onChange(){
		let me = this;
		let {state} = me;
		state.list = ['a11', 'a22'];
		me.updateComponent();
	}
};

module.exports = Controller;