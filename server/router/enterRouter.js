/**
 * 企业路由
 */
const express = require('express')
const enterRouter = express.Router()
const multer = require('multer')

const db = require('../db')
const recommend = require('../recommend/recommend')

const data = {}

// multer配置
const storage = multer.diskStorage({
  // 设置上传后文件路径
  destination: function (req, file, cb) {
    cb(null, 'upload/license/')
  },
  // 给上传文件重命名
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname)
  }
})
const upload = multer({
  storage: storage
})

// 登录
enterRouter.post('/login', (req, res) => {
  let account = req.body.account
  let password = req.body.password
  // 查询用户表
  let sql = 'select en_password from enterprise where en_account = ?'
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
  let sql = 'select en_password from enterprise where en_account = ?'
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
        let sql2 = 'insert into enterprise(en_account,en_password) values (?,?)'
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
  let sql = 'UPDATE enterprise SET en_name = ?, en_desc = ?, en_addr = ?, en_tel = ? WHERE en_account = ?'
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
  let sql = 'SELECT en_name,en_desc,en_addr,en_tel FROM enterprise WHERE en_account = ?'
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
    req.body.major,
    req.body.addr,
    req.body.salary,
    req.body.exp,
    req.body.edu,
    req.body.time,
    req.body.info
  ]
  let sql = 'INSERT INTO job(en_account,job_name,job_major,job_addr,job_salary,job_exp,job_edu,job_time,job_info)VALUES(?,?,?,?,?,?,?,?,?)'
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
    // 更新推荐表，加入新推荐
    let job = {
      job_id: rows.insertId,
      job_name: req.body.name,
      job_addr: req.body.addr,
      job_salary: req.body.salary,
      job_exp: req.body.exp,
      job_edu: req.body.edu,
      job_time: req.body.time,
      job_info: req.body.info,
      job_major: req.body.major
    }
    recommend.queryAll(job)
  })
})

// 获取所有投递
enterRouter.post('/getalldelivers', (req, res) => {
  let account = req.body.account
  let sql = 'SELECT * FROM (deliver INNER JOIN user ON deliver.user_account = user.user_account) INNER JOIN job ON deliver.job_id = job.job_id WHERE deliver.en_account = ?'
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

/**
 * 更新投递状态
 * 0-未查看
 * 1-已查看
 * 2-感兴趣
 * 3-不合适
 */
enterRouter.post('/updatestatus', (req, res) => {
  let id = req.body.id
  let status = req.body.status
  let sql = 'UPDATE deliver SET de_status = ? WHERE de_id = ?'
  db.query(sql, [status, id], (err, rows) => {
    if (err) {
      data.retCode = 0
      data.msg = '系统内部错误'
      res.json(data)
      console.log('error:', err)
    } else {
      console.log(rows)
      if (rows) {
        data.retCode = 1
        data.msg = '更改成功'
        res.json(data)
      } else {
        data.retCode = -1
        data.msg = '更改失败'
        res.json(data)
      }
    }
  })
})

// 获取所有职位
enterRouter.post('/getjobs', (req, res) => {
  let account = req.body.account
  let sql = 'SELECT * FROM job WHERE en_account = ?'
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

// 删除职位
enterRouter.post('/deletejob', (req, res) => {
  let id = req.body.id
  let sql = 'DELETE FROM job WHERE job_id = ?'
  db.query(sql, [id], (err, rows) => {
    if (err) {
      data.retCode = 0
      data.msg = '系统内部错误'
      res.json(data)
      console.log('error:', err)
    } else {
      console.log(rows)
      if (rows) {
        data.retCode = 1
        data.msg = '删除成功'
        res.json(data)
      } else {
        data.retCode = -1
        data.msg = '删除失败'
        res.json(data)
      }
      // 更新推荐表，删除推荐
      recommend.delete(id)
    }
  })
})

// 更新职位信息
enterRouter.post('/updatejob', (req, res) => {
  let id = req.body.id
  let name = req.body.name
  let major = req.body.major
  let salary = req.body.salary
  let addr = req.body.addr
  let exp = req.body.exp
  let edu = req.body.edu
  let time = req.body.time
  let info = req.body.info
  let sql = 'UPDATE job SET job_name = ? , job_major = ? ,job_addr = ? , job_salary = ? , job_exp = ? , job_edu = ? , job_time = ? , job_info = ? WHERE job_id = ?'
  db.query(sql, [name, major, addr, salary, exp, edu, time, info, id], (err, rows) => {
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
      // 更新推荐表，先删除，后添加
      recommend.delete(id)
      let job = {
        job_id: req.body.id,
        job_name: req.body.name,
        job_addr: req.body.addr,
        job_salary: req.body.salary,
        job_exp: req.body.exp,
        job_edu: req.body.edu,
        job_time: req.body.time,
        job_info: req.body.info,
        job_major: req.body.major
      }
      recommend.queryAll(job)
    }
  })
})

// 检查是否上传过营业执照
enterRouter.post('/checklicense', (req, res) => {
  let account = req.body.account
  let sql = 'SELECT en_license FROM enterprise WHERE en_account = ?'
  db.query(sql, [account], (err, rows) => {
    if (err) {
      data.retCode = 0
      data.msg = '系统内部错误'
      res.json(data)
      console.log('error:', err)
    } else {
      data.retCode = 1
      data.msg = {
        hasLicense: rows[0].en_license !== null,
        license: rows[0].en_license
      }
      res.json(data)
    }
  })
})

// 上传简营业执照
enterRouter.post('/upload/license', upload.single('license'), (req, res) => {
  // 简历在服务器的地址
  let license = req.file.path
  let account = req.body.account
  let sql = 'UPDATE enterprise SET en_license = ? WHERE en_account = ?'
  db.query(sql, [license, account], (err, rows) => {
    if (err) {
      data.retCode = 0
      data.msg = '系统内部错误'
      res.json(data)
      console.log('error:', err)
    } else {
      if (rows) {
        // 更新审核状态为未审核
        let sql2 = 'UPDATE enterprise SET en_checked = 0 WHERE en_account = ?'
        db.query(sql2, [account], (err, rows) => {
          if (err) {
            data.retCode = 0
            data.msg = '系统内部错误'
            res.json(data)
            console.log('error:', err)
          } else {
            data.retCode = 1
            data.msg = '上传成功'
            res.json(data)
          }
        })
      } else {
        data.retCode = -1
        data.msg = '上传失败'
        res.json(data)
      }
    }
  })
})

// 检查审核状态
enterRouter.post('/checked', (req, res) => {
  let account = req.body.account
  let sql = 'SELECT en_checked FROM enterprise WHERE en_account = ?'
  db.query(sql, [account], (err, rows) => {
    if (err) {
      data.retCode = 0
      data.msg = '系统内部错误'
      res.json(data)
      console.log('error:', err)
    } else {
      data.retCode = 1
      data.msg = rows[0].en_checked
      res.json(data)
    }
  })
})

module.exports = enterRouter
