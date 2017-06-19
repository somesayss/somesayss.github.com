"use strict";

// 依赖
const React = require('react');
const limit = require('limit');
const Actions = require('./actions');

module.exports = (Wrapper, Class) => {
	class WrapperComponent extends React.Component {
	    constructor(props){
	    	super(...arguments);
	    	let me = this;
	    	let	__controller__;
	    	let clearProps = me.clearProps(props);
	    	__controller__ = me.__controller__ = new Class(clearProps);
	    	__controller__.com = me;
	    	me.state = limit.assignSuper({}, __controller__.getInitialState(), clearProps);
	    	__controller__.props = me.getPerProps(clearProps);
	    	__controller__.state = me.getPerState(me.state);
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
	    getPerState(state){
	    	let me = this;
	    	let outState = {};
	    	limit.each(me.__controller__.state, (val, key) => {
    			outState[key] = state[key];
	    	});
	    	return outState;
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
	    clearProps(props){
	    	let newProps = limit.assign({}, props);
	    	delete newProps.actionId;
    		delete newProps.actionUUid;
    		newProps.actionId = Class.defaultProps && Class.defaultProps.actionId;
    		return newProps;
	    }
	    componentWillUpdate(props){
	    	let me = this;
	    	let {__controller__} = me;
	    	// 如果是外部传入的属性全量更新
	    	// if( me.propsFromOther ){
	    	// 	me.nextState = limit.assignSuper({}, me.state, me.clearProps(props));
	    	// 	limit.cb(__controller__.componentWillUpdate).call(__controller__, me.nextState);
	    	// 	__controller__.state = me.getPerState(me.nextState);
	    	// 	__controller__.props = me.getPerProps(me.nextState);
	    	// }else{
	    	// 	delete me.nextState;
	    	// };
	    	if( me.propsFromOther ){
	    		limit.assignSuper(me.state, me.clearProps(props));
	    		limit.cb(__controller__.componentWillUpdate).call(__controller__, me.state);
	    		__controller__.state = me.getPerState(me.state);
	    		__controller__.props = me.getPerProps(me.state);
	    	};
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
