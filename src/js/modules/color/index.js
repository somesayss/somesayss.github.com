"use strict";

// 依赖
const limit = require('limit');

class Rainbow {
	props = {
		list: [
			[255, 0, 0] //红
			,[255, 122, 0] //橙
			,[255, 255, 0] //黄
			,[0, 255, 0] //绿
			,[0, 255, 255] //青
			,[0, 0, 255] //蓝
			,[255, 0, 255] //紫
		],
		totle: 50
	}
	state = {}
	constructor(config){
		let me = this;
		limit.assign(me.state, me.props, config);
		return me.parseList();
	}
	parseList(){
		let me = this;
		let state = me.state;
		let list = state.list;
		let rev = [];
		let leg = list.length;
		let range = Math.ceil( (state.totle - leg) / (leg - 1) + 2 );
		list.forEach((val, key) => {
			let next = list[++key];
			if( next ){
				rev.push(val);
				Array.prototype.push.apply( rev, me.getColorRange( range, val, next) );
			}else{
				rev.push(val);
			};
		});		return rev;
	}
	getColorRange(range = 10, from = [255, 0, 0], to = [0, 255, 0]){
		range--;
		let leg = from.length;
		let dif = limit.from(new Array(leg), (val, key) => {
			return (from[key] - to[key]) / range ;
		});
		return limit.from(new Array(--range), (val, key) => {
			key++;
			return limit.from(new Array(leg), (val, k) => {
				return Math.floor( from[k] - dif[k] * key );
			});
		});
	}
}

module.exports = Rainbow;