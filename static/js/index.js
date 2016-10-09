/**
 * Created by Administrator on 2016/10/8.
 */
$(function(){
    $('header li').click(function(){
        $(this).addClass('active').siblings().removeClass('active')
    })
    $('header li').hover(function(){
        $(this).addClass('bgColor')
    },function(){
        $(this).removeClass('bgColor')
    })

    //轮播图
    setInterval(function(){
        $('.billboardImgInner').css({
            'z-index':0,
            'display':'none'
        })
        $('.billboardTileInner').css({
            'z-index':1,
            'display':'block'
        })
    },1500)

    $('.colspan2').hover(function(){
        console.log('1')
        $('.colspan2 .modlefile').animate({
            display:'block',
            bottom:0
        },500)
    })

    //添加angular路由系统
    //DOM加载完之后
    //创建一个模块，然后将ui.router这个模块引入到我们的模块中
    //这样就意味着，我们可以使用ui.router这个模块了
    //数组参数使我们当前使用的模块所要依赖的模块列表
    var app = angular.module('zlf',['ui.router'])

    //通过config我们来设置路由
    app.config(['$stateProvider','$urlRouterProvider',
        function ($stateProvider,$urlRouterProvider) {
            //这里，我就可以使用ui.router模块里边的关于设置路由的两个服务了。
            //$stateProvider是设置路由的，$urlRouterProvider是设置默认访问地址的

            //设置一下默认状态
            $urlRouterProvider.otherwise('/')
            $stateProvider
                .state('home',{

                    url:'/',
                    templateUrl:'tpl/home.html'
                })
                .state('rose',{
                    url:'/rose',
                    templateUrl:'tpl/rose.html'
                })
                .state('caffe',{
                    url:'/caffe',
                    templateUrl:"tpl/caffe.html"
                })
                .state('cake',{
                    url:'/cake',
                    templateUrl:"tpl/cake.html"
                })
                .state('handMade',{
                    url:'/handMade',
                    templateUrl:"tpl/handMade.html"
                })
                .state('vip',{
                    url:'/vip',
                    templateUrl:"tpl/vip.html"
                })

        }])
    angular.bootstrap(document,['zlf'])


})