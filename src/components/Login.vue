<template>
  <div class="login-container">
    <el-form :model="LoginForm" :rules="LoginFormRules"
             status-icon
             ref="LoginForm"
             label-position="left"
             label-width="0px"
             class="demo-ruleForm login-page">
      <h3 class="title">系统登录</h3>
      <el-form-item prop="username">
        <template slot="prepend"><span class="fa fa-user fa-lg" style="width: 13px"></span></template>
        <el-input type="text"
                  v-model="LoginForm.user_id"
                  auto-complete="off"
                  placeholder="用户ID"
        ></el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input type="password"
                  v-model="LoginForm.password"
                  auto-complete="off"
                  placeholder="密码"
        ></el-input>
        <template slot="prepend"><span class="fa fa-lock fa-lg" style="width: 13px"></span></template>
        <template slot="suffix"><span class="password-eye" @click="showPassword" :class="eyeType"></span></template>
      </el-form-item>
      <el-checkbox
        v-model="checked"
        class="RememberPwd"
      >记住密码</el-checkbox>
      <el-form-item style="width:100%;">
        <el-button type="primary" style="width:100%;" @click="handleSubmit" :loading="logining">登录</el-button>
      </el-form-item>
      <el-form-item style="width:100%;">
        <el-button type="" style="width:100%;" @click="handleRegister">注册账号</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data () {
    return {
      logining: false,
      LoginForm: {
        user_id: '0',
        password: 'admin'
      },
      LoginFormRules: {
        user_id: [{required: true, message: 'please enter your account', trigger: 'blur'}],
        password: [{required: true, message: 'enter your password', trigger: 'blur'}]
      },
      checked: false
    }
  },
  methods: {
    handleRegister () {
      this.$router.push({path: '/register'})
    },
    handleSubmit (event) {
      this.$refs.LoginForm.validate((valid) => {
        // 设置状态为正在登录中
        this.logining = true
        var _this = this
        if (valid) {
          _this.$axios.get('/api/checkUser/' + this.LoginForm.user_id + '/' + this.LoginForm.password)
            .then(
              function (response) {
                // 登录成功
                if (response.status === 200) {
                  var userInfo = response.data.data
                  if (userInfo.type === 1) {
                    sessionStorage.setItem('user_id', userInfo.user_id)
                    _this.$router.push({path: '/container'})
                  } else if (userInfo.type === 0) {
                    sessionStorage.setItem('user_id', userInfo.user_id)
                    _this.$router.push({path: '/usercontainer'})
                  }
                } else { // 登录失败
                  _this.$alert('username or password wrong!', 'info', {
                    confirmButtonText: 'ok'
                  })
                }
                _this.logining = false
              }
            )
            .catch(function (error) { // 请求失败处理
              console.log(error)
            })
        } else {
          console.log('error submit!')
          return false
        }
      })
    },
    showPassword () {
      if (this.pwdType === 'password') {
        this.pwdType = ''
        this.eyeType = 'fa fa-eye fa-lg'
      } else {
        this.pwdType = 'password'
        this.eyeType = 'fa fa-eye-slash fa-lg'
      }
    },
    setCookie (name, pass, days) {
      let expire = new Date()
      expire.setDate(expire.getDate() + days)
      document.cookie = `C-username=${name};expires=${expire}`
      document.cookie = `C-password=${pass};expires=${expire}`
    },
    getCookie () {
      if (document.cookie.length) {
        let arr = document.cookie.split('; ')
        for (let i = 0; i < arr.length; i++) {
          let arr2 = arr[i].split('=')
          if (arr2[0] === 'C-username') {
            this.LoginForm.user_id = arr2[1]
          } else if (arr2[0] === 'C-password') {
            this.LoginForm.password = arr2[1]
            this.RememberPwd = true
            if (this.rememberme) {
              this.setCookie(this.LoginForm.username, this.LoginForm.password, 7)
            } else {
              this.deleteCookie()
            }
          }
        }
      }
    },
    deleteCookie () {
      this.setCookie('', '', -1)
    },
    mounted () {
      this.getCookie()
    }
  }
}
</script>

<style scoped>
  .login-container {
    width: 100%;
    height: 100%;
  }
  .login-page {
    -webkit-border-radius: 5px;
    border-radius: 5px;
    margin: 180px auto;
    width: 350px;
    padding: 35px 35px 15px;
    background: #fff;
    border: 1px solid #eaeaea;
    box-shadow: 0 0 25px #cac6c6;
  }
  label.el-checkbox.RememberPwd {
    margin: 0px 0px 15px;
    text-align: left;
  }
</style>
