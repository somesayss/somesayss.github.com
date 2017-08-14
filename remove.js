"use strict";

const [type, name, cover] = process.argv.splice(2);
const createModule = require('createModule');

createModule.removeModule(type, name, cover);