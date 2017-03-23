"use strict";

// 依赖
const React = require('react');
const limit = require('limit');
const Actions = require('./actions');

module.exports = (Wrapper, Class) => {
	class WrapperComponent extends React.Component {
	    constructor(){
	    	super(...arguments);
	    	let me = this;
	    	let	__controller__;
	    	__controller__ = me.__controller__ = new Class(me.props);
	    	__controller__.com = me;
	    	__controller__.props = me.getPerProps(me.props);
	    	me.state = limit.assignSuper({}, __controller__.getInitialState(), me.props);
	    	me.state.actionId = me.state.actionId || `uaid${limit.getUid()}`;
	    	me.state.actionUUid = __controller__.Actions.uuid = `uuid${limit.getUid()}`;
	    	Actions.set(me.state.actionId, __controller__.Actions);
	    }
	    getPerProps(props){
	    	let outProps = {};
	    	limit.each(Class.defaultProps, (val, key) => {
	    		outProps[key] = props[key];
	    	});
	    	return outProps;
	    }
	    componentWillReceiveProps(props){
	    	let me = this;
	    	me.propsFromOther = true;
	    }
	    shouldComponentUpdate(){
	    	let me = this;
	    	let propsFromOther = !!me.propsFromOther;
	    	if( me.state.shouldComponentNotUpdate ){
	    		if( propsFromOther ){
	    			return me.propsFromOther = false;
	    		}else{
	    			return true;
	    		};
	    	}else{
	    		return true;
	    	};
	    }
	    componentWillUpdate(props){
	    	let me = this;
	    	// 如果是外部传入的属性全量更新
	    	if( me.propsFromOther ){
	    		limit.assignSuper(me.state, props);
	    	};
	    	me.__controller__.props = me.getPerProps(props);
	    }
	    componentDidUpdate(){
	    	let me = this;
	    	me.propsFromOther = false;
	    }	
	    render(){
	    	let me = this;
	      	return <Wrapper {...me.state}/>;
	    }
	    componentWillUnmount(){
	    	let me = this;
	    	Actions.remove(me.state.actionId, me.__controller__.Actions);
	    	me.__controller__.destroy();
	    }
	    static defaultProps = Class.defaultProps
	    static propTypes = Class.propTypes
	};
	return WrapperComponent;
};
