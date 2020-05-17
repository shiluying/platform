<template>
  <div class="app-side-content">
    <el-container>
      <el-main>
        <el-row style="text-align: center;">
          <el-form :inline="true">
            <el-form-item style="float: left" label="查询:">
              <el-input v-model="filter" @change="doSearch" placeholder="对商品id进行查询"></el-input>
            </el-form-item>
          </el-form>
        </el-row>
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
                label="卖家ID"
                width="">
                <template slot-scope="scope">
                  <span>{{ scope.row.user_id}}</span>
                </template>
              </el-table-column>
              <el-table-column
                label="操作"
                width="">
                <template slot-scope="scope">
                  <el-button
                    size="mini"
                    @click="doOrder(scope.row)"
                  >购买</el-button>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </el-row>
      </el-main>
    </el-container>
    <OrderCheck :OrderCheck="OrderCheck" :FormData="FormData" @update="receive"></OrderCheck>
  </div>
</template>

<script>
import OrderCheck from './OrderCheck'
export default {
  name: 'GoodSearch',
  components: {OrderCheck},
  data: function () {
    return {
      goodList: [
        {
          good_id: '',
          state: '',
          good_describe: '',
          price: '',
          user_id: ''
        }
      ],
      filter: '',
      FormData: {
        good_id: '',
        state: '',
        good_describe: '',
        price: '',
        user_id: ''
      },
      OrderCheck: {
        show: false
      }
    }
  },
  methods: {
    doSearch () {
      if (this.filter !== '') { // 执行查询操作
        var _this = this
        this.$axios.get('/api/findGood/' + _this.filter)
          .then(
            function (response) {
              if (response.data.status === 200) {
                _this.goodList = []
                _this.goodList[0] = response.data.data
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
                _this.$alert(response.data.msg, 'info', {
                  confirmButtonText: 'ok'
                })
              }
            }
          )
          .catch(function (error) { // 请求失败处理
            console.log(error)
          })
      } else { // 返回全部结果
        this.refresh()
      }
    },
    refresh () {
      var _this = this
      this.$axios.get('/api/findGood')
        .then(
          function (response) {
            if (response.data.status === 200) {
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
    doOrder (row) {
      var _this = this
      this.$axios.get('/api/changeGoodState/' + row.good_id + '/' + 2)
        .then(
          function (response) {
            if (response.data.status === 200) {
              _this.FormData = response.data.data
              _this.FormData.state = '已锁定'
              _this.OrderCheck.show = true
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
    },
    receive: function (data) {
      this.refresh()
    }
  },
  mounted () {
    var _this = this
    this.$axios.get('/api/findGood')
      .then(
        function (response) {
          console.log(response)
          if (response.data.status === 200) {
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
</script>

<style scoped>

</style>
