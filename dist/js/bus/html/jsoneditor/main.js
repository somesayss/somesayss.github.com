/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/dist/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ({

/***/ 0:
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(91);


/***/ },

/***/ 91:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _parseJsonSchema = __webpack_require__(92);
	
	var _parseJsonSchema2 = _interopRequireDefault(_parseJsonSchema);
	
	var _parseHtmlJsonSchema = __webpack_require__(239);
	
	var _parseHtmlJsonSchema2 = _interopRequireDefault(_parseHtmlJsonSchema);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	// 依赖
	console.log((0, _parseJsonSchema2.default)());
	
	new JSONEditor(document.getElementById('jsoneditor'), {
	    mode: 'tree',
	    modes: ['code', 'tree'],
	    onError: function onError(err) {
	        alert(err.toString());
	    },
	    onChange: function onChange() {
	        console.log(123);
	    }
	}, (0, _parseJsonSchema2.default)());
	
	$('#jsonHtml').html((0, _parseHtmlJsonSchema2.default)());

/***/ },

/***/ 92:
/***/ function(module, exports) {

	"use strict";
	
	var originJsonSchemaData = {
	    "title": "person",
	    "type": "object",
	    "properties": {
	        "name": {
	            "type": "string"
	        },
	        "age": {
	            "type": "integer"
	        },
	        "location": {
	            "type": "object",
	            "properties": {
	                "city": {
	                    "type": "array",
	                    "items": {
	                        "type": "object",
	                        "properties": {
	                            "name": {
	                                "type": "string"
	                            },
	                            "lage": {
	                                "type": "string"
	                            },
	                            "isSee": {
	                                "type": "boolean"
	                            },
	                            "yilai": {
	                                "type": "array",
	                                "items": {
	                                    "type": "integer"
	                                }
	                            }
	                        }
	                    }
	                }
	            }
	        }
	    }
	};
	
	/*
	    {
	        name: "a",
	        age: 0,
	        location: {
	            city: [{
	                name: 'zhejiang',
	                lage: '1000',
	                isSee: true,
	                yilai: [1, 2, 3]
	            }, {
	                name: 'fujian',
	                lage: '1001',
	                isSee: false,
	                yilai: [4, 5, 6]
	            }],
	        }
	    }
	*/
	
	var jsonSchemaMethods = {
	    stringGet: function stringGet() {
	        return '';
	    },
	    numberGet: function numberGet() {
	        return 0;
	    },
	    integerGet: function integerGet() {
	        return 0;
	    },
	    booleanGet: function booleanGet() {
	        return true;
	    },
	    objectGet: function objectGet(props) {
	        return limit.map(props, function (val, key) {
	            return main(val);
	        });
	    },
	    arrayGet: function arrayGet(items) {
	        return [main(items)];
	    }
	};
	
	var propMethods = {
	    objectGet: function objectGet(jsonSchema) {
	        return jsonSchema.properties;
	    },
	    arrayGet: function arrayGet(jsonSchema) {
	        return jsonSchema.items;
	    }
	};
	
	function main(jsonSchema) {
	    var type = jsonSchema.type;
	    var methodName = type + "Get";
	    var jsonSchemaMethod = jsonSchemaMethods[methodName];
	    if (jsonSchemaMethod) {
	        var propMethod = propMethods[methodName];
	        var props = null;
	        if (propMethod) {
	            props = propMethod(jsonSchema);
	        }
	        return jsonSchemaMethod(props);
	    };
	};
	
	module.exports = function () {
	    return main(originJsonSchemaData);
	};

/***/ },

/***/ 239:
/***/ function(module, exports) {

	"use strict";
	
	var originJsonSchemaData = {
	    "title": "person",
	    "type": "object",
	    "properties": {
	        "name": {
	            "type": "string"
	        },
	        "age": {
	            "type": "integer"
	        },
	        "location": {
	            "type": "object",
	            "properties": {
	                "city": {
	                    "type": "array",
	                    "items": {
	                        "type": "object",
	                        "properties": {
	                            "name": {
	                                "type": "string"
	                            },
	                            "lage": {
	                                "type": "string"
	                            },
	                            "isSee": {
	                                "type": "boolean"
	                            },
	                            "yilai": {
	                                "type": "array",
	                                "items": {
	                                    "type": "integer"
	                                }
	                            }
	                        }
	                    }
	                }
	            }
	        }
	    }
	};
	
	/*
	    {
	        name: "a",
	        age: 0,
	        location: {
	            city: [{
	                name: 'zhejiang',
	                lage: '1000',
	                isSee: true,
	                yilai: [1, 2, 3]
	            }, {
	                name: 'fujian',
	                lage: '1001',
	                isSee: false,
	                yilai: [4, 5, 6]
	            }],
	        }
	    }
	*/
	
	var jsonSchemaMethods = {
	    stringGet: function stringGet(props, key) {
	        return "<div>string (" + key + ")</div>";
	    },
	    numberGet: function numberGet(props, key) {
	        return "<div>number (" + key + ")</div>";
	    },
	    integerGet: function integerGet(props, key) {
	        return "<div>integer (" + key + ")</div>";
	    },
	    booleanGet: function booleanGet(props, key) {
	        return "<div>boolean (" + key + ")</div>";
	    },
	    objectGet: function objectGet(props, key) {
	        var str = '';
	        limit.each(props, function (val, key) {
	            str += main(val, key);
	        });
	        return "\n            <div>\n                object (" + key + ")\n                " + str + "\n            </div>\n        ";
	    },
	    arrayGet: function arrayGet(props, key) {
	        return "\n            <div>\n                array (" + key + ")\n                " + main(props, '0') + "\n            </div>\n        ";
	    }
	};
	
	var propMethods = {
	    objectGet: function objectGet(jsonSchema) {
	        return jsonSchema.properties;
	    },
	    arrayGet: function arrayGet(jsonSchema) {
	        return jsonSchema.items;
	    }
	};
	
	function main(jsonSchema, key) {
	    var type = jsonSchema.type;
	    var methodName = type + "Get";
	    var jsonSchemaMethod = jsonSchemaMethods[methodName];
	    if (jsonSchemaMethod) {
	        var propMethod = propMethods[methodName];
	        var props = null;
	        if (propMethod) {
	            props = propMethod(jsonSchema);
	        };
	        return jsonSchemaMethod(props, key);
	    };
	};
	
	module.exports = function () {
	    return main(originJsonSchemaData, '请求参数');
	};

/***/ }

/******/ });
//# sourceMappingURL=main.js.map