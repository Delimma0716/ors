// 相似职位及推荐
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

/**
 * 推荐感兴趣职位
 */
recommend.getRecommendJobs = function (account) {
  return new Promise((resolve, reject) => {
    let recList = []
    // 根据views排序
    let sql = 'SELECT * FROM interest WHERE user_account = ? ORDER BY in_views DESC'
    let highJobs = []
    let lowJobs = []
    db.query(sql, [account], (err, rows) => {
      if (err) {
        console.log('error:', err)
        reject(error)
      } else {
        rows.forEach(row => {
          if (row.in_level === 'high') {
            highJobs.push(row)
          } else {
            lowJobs.push(row)
          }
        })
        // 若level=high的超过十个，则不考虑level=low
        if (highJobs.length >= 10) {
          recList = highJobs
        } else {
          recList = [...highJobs, ...lowJobs]
        }
        // 寻找相似职位
        let idList = []
        recList.forEach((rec, index) => {
          recommend.findInterest(rec.job_id)
            .then(list => {
              idList = [...idList, ...list]
              // 最后一个时去重，若十个以内全部加入，十个以外任意取十个
              if (index === recList.length - 1) {
                let resList = []
                if (idList.length <= 10) {
                  resList = idList
                } else {
                  // 打乱顺序
                  idList.sort(() => {
                    return 0.5 - Math.random()
                  })
                  let i = 0
                  while (resList.length < 10) {
                    if (resList.indexOf(idList[i]) < 0) {
                      resList.push(idList[i])
                    }
                    i++
                  }
                  // 获取详情并返回
                  recommend.getJobsDetail(resList)
                    .then(jobsList => {
                      resolve(jobsList)
                    })
                }
              }
            })
        })
      }
    })
  })
}

// 寻找相似职位
recommend.findInterest = function (id) {
  return new Promise((resolve, reject) => {
    let idList = []
    let sql = 'SELECT * FROM recommend WHERE id1 = ? OR id2 = ?'
    db.query(sql, [id, id], (err, rows) => {
      if (err) {
        console.log('error:', err)
        reject(error)
      } else {
        rows.forEach(row => {
          if (idList.indexOf(row.id1) < 0) {
            idList.push(row.id1)
          }
          if (idList.indexOf(row.id2) < 0) {
            idList.push(row.id2)
          }
        })
        resolve(idList)
      }
    })
  })
}

// 职位详情
recommend.getJobsDetail = function (list) {
  return new Promise((resolve, reject) => {
    let jobsList = []
    let str = '(' + list.join(',') + ')'
    console.log(str)
    //根据括号内的顺序
    let sql = 'SELECT * FROM job,enterprise WHERE job.en_account = enterprise.en_account AND job.job_id IN (1,7,4,8,6,9,2,10,5,3)'
    db.query(sql, [str], (err, rows) => {
      if (err) {
        console.log('error:', err)
        reject(error)
      } else {
        resolve(rows)
      }
    })
  })
}

module.exports = recommend
