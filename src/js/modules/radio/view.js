
import './style.less';

import Component from 'common/myReflux/component';

class Radio extends Component {
	render(){
		let me = this;
		let {props} = me;
		return (
			<label className={me.getClassName('mod-radio', me.getRadioClassName())}>
				<input
					onClick={Actions(me).click} 
					onChange={Actions(me).change}
					onFocus={props.onFocus}
					onBlur={props.onBlur}
					checked={props.checked}
					disabled={props.disabled}
					defaultChecked={props.defaultChecked}
					name={props.name}
					value={props.value}
					type="radio" 
					ref="input" />
				<span className="radio-mock"></span>
				<span className="radio-right"></span>
			</label>
		);
	}
	getRadioClassName(){
		let me = this;
		let {props} = me;
		let arr = [];
		if( props.isClick ){
			arr.push('radio-clicked');
		};
		if( props.checked ){
			arr.push('radio-checked');
		};
		if( props.disabled ){
			arr.push('radio-disabled');
		};
		return arr.join(' ');
	}
	componentDidMount(){

	}
	componentDidUpdate(){

	}
	componentWillUnmount(){
		
	}
};

export default Radio;
