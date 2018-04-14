<template>
  <div class="innerbox">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/admin' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/admin' }">企业审核</el-breadcrumb-item>
    </el-breadcrumb>

    <el-table :data="tableData" style="width: 100%;">
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
          <el-button size="mini">查看</el-button>
        </template>
      </el-table-column>
      <el-table-column label="审核状态" fixed="right" prop="en_checked" :formatter="checkedFormat">
      </el-table-column>
      <el-table-column label="审核操作" width="270" fixed="right">
        <template slot-scope="scope">
          <el-button size="mini" @click="updateStatus(scope.$index, scope.row.de_id,1)">通过</el-button>
          <el-button size="mini" type="danger" @click="updateStatus(scope.$index, scope.row.de_id,1)">不通过</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import axios from 'axios'

const checkedList = ['未审核', '通过', '不通过']

export default{
  data () {
    return {
      tableData: []
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
    checkedFormat(value){
      return checkedList[value.en_checked]
    },
    // 下载地址拼接
    licenseFormat(cellValue){
      let licenseName = cellValue.split('\\')[2]
      return 'http://localhost:3000/public/download/license/'+licenseName
    }
  }
}
</script>

<style lang="less" scoped>
  .innerbox{
    padding: 40px 80px;
  }
</style>