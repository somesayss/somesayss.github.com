"use strict";

import './style.less';

import DomUtil from 'common/domUtil';
import Input from 'modules/input/index';
import Dialog from 'modules/dialog/widget';
import InputSearch from 'modules/inputSearch/index';
import Component from 'common/myReflux/component';

// 组件类
class Tally extends Component {
	render(){
		let me = this;
		let {props} = me;
		return (
			<div className={me.getClassName('tally')}>
				<div className="tally-filter">
					筛选：
				</div>
				<div className="tally-table fn-MT5">
					<table width="800">
						<thead>
							<tr>
								<td width="30" className="tally-table-edit fn-TAC">
									<button className="limitIcon iconfont icon-add" 
										onClick={Actions(me).add}></button>
								</td>
								<td width="100">类别</td>
								<td width="100">金额</td>
								<td width="100">日期</td>
								<td>说明</td>
								<td width="70">操作</td>
							</tr>
						</thead>
						<tbody>
							{props.list.map((val, key) => {
								return (
									<tr key={key} onDoubleClick={Actions(me).edit.bind(null, val)}>
										<td className="fn-TAC">{key+1}</td>
										{me.renderName(val)}
										{me.renderMuch(val)}
										{me.renderTime(val)}
										{me.renderInfo(val)}
										{me.renderEdit(val)}
									</tr>
								);
							})}
							{do{
								if( !props.list.length ){
									<tr>
										<td> </td>
										<td colSpan="5">
											没有数据
										</td>
									</tr>
								}
							}}
						</tbody>
					</table>
				</div>
			</div>
		);
	}
	renderName(val){
		let me = this;
		return (
			val.isEdit ? 
				<td className="tally-table-edit">
					<InputSearch contentStyle={{top:34, left:1}}
						originData={me.props.nameList}
						ref="input"
						onChange={Actions(this).change.bind(null, val, 'name')} 
						value={val.name}/>
				</td> :
				<td>{val.name}</td>
		);
	}
	renderMuch(val){
		return (
			val.isEdit ? 
				<td className="tally-table-edit">
					<div className="tally-table-shuozhi">
						<i className={`tally-table-shuozhi-in ${val.much >= 0 ? 'active' : ''}`}>收</i>
						<i className={`tally-table-shuozhi-out ${val.much < 0 ? 'active' : ''}`}>支</i>
						<input type="text" 
							style={{textAlign:'right'}} 
							onChange={Actions(this).change.bind(null, val, 'much')} 
							value={val.much}/>
					</div>
				</td> :
				<td className={`tally-table-much ${val.much < 0 ? 'tally-table-deficit' : 'tally-table-surplus'}`}>
					{val.much > 0 ? '+': null}{limit.thousandSeparator(val.much)}
				</td>
		);
	}
	renderTime(val){
		return (
			val.isEdit ? 
				<td className="tally-table-edit">
					<input type="text" 
						onChange={Actions(this).change.bind(null, val, 'time')} 
						value={val.time} />
				</td> :
				<td>{val.time}</td>
		);
	}
	renderInfo(val){
		return (
			val.isEdit ? 
				<td className="tally-table-edit">
					<input type="text" 
						onChange={Actions(this).change.bind(null, val, 'info')} 
						value={val.info} />
				</td> :
				<td>{val.info}</td>
		);
	}
	renderEdit(val){
		let me = this;
		return (
			<td>
				{do{
					if( val.isEdit ){
						<span>
							{do{
								if( val.isLoading ){
									<button className="limitIcon iconfont icon-refresh loading fn-MR5" disabled="disabled"></button>
								}else{
									<button className="limitIcon iconfont icon-save fn-MR5" 
										onClick={Actions(me).save.bind(null, val)}></button>
								}
							}}
						</span>
					}else{
						<span>
							<button className="limitIcon iconfont icon-edit fn-MR5" 
								onClick={Actions(me).edit.bind(null, val)}></button>
							{do{
								if( val.isLoading ){
									<button className="limitIcon iconfont icon-refresh loading" disabled="disabled"></button>
								}else{
									<button className="limitIcon iconfont icon-delete" onClick={Actions(me).dele.bind(null, val)}></button>
								}
							}}
						</span>
					}
				}}
			</td>
		);
	}
	componentDidUpdate(){
		let me = this;
		let {refs: {input}, props: {actionStatus}} = me;
		if( input && limit.contains(['edit', 'add'], actionStatus) ){
			input = input.refs.com.getInput();
			let leg = input.value.length;
			DomUtil.textSelect(input, leg, leg);
		};
	}
};

module.exports = Tally;






























