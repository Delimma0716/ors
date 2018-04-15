<template>
  <div class="loginBox">
    <transition name="el-fade-in">
      <el-card class="box-card login-card" v-show="isLog&&(!isEnter)">
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
            <el-button type="text" @click="showEnterLog">企业端</el-button>
          </el-form-item>
        </el-form>
      </el-card>
    </transition>
    <transition name="el-fade-in">
      <el-card class="box-card reg-card" v-show="(!isLog)&&(!isEnter)">
        <el-form label-position="right" label-width="80px" :model="regForm">
          <el-form-item label="用户名">
            <el-input v-model="regForm.account"></el-input>
          </el-form-item>
          <el-form-item label="密码">
            <el-input v-model="regForm.password" type="password"></el-input>
          </el-form-item>
          <el-form-item label="确认密码">
            <el-input v-model="regForm.password2" type="password"></el-input>
            <p class="hint">{{hintmsg}}</p>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="register">注册</el-button>
            <el-button @click="showLog">登录</el-button>
            <el-button type="text" @click="showEnterLog">企业端</el-button>
          </el-form-item>
        </el-form>
      </el-card>
    </transition>
    <transition name="el-fade-in">
      <el-card class="box-card login-card" v-show="isLog&&isEnter">
        <el-form label-position="right" label-width="80px" :model="loginForm">
          <el-form-item label="企业号">
            <el-input v-model="loginForm.account"></el-input>
          </el-form-item>
          <el-form-item label="密码">
            <el-input v-model="loginForm.password" type="password"></el-input>
            <p class="hint">{{hintmsg}}</p>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="enterLogin">登录</el-button>
            <el-button @click="showEnterReg">注册</el-button>
            <el-button type="text" @click="showLog">用户端</el-button>
          </el-form-item>
        </el-form>
      </el-card>
    </transition>
    <transition name="el-fade-in">
      <el-card class="box-card reg-card" v-show="isEnter&&(!isLog)">
        <el-form label-position="right" label-width="80px" :model="regForm">
          <el-form-item label="企业号">
            <el-input v-model="regForm.account"></el-input>
          </el-form-item>
          <el-form-item label="密码">
            <el-input v-model="regForm.password" type="password"></el-input>
          </el-form-item>
          <el-form-item label="确认密码">
            <el-input v-model="regForm.password2" type="password"></el-input>
            <p class="hint">{{hintmsg}}</p>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="enterRegister">注册</el-button>
            <el-button @click="showEnterLog">登录</el-button>
            <el-button type="text" @click="showLog">用户端</el-button>
          </el-form-item>
        </el-form>
      </el-card>
    </transition>
    <router-link to="/admin" class="admin">管理员入口>>></router-link>
  </div>
</template>

<script>
import axios from 'axios'
//加密模块
import crypto from 'crypto'

export default {
  data () {
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
      enLoginForm: {
        account: '',
        password: ''
      },
      enRegForm: {
        account: '',
        password: '',
        password2: ''
      },
      // 表单提示文字
      hintmsg: '',
      // 是否显示登录框
      isLog: true,
      // 是否企业
      isEnter: false
    }
  },
  mounted () {
    // 已登陆过直接进入首页
    if (localStorage.getItem('user_account')) {
      this.$router.push('/apply')
    } else if (localStorage.getItem('en_account')) {
      this.$router.push('/enterprise/recruit')
    }
  },
  methods: {
    // 用户登录
    login () {
      this.hintmsg = ''
      // 校验表单是否完整
      if (this.loginForm.account === '') {
        this.hintmsg = '用户名为空'
      } else if (this.loginForm.password === '') {
        this.hintmsg = '密码为空'
      } else {
        // 密码md5加密
        let md5Pwd = crypto.createHash('md5').update(this.loginForm.password).digest('hex')
        axios
          .post('/user/login', {
            account: this.loginForm.account,
            password: md5Pwd
          })
          .then(response => {
            if (response.data.retCode === 1) {
              localStorage.setItem('user_account', this.loginForm.account)
              this.$router.push('/apply')
            } else {
              this.hintmsg = response.data.msg
            }
          })
          .catch(error => {
            console.log(error)
          })
      }
    },
    // 用户注册
    register () {
      this.hintmsg = ''
      // 校验表单是否完整
      if (this.regForm.account === '') {
        this.hintmsg = '用户名不能为空'
      } else if (this.regForm.password === '') {
        this.hintmsg = '密码不能为空'
      } else if (this.regForm.password !== this.regForm.password2) {
        this.hintmsg = '两次密码不一致'
      } else {
        // 密码md5加密
        let md5Pwd = crypto.createHash('md5').update(this.regForm.password).digest('hex')
        axios
          .post('/user/register', {
            account: this.regForm.account,
            password: md5Pwd
          })
          .then(response => {
            if (response.data.retCode === 1) {
              localStorage.setItem('user_account', this.regForm.account)
              this.$router.push('/apply')
            } else {
              this.hintmsg = response.data.msg
            }
          })
          .catch(error => {
            console.log(error)
          })
      }
    },
    // 企业登录
    enterLogin () {
      this.hintmsg = ''
      // 校验表单是否完整
      if (this.loginForm.account === '') {
        this.hintmsg = '企业号为空'
      } else if (this.loginForm.password === '') {
        this.hintmsg = '密码为空'
      } else {
        // 密码md5加密
        let md5Pwd = crypto.createHash('md5').update(this.loginForm.password).digest('hex')
        axios
          .post('/enter/login', {
            account: this.loginForm.account,
            password: md5Pwd
          })
          .then(response => {
            if (response.data.retCode === 1) {
              localStorage.setItem('en_account', this.loginForm.account)
              this.$router.push('/enterprise/recruit')
            } else {
              this.hintmsg = response.data.msg
            }
          })
          .catch(error => {
            console.log(error)
          })
      }
    },
    // 企业注册
    enterRegister () {
      console.log(this.regForm)
      this.hintmsg = ''
      // 校验表单是否完整
      if (this.regForm.account === '') {
        this.hintmsg = '企业号不能为空'
      } else if (this.regForm.password === '') {
        this.hintmsg = '密码不能为空'
      } else if (this.regForm.password !== this.regForm.password2) {
        this.hintmsg = '两次密码不一致'
      } else {
        // 密码md5加密
        let md5Pwd = crypto.createHash('md5').update(this.regForm.password).digest('hex')
        axios
          .post('/enter/register', {
            account: this.regForm.account,
            password: md5Pwd
          })
          .then(response => {
            if (response.data.retCode === 1) {
              localStorage.setItem('en_account', this.regForm.account)
              this.$router.push('/enterprise/recruit')
            } else {
              this.hintmsg = response.data.msg
            }
          })
          .catch(error => {
            console.log(error)
          })
      }
    },
    // 登录注册框切换
    showLog () {
      this.isLog = true
      this.isEnter = false
    },
    showReg () {
      this.isLog = false
      this.isEnter = false
    },
    // 企业注册切换
    showEnterLog () {
      this.isLog = true
      this.isEnter = true
    },
    showEnterReg () {
      this.isLog = false
      this.isEnter = true
    }
  }
}
</script>

<style lang="less" scoped>
.loginBox {
  width: 100%;
  height: 100%;
  background: url('../../static/imgs/cruit.jpg') no-repeat 0 0;
  background-size: cover;
  .box-card {
    padding: 30px 30px 0 0;
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
  .admin{
    position:absolute;
    bottom:20px;
    width:100%;
    text-align:center;
    pointer:cursor;
  }
}
</style>