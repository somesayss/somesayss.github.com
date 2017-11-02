"use strict";

import './style.less';

import Checkbox from './checkbox';

import domUtil from 'common/domUtil';
import Component from 'common/myReflux/component';

import Button from 'modules/button/index';
import Select from 'modules/select/index';
import Textarea from 'modules/textarea/index';
import Multiple from 'modules/multiple/index';
import Upload from 'modules/inputUpload/index';
import CalendarInput from 'modules/calendarInput/index';
import CalendarRange from 'modules/calendarRange/index';

const formMap = {
	number: 'text',
	submit: 'button',
	reset: 'button'
};

// 组件类
class View extends Component {
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
	doOriginFun(val, e, args){
		let me = this;
		let {props} = me;
		let originFun = props[val];
		if( originFun ){
			undefined::originFun(e.target ? e.target.value: e, e, ...args);
		};
	}
	parseProps(){
		let me = this;
		let {props} = me;
		let newProps = limit.filter(props, (val, key) => {
			return !limit.contains(['actionId', 'actionUUid', 'className', 'placeholder'], key);
		});
		['onFocus', 'onBlur', 'onChange'].forEach((val) => {
			newProps[val] = function(e, ...args){
				let fun = Actions(me)[`${props.type}${val.slice(2)}`];
				if( fun ){
					fun(e, ...args).then(me.doOriginFun.bind(me, val, e, args));
				}else{
					Actions(me)[`${val.slice(2).toLowerCase()}`](e, ...args).then(me.doOriginFun.bind(me, val, e, args));
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
			<div className={`limit-form-${me.getType()}`} style={{paddingRight: props.readOnly ? '6' : null}}>
				{do{
					if( props.value && !props.readOnly ){
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
				<Upload {...me.parseProps()} />
			</div>
		);
	}
	buttonRender(){
		let me = this;
		let {props} = me;
		let type = props.type;
		return (
			<div className={`limit-form-${me.getType()}`}>
				<Button {...me.parseProps()} ref="input" />
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
	multipleRender(){
		let me = this;
		let {props} = me;
		return (
			<div className={`limit-form-${props.type}`}>
				{do{
					if( !(''+props.value) ){
						<span className="ch-placeholder">{props.placeholder}</span>
					}
				}}
				<Multiple {...me.parseProps()} width="100%" className={`limit-form-${props.type}`}>
					{props.children}
				</Multiple>
			</div>
		);
	}
	checkboxRender(){
		let me = this;
		return <Checkbox {...me.parseProps()} />
	}
	calendarRender(){
		let me = this;
		let {props} = me;
		return (
			<div className={`limit-form-calendar`}>
				{do{
					if( !props.value ){
						<span className="ch-placeholder">{props.placeholder}</span>
					}
				}}
				{do{
					if( props.value ){
						<a href="javascript:;" tabIndex="-1" className="ch-clear" onClick={!props.disabled ? Actions(me).clear.bind(me) : null}>×</a>
					}
				}}
				<CalendarInput {...me.parseProps()} />
			</div>
		)
	}
	calendarRangeRender(){
		let me = this;
		let {props} = me;
		let parseProps = me.parseProps();
		if( !limit.isArray(parseProps.value) ){
			parseProps.value = [null, null];
		};
		return (
			<div className={`limit-form-calendar`}>
				{do{
					if( !props.value ){
						<span className="ch-placeholder">{props.placeholder}</span>
					}
				}}
				{do{
					if( props.value ){
						<a href="javascript:;" tabIndex="-1" className="ch-clear" onClick={!props.disabled ? Actions(me).clear.bind(me) : null}>×</a>
					}
				}}
				<CalendarRange {...parseProps} />
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
		let me = this;
		let {props} = me;
		if( limit.contains(['text', 'textarea', 'password'], props.type) ){
			let length = input.value.length;
			return domUtil.textSelect(input, length, length);
		}else if( limit.contains(['button', 'reset', 'submit'], props.type) ){
			input.refs.com.focus();
		};
		
	}
};

export default View;

