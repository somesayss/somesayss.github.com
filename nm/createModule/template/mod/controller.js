module.exports = (lessName, componentName) => {
	return `
import Control from 'common/myReflux/control';

class Controller extends Control {
	state = {}
	static defaultProps = {
		actionId: '${componentName}'
	}
};

export default Controller;
`;
};
