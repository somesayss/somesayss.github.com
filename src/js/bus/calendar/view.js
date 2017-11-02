
import './style.less';

import Component from 'common/myReflux/component';
import CalendarExp from 'modules/calendar/index';

class Calendar extends Component {
	render(){
		let me = this;
		let {props} = me;
		return (
			<div className={me.getClassName('page-calendar')}>
				<CalendarExp />
				<button onClick={Actions(me).change}>切 换</button>
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

module.exports = Calendar;
