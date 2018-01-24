
import Component from 'common/myReflux/component';

const {Button, Input} = antd;

class Custom extends Component {
	state = {
		value: ''
	}
	render(){
		let me = this;
		let {state} = me;
		return (
			<div>
				<Button onClick={me.clickChangeValue.bind(me)}>改变值</Button>
				<Input value={state.value} onChange={me.changeValue.bind(me)}/>
			</div>
		);
	}
	clickChangeValue(){
		let me = this;
		me.setState({value: 'abc'});
	}
	changeValue(e){
		let me = this;
		let {state} = me;
		me.setState({value: e.target.value});
	}
	componentDidMount(){
		let me = this;
		console.log(me);
	}
	componentDidUpdate(){

	}
	componentWillUnmount(){
		
	}
};

export default Custom;

