"use strict";

// 依赖
const limit = require('limit');

class Widget {
	props = {}
	state = {}
	tempNode = null //节点
	parentNode = null
	component = null //组件
	componentExp = null //实例化后的组件
	constructor(config, parentNode, childCom){
		let me = this;
		me.component = me.constructor.originClass;
		me.parentNode = parentNode;
		me.childCom = childCom;
		limit.assignSuper(me.state, me.props, config);
		return me.init();
	}
	// 初始化组件
	init(){
		let me = this;
		let {state} = me;
		let node = null;
		let Component = me.component;
		if( me.parentNode ){
			node = me.tempNode = me.parentNode;
		}else{
			node = me.tempNode = document.createElement('div');
			node.id = `widget${limit.getUid()}`;
			document.body.appendChild(node);
		};
		me.componentExp = ReactDOM.render(
			<Component {...me.state} children={me.childCom} />,
			node
		);
		Actions(me.componentExp).destroyWidget = me.destroy.bind(me);
	}
	// 更新组件
	updateComponent(props){
    	let me = this;
    	return new Promise(resolve => {
    		me.componentExp.setState(props, resolve);
    	});
	}
	// 销毁组件
	destroy(){
		let me = this;
		ReactDOM.unmountComponentAtNode(me.tempNode);
		if( !me.parentNode ){
			let clearDiv = document.createElement('div');
			clearDiv.appendChild(me.tempNode);
			clearDiv.innerHTML = '';
			clearDiv = null;
		};
		me.parentNode = null;
		me.tempNode = null;
		me.component = null;
		me.componentExp = null;
	}
};

module.exports = Widget;






