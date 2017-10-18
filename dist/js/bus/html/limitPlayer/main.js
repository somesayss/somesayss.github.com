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
/***/ (function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(151);


/***/ }),

/***/ 11:
/***/ (function(module, exports) {

	"use strict";
	
	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	// css base code, injected by the css-loader
	module.exports = function () {
		var list = [];
	
		// return the list of modules as css string
		list.toString = function toString() {
			var result = [];
			for (var i = 0; i < this.length; i++) {
				var item = this[i];
				if (item[2]) {
					result.push("@media " + item[2] + "{" + item[1] + "}");
				} else {
					result.push(item[1]);
				}
			}
			return result.join("");
		};
	
		// import a list of modules into the list
		list.i = function (modules, mediaQuery) {
			if (typeof modules === "string") modules = [[null, modules, ""]];
			var alreadyImportedModules = {};
			for (var i = 0; i < this.length; i++) {
				var id = this[i][0];
				if (typeof id === "number") alreadyImportedModules[id] = true;
			}
			for (i = 0; i < modules.length; i++) {
				var item = modules[i];
				// skip already imported module
				// this implementation is not 100% perfect for weird media query combinations
				//  when a module is imported multiple times with different media queries.
				//  I hope this will never occur (Hey this way we have smaller bundles)
				if (typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
					if (mediaQuery && !item[2]) {
						item[2] = mediaQuery;
					} else if (mediaQuery) {
						item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
					}
					list.push(item);
				}
			}
		};
		return list;
	};

/***/ }),

