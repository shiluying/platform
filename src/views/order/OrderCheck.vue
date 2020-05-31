<template>
  <div>
    <el-dialog title="确认订单" :visible.sync="OrderCheck.show">
      <div style="font-size: 16px;text-align: left;height: 250px;">
        <el-row><b>商品ID: </b>{{OrderData.good_id}}</el-row>
        <el-row><b>商品名称: </b>{{OrderData.good_name}}</el-row>
        <el-row><b>商品状态:</b> {{OrderData.state}}</el-row>
        <el-row><b>商品数量: </b><a-input-number id="inputNumber" v-model="num" :min="1" :max="OrderData.num"/></el-row>
        <el-row><b>商品价格:</b> {{OrderData.price*num}}</el-row>
        <el-row><b>卖家ID:</b> {{OrderData.seller_id}}</el-row>
        <el-row><b>买家ID:</b> {{OrderData.buyer_id}}</el-row>
        <el-row><b>交易地点:</b><el-input v-model="place"></el-input></el-row>
        <el-row> <div class="block">
          <span class="demonstration"><b>选择交易时间</b></span>
          <el-date-picker
            v-model="date"
            align="right"
            type="date"
            placeholder="选择日期"
            :picker-options="pickerOptions1">
          </el-date-picker>
        </div>
        </el-row>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancelBuy()">取消购买</el-button>
        <el-button type="primary" @click="confirmBuy()">确认购买</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'OrderCheck',
  props: {
    OrderCheck: Object,
    OrderData: Object
  },
  data () {
    return {
      num: this.OrderData.num,
      date: '',
      place: '',
      pickerOptions1: {
        disabledDate (time) {
          return time.getTime() > Date.now()
        },
        shortcuts: [{
          text: '今天',
          onClick (picker) {
            picker.$emit('pick', new Date())
          }
        }, {
          text: '明天',
          onClick (picker) {
            const date = new Date()
            date.setTime(date.getTime() + 3600 * 1000 * 24)
            picker.$emit('pick', date)
          }
        }, {
          text: '三天后',
          onClick (picker) {
            const date = new Date()
            date.setTime(date.getTime() + 3600 * 1000 * 24 * 3)
            picker.$emit('pick', date)
          }
        }]
      }
    }
  },
  methods: {
    cancelBuy () {
      this.OrderCheck.show = false
    },
    confirmBuy () {
      let _this = this
      var data = {
        good_id: this.OrderData.good_id,
        state: 2
      }
      this.$axios.put('/api/changeGoodState/', data)
        .then(
          function (response) {
            if (response.data.status === 200) { // 商品锁定成功
              console.log(response.data)
              _this.addOrder()
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
    addOrder () {
      let _this = this
      var data = this.OrderData
      data.date = this.date
      data.place = this.place
      data.price = this.OrderData.price * this.num
      data.num = this.num
      if (data.state === '已发布') {
        data.state = 2
      }
      console.log(data)
      this.$axios.post('/api/addOrder/', data).then(
        function (response) {
          if (response.status === 200) {
            if (response.data.status === 200) {
              console.log(response.data)
              var returnData = response.data.data
              console.log(returnData)
              // 返回订单信息
              _this.$alert(response.data.msg, 'info', {
                confirmButtonText: 'ok'
              })
              _this.OrderCheck.show = false
              returnData.good_name = _this.OrderData.good_name
              _this.$emit('update', returnData)
            } else {
              // 订单创建失败，取消锁定商品
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
    }
  }
}
</script>

<style scoped>

</style>
