
import './style.less';

import Component from 'common/myReflux/component';

class NotFound extends Component {
	render(){
		let me = this;
		let {props} = me;
		return (
			<div className={me.getClassName('page-not-found')}>
				<span className="fn-FS30">404页面不存在</span>
				<a href="javascript:history.go(-2);" className="fn-ML10 not-found-back">点击我返回</a>
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

export default NotFound;

