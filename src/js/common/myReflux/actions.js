"use strict";

// 依赖
const limit = require('limit');

// 变量
const Actions = window.Actions = function(id){
	return Actions.get(id);
};

const ActionsPool = Actions.pool = {};


Actions.set = function(id, action){
	let pool = ActionsPool[id];
	if( pool ){
		pool.push(action);
	}else{
		ActionsPool[id] = [action];
	};
};

Actions.get = function(id){
	if( limit.isObjectSuper(id) ){
		id = id.props.actionId;
	}else{
		id = limit.toString(id);
	};
	let pool = ActionsPool[id];
	if( pool ){
		if( pool.length === 1 ){
			return pool[0];
		}else{
			return pool;
		};
	};
};

Actions.remove = function(id, action){
	let pool = ActionsPool[id];
	if( pool ){
		limit.remove(pool, action);
	};
};


module.exports = Actions;
