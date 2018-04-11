<template>
  <div class="mainBox">
    <div class="search">
      <el-row>
        <el-col :span="14" :offset="4">
          <el-input placeholder="请输入内容" v-model="keyword"></el-input>
        </el-col>
        <el-col :span="6">
          <el-button type="primary" icon="el-icon-search">搜索</el-button>
        </el-col>
      </el-row>
    </div>
    <div class="filter">
      <el-row>
        <el-col :span="2" :offset="4">
          <el-button type="text">职位类别</el-button>
        </el-col>
        <el-col :span="2">
          <el-button type="text">项目经理</el-button>
        </el-col>
        <el-col :span="2">
          <el-button type="text">Java工程师</el-button>
        </el-col>
        <el-col :span="2">
          <el-button type="text">PHP工程师</el-button>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="2" :offset="4">
          <el-button type="text">行业类别</el-button>
        </el-col>
        <el-col :span="2">
          <el-button type="text">互联网</el-button>
        </el-col>
        <el-col :span="2">
          <el-button type="text">金融</el-button>
        </el-col>
        <el-col :span="2">
          <el-button type="text">教育</el-button>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="2" :offset="4">
          <el-button type="text">城市</el-button>
        </el-col>
        <el-col :span="2">
          <el-button type="text">北京</el-button>
        </el-col>
        <el-col :span="2">
          <el-button type="text">上海</el-button>
        </el-col>
        <el-col :span="2">
          <el-button type="text">深圳</el-button>
        </el-col>
        <el-col :span="2">
          <el-button type="text">广州</el-button>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="2" :offset="4">
          <el-button type="text">更多</el-button>
        </el-col>
        <el-col :span="4">
          <el-select v-model="salaryValue" placeholder="薪资">
            <el-option v-for="item in salaryOptions" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </el-col>
        <el-col :span="4">
          <el-select v-model="dateValue" placeholder="发布日期">
            <el-option v-for="item in dateOptions" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </el-col>
        <el-col :span="4">
          <el-select v-model="dateValue" placeholder="...">
            <el-option v-for="item in dateOptions" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </el-col>
      </el-row>
    </div>
    <div class="sort">
      <el-row>
        <el-col :span="6" :offset="4">
          <el-radio-group v-model="salaryRadio">
            <el-radio-button label="薪资从高到低"></el-radio-button>
            <el-radio-button label="薪资从低到高"></el-radio-button>
          </el-radio-group>
        </el-col>
        <el-col :span="6">
          <el-radio-group v-model="dateRadio">
            <el-radio-button label="日期从远到近"></el-radio-button>
            <el-radio-button label="日期从近到远"></el-radio-button>
          </el-radio-group>
        </el-col>
      </el-row>
    </div>
    <div class="list">
      <el-row>
        <el-col :span="16" :offset="4">
          <el-table :data="tableData" style="width: 100%" @row-click="detail">
            <el-table-column type="index" label="编号">
            </el-table-column>
            <el-table-column prop="job_name" label="职位名称">
            </el-table-column>
            <el-table-column prop="en_name" label="公司名称">
            </el-table-column>
            <el-table-column prop="job_salary" label="薪资">
            </el-table-column>
            <el-table-column prop="job_addr" label="工作地点">
            </el-table-column>
            <el-table-column prop="date" label="发布时间">
            </el-table-column>
          </el-table>
        </el-col>
      </el-row>

    </div>
    <div class="page">
      <el-row>
        <el-col :span="16" :offset="8">
          <el-pagination :page-sizes="[100, 200, 300, 400]" :page-size="100" layout="total, sizes, prev, pager, next, jumper" :total="400">
          </el-pagination>
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
      keyword: '',
      salaryOptions: [
        {
          value: 's-0',
          label: '1-3k'
        },
        {
          value: 's-1',
          label: '3-6k'
        }
      ],
      salaryValue: '',
      dateOptions: [
        {
          value: 'd-0',
          label: '近一个月以内'
        },
        {
          value: 'd-1',
          label: '近一个月到三个月'
        }
      ],
      dateValue: '',
      salaryRadio: '',
      dateRadio: '',
      tableData: []
    }
  },
  mounted () {
    this.getAllJobs()
  },
  methods: {
    // 获取所有职位
    getAllJobs () {
      axios
        .post('/user/getalljobs')
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
  .search {
    padding: 20px 0;
    border-bottom: 1px solid #eeeeee;
  }
  .filter {
    padding: 20px 0;
    border-bottom: 1px solid #eeeeee;
  }
  .sort {
    padding: 20px 0;
    border-bottom: 1px solid #eeeeee;
  }
  .list {
    padding: 20px 0;
  }
  .page {
    padding: 20px 0;
  }
}
</style>



