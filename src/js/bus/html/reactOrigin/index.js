"use strict";

class Imgcute extends React.Component {
	constructor(props){
		let me = super();
		me.state = {a: 'a1', b: 'b1'};
	}
	render(){
		let me = this;
		let {props, state} = me;
		return (
			<div>
				<span id="word" ref="word">{state.a}</span>{state.b}
				<input type="button" value="点击1" onClick={me.click1.bind(me)} />
				<input type="button" value="点击2" onClick={me.click2.bind(me)} />
			</div>
		);
	}
	click1(){
		let me = this;
		let {state, refs} = me;
		let {word} = refs;
		word.innerHTML = 'a2';
		state.a = 'a2';
		me.setState(state);
	}
	click2(){
		let me = this;
		let {state} = me;
		me.setState({a: 'a1', b: 'b2'})
	}
};

module.exports = Imgcute;