/**
 * Created by Administrator on 2016/10/8.
 */
var express = require('express')
var bodyParser = require('body-parser')
var multer = require('multer')
var fs = require('fs')
var app = express()
var forms = multer()
app.use(express.static('static'))
app.use(bodyParser.urlencoded({extended:true}))
//处理注册的请求
app.post('/user/register',forms.array(),function(request,response){
    var requestBody = request.body
    var userName = requestBody.userName
    var psw = requestBody.psw
    console.log(response)
    var registerMsg = {userName,psw}
    fs.exists('register',function(isExists){
        if(!isExists){
            fs.mkdirSync('register')
        }else{
            var isUser = 0
            var data = fs.readFileSync('register/msg.txt','utf-8')
            var result = '[' + data
                result = result.substr(0,result.length-1)
                result = result + ']'
            console.log('+=+=+=+=+=')
            var jsonObj = JSON.parse(result)
            console.log('-------')
            for(var i = 0; i < jsonObj.length;i++){
                var aUser = jsonObj[i]
                isUser = aUser.userName == userName ? true : false
                if(isUser){
                    break
                }
            }
            if(isUser){
                response.status(200).json({succuss:0,resultMsg:'该用户已存在'})
                return
            }
        }
        fs.appendFile('register/msg.txt',JSON.stringfy(registerMsg) + ',',function(err){
            if(err){
                response.status(500).json({succuss:0,resultMsg:'服务器异常，注册失败'})
            }else{
                response.status(200).json({succuss:1,resultMag:'注册成功'})
            }
        })
    })
})

//处理登录的请求
app.post('/user/login',forms.array(),function(request,response){
    var requestBody = request.body
    var userName = requestBody.userName
    var psw = requestBody.psw
    fs.exists('register/msg.txt',function(isExists){
        if(isExists){
            //读取保存的注册信息
            fs.readFile('register/msg.txt',function(err,data){
                //把保存数据转化为json数组
                var result = '[' + data
                    result = result.substr(0,result.length - 1)
                    result = result + ']'
                //把保存的注册信息数据（json字符串），转化为json对象
                console.log('=======')
                var jsonObj = JSON.parse(result)
                console.log('++++++')
                var isUser = 0;
                var getPsw = 0
                //遍历所有用户信息，找到一个和请求的用户名一样的信息，假如找到就代表该用户之前已经注册，否则就代表用户还未注册
                for(var i = 0; i < jsonObj.length;i++){
                    console.log(jsonObj[i])
                    var aUser =  jsonObj[i]
                    isUser = aUser.userName == userName ? true : false
                    //找到该用户信息之后，取出该用户注册密码信息，用于后边判断密码是否正确。同时跳出循环，结束查找。
                    if(isUser){
                        getPsw = aUser.psw
                        break
                    }
                }
                //判断用户是否存在
                if(!isUser){
                    response.status(200).json({success:0,resultMsg:'用户名不存在'})
                }
                else{
                    //判断密码是否正确
                    if(getPsw == psw){
                        response.status(200).json({success:1,resultMsg:'登录成功'})
                    } else{
                        response.status(200).json({success:0,resultMsg:'密码错误'})
                    }
                }
            })
        }
        else{
            response.status(200).json({success:0,resultMsg:'该用户不存在'})
        }
    })
})

//监听服务器
app.listen(3000,function(){
    console.log('server is running.....')
})