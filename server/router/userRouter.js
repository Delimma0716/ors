/**
 * 普通用户路由
 */
const express = require('express')
const http = require('http')
const userRouter = express.Router()

const db = require('../db')

// 登录
userRouter.post('/login', (req, res) => {
  let account = req.body.account
  let password = req.body.password
  // 查询用户表 返回 0-错误 1-正确
  let sql = "select * from user where user_account = '" + account + "' and user_password = '" + password + "'"
  db.query(sql, function (retCode) {
    res.send(retCode + '')
  })
})

// 注册
userRouter.post('/register', (req, res) => {

})

module.exports = userRouter
