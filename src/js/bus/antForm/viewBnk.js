
import './style.less';

import Component from 'common/myReflux/component';

const {Form, Input, Button} = antd;
const {Item: FormItem} = Form;

class AntForm extends Component {
	handleSubmit = (e) => {
	    e.preventDefault();
	    this.props.form.validateFields((err, values) => {
	      if (!err) {
	        console.log('Received values of form: ', values);
	      }
	    });
	  }
	 change(e){
	 	console.log(e);
	 }
	render(){
		let me = this;
		let {props: {form: {getFieldDecorator}}} = me;
		return (
			<div className={me.getClassName('page-ant-form', 'fn-PA10')}>
				<div onSubmit={this.handleSubmit} layout="inline">
					<FormItem>
						{getFieldDecorator('userName1', {
				            rules: [{ required: true, message: 'Please input your username!' }],
			          	})(
				            <Input placeholder="Username1" onChange={() => {console.log('a')}}/>
				        )}
					</FormItem><br />
					<FormItem>
						{getFieldDecorator('userName2', {
				            rules: [{ required: true, message: 'Please input your username!' }],
			          	})(
				            <Input placeholder="Username2"/>
				        )}
					</FormItem><br />
					<Button type="primary" htmlType="submit" className="login-form-button">
			        	Log in
			        </Button>
				</div>
			</div>
		);
	}
	componentDidMount(){
		let me = this;
		console.log(me);
	}
	componentDidUpdate(){

	}
	componentWillUnmount(){
		
	}
};

const WrappedNormalLoginForm = Form.create({
	onValuesChange(...args){
		console.log(args, this);
	}
})(AntForm);

export default WrappedNormalLoginForm;

