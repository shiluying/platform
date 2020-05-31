<template>
<div class="app">
  <el-col :span="24">
      <el-button
        @click="doAdd()"
      >添加商品</el-button>
  </el-col>
  <el-col :span="3" v-for="good in this.goodList" :key="good.good_id" :offset="2" >
    <div  @click='doEdit(good)'>
    <el-card   v-bind:style="{width:css_width, height:css_height}">
      <div style="height: 300px;" v-if="good.photo!==null">
        <img :src="good.photo[0].url" class="image" style="height: 100%;">
      </div>
      <div style="height: 300px;" v-else>
        <img :src="good.photo" class="image" style="height: 100%;">
      </div>
      <div style="padding: 14px;">
        <span><b>商品名称: </b>{{good.good_name}}</span>
        <span><b>商品状态:</b> {{good.state}}</span>
        <p><b>商品描述:</b> {{good.good_describe}}</p>
        <span><b>商品价格:</b> {{good.price}}</span>
        <br/>
        <br/>
        <div class="bottom clearfix">
          <p style="color: #3b86ff">点击卡片可修改商品信息</p>
          </div>
      </div>
    </el-card>
    </div>
    <br/>
  </el-col>
  <br/>
  <GoodEdit :GoodEdit="GoodEdit" :FormData="FormData" @update="receive"></GoodEdit>
</div>
</template>

<script>
import GoodEdit from '@/views/Good/GoodEdit'
export default {
  name: 'GoodInfo',
  components: {GoodEdit},
  data: function () {
    return {
      fileList: [{
        name: '',
        url: ''
      }],
      GoodEdit: {
        show: false
      },
      css_width: '333px',
      css_height: '500px',
      goodList: [
        {
          good_id: '',
          state: '',
          photo: [{
            name: '',
            url: ''
          }],
          good_describe: '',
          price: ''
        }
      ],
      FormData: {
        good_id: '',
        state: '',
        photo: '',
        good_describe: '',
        price: ''
      }
    }
  },
  methods: {
    doEdit (good) {
      this.FormData = {
        good_id: good.good_id,
        good_name: good.good_name,
        state: good.state,
        photo: good.photo,
        good_describe: good.good_describe,
        num: good.num,
        price: good.price
      }
      this.GoodEdit.show = true
    },
    doAdd () {
      this.GoodEdit.show = true
      this.FormData = {
        good_id: '',
        state: '待审核',
        photo: [],
        good_describe: '',
        price: ''
      }
    },
    refresh () {
      var _this = this
      this.$axios.get('/api/findGoodByUserId/', {
        params: {
          user_id: sessionStorage.getItem('user_id')
        }
      })
        .then(
          function (response) {
            if (response.status === 200) {
              _this.goodList = response.data.data
              console.log(_this.goodList)
              // 对数据进行处理
              _this.goodList.map(function (val) {
                if (val.photo !== null) {
                  val.photo = '[' + val.photo + ']'
                  val.photo = JSON.parse(val.photo)
                }
                if (val.state === 0) {
                  val.state = '待审核'
                } else {
                  if (val.state === -1) {
                    val.state = '审核失败'
                  } else if (val.state === 1) {
                    val.state = '已发布'
                  } else if (val.state === 2) {
                    val.state = '已锁定'
                  } else if (val.state === 3) {
                    val.state = '已交易'
                  }
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
    },
    receive: function (data) {
      console.log(data)
      let _this = this
      if (data.state === -1) { // 删除商品
        this.$axios.delete('/api/deleteGood/', {
          params: {
            id: _this.FormData.good_id
          }
        }).then(
          function (response) {
            if (response.status === 200) {
              _this.$alert(response.data.msg, 'info', {
                confirmButtonText: 'ok'
              })
              _this.refresh()
            }
          }
        )
          .catch(function (error) { // 请求失败处理
            console.log(error)
          })
      } else if (data.good_id === '') { // 添加商品
        data.state = 0
        this.$axios.post('/api/addGood/', data)
          .then(
            function (response) {
              _this.$alert(response.data.msg, 'info', {
                confirmButtonText: 'ok'
              })
            }
          )
          .catch(function (error) { // 请求失败处理
            console.log(error)
          })
      } else { // 修改商品
        data.state = 0
        this.$axios.put('/api/changeGood/', data).then(
          function (response) {
            _this.$alert(response.data.msg, 'info', {
              confirmButtonText: 'ok'
            })
          }
        )
          .catch(function (error) { // 请求失败处理
            console.log(error)
          })
      }
      _this.refresh()
    }
  },
  created () {
    this.refresh()
  }
}
</script>

<style scoped>
  @import "../../styles/style.css";
</style>
