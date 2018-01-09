
import './style.less';

const { Pagination } = antd;

import Component from 'common/myReflux/component';

// 组件类
class SearchList extends Component {
	render(){
		let me = this;
		let {props} = me;
		return (
			<div className={me.getClassName('search-list')}>
				{props.children}
				<Pagination className="search-list-page" 
					onChange={Actions(me).change}
					total={props.totle}
					current={props.page} 
					pageSize={props.number}
					onShowSizeChange={Actions(me).showSizeChange}
					showQuickJumper={props.showQuickJumper}
					showSizeChanger={props.showSizeChanger} />
			</div>
		);
	}
};

export default SearchList;


