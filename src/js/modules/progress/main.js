"use strict";
/**
 * 进度类
 */
define(function(require, exports, module) {

	//依赖
	var Pie = require('modules/pie/main'),
		methodUtil = require('common/methodUtil');

	console.log();

	//类
	var Progress = Pie.extend({
		attrs: {
			//速度
			speed: 1000,
			//每次最小偏差值
			minDiff: 20
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
			me.setPro(me.diffTarget = 0);
			return me;
		},
		//增加
		incPro: function(){
			var me = this,
				diffTarget = me.diffTarget;
			diffTarget = methodUtil.getRandom(diffTarget, diffTarget + me.get('minDiff'));
			me.setPro( me.diffTarget = getDiff(diffTarget) );
			return me;
		},
		//设置 0 ~ 100
		setPro: function(per){
			var me = this;
			me.queue(function(next){
				me.setPath(per);
				setTimeout(next, me.get('speed'));
			});
			return me;
		},
		//结束
		donePro: function(){
			var me = this;
			me.setPro(me.diffTarget = 100);
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

	//函数：动画
	function animate(){
		
	}
	

	return Progress;
});