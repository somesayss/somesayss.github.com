
import './style.less';

import Component from 'common/myReflux/component';

import InputText from 'modules/inputText/index';

class Input extends Component {
	render(){
		let me = this;
		let {props} = me;
		return (
			<div>
				<InputText />
				<button onClick={Actions(me).click}>{props.a}</button>
			</div>
		);
	}
	componentDidMount(){
		
	}
	componentWillUnmount(){
		
	}
};

module.exports = Input;