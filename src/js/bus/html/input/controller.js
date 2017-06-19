"use strict";
	
// 依赖
const Control = require('common/myReflux/control');
const Validator = require('modules/validator/index');

class Controller extends Control {
	state = {
		data: {
			name: '',
			age: ''
		},
		hideAge: false
	}
	constructor(){
		let me = super();
		window.validaor = me.state.validaor = new Validator({
			originData: me.state.data,
			validatMap: {
				name(val){
					if( val !== 'haha' ){
						return '需要haha';
					};
				},
				age(val){
					if( val && val !== '18' ){
						return '需要18';
					};
				}
			}
		}).on('error', () => {
			console.log('err');
		}).on('success', () => {
			console.log('suc');
		});
	}
	onHideAge(){
		let me = this;
		let {state} = me;
		let {data} = state;
		if( state.hideAge ){
			state.hideAge = false;
			data.age = '';
			me.updateComponent()
		}else{
			state.hideAge = true; 
			delete data.age;
			me.updateComponent().then(() => {
				state.validaor.emit('ageValidat');
			});
		};
	}
};

module.exports = Controller;