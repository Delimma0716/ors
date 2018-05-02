/**
 * 普通用户路由
 */
const express = require('express')
const http = require('http')
const userRouter = express.Router()
const multer = require('multer')

const db = require('../db')

const data = {}

// multer配置
const storage = multer.diskStorage({
  //设置上传后文件路径
  destination: function (req, file, cb) {
    cb(null, 'upload/resume/')
  },
  //给上传文件重命名
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname)
  }
})
const upload = multer({ storage: storage })

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

// 获取所有职位信息
userRouter.post('/getalljobs', (req, res) => {
  let nameValue = req.body.nameValue
  let majorValue = req.body.majorValue
  let salaryValue = req.body.salaryValue
  let addrValue = req.body.addrValue
  let expValue = req.body.expValue
  let eduValue = req.body.eduValue
  let timeValue = req.body.timeValue
  let sql = "SELECT * FROM job,enterprise"
  // 拼接条件
  let sqlWhere = ' WHERE job.en_account = enterprise.en_account'
  if (nameValue !== '') {
    sqlWhere += " AND job.job_name LIKE '%" + nameValue + "%'"
  }
  if (majorValue !== '') {
    sqlWhere += " AND job.job_major LIKE '%" + majorValue + "%'"
  }
  if (salaryValue !== '') {
    switch (salaryValue) {
      case '1-5k':
        sqlWhere += ' AND job.job_salary <= 5'
        break;
      case '5-10k':
        sqlWhere += ' AND job.job_salary BETWEEN 5 AND 10'
        break;
      case '10-20k':
        sqlWhere += ' AND job.job_salary BETWEEN 10 AND 20'
        break;
      case '20k以上':
        sqlWhere += ' AND job.job_salary >= 20'
        break;
    }
  }
  if (addrValue !== '') {
    sqlWhere += " AND job.job_addr LIKE '%" + addrValue + "%'"
  }
  if (expValue !== '') {
    sqlWhere += " AND job.job_exp = '" + expValue + "'"
  }
  if (eduValue !== '') {
    sqlWhere += " AND job.job_edu = '" + eduValue + "'"
  }
  if (timeValue !== '') {
    sqlWhere += " AND job.job_time = '" + timeValue + "'"
  }
  sql += sqlWhere
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

// 获取某个职位信息
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

// 检查是否投递过
userRouter.post('/checksend', (req, res) => {
  let account = req.body.account
  let id = req.body.id
  let sql = "SELECT de_id FROM deliver WHERE user_account = ? AND job_id = ?"
  db.query(sql, [account, id], (err, rows) => {
    if (err) {
      data.retCode = 0
      data.msg = '系统内部错误'
      res.json(data)
      console.log('error:', err)
    } else {
      data.retCode = 1
      data.msg = rows.length > 0 ? true : false
      res.json(data)
    }
  })
})

// 投递
userRouter.post('/sendresume', (req, res) => {
  let uaccount = req.body.uaccount
  let eaccount = req.body.eaccount
  let id = req.body.id
  let status = req.body.status
  let sql = "insert into deliver(user_account,en_account,job_id,de_status) values (?,?,?,?)"
  db.query(sql, [uaccount, eaccount, id, status], (err, rows) => {
    if (err) {
      data.retCode = 0
      data.msg = '系统内部错误'
      res.json(data)
      console.log('error:', err)
    } else {
      let data = {}
      data.retCode = 1
      data.msg = '投递成功'
      res.json(data)
    }
  })
})

// 获取所有投递
userRouter.post('/getalldelivers', (req, res) => {
  let account = req.body.account
  let sql = "SELECT job.job_name,enterprise.en_name,deliver.de_status FROM (job INNER JOIN enterprise ON job.en_account = enterprise.en_account) INNER JOIN deliver ON job.job_id = deliver.job_id WHERE user_account = ?"
  db.query(sql, [account], (err, rows) => {
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

// 检查是否上传过简历
userRouter.post('/checkresume', (req, res) => {
  let account = req.body.account
  let sql = "SELECT user_resume FROM user WHERE user_account = ?"
  db.query(sql, [account], (err, rows) => {
    if (err) {
      data.retCode = 0
      data.msg = '系统内部错误'
      res.json(data)
      console.log('error:', err)
    } else {
      data.retCode = 1
      data.msg = {
        hasResume: rows[0].user_resume !== null,
        resume: rows[0].user_resume
      }
      res.json(data)
    }
  })
})

// 收藏职位
userRouter.post('/collect', (req, res) => {
  let account = req.body.account
  let id = req.body.id
  let sql = "insert into collection(user_account,job_id) values (?,?)"
  db.query(sql, [account, id], (err, rows) => {
    if (err) {
      data.retCode = 0
      data.msg = '系统内部错误'
      res.json(data)
      console.log('error:', err)
    } else {
      let data = {}
      data.retCode = 1
      data.msg = '收藏成功'
      res.json(data)
    }
  })
})

// 检查是否收藏过
userRouter.post('/checkcollect', (req, res) => {
  let account = req.body.account
  let id = req.body.id
  let sql = "SELECT co_id FROM collection WHERE user_account = ? AND job_id = ?"
  db.query(sql, [account, id], (err, rows) => {
    if (err) {
      data.retCode = 0
      data.msg = '系统内部错误'
      res.json(data)
      console.log('error:', err)
    } else {
      data.retCode = 1
      data.msg = rows.length
      res.json(data)
    }
  })
})

// 获取所有收藏
userRouter.post('/getcollect', (req, res) => {
  let account = req.body.account
  let sql = "SELECT * FROM (collection INNER JOIN job ON collection.job_id = job.job_id)INNER JOIN enterprise ON job.en_account = enterprise.en_account WHERE user_account = ?"
  db.query(sql, [account], (err, rows) => {
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

module.exports = userRouter
