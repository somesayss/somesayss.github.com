"use strict";
	
// 依赖
const Control = require('common/myReflux/control');

class Controller extends Control {
	state = {
		url: '',
		info: ''
	}
	onChangeUrl(search){
		let me = this;
		let {state} = me;
		state.url = search.url;
		state.info = search.info;
		me.updateComponent();
	}
};

module.exports = Controller;