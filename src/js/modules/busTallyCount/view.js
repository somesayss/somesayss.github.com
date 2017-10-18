
import './style.less';

import Input from 'modules/input/index';
import Component from 'common/myReflux/component';

class BusTallyCount extends Component {
	filterCount(before, val){
		if( val.checked ){
			return limit.express(`${before} + ${val.much}`);
		}else{
			return before;
		};
	}
	render(){
		let me = this;
		let {props: {countDataList}} = me;
		let countDataListDeficit = []; //支出
		let countDataListSurplus = []; //收入
		countDataList.forEach((val) => {
			if( val.much >= 0 ){
				countDataListSurplus.push(val);
			}else{
				countDataListDeficit.push(val);
			};
		});
		countDataListSurplus = countDataListSurplus.reverse();
		let totleDeficit = countDataListDeficit.reduce(me.filterCount, 0);
		let totleSurplus = countDataListSurplus.reduce(me.filterCount, 0);
		return (
			<div className={me.getClassName('mod-bus-tally-count')}>
				<div className="fn-PA15">
					<table width="100%">
						<tbody>
							{do{
								if( !countDataListDeficit.length && !countDataListSurplus.length ){
									<tr>
										<td>
											没有统计数据数据
										</td>
									</tr>
								}
							}}
							{countDataListDeficit.map((val, key) => {
								return (
									<tr key={key}>
										<td width="80" className="count-data-type">
											<label><Input type="checkbox" checked={val.checked} onChange={Actions(me).selectType.bind(null, val)} /> {val.type}</label>
										</td>
										<td>
											{limit.toFixed(val.much, 2)}
											<span className="count-data-line" style={{width:`${val.checked ? val.much/totleDeficit*100 : '0'}%`}}></span>
										</td>
									</tr>
								);
							})}
							{do{
								if( countDataListDeficit.length ){
									<tr>
										<td className="count-data-type">
											<label><Input 
												type="checkbox" 
												onChange={Actions(me).selectAllType.bind(null, 'deficit')}
												indeterminate={countDataListDeficit.some(val => val.checked) && countDataListDeficit.some(val => !val.checked)}
												checked={countDataListDeficit.every(val => val.checked)} /> 支出总计</label>
										</td>
										<td>
											{limit.toFixed(totleDeficit, 2)}
											<span className="count-data-line" style={{width:`${totleDeficit === 0 ? '0' : '100'}%`}}></span>
										</td>
									</tr>
								}
							}}
							
							{countDataListSurplus.map((val, key) => {
								return (
									<tr key={key}>
										<td width="60" className="count-data-type">
											<label><Input type="checkbox" checked={val.checked} onChange={Actions(me).selectType.bind(null, val)} /> {val.type}</label>
										</td>
										<td>
											{limit.toFixed(val.much, 2)}
											<span className="count-data-line count-data-surplus" style={{width:`${val.checked ? val.much/totleSurplus*100 : '0'}%`}}></span>
										</td>
									</tr>
								);
							})}
							{do{
								if( countDataListSurplus.length ){
									<tr>
										<td className="count-data-type">
											<label><Input 
												type="checkbox" 
												onChange={Actions(me).selectAllType.bind(null, 'surplus')}
												indeterminate={countDataListSurplus.some(val => val.checked) && countDataListSurplus.some(val => !val.checked)}
												checked={countDataListSurplus.every(val => val.checked)} /> 收入总计</label>
										</td>
										<td>
											{limit.toFixed(totleSurplus, 2)}
											<span className="count-data-line count-data-surplus" style={{width:`${totleSurplus === 0 ? '0' : '100'}%`}}></span>
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
	componentDidMount(){

	}
	componentWillUnmount(){
		
	}
};

module.exports = BusTallyCount;
