
import Control from 'common/myReflux/control';

class Controller extends Control {
	state = {
		value: '',
		isFocus: false
	}
	static defaultProps = {
		actionId: 'FooluiInputText',
		defaultValue: '',
		onChange: limit.K,
		onFocus: limit.K,
		onBlur: limit.K,
		placeholder: '',
		placeholderSize: 5,
		error: '',
		type: 'text',
		width: 300,
		height: 30,
		readOnly: false,
		disabled: false
	}
	constructor(props){
		let me = super();
		if( props.value ){
			props.defaultValue = props.value;
		}else if( props.defaultValue ){
			me.state.value = props.defaultValue;
		};
	}
	checkValue(val){
		let me = this;
		let {props: {type}} = me;
		let checkMap = {
			'number': /^\d+$/,
			'enword': /^\w+$/,
			'cnword': /^[\u4E00-\u9FA5]+$/
		};
		let check = checkMap[type];
		if( val && check ){
			return check.test(val);
		};
		return true;
	}
	onFocus(isFocus, e){
		let me = this;
		let {state, props} = me;
		state.isFocus = isFocus;
		let copyEvent = limit.assign({}, e);
		return me.updateComponent().then(() => {
			if( isFocus ){
				props.onFocus(copyEvent);
			}else{
				props.onBlur(copyEvent);
			};
		});
	}
	onChange(val, e){
		let me = this;
		let {state, props} = me;
		if( me.checkValue(val) ){
			state.value = val;
			return me.updateComponent().then(() => {
				return props.onChange(val, e);
			});
		}else{
			return me.updateComponent();
		};
	}
	onClearValue(){
		let me = this;
		let {state} = me;
		state.value = '';
		return me.updateComponent();
	}
};

export default Controller;
