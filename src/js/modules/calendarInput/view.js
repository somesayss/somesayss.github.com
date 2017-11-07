
import './style.less';

import Calendar from 'modules/calendar/index';
import Component from 'common/myReflux/component';

class CalendarInput extends Component {
	render(){
		let me = this;
		let {props} = me;
		return (
			<div className={me.getClassName('mod-calendar-input')}>
				<input type="text"
					ref="input"
					onFocus={me.focus.bind(me)}
					onBlur={function(){ me.timeoutId = setTimeout(() => { Actions(me).focus(false) }, 200) }}
					readOnly="readOnly" 
					value={props.value} />
				{do{
					if( props.calendarFocus ){
						<div className="calendar-input-content" style={{transform: `scale(${me.setWidth()/200})`}}>
							<Calendar target={props.value} width="200"
								onChangeYM={me.changeYM.bind(me)} 
								onSelect={Actions(me).select} />
						</div>
					}
				}}
			</div>
		);
	}
	setWidth(){
		let me = this;
		let {props: {calendarWidth}} = me;
		if( calendarWidth >= 200 ){
			calendarWidth = 200;
		}else if( calendarWidth <= 170 ){
			calendarWidth = 170;
		};
		return calendarWidth;
	}
	changeYM(){
		let me = this;
		// let {refs: {input: {refs: {com: {refs: {input}}}}}} = me;
		let {refs: {input}} = me;
		clearTimeout(me.timeoutId);
		me.isChangeYM = true;
		input.focus();
		me.isChangeYM = false;
	}
	focus(){
		let me = this;
		!me.isChangeYM && Actions(me).focus(true);
	}
	componentDidMount(){

	}
	componentDidUpdate(){

	}
	componentWillUnmount(){
		
	}
};

module.exports = CalendarInput;
