<template>
  <div>
    <el-table :data="tableData" style="width: 100%;" v-show="showTable">
      <el-table-column label="编号" width="120" type="index">
      </el-table-column>
      <el-table-column label="职位名称" prop="job_name">
      </el-table-column>
      <el-table-column label="行业类别" prop="job_major">
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" @click="goEdit(scope.row)">编辑</el-button>
          <el-button size="mini" type="danger" @click="goDelete(scope.$index,scope.row.job_id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-form :model="jobForm" :rules="rules" ref="jobForm" label-width="100px" v-show="!showTable">
      <el-form-item label="职位名称" prop="name">
        <el-input v-model="jobForm.name" placeholder="项目经理"></el-input>
      </el-form-item>
      <el-form-item label="专业方向" prop="major">
        <el-cascader v-model="jobForm.major" expand-trigger="hover" :options="majorOptions" @change="majorChange" separator="-">
        </el-cascader>
      </el-form-item>
      <el-form-item label="职位薪资" prop="salary">
        <el-input v-model.number="jobForm.salary" placeholder="10">
          <template slot="append">k</template>
        </el-input>
      </el-form-item>
      <el-form-item label="工作地点" prop="addr">
        <el-cascader v-model="jobForm.addr" expand-trigger="hover" :options="addrOptions" @change="addrChange" separator="-">
        </el-cascader>
      </el-form-item>
      <el-form-item label="工作经验" prop="exp">
        <el-select v-model="jobForm.exp" placeholder="请选择">
          <el-option v-for="item in expOptions" :key="item.value" :label="item.label" :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="学历" prop="edu">
        <el-select v-model="jobForm.edu" placeholder="请选择">
          <el-option v-for="item in eduOptions" :key="item.value" :label="item.label" :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="工作时间" prop="time">
        <el-select v-model="jobForm.time" placeholder="请选择">
          <el-option v-for="item in timeOptions" :key="item.value" :label="item.label" :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="职位描述" prop="info">
        <el-input type="textarea" v-model="jobForm.info" :autosize="{ minRows: 5}" placeholder="职位信息,任职要求">
        </el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="save('jobForm')">保存</el-button>
        <el-button @click="clearForm('jobForm')">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import axios from 'axios'
import { MAJOR, CITY } from '@/assets/js/public'

export default {
  data () {
    return {
      // 当前编辑的职位id
      editId: '',
      showTable: true,
      tableData: [],
      jobForm: {
        name: '',
        major: '',
        salary: 0,
        addr: '',
        exp: '',
        edu: '',
        time: '',
        info: ''
      },
      // 地点
      addrOptions: [],
      // 专业
      majorOptions: [],
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
      rules: {
        name: [
          { required: true, message: '必填', trigger: 'blur' }
        ],
        major: [
          { required: true, message: '必填', trigger: 'blur' }
        ],
        salary: [
          { required: true, message: '必填', trigger: 'blur' },
          { type: 'number', message: '必须为数字' }
        ],
        addr: [
          { required: true, message: '必填', trigger: 'blur' }
        ],
        exp: [
          { required: true, message: '必填', trigger: 'blur' }
        ],
        edu: [
          { required: true, message: '必填', trigger: 'blur' }
        ],
        time: [
          { required: true, message: '必填', trigger: 'blur' }
        ]
      }
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
    // 编辑
    goEdit (row) {
      this.initAddr()
      this.initMajor()
      this.jobForm.name = row.job_name
      this.jobForm.salary = parseFloat(row.job_salary)
      this.jobForm.major = [row.job_major.split('-')[0], row.job_major.split('-')[1]]
      this.jobForm.addr = [row.job_addr.split('-')[0], row.job_addr.split('-')[1]]
      this.jobForm.exp = row.job_exp
      this.jobForm.edu = row.job_edu
      this.jobForm.time = row.job_time
      this.jobForm.info = row.job_info
      this.showTable = false
      this.editId = row.job_id
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
    // 专业层级选择器设置值
    majorChange (value) {
      this.jobForm.major = value
    },
    // 地点层级选择器设置值
    addrChange (value) {
      this.jobForm.addr = value
    },
    // 清空表单
    clearForm (formName) {
      this.$refs[formName].resetFields()
      this.showTable = true
    },
    // 保存
    save (form) {
      // 弹出确认框
      this.$confirm('确定保存吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.saveForm(this.jobForm)
      })
    },
    // 确认保存
    saveForm (form) {
      axios
        .post('/enter/updatejob', {
          id: this.editId,
          name: form.name,
          major: form.major.join('-'),
          salary: form.salary,
          addr: form.addr.join('-'),
          exp: form.exp,
          edu: form.edu,
          time: form.time,
          info: form.info
        })
        .then(response => {
          if (response.data.retCode === 1) {
            this.$message({
              type: 'success',
              message: response.data.msg
            })
            this.showTable = true
            // 重新获取最新职位信息
            this.getJobs()
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
