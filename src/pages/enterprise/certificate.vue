<template>
<div>
  <p v-if="checkedData.msg===0">未认证，请尽快完善资料</p>
  <p v-else-if="checkedData.msg===1">认证通过</p>
  <p v-else>认证未通过，请重新上传资料</p>
  <div class="box" v-if="showUpload">
    <h1>上传营业执照</h1>
    <el-upload class="upload-demo" action="http://localhost:3000/enter/upload/license" ref="upload" name="license" :data="uploadFrom" :multiple="false" :auto-upload="false" :on-success="handleSuccess" :before-upload="checkFile">
        <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
        <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">上传</el-button>
        <el-button style="margin-left: 10px;" size="small" @click="cancel" v-show="hasLicense">取消</el-button>
        <div class="el-upload__tip" slot="tip">只能上传jpg/jpeg/pdf文件</div>
      </el-upload>
  </div>
  <div class="box" v-else>
      <h1>查看营业执照</h1>
      <p>{{licenseName}}</p>
      <a :href="'http://localhost:3000/public/download/license/'+licenseName">下载</a>
      <el-button style="margin-left: 10px;" size="small" type="success" @click="toUpload">重新上传</el-button>
    </div>
  </div>
</div>
</template>

<script>
import axios from 'axios'
import {enterCheck} from '@/assets/js/enterUtils'

export default{
  data () {
    return {
      showUpload: false,
      uploadFrom: {
        account: localStorage.getItem('en_account')
      },
      licenseName: '',
      hasLicense:false,
      checkedData:{}
    }
  },
  mounted () {
    this.check()
    this.checkLicense()
  },
  methods:{
    // 检查审核状态
    check(){
      enterCheck(localStorage.getItem('en_account'))
        .then( data => {
          this.checkedData=data
        }, function (error) {
          console.log(error)
        })
    },
    // 检查是否上传过营业执照
    checkLicense () {
      axios
        .post('/enter/checklicense', {
          account: localStorage.getItem('en_account')
        })
        .then(response => {
          if (response.data.retCode === 1) {
            this.hasLicense = response.data.msg.hasLicense
            this.showUpload = !response.data.msg.hasLicense
            // 路径中的upload替换成download
            this.licenseName = response.data.msg.license.split('\\')[2]
          }
        })
        .catch(error => {
          console.log(error)
        })
    },
    // 重新上传
    toUpload () {
      this.showUpload = true
    },
    // 取消
    cancel () {
      this.showUpload = false
    },
    // 上传文件
    submitUpload () {
      this.$refs.upload.submit()
    },
    // 上传成功回调
    handleSuccess (response, file, fileList) {
      if (response.retCode === 1) {
        this.$message({
          type: 'success',
          message: response.msg
        })
        this.checkLicense()
      } else {
        this.$message({
          type: 'error',
          message: response.msg
        })
      }
    }
  }
}
</script>

<style lang="less" scoped>
  .box{
    text-align: center;
    h1{
      font-size:1.8rem;
      color:#303133;
    }
  }
</style>