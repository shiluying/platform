<template>
  <div class="app">
    <el-col :span="10" v-for="order in this.orderList" :key="order.order_id" :offset="1">
      <el-card style="height:  300px;">
        <el-row>
        <el-col :span="10" style="padding: 14px;">
          <div style="font-size: 15px;text-align: left;height: 200px;" >
            <el-row><b>订单ID: </b>{{order.order_id}}</el-row>
            <el-row><b>商品ID: </b>{{order.good_id}}</el-row>
            <el-row><b>商品状态:</b> {{order.state}}</el-row>
            <el-row><b>实付款:</b> {{order.price}}</el-row>
            <el-row><b>卖家ID:</b> {{order.seller_id}}</el-row>
            <el-row><b>买家ID:</b> {{order.buyer_id}}</el-row>
            <el-row><b>交易地址:</b> {{order.place}}</el-row>
            <el-row><b>交易时间:</b> {{order.date}}</el-row>
            <el-row><b>创建时间:</b> {{order.time}}</el-row>
          </div>
        </el-col>
          <el-col :span="5" style="padding: 14px;float: right;text-align: center;" >
            <div  v-if="order.state == '待收货'">
              <el-button type="primary" @click="changeOrderState(order.order_id,2)">确认收货</el-button>
              <el-button type="danger" @click="cancelBuy(order.order_id,order.good_id)">取消订单</el-button>
            </div>
            <div  v-else-if="order.state == '待付款'">
              <el-button type="primary" @click="confirmBuy(order.order_id,order.good_id)">付款</el-button><br/><br/>
              <el-button type="danger" @click="cancelBuy(order.order_id,order.good_id)">取消订单</el-button>
            </div>
            <div  v-if="order.state == '待评价'">
              <el-button type="" @click="doUserComment">进行用户评价</el-button>
              <el-button type="" @click="doGoodComment">进行商品评价</el-button>
            </div>
        </el-col>
        </el-row>
      </el-card>
      <br/>
    </el-col>
  </div>
</template>

<script>
export default {
  name: 'OrderInfo',
  data: function () {
    return {
      css_width: '333px',
      css_height: '500px',
      filter: '',
      orderList: {
        order_id: '',
        good_id: '',
        buyer_id: '',
        price: '',
        seller_id: '',
        state: '',
        time: ''
      },
      OrderCheck: {
        show: false
      }
    }
  },

  methods: {
    doUserComment () {
      this.$message({
        message: '恭喜你，这是一条成功消息',
        type: 'success'
      })
      // let _this = this
      // this.$prompt('对用户进行评价', '评价', {
      //   confirmButtonText: '确定',
      //   cancelButtonText: '取消'
      // }).then(({ value }) => {
      //   _this.$message({
      //     type: 'success',
      //     message: '你的邮箱是: ' + value
      //   })
      // }).catch(() => {
      //   _this.$message({
      //     type: 'info',
      //     message: '取消输入'
      //   })
      // })
    },
    doGoodComment () {
      this.$prompt('对商品进行评价', '评价', {
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      }).then(({ value }) => {
        this.$message({
          type: 'success',
          message: '你的邮箱是: ' + value
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '取消输入'
        })
      })
    },
    cancelBuy (orderid, goodid) {
      let _this = this
      this.$axios.get('/api/cancelOrder/', {
        params: {
          order_id: orderid
        }
      }).then(
        function (response) {
          if (response.status === 200) {
            if (response.data.status === 200) {
              _this.changGoodState(1, goodid)
              _this.refresh()
            } else {
              _this.$alert(response.data.msg, 'info', {
                confirmButtonText: 'ok'
              })
            }
          }
        }
      )
        .catch(function (error) { // 请求失败处理
          console.log(error)
        })
    },
    confirmBuy (orderid, goodid) {
      let _this = this
      this.$axios.get('/api/updateOrderStateById/', {
        params: {
          order_id: orderid,
          state: 1
        }
      }).then(
        function (response) {
          if (response.status === 200) {
            if (response.data.status === 200) {
              _this.changGoodState(3, goodid)
              _this.refresh()
            } else {
              _this.$alert(response.data.msg, 'info', {
                confirmButtonText: 'ok'
              })
            }
          }
        }
      )
        .catch(function (error) { // 请求失败处理
          console.log(error)
        })
    },
    changGoodState (num, goodid) {
      let _this = this
      this.$axios.get('/api/changeGoodState/' + goodid + '/' + num)
        .then(
          function (response) {
            if (response.data.status === 200) {
              _this.$alert(response.data.msg, 'info', {
                confirmButtonText: 'ok'
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
    },
    refresh () {
      var _this = this
      this.$axios.get('/api/getGoodOrderById', {
        params: {
          user_id: sessionStorage.getItem('user_id')
        }
      }).then(
        function (response) {
          if (response.data.status === 200) {
            _this.orderList = response.data.data
            // 对数据进行处理
            _this.orderList.map(function (val) {
              if (val.state === 0) {
                val.state = '待付款'
              } else if (val.state === -1) {
                val.state = '已付款'
              } else if (val.state === 1) {
                val.state = '待收货'
              } else if (val.state === 2) {
                val.state = '待评价'
              } else if (val.state === 3) {
                val.state = '已评价'
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
    changeOrderState (id, state) {
      let _this = this
      this.$axios.get('/api/updateOrderStateById', {
        params: {
          order_id: id,
          state: state
        }
      }).then(function (response) {
        if (response.data.status === 200) {
          _this.refresh()
          _this.$alert(response.data.msg, 'info', {
            confirmButtonText: 'ok'
          })
        }
      })
    }
  },
  created () {
    this.refresh()
  }
}
</script>
