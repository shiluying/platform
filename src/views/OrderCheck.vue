<template>
  <div>
    <el-dialog title="确认订单" :visible.sync="OrderCheck.show">
      <el-form :model="FormData" ref="orderForm" label-width="100px" disabled="false">
        <el-form-item label="商品ID" prop="good_id">
          <el-input v-model="FormData.good_id"></el-input>
        </el-form-item>
        <el-form-item label="商品状态" prop="state">
          <el-input v-model="FormData.state"></el-input>
        </el-form-item>
        <el-form-item label="商品描述" prop="good_describe">
          <el-input v-model="FormData.good_describe"></el-input>
        </el-form-item>
        <el-form-item label="商品价格" prop="price">
          <el-input v-model="FormData.price"></el-input>
        </el-form-item>
        <el-form-item label="卖家ID" prop="user_id">
          <el-input v-model="FormData.user_id"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="sendCheck(false)">取 消</el-button>
        <el-button type="primary" @click="sendCheck(true)">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'OrderCheck',
  props: {
    OrderCheck: Object,
    FormData: Object
  },
  methods: {
    sendCheck (isOrder) {
      if (isOrder) {
        this.FormData.state = 4
      } else {
        this.FormData.state = 2
      }
      var _this = this
      this.$axios.get('/api/changeGoodState/' + _this.FormData.good_id + '/' + _this.FormData.state)
        .then(
          function (response) {
            if (response.data) {
              _this.$emit('update', isOrder)
            }
          }
        )
        .catch(function (error) { // 请求失败处理
          console.log(error)
        })
      _this.OrderCheck.show = false
    }
  }
}
</script>

<style scoped>

</style>
