"use strict";
define(function(require, exports) {

	// 依赖
	const [Reflux, limit, limit2, REX] = [require('reflux'), require('limit'), require('common/limit2.0'), /on([A-Z]\w*)/];

	const Promise = limit2.promise();

	return (config) => {
		let Actions = Reflux.createActions( limit.map(limit.filter(limit.keys(config), (val) => {
			return REX.test(val);
		}), (val) => {
			return val.replace(REX, '$1').toLowerCase();
		}) );
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