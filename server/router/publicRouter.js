/**
 * 公共路由
 */
const express = require('express')
const fs = require('fs')
const publicRouter = express.Router()

const db = require('../db')
const recommend = require('../recommend/recommend')

const data = {}

// 下载简历
publicRouter.get('/download/resume/:name', (req, res) => {
  let file = 'upload/resume/' + req.params.name
  res.set({
    'Content-type': 'application/octet-stream',
    'Content-Disposition': 'attachment;filename=' + encodeURI(req.params.name)
  })
  fs.createReadStream(file).pipe(res)
})

// 下载营业执照
publicRouter.get('/download/license/:name', (req, res) => {
  let file = 'upload/license/' + req.params.name
  res.set({
    'Content-type': 'application/octet-stream',
    'Content-Disposition': 'attachment;filename=' + encodeURI(req.params.name)
  })
  fs.createReadStream(file).pipe(res)
})

// 获取所有企业信息
publicRouter.post('/allenterinfo', (req, res) => {
  let sql = 'SELECT * FROM enterprise'
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

/**
 * 更新审核状态
 * 0-未审核
 * 1-通过
 * 2-不通过
 */
publicRouter.post('/updatechecked', (req, res) => {
  let account = req.body.account
  let checked = req.body.checked
  let sql = 'UPDATE enterprise SET en_checked = ? WHERE en_account = ?'
  db.query(sql, [checked, account], (err, rows) => {
    if (err) {
      data.retCode = 0
      data.msg = '系统内部错误'
      res.json(data)
      console.log('error:', err)
    } else {
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

module.exports = publicRouter
