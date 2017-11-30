
import './style.less';

import Radio from 'modules/radio/index';
import Button from 'modules/button/index';
import Chcekbox from 'modules/checkbox/index';
import Component from 'common/myReflux/component';
import Multiple from 'modules/multiple/index';
import SelectSearch from 'modules/selectSearch/index';

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
				<SelectSearch 
					list={[{key: 'a1'}, {key: 'a2'}, {key: 'a3'}, {key: 'a4'}, {key: 'a5'}]} />
				<Multiple>
					<option value="v1">a1</option>
					<option value="v2">a2</option>
					<option value="v3">a3</option>
					<option value="v4">a4</option>
					<option value="v5">a5</option>
				</Multiple>

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

