"use strict";

import './style.less';

const Scroller = require('modules/scroller/index');

// 组件类
class Title extends React.Component {
	constructor(){
		super(...arguments);
	}
	render(){
		let me = this;
		let {props} = me;
		return (
			<div>
				<Scroller>
					{props.list.map((val, key) => {
						return <p key={key}>{val}</p>
					})}
				</Scroller><br /><br />
				<input type="button" value="增 加" onClick={Actions(me).add}/>
				<input type="button" value="删 除" onClick={Actions(me).del}/>
			</div>
		);
	}
};

module.exports = Title;