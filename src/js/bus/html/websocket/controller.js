"use strict";
	
// 依赖
const limit = require('limit');
const Control = require('common/myReflux/control');
const Websocket = require('common/websocket');

class Controller extends Control {
	state = {
		strList: [],
		message: [],
		myId: '',
		myDisplayName: '',
		sysName: 'Websocket聊天测试'
	}
	onInitWS(){
		let me = this;
		let WS = me.WS = new Websocket();
		limit(['Others', 'Thesys']).each((val) => {
			WS.on(`messageFrom${val}`, me[`onMessageFrom${val}`].bind(me));
		});
	}
	onMessageFromThesys(data){
		let me = this;
		let {state} = me;
		if( data.type === 'tellId' ){
			state.myId = data.value;
		};
		me.updateComponent();
	}
	onMessageFromOthers(data){
		let me = this;
		let {state} = me;
		state.strList.push(data);
		me.updateComponent().then(() => {
			me.scrollBottom();
		});
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
		if( message ){
			state.strList.push({id: state.myId, displayName: state.myDisplayName, value: message});
			state.message.length = 0;
			WS.tellOthers(message);
		};
	}
	scrollBottom(){
		let WH = window.innerHeight;
		let SH = document.body.scrollHeight;
		window.scrollTo(0, SH - WH);
	}
};

module.exports = Controller;