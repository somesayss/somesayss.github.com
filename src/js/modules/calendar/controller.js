
import Control from 'common/myReflux/control';
import CalendarCompute from 'modules/calendarCompute/index';

class Controller extends Control {
	state = {
		calendarData: [],
		year: null,
		month: null,
		yearMonthStr: '',
		target: '',
		range: [null, null]
	}
	static defaultProps = {
		actionId: 'Calendar',
		width: 180,
		onSelect: limit.K,
		onChangeYM: limit.K
	}
	constructor(props){
		let me = super();
		let {state} = me;
		let theDate = new CalendarCompute({date: props.target});
		let year = state.year = theDate.getYear();
		let month = state.month = theDate.getMonth();
		me.setCalendarData();
		me.setYearMonthStr();
		state.target = theDate.parseTarget();
		state.today = new CalendarCompute().parseTarget();
	}
	componentWillUpdate(){
		let me = this;
		let {state} = me;
		let theDate = new CalendarCompute({date: state.target});
		let year = state.year = theDate.getYear();
		let month = state.month = theDate.getMonth();
		me.setCalendarData();
		me.setYearMonthStr();
		state.target = theDate.parseTarget();
	}
	onSelect(val){
		let me = this;
		let {state, props} = me;
		if( val ){
			state.target = val;
			return me.updateComponent().then(() => {
				return props.onSelect(state.target);
			});
		}else{
			return props.onSelect(null);
		};
	}
	onChangeMonth(key){
		let me = this;
		let {state, props} = me;
		if( key === 'prev' ){
			state.month--;
		}else{
			state.month++;
		};
		me.setCalendarData();
		me.setYearMonthStr();
		return me.updateComponent().then(() => {
			return props.onChangeYM();
		});
	}
	onChangeYear(key){
		let me = this;
		let {state, props} = me;
		if( key === 'prev' ){
			state.year--;
		}else{
			state.year++;
		};
		me.setCalendarData();
		me.setYearMonthStr();
		return me.updateComponent().then(() => {
			return props.onChangeYM();
		});
	}
	setCalendarData(){
		let me = this;
		let {state} = me;
		let arr = CalendarCompute.getFullDayListInMonth(state.year, state.month);
		state.calendarData = arr;
	}
	setYearMonthStr(){
		let me = this;
		let {state} = me;
		state.yearMonthStr = new CalendarCompute({date: '2017-01-01'}).setYear(state.year).setMonth(state.month).parseTarget('yyyy-MM');
	}
};

module.exports = Controller;
