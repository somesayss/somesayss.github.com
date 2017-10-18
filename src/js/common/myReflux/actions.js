"use strict";

// 变量
const Actions = window.Actions = function(id, cid){
	return getReturnObj(id, cid);
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

// 获取正确的ID
function getPropTrueId(obj, key){
	if( limit.isObjectSuper(obj) ){
		return obj.props[key] || obj.state[key];
	};
};

// 通过ID获取
function getAllPoolById(id){
	return ActionsPool[getPropTrueId(id, 'actionId') || id] || [];
};

// 获取目标
function getTargetPool(id, cid){
	let pool = getAllPoolById(id);
	if( cid ){
		return pool.filter((val) => {
			return val.actionCid === cid;
		});
	}else{
		let uid = getPropTrueId(id, 'actionUUid');
		if( uid ){
			return pool.filter((val) => {
				return val.actionUUid === uid;
			});
		}else{
			return pool;
		};
	};
};

// 获取对应的对象
function getReturnObj(id, cid){
	let pool = getTargetPool(id, cid);
	let obj = {};
	if( pool.length ){
		limit.each(pool[0], (val, key) => {
			if( limit.isFunction(val) ){
				obj[key] = (...agrs) => {
					return Promise.all( pool.map((fn) => {
						return fn[key](...agrs);
					}) );
				};
			}else{
				obj[key] = pool.map((val) => {
					return val[key];
				}).join(',');
			};
		});
	};
	return obj;
};

Actions.get = function(id, cid){
	return getTargetPool(id, cid);
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


export default Actions;




