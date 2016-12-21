"use strict";

import './style.less';

// 依赖
const React = require('react');
const limit = require('limit');

// 组件类
class Rate extends React.Component {
	constructor(){
		super(...arguments);
	}
	render(){
		let me = this;
		let props = me.props;
		return (
			<div className="rate">
				<span className="ch-txt">总金额：</span>
				<input ref="inputText1" className="rate-input" title="总金额" placeholder="总金额" 
					value={ limit.toFixed(props.amount) } onChange={props.Actions.changeAmount} />
				<br /><br />
				<span className="ch-txt">年利率：</span>
				<input ref="inputText2" className="rate-input" title="年利率" placeholder="年利率" 
					value={props.rate} onChange={props.Actions.changeRate}/> 
					<br /><br />
				<span className="ch-txt">日收入：</span>
				<input ref="inputText3" className="rate-input" title="日收入" placeholder="日收入" 
					value={ limit.toFixed(me.getMountByDay(), 2) } onChange={limit.K} readOnly="readOnly" />
					<br /><br />
				<span className="ch-txt">月收入：</span>
				<input ref="inputText4" className="rate-input" title="月收入" placeholder="月收入" 
					value={ limit.toFixed(me.getMountByMouth(30), 2) } onChange={limit.K} readOnly="readOnly" />
					<br /><br />
				<span className="ch-txt">季收入：</span>
				<input ref="inputText5" className="rate-input" title="季收入" placeholder="季收入" 
					value={ limit.toFixed(me.getMountByMouth(91), 2) } onChange={limit.K} readOnly="readOnly" />
					<br /><br />
				<span className="ch-txt">年收入：</span>
				<input ref="inputText6" className="rate-input" title="年收入" placeholder="年收入" 
					value={ limit.toFixed(me.getMountByYear()) } onChange={props.Actions.changeAmountYear} />
					<br /><br />
			</div>
		);
	}
	setInputWidth(){
		let me = this;
		let refs = me.refs;
		limit.each(refs, (node) => {
			node.style.width = '1px';
			node.style.width = `${node.scrollWidth + 3}px`;
		});
	}
	componentDidMount(){
		return this.setInputWidth();
	}
	componentDidUpdate(){
		return this.setInputWidth();
	}
	getMountByDay(){
		let me = this;
		let props = me.props;
		return limit['?'](`${props.amount} * ${props.rate} / 365`);
	}
	getMountByMouth(num){
		let me = this;
		let props = me.props;
		return limit['?'](`${props.amount} * ${props.rate} / 365 * ${num}`);
	}
	getMountByYear(){
		let me = this;
		let props = me.props;
		return limit['?'](`${props.amount} * ${props.rate}`);
	}

};

module.exports = Rate;

