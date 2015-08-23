//配置
require.config({
    //基础路径
    baseUrl: "/src/js/",
    //配置路径
    paths: {
        'class': 'common/class',
        'events': 'common/events',
        'aspect': 'common/aspect',
        'attrs': 'common/attrs',
        'base': 'common/base',
        'widget': 'common/widget',
        'limit': 'common/limit',
        '$': 'libs/jquery',
        'github': 'http://somesayss.github.io/src/js'
    },
    //插件
    shim: {
        $: {
              exports: 'jQuery'
        }
    }

});