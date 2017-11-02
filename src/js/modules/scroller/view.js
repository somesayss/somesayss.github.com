"use strict";

import './style.less';

import Mousemove from 'modules/mousemove/index';
import Component from 'common/myReflux/component';

// 组件类
class View extends Component {
	render(){
		let me = this;
		let {props} = me;
		return (
			<div className={['limit-scroller', props.className].filter(v=>v).join(' ')}
				style={ {height: props.height} }>
				<span className="ch-container-bar" ref="containerBar" >
					<span className="ch-bar" ref="bar" style={{height: props.barHeight}} onMouseDown={me.mousedown.bind(me)}></span>
				</span>
				<div className="ch-container"  ref="container">
					{props.children}
				</div>
			</div>
		);
	}
	toggleScrollBar(){
		let me = this;
		let {refs} = me;
		let {container, containerBar} = refs;
		if( container.offsetHeight < container.scrollHeight ){
			containerBar.style.display = '';
		}else{
			containerBar.style.display = 'none';
		};
	}
	componentDidMount(){
		let me = this;
		me.toggleScrollBar();
		$(me.refs.container).on('scroll.scroller', () => {
			me.scroll();
		});
	}
	componentWillUnmount(){
		let me = this;
		$(me.refs.container).off('scroll.scroller');
	}
	componentDidUpdate(){
		let me = this;
		me.toggleScrollBar();
	}
	scroll(e){
		let me = this;
		let {refs} = me;
		let {container, bar} = refs;
		let containerHeight = container.offsetHeight;
		let barHeight = bar.offsetHeight;
		let perCent = container.scrollTop / (container.scrollHeight - containerHeight);
		bar.style.top = perCent * ( containerHeight - barHeight ) + 'px';
		me.scrollShow();
	}
	scrollTo(num){
		let me = this;
		let {refs} = me;
		let {container, bar} = refs;
		container.scrollTop = num;
		me.scroll();
	}
	scrollShow(){
		let me = this;
		let {refs} = me;
		let {bar} = refs;
		$(bar).css({opacity: 1});
		clearTimeout(me.timeId);
		me.timeId = setTimeout(() => {
			$(bar).css({opacity: 0});
		}, 500);
	}
	mousedown(e){
		let me = this;
		let {refs} = me;
		let {container, bar} = refs;
		let top = bar.style.top;
		let containerHeight = container.offsetHeight;
		let barHeight = bar.offsetHeight;
		let max = containerHeight - barHeight;
		let maxBar = container.scrollHeight - containerHeight;
		// ''的时候
		if( !top ){
			top = 0;
		};
		top = parseInt(top);
		e.preventDefault();
		e.stopPropagation();
		new Mousemove(e).on('move', (e, diff) => {
			let toTop = top + diff.diffY;
			if( toTop < 0 ){
				toTop = 0;
			}else if( toTop > max ){
				toTop = max;
			};
			let per = toTop / max;
			container.scrollTop = per * maxBar;
			bar.style.top = toTop + 'px';
			me.scrollShow();
		});
	}
};

export default View;

