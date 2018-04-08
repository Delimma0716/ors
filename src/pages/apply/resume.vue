<template>
  <div class="box">
    <h1>请上传简历</h1>
    <el-upload
      class="upload-demo"
      action="http://localhost:3000/user/upload/resume"
      ref="upload"
      name="resume"
      :data="uploadFrom"
      :multiple="false"
      :auto-upload="false"
      :on-success="handleSuccess"
      :before-upload="checkFile">
      <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
      <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">上传</el-button>
      <div class="el-upload__tip" slot="tip">只能上传一个doc/docx/pdf文件</div>
    </el-upload>
  </div>
</template>

<script>
  export default{
    data() {
      return {
        uploadFrom:{
          account:localStorage.getItem('user_account')
        }
      }
    },
    methods:{
      checkFile(file){
        console.log(file)
      },
      // 上传文件
      submitUpload() {
        this.$refs.upload.submit()
      },
      // 上传成功回调
      handleSuccess(response, file, fileList){
        if (response.retCode === 1) {
          this.$message({
            type: 'success',
            message: response.msg
          })
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