

import './style.less';

import Ajax from 'modules/ajax/index';
import Router from 'modules/router/index';
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
	createRouter(defaultWhiteList, whiteList){
		let me = this;
		return new Router({
			defaultHash: 'test1',
			defaultWhiteList,
			whiteList,
			linksList: [
				'calendar',
				'checkbox',
				'foolui/index',
				'foolui/inputButton',
				'foolui/inputText',
				'foolui/logo',
				'foolui/pre',
				'foolui/table',
				'login',
				'mobile/page1',
				'mobile/page2',
				'mobile/page3',
				'noPermission',
				'notFound',
				'showImg',
				'tally',
				'test1',
				'test2/index',
				'test3',
				'validator',
				'videoCamera'
			],
			//buildLinksListEnd
			rule: {
				'calendar': function(){
                    require.ensure([], (a) => {
                        var reactCom = require('bus/calendar/index')['default'];
                        Actions(me).changeCom(reactCom);
                    }, 'bus/calendar/index');
                },
				'checkbox': function(){
                    require.ensure([], (a) => {
                        var reactCom = require('bus/checkbox/index')['default'];
                        Actions(me).changeCom(reactCom);
                    }, 'bus/checkbox/index');
                },
				'foolui/index': function(){
                    require.ensure([], (a) => {
                        var reactCom = require('bus/foolui/index/index')['default'];
                        Actions(me).changeCom(reactCom);
                    }, 'bus/foolui/index/index');
                },
				'foolui/inputButton': function(){
                    require.ensure([], (a) => {
                        var reactCom = require('bus/foolui/inputButton/index')['default'];
                        Actions(me).changeCom(reactCom);
                    }, 'bus/foolui/inputButton/index');
                },
				'foolui/inputText': function(){
                    require.ensure([], (a) => {
                        var reactCom = require('bus/foolui/inputText/index')['default'];
                        Actions(me).changeCom(reactCom);
                    }, 'bus/foolui/inputText/index');
                },
				'foolui/logo': function(){
                    require.ensure([], (a) => {
                        var reactCom = require('bus/foolui/logo/index')['default'];
                        Actions(me).changeCom(reactCom);
                    }, 'bus/foolui/logo/index');
                },
				'foolui/pre': function(){
                    require.ensure([], (a) => {
                        var reactCom = require('bus/foolui/pre/index')['default'];
                        Actions(me).changeCom(reactCom);
                    }, 'bus/foolui/pre/index');
                },
				'foolui/table': function(){
                    require.ensure([], (a) => {
                        var reactCom = require('bus/foolui/table/index')['default'];
                        Actions(me).changeCom(reactCom);
                    }, 'bus/foolui/table/index');
                },
				'login': function(){
                    require.ensure([], (a) => {
                        var reactCom = require('bus/login/index')['default'];
                        Actions(me).changeCom(reactCom);
                    }, 'bus/login/index');
                },
				'mobile/page1': function(){
                    require.ensure([], (a) => {
                        var reactCom = require('bus/mobile/page1/index')['default'];
                        Actions(me).changeCom(reactCom);
                    }, 'bus/mobile/page1/index');
                },
				'mobile/page2': function(){
                    require.ensure([], (a) => {
                        var reactCom = require('bus/mobile/page2/index')['default'];
                        Actions(me).changeCom(reactCom);
                    }, 'bus/mobile/page2/index');
                },
				'mobile/page3': function(){
                    require.ensure([], (a) => {
                        var reactCom = require('bus/mobile/page3/index')['default'];
                        Actions(me).changeCom(reactCom);
                    }, 'bus/mobile/page3/index');
                },
				'noPermission': function(){
                    require.ensure([], (a) => {
                        var reactCom = require('bus/noPermission/index')['default'];
                        Actions(me).changeCom(reactCom);
                    }, 'bus/noPermission/index');
                },
				'notFound': function(){
                    require.ensure([], (a) => {
                        var reactCom = require('bus/notFound/index')['default'];
                        Actions(me).changeCom(reactCom);
                    }, 'bus/notFound/index');
                },
				'showImg': function(){
                    require.ensure([], (a) => {
                        var reactCom = require('bus/showImg/index')['default'];
                        Actions(me).changeCom(reactCom);
                    }, 'bus/showImg/index');
                },
				'tally': function(){
                    require.ensure([], (a) => {
                        var reactCom = require('bus/tally/index')['default'];
                        Actions(me).changeCom(reactCom);
                    }, 'bus/tally/index');
                },
				'test1': function(){
                    require.ensure([], (a) => {
                        var reactCom = require('bus/test1/index')['default'];
                        Actions(me).changeCom(reactCom);
                    }, 'bus/test1/index');
                },
				'test2/index': function(){
                    require.ensure([], (a) => {
                        var reactCom = require('bus/test2/index/index')['default'];
                        Actions(me).changeCom(reactCom);
                    }, 'bus/test2/index/index');
                },
				'test3': function(){
                    require.ensure([], (a) => {
                        var reactCom = require('bus/test3/index')['default'];
                        Actions(me).changeCom(reactCom);
                    }, 'bus/test3/index');
                },
				'validator': function(){
                    require.ensure([], (a) => {
                        var reactCom = require('bus/validator/index')['default'];
                        Actions(me).changeCom(reactCom);
                    }, 'bus/validator/index');
                },
				'videoCamera': function(){
                    require.ensure([], (a) => {
                        var reactCom = require('bus/videoCamera/index')['default'];
                        Actions(me).changeCom(reactCom);
                    }, 'bus/videoCamera/index');
                }
			}
			//buildRuleEnd
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

