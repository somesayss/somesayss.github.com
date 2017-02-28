"use strict";
	
// 依赖
const limit = require('limit');
const Control = require('common/myReflux/control');
const Websocket = require('common/websocket');

class Controller extends Control {
	state = {
		strList: [],
		message: [],
		myName: '1',
		sysName: 'Websocket聊天测试'
	}
	onInitWS(){
		let me = this;
		let WS = me.WS = new Websocket({host: '198.98.102.230'});
		WS.on('messageFromSys', me.onMessageFromSys.bind(me));
		WS.on('messageFromThem', me.onMessageFromThem.bind(me));
	}
	onMessageFromSys(data){
		let me = this;
		let {state} = me;
		if( data.type === 'setName' ){
			state.myName = data.val;
		};
		me.updateComponent();
	}
	onMessageFromThem(data){
		let me = this;
		let {state} = me;
		state.strList.push(data);
		me.updateComponent();
	}
	onInput(e){
		let me = this;
		let {props, state} = me.getAttr();
		let {message} = state;
		let value = e.target.value;
		message.push.apply(message, value.split(''));
		me.updateComponent();
	}
	onKeydown(e){
		let me = this;
		let {props, state} = me.getAttr();
		// 删除
		if(e.which === 8){
			state.message.pop();
			me.updateComponent();
		}else if( e.which === 13 ){
			// 发送信息
			me.sendMessage();
			me.updateComponent().then(() => {
				me.scrollBottom();
			});
		};
	}
	sendMessage(){
		let me = this;
		let {WS} = me;
		let {props, state} = me.getAttr();
		let message = state.message.join('');
		state.strList.push({fromName: state.myName, val: message});
		state.message.length = 0;
		WS.tellThem(message);
	}
	scrollBottom(){
		let WH = window.innerHeight;
		let SH = document.body.scrollHeight;
		window.scrollTo(0, SH - WH);
	}
};

module.exports = Controller;