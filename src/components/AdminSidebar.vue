<template>
  <div>
    <el-menu class="el-menu-vertical-demo"
             :default-active="defaultActive"
             router
             :collapse="collapse"
    >
      <SidebarItem v-for="(item, idx) in routes"
                   :subroute="item"
                   :fatherpath="fatherPath"
                   :barIdx="idx" :key="idx" />
    </el-menu>
  </div>
</template>

<script>
import AdminSidebarItem from './AdminSidebarItem'
export default {
  name: 'AdminSidebarItem',
  components: {
    AdminSidebarItem
  },
  props: {
    collapse: {
      type: Boolean
    },
    routes: {
      type: Array
    }
  },
  computed: {
    // 首次进入页面时展开当前页面所属的菜单
    defaultActive () {
      return this.$route.path
    },
    fatherPath () {
      // 这里直接获取路由配置的 '/' 项
      console.log(this.$router.options.routes)
      return this.$router.options.routes[0].path
    }
  }
}
</script>
<style>
</style>
