
import './style.less';

import Component from 'common/myReflux/component';

class NoPermission extends Component {
	render(){
		let me = this;
		let {props} = me;
		return (
			<div className={me.getClassName('page-no-permission')}>
				pageNoPermission
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

export default NoPermission;

