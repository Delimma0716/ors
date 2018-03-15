const express = require('express')
const app = express()

const userRouter = require('./router/userRouter')

// 中间件
app.use((req, res, next) => {
  // 解决ajax跨域问题
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild')
  res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS')
  next()
})

// 普通用户路由
app.use('/user', userRouter)

const server = app.listen(3000, function () {
  const host = server.address().address
  const port = server.address().port

  console.log('ors-server listening at http://%s:%s', host, port)
})