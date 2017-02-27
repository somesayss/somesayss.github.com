"use strict";

// 依赖
const AudioPlayer = require('modules/audioPlayer/index');

ReactDOM.render(
	<AudioPlayer src="./music.mp3" />, 
	document.getElementById('container')
);
