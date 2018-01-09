
import './style.less';

import Component from 'common/myReflux/component';

class Abc extends Component {
	render(){
		let me = this;
		let {props} = me;
		return (
			<div className={me.getClassName('mod-abc')}>
				modAbc
			</div>
		);
	}
	componentDidMount(){

	}
	componentDidUpdate(){

	}
	componentWillUnmount(){
		
	}
};

export default Abc;
