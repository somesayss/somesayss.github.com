"use strict";

const [type, name, cover] = process.argv.splice(2);
const createModule = require('../nm/createModule');

createModule.createModule(type, name, cover);