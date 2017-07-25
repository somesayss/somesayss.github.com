"use strict";

import './style.less';

import Component from 'common/myReflux/component';
import SearchList from 'modules/searchList/index';

// 组件类
class Title extends Component {
	render(){
		let me = this;
		let {props} = me;
		return (
			<div>
				<ul>
					{props.list1.map((val, key) => {
						return <li key={key}>{val.name}</li>
					})}
				</ul>
				<SearchList url="/qrcode/get.json" 
					onSuccess={Actions(me).data.bind(null, 'list1')}
					param="">
				</SearchList>
				<ul>
					{props.list2.map((val, key) => {
						return <li key={key}>{val.name}</li>
					})}
				</ul>
				<SearchList url="/qrcode/get.json" 
					param=""
					onSuccess={Actions(me).data.bind(null, 'list2')}
					actionCid="mySearch">
				</SearchList>
				<button onClick={Actions(me).click}>点击</button>
			</div>
		);
	}
	componentDidMount(){
		let me = this;
	}
};

module.exports = Title;