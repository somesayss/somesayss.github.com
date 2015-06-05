"use strict";
/**
 * 进度类
 */
define(function(require, exports, module) {

	//依赖
	var Pie = require('modules/pie/main'),
		methodUtil = require('common/methodUtil');

	//类
	var Progress = Pie.extend({
		attrs: {
			//速度
			speed: 1000,
			//每次最小偏差值
			minDiff: 30
		},
		//类名
		className: 'Progress',
		//初始化
		init: function(config){
			var me = this;
			Progress.superClass.init.call(this, config);
			//初始化队列
			me.queue = queue();
			return me;
		},
		//开始
		startPro: function(){
			var me = this;
			me.setPro(me.now = me.before = 0);
			return me;
		},
		//增加
		incPro: function(){
			var me = this,
				now = me.now;
			//me.beforeTarget = now;
			now = methodUtil.getRandom(now, now + me.get('minDiff'));
			me.setPro( getDiff(now) );
			return me;
		},
		//设置 0 ~ 100
		setPro: function(now){
			var me = this,
				before = me.before;
			me.before = me.now = now;
			if(before !== now){
				me.queue(function(next){
					animate(me, before, now, me.get('speed'), function(diff){
						me.setPath(diff)
					});
					setTimeout(next, me.get('speed'));
				});	
			}
			return me;
		},
		//结束
		donePro: function(){
			var me = this;
			me.setPro(me.now = 100);
			return me;
		}
	});

	//函数：队列
	function queue(){
		var list = [],
			doing = true;
		function next(){
			var fn = list.shift();
			if(fn){
				fn(next)
			}else{
				doing = true;
			}
		}
		return function(callback){
			if(list.push(callback) === 1 && doing){
				doing = false;
				next();
			}
		}
	}

	//函数：正确获取偏差值
	function getDiff(diff){
		if(diff < 0){
			diff = 0;
		}else if(diff > 99){
			diff = 99;
		}
		return diff;
	}

	//函数：动画函数
	function easing(pos) {
        return -.5 * (Math.cos(Math.PI * pos) - 1);
    }
	
	//函数：动画
	function animate(me, begin, end, time, fn){
		var beginTime = new Date().getTime(),
			diffPos = end - begin;
		methodUtil.cancelAnimationFrame(me.animateId);
		me.animateId = methodUtil.requestAnimationFrame(function loop(){
			var changeTime = new Date().getTime() - beginTime,
				diff = Math.floor( diffPos * easing( changeTime/time ) ) + begin;
			if(changeTime < time){
				fn(diff);
				me.animateId = methodUtil.requestAnimationFrame(loop);
			}else{
				fn(end);
			}
		});
	}
	
	

	return Progress;
});