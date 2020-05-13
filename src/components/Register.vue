<template>
  <div class="login-container">
    <el-form :model="registerForm" :rules="registerRules"
             status-icon
             ref="registerForm"
             label-position="left"
             label-width="0px"
             class="demo-ruleForm login-page">
      <h3 class="title">系统注册</h3>
      <el-form-item prop="user_id">
        <el-input type="text"
                  v-model="registerForm.user_id"
                  auto-complete="off"
                  placeholder="用户ID"
        ></el-input>
      </el-form-item>
      <el-form-item prop="name">
        <el-input type="text"
                  v-model="registerForm.name"
                  auto-complete="off"
                  placeholder="用户名"
        ></el-input>
      </el-form-item>
      <el-form-item prop="pwd">
        <el-input type="pwd"
                  v-model="registerForm.pwd"
                  auto-complete="off"
                  placeholder="密码"
        ></el-input>
      </el-form-item>
      <p>仅支持普通用户注册,注册后自动登录系统</p>
      <el-form-item style="width:100%;">
        <el-button type="primary" style="width:100%;" @click="handleSubmit" :loading="logining">注册</el-button>
      </el-form-item>
        <el-form-item style="width:100%;">
        <el-button type="" style="width:100%;" @click="login">转到登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'Register',
  data () {
    return {
      logining: false,
      registerForm: {
        name: '',
        pwd: ''
      },
      registerRules: {
        user_id: [{required: true, message: 'please enter your account ID', trigger: 'blur'}],
        name: [{required: true, message: 'please enter your account name', trigger: 'blur'}],
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
    handleSubmit (event) {
      this.$refs.registerForm.validate((valid) => {
        if (valid) {
          var _this = this
          this.$axios.get('/api/addUser/' + this.registerForm.user_id + '/' + this.registerForm.name + '/' + this.registerForm.pwd + '/0/0')
            .then(
              function (response) {
                if (response.data) {
                  _this.$router.push({ path: '/container' })
                }
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
