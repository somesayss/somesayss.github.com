"use strict";

import './style.less';

let guid = 0;

// 组件类
class Title extends React.Component {
	constructor(){
		super(...arguments);
	}
	shouldComponentUpdate(){
		return false;
	}
	render(){
		let me = this;
		let {props} = me;
		return (
			<div className={`${limit.toString(props.className)} limit_title fn-wrap`} ref="node" >
				{props.children}
			</div>
		);
	}
	componentDidMount(){
		let me = this;
		let {refs, props} = me;
		let {node} = refs;
		$(document).on('mousemove.limitTitle', (e) => {
			node.style.top = me.getTop(e);
			node.style.left = me.getLeft(e);
		});
	}
	getTop(e){
		let me = this;
		let {refs, props} = me;
		let {node} = refs;
		let bodyHeight = Math.max(
								document.body.offsetHeight, 
								document.documentElement.offsetHeight, 
								limit.toNumber(window.innerHeight)
								);
		let nodeHeight = node.offsetHeight;
		let tempTop = e.clientY + props.diffY;
		let height = e.pageY + props.diffY + nodeHeight;
		if( height < bodyHeight ){
			return `${tempTop}px`;
		}else{
			return `${e.clientY - nodeHeight - props.diffY}px`;
		};
	}
	getLeft(e){
		let me = this;
		let {refs, props} = me;
		let {node} = refs;
		let bodyWidth = document.body.offsetWidth;
		let nodeWidth = node.offsetWidth;
		let tempLeft = e.clientX + props.diffX;
		let width = e.pageX + props.diffX + nodeWidth;
		if( width < bodyWidth ){
			return `${tempLeft}px`;
		}else{
			return `${e.clientX - nodeWidth - props.diffX}px`;
		};
	}
	componentWillUnmount(){
		$(document).off('mousemove.limitTitle');
	}
};

module.exports = Title;

