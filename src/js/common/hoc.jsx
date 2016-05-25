"use strict";
define(function(require, exports) {

	// 依赖
	const [React, Reflux, limit] = [require('react'), require('reflux'), require('limit')];

	

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
		    render() {
		      return <Wrapper {...this.state} />;
		    }
		};
		limit.extend(WrapperComponent.prototype, Controller);
		return WrapperComponent;
	};

});