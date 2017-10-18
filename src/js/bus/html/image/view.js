
import './style.less';

import Component from 'common/myReflux/component';
import ImageLoad from 'modules/image/index';


class Image extends Component {
	render(){
		let me = this;
		let {props} = me;
		return (
			<div className={me.getClassName('page-image')}>
				<ImageLoad />
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

export default Image;

