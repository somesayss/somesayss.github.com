"use strict";

// 依赖
import DialogWidget from 'modules/dialog/widget';

class Index {
	props = {
		url: '',
		cache: false,
		dataName: 'param',
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
				throw val.errorMsg;
			}else{
				let content = val.content;
				if( content.isSuccess ){
					let {retValue, message} = content;
					if( message ){
						retValue = retValue || {};
						retValue.successMsg = message;
					};
					return retValue;
				}else{
					throw content.message;
				};
			};
		}).then((val) => {
			dialogExp.destroy();
			return val;
		}, (e) => {
			let eMsg;
			if( !limit.isString(e) ){
				eMsg = '请求数据错误，请稍后再试';
			};
			dialogExp.destroy();
			DialogWidget.error(eMsg);
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

export default Index;


















