module.exports = (lessName) => {
	return `
import Component from './index';

ReactDOM.render( <Component />, document.getElementById('container') );
`;
};
