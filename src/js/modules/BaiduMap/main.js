"use strict";
/**
 * 组件类
 */
define(function(require, exports, module) {

	// 依赖
	var Widget = require('widget');

	// 类	
	var BaiduMap = Widget.extend({
		// 类名
		className: 'BaiduMap',
		// 属性
		attrs: {
			// 地图中心，默认是北京
			mapCenter: [116.404, 39.915],
			// 地图大小
			mapZoom: 10,
			// 地图标记
			mapMarks: [],
			// 自动切换视野 默认为true 设置了这个就会忽略 mapCenter mapZoom 这两个属性
			autoViewport: true 
		},
		// 初始化
		initProps: function(){
			var me = this,
				id = me.element.prop('id');
			// 异常
			if(!id) me.log('element 未定义 id 属性');
			// 初始化百度地图
			me.map = new BMap.Map(id);

		},
		// 运行
		setup: function(){
			var me = this;
			// 构建基础地图
			me.initMap();
			// 设置标记
			me.initMarks();

		},
		// 构建基础地图
		initMap: function(){
			var me = this,
				map = me.map,
				mapCenter = me.get('mapCenter');
			
			// 初始化地图中心
			map.centerAndZoom( new BMap.Point( mapCenter[0], mapCenter[1] ), me.get('mapZoom') );
			// 增加鼠标控制
			map.enableScrollWheelZoom();
			// 增加缩放控件
			map.addControl( new BMap.NavigationControl() );

			return me;
		},
		// 设置标记
		initMarks: function(){
			var me = this,
				map = me.map,
				labels = [],
				mapLabelStyle = {
					'borderColor': '#F00',
					'padding': '5px',
					'borderRadius': '3px',
					'boxShadow': '2px 2px 5px rgba(0,0,0,.3)',
					'cursor': 'default'
				},
				points = [];

			// 初始化标记
			me.breakEachArr(me.get('mapMarks'), function(val){
				var point = new BMap.Point(val.point[0], val.point[1]),
					marker = new BMap.Marker( point ),
					label = new BMap.Label([val.name, val.time, val.mark].join('<br />'), { offset: new BMap.Size(15, val.mark ? -55 : -40) });
				points.push(point);
				// 设置样式
				label.setStyle(mapLabelStyle);
				marker.setLabel(label);
				// 初始化是隐藏的
				labels.push(label);
				label.hide();
				// 放到地图当中
				map.addOverlay( marker );
				// 增加事件
				marker.addEventListener('click', function(){
					// 其他
					!label.Da && me.breakEachArr(labels, function(val){
						// 如果当前是隐藏
						 label !== val && val.hide();
					});
					// 当前
					label[label.Da ? 'hide' : 'show']();
				});
				// 默认显示
				val.defaultShow && map.addEventListener('tilesloaded', function main(){
					map.removeEventListener('tilesloaded', main);
					label.show();
				});
			});
			me.get('autoViewport') && map.setViewport(points);

			return me;
		}

	});

	// 接口
	module.exports = BaiduMap;

});