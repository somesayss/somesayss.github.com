"use strict";
	
// 依赖
const Control = require('common/myReflux/control');

class Controller extends Control {
	state = {
		width: 200,
		height: 200,
		top: 0,
		left: 0
	}
	static defaultProps = {
		actionId: 'limitCropper',
		src: '',
		onChangePos: limit.K
	}
	onChangePos(x, y){
		let me = this;
		let {state, props} = me;
		state.left = x;
		state.top = y;
		me.updateComponent().then(() => {
			props.onChangePos(x, y);
		});
	}
};

module.exports = Controller;








