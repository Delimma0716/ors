<template>
  <div class="loginBox">
    <transition name="el-fade-in">
      <el-card class="box-card login-card" v-show="isLog">
        <el-form label-position="right" label-width="80px" :model="loginForm">
          <el-form-item label="用户名">
            <el-input v-model="loginForm.account"></el-input>
          </el-form-item>
          <el-form-item label="密码">
            <el-input v-model="loginForm.password" type="password"></el-input>
            <p class="hint">{{hintmsg}}</p>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="login">登录</el-button>
            <el-button @click="showReg">注册</el-button>
            <el-button type="text" @click="showEnterReg">企业注册</el-button>
          </el-form-item>
        </el-form>
      </el-card>
    </transition>
    <transition name="el-fade-in">
      <el-card class="box-card reg-card" v-show="!isLog">
        <el-form label-position="right" label-width="80px" :model="loginForm">
          <el-form-item label="用户名">
            <el-input v-model="loginForm.account"></el-input>
          </el-form-item>
          <el-form-item label="密码">
            <el-input v-model="loginForm.password" type="password"></el-input>
          </el-form-item>
          <el-form-item label="确认密码">
            <el-input v-model="loginForm.password" type="password"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="register">注册</el-button>
            <el-button @click="showReg">登录</el-button>
          </el-form-item>
        </el-form>
      </el-card>
    </transition>
    <transition name="el-fade-in">
      <el-card class="box-card reg-card" v-show="isEnter">
        <el-form label-position="right" label-width="80px" :model="regForm">
          <el-form-item label="企业账号">
            <el-input v-model="regForm.account"></el-input>
          </el-form-item>
          <el-form-item label="密码">
            <el-input v-model="regForm.password" type="password"></el-input>
          </el-form-item>
          <el-form-item label="确认密码">
            <el-input v-model="regForm.password2" type="password"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="register">注册</el-button>
            <el-button @click="showReg">登录</el-button>
          </el-form-item>
        </el-form>
      </el-card>
    </transition>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data() {
    return {
      // 表单参数
      loginForm: {
        account: '',
        password: ''
      },
      regForm: {
        account: '',
        password: '',
        password2: ''
      },
      // 表单提示文字
      hintmsg: '',
      // 是否显示登录框
      isLog: true,
      // 是否企业注册
      isEnter: false
    }
  },
  mounted() {},
  methods: {
    // 用户登录
    login() {
      this.hintmsg = ''
      // 校验表单是否完整
      if (this.loginForm.account === '') {
        this.hintmsg = '用户名为空'
      } else if (this.loginForm.password === '') {
        this.hintmsg = '密码为空'
      }
      axios
        .post('/user/login', {
          account: this.loginForm.account,
          password: this.loginForm.password
        })
        .then(response => {
          console.log(response)
        })
        .catch(error => {
          console.log(error)
        })
    },
    // 注册
    register() {},
    // 登录注册框切换
    showReg() {
      this.isLog = !this.isLog
      this.isEnter = !this.isEnter
    },
    // 企业注册切换
    showEnterReg() {
      this.isLog = !this.isLog
      this.isEnter = true
    }
  }
}
</script>

<style lang="less" scoped>
.loginBox {
  width: 100%;
  height: 40%;
  background: #c1daf0;
  .box-card {
    padding: 30px 40px 0 0;
    position: absolute;
    top: 25%;
    right: 200px;
    .el-input {
      width: 240px;
    }
    .hint {
      color: #419ae7;
      margin: 0;
      line-height: 24px;
    }
  }
}
</style>