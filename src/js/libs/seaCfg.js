;(function($, seajs, location){

    //配置
    seajs.config({
        //基础路径
        base: "/dist/js/",
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
            '$'             : 'common/jQuery',
            '_'             : 'common/underscore1.8',
            //arale Base
            'araleBase'     : "arale/base/1.1.1/base",
            //arale widget
            'araleWidget'   : "arale/widget/1.1.1/widget"
        }
    });

    // 路由 http://localhost:9000/src/html/ang.html => ang
    var REX = /\/html\/(.+)\./;

    // 暴露出增加的方法
    var useList = [],
        arrPro  = Array.prototype,
        concat  = arrPro.concat,
        slice   = arrPro.slice;

    seajs.add = function(){
        return useList = concat.apply( useList, slice.call(arguments) );
    };

    // DOM加载完成
    $(function(){
        var $body = $('body'),
            init = $body.data('init');
        // 如果是线上地址
        ( seajs.online || $body.data('debug') ) && seajs.config({base: "/src/js/"});
        // 自动加载 加载顺序 业务资源是最后加载的
        seajs.use(useList.concat( [typeof init === 'string' ? init : 'bus/'+location.href.match(REX)[1]+'/main'] ), function(){
            $.each(arguments, function(){
                typeof this === 'function' && new this;
            });
        });
    });

})(jQuery, seajs, location);