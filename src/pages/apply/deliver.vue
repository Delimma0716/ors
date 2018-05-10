<template>
  <div>
    <el-table :data="tableData" style="width: 100%" :row-class-name="tableRowClassName">
      <el-table-column type="index" label="编号" width="120">
      </el-table-column>
      <el-table-column prop="job_name" label="职位名称">
      </el-table-column>
      <el-table-column prop="en_name" label="公司名称">
      </el-table-column>
      <el-table-column prop="de_status" :formatter="statusFormat" label="投递状态">
      </el-table-column>
    </el-table>
  </div>
</template>

<style>
.el-table .warning-row {
  background: oldlace;
}

.el-table .success-row {
  background: #f0f9eb;
}
</style>

<script>
import axios from 'axios'
const statusList = ['未查看', '已查看', '感兴趣', '不合适']
const rowStyleList = ['warning-row', '', 'success-row', '']

export default {
  data () {
    return {
      tableData: []
    }
  },
  mounted () {
    this.getAllDelivers()
  },
  methods: {
    // 获取所有投递
    getAllDelivers () {
      axios
        .post('/user/getalldelivers', {
          account: localStorage.getItem('user_account')
        })
        .then(response => {
          if (response.data.retCode === 1) {
            this.tableData = response.data.msg
          } else {
            this.$message({
              type: 'error',
              message: response.data.msg
            })
          }
        })
        .catch(error => {
          console.log(error)
        })
    },
    // 投递状态格式化
    statusFormat (cellValue) {
      return statusList[cellValue.de_status]
    },
    // 根据投递状态设置表格样式
    tableRowClassName ({ row, rowIndex }) {
      return rowStyleList[row.de_status]
    }
  }
}
</script>