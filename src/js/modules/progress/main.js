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
			speed: 500,
			//每次最小偏差值
			minDiff: 30
		},
		//类名
		className: 'Progress',
		//初始化
		initProps: function(config){
			var me = this;
			//初始化队列
			me.queue = queue();
			return me;
		},
		//开始
		startPro: function(per){
			var me = this;
			//强制转换
			per = getDiff(~~per);
			//重设上一个
			me.beforePro = 0;
			//设置现在值
			me.nowPro = per;
			//如果是0就直接设置，如果不是就绘制
			me[per === 0 ? 'setPath' : 'setPro'](per);
			return me;
		},
		//增加
		incPro: function(per){
			var me = this,
				nowPro = per || me.nowPro;
			//获取随机值
			nowPro = methodUtil.getRandom(nowPro, nowPro + me.get('minDiff'));
			me.setPro( getDiff(nowPro) );
			return me;
		},
		//设置 0 ~ 100
		setPro: function(nowPro, type){
			var me = this,
				beforePro = ~~me.beforePro;
			me.beforePro = me.nowPro = nowPro;
			if(beforePro !== nowPro){
				me.queue(function(next){
					animate(me, beforePro, nowPro, me.get('speed'), function(diff){
						me.setPath(diff)
					}, type);
					setTimeout(next, me.get('speed'));
				});	
			}
			return me;
		},
		//结束
		donePro: function(){
			var me = this;
			me.setPro(me.nowPro = 100, true);
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
	var easing = {
		in:function(pos) {
			return  -(Math.pow(pos - 1, 2) - 1);;
	    },
	    out:function(pos) {
			return Math.pow(pos, 2);
	    }
	}
	
	//函数：动画
	function animate(me, begin, end, time, fn, type){
		var beginTime = new Date().getTime(),
			diffPos = end - begin;
		methodUtil.cancelAnimationFrame(me.animateId);
		me.animateId = methodUtil.requestAnimationFrame(function loop(){
			var changeTime = new Date().getTime() - beginTime,
				diff = Math.floor( diffPos * easing[!type ? 'in' : 'out']( changeTime/time ) ) + begin;
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