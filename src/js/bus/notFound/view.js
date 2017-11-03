
import './style.less';

import Component from 'common/myReflux/component';

class NotFound extends Component {
	render(){
		let me = this;
		let {props} = me;
		return (
			<div className={me.getClassName('page-not-found')}>
				pageNotFound
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

export default NotFound;

