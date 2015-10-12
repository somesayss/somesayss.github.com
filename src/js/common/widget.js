"use strict";
/**
 * 2014.05.28
 * 组件类。
 * version: 1.0.0
 * 2015,06,14 
 * 	1. 修改attrs中events里面的回调找的是this里面的函数而不是attrs里面的函数
 *  2. 对于element的data-xxx属性可以进行config的设置
 * 2015,06,22
 *  1. events可以继承父级
 * 	2. 对element的data-xxx属性进行遍历，进行config的设置
 * 2015,06,28
 * 	1. 对data自持更多
 * 	2. 如果element是模板构建的，如果存在triiger就把attr指向trigger
 * 2015,07,20
 * 	1. 事件委派的功能增强
 * 2015,08,01
 * 	1. 事件的绑定命名空间增加了CID
 * 	2. 增加静态属性query获取组件
 * 	3. 正确的销毁组件
 */
define(function(require, exports) {

	//依赖
	var Base = require('base'),
		$ = require('$'),
		domUtil = require('common/domUtil');

	//变量
	var cid = 0,
		widgetEventsNS = '.widgetEvents',
		DOC = document,
		BODY = DOC.body,
		cacheWidget = {}, //存储组件的地方
		REX_DATA = /^data((?:-.+)+)$/,	//严格匹配 data-a-b 只能一个"-"小写 这个有点弱
		REX_FIRST = /-([a-z])/g;// -a--b => a-B; -a-_b => a_b

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
			//父节点
			parentNode: BODY
		},
		//类名
		className: 'Widget',
		//初始化
		init: function(config){
			var me = this;
			//属性的初始化
			Widget.superClass.init.call(me, config);
			//构建element
			me.parseElement();
			//对element上的属性进行解析然后设置属性
			me.parseElementAttr();
			//构建triggerNode
			me.parseTrigger();
			//解析Trigger上的属性
			me.parseTriggerAttr();
			//初始化widgetID
			me.widgetCid = '' + cid++;
			//存储组件
			cacheWidget['widgetCid'+me.widgetCid] = me;
			//构建私有属性
			me.initProps();
			//渲染属性
			me.renderAttr();
			//入口
			me.setup();
			//初始化事件
			me.initEvents();
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
			me.widgetIsTemplate && me.element.remove();
			//销毁组件对象
			destroyWidget(me);
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
				me.widgetIsTemplate = true;
			}else{
				element = $(element);
			}

			//如果element构建失败就抛出错误
			if(element.length === 0){
				me.limit.log('element构建失败。');
			}

			me.element = element;
			return me;
		},
		//解析element上的属性
		parseElementAttr: function(){
			return parseAttr(this, this.element);
		},
		//构建triggerNode
		parseTrigger: function(){
			var me = this,
				triggerNode = $(me.get('trigger'));
			if(triggerNode.length){
				me.triggerNode = triggerNode;
			}
			return me;
		},
		//解析Trigger上的属性
		parseTriggerAttr: function(){
			var me = this,
				triggerNode = me.triggerNode;
			if(triggerNode && me.widgetIsTemplate){
				return parseAttr(this, triggerNode);
			}else{
				return me;
			}
		},
		//构建私有属性
		initProps: Base.limit.K,
		//入口
		setup: Base.limit.K,
		//增加属性
		renderAttr: function(){
			var me = this,
				element = me.element,
				id = me.get('id'),
				className = me.get('className'),
				widgetCid = element.attr('widget-cid'),
				style = me.get('style');
			//属性的添加
			id && element.prop('id', id);
			className && element.addClass(className);
			style && element.css(style);
			//标记
			element.attr('widget-cid', widgetCid ? widgetCid + ',' + me.widgetCid : me.widgetCid);
			return me;
		},
		//渲染DOM
		render: function(){
			var me = this,
				element = me.element,
				elementDom = element[0],
				parentNode = $(me.get('parentNode'));
			me.set('parentNode', parentNode);
			//如果element不在body标签里面需要渲染
			if( elementDom && !$.contains(BODY, elementDom) ){
				parentNode.append(element);
			}
			return me;
		},
		initEvents: function(){
			var me = this,
				attrsEvents = me.get('events'),
				recursiveEvents = me.recursiveAttrs('events'),
				events = recursiveEvents.origin,
				eventsArr = recursiveEvents.arr;
			me.limit.each(attrsEvents, function(val, key){
				!events[key] && eventsArr.push(key);
			});
			me.set('events',  me.limit.extend( recursiveEvents.origin, attrsEvents ) );
			me.set('eventsArr', eventsArr);
			return me;
		},
		//委派事件
		//1.delegateEvents(); 2.delegateEvents({...}); 3.delegateEvents(ele, {...});
		delegateEvents: function(element, events){
			//element和events都是对象无法区分，所以这里用arguments.length区分三种情况
			var me = this,
				eventsArr,
				length = arguments.length;
			//1.delegateEvents();
			if(length === 0){
				element =  me.element;
				events = me.get('events');
				eventsArr = me.get('eventsArr');
			}
			//2.delegateEvents({...});
			else if(length === 1){
				events = element;
				element = me.element;
				eventsArr = formatEventsArr(events);
			}else if(length === 2){
				eventsArr = formatEventsArr(events);
			}
			// 初始化被委托时间的对象
			!me.delegateElements && (me.delegateElements = []);
			// 委派的元素
			!me.limit.contains(me.delegateElements, element) && me.delegateElements.push(element);
			// 事件注册
			me.limit.each(eventsArr, function(key, index){
				var keys = key.split(' '),
					val = events[key],
					val = typeof val === 'function' ? val : me[val] || me.K;
				element.on(keys[0] + widgetEventsNS + 'widgetCid' + me.widgetCid, keys[1], function(e){
					val.call(me, this, e);
				});
			});
			return me;
		},
		//销毁事件
		//1.undelegateEvents(); 2.undelegateEvents(ele);
		undelegateEvents: function(element){
			var me = this,
				length = arguments.length,
				delegateElements;
			//1.undelegateEvents();
			if(length === 0){
				delegateElements =  me.delegateElements;
			}
			//2.undelegateEvents(ele);
			else if(length === 1){
				delegateElements = [].concat(element);
			}
			me.limit.each(delegateElements, function(val){
				val.off(widgetEventsNS + 'widgetCid' + me.widgetCid);
			});
			return me;
		},
		//组件内遍历
		$: function(selector){
			return this.element.find(selector);
		},
		jQuery: $,
		//继承属性
		Implements: {domUtil: domUtil},
		//静态属性
		Statics: {
					query: function(query){
						var me = this,
							arr = [],
							widgetCids = $(query).attr('widget-cid');
						if(!widgetCids)
							return null;
						me.limit.each(widgetCids.split(','), function(val){
							var wid = cacheWidget['widgetCid' + val];
							wid && arr.push(wid);
						});
						return arr.length === 1 ? arr[0] : arr;
					},
					domUtil: domUtil
				}
	});
	
	//函数:设置属性
	function setAttr(me, key, element){
		if(key !== 'element' && key !== 'template'){
			var dataVal = element.data(key);
			dataVal && me.set(key, dataVal);
		}
	}

	//函数:解析节点的data-api
	function parseAttr(me, element){
		var dataset;
		if(dataset = element[0].dataset){
			Base.limit.each(element[0].dataset, function(val, key){
				setAttr(me, key, element);
			});
		}else{
			console.log(element);
			parseAttrByAttributes(element[0].attributes, function(val, key){
				setAttr(me, key, element);
			});
		}
		return me;
	}

	//函数:用属性值解析
	function parseAttrByAttributes(attributes, callback){
		Base.limit.each(attributes, function(val, index){
			var key = val.nodeName;
			if(REX_DATA.test(key)){
				key = RegExp.$1.slice(1).replace(REX_FIRST, function(a, b){
					return b.toUpperCase();
				});
				callback(val.nodeValue, key);
			}
		});
	}

	//函数：
	function formatEventsArr(events){
		var arr = [];
		Base.limit.each(events, function(val, key){
			arr.push(key);
		});
		return arr;
	}

	//函数：销毁实例
	function destroyWidget(me){
		var widgetCid = me.widgetCid,
			element = me.element,
			widgetCids = element.attr('widget-cid').split(',');
		//销毁对象
		delete cacheWidget['widgetCid'+widgetCid];
		//删除对应的值
		widgetCids.splice( me.limit.indexOf(widgetCids, widgetCid), 1);
		//重新赋值
		element.attr( 'widget-cid', widgetCids.join(',') );
		// 如果等于空就删除这个属性
		element.attr('widget-cid') === '' && element.removeAttr('widget-cid');
	}

	
	//返回
	return Widget;

});