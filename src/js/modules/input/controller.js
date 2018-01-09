"use strict";
	
// 依赖
import Control from 'common/myReflux/control';

const regNum = /^[\d\.-]*$/;

class Controller extends Control {
	state = {
		textWidth: 300,
		passwordWidth: 300,
		selectWidth: 300,
		multipleWidth: 300,
		textareaWidth: 300,
		calendarWidth: 200,
		calendarRangeWidth: 200,
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
		defaultChecked: false,
		actionId: 'limitForm',
		onChange: limit.K
	}
	onChange(e, ...args){
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
		// 对类型是文件的拦截
		if( limit.contains(['file', 'radio', 'checkbox'], props.type) ){
			return;
		};
		state.value = value;
		me.updateOriginData(value);
		return me.updateComponent().then(() => {
			return value && props.validaor && props.validaor.emit(`${props.name}Validat`);
		});
	}
	onFocus(){
		let me = this;
		let {state} = me;
		state.focus = true;
		return me.updateComponent();
	}
	onBlur(){
		let me = this;
		let {state} = me;
		state.focus = false;
		return me.updateComponent();
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
			return me.updateComponent().then(() => {
				return props.onChange('');
			});
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
			let originChecked = props.defaultChecked;
			validaor.on(`${props.name}Reset`, () => {
				let validaorState = validaor.state;
				let originData = validaorState.originData;
				originData[props.name] = me.state.value = originVal;
				if( limit.contains(['radio', 'checkbox'], props.type) ){
					me.resetChecked();
				};
				me.state.validaorError = null;
				me.updateComponent().then(() => {
					me.props.onChange(originVal);
				});
			});

		};
	}
	resetChecked(){
		let me = this;
		let theCheckControl = me.com.refs.com.refs.input.__controller__;
		theCheckControl.onResetChecked();
	}
};

export default Controller;



























