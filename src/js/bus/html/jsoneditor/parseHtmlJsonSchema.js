
const originJsonSchemaData = {
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
                                "type": "string",
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


const jsonSchemaMethods = {
    stringGet(props, key){
        return `<div>string (${key})</div>`;
    },
    numberGet(props, key){
        return `<div>number (${key})</div>`;
    },
    integerGet(props, key){
        return `<div>integer (${key})</div>`;
    },
    booleanGet(props, key){
        return `<div>boolean (${key})</div>`;
    },
    objectGet(props, key){
        let str = '';
        limit.each(props, (val, key) => {
            str += main(val, key);
        });
        return `
            <div>
                object (${key})
                ${str}
            </div>
        `;
    },
    arrayGet(props, key){
        return `
            <div>
                array (${key})
                ${main(props, '0')}
            </div>
        `;
    }
};

const propMethods = {
    objectGet(jsonSchema){
        return jsonSchema.properties;
    },
    arrayGet(jsonSchema){
        return jsonSchema.items;
    }
};

function main(jsonSchema, key){
    let type = jsonSchema.type;
    let methodName = `${type}Get`;
    let jsonSchemaMethod = jsonSchemaMethods[methodName];
    if( jsonSchemaMethod ){
        let propMethod = propMethods[methodName];
        let props = null;
        if( propMethod ){
            props = propMethod(jsonSchema);
        };
        return jsonSchemaMethod( props, key );
    };
};

module.exports = () => {
    return main(originJsonSchemaData, '请求参数');
};






























