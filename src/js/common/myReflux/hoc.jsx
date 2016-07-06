"use strict";
define(function(require, exports) {

	// 依赖
	const React = require('react');
	const limit = require('common/limit2.0');

	return (Wrapper, Controller) => {
		let interfaces = Controller.getReactInterface();
		let state = interfaces.getInitialState();
		delete interfaces.getInitialState;
		class WrapperComponent extends React.Component {
			constructor(...args){
				super(...args);
				// getInitialState
				this.state = state;
			}
		    render(){
		      	return <Wrapper {...limit.assignSuper(this.state, this.props)}/>;
		    }
		};
		limit.assign(WrapperComponent.prototype, interfaces);
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