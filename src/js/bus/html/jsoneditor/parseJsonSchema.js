
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
    stringGet(){
        return '';
    },
    numberGet(){
        return 0;
    },
    integerGet(){
        return 0;
    },
    booleanGet(){
        return true;
    },
    objectGet(props){
        return limit.map(props, (val, key) => {
            return main(val);
        });
    },
    arrayGet(items){
        return [main(items)];
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

function main(jsonSchema){
    let type = jsonSchema.type;
    let methodName = `${type}Get`;
    let jsonSchemaMethod = jsonSchemaMethods[methodName];
    if( jsonSchemaMethod ){
        let propMethod = propMethods[methodName];
        let props = null;
        if( propMethod ){
            props = propMethod(jsonSchema);
        }
        return jsonSchemaMethod( props );
    };
};

module.exports = () => {
    return main(originJsonSchemaData);
};






























