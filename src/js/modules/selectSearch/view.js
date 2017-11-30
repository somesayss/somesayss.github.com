
import './style.less';

import Component from 'common/myReflux/component';
import Scroller from 'modules/scroller/index';
import AutoSizeInput from 'modules/autoSizeInput/index';

class SelectSearch extends Component {
	render(){
		let me = this;
		let {props: {list, originList, selectSearchFocus, width, focusNumber, value, scrollSize}} = me;
		return (
			<div 
				className={me.getClassName('mod-select-search', selectSearchFocus ? 'select-search-focus' : null)} 
				style={{width: width}}>
				<div className="select-search-trigger" onClick={me.toFocusInput.bind(me)}>
					{originList.filter((val) => val.selected).map((val, key) => {
						return (
							<span className="select-search-box" key={key}>
								{val.key}
								<a href="javascript:;" onClick={Actions(me).select.bind(null, val)} className="select-search-delete">×</a>
							</span>
						);
					})}
					<AutoSizeInput ref="input" 
						className="select-search-input" 
						onFocus={me.focus.bind(me)}
						onBlur={function(){ me.timeoutId = setTimeout(() => { Actions(me).focus(false) }, 200) }}
						onChange={Actions(me).change}
						onKeyDown={me.keyDown.bind(me)} 
						value={value}
						maxWidth={292}/>
					<span className="select-trigger-san"></span>
				</div>
				{do{
					if( selectSearchFocus ){
						<div className="select-search-container" onClick={me.toClearTimeout.bind(me)}>
							{do{
								if( list.length <= scrollSize ){
									{me.renderList(list)}
								}else{
									<Scroller height={scrollSize * 28} ref="scroller" barHeight="50">
										{me.renderList(list)}
									</Scroller>
								}
							}}
						</div>
					}
				}}
			</div>
		);
	}
	renderList(list){
		let me = this;
		let {props: {focusNumber, notFound}} = me;
		return (
			<ul className="fn-clear">
				{list.map((val, key) => {
					return <li key={key} 
						onClick={me.select.bind(me, val)}
						onMouseEnter={Actions(me).mouseEnter.bind(null, key)}
						className={`${val.selected ? 'active': ''} ${focusNumber === key ? 'focus' : ''}`}>{val.key}</li>;
				})}
				{do{
					if( !list.length ){
						<li>{notFound}</li>
					}
				}}
			</ul>
		);
	}
	toFocusInput(){
		let me = this;
		let {refs: {input}, props} = me;
		let autoSizeInput = input.refs.com;
		autoSizeInput.focusInput();
		clearTimeout(me.timeoutId);
	}
	toClearTimeout(){
		let me = this;
		clearTimeout(me.timeoutId);
	}
	scrollTo(focusNumber){
		let me = this;
		let {refs: {scroller}, props} = me;
		if( scroller ){
			let num = (focusNumber ? focusNumber : me.props.focusNumber) - me.props.scrollSize + 1;
			scroller.refs.com.scrollTo(num*28)
		};
	}
	getFirstNumber(){
		let me = this;
		let {props} = me;
		let firstNumber;
		props.list.some((val, key) => {
			if( val.selected ){
				firstNumber = key;
				return true;
			};
		});
		return firstNumber;
	}
	focus(){
		let me = this;
		!me.isChangeList && Actions(me).focus(true).then(me.scrollTo.bind(me, me.getFirstNumber()));
	}
	keyDown(e){
		let me = this;
		let {props: {list, value, focusNumber}} = me;
		if( !e.shiftKey && !e.altKey && list.length ){
			// 
			let keyMap = {
				38: 'up',
				40: 'down'
			};
			if( keyMap[e.keyCode] ){
				e.preventDefault();
				Actions(me).keyDown(keyMap[e.keyCode]).then(me.scrollTo.bind(me, null));
			}else if(e.keyCode === 13){
				e.preventDefault();
				Actions(me).enterDown();
			}else if(e.keyCode === 8){
				!e.target.value && Actions(me).deleteItem();
			}
		};
	}
	select(val){
		let me = this;
		let {refs: {input: {refs: {com: {refs: {input}}}}}} = me;
		me.isChangeList = true;
		me.toFocusInput();
		me.isChangeList = false;
		return Actions(me).select(val);
	}
	componentDidMount(){

	}
	componentDidUpdate(){

	}
	componentWillUnmount(){
		let me = this;
		me.toClearTimeout();
	}
};

export default SelectSearch;
