// 职位推荐
const db = require('../db')
let recommend = {}

/**
 * 查询全部不包括自己
 */
recommend.queryAll = function (job) {
  let sql = 'SELECT * FROM job WHERE job_id <> ' + job.job_id
  db.query(sql, (err, rows) => {
    if (err) {
      console.log('error:', err)
    } else {
      recommend.select(rows, job)
    }
  })
}

/**
 * 根据条件筛选
 */
recommend.select = function (rows, job) {
  let selected = []
  rows.forEach(row => {
    // 专业必须相同
    if (row.job_major === job.job_major) {
      // 地点必须相同
      if (row.job_addr === job.job_addr) {
        // 名称暂时不做要求
        selected.push(row)
      }
    }
  })
  recommend.add(selected, job)
}

/**
 * 存储推荐的职位
 */
recommend.add = function (selected, job) {
  selected.forEach(s => {
    let sql = 'INSERT INTO recommend(id1,id2) VALUES (?,?)'
    db.query(sql, [s.job_id, job.job_id], (err, rows) => {
      if (err) {
        console.log('error:', err)
      }
    })
  })
}

/**
 * 删除
 */
recommend.delete = function (id) {
  let sql = 'DELETE FROM recommend WHERE id1 = ? OR id2 = ?'
  db.query(sql, [id, id], (err, rows) => {
    if (err) {
      console.log('error:', err)
    }
  })
}

module.exports = recommend
