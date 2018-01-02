
import './style.less';

import Component from 'common/myReflux/component';

class MobilePage1 extends Component {
	render(){
		let me = this;
		let {props} = me;
		return (
			<div className={me.getClassName('page-mobile-page1')}>
				pageMobilePage1
				<a href="#mobile/page2">点取去page2</a>
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

export default MobilePage1;

