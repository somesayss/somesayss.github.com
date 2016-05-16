"use strict";
/**
 * 模型
 */

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

define(function (require, exports, module) {

	// 依赖
	var limit = require('common/limit2.0');

	var MyPromise = function () {
		function MyPromise() {
			var _this = this;

			_classCallCheck(this, MyPromise);

			// 状态值
			this.PromiseStatus = 'pedding';
			// 返回值
			this.PromiseValue = undefined;
			// 栈区
			this.Stack = [];
			if (typeof (arguments.length <= 0 ? undefined : arguments[0]) === 'function') {
				var fun = arguments.length <= 0 ? undefined : arguments[0];
				var resolve = function resolve(val) {
					_this.PromiseStatus = 'resolved';
					_this.PromiseValue = val;
				};
				var reject = function reject(val) {
					_this.PromiseStatus = 'rejected';
					_this.PromiseValue = val;
				};
				try {
					fun(resolve, reject);
				} catch (e) {
					this.PromiseStatus = 'rejected';
					this.PromiseValue = e;
				};
			} else {
				this.PromiseStatus = arguments.length <= 0 ? undefined : arguments[0];
				this.PromiseValue = arguments.length <= 1 ? undefined : arguments[1];
				this.flag = true;
			};
		}

		_createClass(MyPromise, [{
			key: 'then',
			value: function then(suc, err) {
				suc = limit.cb(suc);
				err = limit.cb(err);
				var me = this;
				if (!me.flag) {
					me = new MyPromise(this.PromiseStatus, this.PromiseValue);
				};
				me.Stack.push({ suc: suc, err: err });
				if (!me.cleanStatus) {
					me._clean();
				};
				return me;
			}
		}, {
			key: '_clean',
			value: function _clean() {
				var me = this,
				    one = me.Stack.shift();
				me.cleanStatus = 'init';
				if (one) {
					setTimeout(function () {
						try {
							switch (me.PromiseStatus) {
								case 'resolved':
									me.PromiseValue = one.suc(me.PromiseValue);
									break;
								case 'rejected':
									me.PromiseValue = one.err(me.PromiseValue);
									break;
							};
							me.PromiseStatus = 'resolved';
						} catch (e) {
							me.PromiseStatus = 'rejected';
							me.PromiseValue = e;
							if (!me.Stack.length) {
								setTimeout(function () {
									throw '(in promise) ' + e;
								}, 0);
							};
						};
						me._clean();
					}, 0);
				} else {
					delete me.cleanStatus;
				};
				return me;
			}
		}]);

		return MyPromise;
	}();

	;

	var pro = function pro(resolve, reject) {
		// d = 0;
		resolve(123);
	};

	var main1 = function main1() {
		return new MyPromise(pro);
	};

	var main2 = function main2() {
		return new Promise(pro);
	};

	var suc1Call = function suc1Call(val) {
		console.log('success1', val);d = 'd';return 456;
	};

	var suc2Call = function suc2Call(val) {
		console.log('success2', val);return 456;
	};

	var err2Call = function err2Call(val) {
		console.log('error2', val);return 789;
	};

	var suc3Call = function suc3Call(val) {
		console.log('success3', val);
	};

	var a = main1().then(suc1Call); //.then(undefined, err2Call)

	var b = main2().then(suc1Call); //.then(undefined, err2Call)

	// console.log(a.then(suc1Call).then(undefined, err2Call));

	// console.log(b.then(suc1Call).then(undefined, err2Call));

	console.log('123');

	setTimeout(function () {
		a.then(undefined, err2Call);
		b.then(undefined, err2Call);

		// console.log(a);
		// console.log(b);
	}, 1000);
});