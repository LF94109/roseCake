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
})