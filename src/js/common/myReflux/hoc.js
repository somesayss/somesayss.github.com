"use strict";

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

define(function (require, exports) {

	// 依赖
	var React = require('react');
	var limit = require('common/limit2.0');

	return function (Wrapper, Class) {
		var WrapperComponent = function (_React$Component) {
			_inherits(WrapperComponent, _React$Component);

			function WrapperComponent() {
				_classCallCheck(this, WrapperComponent);

				var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(WrapperComponent).apply(this, arguments));

				var me = _this,
				    __controller__ = void 0;
				me.__controller__ = __controller__ = new Class();
				limit.assignSuper(Class.defaultProps, _this.props);
				me.state = limit.assignSuper({}, __controller__.getInitialState(), _this.props);
				return _this;
			}

			_createClass(WrapperComponent, [{
				key: 'render',
				value: function render() {
					var me = this;
					return React.createElement(Wrapper, _extends({}, me.state, { Actions: me.__controller__.Actions }));
				}
			}, {
				key: 'componentDidMount',
				value: function componentDidMount() {
					this.__controller__.componentDidMount(this);
				}
			}, {
				key: 'componentWillUnmount',
				value: function componentWillUnmount() {
					this.__controller__.destroy();
				}
			}]);

			return WrapperComponent;
		}(React.Component);

		WrapperComponent.defaultProps = Class.defaultProps;
		WrapperComponent.propTypes = Class.propTypes;
		;
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