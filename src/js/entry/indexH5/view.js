
import './style.less';

import Router from 'modules/router/index';
import Component from 'common/myReflux/component';

class IndexH5 extends Component {
	render(){
		let me = this;
		let {props: {comList}} = me;
		return (
			<div className={me.getClassName('page-index-h5')}>
				{comList.map((val, key) => {
					let Com = val.reactCom;
					return (
						<div key={key} style={{left: val.isShow ? '0' : '100%'}} className="index-h5-one">
							<Com />
						</div>
					);
				})}
			</div>
		);
	}
	componentDidMount(){
		let me = this;
		new Router({
			defaultHash: 'mobile/page1',
			linksList: ['mobile/page1', 'mobile/page2', 'mobile/page3', 'login', 'notFound', 'noPermission'],
			rule: {
				'mobile/page1': function(){
					require.ensure([], (a) => {
                        let reactCom = require('bus/mobile/page1')['default'];
                        Actions(me).changeCom(reactCom);
                    }, 'bus/mobile/page1');
				},
				'mobile/page2': function(){
					require.ensure([], (a) => {
                        let reactCom = require('bus/mobile/page2')['default'];
                        Actions(me).changeCom(reactCom);
                    }, 'bus/mobile/page2');
				},
				'mobile/page3': function(){
					require.ensure([], (a) => {
                        let reactCom = require('bus/mobile/page3')['default'];
                        Actions(me).changeCom(reactCom);
                    }, 'bus/mobile/page3');
				},
				'login': function(){
					require.ensure([], (a) => {
                        let reactCom = require('bus/login')['default'];
                        Actions(me).changeCom(reactCom);
                    }, 'bus/login');
				},
				'notFound': function(){
					require.ensure([], (a) => {
                        let reactCom = require('bus/notFound')['default'];
                        Actions(me).changeCom(reactCom);
                    }, 'bus/notFound');
				},
				'noPermission': function(){
					require.ensure([], (a) => {
                        let reactCom = require('bus/noPermission')['default'];
                        Actions(me).changeCom(reactCom);
                    }, 'bus/noPermission');
				}
			}
		});
	}
	componentDidUpdate(){

	}
	componentWillUnmount(){
		
	}
};

export default IndexH5;

