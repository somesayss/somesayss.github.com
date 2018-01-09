
import './style.less';

import Component from 'common/myReflux/component';

class Test1 extends Component {
	render(){
		let me = this;
		let {props} = me;
		return (
			<div className={me.getClassName('page-test1')}>
				test xixihahaxixihaha
			</div>
		);
	}
	componentDidMount(){

	}
	componentDidUpdate(){

	}
};

export default Test1;

