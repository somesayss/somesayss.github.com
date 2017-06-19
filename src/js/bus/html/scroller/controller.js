"use strict";
	
// 依赖
const Control = require('common/myReflux/control');

class Controller extends Control {
	state = {
		list: ['a1', 'a2', 'a3', 'a4', 'a5']
	}
	onAdd(){
		let me = this;
		let {state} = me;
		let {list} = state;
		list.push('a6');
		me.updateComponent();
	}
	onDel(){
		let me = this;
		let {state} = me;
		let {list} = state;
		list.pop();
		me.updateComponent();
	}
};

module.exports = Controller;