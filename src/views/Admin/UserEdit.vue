<template>
  <div>
    <el-dialog title="修改用户信息" :visible.sync="UserEdit.show">
      <el-form :model="FormData" ref="editForm" label-width="100px" :rules="formrules">
        <el-form-item label="用户id" prop="user_id">
          <el-input v-model="FormData.user_id"></el-input>
        </el-form-item>
        <el-form-item label="用户名" prop="name">
          <el-input v-model="FormData.name"></el-input>
        </el-form-item>
        <el-form-item label="用户邮箱" prop="email">
          <el-input v-model="FormData.email"></el-input>
        </el-form-item>
        <el-form-item label="用户类型" prop="type"  @change="getType">
          <el-select v-model="FormData.type">
            <el-option
              v-for="item in typeList"
              :key="item.id"
              :label="item.value"
              :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="商品审核权限" prop="examine" @change="getExamine">
          <el-select v-model="FormData.examine">
            <el-option
              v-for="item in examineList"
              :key="item.id"
              :label="item.value"
              :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="UserEdit.show = false">取 消</el-button>
        <el-button type="primary" @click="sendFormData('editForm')">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'UserEdit',
  props: {
    UserEdit: Object,
    FormData: Object
  },
  data () {
    return {
      typeList: [
        {
          id: 0,
          value: '普通用户'
        },
        {
          id: 1,
          value: '管理员'
        }
      ],
      examineList: [
        {
          id: 0,
          value: '无'
        },
        {
          id: 1,
          value: '有'
        }
      ],
      // 表单规则
      formrules: {
        user_id: [{required: true, message: '用户id不能为空', trigger: 'blur'}],
        name: [{required: true, message: '用户名不能为空', trigger: 'blur'}],
        email: [{required: true, message: '邮箱不能为空', trigger: 'blur'}],
        type: [{required: true, message: '用户类型不能为空', trigger: 'blur'}],
        examine: [{required: true, message: '权限不能为空', trigger: 'blur'}]
      }
    }
  },
  methods: {
    sendFormData (editForm) {
      this.$refs[editForm].validate((valid) => {
        if (valid) {
          console.log(this.FormData)
          if (this.FormData.type === '普通用户') {
            this.FormData.type = 0
          } else if (this.FormData.type === '管理员') {
            this.FormData.type = 1
          }
          if (this.FormData.examine === '无') {
            this.FormData.examine = 0
          } else if (this.FormData.examine === '有') {
            this.FormData.examine = 1
          }
          console.log(this.FormData)
          this.UserEdit.show = false
          this.$emit('update', this.FormData)
        } else {
          return false
        }
      })
    },
    getType () {
      this.typeList = FormData.data.typeList
    },
    getExamine () {
      this.examineList = FormData.data.examineList
    }
  }
}
</script>

<style scoped>

</style>
