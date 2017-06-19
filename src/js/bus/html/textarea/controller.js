"use strict";
	
// 依赖
const Control = require('common/myReflux/control');
const Validator = require('modules/validator/index');

class Controller extends Control {
	state = {
		value: '123'
	}
	onChangeValue(){
		let me = this;
		let {state} = me;
		state.value = '1\n1\n1\n1\n1\n1\n1\n1\n1\n1\n1\n1\n1\n1\n1\n1\n1\n1\n';
		me.updateComponent();
	}
};

module.exports = Controller;