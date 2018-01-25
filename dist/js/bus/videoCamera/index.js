webpackJsonp([14],{

/***/ 127:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _view = __webpack_require__(274);

var _view2 = _interopRequireDefault(_view);

var _hoc = __webpack_require__(2);

var _hoc2 = _interopRequireDefault(_hoc);

var _controller = __webpack_require__(278);

var _controller2 = _interopRequireDefault(_controller);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var Index = (0, _hoc2["default"])(_view2["default"], _controller2["default"]);

exports["default"] = Index;

/***/ }),

/***/ 274:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

__webpack_require__(275);

var _videoStream = __webpack_require__(277);

var _videoStream2 = _interopRequireDefault(_videoStream);

var _index = __webpack_require__(9);

var _index2 = _interopRequireDefault(_index);

var _index3 = __webpack_require__(15);

var _index4 = _interopRequireDefault(_index3);

var _component = __webpack_require__(4);

var _component2 = _interopRequireDefault(_component);

var _widget = __webpack_require__(17);

var _widget2 = _interopRequireDefault(_widget);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var attachMediaStream = function attachMediaStream(element, stream) {
	if (typeof element.srcObject !== 'undefined') {
		element.srcObject = stream;
	} else if (typeof element.mozSrcObject !== 'undefined') {
		element.mozSrcObject = stream;
	} else if (typeof element.src !== 'undefined') {
		element.src = URL.createObjectURL(stream);
	} else {
		console.log('Error attaching stream to element.');
	}
};

var VideoCamera = function (_Component) {
	_inherits(VideoCamera, _Component);

	function VideoCamera() {
		_classCallCheck(this, VideoCamera);

		return _possibleConstructorReturn(this, (VideoCamera.__proto__ || Object.getPrototypeOf(VideoCamera)).apply(this, arguments));
	}

	_createClass(VideoCamera, [{
		key: 'render',
		value: function render() {
			var me = this;
			var props = me.props;

			return React.createElement(
				'div',
				{ className: me.getClassName('page-video-camera') },
				React.createElement('video', { autoPlay: 'autoplay', ref: 'video', width: props.width, height: props.height }),
				React.createElement(
					'div',
					{ className: 'fn-MT10' },
					React.createElement(_index2["default"], { value: '\u622A \u56FE', onClick: me.doScreenshots.bind(me) })
				),
				props.isShots ? React.createElement('canvas', { ref: 'canvas', className: 'fn-hide' }) : void 0
			);
		}
	}, {
		key: 'componentDidMount',
		value: function componentDidMount() {
			var me = this;
			var video = me.refs.video;

			$(video).attr('playsinline', 'true');
			$(video).prop('muted', 'muted');
			navigator.getUserMedia({
				audio: true,
				video: true
			}, function (stream) {
				attachMediaStream(video, stream);
				alert(123);
				// video.src = URL.createObjectURL(stream);
			}, function (e) {
				console.log(e);
			});
			// new VideoStream().then((stream) => {
			// 	console.log(stream)
			// 	window.myStream = stream;
			// 	video.src = URL.createObjectURL(stream);
			// });
		}
	}, {
		key: 'doScreenshots',
		value: function doScreenshots() {
			var me = this;
			return Actions(me).screenshots(true).then(function () {
				return me.drawImg();
			}).then(function (base64) {
				return new _index4["default"]({
					url: '/common/database64.json',
					type: 'post',
					data: {
						database: base64
					}
				});
			}).then(function (val) {
				_widget2["default"].success('保存成功');
			})["catch"](function (e) {
				return limit.err(e);
			});
		}
	}, {
		key: 'drawImg',
		value: function drawImg() {
			var me = this;
			var _me$refs = me.refs,
			    canvas = _me$refs.canvas,
			    video = _me$refs.video,
			    _me$props = me.props,
			    width = _me$props.width,
			    height = _me$props.height;

			var cxt = canvas.getContext('2d');
			canvas.width = width;
			canvas.height = height;
			cxt.scale(width / video.videoWidth, height / video.videoHeight);
			cxt.drawImage(video, 0, 0);
			return canvas.toDataURL();
		}
	}, {
		key: 'componentDidUpdate',
		value: function componentDidUpdate() {}
	}, {
		key: 'componentWillUnmount',
		value: function componentWillUnmount() {}
	}]);

	return VideoCamera;
}(_component2["default"]);

;

exports["default"] = VideoCamera;

/***/ }),

/***/ 275:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(276);
if(typeof content === 'string') content = [[module.i, content, '']];
// add the styles to the DOM
var update = __webpack_require__(1)(content, {});
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!./../../../../node_modules/css-loader/index.js??ref--1-1!./../../../../node_modules/less-loader/index.js!./style.less", function() {
			var newContent = require("!!./../../../../node_modules/css-loader/index.js??ref--1-1!./../../../../node_modules/less-loader/index.js!./style.less");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ 276:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(0)();
// imports


// module
exports.push([module.i, ".page-video-camera{text-align:center;position:absolute;top:50%;left:50%;transform:translate(-50%,-50%)}", ""]);

// exports


/***/ }),

/***/ 277:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var VideoStream = function (_limit$Events) {
	_inherits(VideoStream, _limit$Events);

	function VideoStream() {
		var _temp, _this, _ret;

		_classCallCheck(this, VideoStream);

		var me = (_temp = (_this = _possibleConstructorReturn(this, (VideoStream.__proto__ || Object.getPrototypeOf(VideoStream)).call(this)), _this), _this.props = {
			videoConfig: {
				audio: true,
				video: true
			}
		}, _temp);
		var state = limit.assign(me.state, me.props);
		return _ret = new Promise(function (resolve, reject) {
			me.getUserMedia().then(function (userMedia) {
				return userMedia.call(navigator, state.videoConfig, resolve, reject);
			});
		}), _possibleConstructorReturn(_this, _ret);
	}

	_createClass(VideoStream, [{
		key: 'getUserMedia',
		value: function getUserMedia() {
			return new Promise(function (resolve, reject) {
				var getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia;
				if (getUserMedia) {
					resolve(getUserMedia);
				} else {
					reject('getUserMedia is undefined');
				};
			});
		}
	}]);

	return VideoStream;
}(limit.Events);

;

exports["default"] = VideoStream;

/***/ }),

/***/ 278:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _control = __webpack_require__(3);

var _control2 = _interopRequireDefault(_control);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Controller = function (_Control) {
	_inherits(Controller, _Control);

	function Controller() {
		var _ref;

		var _temp, _this, _ret;

		_classCallCheck(this, Controller);

		for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
			args[_key] = arguments[_key];
		}

		return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Controller.__proto__ || Object.getPrototypeOf(Controller)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
			isShots: false,
			width: 400,
			height: 300
		}, _temp), _possibleConstructorReturn(_this, _ret);
	}

	_createClass(Controller, [{
		key: 'onScreenshots',
		value: function onScreenshots(is) {
			var me = this;
			var state = me.state;

			state.isShots = is;
			return me.updateComponent();
		}
	}]);

	return Controller;
}(_control2["default"]);

;

exports["default"] = Controller;

/***/ })

});
//# sourceMappingURL=index.js.map