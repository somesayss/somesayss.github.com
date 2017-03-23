"use strict";
	
// 依赖
const limit = require('limit');
const Control = require('common/myReflux/control');

class Controller extends Control {
	state = {
		top:0,
		marginLeft:0
	}
	static defaultProps = {
		width: 400,
		height: 200,
		actionId: 'dialog',
		onClose: limit.K
	}
	onSetCenter(){
		let me = this;
		let {props, state} = me;
		let WIN = window;
		let scrollY = WIN.scrollY;
		let winHeight = WIN.innerHeight;
		let height = props.height;
		let width = props.width;
		if( !limit.isNumber(height) ){
			height = $(ReactDOM.findDOMNode(me.com)).find('.react-dialog').height();
		};
		if( !limit.isNumber(width) ){
			width = $(ReactDOM.findDOMNode(me.com)).find('.react-dialog').width();
		};
		state.top = scrollY + (winHeight)/2 - height/2;
		state.marginLeft = -width/2;
		me.updateComponent();
	}
};

module.exports = Controller;