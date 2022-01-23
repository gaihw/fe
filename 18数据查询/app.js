import express from "express";

import userRouter from './user_router.js'

const app =  express()
//设置允许跨域访问该服务.
app.all('*', function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    //Access-Control-Allow-Headers ,可根据浏览器的F12查看,把对应的粘贴在这里就行
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    res.header('Access-Control-Allow-Methods', '*');
    res.header('Content-Type', 'application/json;charset=utf-8');
    next();
    });
    
app.use('/api',userRouter)

app.listen(8080,() => {
    console.log("server running at http://127.0.0.1")
})