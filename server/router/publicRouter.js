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
publicRouter.get('/download/resume/:path', (req, res) => {
  let file = 'upload/resume/' + req.params.path
  let form = fs.readFileSync('upload/resume/aa9d6f2c3881b5147e9e500bb354f04c', { encoding: 'utf8' })
  res.set({
    "Content-type": "application/octet-stream",
    "Content-Disposition": "attachment;filename=" + encodeURI('aa9d6f2c3881b5147e9e500bb354f04c')
  })
  fs.createReadStream(file).pipe(res)
})

module.exports = publicRouter