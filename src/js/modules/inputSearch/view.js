"use strict";

import './style.less';
import Component from 'common/myReflux/component';
import Scroller from 'modules/scroller/index';
import InputText from 'modules/inputText/index';

// 组件类
class InputSearch extends Component {
	render(){
		let me = this;
		let {props: {filterData, value, focusNumber, isFocus, contentStyle}} = me;
		let data = filterData ;
		let leg = data.length;
		if( leg >= 3 ){
			leg = 3;
		};
		return (
			<div className={me.getClassName('limit-input-search', isFocus ? 'limit-input-search-focus' : '')}>
				<InputText type="text" ref="input" 
					onFocus={Actions(me).focus.bind(null, true)}
					onBlur={() => { setTimeout(() => { Actions(me).focus && Actions(me).focus(false) }, 100) }}
					onKeyDown={me.keyDown.bind(me)} 
					onChange={Actions(me).change} 
					value={value} />
				{do{
					if( isFocus && data.length ){
						<div className="limit-input-search-content" style={{...contentStyle, width:`${leg * 100 + 4}px`}}>
							{do{
								if( data.length <= 9 ){
									<ul className="fn-clear">
										{data.map((val, key) => {
											return <li key={key} style={{width: 100}}
												onClick={Actions(me).selectItem.bind(null, val, key)}
												className={`${key === focusNumber ? 'active': ''}`}>{val}</li>;
										})}
									</ul>
								}else{
									<Scroller height="75" ref="scroller" barHeight="50">
										<ul className="fn-clear">
											{data.map((val, key) => {
												return <li key={key} 
													onClick={Actions(me).selectItem.bind(null, val, key)}
													className={`${key === focusNumber ? 'active': ''}`}>{val}</li>;
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
	keyDown(e){
		let me = this;
		let {refs: {input, scroller}, props: {focusNumber, filterData}} = me;
		if( !e.shiftKey && !e.altKey && filterData.length ){
			// 
			let keyMap = {
				37: 'left',
				38: 'up',
				39: 'right',
				40: 'down'
			};
			if( keyMap[e.keyCode] ){
				e.preventDefault();
				Actions(me).keyDown(keyMap[e.keyCode]).then(() => {
					if( scroller ){
						let num = Math.floor( me.props.focusNumber / 3 ) - 2;
						scroller.refs.com.scrollTo(num*25)
					};
				});
			}else if(e.keyCode === 13){
				e.preventDefault();
				Actions(me).enterDown().then(() => {
					let inputNode = input.refs.com.refs.input;
					inputNode.blur();
					setTimeout(() => { inputNode.focus(); }, 150)
				});
			};
		};
	}
	getInput(){
		let me = this;
		return me.refs.input.refs.com.refs.input;
	}
};

module.exports = InputSearch;

