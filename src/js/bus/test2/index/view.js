
import './style.less';

import Component from 'common/myReflux/component';

class Test2Index extends Component {
	render(){
		let me = this;
		let {props} = me;
		return (
			<div className={me.getClassName('page-test2index')}>
				pageTest2Index
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

export default Test2Index;

