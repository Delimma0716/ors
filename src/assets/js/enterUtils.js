const axios = require('axios')

let enterUtils = {}

// 查询企业审核状态
enterUtils.check = function (account) {
  axios
    .post('/enter/checked', {
      account: account,
    })
    .then(response => {
      return response.data
    })
    .catch(error => {
      console.log(error)
    })
}

module.exports = enterUtils