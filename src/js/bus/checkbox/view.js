
import './style.less';

import Button from 'modules/button/index';
import Radio from 'modules/radio/index';
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
					<Chcekbox indeterminate={props.indeterminate} checked={props.checked} className="fn-MR5" />
					嘻嘻哈哈
				</label>
				<br />
				<br />
				<label>
					<Chcekbox indeterminate={props.indeterminate} checked={props.checked} className="fn-MR5" />
					嘻嘻哈哈1
				</label>
				<br />
				<br />
				<Button value="设置 indeterminate" size="small" className="fn-MR5" onClick={Actions(me).setIndeterminate} />
				<Button value="设置 checked" size="small" onClick={Actions(me).setChecked} />
				<br />
				<br />
				<label>
					<Radio className="fn-MR5" name="memeda"  onChange={Actions(me).changeCheck}/>
					嘻嘻哈哈
				</label>
				<br />
				<br />
				<label>
					<Radio className="fn-MR5" name="memeda"/>
					嘻嘻哈哈
				</label>
				<br />
				<br />
				<label>
					<Radio className="fn-MR5" name="memeda"/>
					嘻嘻哈哈
				</label>
				<br />
				<br />
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

