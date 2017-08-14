
import './style.less';

import Component from 'common/myReflux/component';

class Mobile extends Component {
	render(){
		let me = this;
		let {props} = me;
		return (
			<div className={me.getClassName('page-mobile')}>
				<div className="mobile-left">
					mobile-left
				</div>
				<div className="mobile-right">
					<div className="mobile-cell">
						mobile-cell1
					</div>
					<div className="mobile-cell">
						mobile-cell1
					</div>
					<div className="mobile-cell">
						mobile-cell1
					</div>
					<div className="mobile-cell">
						mobile-cell1
					</div>
				</div>
			</div>
		);
	}
	componentWillUnmount(){
		
	}
};

module.exports = Mobile;
