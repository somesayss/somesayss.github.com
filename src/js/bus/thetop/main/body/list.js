"use strict";

import './style.less';

// 依赖
const React = require('react');
const limit = require('limit');
const Image = require('./image');

// 组件类
class Info extends React.Component {
	constructor(){
		super(...arguments);
		let me = this;
	}
	render(){
		let me = this;
		let props = me.props;
		let num = Actions(me).getMovieNumber();
		return (
			<ul>
				{props.list.map((val, key) => {
					return (
						<li key={val.id}>
							<div className="ch-img">
								<div className="ch-imgbox">
									<Image width="80" src={val.src} onClick={Actions(me).zoomIn.bind(me, val.src)}/>
									<Image width="80" src={val.src} onClick={Actions(me).zoomIn.bind(me, val.src)}/>
								</div>
							</div>
							<div className="ch-score">
								{limit.toFixed(val.score, 1)}
							</div>
							{do{
								if( val.isHide ){
									<div className="ch-mark"></div>
								}
							}}
							<div className="ch-text">
								<span className="ch-name">{val.name}</span>
								{do{
									if( !val.isHide ){
										<span>
											<a href="javascript:;" className="ch-btn" onClick={Actions(me).copy.bind(me, val.name)}>复制名称</a>
											<a href="javascript:;" className="ch-btn" onClick={Actions(me).hideIt.bind(me, val)}>看过</a>
										</span>
									}else{
										<span>
											<a href="javascript:;" className="ch-btn ch-btn-gray" onClick={Actions(me).copy.bind(me, val.name)}>复制名称</a>
											<a href="javascript:;" className="ch-btn ch-btn-gray" onClick={Actions(me).showIt.bind(me, val)}>想看</a>
										</span>
									}
								}}
								<br />
								导演：{val.actor}<br />
								{do{
									if( val.director ){
										<span>演员：{val.director}<br /></span>
									}
								}}
								时间：{val.year} 类型：{val.type} 国家：{val.area}
							</div>
							{do{
								if( val.thunder ){
									<div className="ch-download">
										{val.thunder.split(',').map((val, key) => {
											let title = `点击复制资源地址[${val}]`;
											return (
												<a key={key} 
													href="javascript:;" 
													title={title}
													onClick={Actions(me).copy.bind(me, val)}>B</a>
											);
										})}
									</div>
								}
							}}
						</li>
					);
				})}
			</ul>
		);
	}
};

module.exports = Info;

