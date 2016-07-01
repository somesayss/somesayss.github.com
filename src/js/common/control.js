"use strict";

define(function (require, exports) {

	// 依赖
	var Reflux = require('reflux');
	var limit = require('common/limit2.0');

	var REX = /on([A-Z])(\w*)/;
	var Promise = limit.promise();

	return function (config) {
		var Actions = Reflux.createActions(limit.map(limit.filter(limit.keys(config), function (val) {
			return REX.test(val);
		}), function (val) {
			return val.replace(REX, function (a, b, c) {
				return b.toLowerCase() + c;
			});
		}));
		config.listenables = [Actions];
		config.updateComponent = function () {
			var me = this,
			    store = me.getInitialState();
			return new Promise(function (resolve) {
				me.trigger(store, resolve);
			});
		};
		var Store = Reflux.createStore(config);
		return { Store: Store, Actions: Actions };
	};
});