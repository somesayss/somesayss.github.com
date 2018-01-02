
import './style.less';

import Pre from '../pre/index';
import Logo from '../logo/index';
import Table from '../table/index';
import Component from 'common/myReflux/component';
import InputButton from 'modules/foolui/inputButton/index';

class FooluiInputButton extends Component {
	render(){
		let me = this;
		let {props} = me;
		return (
			<div className={me.getClassName('page-foolui-input-button', 'fn-PA10')}>
				<Logo />
				<div className="fn-PA10">
					<InputButton />
				</div>
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

export default FooluiInputButton;