/***/ 12:
/***/ (function(module, exports, __webpack_require__) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	var stylesInDom = {},
		memoize = function(fn) {
			var memo;
			return function () {
				if (typeof memo === "undefined") memo = fn.apply(this, arguments);
				return memo;
			};
		},
		isOldIE = memoize(function() {
			return /msie [6-9]\b/.test(window.navigator.userAgent.toLowerCase());
		}),
		getHeadElement = memoize(function () {
			return document.head || document.getElementsByTagName("head")[0];
		}),
		singletonElement = null,
		singletonCounter = 0,
		styleElementsInsertedAtTop = [];
	
	module.exports = function(list, options) {
		if(false) {
			if(typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
		}
	
		options = options || {};
		// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
		// tags it will allow on a page
		if (typeof options.singleton === "undefined") options.singleton = isOldIE();
	
		// By default, add <style> tags to the bottom of <head>.
		if (typeof options.insertAt === "undefined") options.insertAt = "bottom";
	
		var styles = listToStyles(list);
		addStylesToDom(styles, options);
	
		return function update(newList) {
			var mayRemove = [];
			for(var i = 0; i < styles.length; i++) {
				var item = styles[i];
				var domStyle = stylesInDom[item.id];
				domStyle.refs--;
				mayRemove.push(domStyle);
			}
			if(newList) {
				var newStyles = listToStyles(newList);
				addStylesToDom(newStyles, options);
			}
			for(var i = 0; i < mayRemove.length; i++) {
				var domStyle = mayRemove[i];
				if(domStyle.refs === 0) {
					for(var j = 0; j < domStyle.parts.length; j++)
						domStyle.parts[j]();
					delete stylesInDom[domStyle.id];
				}
			}
		};
	}
	
	function addStylesToDom(styles, options) {
		for(var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];
			if(domStyle) {
				domStyle.refs++;
				for(var j = 0; j < domStyle.parts.length; j++) {
					domStyle.parts[j](item.parts[j]);
				}
				for(; j < item.parts.length; j++) {
					domStyle.parts.push(addStyle(item.parts[j], options));
				}
			} else {
				var parts = [];
				for(var j = 0; j < item.parts.length; j++) {
					parts.push(addStyle(item.parts[j], options));
				}
				stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
			}
		}
	}
	
	function listToStyles(list) {
		var styles = [];
		var newStyles = {};
		for(var i = 0; i < list.length; i++) {
			var item = list[i];
			var id = item[0];
			var css = item[1];
			var media = item[2];
			var sourceMap = item[3];
			var part = {css: css, media: media, sourceMap: sourceMap};
			if(!newStyles[id])
				styles.push(newStyles[id] = {id: id, parts: [part]});
			else
				newStyles[id].parts.push(part);
		}
		return styles;
	}
	
	function insertStyleElement(options, styleElement) {
		var head = getHeadElement();
		var lastStyleElementInsertedAtTop = styleElementsInsertedAtTop[styleElementsInsertedAtTop.length - 1];
		if (options.insertAt === "top") {
			if(!lastStyleElementInsertedAtTop) {
				head.insertBefore(styleElement, head.firstChild);
			} else if(lastStyleElementInsertedAtTop.nextSibling) {
				head.insertBefore(styleElement, lastStyleElementInsertedAtTop.nextSibling);
			} else {
				head.appendChild(styleElement);
			}
			styleElementsInsertedAtTop.push(styleElement);
		} else if (options.insertAt === "bottom") {
			head.appendChild(styleElement);
		} else {
			throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");
		}
	}
	
	function removeStyleElement(styleElement) {
		styleElement.parentNode.removeChild(styleElement);
		var idx = styleElementsInsertedAtTop.indexOf(styleElement);
		if(idx >= 0) {
			styleElementsInsertedAtTop.splice(idx, 1);
		}
	}
	
	function createStyleElement(options) {
		var styleElement = document.createElement("style");
		styleElement.type = "text/css";
		insertStyleElement(options, styleElement);
		return styleElement;
	}
	
	function createLinkElement(options) {
		var linkElement = document.createElement("link");
		linkElement.rel = "stylesheet";
		insertStyleElement(options, linkElement);
		return linkElement;
	}
	
	function addStyle(obj, options) {
		var styleElement, update, remove;
	
		if (options.singleton) {
			var styleIndex = singletonCounter++;
			styleElement = singletonElement || (singletonElement = createStyleElement(options));
			update = applyToSingletonTag.bind(null, styleElement, styleIndex, false);
			remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true);
		} else if(obj.sourceMap &&
			typeof URL === "function" &&
			typeof URL.createObjectURL === "function" &&
			typeof URL.revokeObjectURL === "function" &&
			typeof Blob === "function" &&
			typeof btoa === "function") {
			styleElement = createLinkElement(options);
			update = updateLink.bind(null, styleElement);
			remove = function() {
				removeStyleElement(styleElement);
				if(styleElement.href)
					URL.revokeObjectURL(styleElement.href);
			};
		} else {
			styleElement = createStyleElement(options);
			update = applyToTag.bind(null, styleElement);
			remove = function() {
				removeStyleElement(styleElement);
			};
		}
	
		update(obj);
	
		return function updateStyle(newObj) {
			if(newObj) {
				if(newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap)
					return;
				update(obj = newObj);
			} else {
				remove();
			}
		};
	}
	
	var replaceText = (function () {
		var textStore = [];
	
		return function (index, replacement) {
			textStore[index] = replacement;
			return textStore.filter(Boolean).join('\n');
		};
	})();
	
	function applyToSingletonTag(styleElement, index, remove, obj) {
		var css = remove ? "" : obj.css;
	
		if (styleElement.styleSheet) {
			styleElement.styleSheet.cssText = replaceText(index, css);
		} else {
			var cssNode = document.createTextNode(css);
			var childNodes = styleElement.childNodes;
			if (childNodes[index]) styleElement.removeChild(childNodes[index]);
			if (childNodes.length) {
				styleElement.insertBefore(cssNode, childNodes[index]);
			} else {
				styleElement.appendChild(cssNode);
			}
		}
	}
	
	function applyToTag(styleElement, obj) {
		var css = obj.css;
		var media = obj.media;
	
		if(media) {
			styleElement.setAttribute("media", media)
		}
	
		if(styleElement.styleSheet) {
			styleElement.styleSheet.cssText = css;
		} else {
			while(styleElement.firstChild) {
				styleElement.removeChild(styleElement.firstChild);
			}
			styleElement.appendChild(document.createTextNode(css));
		}
	}
	
	function updateLink(linkElement, obj) {
		var css = obj.css;
		var sourceMap = obj.sourceMap;
	
		if(sourceMap) {
			// http://stackoverflow.com/a/26603875
			css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
		}
	
		var blob = new Blob([css], { type: "text/css" });
	
		var oldSrc = linkElement.href;
	
		linkElement.href = URL.createObjectURL(blob);
	
		if(oldSrc)
			URL.revokeObjectURL(oldSrc);
	}


/***/ }),

/***/ 31:
/***/ (function(module, exports) {

	module.exports = jQuery;

/***/ }),

