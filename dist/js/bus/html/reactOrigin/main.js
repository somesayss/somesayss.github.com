/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/dist/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ({

/***/ 0:
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(147);


/***/ },

/***/ 147:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	// 组件类
	
	var Title = __webpack_require__(148);
	
	// 置入文档
	ReactDOM.render(React.createElement(Title, null), document.getElementById('container'));

/***/ },

/***/ 148:
/***/ function(module, exports) {

	"use strict";
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var Imgcute = function (_React$Component) {
		_inherits(Imgcute, _React$Component);
	
		function Imgcute(props) {
			var _this;
	
			_classCallCheck(this, Imgcute);
	
			var me = (_this = _possibleConstructorReturn(this, (Imgcute.__proto__ || Object.getPrototypeOf(Imgcute)).call(this)), _this);
			me.state = { a: 'a1', b: 'b1' };
			return _this;
		}
	
		_createClass(Imgcute, [{
			key: 'render',
			value: function render() {
				var me = this;
				var props = me.props;
				var state = me.state;
	
				return React.createElement(
					'div',
					null,
					React.createElement(
						'span',
						{ id: 'word', ref: 'word' },
						state.a
					),
					state.b,
					React.createElement('input', { type: 'button', value: '点击1', onClick: me.click1.bind(me) }),
					React.createElement('input', { type: 'button', value: '点击2', onClick: me.click2.bind(me) })
				);
			}
		}, {
			key: 'click1',
			value: function click1() {
				var me = this;
				var state = me.state;
				var refs = me.refs;
				var word = refs.word;
	
				word.innerHTML = 'a2';
				state.a = 'a2';
				me.setState(state);
			}
		}, {
			key: 'click2',
			value: function click2() {
				var me = this;
				var state = me.state;
	
				me.setState({ a: 'a1', b: 'b2' });
			}
		}]);
	
		return Imgcute;
	}(React.Component);
	
	;
	
	module.exports = Imgcute;

/***/ }

/******/ });
//# sourceMappingURL=main.js.map