
import './style.less';

import Component from 'common/myReflux/component';
import SearchListMod from 'modules/searchList/index';

class SearchList extends Component {
	render(){
		let me = this;
		let {props} = me;
		return (
			<div className={me.getClassName('page-search-list', 'fn-PA10')}>
				<SearchListMod totle={100} />
			</div>
		);
	}
	componentDidMount(){

	}
	componentDidUpdate(){

	}
	componentWillUnmount(){
		
	}
};

export default SearchList;

