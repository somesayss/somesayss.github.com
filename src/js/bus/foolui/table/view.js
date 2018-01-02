
import './style.less';

import Component from 'common/myReflux/component';

class FooluiTable extends Component {
	render(){
		let me = this;
		let {props} = me;
		return (
			<div className={me.getClassName('page-foolui-table')}>
				<table>
					<tbody>
						{props.children}
					</tbody>
				</table>
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

export default FooluiTable;

