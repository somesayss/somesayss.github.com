
import './style.less';

import domUtil from 'common/domUtil';
import Component from 'common/myReflux/component';
import OriginInputText from '../originInputText/index';

class FooluiInputText extends Component {
	render(){
		let me = this;
		let {props} = me;
		let {isFocus, placeholderSize, disabled} = props;
		let operateContent = me.getOperateContent();
		return (
			<div
				style={{width: props.width, height: props.height}}
				className={ me.getClassName(
					'mod-foolui-input-text', 
					disabled ? 'foolui-input-text-disabled': '',
					isFocus ? 'foolui-input-text-focus' : '', 
					operateContent.key) }>
				<div className="foolui-input-text-table">
					<div className="foolui-input-text-tablecell">
						<OriginInputText 
							ref="input"
							className="foolui-input-text-input"
							onFocus={Actions(me).focus.bind(null, true)}
							onBlur={Actions(me).focus.bind(null, false)}
							onChange={Actions(me).change}
							readOnly={props.readOnly}
							disabled={props.disabled}
							value={props.value} />
					</div>
					<div className="foolui-input-text-tablecell input-text-dosome">
						<div className="foolui-input-text-table">
							<div 
								className="foolui-input-text-tablecell foolui-input-text-content" 
								title={operateContent.key && operateContent.value.length >  placeholderSize ? operateContent.value : ''}>
								{operateContent.key ? limit.wordWrap(operateContent.value, placeholderSize) : operateContent.value}
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
	getDoSome(){
		let me = this;
		let {props: {type}} = me;
		return (
			<span>
				{do{
					if( type === 'password' ){
						<a className="foolui-input-text-eye" href="javascript:;" onClick={me.doSeePassword.bind(me)} tabIndex="-1"></a>
					}
				}}
				<a className="foolui-input-text-close" href="javascript:;" onClick={me.doClearValue.bind(me)} tabIndex="-1">{'\xd7'}</a>
			</span>
		);
	}
	getOperateContent(){
		let me = this;
		let {props: {value, error, placeholder}} = me;
		if( error ){
			return {key: 'foolui-input-text-error', value: error}
		};
		if( !value && placeholder ){
			return {key: 'foolui-input-text-placeholder', value: placeholder}
		};
		if( value ){
			return {key: '', value: me.getDoSome()}
		};
		return {key: '', value: ''};
	}
	getRealInput(){
		let me = this;
		let {refs: {input: {refs: {com: {refs: {input}}}}}} = me;
		return input;
	}
	doClearValue(){
		let me = this;
		let input = me.getRealInput();
		return Actions(me).clearValue().then(() => {
			let length = input.value.length;
			return domUtil.textSelect(input, length, length);
		});
	}
	doSeePassword(){
		let me = this;
		let input = me.getRealInput();
		if( input.type === 'text' ){
			input.type = 'password';
		}else{
			input.type = 'text';
		};
		let length = input.value.length;
		domUtil.textSelect(input, length, length);
	}
	componentDidMount(){
		let me = this;
		let {props: {type, isFocus}} = me;
		if( type === 'password' ){
			me.getRealInput().type = 'password';
		};
		if( isFocus ){
			let input = me.getRealInput();
			let length = input.value.length;
			return domUtil.textSelect(input, length, length);
		};
	}
	componentDidUpdate(){

	}
	componentWillUnmount(){
		
	}
};

export default FooluiInputText;
