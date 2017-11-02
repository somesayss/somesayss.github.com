
// 组件类
class Checkbox extends React.Component {
	render(){
		let me = this;
		return (
			<input ref="input" {...me.props} type="Checkbox" />
		);
	}
	componentDidMount(){
		let me = this;
		let {refs: {input}, props: {indeterminate}} = me;
		input.indeterminate = !! indeterminate;
	}
	componentDidUpdate(){
		let me = this;
		me.componentDidMount();
	}
};

export default Checkbox;



