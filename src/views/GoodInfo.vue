<template>
<div id="app">
  <el-row style="text-align: left;">
    <el-button
      size="mini"
      @click="doAdd()"
    >添加商品</el-button>
  </el-row>
  <br/>
  <el-row style="text-align: center;">
    <div class="table">
      <el-table
        :data="goodList"
        border
        style="width: 100%">
        <el-table-column
          label="商品ID"
          width="">
          <template slot-scope="scope">
            <span>{{ scope.row.good_id}}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="商品状态"
          width="">
          <template slot-scope="scope">
            <span>{{ scope.row.state}}</span>
          </template>
        </el-table-column>
        <!--<el-table-column-->
        <!--label="商品图片"-->
        <!--width="">-->
        <!--<template slot-scope="scope">-->
        <!--<span>{{ scope.row.photo}}</span>-->
        <!--</template>-->
        <!--</el-table-column>-->
        <el-table-column
          label="商品描述"
          width="">
          <template slot-scope="scope">
            <span>{{ scope.row.good_describe}}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="商品价格"
          width="">
          <template slot-scope="scope">
            <span>{{ scope.row.price}}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="操作"
          width="">
          <template slot-scope="scope">
            <el-button
              size="mini"
              @click="doEdit(scope.row)"
            >修改</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </el-row>
  <GoodEdit :GoodEdit="GoodEdit" :FormData="FormData" @update="receive"></GoodEdit>
</div>
</template>

<script>
import GoodEdit from '@/views/GoodEdit'
export default {
  name: 'GoodInfo',
  components: {GoodEdit},
  data: function () {
    return {
      GoodEdit: {
        show: false
      },
      goodList: [
        {
          good_id: '',
          state: '',
          good_describe: '',
          price: ''
        }
      ],
      filter: '',
      FormData: {
        good_id: '',
        state: '',
        good_describe: '',
        price: ''
      },
      OrderCheck: {
        show: false
      }
    }
  },
  methods: {
    doEdit (row) {
      this.GoodEdit.show = true
      this.FormData = {
        good_id: row.good_id,
        state: row.state,
        good_describe: row.good_describe,
        price: row.price
      }
    },
    doAdd () {
      this.GoodEdit.show = true
      this.FormData = {
        good_id: '',
        state: '待审核',
        good_describe: '',
        price: ''
      }
    },
    refresh () {
      var _this = this
      this.$axios.get('/api/findAllByUserId/' + sessionStorage.getItem('user_id'))
        .then(
          function (response) {
            if (response.status === 200) {
              _this.goodList = response.data.data
              // 对数据进行处理
              _this.goodList.map(function (val) {
                if (val.state === 0) {
                  val.state = '待审核'
                } else if (val.state === -1) {
                  val.state = '审核失败'
                } else if (val.state === 1) {
                  val.state = '已发布'
                } else if (val.state === 2) {
                  val.state = '已锁定'
                } else if (val.state === 3) {
                  val.state = '已交易'
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
    },
    receive: function (data) {
      var _this = this
      if (data.good_id === '') { // 添加商品
        this.$axios.get('/api/addGood/' + data.good_describe + '/' + data.price + '/' + sessionStorage.getItem('user_id'))
          .then(
            function (response) {
              if (response.data.status === 200) {
                _this.$alert(response.data.msg, 'info', {
                  confirmButtonText: 'ok'
                })
                _this.refresh()
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
      } else { // 修改商品
        this.$axios.get('/api/changeGood/' + data.good_id + '/' + 0 + '/' + data.good_describe + '/' + data.price)
          .then(
            function (response) {
              if (response.status === 200) {
                _this.$alert(response.data.msg, 'info', {
                  confirmButtonText: 'ok'
                })
                _this.refresh()
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
    }
  },
  mounted () {
    var _this = this
    this.$axios.get('/api/findAllByUserId/' + sessionStorage.getItem('user_id'))
      .then(
        function (response) {
          if (response.status === 200) {
            _this.goodList = response.data.data
            // 对数据进行处理
            _this.goodList.map(function (val) {
              if (val.state === 0) {
                val.state = '待审核'
              } else if (val.state === -1) {
                val.state = '审核失败'
              } else if (val.state === 1) {
                val.state = '已发布'
              } else if (val.state === 2) {
                val.state = '已锁定'
              } else if (val.state === 3) {
                val.state = '已交易'
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
}
</script>

<style scoped>

</style>
