"use strict";
define(function(require, exports) {

	// 依赖
	const Reflux = require('reflux');
	const limit = require('common/limit2.0');

	const REX = /on([A-Z])(\w*)/;
	const Promise = limit.promise();

	return (config) => {
		let Actions = Reflux.createActions(
			limit.map( 
				limit.filter(
					limit.keys(config), (val) => REX.test(val)), 
					(val) =>  val.replace(REX, (a, b, c) => b.toLowerCase() + c
				)
			) 
		);
		config.listenables = [Actions];
		config.updateComponent = function(){
	    	let me = this,
	    		store = me.getInitialState();
	    	return new Promise(resolve => {
	    		me.trigger(store, resolve);
	    	});
	    };
		let Store = Reflux.createStore(config);
		return {Store, Actions};
	};

});