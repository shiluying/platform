<template>
<div class="app">
  <el-col :span="3" v-for="comment in this.userCommentList" :key="comment.comment_id" :offset="2" >
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span style="text-align: left;">用户评论</span>
      </div>
      <div class="text item" style="text-align: left;">
        评论ID:{{comment.comment_id}}
      </div>
      <div class="text item" style="text-align: left;">
        评价：{{comment.comment}}
      </div>
      <div style="height: 300px;" v-if="comment.photo!==null">
        <img :src="comment.photo.url" class="image" style="height: 100%;">
      </div>
      <div style="height: 300px;" v-else>
        <img :src="comment.photo" class="image" style="height: 100%;">
      </div>
    </el-card>
    <br/>
  </el-col>
</div>
</template>

<script>
export default {
  name: 'UserComment',
  data () {
    return {
      userCommentList: [{
        comment_id: '',
        photo: '',
        comment: ''

      }]
    }
  },
  mounted () {
    var _this = this
    this.$axios.get('/api/getUserComment/', {
      params: {
        sender_id: sessionStorage.getItem('user_id')
      }
    })
      .then(
        function (response) {
          if (response.status === 200) {
            _this.userCommentList = response.data.data
          } else {
            _this.$alert(response.msg, 'info', {
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
</script>

<style>
  .text {
    font-size: 14px;
  }

  .item {
    margin-bottom: 18px;
  }

  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }
  .clearfix:after {
    clear: both
  }

  .box-card {
    width: 480px;
  }
</style>
