"use strict";

const WIN = $(window);
const Events = limit.Events;
const REX_HASH = /^#([^?]*)(?:\?(.*))?/;

class Router extends Events {
	props = {
		// 默认跳转的地址
		defaultHash: ''
	}
	setDefaultHash(){
		let me = this;
		let {state} = me;
		let parseHash = Router.parseHash();
		if( !parseHash && state.defaultHash ){
			Router.setHash(state.defaultHash);
		};
	}
	constructor(config){
		let me = super();
		limit.assignSuper(me.state, me.props, config);
		limit.each( me.state.rule, (val, key) => me.on(key, val) );
		me.state.eventUid = `hashchange.router${limit.getUid()}`;
	}
	checkHash(hash){
		return hash;
	}
	bindHashChange(){
		let me = this;
		let {state} = me;
		WIN.on(state.eventUid, (e) => {
			let hashParse = Router.parseHash();
			if( hashParse ){
				me.checkHash(hashParse.hash) && me.emit( hashParse.hash, hashParse.search );
			}else{
				me.setDefaultHash();	
			};
		});
		WIN.trigger(state.eventUid);
	}
	destroy(){
		let me = this;
		let {state} = me;
		WIN.off(state.eventUid);
		delete me.state;
		delete me.props;
	}
	static parseHash(){
		let me = Router;
		let hash = decodeURIComponent(location.hash);
		let hashMatch = hash.match(REX_HASH);
		if(hashMatch){
			let hash = hashMatch[1];
			let search = limit.parseString(hashMatch[2]);
			return {hash, search};
		};
	}
	// function obj
	static setSearch(arg, hash){
		let me = Router;
		let hashParse = me.parseHash();
		let needHash;
		if( !hash ){
			hash = hashParse.hash;
		};
		if( limit.isFunction(arg) ){
			needHash = limit.unParseString( arg( hashParse.search ) );
		}else{
			needHash = limit.unParseString( arg );
		};
		if( needHash ){
			needHash = `${hash}?${needHash}`;
		}else{
			needHash = `${hash}`;
		};
		location.hash = encodeURIComponent(needHash);
	}
	// function str
	static setHash(arg){
		let me = Router;
		let needHash;
		if( limit.isFunction(arg) ){
			let hashParse = me.parseHash();
			needHash = limit.toString( arg( hashParse.hash, hashParse.search ) );
		}else{
			needHash = limit.toString( arg );
		};
		location.hash = encodeURIComponent(needHash);
	}
};

export default Router;







