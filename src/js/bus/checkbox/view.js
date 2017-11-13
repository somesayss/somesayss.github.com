
import './style.less';

import Chcekbox from 'modules/checkbox/index';
import Component from 'common/myReflux/component';

// 图片
const imgShow = require('../../../imgs/tutu.jpg');

class Checkbox extends Component {
	render(){
		let me = this;
		let {props} = me;
		return (
			<div className={me.getClassName('page-checkbox', 'fn-PA15')}>
				<label>
					<Chcekbox indeterminate={props.indeterminate} className="fn-MR5" />
					嘻嘻哈哈
				</label>
				<br />
				<br />
				<input type="button" onClick={Actions(me).click} value="abc" />
				<input type="checkbox" indeterminate="indeterminate" />
				<span className="abc"></span>
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

export default Checkbox;

