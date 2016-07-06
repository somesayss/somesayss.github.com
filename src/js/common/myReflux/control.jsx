"use strict";
define(function(require, exports) {

	// 依赖
	const limit = require('common/limit2.0');

	const Promise = limit.promise();
	const REX = /on([A-Z])(\w*)/;

	class Control {
		constructor(){
			this.bindEvent();
		}
		bindEvent(){
			let me = this,
				Actions = me.Actions = {};
			limit.compose((keys) => {
				limit.each(keys, (val) => {
					Actions[val.replace(REX, (a, b, c) => b.toLowerCase() + c)] = me[val].bind(me);
				});
			}, (keys) => {
				return [limit.filter( keys, (val) => REX.test(val) )];
			}, (obj) => {
				return [limit.keysSuper(obj)];
			})(me.constructor.prototype);
		}
		getInitialState(){
			return this.store || (this.store = {});
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
	    		store = me.getInitialState();
	    	return new Promise(resolve => {
	    		me.trigger(store, resolve);
	    	});
		}
		getReactInterface(){
			let me = this,
				getInitialState = me.getInitialState.bind(me);
			return {
				getInitialState,
				componentDidMount(){
					me.componentDidMount(this);
				}
			};
		}
	};

	return Control;

});