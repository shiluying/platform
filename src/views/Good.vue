<template>
    <div class="app">
      <div>
        <div v-show="nowIndex === 0">
          <el-row  style="text-align: center;">
            <el-form :inline="true">
              <el-form-item style="float: left" label="查询:">
                <el-input v-model="filter" @change="doSearch" placeholder="对商品id进行查询"></el-input>
              </el-form-item>
            </el-form>
          </el-row>
          <el-col :span="3" v-for="good in this.goodList" :key="good.good_id" :offset="2" >
            <el-card   v-bind:style="{width:css_width, height:css_height}">
              <div style="height: 300px;" v-if="good.photo!==null">
                <img :src="good.photo[0].url" class="image" style="height: 100%;">
              </div>
              <div style="height: 300px;" v-else>
                <img :src="good.photo" class="image" style="height: 100%;">
              </div>
              <div style="padding: 14px;">
                <span>{{good.good_id}}</span>
                <p>{{good.good_describe}}</p>
                <div class="bottom clearfix">
                  <el-button class="button" @click="doShow(good)">查 看</el-button>
                </div>
              </div>
            </el-card>
            <br/>
          </el-col>
        </div>
        <div v-show="nowIndex === 1">
          <a-page-header
            style="border: 0px solid rgb(235, 237, 240)"
            title="商品信息"
            @back="nowIndex = 0"
          />
            <el-col :span="8" style="float: left">
              <div v-for="photo in FormData.photo" :key="photo.url">
                <img :src="photo.url" style="width: 200px;height: 200px;"/>
              </div>
            </el-col>
            <el-col :span="12" style="    font-size: 20px;text-align: left;">
              <el-row><b>商品ID: </b>{{FormData.good_id}}</el-row>
              <el-row><b>商品状态:</b> {{FormData.state}}</el-row>
              <el-row><b>商品描述:</b> {{FormData.good_describe}}</el-row>
              <el-row><b>商品价格:</b> {{FormData.price}}</el-row>
              <el-row><b>卖家ID:</b> {{FormData.user_id}}</el-row>
              <el-row><el-button type="primary" :disabled="isAbleToBuy(FormData.state)" class="button" @click="doBuy()">购 买</el-button></el-row>
            </el-col>
        </div>
      </div>
      <OrderCheck :OrderCheck="OrderCheck" :OrderData="OrderData" @update="receive"></OrderCheck>
    </div>
</template>

<script>
import OrderCheck from '@/views/OrderCheck'
export default {
  name: 'Good',
  components: {OrderCheck},
  data: function () {
    return {
      nowIndex: 0,
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
        good_id: '',
        state: '',
        time: '',
        price: '',
        seller_id: '',
        buyer_id: ''
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
    // 锁定商品
    changGoodState (num) {
      let _this = this
      this.$axios.get('/api/changeGoodState/' + _this.FormData.good_id + '/' + num)
        .then(
          function (response) {
            if (response.data.status === 200) {
              console.log(response.data)
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
    // 创建订单
    addOrder () {
      let _this = this
      this.$axios.get('/api/addOrder/', {
        params: {
          buyer_id: sessionStorage.getItem('user_id'),
          seller_id: _this.FormData.user_id,
          good_id: _this.FormData.good_id,
          price: _this.FormData.price
        }
      }).then(
        function (response) {
          if (response.status === 200) {
            if (response.data.status === 200) {
              console.log(response.data)
              // 返回订单信息
              _this.OrderData = response.data.data
              _this.OrderData.state = _this.FormData.state
              _this.OrderCheck.show = true
            } else {
              this.changGoodState(1)
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
    doBuy () {
      this.changGoodState(2)
      this.addOrder()
    },
    doShow (data) {
      let _this = this
      this.$axios.get('/api/getGoodComment/', {
        params: {
          good_id: data.good_id
        }
      })
        .then(function (response) {
          _this.nowIndex = 1
          _this.FormData = {
            good_id: data.good_id,
            state: data.state,
            photo: data.photo,
            good_describe: data.good_describe,
            price: data.price,
            user_id: data.user_id
          }
          console.log(response.data)
        })
        .catch(function (error) {
          console.log(error)
        })
    },
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
                  if (val.photo !== null) {
                    val.photo = '[' + val.photo + ']'
                    val.photo = JSON.parse(val.photo)
                  }
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
    receive: function (data) {
      if (data) {
        this.changGoodState(3)
      } else {
        this.changGoodState(1)
      }
      this.FormData.state = '已售出'
      this.nowIndex = 0
      this.refresh()
    }
  },
  mounted () {
    this.refresh()
  }
}
</script>

<style scoped>
  @import "../styles/style.css";
</style>
