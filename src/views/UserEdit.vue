<template>
  <div>
    <el-dialog title="修改/添加用户信息" :visible.sync="UserEdit.show">
      <el-form :model="FormData" ref="editForm" label-width="100px" :rules="formrules">
        <el-form-item label="用户id" prop="userid">
          <el-input v-model="FormData.userid"></el-input>
        </el-form-item>
        <el-form-item label="用户名" prop="name">
          <el-input v-model="FormData.name"></el-input>
        </el-form-item>
        <el-form-item label="用户密码" prop="pwd">
          <el-input v-model="FormData.pwd"></el-input>
        </el-form-item>
        <el-form-item label="用户类型" prop="type"  @change="getType">
          <el-select v-model="FormData.type">
            <el-option
              v-for="item in typeList"
              :key="item.id"
              :label="item.value"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="用户权限" prop="examine" @change="getExamine">
          <el-select v-model="FormData.examine">
            <el-option
              v-for="item in examineList"
              :key="item.id"
              :label="item.value"
              :value="item.value">
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
          id: '1',
          value: '普通任务'
        },
        {
          id: '2',
          value: '重要任务'
        },
        {
          id: '3',
          value: '特殊任务'
        }
      ],
      examineList: [
        {
          id: '1',
          value: '未开始'
        },
        {
          id: '2',
          value: '进行中'
        },
        {
          id: '3',
          value: '已结束'
        }
      ],
      // 表单规则
      formrules: {
        userid: [{required: true, message: '用户id不能为空', trigger: 'blur'}],
        name: [{required: true, message: '用户名不能为空', trigger: 'blur'}],
        pwd: [{required: true, message: '密码不能为空', trigger: 'blur'}],
        type: [{required: true, message: '用户类型不能为空', trigger: 'blur'}],
        examine: [{required: true, message: '权限不能为空', trigger: 'blur'}]
      }
    }
  },
  methods: {
    sendFormData (editForm) {
      this.$refs[editForm].validate((valid) => {
        if (valid) {
          this.UserEdit.show = false
          this.$emit('update', this.FormData)
          this.FormData = ''
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
