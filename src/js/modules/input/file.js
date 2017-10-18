
"use strict";

// 组件类
class File extends React.Component {
	render(){
		let me = this;
		return (
			<input 
				ref="file"
				onClick={me.click.bind(me)}
				{...me.props} type="button" />
		);
	}
	click(){
		let me = this;
		me.file.click();
	}
	mouseEnter(){
		let me = this;
		let {refs} = me;
		let {file} = refs;
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
	change(e){
		let me = this;
		limit.cb(me.props.onChange)(e);
	}
	createForm(){
		let me = this;
		return (
			<form onMouseLeave={me.mouseLeave.bind(me)}>
				<input type="file" name="file" onChange={me.change.bind(me)}  />
			</form>
		);
	}
	componentDidMount(){
		let me = this;
		let {refs, props} = me;
		let {file} = refs;
		// 创建点击文件上传
		let node = me.tempNode = document.createElement('div');
		node.className = 'limit-file';
		document.body.appendChild(node);
		let a = ReactDOM.render(
			me.createForm(),
			node
		);
		me.file = a.file;
		// 创建拖拽文件上传
		// let nodeDrop = me.tempNodeDrop = document.createElement('div');
		// document.body.appendChild(nodeDrop);
		// nodeDrop.className = 'limit-file-drop';
		// ReactDOM.render(
		// 	<FilesDrop onDrop={props.onDrop} />,
		// 	nodeDrop
		// );
		
	}
	componentWillUnmount(){
		let me = this;
		ReactDOM.unmountComponentAtNode(me.tempNode);
		// ReactDOM.unmountComponentAtNode(me.tempNodeDrop);
		let clearDiv = document.createElement('div');
		clearDiv.appendChild(me.tempNode);
		// clearDiv.appendChild(me.tempNodeDrop);
		clearDiv.innerHTML = '';
		clearDiv = null;
	}
};

export default File;






