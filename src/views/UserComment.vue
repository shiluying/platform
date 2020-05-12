<template>
<div class="app">
  <div id="app">
    <el-row style="text-align: center;">
      <div class="table">
        <el-table
          :data="userCommentList"
          border
          style="width: 100%">
          <el-table-column
            label="评论ID"
            width="">
            <template slot-scope="scope">
              <span>{{ scope.row.commentid}}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="评论"
            width="">
            <template slot-scope="scope">
              <span>{{ scope.row.comment}}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="买家ID"
            width="">
            <template slot-scope="scope">
              <span>{{ scope.row.buyerid}}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="卖家ID"
            width="">
            <template slot-scope="scope">
              <span>{{ scope.row.sellerid}}</span>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </el-row>
  </div>
</div>
</template>

<script>
export default {
  name: 'UserComment',
  data () {
    return {
      userCommentList: [{
        commentid: 'xx',
        comment: 'xxx',
        sellerid: 'xxxx',
        buyerid: 'xxxx'

      }]
    }
  }
}
</script>

<style scoped>

</style>
