<template>
  <div>
    <div class="box" v-if="showUpload">
      <h1>上传简历</h1>
      <el-upload class="upload-demo" action="http://localhost:3000/user/upload/resume" ref="upload" name="resume" :data="uploadFrom" :multiple="false" :auto-upload="false" :on-success="handleSuccess" :before-upload="checkFile">
        <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
        <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">上传</el-button>
        <el-button style="margin-left: 10px;" size="small" @click="cancel" v-show="hasResume">取消</el-button>
        <div class="el-upload__tip" slot="tip">只能上传doc/pdf文件，不超过5M</div>
      </el-upload>
    </div>
    <div class="box" v-else>
      <h1>我的简历</h1>
      <p>{{resumeName}}</p>
      <a :href="'http://localhost:3000/public/download/resume/'+resumeName">下载</a>
      <el-button style="margin-left: 10px;" size="small" type="success" @click="toUpload">重新上传</el-button>
    </div>
  </div>
</template>

<script>true
import axios from 'axios'

export default {
  data () {
    return {
      showUpload: false,
      uploadFrom: {
        account: localStorage.getItem('user_account')
      },
      resumeName: '',
      hasResume: false
    }
  },
  mounted () {
    this.checkResume()
  },
  methods: {
    // 检查是否上传过简历
    checkResume () {
      axios
        .post('/user/checkresume', {
          account: localStorage.getItem('user_account')
        })
        .then(response => {
          if (response.data.retCode === 1) {
            this.hasResume = response.data.msg.hasResume
            this.showUpload = !response.data.msg.hasResume
            // 文件名
            this.resumeName = response.data.msg.resume.split('\\')[2]
            // console.log(this.resumeName)
          }
        })
        .catch(error => {
          console.log(error)
        })
    },
    // 上传前检查格式、大小
    checkFile (file) {
      if (file.type !== 'application/msword' & file.type !== 'application/pdf') {
        this.$message({
          type: 'error',
          message: '文件格式不正确'
        })
        return false
      } else if (file.size > 5 * 1000 * 1000) {
        this.$message({
          type: 'error',
          message: '文件过大'
        })
        return false
      } else {
        return true
      }
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
        this.checkResume()
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
.box {
  text-align: center;
  h1 {
    font-size: 1.8rem;
    color: #303133;
  }
}
</style>
