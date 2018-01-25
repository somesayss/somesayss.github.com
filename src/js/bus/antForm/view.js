
import './style.less';

import Custom from './custom';
import AntForm from 'modules/antForm/form';
import Component from 'common/myReflux/component';
import AntFormItem from 'modules/antForm/formItem';

import Abc from './abc';


const {Input, Button, Select, Checkbox} = antd;
const {Option} = Select;
const {Group: CheckboxGroup} = Checkbox;

class AntFormView extends Component {
	changeHideValue(){
		let me = this;
		let {refs: {AntFormABC}} = me;
		AntFormABC.setFieldsValue({a5: 'a1'});
	}
	seleceXinqu(val){
		let me = this;
		let {refs: {AntFormABC}} = me;
		AntFormABC.setFieldsValue({a7: val});
		AntFormABC.validateFields(['a7']);
	}
	render(){
		let me = this;
		let {props: {show, theValue}} = me;
		return (
			<div className={me.getClassName('page-ant-form', 'fn-PA10')}>
				<AntForm ref="AntFormABC" onSuccess={() => { console.log('success') }} onError={() => { console.log('error') }} onChange={(val) => {console.log(val, 'xixi')}}>
					{do{
						if( show ){
							<div>
								<AntFormItem name="a1" 
									rules={[{ required: true, message: '请输入姓名!' }]}>
									<Input style={{width: 200}} placeholder="请输入姓名"/>
								</AntFormItem><br /><br />
							</div>
						}
					}}
					<AntFormItem name="a2" 
						rules={[{ required: true, len: 6, message: '请输入6个数字' }]}>
						<Input style={{width: 200}} placeholder="请选择性别"/>
					</AntFormItem><br /><br />

					<AntFormItem name="a3" 
						rules={[
							{required: true, message: '请选择数字'},
							{superRule:'number', message: '请输入纯数字'}
						]}>
						<Input style={{width: 200}} placeholder="请输入纯数字"/>
					</AntFormItem><br /><br />

					<AntFormItem name="a4" 
						initialValue=""
						rules={[{ required: true, message: '请输入姓名!' }]}>
						<Select style={{width: 200}} placeholder="请选择">
							<Option value="">请选择</Option>
							<Option value="v1">v11</Option>
							<Option value="v2">v22</Option>
						</Select>
					</AntFormItem><br /><br />

					<AntFormItem name="a5" 
						initialValue=""
						superNowarp="true"
						rules={[{ required: true, message: '请输入姓名!' }]}>
						<div style={{width:200}}>
							隐藏域
							<Button className="fn-ML10" onClick={me.changeHideValue.bind(me)}>改变隐藏域的值</Button> 
						</div>
					</AntFormItem><br /><br />

					<AntFormItem name="a7" 
						trigger=""
						superNowarp="true"
						rules={[{ required: true, message: '请选择兴趣!' }]}>
						<div style={{width:200}}>
							<CheckboxGroup options={['兴趣1','兴趣2','兴趣3']} onChange={me.seleceXinqu.bind(me)}/>
						</div>
					</AntFormItem><br /><br />

					<AntFormItem name="a8" 
						trigger=""
						rules={[{ required: true, message: '请选择兴趣!' }]}>
						<Abc />
					</AntFormItem><br /><br />

					<Button htmlType="submit" className="fn-MR10">确 定</Button>
					<Button onClick={Actions(me).show} className="fn-MR10">隐 藏</Button>
					
				</AntForm>
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

export default AntFormView;

