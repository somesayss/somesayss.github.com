
import './style.less';

import Component from 'common/myReflux/component';

class FooluiPre extends Component {
	render(){
		let me = this;
		let {props} = me;
		return (
			<div className={me.getClassName('page-foolui-pre')}>
				<pre>
					{props.children}
				</pre>
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

export default FooluiPre;

