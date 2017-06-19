"use strict";

import './style.less';

const InputWidget = require('modules/input/widget');
const Listener = require('./listener');

// 组件类
class Validator extends React.Component {
	render(){
		let me = this;
		let {props} = me;
		return props.type ? me.markRender() : me.formRender();
	}
	markRender(){
		console.log('markRender');
		let me = this;
		let {props} = me;
		console.log(props)
		return (
			<div ref="mark" data-mark={props.name||''}></div>
		);
	}
	componentWillMount(){
		let me = this;
		me.listenerExp = new Listener({});
	}
	formRender(){
		console.log('formRender');
		let me = this;
		let {props} = me;
		return (
			<form ref="form" action="javascript:;">
				{React.Children.map(props.children, (child) => {
					return React.cloneElement(child, {validaor: me.listenerExp});
				})}
			</form>
		);
	}
	componentDidMount(){
		// 初始化验证实体
		let me = this;
		let {refs, props} = me;
		if( props.type ){
			return me.markMount();
		}else{
			return me.formMount();
		};
	}
	clearParam(param){
		['actionId', 'actionUUid', 'rule', 'errMessage'].forEach((val) => {
			delete param[val];
		});
		return param;
	}
	markMount(){
		console.log('markMount');
		let me = this;
		let {refs, props} = me;
		$(refs.mark).data('validatorParam', {...props});

	}
	formMount(){
		console.log('formMount');
		let me = this;
		let {refs, props, listenerExp} = me;
		$(refs.form).find('[data-mark]').each((index, node) => {
			// 实例化
			if( !node.childNodes.length ){
				let jNode = $(node);
				let param = jNode.data('validatorParam');
				param.validaor = listenerExp;
				if( param.type === 'submit' ){
					param.onClick = function(){
						listenerExp.execute();
					};
				};
				if( !param.value ){
					param.value = props.originData[param.name];
				};
				if( param.name ){
					listenerExp.addData(param.name, param.value);
					listenerExp.addMap(param.name, param.rule, param.errMessage);
				};
				jNode.data('widget', new InputWidget(me.clearParam(param), node) );
				jNode.data('validaor', listenerExp );
			}
		});
	}
	componentDidUpdate(){
		let me = this;
		let {refs, props} = me;
		if( props.type ){
			// return me.markMount();
		}else{
			// return me.formMount();
		};
	}
	componentWillUnmount(){
		let me = this;
		let {refs, props} = me;
		if( props.type ){
			return me.markUnMount();
		}else{
			return me.formUnMount();
		};
	}
	markUnMount(){
		let me = this;
		let {refs, props} = me;
		let jNode = $(refs.mark);
		let param = jNode.data('validatorParam');
		let widget = jNode.data('widget');
		let listenerExp = jNode.data('validaor');
		widget.destroy();
		jNode.removeData('validatorParam');
		jNode.removeData('widget');
		jNode.removeData('validaor');
		listenerExp.removeData(props.name);
	}
	formUnMount(){

	}

};

module.exports = Validator;

