<template>
<div class="app">
  <el-col :span="3" v-for="comment in this.userCommentList" :key="comment.comment_id" :offset="4" >
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
      <div class="text item" style="text-align: left;">
        评价方：{{comment.sender_id}}
      </div>
      <div style="height: 100px;" v-if="comment.photo!==null&&comment.photo!==''">
        <img :src="comment.photo[0].url" class="image" style="height: 100%;">
      </div>
      <div style="height: 100px;" v-else>
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
        comment: '',
        buyer_id: ''
      }]
    }
  },
  mounted () {
    var _this = this
    console.log(sessionStorage.getItem('user_id'))
    this.$axios.get('/api/getUserCommentByReceiverId/', {
      params: {
        receiver_id: sessionStorage.getItem('user_id')
      }
    })
      .then(
        function (response) {
          if (response.status === 200) {
            _this.userCommentList = response.data.data
            _this.userCommentList.map(function (val) {
              if (val.photo !== null && val.photo !== '') {
                val.photo = '[' + val.photo + ']'
                val.photo = JSON.parse(val.photo)
              }
            })
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
