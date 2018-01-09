

import './style.less';

import RouterMap from '../routerMap';
import Ajax from 'modules/ajax/index';
import Router from 'modules/router/index';
import Component from 'common/myReflux/component';

class Index extends Component {
	render(){
		let me = this;
		let {props} = me;
		let Com = props.com;
        let parseHash = Router.parseHash();
		return (
			<div className={me.getClassName('page-index')}>
				{Com ? <Com hash={parseHash.hash} search={parseHash.search} /> : null}
			</div>
		);
	}
	createRouter(defaultWhiteList, whiteList){
		let me = this;
		return new Router({
			defaultHash: 'test1',
			defaultWhiteList,
			whiteList,
			linksList: RouterMap.linksList,
			rule: limit.map( RouterMap.rule, (val) => val.bind(me))
		});
	}
	componentDidMount(){
		let me = this;
        return me.createRouter();
		// new Ajax({
		// 	url: '/mock/readLinks.json',
		// 	type: 'get'
		// }).then((val) => {
		// 	return me.createRouter(val.defaultWhiteList, val.whiteList);
		// });
	}
	componentDidUpdate(){

	}
	componentWillUnmount(){
		
	}
};

export default Index;

