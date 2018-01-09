
const RouterMap = {
    linksList: [
		'login',
		'noPermission',
		'notFound',
		'searchList',
		'showImg',
		'test'
    ],
    rule: {
		'login': function(){
            require.ensure([], (a) => {
            var reactCom = require('bus/login/index')['default'];
            Actions(this).changeCom(reactCom);
            }, 'bus/login/index');
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
		'searchList': function(){
            require.ensure([], (a) => {
            var reactCom = require('bus/searchList/index')['default'];
            Actions(this).changeCom(reactCom);
            }, 'bus/searchList/index');
        },
		'showImg': function(){
            require.ensure([], (a) => {
            var reactCom = require('bus/showImg/index')['default'];
            Actions(this).changeCom(reactCom);
            }, 'bus/showImg/index');
        },
		'test': function(){
            require.ensure([], (a) => {
            var reactCom = require('bus/test/index')['default'];
            Actions(this).changeCom(reactCom);
            }, 'bus/test/index');
        }
    }
}

export default RouterMap;

