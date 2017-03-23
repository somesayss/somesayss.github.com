"use strict";

// 依赖
const limit = require('limit');

const Promise = limit.promise();
const REX = /on([A-Z])(\w*)/;

class Control {
	constructor(){
		this.bindEvent();
	}
	bindEvent(){
		let me = this;
		let	Actions = me.Actions = {};
		// 对第一层的对象的原型属性进行处理
		limit( me.findAllPro() )
			.filter((val) => REX.test(val))
			.each((val, key) => {
				Actions[key.replace(REX, (a, b, c) => b.toLowerCase() + c)] = val.bind(me);
			});
	}
	findAllPro(){
		let me = this;
		let rtv = {};
		let pro = me.constructor.prototype;
		while(pro){
			// 如果到最底层的Object跳出
			if( pro.constructor === Object ){
				break;
			};
			limit(pro)
				.keysSuper()
				.each((val) => {
					// 隔离__proto__
					if( val !== '__proto__' && !rtv[val] ){
						rtv[val] = pro[val];
					};
				});
			pro = pro.__proto__;
		};
		return rtv;
	}
	getInitialState(){
		return this.state || (this.state = {});
	}
	destroy(){
		let me = this;
		limit.each(me, (val, key) => {
			delete me[key];
		});
		return me;
	}
	trigger(data, callback){
		let me = this;
		me.com.setState(data, callback);
	}
	updateComponent(){
		let me = this;
    	let	state = me.getInitialState();
    	return new Promise(resolve => {
    		me.trigger(state, resolve);
    	});
	}
};

module.exports = Control;






