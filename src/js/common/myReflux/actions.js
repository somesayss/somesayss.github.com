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

Actions.getAll = function(id){
	if( limit.isObjectSuper(id) ){
		id = id.props.actionId || id.state.actionId;
	}else{
		id = limit.toString(id);
	};
	let pool = ActionsPool[id];
	return pool;
};

Actions.get = function(id){
	let pool = Actions.getAll(id);
	if( pool ){
		if( limit.isObjectSuper(id) && (id.props.actionUUid || id.state.actionUUid) ){
			let actionUUid = id.props.actionUUid || id.state.actionUUid;
			let action = null;
			pool.some((val) => {
				action = val;
				return val.actionUUid === actionUUid;
			});
			return action;
		}else{
			if( pool.length === 1 ){
				return pool[0];
			}else{
				return pool;
			};
		};
	};
};

Actions.remove = function(id, action){
	let pool = ActionsPool[id];
	if( pool ){
		limit.remove(pool, action);
		if( !pool.length ){
			delete ActionsPool[id];
		};
	};
};


module.exports = Actions;
