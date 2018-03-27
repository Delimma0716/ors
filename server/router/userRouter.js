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
  let sql = "select * from user"
  let params = [account]
  db.query(sql, (err, rows, fields) => {
    // res.send(retCode + '')
    console.log( rows)
  })
})

// 注册
userRouter.post('/register', (req, res) => {
  let account = req.body.account
  let password = req.body.password
  let sql = "select * from user"
  db.query(sql, (err, rows, fields) => {
    // res.send(retCode + '')
    if (err) {
      throw err
    } else {
      console.log(rows, fields)
    }
  })
  // 返回 0-错误 1-正确
  // let sql2 = "insert into user(user_account,user_password) values ('" + account + "','" + password + "')"
  // db.query(sql2, function (retCode) {
  //   res.send(retCode + '')
  // })
})

module.exports = userRouter
