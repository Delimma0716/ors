const axios = require('axios')

// 查询企业审核状态
let enterCheck = function (account) {
  return new Promise((resolve, reject) => {
    axios
      .post('/enter/checked', {
        account: account,
      })
      .then(response => {
        resolve(response.data)
      })
      .catch(error => {
        reject(error)
      })
  })
}

export { enterCheck }