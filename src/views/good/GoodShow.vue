<template>
  <div>
    <el-dialog title="查看商品信息" :visible.sync="GoodShow.show">
      <el-form :model="FormData" ref="orderForm" label-width="100px" :disabled="isDisableed">
        <el-form-item label="商品ID" prop="good_id">
          <el-input v-model="FormData.good_id"></el-input>
        </el-form-item>
        <el-form-item label="商品状态" prop="state">
          <el-input v-model="FormData.state"></el-input>
        </el-form-item>
        <el-form-item label="商品图片" prop="photo" >
          <div v-for="photo in FormData.photo" :key="photo.url">
          <img :src="photo.url" style="width: 200px;height: 200px;"/>
          </div>
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
        <el-button type="primary" @click="GoodShow.show = false">确 认</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'GoodShow',
  props: {
    GoodShow: Object,
    FormData: Object
  },
  data: function () {
    return {
      isDisableed: false
    }
  }
}
</script>

<style scoped>

</style>
