<template>
  <div class="login-container">
    <el-form :model="loginForm" :rules="loginRules"
             status-icon
             ref="registerForm"
             label-position="left"
             label-width="0px"
             class="demo-ruleForm login-page">
      <h3 class="title">二手交易平台管理系统</h3>
      <el-form-item prop="email">
        <el-input type="text"
                  v-model="loginForm.email"
                  auto-complete="off"
                  placeholder="email"
        ></el-input>
      </el-form-item>
      <el-form-item prop="pwd">
        <el-input type="pwd"
                  v-model="loginForm.pwd"
                  auto-complete="off"
                  placeholder="password"
        ></el-input>
      </el-form-item>
      <el-form-item style="width:100%;">
        <el-button type="primary" style="width:100%;" @click="handleSubmit" :loading="logining">登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'AdminLogin',
  data () {
    return {
      logining: false,
      loginForm: {
        email: '163@qq.com',
        pwd: 'admin'
      },
      loginRules: {
        email: [{required: true, message: 'please enter your account name', trigger: 'blur'}],
        pwd: [{required: true, message: 'please enter your account password', trigger: 'blur'}]
      },
      checked: false
    }
  },
  methods: {
    // 跳转至登录页面
    login () {
      this.$router.push({ path: '/login' })
    },
    handleSubmit () {
      this.$axios.get('/api/checkAdminUser', {
        params: {
          email: this.loginForm.email,
          pwd: this.loginForm.pwd
        }
      }).then((resp) => {
        const data = resp.data
        console.log(data)
        if (data.status === 200) {
          sessionStorage.setItem('user_id', data.data.user_id)
          sessionStorage.setItem('examine', data.data.examine)
          sessionStorage.setItem('type', data.data.type)
          this.$router.push({
            name: 'AdminContainer'
          })
        } else {
          this.$notify.error({
            title: '登录信息',
            message: data.msg
          })
        }
      })
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
  label.el-checkbox.rememberme {
    margin: 0px 0px 15px;
    text-align: left;
  }
</style>
