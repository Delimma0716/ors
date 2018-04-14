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

module.exports = publicRouter