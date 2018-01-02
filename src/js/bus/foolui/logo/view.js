
import './style.less';

import Component from 'common/myReflux/component';

class FooluiLogo extends Component {
	render(){
		let me = this;
		let {props} = me;
		return (
			<div className={me.getClassName('page-foolui-logo')}>
				<h2>
					<span className="fn-FS20 foolui-logo-title fn-MR5">FOOLUI</span>
					<a href="javascript:history.back();" className="fn-FS12 foolui-logo-back">返回 &#171;</a>
				</h2>
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

export default FooluiLogo;

