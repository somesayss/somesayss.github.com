
import './style.less';

import Logo from '../logo/view';
import Component from 'common/myReflux/component';

class FooluiIndex extends Component {
	render(){
		let me = this;
		let {props: {uiList}} = me;
		return (
			<div className={me.getClassName('page-foolui-index', 'fn-PA10')}>
				<Logo />
				<ul className="fn-PA10 foolui-index-container">
					{uiList.map((ui) => {
						return (
							<li>
								<a href={`#foolui/${ui.split(' ')[0]}`}>{ui}</a>
							</li>
						);
					})}
				</ul>
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

export default FooluiIndex;

