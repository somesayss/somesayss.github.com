

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
'login',
'noPermission',
'notFound',
'tally',
'test1',
'test2/index',
'test3',
'validator'
],
//buildLinksListEnd
			rule: {
'calendar': function(){
                        require.ensure([], (a) => {
                            let reactCom = require('bus/calendar/index')['default'];
                            Actions(me).changeCom(reactCom);
                        }, 'bus/calendar/index');
                    },
'login': function(){
                        require.ensure([], (a) => {
                            let reactCom = require('bus/login/index')['default'];
                            Actions(me).changeCom(reactCom);
                        }, 'bus/login/index');
                    },
'noPermission': function(){
                        require.ensure([], (a) => {
                            let reactCom = require('bus/noPermission/index')['default'];
                            Actions(me).changeCom(reactCom);
                        }, 'bus/noPermission/index');
                    },
'notFound': function(){
                        require.ensure([], (a) => {
                            let reactCom = require('bus/notFound/index')['default'];
                            Actions(me).changeCom(reactCom);
                        }, 'bus/notFound/index');
                    },
'tally': function(){
                        require.ensure([], (a) => {
                            let reactCom = require('bus/tally/index')['default'];
                            Actions(me).changeCom(reactCom);
                        }, 'bus/tally/index');
                    },
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
'validator': function(){
                        require.ensure([], (a) => {
                            let reactCom = require('bus/validator/index')['default'];
                            Actions(me).changeCom(reactCom);
                        }, 'bus/validator/index');
                    }
}
//buildRuleEnd
		});
	}
	componentDidMount(){
		let me = this;
		new Ajax({
			url: '/mock/readLinks.json',
			type: 'get'
		}).then((val) => {
			return me.createRouter(val.defaultWhiteList, val.whiteList);
		});
	}
	componentDidUpdate(){

	}
	componentWillUnmount(){
		
	}
};

export default Index;

