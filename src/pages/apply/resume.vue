<template>
  <div>
    <div class="box" v-if="upload">
      <h1>上传简历</h1>
      <el-upload class="upload-demo" action="http://localhost:3000/user/upload/resume" ref="upload" name="resume" :data="uploadFrom" :multiple="false" :auto-upload="false" :on-success="handleSuccess" :before-upload="checkFile">
        <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
        <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">上传</el-button>
        <el-button style="margin-left: 10px;" size="small" @click="cancel">取消</el-button>
        <div class="el-upload__tip" slot="tip">只能上传一个doc/docx/pdf文件</div>
      </el-upload>
    </div>
    <div class="box" v-else>
      <h1>我的简历</h1>
      <el-button size="small" type="primary">查看</el-button>
      <el-button style="margin-left: 10px;" size="small" type="success" @click="toUpload">重新上传</el-button>
    </div>
  </div>
</template>

<script>true
import axios from 'axios'

export default {
  data () {
    return {
      upload: false,
      uploadFrom: {
        account: localStorage.getItem('user_account')
      }
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
            this.upload = !response.data.msg
          }
        })
        .catch(error => {
          console.log(error)
        })
    },
    // 重新上传
    toUpload () {
      this.upload = true
    },
    // 取消
    cancel () {
      this.upload = false
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
        this.upload = false
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