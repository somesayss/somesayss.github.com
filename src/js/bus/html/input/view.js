
import './style.less';

import InputText from 'modules/inputText/index';
import Component from 'common/myReflux/component';

class View extends Component {
	render(){
		let me = this;
		let {props} = me;
		return (
			<div>
				<InputText />
			</div>
		);
	}
	componentDidMount(){
		
	}
	componentWillUnmount(){
		
	}
};

export default View;