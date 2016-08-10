"use strict";
/**
 * 模型
 */
define(function(require, exports, module) {

  	// 依赖
  	const React = require('react');
  	const limit = require('common/limit2.0');

  	// 组件类
	class Page extends React.Component {
		constructor(){
			super(...arguments);
			let me = this,
				props = me.props;
			// 
			me.style = {overflow:'hidden', position:'relative'};
			me.style.width = props.width;
			me.style.height = props.height;
			// 
			me.listWidth = props.width * props.imgList.length;
		}
		render(){
			var me = this,
				props = me.props;
			
			return (
				<div className="react-banner" style={me.style}>
					<ul style={ {float: 'left', width: me.listWidth, position: 'relative', left: - props.index * props.width} }>
						{
							props.imgList.map((val, key) => {
								return (
									<li key={key} style={ {float: 'left'} }>
										<img src={val} width={props.width} />
									</li>
								)
							})
						}
					</ul>
					<div className="ch-btn">
						<span>&laquo;</span>
						{
							props.imgList.map((val, key) => {
								return <span key={key} onClick={props.Actions.change.bind(me, key)}></span>
							})
						}
						<span>&raquo;</span>
					</div>
				</div>
			);
		}
		
	};

	return Page;

});