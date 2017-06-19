"use strict";

// 变量
const WIN = $(window);
const REX_HASH = /^#([^?]*)(?:\?(.*))?/;

// 类
class Router {
	constructor(config){
		let me = this;
		let	routerMap = me.routerMap = {};
		me.eventUid = `hashchange.router${limit.getUid()}`;
		limit.each(config, (val, key) => {
			me.add( me.addPathForKey(key), val );
		});
		me.bindHashChange();
	}
	add(key, cb){
		let me = this;
		let	routerMap = me.routerMap;
		if( limit.isDefined(routerMap[key]) ){
			limit.war(`${key} is defined before;`);
		};
		routerMap[key] = limit.cb(cb);
		return me;
	}
	remove(key){
		let me = this;
		let	routerMap = me.routerMap;
		delete routerMap[key];
		return me;
	}
	setSearch(arg){
		let me = this;
		let hashParse = me.parseHash();
		let needHash;
		if( limit.isFunction(arg) ){
			needHash = limit.cb(arg)( limit.parseString(hashParse.search) );
		};
		if( needHash = limit.unParseString(needHash) ){
			needHash = `${hashParse.hash}?${needHash}`;
		}else{
			needHash = `${hashParse.hash}`;
		};
		location.hash = needHash;
		return me;
	}
	setHash(arg){
		let me = this;
		let needHash;
		if( limit.isFunction(arg) ){
			let hashParse = me.parseHash();
			needHash = limit.toString( limit.cb(arg)( hashParse.hash, limit.parseString(hashParse.search) ) );
		}else{
			needHash = limit.toString(arg);
		};
		location.hash = needHash;
		return me;
	}
	bindHashChange(){
		let me = this;
		WIN.on(me.eventUid, (e) => {
			let hashParse = me.parseHash();
			let hashBack;
			if( hashParse && (hashBack = me.routerMap[me.addPathForKey(hashParse.hash)]) ){
				hashBack( limit.parseString(hashParse.search) );
			};
		});
		WIN.trigger(me.eventUid);
	}
	addPathForKey(key){
		if(key.charAt(0) !== '/'){
			return `/${key}`;
		}else{
			return key;
		};
	}
	destroy(){
		let me = this;
		WIN.off(me.eventUid);
	}
	parseHash(){
		let me = this;
		let hash = location.hash;
		let hashMatch = hash.match(REX_HASH);
		if(hashMatch){
			let hash = hashMatch[1];
			let search = hashMatch[2];
			return {hash, search};
		}else{
			return {hash: ''};
		};
	}
	static creatRouter(config){
		return new Router(config);
	}
}

// 接口
module.exports = Router;