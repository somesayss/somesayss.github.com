//配置
seajs.config({
    //基础路径
    base: "/src/js/",
    //配置路径
    paths: {
        'github': 'http://somesayss.github.io/src/js',
        //支付宝
        'arale': 'https://a.alipayobjects.com/arale'
    },
    //别名配置
    alias: {
        'class': 'common/class',
        'events': 'common/events',
        'aspect': 'common/aspect',
        'attrs': 'common/attrs',
        'base': 'common/base',
        'widget': 'common/widget',
        'util': 'common/util',
        '$': 'common/jQuery',
        '_': 'common/underscore',
        //arale Base
        'araleBase': "arale/base/1.1.1/base",
        //arale widget
        'araleWidget': "arale/widget/1.1.1/widget"
    }
});