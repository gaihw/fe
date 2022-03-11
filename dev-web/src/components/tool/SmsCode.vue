<template>
<el-container>
  <el-main>
  <el-table
    :data="tableData"
    border
    style="width: 100%"
    :header-cell-style="{textAlign: 'center'}"
    :cell-style="{ textAlign: 'center' }">
    <el-table-column
      prop="id"
      label="序号"
      width="100">
    </el-table-column>
    <el-table-column
      prop="mobile"
      label="手机号"
      width="200">
    </el-table-column>
    <el-table-column
      prop="email"
      label="邮箱"
      width="260">
    </el-table-column>
    <el-table-column
      prop="templateParams"
      label="验证码"
      width="260">
    </el-table-column>
    <el-table-column
      prop="createdDate"
      label="日期">
    </el-table-column>
  </el-table>
  </el-main>
  </el-container>
</template>

<script>
  export default {
    data() {
      return {
        tableData: []
      }
    },
    mounted() {
    this.$http({
      method: "get",
      headers: { "Access-Control-Allow-Origin": "*" },
      url: "http://localhost:10090/api/tool/sms/getList",
    }).then((result) => {
      // console.log(result.data);
      this.tableData = result.data.data;
    });
  },
  }
</script>
<style scoped>
.el-main {
  position: absolute;
  left: 220px;
  right: 20px;
  overflow-y: scroll;
}
</style>