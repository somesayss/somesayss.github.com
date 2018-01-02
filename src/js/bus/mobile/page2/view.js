
import './style.less';

import Component from 'common/myReflux/component';

class MobilePage2 extends Component {
	render(){
		let me = this;
		let {props} = me;
		return (
			<div className={me.getClassName('page-mobile-page2')}>
				pageMobilePage2
				<a href="#mobile/page3">点取去page3</a>
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

export default MobilePage2;

