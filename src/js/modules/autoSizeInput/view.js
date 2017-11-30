
import './style.less';

import DomUtil from 'common/domUtil';
import InputText from 'modules/inputText/index';
import Component from 'common/myReflux/component';

class AutoSizeInput extends Component {
	render(){
		let me = this;
		let {props} = me;
		let style, originChange;
		if( props.type === 'textarea' ){
			style = {height: me.getRealHeight()}
			originChange = me.changeHeightValue.bind(me);
		}else{
			style = {width: me.getRealWidth()};
			originChange = me.changeWidthValue.bind(me);
		};
		return (
			<InputText 
				id="abc"
				type={props.type}
				onChange={props.onChange}
				onFocus={props.onFocus}
				onBlur={props.onBlur}
				onOriginChange={originChange} 
				onKeyDown={props.onKeyDown}
				onKeyUp={props.onKeyUp}
				ref="input" style={style} 
				value={props.value}
				className={me.getClassName('mod-auto-size-input')} />
		);
	}
	changeHeightValue(){
		let me = this;
		let {props: {minHeight}} = me;
		let input = me.refs.input.refs.com.refs.input;
		Actions(me).changeHeight(minHeight).then(() => {
			Actions(me).changeHeight(input.scrollHeight);
		});
	}
	getRealHeight(){
		let me = this;
		let {props: {height, minHeight, maxHeight}} = me;
		if( height ){
			if( height <= minHeight ){
				return minHeight
			};
			if( height >= maxHeight ){
				return maxHeight;
			};
			return height;
		}else{
			return minHeight;
		};
	}
	changeWidthValue(){
		let me = this;
		let {props: {minWidth}} = me;
		let input = me.refs.input.refs.com.refs.input;
		Actions(me).changeWidth(minWidth).then(() => {
			Actions(me).changeWidth(input.scrollWidth);
		});
	}
	getRealWidth(){
		let me = this;
		let {props: {width, minWidth, maxWidth}} = me;
		if( width ){
			if( width <= minWidth ){
				return minWidth
			};
			if( width >= maxWidth ){
				return maxWidth;
			};
			return width;
		}else{
			return minWidth;
		};
	}
	focusInput(){
		let me = this;
		let input = me.refs.input.refs.com.refs.input;
		let leg = input.value.length;
		DomUtil.textSelect(input, leg, leg);
	}
	componentDidMount(){

	}
	componentDidUpdate(){

	}
	componentWillUnmount(){
		
	}
};

export default AutoSizeInput;
