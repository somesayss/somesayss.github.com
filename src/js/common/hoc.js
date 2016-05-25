"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

define(function (require, exports) {

	// 依赖

	var React = require('react');

	var Reflux = require('reflux');

	var limit = require('limit');

	return function (Wrapper, Controller) {
		Controller = Reflux.connect(Controller.Store);
		var state = Controller.getInitialState();
		delete Controller.getInitialState;

		var WrapperComponent = function (_React$Component) {
			_inherits(WrapperComponent, _React$Component);

			function WrapperComponent() {
				var _Object$getPrototypeO;

				_classCallCheck(this, WrapperComponent);

				for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
					args[_key] = arguments[_key];
				}

				// getInitialState

				var _this = _possibleConstructorReturn(this, (_Object$getPrototypeO = Object.getPrototypeOf(WrapperComponent)).call.apply(_Object$getPrototypeO, [this].concat(args)));

				_this.state = state;
				return _this;
			}

			_createClass(WrapperComponent, [{
				key: 'render',
				value: function render() {
					return React.createElement(Wrapper, this.state);
				}
			}]);

			return WrapperComponent;
		}(React.Component);

		;
		limit.extend(WrapperComponent.prototype, Controller);
		return WrapperComponent;
	};
});