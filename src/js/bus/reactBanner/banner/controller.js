"use strict";
/**
 * 模型
 */

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

define(function (require, exports, module) {

	// 依赖
	var $ = require('$');
	var React = require('react');
	var Control = require('common/myReflux/control');
	var limit = require('common/limit2.0');

	var Controller = function (_Control) {
		_inherits(Controller, _Control);

		function Controller() {
			var _Object$getPrototypeO;

			var _temp, _this, _ret;

			_classCallCheck(this, Controller);

			for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
				args[_key] = arguments[_key];
			}

			return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_Object$getPrototypeO = Object.getPrototypeOf(Controller)).call.apply(_Object$getPrototypeO, [this].concat(args))), _this), _this.state = {
				// 当前在第几页
				index: 0
			}, _temp), _possibleConstructorReturn(_this, _ret);
		}

		_createClass(Controller, [{
			key: 'onChange',
			value: function onChange(index) {
				var me = this;

				var _me$getAttr = me.getAttr();

				var state = _me$getAttr.state;
				var props = _me$getAttr.props;

				state.index = index;
				me.updateComponent().then(props.onChange.bind(me, index));
			}
		}]);

		return Controller;
	}(Control);

	Controller.defaultProps = {
		// 总页数
		imgList: ['http://img2.imgtn.bdimg.com/it/u=1838667359,2037109965&fm=11&gp=0.jpg', 'http://car0.autoimg.cn/car/upload/2015/2/4/2015020408241038726411.jpg', 'http://car3.autoimg.cn/cardfs/product/g16/M0E/D8/EC/autohomecar__wKgH5lZBfjaAZVScAALkdGd87AQ374.jpg'],
		width: 400,
		height: 250,
		// 抛出接口
		onChange: limit.K
	};
	Controller.propTypes = {
		onChange: React.PropTypes.func
	};
	;

	return Controller;
});