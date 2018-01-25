

import Component from 'common/myReflux/component';

const {Input, Button, Select, Checkbox} = antd;

class AntFormView extends Component {
	static defaultProps = {
		onChange: limit.K
	}
	render(){
		let me = this;
		return (
			<Input onChange={me.props.onChange} />
		);
	}
	componentDidMount(){
		
	}
	componentDidUpdate(){

	}
	componentWillUnmount(){
		
	}
};

export default AntFormView;

