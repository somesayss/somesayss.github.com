
import './style.less';

import domUtil from 'common/domUtil';
import Calendar from 'modules/calendar/index';
import Component from 'common/myReflux/component';

class CalendarRange extends Component {
	render(){
		let me = this;
		let {props} = me;
		return (
			<div className={me.getClassName('mod-calendar-range')}>
				<input type="text"
					ref="input"
					onFocus={me.focus.bind(me)}
					onBlur={function(){ me.timeoutId = setTimeout(() => { Actions(me).focus(false) }, domUtil.isIEOld(100, 200) ) }}
					readOnly="readOnly" 
					value={me.getValue()} />
				{do{
					if( props.calendarFocus ){
						<div className="calendar-input-content" style={{transform: `scale(${me.setWidth()/200})`, width: 399}}>
							<Calendar 
								target={props.value[0]} 
								range={[null, props.value[1]]}
								width="200"
								className="calendar-input-le"
								onChangeYM={me.changeYM.bind(me)} 
								onSelect={me.select.bind(me, 'le')} />
							<Calendar 
								target={props.value[1]} 
								range={[props.value[0], null]}
								width="200"
								className="calendar-input-ri"
								onChangeYM={me.changeYM.bind(me)} 
								onSelect={me.select.bind(me, 'ri')} />
						</div>
					}
				}}
			</div>
		);
	}
	getValue(){
		let me = this;
		let {props} = me;
		if( limit.isArray(props.value) ){
			if( props.value.every((v) => limit.isNull(v)) ){
				return '';
			}else{
				return props.value.join(',')
			};
			
		}else{
			return props.value;
		};
	}
	setWidth(){
		let me = this;
		let {props: {calendarRangeWidth}} = me;
		if( calendarRangeWidth >= 200 ){
			calendarRangeWidth = 200;
		}else if( calendarRangeWidth <= 170 ){
			calendarRangeWidth = 170;
		};
		return calendarRangeWidth;
	}
	changeYM(){
		let me = this;
		let {refs: {input}} = me;
		clearTimeout(me.timeoutId);
		me.isChangeYM = true;
		input.focus();
		me.isChangeYM = false;
	}
	select(key, val){
		let me = this;
		me.changeYM();
		if( key === 'le' ){
			return val && Actions(me).selectLe(val)
		}else{
			return val && Actions(me).selectRi(val);
		};
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

module.exports = CalendarRange;
