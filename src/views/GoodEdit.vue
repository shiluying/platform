<template>
  <div>
    <el-dialog title="修改/添加商品信息" :visible.sync="GoodEdit.show">
      <el-form :model="FormData" ref="editForm" label-width="100px" >
        <el-form-item label="商品状态" prop="state" >
          <el-input v-model="FormData.state" v-bind:disabled="FormData.good_id"  ></el-input>
        </el-form-item>
        <el-form-item label="上传图片" prop="photo">
          <el-upload
            class="upload-demo"
            action="/api/upLoadImg"
            :on-preview="handlePreview"
            :on-remove="handleRemove"
            :on-success="handleSuccess"
            :file-list="FormData.photo"
            list-type="picture">
            <el-button size="small" type="primary">点击上传</el-button>
            <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
          </el-upload>
        </el-form-item>
        <el-form-item label="商品描述" prop="good_describe">
          <el-input v-model="FormData.good_describe"></el-input>
        </el-form-item>
        <el-form-item label="商品价格" prop="price" >
          <el-input v-model="FormData.price"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="deleteGood">删除商品</el-button>
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
    return {
      readonly: true,
      isEditState: true
    }
  },
  methods: {
    handleRemove (file, fileList) {
      this.fileList = fileList
    },
    handlePreview (file) {
      console.log(file)
      console.log(this.fileList)
    },
    handleSuccess (response, file, fileList) {
      console.log(file)
      if (response.status === 200) {
        this.$message({
          message: `文件${response.data.name}上传成功`,
          type: 'success',
          duaration: 1000
        })
        this.fileList = fileList.filter(file => {
          return file.response.data
        })
      } else {
        this.$message({
          message: `文件${response.data}上传失败`,
          type: 'error',
          duaration: 1000
        })
      }
    },
    deleteGood () {
      this.FormData.state = -1
      this.$emit('update', this.FormData)
      this.FormData = ''
      this.GoodEdit.show = false
    },
    sendFormData (editForm) {
      this.$refs[editForm].validate((valid) => {
        if (valid) {
          this.GoodEdit.show = false
          let photoData = []
          for (let i = 0; i < this.fileList.length; i++) {
            let data = this.fileList[i].response.data
            photoData.push({
              name: data.name,
              url: data.url
            })
          }
          this.FormData.photo = JSON.stringify(photoData).replace('[', '').replace(']', '')
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

<style>
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>
