
import './style.less';

import Component from 'common/myReflux/component';

class Checkbox extends Component {
	render(){
		let me = this;
		let {props} = me;
		return (
			<label className={me.getClassName('mod-checkbox', me.getCheckBoxClassName())}>
				<input
					onClick={Actions(me).click} 
					onChange={Actions(me).change}
					onFocus={props.onFocus}
					onBlur={props.onBlur}
					checked={props.checked}
					disabled={props.disabled}
					type="checkbox" 
					ref="input" />
				<span className="checkbox-mock"></span>
				<span className="checkbox-right"></span>
			</label>
		);
	}
	getCheckBoxClassName(){
		let me = this;
		let {props} = me;
		let arr = [];
		if( props.isClick ){
			arr.push('checkbox-clicked');
		};
		if( props.indeterminate ){
			arr.push('checkbox-indeterminate');
		}else{
			if( props.checked ){
				arr.push('checkbox-checked');
			};
		};
		if( props.disabled ){
			arr.push('checkbox-disabled');
		};
		return arr.join(' ');
	}
	componentDidMount(){
		let me = this;
		let {refs: {input}, props: {indeterminate}} = me;
		input.indeterminate = !!indeterminate;
	}
	componentDidUpdate(){
		let me = this;
		me.componentDidMount();
	}
	componentWillUnmount(){
		
	}
};

export default Checkbox;
