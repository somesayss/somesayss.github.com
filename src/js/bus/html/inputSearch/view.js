"use strict";

import './style.less';
import Component from 'common/myReflux/component';
import InputSearch from 'modules/inputSearch/index';

// 组件类
class Tally extends Component {
	render(){
		let me = this;
		let {props} = me;
		return (
			<div className={me.getClassName('inputSearch')}>
				<InputSearch value="a1" />
			</div>
		);
	}
};

module.exports = Tally;






























