"use strict";

import './style.less';

import Component from 'common/myReflux/component';
import Page from 'modules/page/index';

// 组件类
class SearchList extends Component {
	render(){
		let me = this;
		let {props} = me;
		return (
			<div className={me.getClassName('search-list')}>
				{props.children}
				<Page className="search-list-page" 
					onChange={Actions(me).change}
					totle={props.totle}
					page={props.page} />
			</div>
		);
	}
};

export default SearchList;


