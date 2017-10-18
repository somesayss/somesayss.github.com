"use strict";

import './style.less';

const Scroller = require('modules/scroller/index');
const Title = require('modules/title/widget');

// 组件类
class Select extends React.Component {
	getClassName(){
		let me = this;
		let {props} = me;
		let arr = ['limit-select'];
		if( props.className ){
			arr.push(props.className);
		};
		if( props.showList ){
			arr.push('limit-select-focus');
		};
		return arr.join(' ')
	}
	getFirstSelect(){
		let me = this;
		let {props} = me;
		let {list} = props;
		let key = null;
		list.some((val) => {
			if( val.selected ){
				key = val.key;
				return true;
			};
		});
		if( key === null && list[0] ){
			key = list[0].key;
		};
		return key;
	}
	getRightHeight(){
		let me = this;
		let {props} = me;
		let leg = props.list.length;
		if( leg < props.size ){
			return 28 * leg;
		}else{
			return props.size * 28;
		};
	}
	render(){
		let me = this;
		let {props} = me;
		return (
			<div ref="selectMock" className={me.getClassName()}
				style={ {width:props.width} }>
				<div ref="selectTrigger" className="ch-show fn-ellipsis"><i className="ch-san"></i>{me.getFirstSelect()}</div>
				<div className="ch-list" ref="selectList">
					<Scroller ref="scroller" height={me.getRightHeight()} barHeight={props.barHeight} >
						<ul>
							{props.list.map((val, key) => {
								return (
									<li title={val.key} className="fn-ellipsis" key={key} 
										data-value={val.value}  onClick={Actions(me).select.bind(null, val, key)}>{val.key}</li>
								)
							})}
						</ul>
					</Scroller>
				</div>
			</div>
		);
	}
	componentDidMount(){
		let me = this;
		let {refs, props} = me;
		let {selectTrigger, selectList, scroller} = refs;
		$(selectTrigger).on('click.select', (e) => {
			e.stopPropagation();
			if( props.disabled ){
				return;
			};
			if( !me.props.showList ){
				$(document).on('click.select', () => {
					$(document).off('click.select');
					Actions(me).showList();
				});
			}else{
				$(document).off('click.select');
			};
			Actions(me).showList();
		});
		me.TitleWidget = Title.use(selectList, {className: 'limit-select-title', diffX:15, diffY:15}, props.titleSize);
	}
	componentWillUnmount(){
		let me = this;
		let {refs} = me;
		let {selectTrigger} = refs;
		$(selectTrigger).off('click.select');
		me.TitleWidget.destroy();
	}
};

module.exports = Select;

