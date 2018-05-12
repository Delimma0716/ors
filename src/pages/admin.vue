<template>
  <div class="innerbox">
    <el-breadcrumb separator-class="el-icon-arrow-right" class="nav">
      <el-breadcrumb-item :to="{ path: '/admin' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/admin' }">企业审核</el-breadcrumb-item>
    </el-breadcrumb>

    <el-table :data="tableData" style="width: 100%;" v-if="showTable">
      <el-table-column label="编号" width="80" type="index" fixed>
      </el-table-column>
      <el-table-column label="企业名称" prop="en_name">
      </el-table-column>
      <el-table-column label="营业执照">
        <template slot-scope="scope">
          <a  v-if="scope.row.en_license" :href="licenseFormat(scope.row.en_license)">下载</a>
          <span v-else>无</span>
        </template>
      </el-table-column>
      <el-table-column label="详细信息" fixed="right">
        <template slot-scope="scope">
          <el-button size="mini" @click="showDetail(scope.row)">查看</el-button>
        </template>
      </el-table-column>
      <el-table-column label="审核状态" fixed="right" prop="en_checked" :formatter="checkedFormat">
      </el-table-column>
      <el-table-column label="审核操作" width="270" fixed="right">
        <template slot-scope="scope">
          <el-button size="mini" @click="checkEnter(scope.$index, scope.row.en_account,1)">通过</el-button>
          <el-button size="mini" type="danger" @click="checkEnter(scope.$index, scope.row.en_account,2)">不通过</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-card class="box-card" v-else>
      <div slot="header">
        <span>详细信息</span>
        <el-button style="float: right; padding: 3px 0" type="text" @click="hideDetail">返回</el-button>
      </div>
      <div>
        <p>企业名称</p>
        <p class="item">{{cardData.en_name}}</p>
        <p>企业简介</p>
        <p class="item">{{cardData.en_desc}}</p>
        <p>企业地址</p>
        <p class="item">{{cardData.en_addr}}</p>
        <p>联系方式</p>
        <p class="item">{{cardData.en_tel}}</p>
        <p>营业执照</p>
        <p class="item">
          <a v-if="cardData.en_license" :href="licenseFormat(cardData.en_license)">下载</a>
          <span v-else>无</span>
        </p>
      </div>
    </el-card>

  </div>
</template>

<script>
import axios from 'axios'

const checkedList = ['未审核', '通过', '不通过']

export default{
  data () {
    return {
      tableData: [],
      cardData: [],
      showTable: true
    }
  },
  mounted () {
    this.getAllEnterInfo()
  },
  methods: {
    // 获取所有企业信息
    getAllEnterInfo () {
      axios
        .post('/public/allenterinfo')
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
    // 审核状态格式化
    checkedFormat (value) {
      return checkedList[value.en_checked]
    },
    // 下载地址拼接
    licenseFormat (cellValue) {
      let licenseName = cellValue.split('\\')[2]
      return 'http://localhost:3000/public/download/license/' + licenseName
    },
    // 查看详细信息
    showDetail (row) {
      this.cardData = row
      this.showTable = false
    },
    // 关闭详细信息
    hideDetail () {
      this.cardData = []
      this.showTable = true
    },
    // 审核
    checkEnter (index, account, checked) {
      axios
        .post('/public/updatechecked', {
          account: account,
          checked: checked
        })
        .then(response => {
          if (response.data.retCode === 1) {
            this.$message({
              type: 'success',
              message: response.data.msg
            })
            this.getAllEnterInfo()
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
  .innerbox{
    padding: 40px 80px;
    .nav{
      margin-bottom:20px;
    }
    .box-card{
      .item{
        font-size:14px;
        margin-bottom:20px;
      }
    }
  }
</style>
