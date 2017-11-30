
import './style.less';

import Component from 'common/myReflux/component';
import Validator from 'modules/validator/index';
import Input from 'modules/input/index';


class Test1 extends Component {
	render(){
		let me = this;
		let {props} = me;
		return (
			<div className={me.getClassName('page-test1')}>
				pageTest1
				<a href="#test2/index">点击进入test2</a>
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

