"use strict";
/**
 * 分页组件
 * 2015,06,12 邵红亮
 */
define(function(require, exports, module) {

	//依赖
	var MyWidget = require('common/myWidget');

	//变量
	var $ = MyWidget.jQuery,
		handlerbars = MyWidget.handlerbars;

	//模板
	//焦点样式:active 不可用样式:disabled
	var template = handlerbars.compile([
		'<nav>',
	      	'<ul class="pagination">',
		        '<li class="JS-click-prev disabled" data-label="prev"><a href="javascript:;" aria-label="Previous"><span aria-hidden="true">«</span></a></li>',
		        '{{#each this}}',
		        '<li class="JS-click-active"><a href="javascript:;">{{this}}</li>',
		        '{{/each}}',
		        '<li class="JS-click-next" data-label="next"><a href="javascript:;" aria-label="Next"><span aria-hidden="true">»</span></a></li>',
	     	'</ul>',
	   	'</nav>'
	].join(''));

	//函数

	//类
	var Paginator = MyWidget.extend({
		//类名
		clssName: 'Paginator',
		//属性
		attrs: {
			totle: 100,
			size: 10,
			nowTarget: 0
		},
		//事件
		events: {
			//焦点点击
			'click .JS-click-active': function(e){
				var me = this,
					node = MyWidget.closest(e.target, '.JS-click-active'),
					index = me.$('.JS-click-active').index(node);
				!node.hasClass('active') && me.paginatorActive( index );
				
			},
			//上一个
			'click .JS-click-prev': 'paginatorPrevNext',
			//下一个
			'click .JS-click-next': 'paginatorPrevNext'
		},
		//初始化数据
		initProps: function(){
			var me = this,
				totle = me.get('totle'),
				size = me.get('size'),
				paginatorData,
				paginatorMax,
				index = 0;
			//最大值
			paginatorMax = me.paginatorMax = Math.ceil(totle/size);
			//按钮
			paginatorData = me.paginatorData = [];
			for(; index < paginatorMax; index++){
				paginatorData.push(index + 1);
			}
		},
		//入口
		setup: function(){
			var me = this;
			//初始化模板
			me.element.html(template(me.paginatorData));
			//初始化焦点
			me.paginatorActive( checkMaxMin(me.get('nowTarget'), me.paginatorMax) );
		},
		//上一个下一个
		paginatorPrevNext: function(e){
			var me = this;
			//事件对象是必须存在的
			if(e && e.target){
				var node = MyWidget.closest(e.target, '[data-label]'),
					label = node.data('label'),
					nowTarget = me.get('nowTarget'),
					index = label === 'prev' ? --nowTarget : ++nowTarget;//自增还是自减
				if(!node.hasClass('disabled')){
					//最大最小
					me.paginatorActive( checkMaxMin(index, me.paginatorMax) );
				}
			}else{
				me.log('缺少事件对象。');
			}
		},
		//按钮焦点
		paginatorActive: function(index){
			var me = this;
			//控制焦点
			me.$('.JS-click-active').removeClass('active').eq(index).addClass('active');
			//恢复可用
			me.$('.JS-click-prev').removeClass('disabled');
			me.$('.JS-click-next').removeClass('disabled');
			//控制不可用
			if(index <= 0){
				me.$('.JS-click-prev').addClass('disabled');
			}else if(index >= me.paginatorMax-1){
				me.$('.JS-click-next').addClass('disabled');
			}
			me.log('log', index);
			me.trigger('change', index);
			//设置
			me.set('nowTarget', index);
			return me;
		},
		//重置
		paginatorReload: function(config){
			var me = this;
			//重置
			me.set('totle', config.totle || me.get('totle'));
			me.set('size', config.size || me.get('size'));
			me.set('nowTarget', config.nowTarget || me.get('nowTarget'));
			me.initProps();
			me.setup();
			return me;
		},
		//静态属性
		Statics:{
			use: function(query, config){
				var me = this;
				$(query).each(function(){
					return new me( $.extend({element: this}, config) );
				});
			}
		}
	});

	//函数:确定最大最小值
	function checkMaxMin(index, max){
		index < 0 && (index = 0);
		index >= max - 1 && ( index = max-1 );
		return index;
	}

	return Paginator

});