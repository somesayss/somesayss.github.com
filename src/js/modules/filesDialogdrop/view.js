"use strict";

import './style.less';

const Dialog = require('modules/dialog/index');

// 组件类
class Cover extends React.Component {
	getClassName(){
		let me = this;
		let {props} = me;
		let arr = ['limit-mousedrop'];
		if( props.className ){
			arr.push(props.className);
		};
		if( props.dropIn ){
			arr.push('limit-mousedrop-dropin');
		};
		return arr.join(' ');
	}
	render(){
		let me = this;
		let {props} = me;
		return (
			<Dialog hide={props.hideDrop}>
				<div
					ref="dropNode"
					className={me.getClassName()}>
				</div>
			</Dialog>
		);
	}
	stop(e){
		let me = this
		limit.cb( Actions(me)[ limit.parseHumpString('doc', e.type) ] )(e);
		e.preventDefault();
		e.stopPropagation();
	}
	componentDidMount(){
		let me = this;
		let {refs} = me;
		let {dropNode} = refs;
		let nameSpace = me.nameSpace = `drag${limit.getUid()}`;
		let DOC = me.DOC = $(document);
		dropNode = $(dropNode);
		['dragleave', 'drop', 'dragenter', 'dragover'].map((val) => {
			DOC.on(`${val}.${nameSpace}`, me.stop.bind(me));
			return val;
		}).forEach((val) => {
			dropNode.on(`${val}.${nameSpace}`, (e) => {
				limit.cb( Actions(me)[ limit.parseHumpString(e.type) ] )(e);
			});
		});
	}
	componentWillUnmount(){
		let me = this;
		let {refs} = me;
		let {dropNode} = refs;
		let nameSpace = me.nameSpace;
		let DOC = me.DOC;
		dropNode = $(dropNode);
		['dragleave', 'drop', 'dragenter', 'dragover'].map((val) => {
			DOC.off(`${val}.${nameSpace}`);
			return val;
		}).forEach((val) => {
			dropNode.off(`${val}.${nameSpace}`);
		});
	}
};

module.exports = Cover;

