<template>
  <div class="mainBox">
    <div class="fixed">
      <el-row>
        <el-col :span="20" :offset="4">
          <h1>{{details.job_name}}</h1>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="14" :offset="4">
          <h2>{{details.en_name}}</h2>
        </el-col>
        <el-col :span="6">
          <el-button type="primary">收藏</el-button>
          <el-button type="warning" icon="el-icon-check" disabled v-if="sended">已投递</el-button>
          <el-button type="primary" @click="send" v-else>投递</el-button>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="20" :offset="4">
          <p>{{details.job_salary}} / {{details.job_addr}} / {{details.job_exp}} / {{details.job_edu}} / {{details.job_time}} </p>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="20" :offset="4">
          <el-tag>高薪</el-tag>
          <el-tag type="success">愉快</el-tag>
          <el-tag type="info">氛围好</el-tag>
          <el-tag type="warning">福利好</el-tag>
          <el-tag type="danger">晋升快</el-tag>
        </el-col>
      </el-row>
    </div>
    <div class="detail">
      <el-row>
        <el-col :span="16" :offset="4">
          <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane label="职位描述" name="first">{{details.job_info}}</el-tab-pane>
            <el-tab-pane label="公司介绍" name="second">{{details.en_desc}}</el-tab-pane>
            <el-tab-pane label="联系方式" name="third">{{details.en_tel}}</el-tab-pane>
          </el-tabs>
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
      sended: false,
      job_id: this.$route.params.job_id,
      details: {},
      activeName: 'second'
    }
  },
  mounted () {
    this.checkSend()
    this.getJobDetail()
  },
  methods: {
    // 获取职位详细信息
    getJobDetail () {
      axios
        .post('/user/getjobdetail', {
          id: this.job_id
        })
        .then(response => {
          if (response.data.retCode === 1) {
            this.details = response.data.msg
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
    // 检查是否投递过
    checkSend () {
      axios
        .post('/user/checksend', {
          account: localStorage.getItem('user_account'),
          id: this.job_id
        })
        .then(response => {
          if (response.data.retCode === 1) {
            this.sended = response.data.msg
          }
        })
        .catch(error => {
          console.log(error)
        })
    },
    // 投递
    send () {
      // 弹出确认框
      this.$confirm('确定信息已完善并投递简历吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.sendResume()
      })
    },
    // 投递简历
    sendResume () {
      axios
        .post('/user/sendresume', {
          uaccount: localStorage.getItem('user_account'),
          eaccount: this.details.en_account,
          id: this.job_id,
          status: 0
        })
        .then(response => {
          if (response.data.retCode === 1) {
            this.$message({
              type: 'success',
              message: response.data.msg
            })
            this.sended = true
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

<style lang="less" scoped>
.mainBox {
  width: 100%;
  .fixed {
    width: 100%;
    padding: 20px 0;
    background: #eeeeee;
    position: fixed;
    top: 61px;
    left: 0;
    z-index: 10;
    h1 {
      font-size: 1.6em;
    }
    h2 {
      font-size: 1.2em;
    }
  }
  .detail {
    position: relative;
    top: 300px;
    left: 0;
    padding: 20px 0;
  }
}
</style>

