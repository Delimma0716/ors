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
  let sql = "select * from user where user_account = ? and user_password = ?"
  let params = [account,password]
  db.query(sql, params, function (err,rows, fields) {
    // res.send(retCode + '')
    console.log(err,rows, fields)
  })
})

// 注册
userRouter.post('/register', (req, res) => {
  let account = req.body.account
  let password = req.body.password
  let sql = "select * from user"
  db.query(sql, function (err,result) {
    // res.send(retCode + '')
    console.log(err,result)
  })
  // 返回 0-错误 1-正确
  let sql2 = "insert into user(user_account,user_password) values ('" + account + "','" + password + "')"
  db.query(sql2, function (retCode) {
    res.send(retCode + '')
  })
})

module.exports = userRouter
