<template>
  <div class="list">
    <el-row>
      <el-col>
        <el-table :data="tableData" style="width: 100%" @row-click="detail">
          <el-table-column type="index" label="编号">
          </el-table-column>
          <el-table-column prop="job_name" label="职位名称">
          </el-table-column>
          <el-table-column prop="en_name" label="公司名称">
          </el-table-column>
          <el-table-column prop="job_salary" label="薪资(k)">
          </el-table-column>
          <el-table-column prop="job_addr" label="工作地点">
          </el-table-column>
          <el-table-column prop="date" label="发布时间">
          </el-table-column>
        </el-table>
      </el-col>
    </el-row>
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
    this.getCollection()
  },
  methods: {
    // 获取所有收藏职位
    getCollection () {
      axios.post('/user/getcollect', {
        account: localStorage.getItem('user_account')
      }).then(response => {
        this.tableData = response.data.msg
      }).catch(error => {
        console.log(error)
      })
    },
    // 显示职位细节
    detail (row) {
      this.$router.push('/detail/' + row.job_id)
    },
  }
}
</script>

<style>

</style>
