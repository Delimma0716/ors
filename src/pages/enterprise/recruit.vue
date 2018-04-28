<template>
  <div class="mainBox">
    <el-form :model="jobForm" :rules="rules" ref="jobForm" label-width="100px">
      <el-form-item label="职位名称" prop="name">
        <el-input v-model="jobForm.name" placeholder="项目经理"></el-input>
      </el-form-item>
      <el-form-item label="专业方向" prop="major">
        <el-cascader expand-trigger="hover" :options="majorOptions" @change="majorChange" separator="-">
        </el-cascader>
      </el-form-item>
      <el-form-item label="职位薪资" prop="salary">
        <el-input v-model.number="jobForm.salary" placeholder="10">
          <template slot="append">k</template>
        </el-input>
      </el-form-item>
      <el-form-item label="工作地点" prop="addr">
        <el-cascader expand-trigger="hover" :options="addrOptions" @change="addrChange" separator="-">
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
        <el-button type="primary" @click="submitForm('jobForm')">立即发布</el-button>
        <el-button @click="clearForm('jobForm')">清空</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import axios from 'axios'
import { enterCheck } from '@/assets/js/enterUtils'
import { MAJOR, CITY } from '@/assets/js/public'

export default {
  data () {
    return {
      jobForm: {
        name: '',
        major: '',
        salary: '',
        addr: '',
        exp: '',
        edu: '',
        time: '',
        info: '',
      },
      // 地点
      addrOptions: [],
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
          { required: true, message: '必填', trigger: 'blur' },
        ],
        major: [
          { required: true, message: '必填', trigger: 'blur' },
        ],
        salary: [
          { required: true, message: '必填', trigger: 'blur' },
          { type: 'number', message: '必须为数字' }
        ],
        addr: [
          { required: true, message: '必填', trigger: 'blur' },
        ],
        exp: [
          { required: true, message: '必填', trigger: 'blur' },
        ],
        edu: [
          { required: true, message: '必填', trigger: 'blur' },
        ],
        time: [
          { required: true, message: '必填', trigger: 'blur' },
        ]
      }
    }
  },
  mounted () {
    this.check()
  },
  methods: {
    // 检查审核状态
    check () {
      enterCheck(localStorage.getItem('en_account'))
        .then(data => {
          if (data.msg === 0) {
            // 弹出确认框
            this.$alert('您还未认证，请先通过企业认证', '提示', {
              confirmButtonText: '确定',
              type: 'warning'
            }).then(() => {
              this.$router.push({ name: '企业认证' })
            })
          } else if (data.msg === 2) {
            // 弹出确认框
            this.$alert('您的认证未通过，请重新上传资料', '提示', {
              confirmButtonText: '确定',
              type: 'warning'
            }).then(() => {
              this.$router.push({ name: '企业认证' })
            })
          } else {
            this.initAddr()
            this.initMajor()
          }
        }, function (error) {
          console.log(error)
        })
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
      this.jobForm.major = value[0] + '-' + value[1]
    },
    // 地点层级选择器设置值
    addrChange (value) {
      this.jobForm.addr = value[0] + '-' + value[1]
    },
    // 提交表单
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // 弹出确认框
          this.$confirm('确定发布吗？', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            this.recruit()
          })
        } else {
          return false
        }
      })
    },
    // 清空表单
    clearForm (formName) {
      this.$refs[formName].resetFields()
      this.jobForm.addr = ''
    },
    // 发布职位
    recruit () {
      axios
        .post('/enter/postjob', {
          account: localStorage.getItem('en_account'),
          name: this.jobForm.name,
          major: this.jobForm.major,
          salary: this.jobForm.salary,
          addr: this.jobForm.addr,
          exp: this.jobForm.exp,
          edu: this.jobForm.edu,
          time: this.jobForm.time,
          info: this.jobForm.info
        })
        .then(response => {
          if (response.data.retCode === 1) {
            this.$message({
              type: 'success',
              message: response.data.msg
            })
          } else {
            this.$message({
              type: 'error',
              message: response.data.msg
            })
          }
        })
        .catch(error => {
          console.log(error)
          this.$message({
            type: 'success',
            message: '发布成功'
          })
        })
    }
  }
}
</script>

<style lang="less" scoped>
.mainBox {
  position: relative;
  top: 61px;
  left: 0;
  padding: 5% 30%;
}
</style>