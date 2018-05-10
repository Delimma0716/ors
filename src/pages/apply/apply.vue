<template>
  <div class="mainBox">
    <div class="search">
      <el-row>
        <el-col :span="14" :offset="4">
          <el-input placeholder="搜索职位" v-model="keyword" 　clearable></el-input>
        </el-col>
        <el-col :span="6">
          <el-button type="primary" icon="el-icon-search" @click="setName(keyword)">搜索</el-button>
        </el-col>
      </el-row>
    </div>
    <div class="filter">
      <el-row>
        <el-col :span="2" :offset="4">
          <el-button type="text">热门职位</el-button>
        </el-col>
        <el-col :span="2">
          <el-button type="text" @click="setName('')">全部</el-button>
        </el-col>
        <el-col :span="2" v-for="name in hotName">
          <el-button type="text" @click="setName(name)">{{name}}</el-button>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="2" :offset="4">
          <el-button type="text">热门城市</el-button>
        </el-col>
        <el-col :span="2">
          <el-button type="text" @click="setAddr('')">全部</el-button>
        </el-col>
        <el-col :span="2" v-for="city in hotCity">
          <el-button type="text" @click="setAddr(city)">{{city}}</el-button>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="2" :offset="4">
          <el-button type="text">筛选条件</el-button>
        </el-col>
        <el-col :span="4">
          <el-cascader v-model="majorValue" :change-on-select="true" placeholder="专业" clearable @change="getAllJobs" expand-trigger="hover" :options="majorOptions" separator="-">
          </el-cascader>
        </el-col>
        <el-col :span="4">
          <el-select v-model="salaryValue" placeholder="薪资" clearable @change="getAllJobs">
            <el-option v-for="item in salaryOptions" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </el-col>
        <el-col :span="4">
          <el-cascader v-model="addrValue" :change-on-select="true" placeholder="地点" clearable @change="getAllJobs" expand-trigger="hover" :options="addrOptions" separator="-">
          </el-cascader>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="2" :offset="4">
          <el-button type="text">筛选条件</el-button>
        </el-col>
        <el-col :span="4">
          <el-select v-model="expValue" placeholder="经验" clearable @change="getAllJobs">
            <el-option v-for="item in expOptions" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </el-col>
        <el-col :span="4">
          <el-select v-model="eduValue" placeholder="学历" clearable @change="getAllJobs">
            <el-option v-for="item in eduOptions" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </el-col>
        <el-col :span="4">
          <el-select v-model="timeValue" placeholder="类型" clearable @change="getAllJobs">
            <el-option v-for="item in timeOptions" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </el-col>
      </el-row>
    </div>
    <div class="list">
      <el-row>
        <el-col :span="16" :offset="4">
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
    <div class="page">
      <el-row>
        <el-col :span="16" :offset="8">
          <el-pagination :page-size="10" layout="total, prev, pager, next, jumper" :total="jobsData.length" @current-change="pageChange">
          </el-pagination>
        </el-col>
      </el-row>
    </div>
  </div>

</template>

<script>
import axios from 'axios'
import { MAJOR, CITY } from '@/assets/js/public'

export default {
  data () {
    return {
      keyword: '',
      // 薪资
      salaryOptions: [{
        value: '1-5k',
        label: '1-5k'
      },
      {
        value: '5-10k',
        label: '5-10k'
      },
      {
        value: '10-20k',
        label: '10-20k'
      },
      {
        value: '20k以上',
        label: '20k以上'
      }],
      // 经验
      expOptions: [{
        value: '无要求',
        label: '无要求'
      }, {
        value: '1-3年',
        label: '1-3年'
      }, {
        value: '3-5年',
        label: '3-5年'
      }, {
        value: '5-10年',
        label: '5-10年'
      }],
      // 学历
      eduOptions: [{
        value: '无要求',
        label: '无要求'
      }, {
        value: '专科',
        label: '专科'
      }, {
        value: '本科',
        label: '本科'
      }, {
        value: '硕士',
        label: '硕士'
      }],
      // 时间
      timeOptions: [{
        value: '全职',
        label: '全职'
      }, {
        value: '兼职',
        label: '兼职'
      }, {
        value: '实习',
        label: '实习'
      }],
      nameValue: '',
      salaryValue: '',
      majorOptions: [],
      majorValue: '',
      majorValueJoin: '',
      addrOptions: [],
      addrValue: '',
      addrValueJoin: '',
      expValue: '',
      eduValue: '',
      timeValue: '',
      jobsData: [],
      tableData: [],
      // 分页
      pageSize: 10,
      // 热门
      hotCity: ['北京', '上海', '深圳', '广州', '南京', '苏州'],
      hotName: ['项目经理', 'Java工程师', 'PHP工程师', 'UI设计师', '会计']
    }
  },
  mounted () {
    this.getAllJobs()
    this.initMajor()
    this.initAddr()
  },
  methods: {
    // 获取所有职位
    getAllJobs () {
      if (typeof this.majorValue === 'object') {
        this.majorValueJoin = this.majorValue.join('-')
      }
      if (typeof this.addrValue === 'object') {
        this.addrValueJoin = this.addrValue.join('-')
      } else {
        this.addrValueJoin = this.addrValue
      }
      axios
        .post('/user/getalljobs', {
          nameValue: this.nameValue,
          majorValue: this.majorValueJoin,
          salaryValue: this.salaryValue,
          addrValue: this.addrValueJoin,
          expValue: this.expValue,
          eduValue: this.eduValue,
          timeValue: this.timeValue
        })
        .then(response => {
          if (response.data.retCode === 1) {
            this.jobsData = response.data.msg
            this.tableData = this.jobsData.slice(0, this.pageSize)
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
    },
    // 初始化地点列表
    initAddr () {
      this.addrOptions = []
      for (let province in CITY) {
        let item = {
          value: province,
          label: province,
          children: []
        }
        for (let city of CITY[province]) {
          let subItem = {
            value: city,
            label: city
          }
          item.children.push(subItem)
        }
        this.addrOptions.push(item)
      }
    },
    // 初始化专业列表
    initMajor () {
      this.majorOptions = []
      MAJOR.forEach(major => {
        let item = {
          value: major.main,
          label: major.main,
          children: []
        }
        major.sub.forEach(sub => {
          let subItem = {
            value: sub,
            label: sub
          }
          item.children.push(subItem)
        })
        this.majorOptions.push(item)
      })
    },
    // 点击热门职位后设置名称
    setName (name) {
      this.nameValue = name
      this.getAllJobs()
    },
    // 点击热门城市后设置地点
    setAddr (city) {
      this.addrValue = city
      this.getAllJobs()
    },
    // 页数改变
    pageChange (index) {
      this.tableData = this.jobsData.slice((index - 1) * 10, index * 10)
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
  .list {
    padding: 20px 0;
  }
  .page {
    padding: 20px 0;
  }
}
</style>
