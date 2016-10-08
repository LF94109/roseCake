/**
 * Created by Administrator on 2016/10/8.
 */
var express = require('express')
var app = express()
app.use(express.static('static'))
app.listen(3000,function(){
    console.log('服务器已经开启了.....')
})