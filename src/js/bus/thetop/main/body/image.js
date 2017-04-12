"use strict";

// 组件类
class Image extends React.Component {
	state = {
		opacity: 0
	}
	constructor(){
		super(...arguments);
		let me = this;
	}
	render(){
		let me = this;
		let {props, state} = me;
		return (
			<img {...props} onLoad={me.onload.bind(me)} style={{opacity: state.opacity}} />
		);
	}
	onload(){
		let me = this;
		let {state} = me;
		state.opacity = 1;
		me.setState(state);
	}
};

module.exports = Image;

