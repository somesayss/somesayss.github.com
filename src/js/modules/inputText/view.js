
import './style.less';

import Component from 'common/myReflux/component';

class InputText extends Component {
	render(){
		let me = this;
		let {props} = me;
		return (
			<input {...props} ref="input" onChange={me.change.bind(me)}  />
		);
	}
	change(e){
		let me = this;
		return Actions(me).change(e.target.value, me.compositionstart);
	}
	componentDidMount(){
		let me = this;
		let {refs:{input}} = me;
		me.compositionstart = false;
		input = $(input);
		input.on('compositionstart', () => {
			me.compositionstart = true;
		});
		input.on('compositionend', () => {
			return Actions(me).change(input.val(), me.compositionstart = false);
		});
	}
	componentWillUnmount(){
		
	}
};

module.exports = InputText;
