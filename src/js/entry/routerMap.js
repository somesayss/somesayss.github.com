
const RouterMap = {
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
    rule: {
		'calendar': function(){
            require.ensure([], (a) => {
            var reactCom = require('bus/calendar/index')['default'];
            Actions(this).changeCom(reactCom);
            }, 'bus/calendar/index');
        },
		'checkbox': function(){
            require.ensure([], (a) => {
            var reactCom = require('bus/checkbox/index')['default'];
            Actions(this).changeCom(reactCom);
            }, 'bus/checkbox/index');
        },
		'foolui/index': function(){
            require.ensure([], (a) => {
            var reactCom = require('bus/foolui/index/index')['default'];
            Actions(this).changeCom(reactCom);
            }, 'bus/foolui/index/index');
        },
		'foolui/inputButton': function(){
            require.ensure([], (a) => {
            var reactCom = require('bus/foolui/inputButton/index')['default'];
            Actions(this).changeCom(reactCom);
            }, 'bus/foolui/inputButton/index');
        },
		'foolui/inputText': function(){
            require.ensure([], (a) => {
            var reactCom = require('bus/foolui/inputText/index')['default'];
            Actions(this).changeCom(reactCom);
            }, 'bus/foolui/inputText/index');
        },
		'foolui/logo': function(){
            require.ensure([], (a) => {
            var reactCom = require('bus/foolui/logo/index')['default'];
            Actions(this).changeCom(reactCom);
            }, 'bus/foolui/logo/index');
        },
		'foolui/pre': function(){
            require.ensure([], (a) => {
            var reactCom = require('bus/foolui/pre/index')['default'];
            Actions(this).changeCom(reactCom);
            }, 'bus/foolui/pre/index');
        },
		'foolui/table': function(){
            require.ensure([], (a) => {
            var reactCom = require('bus/foolui/table/index')['default'];
            Actions(this).changeCom(reactCom);
            }, 'bus/foolui/table/index');
        },
		'login': function(){
            require.ensure([], (a) => {
            var reactCom = require('bus/login/index')['default'];
            Actions(this).changeCom(reactCom);
            }, 'bus/login/index');
        },
		'mobile/page1': function(){
            require.ensure([], (a) => {
            var reactCom = require('bus/mobile/page1/index')['default'];
            Actions(this).changeCom(reactCom);
            }, 'bus/mobile/page1/index');
        },
		'mobile/page2': function(){
            require.ensure([], (a) => {
            var reactCom = require('bus/mobile/page2/index')['default'];
            Actions(this).changeCom(reactCom);
            }, 'bus/mobile/page2/index');
        },
		'mobile/page3': function(){
            require.ensure([], (a) => {
            var reactCom = require('bus/mobile/page3/index')['default'];
            Actions(this).changeCom(reactCom);
            }, 'bus/mobile/page3/index');
        },
		'noPermission': function(){
            require.ensure([], (a) => {
            var reactCom = require('bus/noPermission/index')['default'];
            Actions(this).changeCom(reactCom);
            }, 'bus/noPermission/index');
        },
		'notFound': function(){
            require.ensure([], (a) => {
            var reactCom = require('bus/notFound/index')['default'];
            Actions(this).changeCom(reactCom);
            }, 'bus/notFound/index');
        },
		'showImg': function(){
            require.ensure([], (a) => {
            var reactCom = require('bus/showImg/index')['default'];
            Actions(this).changeCom(reactCom);
            }, 'bus/showImg/index');
        },
		'tally': function(){
            require.ensure([], (a) => {
            var reactCom = require('bus/tally/index')['default'];
            Actions(this).changeCom(reactCom);
            }, 'bus/tally/index');
        },
		'test1': function(){
            require.ensure([], (a) => {
            var reactCom = require('bus/test1/index')['default'];
            Actions(this).changeCom(reactCom);
            }, 'bus/test1/index');
        },
		'test2/index': function(){
            require.ensure([], (a) => {
            var reactCom = require('bus/test2/index/index')['default'];
            Actions(this).changeCom(reactCom);
            }, 'bus/test2/index/index');
        },
		'test3': function(){
            require.ensure([], (a) => {
            var reactCom = require('bus/test3/index')['default'];
            Actions(this).changeCom(reactCom);
            }, 'bus/test3/index');
        },
		'validator': function(){
            require.ensure([], (a) => {
            var reactCom = require('bus/validator/index')['default'];
            Actions(this).changeCom(reactCom);
            }, 'bus/validator/index');
        },
		'videoCamera': function(){
            require.ensure([], (a) => {
            var reactCom = require('bus/videoCamera/index')['default'];
            Actions(this).changeCom(reactCom);
            }, 'bus/videoCamera/index');
        }
    }
}

export default RouterMap;

