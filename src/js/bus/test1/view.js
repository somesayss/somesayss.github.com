
import './style.less';

import Component from 'common/myReflux/component';

class Test1 extends Component {
	render(){
		let me = this;
		let {props} = me;
		return (
			<div className={me.getClassName('page-test1')}>
				pageTest1
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

export default Test1;

