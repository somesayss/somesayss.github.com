//依赖
var fs = require('fs'),
    path = require("path");

var seaCfgUrl = 'src/js/libs/seaCfg.js';

console.log(path.join(__dirname, seaCfgUrl));
var content = fs.readFileSync(path.join(__dirname, seaCfgUrl), 'utf8');
console.log(content);
console.log(456);