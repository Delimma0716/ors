<template>
  <div>
    <el-dropdown>
      <el-button type="primary">
        投递状态
        <i class="el-icon-arrow-down el-icon--right"></i>
      </el-button>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item>所有</el-dropdown-item>
        <el-dropdown-item>已查看</el-dropdown-item>
        <el-dropdown-item>感兴趣</el-dropdown-item>
        <el-dropdown-item>不合适</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>

    <el-dropdown>
      <el-button type="primary">
        职位名称
        <i class="el-icon-arrow-down el-icon--right"></i>
      </el-button>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item>所有</el-dropdown-item>
        <el-dropdown-item>已查看</el-dropdown-item>
        <el-dropdown-item>感兴趣</el-dropdown-item>
        <el-dropdown-item>不合适</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>

    <el-table :data="tableData" style="width: 100%;">
      <el-table-column label="编号" width="80" type="index" fixed>
      </el-table-column>
      <el-table-column label="姓名" fixed width="120" prop="user_name">
      </el-table-column>
      <el-table-column label="身份证号" width="180" prop="user_idCard">
      </el-table-column>
      <el-table-column label="性别" width="180" prop="user_sex">
      </el-table-column>
      <el-table-column label="出生年月" width="180" prop="user_birth">
      </el-table-column>
      <el-table-column label="投递职位" width="180" prop="job_name">
      </el-table-column>
      <el-table-column label="投递日期" width="180" prop="de_date">
      </el-table-column>
      <el-table-column label="简历" fixed="right" prop="user_resume">
        <template slot-scope="scope">
          <el-button size="mini" @click="download(scope.row.user_resume)">下载</el-button>
        </template>
      </el-table-column>
      <el-table-column label="投递状态" fixed="right" prop="de_status" :formatter="statusFormat">
      </el-table-column>
      <el-table-column label="标记为" width="270" fixed="right">
        <template slot-scope="scope">
          <el-button size="mini" @click="updateStatus(scope.$index, scope.row.de_id,1)">已查看</el-button>
          <el-button size="mini" type="danger" @click="updateStatus(scope.$index,scope.row.de_id,2)">感兴趣</el-button>
          <el-button size="mini" @click="updateStatus(scope.$index,scope.row.de_id,3)">不合适</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import axios from 'axios'
import fs from 'fs'

const statusList = ['未查看', '已查看', '感兴趣', '不合适']

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
        .post('/enter/getalldelivers', {
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
    // 更改投递状态
    updateStatus (index, id, status) {
      axios
        .post('/enter/updatestatus', {
          id: id,
          status: status
        })
        .then(response => {
          if (response.data.retCode === 1) {
            this.$message({
              type: 'success',
              message: response.data.msg
            })
            this.tableData[index].de_status = status
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
    // 下载简历
    download (path) {
      axios
        .get(path)
        .then(response => {

        })
        .catch(error => {
          console.log(error)
        })
    }
  }
}
</script>