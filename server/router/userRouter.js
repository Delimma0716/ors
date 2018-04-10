/**
 * 普通用户路由
 */
const express = require('express')
const http = require('http')
const userRouter = express.Router()
const multer = require('multer')
const upload = multer({ dest: 'upload/resume/' })

const db = require('../db')

const data = {}

// 登录
userRouter.post('/login', (req, res) => {
  let account = req.body.account
  let password = req.body.password
  // 查询用户表
  let sql = "select user_password from user where user_account = ?"
  db.query(sql, [account], (err, rows) => {
    if (err) {
      data.retCode = 0
      data.msg = '系统内部错误'
      res.json(data)
      console.log('error:', err)
    } else {
      if (rows.length === 0) {
        data.retCode = -1
        data.msg = '用户名不存在'
        res.json(data)
      } else {
        if (rows[0].user_password === password) {
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
userRouter.post('/register', (req, res) => {
  let account = req.body.account
  let password = req.body.password
  let sql = "select user_password from user where user_account = ?"
  db.query(sql, [account], (err, rows) => {
    if (err) {
      data.retCode = 0
      data.msg = '系统内部错误'
      res.json(data)
      console.log('error:', err)
    } else {
      if (rows.length === 1) {
        data.retCode = -1
        data.msg = '用户名已存在'
        res.json(data)
      } else {
        let sql2 = "insert into user(user_account,user_password) values (?,?)"
        db.query(sql2, [account, password], (err, rows) => {
          if (err) {
            data.retCode = 0
            data.msg = '系统内部错误'
            res.json(data)
            console.log('error:', err)
          } else {
            let data = {}
            data.retCode = 1
            data.msg = '注册成功'
            res.json(data)
          }
        })
      }
    }
  })
})

// 上传简历
userRouter.post('/upload/resume', upload.single('resume'), (req, res) => {
  // 简历在服务器的地址
  let resume = req.file.path
  let account = req.body.account
  let sql = "UPDATE user SET user_resume = ? WHERE user_account = ?"
  db.query(sql, [resume, account], (err, rows) => {
    if (err) {
      data.retCode = 0
      data.msg = '系统内部错误'
      res.json(data)
      console.log('error:', err)
    } else {
      if (rows) {
        data.retCode = 1
        data.msg = '上传成功'
        res.json(data)
      } else {
        data.retCode = -1
        data.msg = '上传失败'
        res.json(data)
      }
    }
  })
})

// 获取所有职位简略信息
userRouter.post('/getalljobs', (req, res) => {
  let sql = "SELECT job.job_id,job.job_name,enterprise.en_name,job.job_salary,job.job_addr FROM job,enterprise WHERE job.en_account = enterprise.en_account"
  db.query(sql, (err, rows) => {
    if (err) {
      data.retCode = 0
      data.msg = '系统内部错误'
      res.json(data)
      console.log('error:', err)
    } else {
      data.retCode = 1
      data.msg = rows
      res.json(data)
    }
  })
})

// 获取职位详细信息
userRouter.post('/getjobdetail', (req, res) => {
  let id = req.body.id
  let sql = "SELECT * FROM job,enterprise WHERE job.en_account = enterprise.en_account AND job.job_id = ?"
  db.query(sql, [id], (err, rows) => {
    if (err) {
      data.retCode = 0
      data.msg = '系统内部错误'
      res.json(data)
      console.log('error:', err)
    } else {
      data.retCode = 1
      data.msg = rows[0]
      res.json(data)
    }
  })
})

// 更新个人信息
userRouter.post('/updateinfo', (req, res) => {
  let account = req.body.account
  let name = req.body.name
  let idCard = req.body.idCard
  let sex = req.body.sex
  let birth = req.body.birth
  let tel = req.body.tel
  let sql = "UPDATE user SET user_name = ?, user_idCard = ?, user_sex = ?, user_birth = ?, user_tel = ? WHERE user_account = ?"
  db.query(sql, [name, idCard, sex, birth, tel, account], (err, rows) => {
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

// 获取个人信息
userRouter.post('/getinfo', (req, res) => {
  let account = req.body.account
  let sql = "SELECT user_name, user_idCard, user_sex, user_birth, user_tel FROM user WHERE user_account = ?"
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

module.exports = userRouter
