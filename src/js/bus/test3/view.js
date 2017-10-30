
import './style.less';

import Component from 'common/myReflux/component';

class Test3 extends Component {
	render(){
		let me = this;
		let {props} = me;
		return (
			<div className={me.getClassName('page-test3')}>
				pageTest3 xixi
			</div>
		);
	}
	componentDidMount(){

	}
	componentDidUpdate(){

	}
	componentWillUnmount(){
		console.log('Test3, componentWillUnmount');
	}
};

export default Test3;

