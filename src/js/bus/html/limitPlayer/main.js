"use strict";

// 依赖
const AudioPlayer = require('modules/audioPlayer/index');

ReactDOM.render(
	<AudioPlayer src="http://www.runoob.com/try/demo_source/movie.mp4" />, 
	document.getElementById('container')
);
