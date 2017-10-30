
import './style.less';

import Router from 'modules/router/router';
import Component from 'common/myReflux/component';

class Index extends Component {
	render(){
		let me = this;
		let {props} = me;
		let Com = props.com;
		return (
			<div className={me.getClassName('page-index')}>
				{Com ? <Com /> : null}
			</div>
		);
	}
	componentDidMount(){
		let me = this;
		new Router({
			defaultHash: 'test3',
			rule: {
				test1(){
					require.ensure([], (a) => {
						let test1 = require('bus/test1/main')['default'];
						console.log('abc', test1);
						Actions(me).changeCom(null);
					}, 'bus/test1/main');
				},
				test2(){
					require.ensure([], (a) => {
						let test2 = require('bus/test2/main')['default'];
						console.log('def', test2);
						Actions(me).changeCom(null);
					}, 'bus/test2/main');
				},
				test3(){
					require.ensure([], (a) => {
						let reactCom = require('bus/test3/index')['default'];
						Actions(me).changeCom(reactCom);
					}, 'bus/test3/main');
				}
			}
		});
	}
	componentDidUpdate(){

	}
	componentWillUnmount(){
		
	}
};

export default Index;

