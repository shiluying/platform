<template>
    <div class="app">
      <div>
        <div v-show="nowIndex === 0">
          <el-row  style="text-align: center;">
            <el-form :inline="true">
              <el-form-item >
                <el-input v-model="filter" @change="doSearch" placeholder="对商品id/用户id/商品名称进行查询" style="width: 500px;" size="normal"></el-input>
              </el-form-item>
            </el-form>
          </el-row>
          <el-col :span="3" v-for="good in this.goodList" :key="good.good_id" :offset="2" >
            <div  @click='doShow(good)'>
            <el-card   v-bind:style="{width:css_width, height:css_height}">
              <div style="height: 300px;" v-if="good.photo!==null">
                <img :src="good.photo[0].url" class="image" style="height: 100%;">
              </div>
              <div style="height: 300px;" v-else>
                <img :src="good.photo" class="image" style="height: 100%;">
              </div>
              <div style="padding: 14px;">
                <p>商品名称：{{good.good_name}}</p>
                <p>商品描述：{{good.good_describe}}</p><br/>
                <p>商品价格：{{good.price}}</p>
              </div>
            </el-card>
            </div>
            <br/>
          </el-col>
        </div>
        <div v-show="nowIndex === 1">
          <a-page-header
            style="border: 0px solid rgb(235, 237, 240)"
            title="商品信息"
            @back="nowIndex = 0"
          />
            <el-row>
              <el-col :span="8" style="float: left">
                <div v-for="photo in FormData.photo" :key="photo.url">
                  <img :src="photo.url" style="width: 200px;height: 200px;"/>
                </div>
              </el-col>
              <el-col :span="12" style="    font-size: 20px;text-align: left;">
                <el-row><b>商品ID: </b>{{FormData.good_id}}</el-row>
                <el-row><b>商品名称: </b>{{FormData.good_name}}</el-row>
                <el-row><b>商品状态:</b> {{FormData.state}}</el-row>
                <el-row><b>商品描述:</b> {{FormData.good_describe}}</el-row>
                <el-row><b>商品数量:</b> {{FormData.num}}</el-row>
                <el-row><b>商品价格:</b> {{FormData.price}}</el-row>
                <el-row><b>卖家ID:</b> {{FormData.user_id}}</el-row>
                <el-row><el-button type="primary" :disabled="isAbleToBuy(FormData.state)" class="button" @click="doBuy()">购 买</el-button></el-row>
              </el-col>
            </el-row>
          <br/>
          <el-row style="    margin-top: 100px;">
            <el-col :span="6" v-for="comment in this.goodCommentList" :key="comment.comment_id" :offset="2" >
              <el-card class="box-card">
                <div class="text item" style="text-align: left;">
                  评论ID:{{comment.comment_id}}
                </div>
                <div class="text item" style="text-align: left;">
                  评价：{{comment.comment}}
                </div>
                <div class="text item" style="text-align: left;">
                  评价方：{{comment.buyer_id}}
                </div>
                <div  v-if="comment.photo!==null&&comment.photo!==' '&&comment.photo!==[]">
                  <img :src="comment.photo[0].url" class="image" style="height: 50%;">
                </div>
                <div v-else>
                  <img :src="comment.photo" class="image" style="height: 50%;">
                </div>
              </el-card>
              <br/>
            </el-col>
          </el-row>
        </div>
        <div v-show="nowIndex === 2">
          <a-page-header
            style="border: 0px solid rgb(235, 237, 240)"
            title="订单信息"
            @back="nowIndex = 0"
          />
          <el-col :span="12" style="    font-size: 20px;text-align: left;">
            <el-row><b>订单ID: </b>{{OrderData.order_id}}</el-row>
            <el-row><b>商品ID: </b>{{OrderData.good_id}}</el-row>
            <el-row><b>商品名称: </b>{{OrderData.good_name}}</el-row>
            <el-row><b>商品数量:</b> {{OrderData.num}}</el-row>
            <el-row><b>订单状态:</b> {{OrderData.state}}</el-row>
            <el-row><b>实付款:</b> {{OrderData.price}}</el-row>
            <el-row><b>卖家ID:</b> {{OrderData.seller_id}}</el-row>
            <el-row><b>买家ID:</b> {{OrderData.buyer_id}}</el-row>
            <el-row><b>交易地址:</b> {{OrderData.place}}</el-row>
            <el-row><b>交易时间:</b> {{OrderData.date}}</el-row>
            <el-row><b>创建时间:</b> {{OrderData.time}}</el-row>
            <el-row><el-button type="primary"  class="button" @click="confirmBuy()">确认支付</el-button></el-row>
            <el-row><el-button type="danger" class="button" @click="cancelBuy()">取消订单</el-button></el-row>
          </el-col>
        </div>
      </div>
      <OrderCheck :OrderCheck="OrderCheck" :OrderData="OrderData" @update="receive"></OrderCheck>
    </div>
