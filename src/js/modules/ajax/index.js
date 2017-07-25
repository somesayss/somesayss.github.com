"use strict";

// 依赖
const limit = require('limit');
const DialogWidget = require('modules/dialog/widget');

class Ajax {
	props = {
		url: '',
		cache: false,
		dataName: '',
		data: {},
		dataType: 'json',
		timeout: 5000,
		type: 'POST',
		theMethod: 1 // one two three
	}
	state = {}
	constructor(config){
		let me = this;
		limit.assign(me.state, me.props, config);
		if( me.state.url ){
			return me[`theMethod${me.state.theMethod}`]();
		}else{
			return me.mock();
		};
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
				let content = val.content;
				if( content.isSuccess ){
					return content;
				}else{
					throw content.msg;
				};
			};
		}).then((val) => {
			dialogExp.destroy();
			return val;
		}, (e) => {
			if( !limit.isString(e) ){
				e = '请求数据错误，请稍后再试';
			};
			dialogExp.destroy();
			DialogWidget.error(e);
			throw e;
		});
	}
	jQuertAjax(){
		let me = this;
		return new Promise((s, j) => {
			$.ajax( me.parseData() ).then(s, j);
		});
	}
	parseData(){
		let me = this;
		let {state} = me;
		if( state.dataName ){
			let data = {};
			data[state.dataName] = JSON.stringify(state.data);
			state.data = data;
		};
		return state;
	}
	mock(){
		return new Promise((s) => {
			setTimeout( s, limit.random(0,1000) );
		});
	}
}

module.exports = Ajax;


















