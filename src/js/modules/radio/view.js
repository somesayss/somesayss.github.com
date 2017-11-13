
import './style.less';

import Component from 'common/myReflux/component';

class Radio extends Component {
	render(){
		let me = this;
		let {props} = me;
		return (
			<div className={me.getClassName('mod-radio')}>
				modRadio
			</div>
		);
	}
	componentDidMount(){

	}
	componentDidUpdate(){

	}
	componentWillUnmount(){
		
	}
};

export default Radio;
