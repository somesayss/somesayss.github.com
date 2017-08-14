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
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(2);


/***/ },
/* 1 */,
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _tree = __webpack_require__(3);
	
	var _tree2 = _interopRequireDefault(_tree);
	
	var _net = __webpack_require__(4);
	
	var _net2 = _interopRequireDefault(_net);
	
	var _data = __webpack_require__(5);
	
	var _data2 = _interopRequireDefault(_data);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	(0, _tree2.default)(_data2.default);
	// Net();
	// 依赖

/***/ },
/* 3 */
/***/ function(module, exports) {

	'use strict';
	
	module.exports = function (data) {
	
		var tree = window.tree = new G6.Tree({
			id: 'c1', // 容器ID
			animate: false,
			// layoutFn: G6.Layout.Dendrogram,
			height: 600, // 画布高
			fitView: 'lc', // 自动缩放
			showButton: true, // 是否显示开关
			layoutCfg: {
				direction: 'LR', // 方向（LR/RL/H/TB/BT/V）
				getHGap: function getHGap() /* d */{
					// 横向间距
					return 30;
				},
				getVGap: function getVGap() /* d */{
					// 竖向间距
					return 12;
				}
			},
			modes: {
				default: ['dragCanvas', 'collapse', 'spreadout', 'buttonPointer']
			}
		});
		tree.source(data);
	
		G6.registNode('customHtml', {
			getHtml: function getHtml(node) {
				var origin = node.origin;
				var INFO = '';
				if (origin.type === 'info') {
					INFO = '<div style="line-height:20px;background:#FFF;color:#666;">\n\t  \t\t\t' + origin.info + '\n\t  \t\t</div>\n\t  \t\t<div style="line-height:20px;background:#EEE;;color:#666;padding:0 5px;">\n\t  \t\t\t' + origin.link + '\n\t  \t\t</div>';
				};
				var DOM = G6.Util.createDOM('<div style="border-radius:3px;overflow:hidden;">\n\t    \t<div>' + (origin.label || origin.name || '') + '</div>\n\t    \t' + INFO + '\n\t    </div>');
				return DOM;
			}
		}, 'html');
	
		// 节点
		tree.node().shape('customHtml').style(function (node) {
			var height = 30;
			var width = 120;
			if (node.type === 'info') {
				height = 72;
			};
			return {
				width: width,
				height: height,
				lineWidth: 1,
				radius: 10,
				stroke: '#333',
				fill: '#259af3',
				color: '#FFF',
				fillOpacity: 1,
				lineHeight: '30px',
				textAlign: 'center'
			};
		});
	
		// 线
		tree.edge().shape('HVH').style({
			stroke: '#666'
		});
	
		// tree.addEdges({
		// 	"shape": "line",
		// 	source: 'a1',
		// 	target: 'a2'
		// });
	
		tree.render();
	
		// 事件
		tree.on('mouseEnter', function (e) {
			console.log(e);
		});
	
		// 后期追加的节点
		setTimeout(function () {
	
			// tree.addEdges([{
			// 	id: 'a11',
			// 	source: 'a2',
			// 	target: 'a1',
			// 	shape: 'smoothArrow',
			// 	style: {
			// 		stroke:'#F00'
			// 	}
			// }, {
			// 	id: 'a12',
			// 	source: 'a2',
			// 	target: 'a3',
			// 	shape: 'smoothArrow',
			// 	style: {
			// 		stroke:'#F00'
			// 	}
			// }]);
			// tree.draw();
	
			// setTimeout(() => {
			// 	tree.removeItem(tree.find('a11'));
			// 	tree.removeItem(tree.find('a12'));
			// 	tree.draw();
			// }, 1000);
	
			// tree.add('a1', {
			// 	label: 'a121'
			// });
			// tree.addEdges([{
			// 			source: 'a2',
			// 			target: 'a1'
			// 		}]);
	
			// tree.render();
			// return;
			// tree.add('a1', {
			// 	label: 'a121'
			// });
			// let line = tree.get('canvas').addShape('line', {
			//     attrs: {
			//    		x1: 20,
			// 				y1: 20,
			//       	x2: 20,
			//       	y2: 20,
			//       	lineDash: [2],
			//       	arrow: true,                                             // 显示箭头
			//       	stroke: 'red'                       // 颜色名字
			//     }
			//  	});
			// line.animate({
			// 	x1: 20,
			// 	y1: 20,
			//     x2: 280,
			//      	y2: 280,
			//      	stroke: 'red'
			// }, 1000, 'easeInOutQuart');
			// tree.get('canvas').draw();
	
		}, 1000);
	
		console.log(tree);
	
		// var canvas = new G6.Canvas({
		//     containerId: 'c1',
		//     width: 600,
		//     height: 600
		//   });
		//   canvas.scale(0.5, 0.5);
		//   canvas.addShape('line', {
		//     attrs: {
		//       x1: 20,
		//       y1: 20,
		//       x2: 280,
		//       y2: 280,
		//       stroke: 'red'                       // 颜色名字
		//     }
		//   });
		//   canvas.draw();
	};

/***/ },
/* 4 */
/***/ function(module, exports) {

	'use strict';
	
	module.exports = function () {
	
	  var canvas = new G6.Canvas({
	    containerId: 'c1',
	    width: 600,
	    height: 600
	  });
	  canvas.scale(0.5, 0.5);
	  canvas.addShape('line', {
	    attrs: {
	      x1: 20,
	      y1: 20,
	      x2: 280,
	      y2: 280,
	      stroke: 'red' // 颜色名字
	    }
	  });
	  canvas.addShape('line', {
	    attrs: {
	      x1: 20,
	      y1: 300 + 20,
	      x2: 280,
	      y2: 300 + 280,
	      arrow: true, // 显示箭头
	      stroke: '#00ff00' // 6位十六进制
	    }
	  });
	  canvas.addShape('line', {
	    attrs: {
	      x2: 300 + 20,
	      y2: 300 + 20,
	      x1: 300 + 280,
	      y1: 300 + 280,
	      arrow: true, // 显示箭头
	      stroke: '#00f' // 3位十六进制
	    }
	  });
	  canvas.addShape('line', {
	    attrs: {
	      x1: 20,
	      y1: 600 + 20,
	      x2: 280,
	      y2: 600 + 280,
	      lineDash: [10, 10],
	      stroke: 'rgb(100, 100, 200)' // rgb数字模式
	    }
	  });
	  canvas.addShape('line', {
	    attrs: {
	      x1: 300 + 20,
	      y1: 600 + 20,
	      x2: 300 + 280,
	      y2: 600 + 280,
	      lineDash: [10, 20, 10],
	      stroke: 'rgba(100, 100, 200, 0.5)' // rgba数字模式
	    }
	  });
	  canvas.addShape('line', {
	    attrs: {
	      x1: 600 + 20,
	      y1: 600 + 20,
	      x2: 600 + 280,
	      y2: 600 + 280,
	      lineDash: [50, 50],
	      stroke: 'rgb(34%, 85%, 48%)' // rgb百分比模式
	    }
	  });
	  canvas.addShape('line', {
	    attrs: {
	      x1: 900 + 20,
	      y1: 600 + 20,
	      x2: 900 + 280,
	      y2: 600 + 280,
	      lineDash: [50, 5, 50, 5],
	      stroke: 'rgba(34%, 85%, 48%, 0.5)' // rgba百分比模式
	    }
	  });
	  canvas.addShape('line', {
	    attrs: {
	      x1: 20,
	      y1: 900 + 20,
	      x2: 280,
	      y2: 900 + 280,
	      stroke: 'l (0) 0:#ff0000 1:#0000ff' // 线性渐变
	    }
	  });
	  canvas.addShape('line', {
	    attrs: {
	      x1: 300 + 20,
	      y1: 900 + 20,
	      x2: 300 + 280,
	      y2: 900 + 280,
	      stroke: 'r (0.5, 0.5, 0) 0:rgb(0, 0, 255) 1:#ff0000' // 迳向渐变
	    }
	  });
	  canvas.draw();
	};

/***/ },
/* 5 */
/***/ function(module, exports) {

	'use strict';
	
	module.exports = {
		label: '应用名称',
		id: 'a2',
		children: [{
			label: '模块名称',
			children: [{
				label: 'modulesService',
				children: [{
					label: '领域',
					children: [{
						type: 'info',
						name: 'DommainServer',
						info: '百度',
						link: 'http://www.baidu.com',
						children: [{
							type: 'info',
							name: 'DommainServer',
							info: '百度',
							link: 'http://www.baidu.com'
						}, {
							label: 'lavaBo',
							id: 'a1'
						}, {
							label: 'lavaBo'
	
						}]
					}, {
						type: 'info',
						name: 'DommainServer',
						info: '百度',
						link: 'http://www.baidu.com'
					}, {
						type: 'info',
						name: 'Function',
						info: '百度',
						link: 'http://www.baidu.com'
					}, {
						type: 'info',
						name: 'Function',
						info: '百度',
						link: 'http://www.baidu.com'
					}]
				}, {
					label: '领域',
					id: 'a3'
				}, {
					type: 'info',
					name: 'Function',
					info: '百度',
					link: 'http://www.baidu.com'
				}]
			}, {
				label: 'modulesService',
				children: [{
					label: '领域'
				}, {
					label: '领域'
				}, {
					type: 'info',
					name: 'Function',
					info: '淘宝',
					link: 'http://www.taobao.com'
				}]
			}]
		}, {
			label: '模块名称',
			children: [{}, {}]
		}]
	};

/***/ }
/******/ ]);
//# sourceMappingURL=main.js.map