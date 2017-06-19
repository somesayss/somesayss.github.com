"use strict";
	
// 依赖
const Control = require('common/myReflux/control');

class Controller extends Control {
	state = {
		originData: {
			name: '',
			age: '',
			pwd: '',
			content: '',
			number: ''
		},
		isHideAge: false
	}
	onHideAge(){
		let me = this;
		me.state.isHideAge = !me.state.isHideAge;
		me.updateComponent();
	}
	onSuccess(){
		let me = this;
	}
	onChange(name, val){
		let me = this;
		let originData = me.state.originData;
		if( val.target ){
			originData[name] = val.target.value;
		}else{
			originData[name] = val;
		};
	}
};

module.exports = Controller;