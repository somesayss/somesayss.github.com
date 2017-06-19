"use strict";

// 组件类
class Image extends React.Component {
	state = {
		opacity: 0,
		WebkitFilter: 'blur(2px)'
	}
	constructor(){
		super(...arguments);
		let me = this;
	}
	render(){
		let me = this;
		let {props, state} = me;
		return (
			<img {...props} onError={me.onError.bind(me)} onLoad={me.onload.bind(me)} style={state} ref="node" />
		);
	}
	shouldComponentUpdate(){
		return false;
	}
	onload(){
		let me = this;
		let {refs, state} = me;
		let {node} = refs;
		node.style.opacity = 1;
		node.style.WebkitFilter = 'blur(0px)';
	}
	onError(){
		let me = this;
		let {refs, state} = me;
		let {node} = refs;
		node.style.display = 'none';
	}
};

module.exports = Image;