/***/ 151:
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	
	// 依赖
	
	var AudioPlayer = __webpack_require__(152);
	
	ReactDOM.render(React.createElement(AudioPlayer, { src: "http://www.runoob.com/try/demo_source/movie.mp4" }), document.getElementById('container'));

/***/ }),

/***/ 152:
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	/**
	 * version:0.1.4
	 * 参考
	 * http://www.epooll.com/archives/422/
	 * 0.1.1
	 * 	自适应布局
	 * 0.1.2
	 * 	增加点击定位
	 * 0.1.3
	 * 	移动的球定位到中心
	 * 0.1.4
	 * 	音量的BUG
	 * 	可用video和audio
	 */
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	__webpack_require__(153);
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var $ = __webpack_require__(31);
	
	var AudioPlayer = function (_React$Component) {
		_inherits(AudioPlayer, _React$Component);
	
		function AudioPlayer() {
			_classCallCheck(this, AudioPlayer);
	
			var _this = _possibleConstructorReturn(this, (AudioPlayer.__proto__ || Object.getPrototypeOf(AudioPlayer)).apply(this, arguments));
	
			_this.state = {
				playStatus: 'stop',
				muteStatus: 'nomute',
				totleTime: 0,
				thisTime: 0,
				volume: 1,
				error: true
			};
	
			var me = _this;
			var state = me.state,
			    props = me.props;
	
			state.muteStatus = props.muted ? 'mute' : 'nomute';
			return _this;
		}
	
		_createClass(AudioPlayer, [{
			key: 'render',
			value: function render() {
				var me = this;
				var props = me.props,
				    state = me.state;
	
				return React.createElement(
					'div',
					{ className: 'audio-player', style: { width: props.width } },
					props.type === 'audio' ? React.createElement('audio', { src: props.src, width: '100%', ref: 'audio', loop: props.loop, autoPlay: props.autoPlay, muted: props.muted }) : React.createElement('video', { src: props.src, width: '100%', ref: 'audio', loop: props.loop, autoPlay: props.autoPlay, muted: props.muted }),
					state.error ? React.createElement('div', { className: 'mark' }) : void 0,
					React.createElement(
						'table',
						{ width: props.audioWidth, height: props.audioHeight },
						React.createElement(
							'tbody',
							null,
							React.createElement(
								'tr',
								null,
								React.createElement(
									'td',
									{ width: '40' },
									me.renderToggle()
								),
								React.createElement(
									'td',
									{ width: props.timeWidth },
									React.createElement(
										'span',
										{ className: 'show-time', style: { width: props.timeWidth + 'px' } },
										me.parseSecond(state.thisTime),
										' / ',
										me.parseSecond(state.totleTime)
									)
								),
								React.createElement(
									'td',
									null,
									React.createElement(
										'span',
										{ className: 'ctr-progress', ref: 'progress', 'data-target': 'progress', onClick: me.changeBar.bind(me, 'music') },
										React.createElement('span', { className: 'ch-light', style: { width: me.computeBarLeft() + 6 + 'px' } }),
										React.createElement('i', { className: 'ctr-bar', onMouseDown: me.moveBar.bind(me, 'music'),
											onClick: me.stopClick,
											style: { left: me.computeBarLeft() + 'px' } })
									)
								),
								React.createElement(
									'td',
									{ width: '40' },
									me.renderMute()
								),
								React.createElement(
									'td',
									{ width: props.volumeWidth + 10 },
									React.createElement(
										'span',
										{ className: 'ctr-volume-progress', 'data-target': 'progress', onClick: me.changeBar.bind(me, 'volume') },
										React.createElement('span', { className: 'ch-light', style: { width: me.computeVolBarLeft() + 6 + 'px' } }),
										React.createElement('i', { className: 'ctr-bar', onMouseDown: me.moveBar.bind(me, 'volume'),
											onClick: me.stopClick,
											style: { left: me.computeVolBarLeft() + 'px' } })
									)
								),
								React.createElement(
									'td',
									{ width: '10' },
									' '
								)
							)
						)
					)
				);
			}
		}, {
			key: 'renderToggle',
			value: function renderToggle() {
				var me = this;
				var state = me.state,
				    props = me.props;
	
				return React.createElement(
					'div',
					null,
					state.playStatus === 'stop' ? React.createElement('i', { className: 'btn-switch btn-stop', onClick: state.error ? null : me.changePlayStatus.bind(me, 'start') }) : React.createElement('i', { className: 'btn-switch btn-start', onClick: state.error ? null : me.changePlayStatus.bind(me, 'stop') })
				);
			}
		}, {
			key: 'renderMute',
			value: function renderMute() {
				var me = this;
				var state = me.state,
				    props = me.props;
	
				return React.createElement(
					'span',
					{ className: 'ctr-speaker-box' },
					state.muteStatus === 'mute' || state.volume === 0 ? React.createElement(
						'span',
						{ className: 'ctr-speaker ctr-mute', onClick: me.muteAudio.bind(me, 'nomute') },
						React.createElement('i', { className: 'ch-img1' }),
						React.createElement('i', { className: 'ch-img2' })
					) : React.createElement(
						'span',
						{ className: 'ctr-speaker', onClick: me.muteAudio.bind(me, 'mute') },
						React.createElement('i', { className: 'ch-img1' }),
						React.createElement('i', { className: 'ch-img2' })
					)
				);
			}
		}, {
			key: 'computeBarLeft',
			value: function computeBarLeft() {
				var me = this;
				var state = me.state,
				    props = me.props,
				    refs = me.refs;
				var progress = refs.progress;
	
				if (progress) {
					return progress.offsetWidth * state.thisTime / state.totleTime - 6;
				} else {
					return -6;
				};
			}
		}, {
			key: 'computeVolBarLeft',
			value: function computeVolBarLeft() {
				var me = this;
				var state = me.state,
				    props = me.props;
	
				if (state.muteStatus === 'mute') {
					return -6;
				} else {
					return props.volumeWidth * state.volume - 6;
				};
			}
		}, {
			key: 'componentDidMount',
			value: function componentDidMount() {
				var me = this;
				var refs = me.refs;
				var audio = refs.audio;
	
				me.audio = audio;
				// 绑定事件
				['canplay', 'playing', 'pause', 'volumechange'].forEach(function (val) {
					audio['on' + val] = me['audio' + val.replace(/\w/, function (s) {
						return s.toUpperCase();
					})].bind(me);
				});
				window.audioEx = audio;
			}
		}, {
			key: 'componentWillReceiveProps',
			value: function componentWillReceiveProps() {
				var me = this;
				me.shouldNotUpdate = true;
			}
		}, {
			key: 'shouldComponentUpdate',
			value: function shouldComponentUpdate() {
				var me = this;
				var shouldNotUpdate = me.shouldNotUpdate;
				if (shouldNotUpdate) {
					me.shouldNotUpdate = false;
				};
				return !shouldNotUpdate;
			}
		}, {
			key: 'changeBar',
			value: function changeBar(key, e) {
				var me = this;
				var target = e.target;
				var thisTarget = $(target).closest('[data-target="progress"]');
				var tarWidth = thisTarget.width();
				var thisX = e.clientX - thisTarget.offset().left;
				var scale = thisX / tarWidth;
				if (key === 'volume') {
					me.changeVolume(scale);
				};
				if (key === 'music') {
					me.changeMusic(scale);
				};
			}
		}, {
			key: 'stopClick',
			value: function stopClick(e) {
				e.preventDefault();
				e.stopPropagation();
			}
			/**
	   * 移动球的时候控制 volume
	   * 点击禁音是偶控制 muted
	   */
			// 移动球 DOM操作
	
		}, {
			key: 'moveBar',
			value: function moveBar(key, e) {
				var me = this;
				var audio = me.audio,
				    props = me.props;
	
				var target = e.target;
				var tarWidth = target.offsetWidth;
				var parent = target.parentNode;
				var parWidth = parent.offsetWidth;
				var mouseOffsetX = e.clientX;
				var barLeft = parseInt(target.style.left || 0);
				var min = 0;
				var max = parWidth;
				var isPaused = audio.paused;
				var scale = null;
				if (key === 'music') {
					if (!isPaused) {
						me.isMoveBar = true;
						audio.pause();
					};
				};
	
				document.onmousemove = function (e) {
					e.preventDefault();
					e.stopPropagation();
					var diffX = e.clientX - mouseOffsetX;
					var thisX = barLeft + diffX + 6;
					if (thisX < min) {
						thisX = min;
					} else if (thisX > max) {
						thisX = max;
					}
					scale = thisX / max;
					if (key === 'volume') {
						me.changeVolume(scale);
					};
					if (key === 'music') {
						me.changeMusic(scale);
					};
				};
				document.onmouseup = function (e) {
					e.preventDefault();
					e.stopPropagation();
					document.onmousemove = document.onmouseup = null;
					if (key === 'music') {
						if (!isPaused) {
							delete me.isMoveBar;
							if (scale !== 1) {
								audio.play();
							} else {
								if (props.loop) {
									audio.play();
								} else {
									me.audioPause();
								};
							};
						};
					};
				};
			}
			// 开始暂停音乐
	
		}, {
			key: 'changePlayStatus',
			value: function changePlayStatus(key) {
				var me = this;
				var audio = me.audio;
	
				if (key === 'start') {
					audio.play();
				} else {
					audio.pause();
				};
			}
			// 改变音轨
	
		}, {
			key: 'changeMusic',
			value: function changeMusic(val) {
				var me = this;
				var audio = me.audio,
				    state = me.state;
	
				state.thisTime = audio.currentTime = val * state.totleTime;
				me.setState(state);
			}
			// 改变音量
	
		}, {
			key: 'changeVolume',
			value: function changeVolume(val) {
				var me = this;
				var audio = me.audio,
				    state = me.state;
	
				audio.volume = +val.toFixed(2);
				if (audio.volume) {
					audio.muted = false;
				};
			}
			// 音量变化
	
		}, {
			key: 'audioVolumechange',
			value: function audioVolumechange() {
				var me = this;
				var state = me.state,
				    audio = me.audio;
	
				state.volume = audio.volume;
				state.muteStatus = audio.muted ? 'mute' : 'nomute';
				me.setState(state);
			}
			// 禁音
	
		}, {
			key: 'muteAudio',
			value: function muteAudio(key) {
				var me = this;
				var audio = me.audio,
				    state = me.state;
	
				if (key === 'mute') {
					audio.muted = true;
				} else {
					audio.muted = false;
				};
			}
			// 暂停
	
		}, {
			key: 'audioPause',
			value: function audioPause() {
				var me = this;
				var state = me.state;
	
				clearInterval(me.timeoutId);
				if (!me.isMoveBar) {
					state.playStatus = 'stop';
				};
				me.setState(state);
			}
			// 播放中
	
		}, {
			key: 'audioPlaying',
			value: function audioPlaying() {
				var me = this;
				var state = me.state,
				    audio = me.audio;
	
				state.playStatus = 'start';
				delete me.musicEnd;
				clearInterval(me.timeoutId);
				me.timeoutId = setInterval(function () {
					var state = me.state;
					state.thisTime = audio.currentTime;
					me.setState(state);
				}, 1000);
				me.setState(state);
			}
			// 音频准备就绪
	
		}, {
			key: 'audioCanplay',
			value: function audioCanplay() {
				var me = this;
				var state = me.state,
				    audio = me.audio,
				    props = me.props;
	
				state.error = false;
				state.totleTime = audio.duration;
				me.changeVolume(state.volume);
				me.setState(state);
			}
			// 事件转换 把秒格式化为分
	
		}, {
			key: 'parseSecond',
			value: function parseSecond(second) {
				var min = Math.floor(second / 60);
				var sec = Math.floor(second % 60);
				sec = ('00' + sec).slice(-2);
				return min + ':' + sec;
			}
		}]);
	
		return AudioPlayer;
	}(React.Component);
	
	AudioPlayer.defaultProps = {
		loop: true,
		autoPlay: true,
		muted: false,
		width: 400,
		audioWidth: '100%',
		audioHeight: '32',
		volumeWidth: 50,
		progressWidth: 90,
		timeWidth: 60,
		type: 'vido'
	};
	
	
	module.exports = AudioPlayer;

