"use strict";

import './style.less';

// 依赖
const React = require('react');
const limit = require('limit');
const Cover = require('modules/cover/index');

// 组件类
class Dialog extends React.Component {
	constructor(){
		super(...arguments);
	}
	render(){
		let me = this;
		let	props = me.props;
		let styleKeys = ['top', 'marginLeft', 'width', 'height', 'maxWidth'];
		let style = limit.filter(props, (val, key) => {
			return limit.contains(styleKeys, key);
		});
		return (
			<div className={props.className}>
				<div className="react-dialog" ref="dialog" style={style}>
					<a href="javascript:;" className="ch-close" onClick={me.closeDialog.bind(me)}>×</a>
					{props.children}
				</div>
				<Cover opacity={props.opacity} />
			</div>
		);
	}
	componentDidMount(){
		let me = this;
		let {props} = me;
		Actions(me).setCenter();
		if( props.timeout ){
			setTimeout(() => {
				Actions(me) && Actions(me).destroyWidget && Actions(me).destroyWidget();
			}, props.timeout);
		};
	}
	closeDialog(){
		let me = this;
		let {props} = me;
		Actions(me).destroyWidget && Actions(me).destroyWidget();
		props.onClose();
	}
};

module.exports = Dialog;

