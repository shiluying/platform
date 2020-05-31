<template>
  <el-container>
    <el-header class="app-header">
      <div class="top-bar">
        <div class="row">
          <div class="col-md-6">
            <div class="action pull-right">
              <ul>
                <li><a  @click="userInfoEdit"><i class="fa fa-user"></i>我的信息</a></li>
                <li><a @click="logout"><i class="fa fa-lock" ></i>退出登录</a></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </el-header>
    <el-container>
      <el-aside>
        <div style="width: 60px; cursor: pointer;"
             @click.prevent="toggleSideBar">
          <i v-show="!isCollapse" class="el-icon-d-arrow-left"></i>
          <i v-show="isCollapse" class="el-icon-d-arrow-right"></i>
        </div>
        <div class="app-side-content">
          <el-menu
            router
            class="el-menu-vertical-demo"
            @open="handleOpen"
            :collapse="isCollapse">
            <template v-for="route in $router.options.routes" v-if="route.path==='/Container'&&route.children && route.children.length">
              <template v-for="item in route.children" >
                <el-menu-item
                  :key="item.path"
                  :index="item.path"
                >
                  <i class="el-icon-menu"></i>
                  <span slot="title">{{ item.name }}</span>
                </el-menu-item>
              </template>
            </template>
          </el-menu>
        </div>
      </el-aside>
      <el-main >
        <router-view/>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  name: 'Container',
  data () {
    return {
      user_id: '',
      isCollapse: false
    }
  },
  methods: {
    userInfoEdit () {

    },
    toggleSideBar () {
      this.isCollapse = !this.isCollapse
    },
    logout: function () {
      sessionStorage.removeItem('user_id')
      this.$router.push('/login')
    },
    handleOpen (key, keyPath) {
      console.log(key, keyPath)
    },
    handleClose (key, keyPath) {
      console.log(key, keyPath)
    },
    handleSelect (key, keyPath) {
      console.log(key, keyPath)
    }
  },
  mounted: function () {
    let id = sessionStorage.getItem('user_id')
    if (id) {
      this.user_id = id
    }
  }
}
</script>

<style scoped>
  @import "../../styles/style.css";
</style>
