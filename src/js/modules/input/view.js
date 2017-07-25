"use strict";

import './style.less';

const domUtil = require('common/domUtil');
const Select = require('modules/select/index');
const Textarea = require('modules/textarea/index');
const File = require('./file');

const formMap = {
	number: 'text',
	submit: 'button',
	reset: 'button'
};

// 组件类
class Form extends React.Component {
	render(){
		let me = this;
		let {props} = me;
		let fn = me[`${me.getType()}Render`];
		let classNameArr = [props.className, 'limit-form'].filter(v => v);
		if( props.focus ){
			classNameArr.push('limit-form-focus');
		};
		if( props.validaorError ){
			classNameArr.push('limit-form-error');
		};
		if( props.disabled ){
			classNameArr.push('limit-form-disabled');
		};
		return (
			<div 
				className={classNameArr.join(' ')} 
				style={ {width:me.getWidth()} }>
				{do{
					if( props.validaorError ){
						<div className="ch-error-info">{props.validaorError}</div>
					}
				}}
				{ fn ?  fn.call(me) : null}
			</div>
		);
	}
	getType(){
		let me = this;
		let {props} = me;
		let type = formMap[props.type];
		return type ? type : props.type;
	}
	getWidth(){
		let me = this;
		let {props} = me;
		if( props.width ){
			return props.width;
		};
		return props[`${me.getType()}Width`]
	}
	parseProps(){
		let me = this;
		let {props} = me;
		let newProps = limit.filter(props, (val, key) => {
			return !limit.contains(['actionId', 'actionUUid', 'className', 'placeholder'], key);
		});
		['onFocus', 'onBlur', 'onChange'].forEach((val) => {
			newProps[val] = function(...args){
				props[val] && undefined::props[val](...args);
				let fun = Actions(me)[`${props.type}${val.slice(2)}`];
				if( fun ){
					fun(...args);
				}else{
					Actions(me)[`${val.slice(2).toLowerCase()}`](...args);
				};
			};
		});
		return newProps;
	}
	selectRender(){
		let me = this;
		let {props} = me;
		return (
			<Select {...me.parseProps()} width="100%" className={`limit-form-${props.type}`}>
				{props.children}
			</Select>
		);
	}
	textRender(){
		let me = this;
		let {props} = me;
		return (
			<div className={`limit-form-${me.getType()}`}>
				{do{
					if( props.value ){
						<a href="javascript:;" tabIndex="-1" className="ch-clear" onClick={!props.disabled ? Actions(me).clear.bind(me) : null}>×</a>
					}
				}}
				<input className={props.pswShow?'':'fn-hide'} autoComplete="off" {...me.parseProps()} ref="input" type={me.getType()}   />
				{do{
					if( props.type === 'password' ){
						<input className={props.pswShow?'fn-hide':''} autoComplete="off" {...me.parseProps()} ref="inputPwd" type="text" name=""/>
					}
				}}
				{do{
					if( !props.value ){
						<span className="ch-placeholder">{props.placeholder}</span>
					}
				}}
				{do{
					if( props.value && props.type === 'password' ){
						<span className="ch-container-eye" onClick={Actions(me).toggleEye}><i className="ch-eye"></i></span>
					}
				}}
			</div>
		);
	}
	passwordRender(){
		let me = this;
		return me.textRender();
	}
	fileRender(){
		let me = this;
		return (
			<div className={`limit-form-${me.getType()}`}>
				<File {...me.parseProps()} />
			</div>
		);
	}
	buttonRender(){
		let me = this;
		let {props} = me;
		let type = props.type;
		return (
			<div className={`limit-form-${me.getType()}`}>
				<input {...me.parseProps()} ref="input" />
			</div>
		);
	}
	textareaRender(){
		let me = this;
		let {props} = me;
		return (
			<div className={`limit-form-${props.type}`}>
				{do{
					if( !props.value ){
						<span className="ch-placeholder">{props.placeholder}</span>
					}
				}}
				<Textarea {...me.parseProps()}/>
			</div>
		) 
	}
	componentDidUpdate(){
		let me = this;
		let {props} = me;
		if( limit.contains(['text', 'password', 'number'], props.type) && props.clearSuccess ){
			if( props.pswShow ){
				me.selectInput(me.refs.input);
			}else{
				me.selectInput(me.refs.inputPwd);
			};
		};
	}
	componentDidMount(){
		let me = this;
		let {refs, props} = me;
		let {eye, input} = refs;
		Actions(me).comDidMount();
		if( input && props.focus ){
			me.selectInput(input);
		};
	}
	componentWillUnmount(){
		let me = this;
		let {props} = me;
		let {refs} = me;
		let {eye, input} = refs;
		let validaor = props.validaor;
		if( validaor ){
			validaor.removeAllListeners(`${props.name}Validat`);
			validaor.removeAllListeners(`${props.name}Reset`);
		};
	}
	selectInput(input){
		if( limit.contains(['text', 'textarea', 'password'], input.type) ){
			let length = input.value.length;
			return domUtil.textSelect(input, length, length);
		}else if( limit.contains(['button', 'reset', 'submit'], input.type) ){
			input.focus();
		};
		
	}
};

module.exports = Form;

