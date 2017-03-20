"use strict";

// 依赖
const limit = require('limit');

class Ajax {
	props = {
		url: '',
		cache: false,
		data: {},
		dataType: 'json',
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
		return new Promise((s, j) => {
			$.ajax(me.state).then(s, j);
		});
	}
	theMethod1(){
		let me = this;
		return new Promise((s, j) => {
			$.ajax(me.state).then((val) => {
				if(val.hasError){
					j(val.message);
				}else{
					s(val.content);
				};
			}, j);
		});
	}
}

module.exports = Ajax;