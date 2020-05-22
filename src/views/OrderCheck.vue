<template>
  <div>
    <el-dialog title="确认订单" :visible.sync="OrderCheck.show">
      <div style="font-size: 16px;text-align: left;height: 250px;">
        <el-row><b>订单ID: </b>{{OrderData.order_id}}</el-row>
        <el-row><b>商品ID: </b>{{OrderData.good_id}}</el-row>
        <el-row><b>商品状态:</b> {{OrderData.state}}</el-row>
        <el-row><b>商品价格:</b> {{OrderData.price}}</el-row>
        <el-row><b>卖家ID:</b> {{OrderData.seller_id}}</el-row>
        <el-row><b>买家ID:</b> {{OrderData.buyer_id}}</el-row>
        <el-row><b>创建时间:</b> {{OrderData.time}}</el-row>
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
        <el-button @click="cancelBuy()">取 消</el-button>
        <el-button type="primary" @click="confirmBuy()">确 定</el-button>
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
      },
      value1: '',
      value2: ''
    }
  },
  methods: {
    cancelBuy () {
      let _this = this
      this.$axios.get('/api/cancelOrder/', {
        params: {
          order_id: _this.OrderData.order_id
        }
      }).then(
        function (response) {
          if (response.status === 200) {
            if (response.data.status === 200) {
              _this.$emit('update', false)
              _this.OrderCheck.show = false
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
    confirmBuy () {
      let _this = this
      this.$axios.get('/api/confirmOrder/', {
        params: {
          order_id: _this.OrderData.order_id,
          state: 1,
          place: _this.place,
          date: _this.date
        }
      }).then(
        function (response) {
          if (response.status === 200) {
            if (response.data.status === 200) {
              _this.$alert(response.data.msg, 'info', {
                confirmButtonText: 'ok'
              })
              _this.$emit('update', true)
              _this.OrderCheck.show = false
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
    }
  }
}
</script>

<style scoped>

</style>
