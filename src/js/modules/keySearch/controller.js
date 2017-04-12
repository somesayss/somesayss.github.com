"use strict";
	
// 依赖
const limit = require('limit');
const Control = require('common/myReflux/control');

class Controller extends Control {
	state = {
		value: ''
	}
	static defaultProps = {
		width: 200,
		height: 30,
		placeholder: '默认字符'
	}
	onInput(e){
		let me = this;
		let {state} = me;
		let node = e.target;
		let value = node.value;
		state.value = value;
		me.updateComponent();
	}
	onKeydown(e){
		let me = this;
		if( e.which === 13 ){
			me.onSearch();
		};
	}
	onSearch(){
		let me = this;
		let {state} = me;
		Actions('body').inputFilterName(state.value);
	}
};

module.exports = Controller;