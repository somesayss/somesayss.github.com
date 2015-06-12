"use strict";
/**
 * 时间倒计时[]
 * 2015,05,21 邵红亮
 */
define(function(require, exports, module) {

	//依赖
	var $ = require('$'),
		util = require('common/util'),
		Base = require('base');

	//类
	var CountDown = Base.extend({
		attrs: {
			dayStamp: 24 * 60 * 60 * 1000, //天
			hourStamp: 60 * 60 * 1000, //时
			minuteStamp: 60 * 1000, //分
			secondStamp: 1000 //秒
		},
		initialize: function(config){
			var me = this;
			CountDown.superclass.initialize.call(me, config);
			me.set('targetTimestamp', new Date( me.get('target') ).getTime());
			return me;
		},
		use: function(){
			var me = this,
				targetTimestamp = me.get('targetTimestamp'),//目标的时间戳
				todayTimestamp,//当前的时间戳
				differ;//差值
			//判断解析是否错误
			if(isNaN(targetTimestamp)){
				return util.log('时间戳解析错误。');
			}
			todayTimestamp = new Date().getTime();
			differ = targetTimestamp - todayTimestamp;
			//如果differ小于等于0就没有意义
			if(differ <= 0){
				return util.log('目标：' + me.get('target') + ' 比现在小。');
			}
			return me.formatTimestamp(differ);
		},
		formatTimestamp: function(timestamp){
			var me = this,
				dayStamp = me.get('dayStamp'),
				getDay = Math.floor(timestamp / dayStamp),
				//时
				hourStamp = me.get('hourStamp'),
				differHour = timestamp - getDay * dayStamp,
				getHour = Math.floor( differHour / hourStamp ),
				//分
				minuteStamp = me.get('minuteStamp'),
				differMinute = differHour - getHour * hourStamp,
				getMinute = Math.floor( differMinute / minuteStamp ),
				//秒
				secondStamp = me.get('secondStamp'),
				getSecond = Math.floor( (differMinute - getMinute * minuteStamp) / secondStamp );
			return {
				day: getDay,
				hour: me.formatString(getHour),
				minute: me.formatString(getMinute),
				second: me.formatString(getSecond)
			}
		},
		formatString: function(num){
			return ('00' + num).slice(-2); 
		}
	});
	


	return CountDown;

});