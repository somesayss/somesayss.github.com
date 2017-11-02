"use strict";

import Map from './map';

const returnTrue = () => true;

const REGRULE = /(\w+)(?:\((.*)?\))?/;

class Listener extends limit.Events {
	props = {
		// 原始数据
		originData: {},
		// 验证对象
		validatMap: {}
	}
	constructor(config){
		let me = super();
		limit.assign(me.state, me.props, config);
	}
	removeData(key){
		let me = this;
		let {state} = me;
		delete state.originData[key];
	}
	addData(key, val){
		let me = this;
		let {state} = me;
		state.originData[key] = val;
	}
	getData(key){
		let me = this;
		let {state} = me;
		return state.originData[key];
	}
	addMap(key, rule, errMessage){
		let me = this;
		let {state} = me;
		// 如果是函数直接入
		if( limit.isFunction(rule) ){
			state.validatMap[key] = rule;
		}else{
			let ruleList = rule.split(',');
			let errMessageList = errMessage.split(',');
			state.validatMap[key] = function(val){
				let message;
				ruleList.filter(limit.K).every((rule, key) => {
					let ruleMatch = rule.match(REGRULE);
					let ruleFun = me.getRuleFunByRule(ruleMatch[1]);
					let ruleArg = me.getRuleArgByRuleAndVal(ruleMatch[2], val);
					let rtv = ruleFun(...ruleArg);
					if( !rtv ){
						message = errMessageList[key];
					};
					return rtv;
				});
				return message;
			};
		};
	}
	getMap(key){
		let me = this;
		let {state} = me;
		return state.validatMap[key];
	}
	// 通过rule获取函数
	getRuleFunByRule(rule){
		let fun = Map[rule];
		if( fun ){
			return fun;
		}else{
			return returnTrue;
		};
	}
	// 获取参数
	getRuleArgByRuleAndVal(rule, val){
		if( rule ){
			rule = rule.split(',').map((v) => JSON.parse(v));
			return [val, ...rule];
		}else{
			return [val]
		};
	}
	// 验证
	executeData(){
		let me = this;
		let {state} = me;
		let {originData, validatMap} = state;
		let errBackArr = [];
		limit.each(validatMap, (val, key) => {
			let dataVal = originData[key];
			if( limit.isDefined(dataVal) ){
				let err = val(dataVal);
				if( err ){
					val = dataVal;
					errBackArr.push({key, val, err});
				};
			};
		});
		let hasErr = errBackArr.length;
		if( errBackArr.length ){
			limit.war(errBackArr);
			me.emit('error', errBackArr);
		}else{
			me.emit('success');
		};
		return !!hasErr;
	}
	// 验证
	execute(){
		let me = this;
		let {state} = me;
		let {originData, validatMap} = state;
		// 验证表单
		limit.each(validatMap, (val, key) => {
			me.emit(`${key}Validat`);
		});
		// 验证数据
		return me.executeData();
	}
	// 重置
	reset(e){
		let me = this;
		let {state} = me;
		let {originData, validatMap} = state;
		// 验证表单
		limit.each(validatMap, (val, key) => {
			me.emit(`${key}Reset`);
		});
	}
}

export default Listener;


















