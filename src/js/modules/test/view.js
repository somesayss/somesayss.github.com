
import './style.less';

import Component from 'common/myReflux/component';

class Test extends Component {
	render(){
		let me = this;
		let {props} = me;
		return (
			<div className={me.getClassName('mod-test')}>
				modTest
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

export default Test;
