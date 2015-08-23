"use strict";
/**
 * 圆环类
 */
define(function(require, exports, module) {

	//依赖
	var Widget = require('widget');

	//类
	var Pie = Widget.extend({
		attrs: {
			//半径
			radius: 20,
			//偏差
			diffRadius: 1,
			//背景颜色
			backgroundColor: '#F2F2F2',
			//颜色
			color: 'green',
			//字体大小
			fontSize: 12
		},
		//类名
		className: 'Pie',
		//入口
		setup: function(){
			var me = this;
			return me.initSvg();
		},
		//销毁
		destroy: function(){
			var me = this;
			me.get('svg').remove();
			Pie.superClass.destroy.call(me);
			return me;
		},
		//SVG的渲染
		initSvg: function(){
			var me = this,
				radius = me.get('radius'),
				widthHeiht = radius * 2;
			//元素:SVG
			var svg = me.jQuery( getSvgElement('svg') );
			svg.attr({
				'width': widthHeiht,
				'height': widthHeiht
			})
			me.element.append(svg);
			//背景圆环
			me.setPath( 100, renderPath( svg, me, me.get('backgroundColor') ) );
			//存储
			me.set('svg', svg);
			me.set( 'path', renderPath( svg, me, me.get('color') ) );
			me.set( 'text', renderText( svg, me, me.get('color') ) );
			return me;
		},
		//设置D属性
		setPath: function(per, target){
			var me = this,
				path = target || me.get('path');
			if(0 <= per && per <= 100){
				path.attr('d', getPathByAngle(me, per/100 * 359.99));
				!target && me.get('text').text(per);
			}else{
				me.log('百分比大于100，或者小于0。');
			}
			return me;
		}
	});
	//构建元素Path
	function renderPath(svg, me, color){
		var path = me.jQuery( getSvgElement('path') );
		path.attr('fill', color);
		svg.append(path);
		return path;
	}
	//构建文字
	function renderText(svg, me, color){
		var text = me.jQuery( getSvgElement('text') ),
			fontSize = me.get('fontSize'),
			radius = me.get('radius');
		text.attr({
			'fill': color,
			'x': radius,
			'y': radius,
			'dy': fontHeight(fontSize),
			'text-anchor': 'middle',
			'font-size': fontSize + 'px',
			'opacity': .7
		});
		svg.append(text);
		return text;
	}
	//获取字体大小和高度
	function fontHeight(size){
		return (size - size * 2 / 10)/2;
	}
	//初始化元素
	function getSvgElement(type){
		return document.createElementNS('http://www.w3.org/2000/svg', type);
	}
	//函数：获取D
	function getPathByAngle(me, angle){
		var arr = [],
			radius = me.get('radius'),
			diffRadius = me.get('diffRadius'),
			smallRadius = radius - diffRadius,
			rad = radian(90 - angle),
			bigRaX = Math.cos( rad ) * radius + radius,
			bigRaY = radius - Math.sin( rad ) * radius,
			smaRaX = Math.cos( rad ) * smallRadius + radius,
			smaRaY = radius - Math.sin( rad ) * smallRadius,
			draw = angle <= 180 ? 0 : 1;
		//起始点
		arr.push('M '+radius+' 0');
		//外圈点
		arr.push('A '+radius+' '+radius+' 0 '+draw+' 1 '+bigRaX+' '+bigRaY);
		//中间点
		arr.push('L '+ smaRaX +' '+smaRaY);
		//内圆点
		arr.push('A '+smallRadius+' '+smallRadius+' 0 '+draw+' 0 '+radius+' '+diffRadius);
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

	return Pie;
});