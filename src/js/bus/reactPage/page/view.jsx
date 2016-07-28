"use strict";
/**
 * 模型
 */
define(function(require, exports, module) {

  	// 依赖
  	const React = require('react');
  	const limit = require('common/limit2.0');
  	// const Actions = require('./controller').Actions;


	class Page extends React.Component {
		constructor(){
			super(...arguments);
			let me = this,
				props = me.props;
			me.diffList = me.getDiffList();
		}
		render(){
			var me = this,
				props = me.props,
				length = ~~props.totle,
				page = ~~props.page;
			// 如果length是0
			if(length <= 0){
				return <div></div>
			};
			if(page <= 0){
				page = 1;
			};
			return (
				<div>
					{me.getAllList().map((val, key) => {
						return (
							val === '...' ? 
								<span key={key}>{val}</span> 
							: 
								<a key={key} href="javascript:;"  className={page === val ? 'active' : null}>{val}</a>
						)
					})}
				</div>

				/*
				onClick={me.Actions.change.bind(me, val)}
				 */
			);
		}
		getDiffList(){
			let me = this,
				props = me.props,
				diff = ~~props.diff,
				temp,
				arr = [];
			if(diff <= 0){
				diff = 1;
			};
			temp = -diff;
			do{
				arr.push(temp);
			}while(temp++ < diff);
			return arr;
		}
		getAllList(){
			let me = this,
				props = me.props,
				page = ~~props.page,
				length = ~~props.totle,
				arr = [];
			if(page <= 0){
				page = 1;
			};
			// 对page做的
			// 拿到中间值
			arr = limit.map( me.diffList, (val) => page + val);
			// 开头和结尾
			arr.unshift(1);
			arr.push(length);
			// 去重
			arr = limit(arr)
					.filter( (val) => val > 0 && val < length + 1 )
					.union()
					.valueOf();
			if(arr.length > 1){
				// 如果补值
				if(arr[1] - arr[0] !== 1){
					arr.splice(1,0,'...');
				};
				if(arr[arr.length - 1] - arr[arr.length - 2] !== 1){
					arr.splice(-1,0,'...');
				};
			};
			return arr;
		}
		
	};

	return Page;

});