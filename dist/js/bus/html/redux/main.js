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

	module.exports = __webpack_require__(172);


/***/ },

/***/ 172:
/***/ function(module, exports) {

	'use strict';
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var _Redux = Redux;
	var createStore = _Redux.createStore;
	var combineReducers = _Redux.combineReducers;
	
	// Action
	
	var ADD_TODO = 'ADD_TODO';
	var DEL_TODO = 'DEL_TODO';
	
	function addTodo(value) {
		return {
			type: ADD_TODO,
			value: value
		};
	};
	
	function delTodo(value) {
		return {
			type: DEL_TODO,
			value: value
		};
	};
	
	// Reducer
	function todos() {
		var state = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
		var action = arguments[1];
	
		console.log('state', state);
		switch (action.type) {
			case ADD_TODO:
				return _extends({}, state, { addValue: action.value });
			case DEL_TODO:
				return _extends({}, state, { delValue: action.value });
			default:
				return state;
		};
	};
	
	var todoApp = combineReducers({ todos: todos });
	
	// Store
	var store = createStore(todoApp);
	
	window.doSome = function (value) {
		store.dispatch(addTodo(value));
	};
	
	window.doSome1 = function (value) {
		store.dispatch(delTodo(value));
	};
	
	// console.log(store.dispatch({type: 'ADD_TODO'}))
	
	// React
	
	var Title = function (_React$Component) {
		_inherits(Title, _React$Component);
	
		function Title() {
			_classCallCheck(this, Title);
	
			return _possibleConstructorReturn(this, (Title.__proto__ || Object.getPrototypeOf(Title)).apply(this, arguments));
		}
	
		_createClass(Title, [{
			key: 'render',
			value: function render() {
				var me = this;
				var props = me.props;
	
				console.log(props);
				return React.createElement(
					'div',
					null,
					'abced ',
					props.todos.addValue,
					' ',
					props.todos.delValue
				);
			}
		}]);
	
		return Title;
	}(React.Component);
	
	;
	
	// function Title(props){
	// 	return (
	// 		<div>
	// 			abced {props.todos.text}
	// 		</div>
	// 	);
	// };
	
	function render() {
		ReactDOM.render(React.createElement(Title, store.getState()), document.getElementById('container'));
	};
	
	render();
	store.subscribe(render);

/***/ }

/******/ });
//# sourceMappingURL=main.js.map