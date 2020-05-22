<template>
  <div>
    <el-dialog title="确认订单" :visible.sync="OrderCheck.show">
      <div style="font-size: 20px;text-align: left;height: 200px;">
        <el-row><b>订单ID: </b>{{OrderData.order_id}}</el-row>
        <el-row><b>商品ID: </b>{{OrderData.good_id}}</el-row>
        <el-row><b>商品状态:</b> {{OrderData.state}}</el-row>
        <el-row><b>商品价格:</b> {{OrderData.price}}</el-row>
        <el-row><b>卖家ID:</b> {{OrderData.seller_id}}</el-row>
        <el-row><b>买家ID:</b> {{OrderData.buyer_id}}</el-row>
        <el-row><b>创建时间:</b> {{OrderData.time}}</el-row>
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
              _this.$alert(response.data.msg, 'info', {
                confirmButtonText: 'ok'
              })
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
      this.$axios.get('/api/updateOrderStateById/', {
        params: {
          order_id: _this.OrderData.order_id,
          state: 1
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
