"use strict";
define(function(require, exports) {

	// 依赖
	const React = require('react');
	const Reflux = require('reflux');
	const limit = require('common/limit2.0');

	return (Wrapper, Controller) => {
		Controller = Reflux.connect(Controller.Store);
		let state = Controller.getInitialState();
		delete Controller.getInitialState;
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
		limit.assign(WrapperComponent.prototype, Controller);
		return WrapperComponent;
	};

});

/*
				┌	control.js( controller.js )	=> [ Action, Store ]	┐
	HOC.js	=>	¦									   ↓				¦	=> main.js => [ React ]
				└  	view.js						=> [ React 		   ]	┘		
 */