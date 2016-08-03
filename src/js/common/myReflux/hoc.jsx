"use strict";
define(function(require, exports) {

	// 依赖
	const React = require('react');
	const limit = require('common/limit2.0');

	return (Wrapper, Class) => {
		class WrapperComponent extends React.Component {
		    constructor(){
		    	super(...arguments);
		    	let me = this,
		    		__controller__;
		    	me.__controller__ = __controller__ = new Class();
		    	me.state = limit.assignSuper(__controller__.getInitialState(), this.props)
		    }
		    render(){
		    	let me = this;
		      	return <Wrapper {...me.state} Actions={me.__controller__.Actions}/>;
		    }
		    componentDidMount(){
		    	this.__controller__.componentDidMount(this);
		    }
		    componentWillUnmount(){
		    	this.__controller__.destroy();
		    }
		    static defaultProps = Class.defaultProps
		    static propTypes = Class.propTypes
		};
		return WrapperComponent;
	};

});

/**
							extends
							   ↑
				┌	control.js => controller.js	=> [ Action, Store ]	┐
	HOC.js	=>	¦									   ↓				¦	=> main.js => [ React ]
				└  	view.js						=> [ React 		   ]	┘		
 */