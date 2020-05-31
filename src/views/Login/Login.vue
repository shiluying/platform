<template>
  <div id="login">
    <div class="header">
    </div>
    <div class="content">
      <div class="login-form">
        <div class="form-wrap">
          <h2>二手交易平台登录</h2><br/>
          <div class="login-switch-tab">
            <a href="#"  v-for="(item, index) in menuTab" :key="item.id" :class="{'item-active':item.isActive}" @click="toggleMenu(item, index)">{{ item.txt }}</a>
          </div>

          <el-form :model="loginForm" v-show="menuTab[0].isActive" status-icon :rules="rules" ref="loginForm">
            <el-form-item prop="email" props="email">
              <el-input v-model="loginForm.email" placeholder="email" prefix-icon="el-icon-user-solid"></el-input>
            </el-form-item>
            <el-form-item prop="pwd">
              <el-input type="password" v-model="loginForm.pwd" placeholder="password" prefix-icon="el-icon-lock"></el-input>
            </el-form-item>
            <el-button type="primary" @click="login()">登录</el-button>
            <div class="form-bottom">
              <a href="/AdminLogin">转到管理系统</a>
            </div>
          </el-form>
          <el-form :model="registerForm" status-icon :rules="rules" ref="registerForm" v-show="menuTab[1].isActive">
            <el-form-item prop="name">
              <el-input v-model="registerForm.name" placeholder="name" prefix-icon="el-icon-user"></el-input>
            </el-form-item>
            <el-form-item prop="email">
              <el-input v-model="registerForm.email" placeholder="email" prefix-icon="el-icon-user-solid"></el-input>
            </el-form-item>
            <el-form-item prop="pwd">
              <el-input type="password" v-model="registerForm.pwd" placeholder="password" prefix-icon="el-icon-lock"></el-input>
            </el-form-item>
            <el-button type="danger" @click="register()">注册</el-button>
          </el-form>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    var validatePwd = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      }
      callback()
    }
    var validateEmail = (rule, value, callback) => {
      const reg = '^\\w+([-+.]\\w+)*@\\w+([-.]\\w+)*\\.\\w+([-.]\\w+)*$'
      if (value === '') {
        callback(new Error('请输入邮箱'))
      } else if (value.search(reg)) {
        callback(new Error('请输入正确的邮箱格式'))
      } else {
        callback()
      }
    }
    var validateName = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入用户名'))
      } else {
        callback()
      }
    }
    return {
      loginForm: {
        email: '163@qq.com',
        pwd: 'admin'
      },
      registerForm: {
        name: 'test',
        email: '109@qq.com',
        pwd: 'test'
      },
      menuTab: [
        { txt: '登录', isActive: true },
        { txt: '注册', isActive: false }
      ],
      rules: {
        pwd: [
          { validator: validatePwd, trigger: 'blur' }
        ],
        name: [
          { validator: validateName, trigger: 'blur' }
        ],
        email: [
          { validator: validateEmail, trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    toggleMenu (item, index) {
      if (item.isActive !== true) {
        this.menuTab[1 - index].isActive = item.isActive
        item.isActive = !item.isActive
      }
    },
    login () {
      this.$axios.get('/api/checkUser', {
        params: {
          email: this.loginForm.email,
          pwd: this.loginForm.pwd
        }
      }).then((resp) => {
        const data = resp.data
        console.log(data)
        if (data.status === 200) {
          sessionStorage.setItem('user_id', data.data.user_id)
          this.$router.push({
            name: 'Container'
          })
        } else {
          this.$notify.error({
            title: '登录信息',
            message: data.msg
          })
        }
      })
    },
    register () {
      this.$axios.post('/api/addUser/', this.registerForm).then((resp) => {
        const data = resp.data
        console.log(data)
        if (data.status === 200) {
          this.$notify({
            title: '注册信息',
            message: data.msg,
            type: 'success'
          })
          this.registerForm = []
          this.menuTab[0].isActive = true
          this.menuTab[1].isActive = false
        } else {
          this.$notify.error({
            title: '注册信息',
            message: data.msg
          })
        }
      })
    }
  }
}
</script>
<style lang="css">
  #login {
    min-width: 1190px;
    width: 100%;
    padding: 22px 0;
    align-items: center;
  }
  .header {
    margin: 0 18vw;
    height: 44px;
  }
  .content {
    background-color: rgb(198, 235, 253);
    margin-top: 25px;
    display: flex;
    position: relative;}

  .login-form {
    width: 350px;
    height: 400px;
    display: flex;
    position: absolute;
    top: 91px;
    right: 42%;
    background-color: #fff;
    justify-content: center;}

  .form-wrap {
    margin: 0 25px;
    width: 100%;}

  .login-switch-tab {
    margin-bottom: 20px;
    margin-top: 20px;}

  .item-active {
    border-bottom:2px solid #000000;
  }

  a {
    height: 18px;
    line-height: 5px;
    font-size: 16px;
    color: #3c3c3c;
    margin: 9px 20px 0 5px;
    font-weight: 700;
  }
  .el-button--primary {
    width: 100%;
  }
  .el-button--danger {
    width: 100%;
  }
</style>
