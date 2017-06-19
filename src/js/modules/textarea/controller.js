"use strict";
	
// 依赖
const Control = require('common/myReflux/control');

class Controller extends Control {
	state = {
		isShowScroll: true,
		value: ''
	}
	static defaultProps = {
		actionId: 'limitTextarea',
		height: null,
		barHeight: 50,
		rows: 10,
		onChange: limit.K
	}
	onChange(e){
		let me = this;
		let {state, props} = me;
		let value = state.value = e.target.value;
		props.onChange(value);
		me.updateComponent();
	}
};

module.exports = Controller;



























