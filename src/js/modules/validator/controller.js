"use strict";
	
// 依赖
const Listener = require('./listener');
const Control = require('common/myReflux/control');

class Controller extends Control {
	state = {
		validaor: new Listener()
	}
	static defaultProps = {
		action: 'javascript:;',
		executeSuccess: limit.K,
		executeError: limit.K
	}
	onSubmit(e){
		let me = this;
		let {state, props} = me;
		let hasErr = state.validaor.execute();
		if( hasErr ){
			e.preventDefault();
			props.executeError();
		}else{
			props.executeSuccess();
		};
	}
	onReset(){
		let me = this;
		let {state, props} = me;
		state.validaor.reset();
	}
};

module.exports = Controller;



























