
import './style.less';

import DomUtil from 'common/domUtil';
import Upload from 'modules/upload/index';
import Component from 'common/myReflux/component';

class InputUpload extends Component {
	render(){
		let me = this;
		let {props} = me;
		return (
			<input type="button" 
				className="mod-input-upload"
				ref="file" 
				onMouseEnter={me.isUseUploadHack() ? me.mouseEnter.bind(me) : null}
				disabled={props.isUpload ? true : false}
				value={props.value} 
				onClick={me.isUseUploadHack() ? null : me.click.bind(me)} />
		);
	}
	isUseUploadHack(){
		return DomUtil.isIE8();
	}
	mouseEnter(){
		let me = this;
		let {refs, props} = me;
		let {file} = refs;
		if( props.isUpload ){
			return;
		};
		let offset = $(file).offset();
		let node = me.tempNode;
		node.style.top = `${offset.top}px`;
		node.style.left = `${offset.left}px`;
		node.style.width = `${file.offsetWidth}px`;
		node.style.height = `${file.offsetHeight}px`;
	}
	mouseLeave(){
		let me = this;
		me.tempNode.style.top = '-999px';
		me.tempNode.style.left = '-999px';
	}
	click(){
		let me = this;
		me.form.file.click();
	}
	change(e){
		let me = this;
		Actions(me).change( me.getFileName(e) ).then(() => {
			me.mouseLeave();
			return me.upload();
		}).then(Actions(me).uploadSuccess, Actions(me).uploadError).then(() => {
			me.removeForm();
			me.createForm();
		});
	}
	upload(){
		let me = this;
		let {props} = me;
		return new Upload({
			element: me.form,
			url: props.action,
			onprogress(scale){
				Actions(me).progress(scale * 100);
			}
		}).submit();
	}
	getFileName(e){
		let me = this;
		let files;
		let value;
		if( e ){
			let target = e.target;
			files = target.files;
			value = target.value;
		}else{
			value = me.form.file.value;
		};
		if( files ){
			return limit.from(e.target.files, (val) => {
				let {name, size} = val;
				return {name, size};
			});
		}else{
			return [{name: value.split('\\').pop(), size: 0}];
		};
	}
	formatFileName(name){
		let arr = name.split('.');
		return `${limit.wordWrap(arr[0], 10, '···')}.${arr[1]}`;
	}
	createForm(){
		let me = this;
		let {props} = me;
		let node = me.tempNode = document.createElement('div');
		let arr = [];
		limit.each(props.param, (val, key) => {
			arr.push(`<input type="hidden" name="${key}" value="${val}" />`);
		});
		node.className = 'mod-input-file';
		node.innerHTML = `<form method="POST" encType="multipart/form-data">
				<input name="file" ${props.multiple ? 'multiple="multiple"' : ''} accept="${props.accept}" type="file" style="filter:alpha(opacity=0);" />
				${arr.join('')}
			</form>`;
		let form = me.form = node.firstChild;
		let file = form.file;
		file.onchange = me.change.bind(me);
		$(node).on('mouseleave', me.mouseLeave.bind(me));
		document.body.appendChild(node);
	}
	removeForm(){
		let me = this;
		me.form.file.onchange = null;
		$(me.tempNode).off('mouseleave');
		DomUtil.clearDom(me.tempNode);
	}
	componentDidMount(){
		let me = this;
		// 创建点击文件上传
		me.createForm();
	}
	componentWillUnmount(){
		let me = this;
		me.removeForm();
	}
	componentDidUpdate(){

	}
};

export default InputUpload;
