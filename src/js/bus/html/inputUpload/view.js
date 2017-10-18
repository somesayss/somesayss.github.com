
import './style.less';

import Upload from 'modules/inputUpload/index';
import Component from 'common/myReflux/component';

class InputUpload extends Component {
	render(){
		let me = this;
		let {props} = me;
		return (
			<div className={me.getClassName('page-input-upload')}>
				<Upload />
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

export default InputUpload;

