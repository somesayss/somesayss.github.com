"use strict";

import './style.less';

// 依赖
import DomUtil from 'common/domUtil';
import Cover from 'modules/cover/index';

// 组件类
class Dialog extends React.Component {
	getClassName(){
		let me = this;
		let	{props} = me;
		let arr = [];
		if( props.className ){
			arr.push( props.className );
		}; 
		if( props.hide ){
			arr.push('fn-hide');
		};
		return arr.join(' ');
	}
	getStyle(){
		let me = this;
		let	{props} = me;
		let styleKeys = ['top', 'marginLeft', 'width', 'height', 'maxWidth', 'maxHeight', 'minWidth', 'minHeight'];
		return limit.filter(props, (val, key) => {
			return limit.contains(styleKeys, key);
		});
	}
	render(){
		let me = this;
		let	{props} = me;
		return (
			<div className={me.getClassName()}>
				<div className="react-dialog" ref="dialog" style={me.getStyle()}>
					<a href="javascript:;" className="ch-close" onClick={me.closeDialog.bind(me)}>×</a>
					{props.children}
				</div>
				{do{
					if( props.hasCover ){
						<Cover opacity={props.opacity} onClick={props.onClickCover} />
					}
				}}
			</div>
		);
	}
	componentDidMount(){
		let me = this;
		let {props} = me;
		me.setCenter();
		if( props.timeout > 0 ){
			setTimeout(() => {
				me.closeDialog();
			}, props.timeout);
		};
		if( props.useEsc ){
			let nameSpace = me.nameSpace = `keyup.dialog${limit.getUid()}`;
			$(document).on(nameSpace, (e) => {
				if( e.keyCode === 27 ){
					me.closeDialog();
				};
			});
		};
	}
	componentWillUnmount(){
		let me = this;
		let {props} = me;
		if( props.useEsc ){
			$(document).off(me.nameSpace);
		};
	}
	componentDidUpdate(){
		let me = this;
		me.setCenter();
	}
	closeDialog(){
		let me = this;
		let {props} = me;
		let actionsExp = Actions(me);
		actionsExp && actionsExp.destroyWidget;
		if( actionsExp && actionsExp.destroyWidget ){
			actionsExp.destroyWidget();
			props.onClose();
		};
	}
	setCenter(){
		let me = this;
		let {props, refs: {dialog}} = me;
		dialog = $(dialog);
		let WIN = window;
		let scrollY = WIN.scrollY || document.documentElement.scrollTop;
		let winHeight = WIN.innerHeight || document.documentElement.offsetHeight;
		let height = props.height;
		let width = props.width;
		if( !limit.isNumber(height) ){
			height = dialog.height();
		};
		if( !limit.isNumber(width) ){
			width = dialog.width();
		};
		let top = scrollY + (winHeight)/2 - height/2;
		let marginLeft = -width/2;
		dialog.css({top, marginLeft});
	}
};

export default Dialog;


