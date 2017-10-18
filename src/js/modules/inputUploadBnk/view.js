
import './style.less';

import DomUtil from 'common/domUtil';
import Upload from 'modules/upload/index';
import Component from 'common/myReflux/component';

class InputUpload extends Component {
	render(){
		let me = this;
		let {props} = me;
		return (
			<div className={me.getClassName('mod-input-upload')} style={{width: props.width}}>
				<div className="input-upload-table">
					<div className="input-upload-cell">
						<input type="button" 
							ref="file" 
							disabled={props.uploadId ? true : false}
							value={props.value} 
							onClick={me.click.bind(me)} />
					</div>
					<div className="input-upload-cell input-upload-list">
						<ul>
							{props.list.map((val, key) => {
								return (
									<li key={key}>
										<a href="javascript:;" className="input-upload-file">{ me.formatFileName(val.name) }</a>
										<a href="javascript:;" className="input-upload-delete">×</a>
										{do{
											if( val.progress !== 100 ){
												<span className="input-upload-progress" style={{width: `${100 - val.progress}%`}}></span>
											}
										}}
									</li>
								);
							})}
						</ul>
					</div>
				</div>
			</div>
		);
	}
	click(){
		let me = this;
		me.form.file.click();
	}
	change(e){
		let me = this;
		if( me.checkRule() && me.checkSize() ){
			Actions(me).change( me.getFileName(e) ).then(() => {
				return me.upload();
			}).then(Actions(me).uploadSuccess, Actions(me).uploadError).then(() => {
				me.removeForm();
				me.createForm();
			});
		};
	}
	upload(){
		let me = this;
		return new Upload({
			element: me.form,
			onprogress(scale){
				Actions(me).progress(scale * 100);
			}
		}).submit();
	}
	getFileName(e){
		let {target: {files, value}} = e;
		if( files ){
			return limit.from(e.target.files, (val) => {
				return val.name;
			});
		}else{
			return [value.split('\\').pop()];
		};
	}
	formatFileName(name){
		let arr = name.split('.');
		return `${limit.wordWrap(arr[0], 10, '···')}.${arr[1]}`;
	}
	checkRule(){
		return true;
	}
	checkSize(){
		return true;
	}
	createForm(){
		let me = this;
		let {props} = me;
		let node = me.tempNode = document.createElement('div');
		node.className = 'mod-input-file';
		document.body.appendChild(node);
		let arr = [];
		limit.each(props.param, (val, key) => {
			arr.push( <input key={key} type="hidden" name={key} value={val} /> );
		})
		let tempForm = ReactDOM.render(
			<form>
				<input type="file" name="file" multiple="multiple" onChange={me.change.bind(me)} />
				{arr}
			</form>,
			node
		);
		me.form = tempForm;
	}
	removeForm(){
		let me = this;
		ReactDOM.unmountComponentAtNode(me.tempNode);
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
