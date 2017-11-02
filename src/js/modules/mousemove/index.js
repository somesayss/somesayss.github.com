"use strict";

class Index extends limit.Events{
	props = {
		keyWord: 'move',
		clientX: null,
		clientY: null
	}
	constructor(config){
		let me = super();
		limit.assign(me.state, me.props, config);
		me.bindMouseEvents();
	}
	bindMouseEvents(){
		let me = this;
		let {state} = me;
		let {keyWord} = state;
		let jQdoc = $(document);
		jQdoc.on(`mousemove.${keyWord}`, (e) => {
			e.preventDefault();
			e.stopPropagation();
			me.emit('move', e, me.getDiff(e));
		});
		jQdoc.on(`mouseup.${keyWord}`, (e) => {
			e.preventDefault();
			e.stopPropagation();
			jQdoc.off(`mousemove.${keyWord}`).off(`mouseup.${keyWord}`);
			me.emit('move', e, me.getDiff(e));
			me.emit('mouseup', e, me.getDiff(e));
			me.destroy();
		});
	}
	getDiff(e){
		let me = this;
		let {state} = me;
		if( limit.isNumber(state.clientY) && limit.isNumber(state.clientX) ){
			return {
				diffX: e.clientX - state.clientX,
				diffY: e.clientY - state.clientY
			};
		};
	}
}

export {Index};


















