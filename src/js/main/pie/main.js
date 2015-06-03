"use strict";
/**
 * 业务
 */
define(function(require, exports, module) {

	//依赖
	var Widget = require('widget');

	//类
	var Pie = Widget.extend({
		attrs: {
			events: {
				'click path': function(node, e){
					console.log(node);
				}
			}
		},
		init: function(config){
			var me = this;
			Pie.superClass.init.call(me, config);
			me.renderSvg();
			//绘制路径0 ~ 359
			me.setPath(180);
			return me;
		},
		//SVG的渲染
		renderSvg: function(){
			var me = this,
				element = me.get('element');
			//元素:SVG
			var svg = me.jQuery( getSvgElement('svg') );
			svg.attr({
				width: 200,
				height: 200
			})
			element.append(svg);
			//元素:path
			var path = me.jQuery( getSvgElement('path') );
			path.attr('fill', 'green');
			svg.append(path)
			//存储path
			me.set('path', path);
			return me;
		},
		//设置D属性
		setPath: function(angle){
			var me = this,
				path = me.get('path');
			path.attr('d', getPathByAngle(me, ~~angle));
			return me;
		}

	});
	//初始化元素
	function getSvgElement(type){
		return document.createElementNS('http://www.w3.org/2000/svg', type);
	}
	//函数：获取D
	function getPathByAngle(me, angle){
		var arr = [],
			rad = radian(90 - angle),
			bigRaX = Math.cos( rad ) * 100 + 100,
			bigRaY = 100 - Math.sin( rad ) * 100,
			smaRaX = Math.cos( rad ) * 90 + 100,
			smaRaY = 100 - Math.sin( rad ) * 90,
			draw = angle <= 180 ? 0 : 1;
		// console.log(bigRaX, bigRaY, smaRaX, smaRaY);
		//起始点
		arr.push('M 100 0');
		//外圈点
		arr.push('A 80 80 0 '+draw+' 1 '+bigRaX+' '+bigRaY);
		//中间点
		arr.push('L '+ smaRaX +' '+smaRaY);
		//内圆点
		arr.push('A 90 90 0 '+draw+' 0 100 10');
		//闭合
		arr.push('Z');

		return arr.join(' ');
	}
	/**
	 * [radian 通过角度换算成弧度]
	 * @param  {Number} angle [角度]
	 * @return {Number}       [弧度]
	 */
	function radian(angle){
		return angle * Math.PI / 180;
	}

	new Pie({element: '#pie'});

});