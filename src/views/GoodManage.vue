<template>
  <div id="app">
    <el-row style="text-align: center;">
      <div class="table">
        <el-table
          :data="goodList"
          border
          style="width: 100%">
          <el-table-column
            label="商品ID"
            width="">
            <template slot-scope="scope">
              <span>{{ scope.row.good_id}}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="商品状态"
            width="">
            <template slot-scope="scope">
              <span>{{ scope.row.state}}</span>
            </template>
          </el-table-column>
          <!--<el-table-column-->
            <!--label="商品图片"-->
            <!--width="">-->
            <!--<template slot-scope="scope">-->
              <!--<span>{{ scope.row.photo}}</span>-->
            <!--</template>-->
          <!--</el-table-column>-->
          <el-table-column
            label="商品描述"
            width="">
            <template slot-scope="scope">
              <span>{{ scope.row.good_describe}}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="商品价格"
            width="">
            <template slot-scope="scope">
              <span>{{ scope.row.price}}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="卖家ID"
            width="">
            <template slot-scope="scope">
              <span>{{ scope.row.user_id}}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="操作"
            width="">
            <template slot-scope="scope">
              <el-button
                size="mini"
                @click="doPass(scope.row)"
              >通过</el-button>
              <el-button
                size="mini"
                type="danger"
                @click="doRefuse(scope.row)"
              >拒绝</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </el-row>
  </div>
</template>

<script>
export default {
  name: 'goodmanage',
  data () {
    return {
      goodList: [
        {
          good_id: '',
          state: '',
          good_describe: '',
          price: '',
          user_id: ''
        }
      ]
    }
  },
  methods: {
    refresh () {
      var _this = this
      this.$axios.get('/api/findAllByState/0')
        .then(
          function (response) {
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
          }
        )
        .catch(function (error) { // 请求失败处理
          console.log(error)
        })
    },
    doRefuse: function (row) {
      var _this = this
      this.$axios.get('/api/changeGoodState/' + row.good_id + '/-1')
        .then(
          function (response) {
            if (response.status === 200) {
              _this.$alert(response.data.msg, 'info', {
                confirmButtonText: 'ok'
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
    },
    doPass: function (row) {
      var _this = this
      this.$axios.get('/api/changeGoodState/' + row.good_id + '/1')
        .then(
          function (response) {
            if (response.status === 200) {
              _this.$alert(response.data.msg, 'info', {
                confirmButtonText: 'ok'
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
  },

  mounted () {
    var _this = this
    this.$axios.get('/api/findAllByState/0')
      .then(
        function (response) {
          if (response.status === 200) {
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
          }
        })
      .catch(function (error) { // 请求失败处理
        console.log(error)
      })
  }
}
</script>

<style scoped>

</style>
