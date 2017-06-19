"use strict";
	
// 依赖
const $ = require('$');
const React = require('react');
const Control = require('common/myReflux/control');
const limit = require('limit');

class Controller extends Control {
	state = {
		showLayout: false
	}
	static defaultProps = {
		actionId: 'layout'
	}
	onShowLayout(){
		let me = this;
		let {state} = me;
		state.showLayout = true;
		me.updateComponent();
	}
	onSetScrollTop(){
		let WIN = window;
		let timeoutID = null;
		WIN.onscroll = function(){
			clearTimeout(timeoutID);
			timeoutID = setTimeout(() => {
				localStorage.scrollTop = WIN.scrollY || document.documentElement.scrollTop;
			}, 100);
		};
		WIN.scrollTo(0, localStorage.scrollTop || 0);
	}

};

module.exports = Controller;