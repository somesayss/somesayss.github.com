
import './style.less';

import FormRules from './formRules';
import Component from 'common/myReflux/component';

const {Form: {Item: FormItem}} = antd;

class AntFormItem extends Component {
	static defaultProps = {
		formItemKey: 'antd',
		superClassName: 'ant-form-auto'
	}
	state = {
		formItemUid: `FID${limit.getTimeUid()}`
	}
	constructor(props){
		let me = super();
		let {name} = props;
		if( !name ){
			limit.war('表单没有"name"属性，请在"AntFormItem"组件上设置name属性')
		};
	}
	getSuperRule(){
		let me = this;
		let {props: {rules}} = me;
		return limit(rules).map((val) => {
			let superRule = val.superRule;
			let rule = superRule && FormRules[superRule];
			if( rule ){
				return {validator: rule, message: val.message};
			}else{
				return val;
			};
		}).filter(limit.K).val();
	}
	render(){
		let me = this;
		let {props: {getFieldDecorator, children, name, initialValue, trigger, superNowarp, superClassName}, state: {formItemUid}} = me;
		let rules = me.getSuperRule();
		return (
			<FormItem className={superClassName}>
				{getFieldDecorator(name || formItemUid, {
		            rules,
		            initialValue,
		            trigger: trigger || 'onChange'
	          	})( !superNowarp ? children : <span></span> )}
	          	{ superNowarp ? children : null }
			</FormItem>
		);
	}
	componentDidMount(){

	}
	componentWillUnmount(){
		
	}
};

export default AntFormItem;

