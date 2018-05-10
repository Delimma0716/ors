<template>
  <div class="mainBox">
    <div class="list">
      <el-row>
        <el-col :span="16" :offset="4">
          <el-button class="refresh" @click="getRecJobs" icon="el-icon-refresh">换一批</el-button>          
          <el-table :data="tableData" style="width: 100%" @row-click="detail">
            <el-table-column type="index" label="编号" width="120">
            </el-table-column>
            <el-table-column prop="job_name" label="职位名称">
            </el-table-column>
            <el-table-column prop="en_name" label="公司名称">
            </el-table-column>
            <el-table-column prop="job_salary" label="薪资(k)">
            </el-table-column>
            <el-table-column prop="job_addr" label="工作地点">
            </el-table-column>
          </el-table>
        </el-col>
      </el-row>
    </div>
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
    this.getRecJobs()
  },
  methods: {
    // 获取推荐职位
    getRecJobs () {
      axios.post('/user/getinterest', {
        account: localStorage.getItem('user_account')
      }).then(response => {
        this.tableData = response.data
      }).catch(error => {
        console.log(error)
      })
    },
    // 显示职位细节
    detail (row) {
      this.$router.push('/detail/' + row.job_id)
    }
  }
}
</script>

<style lang="less" scoped>
.mainBox {
  width: 100%;
  position: relative;
  top: 61px;
  left: 0;
  .refresh{
    float: right;
    margin-bottom: 10px;
  }
  .list {
    padding: 40px 0;
  }
}
</style>
