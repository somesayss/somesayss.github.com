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
		let me = this,
			Actions = me.Actions = {};
		// 对第一层的对象的原型属性进行处理
		limit(me.constructor.prototype)
			.keysSuper()
			.filter((val) => REX.test(val))
			.each((val) => {
				Actions[val.replace(REX, (a, b, c) => b.toLowerCase() + c)] = me[val].bind(me);
			});
	}
	getInitialState(){
		return this.state || (this.state = {});
	}
	getAttr(){
		let me = this,
			state = me.state,
			props = me.constructor.defaultProps || {};
		return {state, props};
	}
	componentDidMount(com){
		this.com = com;
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
		let me = this,
    		state = me.getInitialState();
    	return new Promise(resolve => {
    		me.trigger(state, resolve);
    	});
	}
};

module.exports = Control;






