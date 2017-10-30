"use strict";

const WIN = $(window);
const Events = limit.Events;
const REX_HASH = /^#([^?]*)(?:\?(.*))?/;

class Router extends Events {
	props = {}
	constructor(config){
		let me = super();
		limit.assignSuper(me.state, me.props, config);
		limit.each( me.state.rule, (val, key) => me.on(key, val) );
		me.state.eventUid = `hashchange.router${limit.getUid()}`;
		me.bindHashChange();
	}
	bindHashChange(){
		let me = this;
		let {state} = me;
		WIN.on(state.eventUid, (e) => {
			let hashParse = Router.parseHash();
			if( hashParse){
				me.emit( hashParse.hash, hashParse.search );
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
		return me;
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
		return me;
	}
};

export default Router;







