"use strict";

import './style.less';

import DomUtil from 'common/domUtil';
import Component from 'common/myReflux/component';

import Input from 'modules/input/index';
import Select from'modules/select/index';
import Dialog from 'modules/dialog/widget';
import SearchList from 'modules/searchList/index';
import InputSearch from 'modules/inputSearch/index';
import BusTallyCount from 'modules/busTallyCount/index';

const dayCN = ['日', '一', '二', '三', '四', '五', '六'];

// 组件类
class View extends Component {
	render(){
		let me = this;
		let {props} = me;
		return (
			<div className={me.getClassName('tally', props.initPage ? '' : 'fn-hide')}>
				<div className="tally-table">
					<table width="100%">
						<thead>
							<tr>
								<td width="35" className="tally-table-edit fn-TAC">
									<button className="limitIcon iconfont icon-add" 
										onClick={Actions(me).add}></button>
								</td>
								<td width="104" className="tally-table-select">
									<Select width="100%"
										value={props.nameListSelectValue}
										onChange={Actions(me).changeNameList}>
										<option value=''>全部</option>
										{props.nameList.map((val, key) => {
											return <option key={key} value={val}>{val}</option>
										})}
									</Select>
								</td>
								<td width="153" className="tally-table-calendar">
									<Input type="calendarRange" 
										calendarRangeWidth="150"
										value={props.countTime} 
										placeholder="请选择日期区间"
										onChange={Actions(me).selectCalendar}/>
								</td>
								<td width="100">金额</td>
								<td>说明</td>
								<td width="70">操作</td>
							</tr>
						</thead>
						<tbody>
							{props.list.map((val, key) => {
								return (
									<tr className={new Date(val.time).getDay()%2 === 0 ? '' : 'tally-table-single'} 
										key={key} 
										onDoubleClick={Actions(me).edit.bind(null, val)}>
										<td className="fn-TAC">{key+1}</td>
										{me.renderName(val)}
										{me.renderTime(val)}
										{me.renderMuch(val)}
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
					<Input type="button" 
						onClick={me.countData.bind(me)}
						value="统 计" 
						className="fn-left fn-MT10"/>
					<SearchList 
						className="fn-MT10" 
						number="10"
						onSuccess={Actions(me).searchSuccess}
						searchParam={[props.searchType, {countTime: props.countTime}]}
						url="http://localhost:8080/tally/list.json" />
				</div>
			</div>
		);
	}
	componentDidMount(){
		let me = this;
		Actions('searchList').search();
	}
	renderName(val){
		let me = this;
		return (
			val.isEdit ? 
				<td className="tally-table-edit">
					<InputSearch contentStyle={{top:34, left:1}}
						originData={me.props.nameList}
						ref="input"
						onChange={Actions(this).change.bind(null, val, 'type')} 
						value={val.type}/>
				</td> :
				<td>{val.type}</td>
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
				<td className="tally-table-edit tally-table-calendar">
					<Input type="calendar" 
						calendarWidth="150"
						value={val.time} 
						onChange={Actions(this).change.bind(null, val, 'time')}/>
				</td> :
				<td>{val.time} [周{dayCN[new Date(val.time).getDay()]}]</td>
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
										onClick={Actions(me).save.bind(null, val, null)}></button>
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
	countData(){
		let me = this;
		return Actions(me).getCountDataList().then((val) => {
			new Dialog({
				useEsc: true,
				height: 'auto'
			}, null, <BusTallyCount countDataList={val[0]} />);
		});
	}
};

export default View;






























