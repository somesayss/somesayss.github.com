"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

define(function (require, exports) {

	// 依赖
	var React = require('react');
	var limit = require('common/limit2.0');

	return function (Wrapper, Class) {
		var Controller = new Class();
		var interfaces = Controller.getReactInterface();
		var state = interfaces.getInitialState();
		delete interfaces.getInitialState;

		var WrapperComponent = function (_React$Component) {
			_inherits(WrapperComponent, _React$Component);

			function WrapperComponent() {
				_classCallCheck(this, WrapperComponent);

				var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(WrapperComponent).apply(this, arguments));

				_this.state = limit.assignSuper(state, _this.props);

				_this.Action = Controller.Action;
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

		WrapperComponent.defaultProps = Class.defaultProps;
		WrapperComponent.propTypes = Class.propTypes;
		;
		limit.assign(WrapperComponent.prototype, interfaces);
		return WrapperComponent;
	};
});

/**
							extends
							   ↑
				┌	control.js => controller.js	=> [ Action, Store ]	┐
	HOC.js	=>	¦									   ↓				¦	=> main.js => [ React ]
				└  	view.js						=> [ React 		   ]	┘		
 */