/***/ }),

/***/ 153:
/***/ (function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(154);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(12)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../../../node_modules/css-loader/index.js!./../../../../node_modules/less-loader/index.js!./style.less", function() {
				var newContent = require("!!./../../../../node_modules/css-loader/index.js!./../../../../node_modules/less-loader/index.js!./style.less");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ }),

/***/ 154:
/***/ (function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(11)();
	// imports
	
	
	// module
	exports.push([module.id, ".audio-player {\n  text-align: left;\n  background: #fafafa;\n  position: relative;\n}\n.audio-player table td {\n  vertical-align: middle;\n  text-align: center;\n  padding: 5px;\n  position: relative;\n}\n.audio-player .mark {\n  position: absolute;\n  width: 100%;\n  height: 100%;\n  left: 0;\n  top: 0;\n  background: rgba(255, 255, 255, 0.5);\n  z-index: 1;\n}\n.audio-player .btn-switch {\n  display: inline-block;\n  width: 12px;\n  height: 14px;\n  overflow: hidden;\n}\n.audio-player .btn-switch.btn-start:before,\n.audio-player .btn-switch.btn-start:after {\n  content: '';\n  float: left;\n  width: 4px;\n  height: 100%;\n  background: #5a5a5a;\n}\n.audio-player .btn-switch.btn-start:after {\n  float: right;\n}\n.audio-player .btn-switch.btn-stop:before {\n  content: '';\n  float: left;\n  width: 0;\n  height: 0;\n  border-top: 7px solid #fafafa;\n  border-bottom: 7px solid #fafafa;\n  border-left: 12px solid #5a5a5a;\n  border-right: 0;\n}\n.audio-player .show-time {\n  display: inline-block;\n  color: #5a5a5a;\n}\n.audio-player .ctr-progress {\n  display: inline-block;\n  width: 100%;\n  height: 100%;\n  position: relative;\n  text-align: left;\n}\n.audio-player .ctr-progress:before {\n  content: '';\n  position: absolute;\n  width: 100%;\n  height: 2px;\n  top: 50%;\n  margin-top: -1px;\n  background: #dadada;\n}\n.audio-player .ctr-progress .ch-light {\n  position: absolute;\n  height: 2px;\n  top: 50%;\n  margin-top: -1px;\n  background: #4285f4;\n}\n.audio-player .ctr-volume-progress {\n  display: inline-block;\n  width: 100%;\n  height: 100%;\n  position: relative;\n  text-align: left;\n}\n.audio-player .ctr-volume-progress:before {\n  content: '';\n  position: absolute;\n  width: 100%;\n  height: 2px;\n  top: 50%;\n  margin-top: -1px;\n  background: #dadada;\n}\n.audio-player .ctr-volume-progress .ch-light {\n  position: absolute;\n  height: 2px;\n  top: 50%;\n  margin-top: -1px;\n  background: #4285f4;\n}\n.audio-player .ctr-bar {\n  position: absolute;\n  width: 12px;\n  height: 12px;\n  border-radius: 12px;\n  background: #4285f4;\n  top: 50%;\n  margin-top: -6px;\n}\n.audio-player .ctr-speaker-box {\n  display: inline-block;\n}\n.audio-player .ctr-speaker {\n  width: 18px;\n  height: 18px;\n  display: inline-block;\n  position: relative;\n  overflow: hidden;\n}\n.audio-player .ctr-speaker .ch-img1 {\n  float: left;\n  width: 9px;\n  height: 100%;\n  position: relative;\n  overflow: hidden;\n}\n.audio-player .ctr-speaker .ch-img1:before {\n  content: '';\n  float: left;\n  border-top: 9px solid #fafafa;\n  border-bottom: 9px solid #fafafa;\n  border-right: 10px solid #5a5a5a;\n  border-left: 0;\n}\n.audio-player .ctr-speaker .ch-img1:after {\n  content: '';\n  position: absolute;\n  width: 6px;\n  height: 6px;\n  background: #5a5a5a;\n  left: 0;\n  top: 50%;\n  margin-top: -3px;\n}\n.audio-player .ctr-speaker .ch-img2 {\n  float: right;\n  width: 7px;\n  height: 100%;\n  overflow: hidden;\n  position: relative;\n}\n.audio-player .ctr-speaker .ch-img2:before {\n  content: '';\n  position: absolute;\n  right: 0;\n  width: 18px;\n  height: 18px;\n  border: 2px solid #5a5a5a;\n  border-radius: 100px;\n}\n.audio-player .ctr-speaker .ch-img2:after {\n  content: '';\n  position: absolute;\n  right: 4px;\n  width: 8px;\n  height: 8px;\n  top: 50%;\n  margin-top: -4px;\n  border-radius: 100px;\n  background: #5a5a5a;\n}\n.audio-player .ctr-speaker.ctr-mute:after {\n  content: '';\n  position: absolute;\n  width: 24px;\n  height: 4px;\n  background: #5a5a5a;\n  border-top: 2px solid #fafafa;\n  top: 6px;\n  left: -2px;\n  transform: rotate(45deg);\n}\n", ""]);
	
	// exports


/***/ })

/******/ });
//# sourceMappingURL=main.js.map