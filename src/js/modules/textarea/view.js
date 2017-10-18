"use strict";

import './style.less';

import Mousemove from 'modules/mousemove/index';
import ScrollerView from 'modules/scroller/view';

// 组件类
class View extends ScrollerView {
	render(){
		let me = this;
		let {props} = me;
		let rows = limit.toNumber(props.rows);
		let height = props.height || rows * 16;
		return (
			<div className={['limit-scroller limit-textarea', props.className].filter(v=>v).join(' ')}
				style={ {height: height, width: props.width} }>
				<span className="ch-container-bar" ref="containerBar" >
					<span className="ch-bar" ref="bar" style={{height: props.barHeight}} onMouseDown={me.mousedown.bind(me)}></span>
				</span>
				<textarea 
					value={props.value} 
					className="ch-container"
					disabled={props.disabled}
					ref="container" onChange={Actions(me).change} onFocus={props.onFocus} onBlur={props.onBlur}>
				</textarea>
			</div>
		);
	}
};

export default View;

