<template>
  <div class="mainBox">
    <el-form :model="jobForm" :rules="rules" ref="jobForm" label-width="100px" class="demo-jobForm">
      <el-form-item label="职位名称" prop="name">
        <el-input v-model="jobForm.name" placeholder="项目经理"></el-input>
      </el-form-item>
      <el-form-item label="职位薪资" prop="salary">
        <el-input v-model="jobForm.salary" placeholder="10k-15k"></el-input>
      </el-form-item>
      <el-form-item label="工作地点" prop="addr">
        <el-input v-model="jobForm.addr" placeholder="北京"></el-input>
      </el-form-item>
      <el-form-item label="工作经验" prop="exp">
        <el-input v-model="jobForm.exp" placeholder="1-3年"></el-input>
      </el-form-item>
      <el-form-item label="学历" prop="edu">
        <el-input v-model="jobForm.edu" placeholder="本科"></el-input>
      </el-form-item>
      <el-form-item label="工作时间" prop="time">
        <el-input v-model="jobForm.time" placeholder="全职"></el-input>
      </el-form-item>
      <el-form-item label="职位描述" prop="info">
        <el-input 
          type="textarea" 
          v-model="jobForm.info" 
          :autosize="{ minRows: 5}"
          placeholder="职位信息,任职要求">
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
import {enterCheck} from '@/assets/js/enterUtils'

  export default {
    data() {
      return {
        jobForm: {
          name: '',
          salary: '',
          addr:'',
          exp:'',
          edu:'',
          time:'',
          info:'',
        },
        rules: {
          name: [
            { required: true, message: ' ', trigger: 'blur' },
          ],
          salary: [
            { required: true, message: ' ', trigger: 'blur' },
          ],
          addr:[
            { required: true, message: ' ', trigger: 'blur' },
          ],
          exp:[
            { required: true, message: ' ', trigger: 'blur' },
          ],
          edu:[
            { required: true, message: ' ', trigger: 'blur' },
          ],
          time:[
            { required: true, message: ' ', trigger: 'blur' },
          ]
        }
      }
    },
    mounted() {
      this.check()
    },
    methods: {
      // 检查审核状态
      check(){
        enterCheck(localStorage.getItem('en_account'))
          .then( data => {
            if(data.msg===0){
              // 弹出确认框
              this.$alert('您还未认证，请先通过企业认证', '提示', {
                confirmButtonText: '确定',
                type: 'warning'
              }).then(() => {
                this.$router.push({name:'企业认证'})
              })
            }else if(data.msg===2){
              // 弹出确认框
              this.$alert('您的认证未通过，请重新上传资料', '提示', {
                confirmButtonText: '确定',
                type: 'warning'
              }).then(() => {
                this.$router.push({name:'企业认证'})
              })
            }
          }, function (error) {
            console.log(error)
          })
      },
      // 提交表单
      submitForm(formName) {
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
      clearForm(formName) {
        this.$refs[formName].resetFields()
      },
      // 发布职位
      recruit(){
        axios
          .post('/enter/postjob', {
            account: localStorage.getItem('en_account'),
            name: this.jobForm.name,
            salary: this.jobForm.salary,
            addr: this.jobForm.addr,
            exp:  this.jobForm.exp,
            edu:  this.jobForm.edu,
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
  padding:5% 20%;
}
</style>