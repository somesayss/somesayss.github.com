"use strict";
	
// 依赖
const Control = require('common/myReflux/control');
const limit = require('limit');

class Controller extends Control {
	state = {
		amount: 200000
		,rate: 0.042
	}
	onChangeAmount(e){
		let me = this;
		let {state, props} = me;
		let value = limit.toNumber( e.target.value );
		if( !limit.isNaN(value) ){
			state.amount = value;
			return me.updateComponent();
		};
	}
	onChangeRate(e){
		let me = this;
		let {state, props} = me;
		let value = e.target.value;
		state.rate = value;
		return me.updateComponent();
	}
	onChangeAmountYear(e){
		let me = this;
		let {state, props} = me;
		let value = limit.toNumber( e.target.value );
		if( !limit.isNaN(value) ){
			state.amount = value / state.rate;
			return me.updateComponent();
		};
	}
};

module.exports = Controller;