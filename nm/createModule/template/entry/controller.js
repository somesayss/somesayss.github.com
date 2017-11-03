module.exports = (lessName) => {
	return `
import Control from 'common/myReflux/control';

class Controller extends Control {
	state = {}
};

export default Controller;
`;
};
