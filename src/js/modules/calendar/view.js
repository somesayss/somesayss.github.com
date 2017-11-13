
import './style.less';

import Component from 'common/myReflux/component';

class Calendar extends Component {
	render(){
		let me = this;
		let {props} = me;
		let fontSize = (props.width-4)/7;
		return (
			<div className={me.getClassName('mod-calendar')} style={{width:props.width}}>
				<div className="calendar-title" style={{fontSize:fontSize}}>
					{me.renderTitle()}
					{me.renderContent()}
					{me.renderContentMain()}
				</div>
			</div>
		);
	}
	renderTitle(){
		let me = this;
		let {props} = me;
		return (
			<div className="calendar-title-table">
				<div className="calendar-title-cell calendar-title-click">
					<a href="javascript:;" tabIndex="-1" onClick={Actions(me).changeYear.bind(null, 'prev')}>&#171;</a>
				</div>
				<div className="calendar-title-cell calendar-title-click">
					<a href="javascript:;" tabIndex="-1" onClick={Actions(me).changeMonth.bind(null, 'prev')}>&#8249;</a>
				</div>
				<div className="calendar-title-cell calendar-title-text">
					{props.yearMonthStr}
				</div>
				<div className="calendar-title-cell calendar-title-click">
					<a href="javascript:;" tabIndex="-1" onClick={Actions(me).changeMonth.bind(null, 'next')}>&#8250;</a>
				</div>
				<div className="calendar-title-cell calendar-title-click">
					<a href="javascript:;" tabIndex="-1" onClick={Actions(me).changeYear.bind(null, 'next')}>&#187;</a>
				</div>
			</div>
		);
	}
	renderContent(){
		return (
			<div className="calendar-content">
				<ul>
					{['日', '一', '二', '三', '四', '五', '六'].map((v, k) => {
						return (
							<li key={k}>
								<span className="calendar-main-table">
									<span className="calendar-main-cell">{v}</span>
								</span>
							</li>
						);
					})}
				</ul>
			</div>
		);
	}
	renderContentMain(){
		let me = this;
		let {props: {calendarData, year, month, yearMonthStr, target, today}} = me;
		return (
			<div className="calendar-content calendar-main">
				<ul>
					{calendarData.map((v, k) => {
						let arr = v.split('-');
						let flag = me.rangeTime(v);
						return (
							<li key={k} 
								className={[target === v ? 'active' : '', today === v ? 'today': '', !flag ? 'range': ''].join(' ')}
								onClick={flag ? Actions(me).select.bind(null, v) : Actions(me).select.bind(null, null)}
								style={{color: v.indexOf(yearMonthStr) !== -1 ? '#666' : '#CCC'}}>
								<span className="calendar-main-table">
									<span className="calendar-main-cell">{arr[2]}</span>
								</span>
							</li>
						);
					})}
				</ul>
			</div>
		);
	}
	rangeTime(val){
		let me = this;
		let {props: {range}} = me;
		let min = limit.isNull(range[0]) ? -Infinity : +new Date(range[0]);
		let max = limit.isNull(range[1]) ? Infinity : +new Date(range[1]);
		let tar = +new Date(val);
		// 如果三者都是非NaN切
		if( limit.every([min, max, tar], (val) => !limit.isNaN(val)) &&  tar >= min && tar <= max ){
			return true;
		};
	}
	componentDidMount(){

	}
	componentDidUpdate(){

	}
	componentWillUnmount(){
		
	}
};

module.exports = Calendar;
