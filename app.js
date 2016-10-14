/**
 * Created by Administrator on 2016/10/13.
 */
const express = require('express'),
      mongoose = require('mongoose'),
      multer = require('multer')
      app = express()
      forms = multer()
app.use(express.static('static'))
mongoose.connect('mongodb://localhost/cake')
var db = mongoose.connection
var Cake = mongoose.model('cake',{
    userName:String,
    psw:String
})

db.on('error',function(err){
    console.error('mongo启动失败',err)
})

db.on('open',function(err){
    if(err){
        console.error('mongo打开失败',err)
    }else{
        console.log('mongo服务器打开成功')
    }
})

//注册逻辑
app.post('/user/register',forms.array(),function(requset,response){
    var body = requset.body
    var username = body.userName
    var cake = new Cake(body)
    Cake.find({userName:username}).exec(function(err,data){
        if(err){
            console.log('获取数据失败')
        }else if(data.length){
            response.status(200).json({result:0,msg:'该用户名已存在'})
        }else{
            cake.save(cake,function(err){
                if(err){
                    console.log('保存数据出错了')
                    response.status(500).json({result:0,msg:'注册失败'})
                }else{
                    console.log('数据保存成功')
                    response.status(200).json({result:1,msg:'注册成功'})
                }
            })
        }
    })

})

//登录逻辑
app.post('/user/login',forms.array(),function(requset,response){
    var username = requset.body.userName
    var psw = requset.body.psw
    Cake.find({userName:username}).exec(function(err,data){
        if(err){
            console.log('服务器出错了')
        }else if(data.length){
            console.log(data)
            if(psw == data[0].psw){
                response.status(200).json({success:1,msg:'恭喜您登陆成功',userName:username})
            }else{
                response.status(200).json({success:0,msg:'密码错误'})
            }
        }else{
            response.status(200).json({result:0,msg:'该用户不存在'})
        }
    })
})

//监听服务器
app.listen(3000,function(){
    console.log('AppServer is running.....')
})