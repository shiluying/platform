<template>
  <div>
    <el-dialog title="添加用户评价" :visible.sync="UserCommentAdd.show">
      <el-form :model="FormData" ref="editForm" label-width="100px" >
        <el-form-item label="评价方" prop="sender_id">
          <p style="float: left">{{FormData.sender_id}}</p>
        </el-form-item>
        <el-form-item label="被评价方" prop="receiver_id">
          <p style="float: left">{{FormData.receiver_id}}</p>
        </el-form-item>
        <el-form-item label="评价" prop="comment">
          <el-input v-model="FormData.comment"></el-input>
        </el-form-item>
        <el-form-item label="上传图片" prop="photo">
          <el-upload
            class="upload-demo"
            action="/api/upLoadUserCommentImg"
            :on-preview="handlePreview"
            :on-remove="handleRemove"
            :on-success="handleSuccess"
            :file-list="FormData.photo"
            list-type="picture" >
            <el-button size="small" type="primary">点击上传</el-button>
            <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
          </el-upload>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="UserCommentAdd.show = false">取 消</el-button>
        <el-button @click="sendFormData('editForm')" type="primacy">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'UserCommentAdd',
  props: {
    UserCommentAdd: Object,
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
      this.FormData.photo = fileList
      console.log(this.FormData.photo)
    },
    handlePreview (file) {
      console.log(file)
      console.log(this.FormData.photo)
    },
    handleSuccess (response, file, fileList) {
      console.log(file)
      if (response.status === 200) {
        this.FormData.photo = fileList.filter(file => {
          return file.response.data
        })
      }
    },
    sendFormData (editForm) {
      this.$refs[editForm].validate((valid) => {
        if (valid) {
          this.UserCommentAdd.show = false
          let photoData = []
          let fileList = this.FormData.photo
          for (let i = 0; i < fileList.length; i++) {
            let data = fileList[i]
            data = fileList[i].response.data
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
