const express = require('express')
const app = express()

const userRouter = require('./router/userRouter')
const enterRouter = require('./router/enterRouter')

const bodyParser = require('body-parser');
// const multer = require('multer');

// for parsing application/json
app.use(bodyParser.json())
// for parsing application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))
// for parsing multipart/form-data
// app.use(multer()) 

// 中间件
app.use((req, res, next) => {
  // 解决ajax跨域问题
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild')
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE')
  res.header('Access-Control-Allow-Credentials', true)  
  next()
})

// 普通用户路由
app.use('/user', userRouter)
// 企业路由
app.use('/enter', enterRouter)

const server = app.listen(3000, function () {
  const host = server.address().address
  const port = server.address().port

  console.log('ors-server listening at http://%s:%s', host, port)
})