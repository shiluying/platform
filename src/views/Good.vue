<template>
    <div class="app">
      <div class="row">

        <div class="col-md-7 col-sm-5">

          <div class="search-form">

            <form class="navbar-form" role="search">

              <div class="form-group">

                <input type="text" class="form-control" placeholder="你需要什么...">

              </div>

              <button type="submit" class="btn"><i class="fa fa-search"></i></button>

            </form>

          </div>

        </div>

      </div>
      <!--<el-row>-->
        <el-col :span="3" v-for="good in this.goodList" :key="good.good_id" :offset="2" >
          <el-card   v-bind:style="{width:css_width, height:css_height}">
            <div style="height: 300px;">
            <img src="../assets/images/product-1.jpg" class="image" style="height: 100%;">
            </div>
            <div style="padding: 14px;">
              <span>{{good.good_id}}</span>
              <p>{{good.good_describe}}</p>
              <div class="bottom clearfix">
                <!--<el-button type="text" class="button">操作按钮</el-button>-->
              </div>
            </div>
          </el-card>
          <br/>
        </el-col>
        <!--<el-col :span="2" v-for="(o, index) in 12" :key="o" :offset="index > 0 ? 1 : 0">-->
          <!--<el-card :body-style="{ padding: '0px' }">-->
            <!--<img src="../assets/images/product-1.jpg" class="image">-->
            <!--<div style="padding: 14px;">-->
              <!--<span>好吃的汉堡</span>-->
              <!--<div class="bottom clearfix">-->
                <!--<el-button type="text" class="button">操作按钮</el-button>-->
              <!--</div>-->
            <!--</div>-->
          <!--</el-card>-->
        <!--</el-col>-->
      <!--</el-row>-->
      </div>
</template>

<script>
// import 'bootstrap/dist/css/bootstrap.min.css'
// import 'bootstrap/dist/js/bootstrap.min.js'
export default {
  name: 'Good',
  data: function () {
    return {
      css_width: '333px',
      css_height: '400px',
      goodList: [
        {
          good_id: '',
          state: '',
          good_describe: '',
          price: '',
          user_id: ''
        }
      ],
      filter: '',
      FormData: {
        good_id: '',
        state: '',
        good_describe: '',
        price: '',
        user_id: ''
      },
      OrderCheck: {
        show: false
      }
    }
  },
  methods: {
    doSearch () {
      if (this.filter !== '') { // 执行查询操作
        var _this = this
        this.$axios.get('/api/findGood/' + _this.filter)
          .then(
            function (response) {
              if (response.data.status === 200) {
                _this.goodList = []
                _this.goodList[0] = response.data.data
                // 对数据进行处理
                _this.goodList.map(function (val) {
                  if (val.state === 0) {
                    val.state = '待审核'
                  } else if (val.state === -1) {
                    val.state = '审核失败'
                  } else if (val.state === 1) {
                    val.state = '已发布'
                  } else if (val.state === 2) {
                    val.state = '已锁定'
                  } else if (val.state === 3) {
                    val.state = '已交易'
                  }
                })
              } else {
                _this.$alert(response.data.msg, 'info', {
                  confirmButtonText: 'ok'
                })
              }
            }
          )
          .catch(function (error) { // 请求失败处理
            console.log(error)
          })
      } else { // 返回全部结果
        this.refresh()
      }
    },
    refresh () {
      var _this = this
      this.$axios.get('/api/findGood')
        .then(
          function (response) {
            if (response.data.status === 200) {
              _this.goodList = response.data.data
              // 对数据进行处理
              _this.goodList.map(function (val) {
                if (val.state === 0) {
                  val.state = '待审核'
                } else if (val.state === -1) {
                  val.state = '审核失败'
                } else if (val.state === 1) {
                  val.state = '已发布'
                } else if (val.state === 2) {
                  val.state = '已锁定'
                } else if (val.state === 3) {
                  val.state = '已交易'
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
    doOrder (row) {
      var _this = this
      this.$axios.get('/api/changeGoodState/' + row.good_id + '/' + 2)
        .then(
          function (response) {
            if (response.data.status === 200) {
              _this.FormData = response.data.data
              _this.FormData.state = '已锁定'
              _this.OrderCheck.show = true
              _this.refresh()
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
      this.refresh()
    }
  },
  mounted () {
    var _this = this
    this.$axios.get('/api/findGood')
      .then(
        function (response) {
          console.log(response)
          if (response.data.status === 200) {
            _this.goodList = response.data.data
            // 对数据进行处理
            _this.goodList.map(function (val) {
              if (val.state === 0) {
                val.state = '待审核'
              } else if (val.state === -1) {
                val.state = '审核失败'
              } else if (val.state === 1) {
                val.state = '已发布'
              } else if (val.state === 2) {
                val.state = '已锁定'
              } else if (val.state === 3) {
                val.state = '已交易'
              }
            })
            _this.refresh()
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

<style scoped>
  @import "../styles/astyle.css";
  @import "../styles/style.css";
  @import "../styles/responsive.css";
  @import "../styles/translateelement.css";
</style>
