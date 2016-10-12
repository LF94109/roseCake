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

    $('.cartButton').hover(function(){
        $('.cartList').css('display','block')
    },function(){
        $('.cartList').css('display','none')
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
            $urlRouterProvider.otherwise(function($injector,$location){
                return $location.search().url || '/';
            })
            $stateProvider
                //首页
                .state('home',{
                    url:'/',
                    templateUrl:'tpl/home.html',
                    controller:function($scope){
                        //图片hover效果
                        $('.colspan2').each(function(index){
                            $('.colspan2').hover(function(){
                                $(this).eq(index).find('.modlefile').stop().animate(1000,
                                    function(){
                                        $(this).css({'bottom':0,display:'block'})
                                })
                            },function(){
                                $(this).eq(index).find('.modlefile').stop().animate(1000,function(){
                                    $(this).css({'bottom':'-28px',display:'none'})
                                })
                            })
                        })
                        //轮播图
                        //轮播的初始化
                        //自动循环的开始
                        var pic_start = 0;
                        //自动执行
                        var timer = setInterval(auto,1000);
                        function auto(){
                            if(pic_start >= 1){
                                pic_start = 0;
                                $('.billboardImgInner').css('display','block').siblings().css('display','none')
                            }else{
                                $('.billboardImgInner').css('display','none').siblings().css('display','block')
                                pic_start++;
                            }
                        }
                        $('.billboard').hover(function() {
                            //鼠标点击之后，去除自动播放
                            clearInterval(timer);
                        },function(){
                            pic_start = $(this).index() + 1
                            timer = setInterval(auto,1000)
                        })
                        //手动播放
                        var index = 0;
                        function getIndexNext(){
                            return index>=$(".billboard>a").length-1?0:index+1;
                        };
                        function getIndexPrev(){
                            return index<=0?$(".billboard>a").length-1:index-1;
                        };
                        function showSliderImg(){
                            $(".lunbo>a").eq(index).css('display','block').siblings().css('display','none');
                        };
                        var showNextImg = function(){
                            index = getIndexNext();
                            showSliderImg();
                        };
                        var showPrevImg = function(){
                            index = getIndexPrev();
                            showSliderImg();
                        };
                        $('.icon_left').click(function(){
                            showPrevImg();
                        });
                        $('.icon_right').click(function(){
                            showNextImg();
                        });

                    }
                })

                //rose主推
                .state('rose',{
                    url:'/rose',
                    templateUrl:'tpl/rose.html',
                    controller:function($scope){
                        //图片hover效果
                        $('.colspan3').each(function(index){
                            $('.colspan3').hover(function(){
                                $(this).eq(index).find('.serchImg').css({display:'block'})
                            },function(){
                                $(this).eq(index).find('.serchImg').css({display:'none'})
                            })
                        })
                    }
                })

                //咖啡/饮品
                .state('caffe',{
                    url:'/caffe',
                    templateUrl:"tpl/caffe.html",
                    controller:function($scope){
                        //图片hover效果
                        $('.colspan3').each(function(index){
                            $('.colspan3').hover(function(){
                                $(this).eq(index).find('.serchImg').css({display:'block'})
                            },function(){
                                $(this).eq(index).find('.serchImg').css({display:'none'})
                            })
                        })
                    }
                })

                //糕点点心
                .state('cake',{
                    url:'/cake',
                    templateUrl:"tpl/cake.html",
                    controller:function($scope){
                        //图片hover效果
                        $('.colspan3').each(function(index){
                            $('.colspan3').hover(function(){
                                $(this).eq(index).find('.serchImg').css({display:'block'})
                            },function(){
                                $(this).eq(index).find('.serchImg').css({display:'none'})
                            })
                        })
                    }
                })

                //手工烘焙
                .state('handMade',{
                    url:'/handMade',
                    templateUrl:"tpl/handMade.html",
                    controller:function($scope){
                        //图片hover效果
                        $('.colspan3').each(function(index){
                            $('.colspan3').hover(function(){
                                $(this).eq(index).find('.serchImg').css({display:'block'})
                            },function(){
                                $(this).eq(index).find('.serchImg').css({display:'none'})
                            })
                        })
                    }
                })

                //会员登录
                .state('vip',{
                    url:'/vip',
                    templateUrl:"tpl/vip.html",
                    controller:function($scope){}
                })

        }])
    angular.bootstrap(document,['zlf'])


})