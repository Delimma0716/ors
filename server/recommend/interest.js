// 兴趣度记录
const db = require('../db')
let interest = {}

/**
 * 更改兴趣度
 */
interest.update = function (interest) {
  // 浏览时间在5-30s之间
  if (interest.time === 5) {
    let sql = 'SELECT * FROM interest WHERE user_account = ? AND job_id = ?'
    db.query(sql, [interest.user_account, interest.job_id], (err, rows) => {
      if (err) {
        console.log('error:', err)
      } else {
        // 若无记录，新增level=low,views=1
        if (rows.length === 0) {
          let sql2 = 'INSERT INTO interest(user_account,job_id,in_level,in_views) VALUES (?,?,?,?)'
          db.query(sql2, [interest.user_account, interest.job_id, 'low', 1], (err, rows) => {
            if (err) {
              console.log('error:', err)
            }
          })
        } else {
          // 有记录，检查views,views+1,views=2改level=high
          if (rows[0].in_views >= 2) {
            let sql3 = "UPDATE interest SET in_level = 'high' , in_views = in_views + 1 WHERE user_account = ? AND job_id = ?"
            db.query(sql3, [interest.user_account, interest.job_id], (err, rows) => {
              if (err) {
                console.log('error:', err)
              }
            })
          } else {
            let sql4 = 'UPDATE interest SET in_views = in_views + 1 WHERE user_account = ? AND job_id = ?'
            db.query(sql4, [interest.user_account, interest.job_id], (err, rows) => {
              if (err) {
                console.log('error:', err)
              }
            })
          }
        }
      }
    })
  } else {
    // 浏览时间在30s以上
    let sql = 'SELECT * FROM interest WHERE user_account = ? AND job_id = ?'
    db.query(sql, [interest.user_account, interest.job_id], (err, rows) => {
      if (err) {
        console.log('error:', err)
      } else {
        // views+1,检查level,level=low改level=high
        if (rows.in_level === 'low') {
          let sql3 = "UPDATE interest SET in_level = 'high' , in_views = in_views + 1 WHERE user_account = ? AND job_id = ?"
          db.query(sql3, [interest.user_account, interest.job_id], (err, rows) => {
            if (err) {
              console.log('error:', err)
            }
          })
        } else {
          let sql4 = 'UPDATE interest SET in_views = in_views + 1 WHERE user_account = ? AND job_id = ?'
          db.query(sql4, [interest.user_account, interest.job_id], (err, rows) => {
            if (err) {
              console.log('error:', err)
            }
          })
        }
      }
    })
  }
}

/**
 * 投递、收藏时添加兴趣
 */
interest.add = function (interest) {
  // 若已存在且level为low则level变为high，不存在则直接增加
  let sql = 'SELECT in_level FROM interest WHERE user_account = ? AND job_id = ?'
  db.query(sql, [interest.user_account, interest.job_id], (err, rows) => {
    if (err) {
      console.log('error:', err)
    } else {
      if (rows.length === 0) {
        let sql2 = 'INSERT INTO interest(user_account,job_id,in_level) VALUES (?,?,?)'
        db.query(sql2, [interest.user_account, interest.job_id, interest.in_level], (err, rows) => {
          if (err) {
            console.log('error:', err)
          }
        })
      } else {
        if (rows.in_level === 'low') {
          let sql3 = "UPDATE interest SET in_level = 'high' WHERE user_account = ? AND job_id = ?"
          db.query(sql3, [interest.user_account, interest.job_id], (err, rows) => {
            if (err) {
              console.log('error:', err)
            }
          })
        }
      }
    }
  })
}

/**
 * 删除
 */
interest.delete = function (id) {
  let sql = 'DELETE FROM recommend WHERE id1 = ? OR id2 = ?'
  db.query(sql, [id, id], (err, rows) => {
    if (err) {
      console.log('error:', err)
    }
  })
}

module.exports = interest
