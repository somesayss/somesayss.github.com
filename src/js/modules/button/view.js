
import './style.less';

import Component from 'common/myReflux/component';

class Button extends Component {
	render(){
		let me = this;
		let {props} = me;
		return (
			<button 
				ref="button"
				disabled={props.disabled}
				onClick={Actions(me).click} 
				onFocus={props.onFocus}
				onBlur={props.onBlur}
				onMouseEnter={props.onMouseEnter}
				className={me.getClassName('mod-button', props.isClick ? 'button-clicked': null, me.getButtonColor())} 
				type={props.type}><span>{props.value}</span></button>
		);
	}
	getButtonColor(){
		let me = this;
		let {props} = me;
		if( props.disabled ){
			return `button-color-disabled`;
		}else{
			return `button-color-${props.colorType}`;
		};	
	}
	focus(){
		let me = this;
		let {refs: {button}} = me;
		button.focus();
	}
	getButton(){
		let me = this;
		let {refs: {button}} = me;
		return button; 
	}
	componentDidMount(){

	}
	componentDidUpdate(){

	}
	componentWillUnmount(){
		
	}
};

export default Button;
