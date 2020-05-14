<template>
  <div>
    <el-dialog title="修改/添加商品信息" :visible.sync="GoodEdit.show">
      <el-form :model="FormData" ref="editForm" label-width="100px" >
        <el-form-item label="商品状态" prop="state" >
          <el-input v-model="FormData.state" v-bind:disabled="FormData.good_id"  ></el-input>
        </el-form-item>
        <el-form-item label="商品描述" prop="good_describe">
          <el-input v-model="FormData.good_describe"></el-input>
        </el-form-item>
        <el-form-item label="商品价格" prop="price" >
          <el-input v-model="FormData.price"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="GoodEdit.show = false">取 消</el-button>
        <el-button price="primary" @click="sendFormData('editForm')">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  state: 'GoodEdit',
  props: {
    GoodEdit: Object,
    FormData: Object
  },
  data: function () {
    return {readonly: true,
      isEditState: true
    }
  },
  methods: {
    sendFormData (editForm) {
      this.$refs[editForm].validate((valid) => {
        if (valid) {
          this.GoodEdit.show = false
          this.$emit('update', this.FormData)
          this.FormData = ''
        } else {
          return false
        }
      })
    }
  }
}
</script>

<style scoped>

</style>
