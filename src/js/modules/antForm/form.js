
import './style.less';

import Component from 'common/myReflux/component';

const {Form} = antd;

class AntForm extends Component {
	static defaultProps = {
		onChange: limit.K,
		onSuccess: limit.K,
		onError: limit.K
	}
	handleSubmit(e){
		let me = this;
		let {props: {onError, onSuccess}} = me;
		e.preventDefault();
		me.props.form.validateFields((err, values) => {
			if( err ){
				limit.war('验证失败', err);
				onError(err, values);
			}else{
				limit.log('验证成功', values);
				onSuccess(values);
			};
		});
	}
	cloneAllChild(child){
		let me = this;
		let {props} = me;
		let {form: {getFieldDecorator}} = props;
		let childProps = child.props;
		if( childProps ){
			if( childProps.formItemKey === 'antd' ){
				return React.cloneElement(child, {getFieldDecorator});
			};
			if( childProps.children ){
				return React.cloneElement(child, {}, 
					React.Children.map(childProps.children, (child) => {
						return me.cloneAllChild(child);
					})
				);
			};
		};
		return child;
	}
	render(){
		let me = this;
		let {props} = me;
		let {form: {getFieldDecorator}} = props;
		return (
			<Form onSubmit={me.handleSubmit.bind(me)} layout="inline">
				{React.Children.map(props.children, (child) => {
					if(child){
						return me.cloneAllChild(child);
					};
				})}
			</Form>
		);
	}
	componentDidMount(){
		
	}
	componentDidUpdate(){

	}
	componentWillUnmount(){
		
	}
};

const WrappedNormalLoginForm = Form.create({
	onValuesChange(props, val){
		props.onChange(val, props);
	}
})(AntForm);

export default WrappedNormalLoginForm;

