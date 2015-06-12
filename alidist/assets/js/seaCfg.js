//配置
seajs.config({
    //基础路径
    base: CONFIG.assetsLink,
    //配置路径
    paths: {
        //支付宝
        arale: 'https://alinw.alipayobjects.com/arale',
        gallery: 'https://alinw.alipayobjects.com/gallery',
        //阿里内外
        alinw: '//alinw.alicdn.com/alinw'
    },
    //别名配置
    alias: {
        //jQuery
        '$': 'common/jQuery',
        //Base
        'base': "arale/base/1.1.1/base",
        //组件
        'widget': "arale/widget/1.1.1/widget",
        //验证
        "validator": "alinw/validator/3.1.3/validator",
        //弹出层
        "dialog": "alinw/dialog/2.0.6/dialog",
        //模板
        "handlebars": "alinw/handlebars/1.3.0/handlebars"
    }
});