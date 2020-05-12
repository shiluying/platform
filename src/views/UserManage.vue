<template>
  <div id="app">
    <el-row style="text-align: center;">
      <el-button
        size="mini"
        @click="doAdd()"
      >添加用户</el-button>
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
            label="用户密码"
            width="">
            <template slot-scope="scope">
              <span>{{ scope.row.pwd}}</span>
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
import UserEdit from '@/views/UserEdit'
export default {
  name: 'usermanage',
  components: {UserEdit},

  data () {
    return {
      userInfo: null,
      userList: [{
        user_id: '',
        name: '',
        pwd: '',
        type: '',
        examine: ''

      }],
      UserEdit: {
        show: false
      },
      FormData: {
        user_id: '',
        name: '',
        pwd: '',
        type: '',
        examine: ''
      }
    }
  },
  methods: {
    doAdd () {
      this.UserEdit.show = true
      this.FormData = {
        user_id: '',
        name: '',
        pwd: '',
        type: '',
        examine: ''
      }
    },
    doEdit (row) {
      this.userInfo = row
      this.UserEdit.show = true
      this.FormData = {
        user_id: row.user_id,
        name: row.name,
        pwd: row.pwd,
        type: row.type,
        examine: row.examine
      }
    },
    doDelete: function (row) {
      var _this = this
      this.$axios.get('/api/deleteUser/' + row.user_id)
        .then(
          function (response) {
            if (response.data) {
              _this.refresh()
            }
          }
        )
        .catch(function (error) { // 请求失败处理
          console.log(error)
        })
    },
    receive: function (data) {
      var _this = this
      if (this.userInfo === null) {
        this.$axios.get('/api/addUser/' + data.user_id + '/' + data.name + '/' + data.pwd + '/' + data.type + '/' + data.examine)
          .then(
            function (response) {
              if (response.data) {
                _this.refresh()
              }
            }
          )
          .catch(function (error) { // 请求失败处理
            console.log(error)
          })
      } else {
        if (this.userInfo.type !== data.type) {
          this.$axios.get('/api/changeUserType/' + this.userInfo.user_id + '/' + data.type)
            .then(
              function (response) {
                if (response.data) {
                  _this.refresh()
                }
              }
            )
            .catch(function (error) { // 请求失败处理
              console.log(error)
            })
        }
        if (this.userInfo.examine !== data.examine) {
          this.$axios.get('/api/changeUserExamine/' + this.userInfo.user_id + '/' + data.examine)
            .then(
              function (response) {
                if (response.data) {
                  _this.refresh()
                }
              }
            )
            .catch(function (error) { // 请求失败处理
              console.log(error)
            })
        }
        this.userInfo = null
      }
    },
    refresh () {
      var _this = this
      this.$axios.get('/api/findUser')
        .then(
          function (response) {
            _this.userList = response.data
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
          }
        )
        .catch(function (error) { // 请求失败处理
          console.log(error)
        })
    }
  },
  mounted () {
    var _this = this
    this.$axios.get('/api/findUser')
      .then(
        function (response) {
          _this.userList = response.data
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
        }
      )
      .catch(function (error) { // 请求失败处理
        console.log(error)
      })
  }
}
</script>

<style scoped>

</style>
