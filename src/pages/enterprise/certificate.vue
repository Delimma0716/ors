<template>
  <div class="box">
    <h1>请上传营业执照</h1>
    <el-upload
      class="upload-demo"
      drag
      action="https://jsonplaceholder.typicode.com/posts/"
      multiple
      :before-upload="checkFile">
      <i class="el-icon-upload"></i>
      <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
      <div class="el-upload__tip" slot="tip">只能上传jpg/png文件,可上传多个</div>
    </el-upload>
  </div>
</template>

<script>
  export default{
    methods:{
      checkFile(file){
        console.log(file)
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