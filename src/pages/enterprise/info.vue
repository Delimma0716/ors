<template>
  <div>
    <el-form ref="form" :model="enForm" label-width="80px">
      <el-form-item label="企业名称">
        <el-input v-model="enForm.name"></el-input>
      </el-form-item>
      <el-form-item label="企业简介">
        <el-input
          type="textarea"
          :autosize="{ minRows: 5}"
          v-model="enForm.desc">
        </el-input>
      </el-form-item>
      <el-form-item label="企业地址">
        <el-input v-model="enForm.addr"></el-input>
      </el-form-item>
      <el-form-item label="联系方式">
        <el-input v-model="enForm.tel"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="save">保存</el-button>
        <el-button @click="init">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import axios from 'axios'

  export default {
    data() {
      return {
        enForm: {
          name: '',
          desc: '',
          addr:'',
          tel:''
        }
      }
    },
    mounted(){
      this.init()
    },
    methods: {
      // 获取数据库企业信息
      init(){
        axios
          .post('/enter/getinfo', {
            account: localStorage.getItem('en_account')
          })
          .then(response => {
            if (response.data.retCode === 1) {
              this.enForm.name=response.data.msg.en_name
              this.enForm.desc=response.data.msg.en_desc
              this.enForm.addr=response.data.msg.en_addr
              this.enForm.tel=response.data.msg.en_tel
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
      // 保存
      save() {
      // 弹出确认框
        this.$confirm('确定保存吗？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.update()
        })
      },
      // 更新数据库
      update(){
        axios
          .post('/enter/updateinfo', {
            account: localStorage.getItem('en_account'),
            name: this.enForm.name,
            desc: this.enForm.desc,
            addr: this.enForm.addr,
            tel: this.enForm.tel
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
          })
      }
    }
  }
</script>

<style lang="less" scoped>

</style>