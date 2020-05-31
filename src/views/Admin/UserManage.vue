<template>
  <div id="app">
    <el-row style="text-align: center;">
      <div class="table">
        <el-table
          :data="userList"
          border
          style="width: 100%">
          <el-table-column
            label="用户ID"
            width="">
            <template slot-scope="scope">
              <span>{{ scope.row.user_id}}</span>
            </template>
          </el-table-column>
          <el-table-column
          label="用户名"
          width="">
          <template slot-scope="scope">
            <span>{{ scope.row.name}}</span>
          </template>
        </el-table-column>
          <el-table-column
            label="邮箱"
            width="">
            <template slot-scope="scope">
              <span>{{ scope.row.email}}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="用户类型"
            width="">
            <template slot-scope="scope">
              <span>{{ scope.row.type}}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="商品审核权限"
            width="">
            <template slot-scope="scope">
              <span>{{ scope.row.examine}}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="操作"
            width="">
            <template slot-scope="scope">
              <el-button
                size="mini"
                @click="doEdit(scope.row)"
              >编辑</el-button>
              <el-button
                size="mini"
                type="danger"
                @click="doDelete(scope.row)"
              >删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </el-row>
    <UserEdit :UserEdit="UserEdit" :FormData="FormData" @update="receive"></UserEdit>
  </div>

</template>

<script>
import UserEdit from '@/views/Admin/UserEdit'
export default {
  name: 'usermanage',
  components: {UserEdit},

  data () {
    return {
      userInfo: null,
      userList: [{
        user_id: '',
        name: '',
        type: '',
        examine: ''

      }],
      UserEdit: {
        show: false
      },
      FormData: {
        user_id: '',
        name: '',
        email: '',
        type: '',
        examine: ''
      }
    }
  },
  methods: {
    doEdit (row) {
      this.userInfo = row
      if (this.userInfo.type === '普通用户') {
        this.userInfo.type = 0
      } else if (this.userInfo.type === '管理员') {
        this.userInfo.type = 1
      }
      if (this.userInfo.examine === '无') {
        this.userInfo.examine = 0
      } else if (this.userInfo.examine === '有') {
        this.userInfo.examine = 1
      }
      this.UserEdit.show = true
      this.FormData = {
        user_id: row.user_id,
        name: row.name,
        email: row.email,
        type: row.type,
        examine: row.examine
      }
    },
    doDelete: function (row) {
      var _this = this
      this.$axios.delete('/api/deleteUser/?id=' + row.user_id)
        .then(
          function (response) {
            _this.$alert(response.data.msg, 'info', {
              confirmButtonText: 'ok'
            })
            _this.refresh()
          }
        )
        .catch(function (error) { // 请求失败处理
          console.log(error)
        })
    },
    receive: function (data) {
      console.log(data)
      var _this = this
      // 修改用户类型
      if (this.userInfo.type !== data.type) {
        this.$axios.put('/api/changeUserType/', data)
          .then(
            function (response) {
              _this.$alert(response.data.msg, 'info', {
                confirmButtonText: 'ok'
              })
            }
          )
          .catch(function (error) { // 请求失败处理
            console.log(error)
          })
      }
      // 修改用户权限
      if (this.userInfo.examine !== data.examine) {
        this.$axios.put('/api/changeUserExamine/', data)
          .then(
            function (response) {
              _this.$alert(response.data.msg, 'info', {
                confirmButtonText: 'ok'
              })
            }
          )
          .catch(function (error) { // 请求失败处理
            console.log(error)
          })
      }
      _this.refresh()
    },
    refresh () {
      var _this = this
      // 普通用户没有用户管理权限
      if (sessionStorage.getItem('type') === 0) {
        return
      }
      this.$axios.get('/api/findAllUser')
        .then(
          function (response) {
            if (response.data.status === 200) {
              _this.userList = response.data.data
              // 对数据进行处理
              _this.userList.map(function (val) {
                if (val.type === 0) {
                  val.type = '普通用户'
                } else if (val.type === 1) {
                  val.type = '管理员'
                }
                if (val.examine === 0) {
                  val.examine = '无'
                } else if (val.examine === 1) {
                  val.examine = '有'
                }
              })
            } else {
              _this.$alert(response.msg, 'info', {
                confirmButtonText: 'ok'
              })
            }
          }
        )
        .catch(function (error) { // 请求失败处理
          console.log(error)
        })
    }
  },
  mounted () {
    this.refresh()
  }
}
</script>

<style scoped>

</style>
