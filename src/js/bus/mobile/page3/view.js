
import './style.less';

import Component from 'common/myReflux/component';

class MobilePage3 extends Component {
	render(){
		let me = this;
		let {props} = me;
		return (
			<div className={me.getClassName('page-mobile-page3')}>
				pageMobilePage3
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

export default MobilePage3;

