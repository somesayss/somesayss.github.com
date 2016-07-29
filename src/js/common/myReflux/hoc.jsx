"use strict";
define(function(require, exports) {

	// 依赖
	const React = require('react');
	const limit = require('common/limit2.0');

	return (Wrapper, Class) => {
		let Controller = new Class();
		let interfaces = Controller.getReactInterface();
		let state = interfaces.getInitialState();
		delete interfaces.getInitialState;
		class WrapperComponent extends React.Component {
			state = limit.assignSuper(state, this.props)
			constructor(){
				super(...arguments);
				this.Action = Controller.Action;
			}
		    render(){
		      	return <Wrapper {...this.state}/>;
		    }
		    static defaultProps = Class.defaultProps
		    static propTypes = Class.propTypes
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