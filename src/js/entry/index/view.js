
import './style.less';


import Router from 'modules/router/index';
import Ajax from 'modules/ajax/index';
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
	createRouter(defaultWhiteList){
		let me = this;
		return new Router({
			defaultHash: 'test1',
			defaultWhiteList: defaultWhiteList,
			linksList: [
				'test1',
				'test2/index',
				'test3',
				'tally',
				'validator',
				'calendar',
				'notFound',
				'noPermission',
				'login'
			],
			rule: {
				'test1': function(){
					require.ensure([], (a) => {
						let reactCom = require('bus/test1/index')['default'];
						Actions(me).changeCom(reactCom);
					}, 'bus/test1/index');
				},
				'test2/index': function(){
					require.ensure([], (a) => {
						let reactCom = require('bus/test2/index/index')['default'];
						Actions(me).changeCom(reactCom);
					}, 'bus/test2/index/index');
				},
				'test3': function(){
					require.ensure([], (a) => {
						let reactCom = require('bus/test3/index')['default'];
						Actions(me).changeCom(reactCom);
					}, 'bus/test3/index');
				},
				tally(){
					require.ensure([], (a) => {
						let reactCom = require('bus/tally/index')['default'];
						Actions(me).changeCom(reactCom);
					}, 'bus/tally/main');
				},
				validator(){
					console.log('in validator')
					require.ensure([], (a) => {
						let reactCom = require('bus/validator/index')['default'];
						Actions(me).changeCom(reactCom);
					}, 'bus/validator/main');
				},
				calendar(){
					require.ensure([], (a) => {
						let reactCom = require('bus/calendar/index')['default'];
						Actions(me).changeCom(reactCom);
					}, 'bus/calendar/main');
				},
				notFound(){
					require.ensure([], (a) => {
						let reactCom = require('bus/notFound/index')['default'];
						Actions(me).changeCom(reactCom);
					}, 'bus/notFound/main');
				},
				noPermission(){
					require.ensure([], (a) => {
						let reactCom = require('bus/noPermission/index')['default'];
						Actions(me).changeCom(reactCom);
					}, 'bus/noPermission/main');
				},
				login(){
					require.ensure([], (a) => {
						let reactCom = require('bus/login/index')['default'];
						Actions(me).changeCom(reactCom);
					}, 'bus/login/main');
				}
			}
		});
	}
	componentDidMount(){
		let me = this;
		new Ajax({
			url: '/mock/readLinks.json',
			type: 'get'
		}).then((val) => {
			return me.createRouter(val.defaultWhiteList);
		});

		
		
	}
	componentDidUpdate(){

	}
	componentWillUnmount(){
		
	}
};

export default Index;

