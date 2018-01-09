
import './style.less';

import Pre from '../pre/index';
import Logo from '../logo/index';
import Table from '../table/index';
import Component from 'common/myReflux/component';
import InputText from 'modules/foolui/inputText/index';

class FooluiInputText extends Component {
	render(){
		let me = this;
		let {props} = me;
		return (
			<div className={me.getClassName('page-foolui-input-text', 'fn-PA10')}>
				<Logo />
				<div className="fn-PA10">
					<InputText value="abc" isFocus={true} placeholder="请输入"/>
				</div>
				<div className="fn-PA10">
					<Pre>{`
import InputText from 'modules/foolui/inputText/index';

render(){
	return (
		<InputText value="abc" isFocus={true} placeholder="请输入" />
	);
}
					`}</Pre>
				</div>
				<div className="fn-PA10">
					<Table className="fn-MR10">
						<tr>
							<td>属性</td>
							<td>说明</td>
							<td>默认值</td>
						</tr>
						<tr>
							<td>type</td>
							<td>
								类型：'text','number','password','enword','cnword' <br />
								'number'：数字 <br />
								'enword'：数字,_,字母 <br />
								'cnword'：常用中文
							</td>
							<td>'text'</td>
						</tr>
						<tr>
							<td>value</td>
							<td>赋值</td>
							<td>''</td>
						</tr>
						<tr>
							<td>width</td>
							<td>宽度</td>
							<td>300</td>
						</tr>
						<tr>
							<td>height</td>
							<td>高度</td>
							<td>30</td>
						</tr>
						<tr>
							<td>defaultValue</td>
							<td>默认值</td>
							<td>''</td>
						</tr>
						<tr>
							<td>placeholder</td>
							<td>占位符</td>
							<td>''</td>
						</tr>
						<tr>
							<td>placeholderSize</td>
							<td>占位符最大长度</td>
							<td>5</td>
						</tr>
						<tr>
							<td>error</td>
							<td>错误信息</td>
							<td>''</td>
						</tr>
						<tr>
							<td>readOnly</td>
							<td>只读</td>
							<td>false</td>
						</tr>
						<tr>
							<td>disabled</td>
							<td>不可用</td>
							<td>false</td>
						</tr>
						<tr>
							<td>isFocus</td>
							<td>是否落焦点</td>
							<td>false</td>
						</tr>
					</Table>

					<Table>
						<tr>
							<td>方法</td>
							<td>说明</td>
						</tr>
						<tr>
							<td>onChange</td>
							<td>参数1：value，参数2：event</td>
						</tr>
						<tr>
							<td>onFocus</td>
							<td>参数1：event</td>
						</tr>
						<tr>
							<td>onBlur</td>
							<td>参数1：event</td>
						</tr>
					</Table>
					
				</div>
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

export default FooluiInputText;

