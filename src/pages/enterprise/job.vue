<template>
  <div>
    <el-table :data="tableData" style="width: 100%;">
      <el-table-column label="编号" width="80" type="index">
      </el-table-column>
      <el-table-column label="职位名称" width="120" prop="job_name">
      </el-table-column>
      <el-table-column label="发布时间" width="180" prop="job_date">
      </el-table-column>
      <el-table-column label="操作" width="270">
        <template slot-scope="scope">
          <el-button size="mini">编辑</el-button>
          <el-button size="mini" type="danger" @click="goDelete(scope.$index,scope.row.job_id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data () {
    return {
      tableData: []
    }
  },
  mounted () {
    this.getJobs()
  },
  methods: {
    // 获取该公司所有职位
    getJobs () {
      axios
        .post('/enter/getjobs', {
          account: localStorage.getItem('en_account')
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
    // 删除
    goDelete (index, id) {
      console.log(2333)
      // 弹出确认框
      this.$confirm('确定删除吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.deleteJob(index, id)
      })
    },
    // 删除职位
    deleteJob (index, id) {
      axios
        .post('/enter/deletejob', {
          id: id
        })
        .then(response => {
          if (response.data.retCode === 1) {
            this.$message({
              type: 'success',
              message: response.data.msg
            })
            this.tableData.splice(index, 1)
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
    }
  }
}
</script>

<style>

</style>
