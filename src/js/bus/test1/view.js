
import './style.less';

import Component from 'common/myReflux/component';
import Validator from 'modules/validator/index';
import Input from 'modules/input/index';


class Test1 extends Component {
	render(){
		let me = this;
		let {props} = me;
		return (
			<div className={me.getClassName('page-test1')}>
				pageTest1
				<Validator>
					{/* 文本框 */}
					<Input type="text" 
						placeholder="请填写姓名"
						rule="required"
						errMessage="姓名必填"
						name="name" /><br /><br />
				</Validator>
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

export default Test1;

