
import './style.less';

import InputText from 'modules/inputText/index';
import Scroller from 'modules/scroller/index';
import Component from 'common/myReflux/component';

class Multiple extends Component {
	render(){
		let me = this;
		let {props: {multipleFocus, width, height, list, readOnly, focusNumber, scrollSize}} = me;
		return (
			<div className={me.getClassName('mod-multiple', multipleFocus ? 'multiple-focus' : '')} 
				style={{width:width, height: height}}>
				<div className="multiple-trigger">
					<InputText type="text"
						ref="input"
						onFocus={me.focus.bind(me)}
						onChange={Actions(me).change}
						onKeyDown={me.keyDown.bind(me)} 
						onBlur={function(){ me.timeoutId = setTimeout(() => { Actions(me).focus(false) }, 100) }}
						readOnly={readOnly} 
						value={me.getValue()} />
					<i className="multiple-trigger-san"></i>
				</div>
				{do{
					if( multipleFocus ){
						<div className="multiple-content" style={{top: height - 1}}>
							{do{
								if( list.length <= scrollSize ){
									<ul className="fn-clear">
										{list.map((val, key) => {
											return <li key={key} 
												onClick={me.select.bind(me, val)}
												onMouseEnter={Actions(me).mouseEnter.bind(null, key)}
												className={`${val.selected ? 'active': ''} ${focusNumber === key ? 'focus' : ''}`}>{val.key}</li>;
										})}
									</ul>
								}else{
									<Scroller height={scrollSize * 28} ref="scroller" barHeight="50">
										<ul className="fn-clear">
											{list.map((val, key) => {
												return <li key={key} 
													onClick={me.select.bind(me, val)}
													onMouseEnter={Actions(me).mouseEnter.bind(null, key)}
													className={`${val.selected ? 'active': ''} ${focusNumber === key ? 'focus' : ''}`}>{val.key}</li>;
											})}
										</ul>
									</Scroller>
								}
							}}
						</div>
					}
				}}
			</div>
		);
	}
	getValue(){
		let me = this;
		let {props: {originList, multipleFocus, readOnly, value}} = me;
		if( !readOnly && multipleFocus ){
			return value;
		}else{
			return originList.filter((val) => val.selected).map((val) => {
				return limit.wordWrap(val.key, 5);
			}).join(',');
		};
	}
	scrollTo(){
		let me = this;
		let {refs: {scroller}} = me;
		if( scroller ){
			let num = me.props.focusNumber - me.props.scrollSize + 1;
			scroller.refs.com.scrollTo(num*28)
		};
	}
	focus(){
		let me = this;
		!me.isChangeList && Actions(me).focus(true).then(me.scrollTo.bind(me));
	}
	select(val){
		let me = this;
		let {refs: {input: {refs: {com: {refs: {input}}}}}} = me;
		clearTimeout(me.timeoutId);
		me.isChangeList = true;
		input.focus();
		me.isChangeList = false;
		return Actions(me).select(val);
	}
	keyDown(e){
		let me = this;
		let {props: {list}} = me;
		if( !e.shiftKey && !e.altKey && list.length ){
			// 
			let keyMap = {
				38: 'up',
				40: 'down'
			};
			if( keyMap[e.keyCode] ){
				e.preventDefault();
				Actions(me).keyDown(keyMap[e.keyCode]).then(me.scrollTo.bind(me));
			}else if(e.keyCode === 13){
				e.preventDefault();
				Actions(me).enterDown();
			};
		};
	}
	componentDidMount(){

	}
	componentDidUpdate(){

	}
	componentWillUnmount(){
		
	}
};

module.exports = Multiple;
