"use strict";
	
// 依赖
const Control = require('common/myReflux/control');

const regNum = /^[\d\.]*$/;

class Controller extends Control {
	state = {
		textWidth: 300,
		passwordWidth: 300,
		selectWidth: 300,
		textareaWidth: 300,
		value: '',
		focus: false,
		clearSuccess: false,
		validaorError: null,
		pswShow: true
	}
	static defaultProps = {
		validaor: null,
		name: '',
		type: 'text',
		rule: '',
		errMessage:'',
		actionId: 'limitForm',
		onChange: limit.K
	}
	onChange(e){
		let me = this;
		let {state, props} = me;
		let value;
		if( e.target ){
			value = e.target.value;
		}else{
			value = e;
		};
		// 对于类型是number的拦截
		if( props.type === 'number' && !regNum.test(value) ){
			return;
		};
		state.value = value;
		if( value ){
			me.updateOriginData(value);
			me.updateComponent().then(() => {
				props.validaor && props.validaor.emit(`${props.name}Validat`);
			});
		}else{
			me.onClear();
		};
	}
	onFocus(){
		let me = this;
		let {state} = me;
		state.focus = true;
		me.updateComponent();
	}
	onBlur(){
		let me = this;
		let {state} = me;
		state.focus = false;
		me.updateComponent();
	}
	onToggleEye(){
		let me = this;
		let {state} = me;
		state.pswShow = !state.pswShow;
		state.clearSuccess = true;
		me.updateComponent().then(() => {
			state.clearSuccess = false;
		});
	}
	onClear(){
		let me = this;
		let {state, props} = me;
		state.value = '';
		state.clearSuccess = true;
		state.validaorError = null;
		// 更新数据源数据
		me.updateOriginData('');
		me.updateComponent().then(() => {
			state.clearSuccess = false;
		});
	}
	updateOriginData(val){
		let me = this;
		let {state, props} = me;
		let validaor = props.validaor;
		if( validaor && limit.isDefined( validaor.getData(props.name) ) ){
			validaor.addData(props.name, val);
		};
	}
	onComDidMount(){
		let me = this;
		let {state, props} = me;
		let validaor = props.validaor;
		if( validaor && props.name ){
			validaor.addData(props.name, state.value);
			validaor.addMap(props.name, props.rule, props.errMessage);
			validaor.on(`${props.name}Validat`, () => {
				let validaorState = validaor.state;
				let originData = validaorState.originData;
				if( limit.isDefined(originData[props.name]) ){
					let valRtv = validaorState.validatMap[props.name](originData[props.name]);
					me.state.validaorError = valRtv;
				}else{
					me.state.validaorError = null;
				};
				me.updateComponent();
			});
			let originVal = state.value;
			validaor.on(`${props.name}Reset`, () => {
				let validaorState = validaor.state;
				let originData = validaorState.originData;
				originData[props.name] = me.state.value = originVal;
				me.state.validaorError = null;
				me.updateComponent().then(() => {
					me.props.onChange(originVal);
				});
			});

		};
	}
};

module.exports = Controller;



























