/**
 * 公共路由
 */
const express = require('express')
const http = require('http')
const fs = require('fs')
const publicRouter = express.Router()

const db = require('../db')

const data = {}

// 下载简历
publicRouter.get('/download/resume/:name', (req, res) => {
  let file = 'upload/resume/' + req.params.name
  res.set({
    "Content-type": "application/octet-stream",
    "Content-Disposition": "attachment;filename=" + encodeURI(req.params.name)
  })
  fs.createReadStream(file).pipe(res)
})

// 下载营业执照
publicRouter.get('/download/license/:name', (req, res) => {
  let file = 'upload/license/' + req.params.name
  res.set({
    "Content-type": "application/octet-stream",
    "Content-Disposition": "attachment;filename=" + encodeURI(req.params.name)
  })
  fs.createReadStream(file).pipe(res)
})

// 获取所有企业信息
publicRouter.post('/allenterinfo', (req, res) => {
  let sql = "SELECT * FROM enterprise"
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

module.exports = publicRouter