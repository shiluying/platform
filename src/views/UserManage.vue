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
              <span>{{ scope.row.userid}}</span>
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
            label="用户权限"
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
                @click="doEdit(scope.$index,scope.row)"
              >编辑</el-button>
              <el-button
                size="mini"
                type="danger"
                @click="doDelete(scope.$index)"
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
      index: -1,
      tempList: [],
      userList: [{
        userid: '111',
        name: 'xxx',
        pwd: 'aaa',
        type: '管理员',
        examine: 'false'

      }],
      UserEdit: {
        show: false
      },
      FormData: {
        userid: '',
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
      this.index = -1
      this.FormData = {
        userid: '',
        name: '',
        pwd: '',
        type: '',
        examine: ''
      }
    },
    doEdit (index, row) {
      this.UserEdit.show = true
      this.index = index
      this.FormData = {
        userid: row.userid,
        name: row.name,
        pwd: row.pwd,
        type: row.type,
        examine: row.examine
      }
    },
    doDelete: function (index) {
      var temp = []
      for (var i = 0; i < this.tempList.length; i++) {
        if (this.userList[index] === this.tempList[i]) {
          continue
        } else {
          temp.push(this.tempList[i])
        }
      }
      this.tempList = temp
      this.userList = this.tempList
    },
    receive: function (data) {
      if (this.index !== -1) {
        var templist = []
        for (var num = 0; num < this.tempList.length; num++) {
          if (num === this.index) {
            templist.push(data)
          } else {
            templist.push(this.tempList[num])
          }
        }
        this.userList = templist
        this.tempList = this.userList
        this.index = -1
      } else {
        this.userList.push(data)
        this.tempList = this.userList
      }
    }
  },
  created () {
    this.tempList = this.userList
  }
}
</script>

<style scoped>

</style>
