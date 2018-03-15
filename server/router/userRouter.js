/**
 * 普通用户路由
 */
const express = require('express')
const http = require('http')
const userRouter = express.Router()

// 登录
userRouter.post('/login', (req, res) => {
  res.send('success')
})

// 注册
userRouter.post('/register', (req, res) => {

})

module.exports = userRouter
