
// 依赖
import parseJsonSchema from './parseJsonSchema';
import parseHtmlJsonSchema from './parseHtmlJsonSchema';

console.log( parseJsonSchema() );

new JSONEditor(
    document.getElementById('jsoneditor'), {
        mode: 'tree',
        modes: ['code', 'tree'],
        onError: function (err) {
            alert(err.toString());
        },
        onChange(){
            console.log(123);
        }
    }, parseJsonSchema()
);

$('#jsonHtml').html( parseHtmlJsonSchema() );