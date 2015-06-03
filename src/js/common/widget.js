"use strict";
/**
 * 2014.05.28
 * 组件类。
 * version: 1.0.0
 */
define(function(require, exports) {

	//依赖
	var Base = require('base'),
		$ = require('$');

	//变量
	var cid = 0,
		widgetEventsNS = 'widgetEvents',
		DOC = document,
		BODY = DOC.body;

	//类
	var Widget = Base.extend({
		attrs: {
			//触发器
			trigger: null,
			//DOM节点
			element: null,
			//委派事件
			events: null,
			//基础属性
			id: null,
			className: null,
			style: null,
			//模板
			template: '<div></div>',
			//数据
			model: null,
			//父节点
			parentNode: BODY
		},
		init: function(config){
			var me = this;
			//属性的初始化
			Widget.superClass.init.call(me, config);
			//构建element
			me.parseElement();
			//渲染属性
			me.renderAttr();
			//绑定事件
			me.delegateEvents();
			//返回this
			return me;
		},
		//销毁
		destroy: function(){
			var me = this;
			//解绑事件
			me.undelegateEvents();
			//销毁DOM
			me.get('widgetIsTemplate') && me.get('element').remove();
			//销毁对象
			Widget.superClass.destroy.call(me);
			return me;
		},
		//构建element
		parseElement: function(){
			var me = this,
				element = me.get('element');
			//如果没有指向element那就去寻找模板
			if(element === null){
				element = $(me.get('template'));
				//增加标示
				me.set('widgetIsTemplate', true);
			}else{
				element = $(element);
			}
			//如果element构建失败就抛出错误
			if(element.length === 0){
				me.log('element构建失败。');
			}
			me.set('element', element);
			return me;
		},
		//增加属性
		renderAttr: function(){
			var me = this,
				element = me.get('element'),
				id = me.get('id'),
				className = me.get('className'),
				style = me.get('style');
			//属性的添加
			id && element.prop('id', id);
			className && element.addClass(className);
			style && element.css(style);
			//标记
			element.attr('widget-cid', cid++);
			return me;
		},
		//渲染DOM
		render: function(){
			var me = this,
				element = me.get('element'),
				elementDom = element[0],
				parentNode = $(me.get('parentNode'));
			me.set('parentNode', parentNode);
			//如果element不在body标签里面需要渲染
			if( elementDom && !$.contains(BODY, elementDom) ){
				parentNode.append(element);
			}
			return me;
		},
		//委派事件
		delegateEvents: function(){
			var me = this,
				events = me.get('events'),
				element = me.get('element');
			if(events){
				me.breakEachObj(events, function(val, key){
					var key = key.split(' '),
						val = typeof val === 'function' ? val : me.get(val) || me.K;
					element.on(key[0]+'.'+widgetEventsNS, key[1], function(e){
						val.call(me, this, e);
					});
				});
			}
			return me;
		},
		//销毁事件
		undelegateEvents: function(){
			var me = this,
				events = me.get('events'),
				element = me.get('element');
			if(events){
				me.breakEachObj(events, function(val, key){
					var key = key.split(' ');
					element.off(key[0]+'.'+widgetEventsNS);
				});
			}
			return me;
		},
		//组件内遍历
		$: function(selector){
			return this.get('element').find(selector);
		},
		jQuery: $
	});
	
	
	
	//返回
	return Widget;

});