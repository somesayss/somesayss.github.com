"use strict";

// 依赖
const limit = require('limit');
const Events = require('events');

// 类
class Websocket extends Events {
	state = {
		host: '0.0.0.0',
		port: '8181',
		ready: false
	}
	constructor(props){
		super();
		let me = this;
		limit.assign(me.state, props);
		me.creatWebSocket();
	}
	creatWebSocket(){
		let me = this;
		let state = me.state;
		let WS = me.WS = new WebSocket(`ws://${state.host}:${state.port}`);
		limit.each(['open', 'message', 'error', 'close'], (val) => {
			me.on( val, limit.cb(me[`onWS${val}`]) );
			WS[`on${val}`] = (...args) => me.emit.apply(me, [val, ...args]);
		});
	}
	onWSopen(){
		let me = this;
		let {state} = me;
		state.ready = true;
	}
	onWSclose(){
		let me = this;
		let {state} = me;
		state.ready = false;
	}
	onWSmessage(data){
		let me = this;
		try{
			let message = JSON.parse(data.data);
			me.emit(`messageFrom${message.from}`, message);
		}catch(e){
			limit.err(e);				
		};
	}
	tellThem(message){
		let me = this;
		let {state, WS} = me;
		if( state.ready ){
			WS.send( JSON.stringify({to: 'them', val: message}) );
		}else{
			
		};
	}
	tellMe(message){
		let me = this;
		let {state, WS} = me;
		if( state.ready ){
			WS.send( JSON.stringify({to: 'me', val: message}) );
		}else{

		};
	}
};

// 接口
module.exports = Websocket;