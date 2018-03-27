/**
 * 企业路由
 */
const express = require('express')
const http = require('http')
const enterRouter = express.Router()

const db = require('../db')

const data = {}

// 登录
enterRouter.post('/login', (req, res) => {
  let account = req.body.account
  let password = req.body.password
  // 查询用户表
  let sql = "select user_password from user where user_account = ?"
  db.query(sql, [account], (err, rows) => {
    if (err) {
      throw err
    } else {
      if (rows.length === 0) {
        data.retCode = -1
        data.msg = '用户名错误'
      } else {
        if (rows[0].user_password === password) {
          data.retCode = 1
          data.msg = '用户名密码正确'
        } else {
          data.retCode = -1
          data.msg = '密码错误'
        }
      }
    }
    res.json(data)
  })
})

// 注册
userRouter.post('/register', (req, res) => {
  let account = req.body.account
  let password = req.body.password
  let sql = "select user_password from user where user_account = ?"
  db.query(sql, [account], (err, rows) => {
    if (err) {
      throw err
    } else {
      if (rows.length === 1) {
        data.retCode = -1
        data.msg = '用户名已存在'
      } else {
        let sql2 = "insert into user(user_account,user_password) values (?,?)"
        db.query(sql2, [account, password], (err, rows) => {
          if (err) {
            throw err
          } else {
            data.retCode = 1
            data.msg = '注册成功'
          }
        })
      }
    }
    res.json(data)
  })
})

module.exports = enterRouter