</template>

<script>
import OrderCheck from '@/views/order/OrderCheck'
export default {
  name: 'Good',
  components: {OrderCheck},
  data: function () {
    return {
      nowIndex: 0,
      goodCommentList: [{
        comment_id: '',
        photo: [{url: '', name: ''}],
        comment: '',
        buyer_id: ''
      }],
      OrderCheck: {
        show: false
      },
      css_width: '333px',
      css_height: '500px',
      goodList: [
        {
          good_id: '',
          state: '',
          photo: '',
          good_describe: '',
          price: '',
          user_id: ''
        }
      ],
      filter: '',
      FormData: {
        good_id: '',
        state: '',
        photo: '',
        good_describe: '',
        price: '',
        user_id: ''
      },
      OrderData: {
        order_id: '',
        good_name: '',
        good_id: '',
        buyer_id: '',
        price: '',
        num: '',
        seller_id: '',
        state: '',
        time: '',
        place: '',
        date: ''
      }
    }
  },

  methods: {
    isAbleToBuy (state) {
      if (state === '已发布') {
        return false
      } else {
        return true
      }
    },
    // 购买
    doBuy () {
      this.OrderData = this.FormData
      this.OrderData.buyer_id = sessionStorage.getItem('user_id')
      this.OrderData.seller_id = this.FormData.user_id
      this.OrderCheck.show = true
    },
    // 确认支付
    confirmBuy () {
      let _this = this
      var data = {
        order_id: this.OrderData.order_id,
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
      this.nowIndex = 0
    },
    // 取消订单
    cancelBuy () {
      let _this = this
      this.$axios.delete('/api/deleteOrder/', {
        params: {
          order_id: _this.OrderData.order_id
        }
      })
      this.refresh()
    },
    doShow (data) {
      var _this = this
      console.log(sessionStorage.getItem('user_id'))
      this.$axios.get('/api/getGoodCommentByGoodId/', {
        params: {
          good_id: data.good_id
        }
      })
        .then(
          function (response) {
            if (response.status === 200) {
              _this.goodCommentList = response.data.data
              _this.goodCommentList.map(function (val) {
                if (val.photo !== null && val.photo !== '') {
                  val.photo = '[' + val.photo + ']'
                  val.photo = JSON.parse(val.photo)
                }
              })
              _this.nowIndex = 1
              _this.FormData = data
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
    doSearch () {
      if (this.filter !== '') { // 执行查询操作
        var _this = this
        this.$axios.get('/api/findGoodByFilter/', {
          params: {
            filter: _this.filter
          }
        })
          .then(
            function (response) {
              if (response.data.status === 200) {
                console.log(response.data)
                _this.goodList = response.data.data
                // 对数据进行处理
                var tempList = []
                _this.goodList.map(function (val) {
                  if (val.photo !== null) {
                    val.photo = '[' + val.photo + ']'
                    val.photo = JSON.parse(val.photo)
                  }
                  if (val.state === 0) {
                    val.state = '待审核'
                  } else {
                    if (val.state === -1) {
                      val.state = '审核失败'
                    } else if (val.state === 1) {
                      val.state = '已发布'
                    } else if (val.state === 2) {
                      val.state = '已锁定'
                    } else if (val.state === 3) {
                      val.state = '已交易'
                    }
                    tempList.push(val)
                  }
                })
                _this.goodList = tempList
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
      this.$axios.get('/api/findAllGood')
        .then(
          function (response) {
            if (response.data.status === 200) {
              _this.goodList = response.data.data
              // 对数据进行处理
              var tempList = []
              _this.goodList.map(function (val) {
                if (val.photo !== null) {
                  val.photo = '[' + val.photo + ']'
                  val.photo = JSON.parse(val.photo)
                }
                if (val.state === 0) {
                  val.state = '待审核'
                } else {
                  if (val.state === -1) {
                    val.state = '审核失败'
                  } else if (val.state === 1) {
                    val.state = '已发布'
                  } else if (val.state === 2) {
                    val.state = '已锁定'
                  } else if (val.state === 3) {
                    val.state = '已交易'
                  }
                  tempList.push(val)
                }
              })
              _this.goodList = tempList
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
    // 订单创建成功，返回订单数据，并决定是否付款
    receive: function (data) {
      if (data) {
        this.refresh()
        this.nowIndex = 2
        this.OrderData = data
      }
    }
  },
  mounted () {
    this.refresh()
  }
}
</script>

<style scoped>
  @import "../../styles/style.css";
</style>
