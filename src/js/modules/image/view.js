
import './style.less';

import Component from 'common/myReflux/component';

class Image extends Component {
	render(){
		let me = this;
		let {props} = me;
		return (
			<div className={me.getClassName('mod-image')}>
				modImage
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
