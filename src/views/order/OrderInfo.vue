<template>
  <div class="app">
    <el-col :span="10" v-for="order in this.orderList" :key="order.order_id" :offset="1">
      <el-card style="height:  300px;">
        <el-row>
        <el-col :span="10" style="padding: 14px;">
          <div style="font-size: 15px;text-align: left;height: 200px;" >
            <el-row><b>订单ID: </b>{{order.order_id}}</el-row>
            <el-row><b>商品ID: </b>{{order.good_id}}</el-row>
            <el-row><b>商品数量:</b> {{order.num}}</el-row>
            <el-row><b>订单状态:</b> {{order.state}}</el-row>
            <el-row><b>实付款:</b> {{order.price}}</el-row>
            <el-row><b>卖家ID:</b> {{order.seller_id}}</el-row>
            <el-row><b>买家ID:</b> {{order.buyer_id}}</el-row>
            <el-row><b>交易地址:</b> {{order.place}}</el-row>
            <el-row><b>交易时间:</b> {{order.date}}</el-row>
            <el-row><b>创建时间:</b> {{order.time}}</el-row>
          </div>
        </el-col>
          <el-col :span="5" style="padding: 14px;float: right;text-align: center;" >
            <div  v-if="order.state == '待收货' && order.buyer_id===user_id">
              <el-button type="primary" @click="confirmGood(order.order_id,order.good_id,order.num)">确认收货</el-button>
              <el-button type="danger" @click="cancelBuy(order.order_id)">取消订单</el-button>
            </div>
            <div  v-else-if="order.state == '待付款' && order.buyer_id===user_id">
              <el-button type="primary" @click="confirmBuy(order.order_id)">付款</el-button><br/><br/>
              <el-button type="danger" @click="cancelBuy(order.order_id)">取消订单</el-button>
            </div>
            <div  v-else-if="order.state == '已完成' && order.buyer_id==user_id">
              <el-button type="" @click="doSellerUserComment(order)">对卖家进行评价</el-button>
              <el-button type="" @click="doGoodComment(order)">进行商品评价</el-button>
            </div>
            <div  v-else-if="order.state == '已完成' && order.seller_id==user_id">
              <el-button type="" @click="doBuyerUserComment(order)">对买家进行评价</el-button>
            </div>
        </el-col>
        </el-row>
      </el-card>
      <br/>
    </el-col>
    <UserCommentAdd :UserCommentAdd="UserCommentAdd" :FormData="FormData" @update="receive"></UserCommentAdd>
    <GoodCommentAdd :GoodCommentAdd="GoodCommentAdd" :FormData="FormData" @update="receive"></GoodCommentAdd>
  </div>
</template>

<script>
import UserCommentAdd from '@/views/comment/UserCommentAdd'
import GoodCommentAdd from '@/views/comment/GoodCommentAdd'
export default {
  name: 'OrderInfo',
  components: {UserCommentAdd, GoodCommentAdd},
  data: function () {
    return {
      UserCommentAdd: {
        show: false
      },
      GoodCommentAdd: {
        show: false
      },
      user_id: sessionStorage.getItem('user_id'),
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
      FormData: {
        comment: '',
        photo: '',
        sender_id: '',
        receiver_id: '',
        good_id: ''
      }
    }
  },

  methods: {
    doBuyerUserComment (order) {
      this.FormData.sender_id = this.user_id
      this.FormData.receiver_id = order.buyer_id
      this.UserCommentAdd.show = true
    },
    doSellerUserComment (order) {
      this.FormData.sender_id = this.user_id
      this.FormData.receiver_id = order.seller_id
      this.UserCommentAdd.show = true
    },
    doGoodComment (order) {
      this.FormData.buyer_id = this.user_id
      this.FormData.good_id = order.good_id
      this.GoodCommentAdd.show = true
    },
    confirmGood (orderid, goodid, num) {
      let _this = this
      var data = {
        order_id: orderid,
        state: 2
      }
      this.$axios.put('/api/changeOrderState/', data).then(
        function (response) {
          if (response.status === 200) {
            if (response.data.status === 200) {
              _this.buyGood(goodid, num)
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
    cancelBuy (orderid) {
      this.$axios.delete('/api/deleteOrder/', {
        params: {
          order_id: orderid
        }
      })
      this.refresh()
    },
    confirmBuy (orderid) {
      let _this = this
      var data = {
        order_id: orderid,
        state: 1
      }
      this.$axios.put('/api/changeOrderState/', data).then(
        function (response) {
          if (response.status === 200) {
            if (response.data.status === 200) {
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
    buyGood (goodid, num) {
      let _this = this
      var data = {
        good_id: goodid,
        num: num
      }
      console.log(num)
      this.$axios.put('/api/buyGood/', data)
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
    },
    refresh () {
      var _this = this
      this.$axios.get('/api/getGoodOrderByUserId', {
        params: {
          user_id: sessionStorage.getItem('user_id')
        }
      }).then(
        function (response) {
          if (response.data.status === 200) {
            _this.orderList = response.data.data
            console.log(_this.orderList)
            // 对数据进行处理
            _this.orderList.map(function (val) {
              if (val.state === 0) {
                val.state = '待付款'
              } else if (val.state === -1) {
                val.state = '已付款'
              } else if (val.state === 1) {
                val.state = '待收货'
              } else if (val.state === 2) {
                val.state = '已完成'
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
      console.log(data)
      let _this = this
      if (data.good_id !== '') {
        this.$axios.post('/api/addGoodComment/', data).then(
          function (response) {
            if (response.status === 200) {
              _this.$alert(response.data.msg, 'info', {
                confirmButtonText: 'ok'
              })
            }
          }
        )
          .catch(function (error) { // 请求失败处理
            console.log(error)
          })
      } else {
        this.$axios.post('/api/addUserComment/', data).then(
          function (response) {
            if (response.status === 200) {
              _this.$alert(response.data.msg, 'info', {
                confirmButtonText: 'ok'
              })
            }
          }
        )
          .catch(function (error) { // 请求失败处理
            console.log(error)
          })
      }
      this.refresh()
    }
  },
  created () {
    this.refresh()
  }
}
</script>
