
class CalendarCompute {
	props = {
		date: new Date(),
		target: null
	}
	state = {}
	constructor(config){
		let me = this;
		limit.assignSuper(me.state, me.props, config);
		let {state} = me;
		state.target = state.date ? new Date(state.date) : new Date();
		if( limit.isNaN(+state.target) ){
			throw state.target;
		};
	}
	setYear(year){
		let me = this;
		me.state.target.setYear(year);
		return me;
	}
	setMonth(month){
		let me = this;
		me.state.target.setMonth(--month);
		return me;
	}
	setDate(date){
		let me = this;
		me.state.target.setDate(date);
		return me;
	}
	getTarget(){
		let me = this;
		return me.state.target;
	}
	getYear(){
		let me = this;
		let {state} = me;
		return state.target.getFullYear();
	}
	getMonth(){
		let me = this;
		let {state} = me;
		return state.target.getMonth() + 1;
	}
	getDate(){
		let me = this;
		let {state} = me;
		return state.target.getDate();
	}
	getDay(){
		let me = this;
		let {state} = me;
		return state.target.getDay();
	}
	// 获取已知年月的那一天
	getTheDayInMonth(year, month){
		let me = this;
		let {state} = me;
		let last = CalendarCompute.getLastDayInMonth(year, month);
		let lastDate = last.getDate();
		let thisDate = new Date();
		let targetDate = me.getDate();
		thisDate.setYear(year);
		thisDate.setMonth(month - 1);
		thisDate.setDate(targetDate);
		state.target = targetDate <= lastDate ? thisDate : last;
		return me;
	}
	// 获取前一个月
	getPrevTheDayInMonth(){
		let me = this;
		let year = me.getYear();
		let month = me.getMonth();
		return me.getTheDayInMonth(year, --month);
	}
	// 获取后一个月
	getNextTheDayInMonth(){
		let me = this;
		let year = me.getYear();
		let month = me.getMonth();
		return me.getTheDayInMonth(year, ++month);
	}
	// 获取当前月的数据列表
	getDayListInMonth(){
		let me = this;
		return CalendarCompute.getDayListInMonth( me.getYear(), me.getMonth() );
	}
	parseTarget(str = 'yyyy-MM-dd'){
		let me = this;
		let {state} = me;
		return limit.formatDate(state.target, str); 
	}
	// 获取已知年月的最后一天
	static getLastDayInMonth(year, month){
		let date = new Date('2017-01-01');
		date.setYear(year);
		date.setMonth(month);
		date.setDate(0);
		return date;
	}
	// 获取已知年月的第一天
	static getFirstDayInMonth(year, month){
		let date = new Date('2017-01-01');
		date.setYear(year);
		date.setMonth(--month);
		date.setDate(1);
		return date;
	}
	// 获取已知年月的所有天
	static getDayListInMonth(year, month){
		let lastDay = CalendarCompute.getLastDayInMonth(year, month);
		return limit.from( new Array(lastDay.getDate()), (val, key) => {
			return new CalendarCompute({date: '2017-01-01'}).setYear(year).setMonth(month).setDate(++key).parseTarget()
		} );
	}
	// 获取42天的所有天
	static getFullDayListInMonth(year, month){
		let day = new CalendarCompute({date: '2017-01-01'}).setYear(year).setMonth(month).setDate(1).getDay();
		let prevArr = day ? CalendarCompute.getDayListInMonth(year, month - 1) : [];
		let thisArr = CalendarCompute.getDayListInMonth(year, month);
		let nextArr = CalendarCompute.getDayListInMonth(year, month + 1);
		return [].concat(prevArr.slice(-day), thisArr, nextArr.slice(0, 42 - day - thisArr.length));
	}
};

export default CalendarCompute;


















