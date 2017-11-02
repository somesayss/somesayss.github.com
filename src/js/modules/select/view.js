
import './style.less';

import Scroller from 'modules/scroller/index';
import Component from 'common/myReflux/component';

class Select extends Component {
	getFirstSelect(){
		let me = this;
		let {props: {list}} = me;
		let key = null;
		list.some((val) => {
			if( val.selected ){
				key = val.key;
				return true;
			};
		});
		if( key === null && list[0] ){
			key = list[0].key;
		};
		return key;
	}
	render(){
		let me = this;
		let {props: {width, height, focus, scrollSize, list, focusNumber}} = me;
		let lineHeight = (height-18)/2;
		return (
			<div className={me.getClassName('mod-select', focus ? 'mod-select-focus' : '')} style={{width:width, height:height}}>
				<div className="select-trigger">
					<input type="text" 
						style={{paddingTop:lineHeight, paddingBottom: lineHeight}}
						ref="input"
						value={me.getFirstSelect()} 
						readOnly="readOnly" 
						onKeyDown={me.keyDown.bind(me)} 
						onFocus={me.focus.bind(me)}
						onBlur={() => { setTimeout(() => {Actions(me).focus(null, false)}, 100) }} />
					<i className="select-trigger-san"></i>
				</div>
				{do{
					if( focus ){
						<div className="select-container" style={{top:height-1}}>
						{do{
							if( list.length <= scrollSize ){
								<ul className="fn-clear">
									{list.map((val, key) => {
										return <li key={key}
											onClick={Actions(me).select.bind(null, val, key)}
											className={`${key === focusNumber ? 'active': ''}`}>{val.key}</li>;
									})}
								</ul>
							}else{
								<Scroller height={scrollSize * 28} ref="scroller" barHeight="50">
									<ul className="fn-clear">
										{list.map((val, key) => {
											return <li key={key} 
												onClick={Actions(me).select.bind(null, val, key)}
												className={`${key === focusNumber ? 'active': ''}`}>{val.key}</li>;
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
	focus(){
		let me = this;
		Actions(me).focus(true).then(me.scrollTo.bind(me));
	}
	scrollTo(){
		let me = this;
		let {refs: {scroller}} = me;
		if( scroller ){
			let num = me.props.focusNumber - me.props.scrollSize + 1;
			scroller.refs.com.scrollTo(num*28)
		};
	}
	keyDown(e){
		let me = this;
		let {refs: {input, scroller}, props: {focusNumber, list}} = me;
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
				Actions(me).enterDown().then(() => {
					input.blur();
				});
			};
		};
	}
	componentDidUpdate(){

	}
	componentDidMount(){

	}
	componentWillUnmount(){
		
	}
};

module.exports = Select;
