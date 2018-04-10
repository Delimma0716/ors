<template>
  <div>
    <div class="infoBox">
      <el-form ref="form" :model="userForm" label-width="80px">
        <el-form-item label="真实姓名">
          <el-input v-model="userForm.name"></el-input>
        </el-form-item>
        <el-form-item label="身份证号">
          <el-input v-model="userForm.idCard"></el-input>
        </el-form-item>
        <el-form-item label="性别">
          <el-input v-model="userForm.sex"></el-input>
        </el-form-item>
        <el-form-item label="出生年月">
          <el-input v-model="userForm.birth"></el-input>
        </el-form-item>
        <el-form-item label="联系方式">
          <el-input v-model="userForm.tel"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="save">保存</el-button>
          <el-button @click="init">取消</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data () {
    return {
      userForm: {
        name: '',
        idCard: '',
        sex: '',
        birth: '',
        tel: ''
      }
    }
  },
  mounted () {
    this.init()
  },
  methods: {
    // 获取数据库个人信息
    init () {
      axios
        .post('/user/getinfo', {
          account: localStorage.getItem('user_account')
        })
        .then(response => {
          if (response.data.retCode === 1) {
            this.userForm.name = response.data.msg.user_name
            this.userForm.idCard = response.data.msg.user_idCard
            this.userForm.sex = response.data.msg.user_sex
            this.userForm.birth = response.data.msg.user_birth
            this.userForm.tel = response.data.msg.user_tel
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
    save () {
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
    update () {
      axios
        .post('/user/updateinfo', {
          account: localStorage.getItem('user_account'),
          name: this.userForm.name,
          idCard: this.userForm.idCard,
          sex: this.userForm.sex,
          birth: this.userForm.birth,
          tel: this.userForm.tel
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
.infoBox {
  width: 50%;
  margin: 0 auto;
}
</style>