"use strict";

import './style.less';
import Component from 'common/myReflux/component';

// 组件类
class View extends Component {
	cloneAllChild(child){
		let me = this;
		let {props} = me;
		let childProps = child.props;
		if( childProps ){
			if( childProps.actionId === 'limitForm' ){
				return React.cloneElement(child, {validaor: props.validaor});
			};
			if( childProps.children ){
				return React.cloneElement(child, {}, 
					React.Children.map(childProps.children, (child) => {
						return me.cloneAllChild(child);
					})
				);
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

export default View;

