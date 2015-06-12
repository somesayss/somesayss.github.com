"use strict";
/**
 * 查询列表组件
 * 2015,06,12 邵红亮
 */
define(function(require, exports, module) {

	//依赖
	var MyWidget = require('common/myWidget'),
		Paginator = require('model/paginator/main'),
		assetsLink = window.CONFIG.assetsLink;

	//类
	var SearchList = MyWidget.extend({
		//类名
		clssName: 'SearchList',
		//属性
		attrs: {
			request: '/lassen/demo/test1Rpc/queryTest.json'
		},
		events: {
			
		},
		//初始化数据
		initProps: function(){
			var me = this;
			//参数
			me.param = MyWidget.serialize(me.$('.param'));
			//容器
			me.content = me.$('.content');
			//模板
			me.template = MyWidget.handlerbars.compile( me.$('.template').html() );
		},
		//入口
		setup: function(){
			var me = this;
			//初始化请求
			me.searchListAjax();

			return me;			
		},
		//请求
		searchListAjax: function(){
			var me = this;
			MyWidget.ajax(me.get('request'), me.param, 'post', function(err, data){
				if(err){
					me.log(err);
				}else{
					//内容
					me.content.html( me.template(data.retValue) );
					//初始化
					if(!me.searchListPaginator){
						me.searchListPaginator = new Paginator({
							parentNode:me.element,
							on
						});
						me.searchListPaginator.render();
					}else{
						me.searchListPaginator.paginatorReload();
					}
					
				}
			});
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


	return SearchList

});