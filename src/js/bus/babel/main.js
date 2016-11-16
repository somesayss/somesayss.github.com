"use strict";
/**
 * 业务
 */

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

define(function (require, exports, module) {
	var _obj, _context, _ref;

	// 定义局部变量
	var a = 'a1';

	// 定义全局变量
	var b = 'b1';

	// 箭头操作符号
	var fn1 = function fn1(a, b) {
		return a + b;
	};
	var fn2 = function fn2(a, b) {
		return a + b;
	};
	var fn3 = function fn3(a) {
		return a;
	};

	// 对象的定义
	var obj = (_obj = {}, _defineProperty(_obj, 'a1', 'a1'), _defineProperty(_obj, 'b', b), _defineProperty(_obj, 'aaa', function aaa() {}), _defineProperty(_obj, 'bbb', function bbb() {}), _defineProperty(_obj, 'ccc', 'ccc3'), _obj);

	// 字符串模板
	var c = 'c1';

	var d = '\n\t\tmy name is ' + c + ' haha\n\t\t<div> ' + c + ' </div>\n\t';

	// 解构
	var e = 'e1';
	var f = 'f1';
	var g = 'g1';
	var _e1$e2$e = { e1: 'e11', e2: 'e22', e3: 'e33' };
	var e1 = _e1$e2$e.e1;
	var e2 = _e1$e2$e.e2;
	var e3 = _e1$e2$e.e3;

	// 类

	var A = function () {
		function A(name) {
			_classCallCheck(this, A);

			this.store = {
				a: 'a1'
			};

			this.name = name;
		}

		_createClass(A, [{
			key: 'show',
			value: function show() {
				console.log(this.name);
			}
		}], [{
			key: 'xixi',
			value: function xixi() {
				return 'xixi';
			}
		}]);

		return A;
	}();

	A.a = 'a1';
	;

	// 继承

	var B = function (_A) {
		_inherits(B, _A);

		function B(name, age) {
			_classCallCheck(this, B);

			var _this = _possibleConstructorReturn(this, (B.__proto__ || Object.getPrototypeOf(B)).apply(this, arguments));

			_this.store = {
				b: 'b2'
			};

			_this.age = age;
			return _this;
		}

		_createClass(B, [{
			key: 'show',
			value: function show() {
				_get(B.prototype.__proto__ || Object.getPrototypeOf(B.prototype), 'show', this).call(this);
				console.log(this.age);
			}
		}], [{
			key: 'xixi',
			value: function xixi() {
				return 'xi1xi1';
			}
			// static a = 'a2'

		}]);

		return B;
	}(A);

	;

	var bbb = new B('shao2', 28);
	console.log(B.a, 'i want');
	bbb.show();

	// console.log( A.xixi(), 'aaaaaaa' );
	// console.log(bb, bb instanceof B, bb instanceof A); // true true
	// console.log(bb.constructor, bb.constructor === B, bb.constructor === A); // true false

	// 默认参数
	function h() {
		var name = arguments.length <= 0 || arguments[0] === undefined ? 'kiss' : arguments[0];
		var age = arguments.length <= 1 || arguments[1] === undefined ? 19 : arguments[1];

		console.log(name, age);
	};

	// 
	var i = ['i1', 'i2', 'i3'];

	var j = [].concat(i);

	function per2(y) {
		for (var _len = arguments.length, x = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
			x[_key - 1] = arguments[_key];
		}

		console.log(this, 'x', x);
	};

	per2.apply(undefined, i);
	(_ref = (_context = '111', per2)).call.apply(_ref, [_context].concat(i));

	// 8进制
	console.log(503 === 503);

	// 绑定上下文
	var content = ['a1', 'a2', 'a3'];
	var _Array$prototype = Array.prototype;
	var map = _Array$prototype.map;
	var forEach = _Array$prototype.forEach;

	map.call(content, function (val, key) {});

	var conEachFn = forEach.bind(content);
	conEachFn(function (val) {
		console.log(val);
	});

	var o1 = { a: 'a1' };
	var o2 = { b: 'b1' };
	var o3 = _extends({}, a, b);
});