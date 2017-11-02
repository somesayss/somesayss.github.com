"use strict";
	
// 依赖
const limit = require('limit');
const Control = require('common/myReflux/control');

class Controller extends Control {
	state = {
		dropIn: false,
		hideDrop: true
	}
	static defaultProps = {
		actionId: 'limitFilesDrop',
		onDragEnter: limit.K,
		onDragLeave: limit.K,
		onDrop: limit.K
	}
	onDragenter(e){
		let me = this;
		let {state, props} = me;
		state.dropIn = true;
		props.onDragEnter(e);
		me.updateComponent();
	}
	onDragleave(e){
		let me = this;
		let {state, props} = me;
		state.dropIn = false;
		props.onDragLeave(e);
		me.updateComponent();
	}
	onDrop(e){
		let me = this;
		let {state, props} = me;
		state.dropIn = false;
		props.onDrop(e.originalEvent);
		state.hideDrop = true;	
		me.updateComponent();
	}
	onDocDragenter(e){
		let me = this;
		let {state} = me;
		state.hideDrop = false;
		state.timeStamp = e.timeStamp;
		me.updateComponent();
	}
	onDocDrop(){
		let me = this;
		let {state} = me;
		state.hideDrop = true;
		me.updateComponent();
	}
	onDocDragleave(e){
		let me = this;
		let {state} = me;
		if( e.timeStamp - state.timeStamp > 50 ){
			state.hideDrop = true;
			me.updateComponent();
		};
		
	}
};

module.exports = Controller;