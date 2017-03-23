"use strict";

// 依赖
const limit = require('limit');
const DialogWidget = require('modules/dialog/widget');

class Ajax {
	props = {
		url: '',
		cache: false,
		data: {},
		dataType: 'json',
		timeout: 5000,
		type: 'GET',
		theMethod: 1 // one two three
	}
	state = {}
	constructor(config){
		let me = this;
		limit.assign(me.state, me.props, config);
		return me[`theMethod${me.state.theMethod}`]();
	}
	theMethod0(){
		let me = this;
		return me.jQuertAjax();
	}
	theMethod1(){
		let me = this;
		let dialogExp = DialogWidget.loading();
		return me.jQuertAjax().then((val) => {
			if(val.hasError){
				throw val.message;
			}else{
				return val.content;
			};
		}).then((val) => {
			dialogExp.destroy();
			return val;
		}, (e) => {
			dialogExp.destroy();
			DialogWidget.error('请求数据错误，请稍后再试');
			throw e;
		});
	}
	jQuertAjax(){
		let me = this;
		return new Promise((s, j) => {
			$.ajax(me.state).then(s, j);
		});
	}
}

module.exports = Ajax;


















