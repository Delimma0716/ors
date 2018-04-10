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
  let sql = "select en_password from enterprise where en_account = ?"
  db.query(sql, [account], (err, rows) => {
    if (err) {
      data.retCode = 0
      data.msg = '系统内部错误'
      res.json(data)
      console.log('error:', err)
    } else {
      if (rows.length === 0) {
        data.retCode = -1
        data.msg = '企业号不存在'
        res.json(data)
      } else {
        if (rows[0].en_password === password) {
          data.retCode = 1
          data.msg = '登录成功'
          res.json(data)
        } else {
          data.retCode = -1
          data.msg = '密码错误'
          res.json(data)
        }
      }
    }
  })
})

// 注册
enterRouter.post('/register', (req, res) => {
  let account = req.body.account
  let password = req.body.password
  let sql = "select en_password from enterprise where en_account = ?"
  db.query(sql, [account], (err, rows) => {
    if (err) {
      data.retCode = 0
      data.msg = '系统内部错误'
      res.json(data)
      console.log('error:', err)
    } else {
      console.log(rows)
      if (rows.length === 1) {
        data.retCode = -1
        data.msg = '企业号已存在'
        res.json(data)
      } else {
        let sql2 = "insert into enterprise(en_account,en_password) values (?,?)"
        db.query(sql2, [account, password], (err, rows) => {
          if (err) {
            data.retCode = 0
            data.msg = '系统内部错误'
            res.json(data)
            console.log('error:', err)
          } else {
            data.retCode = 1
            data.msg = '注册成功'
            res.json(data)
          }
        })
      }
    }
  })
})

// 更新企业信息
enterRouter.post('/updateinfo', (req, res) => {
  let account = req.body.account
  let name = req.body.name
  let desc = req.body.desc
  let addr = req.body.addr
  let tel = req.body.tel
  let sql = "UPDATE enterprise SET en_name = ?, en_desc = ?, en_addr = ?, en_tel = ? WHERE en_account = ?"
  db.query(sql, [name, desc, addr, tel, account], (err, rows) => {
    if (err) {
      data.retCode = 0
      data.msg = '系统内部错误'
      res.json(data)
      console.log('error:', err)
    } else {
      console.log(rows)
      if (rows) {
        data.retCode = 1
        data.msg = '保存成功'
        res.json(data)
      } else {
        data.retCode = -1
        data.msg = '保存失败'
        res.json(data)
      }
    }
  })
})

// 获取企业信息
enterRouter.post('/getinfo', (req, res) => {
  let account = req.body.account
  let sql = "SELECT en_name,en_desc,en_addr,en_tel FROM enterprise WHERE en_account = ?"
  db.query(sql, [account], (err, rows) => {
    if (err) {
      data.retCode = 0
      data.msg = '系统内部错误'
      res.json(data)
      console.log('error:', err)
    } else {
      if (rows.length === 1) {
        data.retCode = 1
        data.msg = rows[0]
        res.json(data)
      } else {
        data.retCode = 0
        data.msg = '系统内部错误'
        res.json(data)
      }
    }
  })
})

// 发布职位
enterRouter.post('/postjob', (req, res) => {
  let params = [
    req.body.account,
    req.body.name,
    req.body.addr,
    req.body.salary,
    req.body.exp,
    req.body.edu,
    req.body.time,
    req.body.info
  ]
  let sql = "INSERT INTO job(en_account,job_name,job_addr,job_salary,job_exp,job_edu,job_time,job_info)VALUES(?,?,?,?,?,?,?,?)"
  db.query(sql, params, (err, rows) => {
    if (err) {
      data.retCode = 0
      data.msg = '系统内部错误'
      res.json(data)
      console.log('error:', err)
    } else {
      if (rows) {
        data.retCode = 1
        data.msg = '发布成功'
        res.json(data)
      } else {
        data.retCode = -1
        data.msg = '发布失败'
        res.json(data)
      }
    }
  })
})

module.exports = enterRouter
