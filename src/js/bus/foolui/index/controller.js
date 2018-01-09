
import Control from 'common/myReflux/control';

class Controller extends Control {
	state = {}
	static defaultProps = {
		uiList: [
			'inputText √',
			'inputButton',
			'inputCalendar',
			'inputCalendarRange',
			'inputSelect',
			'inputUpload',
			'inputTextarea',
			'inputCheckbox',
			'inputRadio',
			'inputHidden'
		]
	}
};

export default Controller;
