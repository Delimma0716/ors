const mysql = require('mysql')
let db = {}

//获取数据库连接
db.connection = function () {
  //数据库配置  
  let connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: '',
    database: 'ors'
  })
  //数据库连接
  connection.connect(function (err) {
    if (err) {
      console.log(err)
      return
    }
  })
  return connection
}

//关闭数据库
db.close = function (connection) {
  //关闭连接
  connection.end(function (err) {
    if (err) {
      return
    } else {
      console.log('关闭连接')
    }
  })
}

//使用异步返回查询结果 0-错误 1-正确
db.query = function (sql, callback) {
  let conn = db.connection()
  conn.query(sql, function (error, results) {
    if (error) {
      // throw error
      callback(0)
      return
    }
    if (results.length === 1) {
      callback(1)
    } else {
      callback(0)
    }
  })
  db.close(conn)
}

module.exports = db
