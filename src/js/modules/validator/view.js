"use strict";

import './style.less';

const InputWidget = require('modules/input/widget');

let guid = 0;

// 组件类
class Validator extends React.Component {
	componentWillMount(){
		let me = this;
	}
	cloneAllChild(child){
		let me = this;
		let {props} = me;
		let childProps = child.props;
		if( childProps ){
			if( childProps.children ){
				return React.cloneElement(child, {}, 
					React.Children.map(child.props.children, (child) => {
						return me.cloneAllChild(child);
					})
				);
			}else{
				if( child.props.actionId === 'limitForm' ){
					return React.cloneElement(child, {validaor: props.validaor});
				};
			};
		};
		return child;
	}
	render(){
		let me = this;
		let {props} = me;
		return (
			<form ref="form" action={props.action} onSubmit={Actions(me).submit} onReset={Actions(me).reset}>
				{React.Children.map(props.children, (child) => {
					return me.cloneAllChild(child);
				})}
			</form>
		);
	}
	componentWillUnmount(){
		let me = this;
		let {props} = me;
		props.validaor.destroy();
	}
};

module.exports = Validator;

