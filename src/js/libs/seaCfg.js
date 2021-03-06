;(function($, seajs, location){

    //配置
    seajs.config({
        //基础路径
        // base: "http://localhost:3000/dist/js/",
        //配置路径
        paths: {
            'github'        : 'http://somesayss.github.io/src/js',
            //支付宝
            'arale'         : 'https://a.alipayobjects.com/arale'
        },
        //别名配置
        alias: {
            'class'         : 'common/class',
            'events'        : 'common/events',
            'aspect'        : 'common/aspect',
            'attrs'         : 'common/attrs',
            'base'          : 'common/base',
            'widget'        : 'common/widget',
            'limit'         : 'common/limit',
            'react'         : 'common/react',
            'reactDOM'      : 'common/react-dom',
            'reflux'        : 'common/reflux',
            '$'             : 'common/jQuery',
            '_'             : 'common/underscore1.8',
            //arale Base
            'araleBase'     : "arale/base/1.1.1/base",
            //arale widget
            'araleWidget'   : "arale/widget/1.1.1/widget"
        }
    });

    // 路由 http://localhost:9000/src/html/ang.html => ang
    var REX = /((?:http|https):\/\/[^\/]*)(.+?)\./;

    var useList = [],
        arrPro  = Array.prototype,
        concat  = arrPro.concat,
        slice   = arrPro.slice;
    // 暴露出增加的方法
    seajs.add = function(){
        return useList = concat.apply( useList, slice.call(arguments) );
    };

    // 设置入口
    function setBaseUrl(){
        var scripts = document.getElementsByTagName('script');
        var lastScript = scripts[scripts.length - 1];
        var src = lastScript.src;
        var base = '';
        if( REX.test(src) ){
            base = RegExp.$1;
        };
        seajs.config({base: base + '/dist/js/'});
    };

    setBaseUrl();

    // DOM加载完成
    $(function(){
        var $body = $('body'),
            init = seajs.init || $body.data('init'),
            widgetMap = [],
            widgetArr = [];
        // 遍历节点
        $('[widget]').each(function(){
            var self = $(this);
            widgetMap[ widgetArr.push( self.attr('widget') ) - 1 ] = self;
        });
        // 
        // 自动加载 加载顺序 业务资源是最后加载
        // 顺序: 
        // 1. widget="x";
        // 2. sea.add('x');
        // 3. sea.init('x');
        useList = widgetArr.concat(useList);
        init !== false && useList.push( typeof init === 'string' ? init : 'bus'+location.href.match(REX)[2]+'/main' );
        seajs.use(useList, function(){
            $.each(arguments, function(i){
                var element = widgetMap[i],
                    config = {};
                element && (config[ element.attr('widget-trigger') === undefined ? 'element' : 'trigger'] = element); 
                typeof this === 'function' && new this(config);
            });
        });
    });

})(jQuery, seajs, location);