"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

define(function (require, exports) {

	// 依赖
	var limit = require('common/limit2.0');

	var Promise = limit.promise();
	var REX = /on([A-Z])(\w*)/;

	var Control = function () {
		function Control() {
			_classCallCheck(this, Control);

			this.bindEvent();
		}

		_createClass(Control, [{
			key: "bindEvent",
			value: function bindEvent() {
				var me = this,
				    Actions = me.Actions = {};
				limit.compose(function (keys) {
					limit.each(keys, function (val) {
						Actions[val.replace(REX, function (a, b, c) {
							return b.toLowerCase() + c;
						})] = me[val].bind(me);
					});
				}, function (keys) {
					return [limit.filter(keys, function (val) {
						return REX.test(val);
					})];
				}, function (obj) {
					return [limit.keysSuper(obj)];
				})(me.constructor.prototype);
			}
		}, {
			key: "getInitialState",
			value: function getInitialState() {
				return this.store || (this.store = {});
			}
		}, {
			key: "componentDidMount",
			value: function componentDidMount(com) {
				this.com = com;
			}
		}, {
			key: "destroy",
			value: function destroy() {
				var me = this;
				limit.each(me, function (val, key) {
					delete me[key];
				});
				return me;
			}
		}, {
			key: "trigger",
			value: function trigger(data, callback) {
				var me = this;
				me.com.setState(data, callback);
			}
		}, {
			key: "updateComponent",
			value: function updateComponent() {
				var me = this,
				    store = me.getInitialState();
				return new Promise(function (resolve) {
					me.trigger(store, resolve);
				});
			}
		}, {
			key: "getReactInterface",
			value: function getReactInterface() {
				var me = this,
				    getInitialState = me.getInitialState.bind(me);
				return {
					getInitialState: getInitialState,
					componentDidMount: function componentDidMount() {
						me.componentDidMount(this);
					}
				};
			}
		}]);

		return Control;
	}();

	;

	return Control;
});