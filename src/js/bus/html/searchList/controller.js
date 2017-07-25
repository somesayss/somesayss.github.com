"use strict";
	
// 依赖
const Control = require('common/myReflux/control');

class Controller extends Control {
	state = {
		list1: [],
		list2: []
	}
	onData(key, val){
		let me = this;
		let {state} = me;
		state[key] = val.list;
		me.updateComponent();
	}
	onClick(){
		let me = this;
		me.state.a = 'a2';
		me.state.b = 'b2';
		me.state.actionCid = 'cccid1';
		me.updateComponent();
	}
};

module.exports = Controller;