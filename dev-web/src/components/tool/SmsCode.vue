<template>
  <el-container>
    <el-header>
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="test环境" name="first"></el-tab-pane>
        <el-tab-pane label="dev1环境" name="second"></el-tab-pane>
      </el-tabs>
    </el-header>
    <el-main>
      <div class="loading-div"
      :style="{height:windowHeight/2 + 'px'}" 
      v-loading="loading" 
      element-loading-text="加载中..." 
     >
      <el-table
        :data="tableData"
        border
        style="width: 100%"
        :header-cell-style="{ textAlign: 'center' }"
        :cell-style="{ textAlign: 'center' }"
      >
        <el-table-column prop="id" label="序号" width="100"> </el-table-column>
        <el-table-column prop="mobile" label="手机号" width="200">
        </el-table-column>
        <el-table-column prop="email" label="邮箱" width="260">
        </el-table-column>
        <el-table-column prop="templateParams" label="验证码" width="260">
        </el-table-column>
        <el-table-column prop="createdDate" label="日期"> </el-table-column>
      </el-table>
      </div>
    </el-main>
  </el-container>
</template>

<script>
export default {
  data() {
    return {
      tableData: [],
      activeName: "first",
      type: 0,
      loading:false,
      windowHeight: document.documentElement.clientHeight, // 实时屏幕高度
    };
  },
  mounted() {
    this.$http({
      method: "get",
      headers: { "Access-Control-Allow-Origin": "*" },
      url: "http://localhost:10090/api/tool/sms/getList?type=0",
    }).then((result) => {
      // console.log(result.data);
      this.tableData = result.data.data;
    });
  },
  methods: {
    handleClick(tab) {
      this.loading = true;
      console.log(tab.index);
      this.tableData=[]
      this.type = tab.index;
      this.$http({
        method: "get",
        headers: { "Access-Control-Allow-Origin": "*" },
        url: "http://localhost:10090/api/tool/sms/getList?type=" + this.type,
      }).then((result) => {
        // console.log(result.data);
        this.tableData = result.data.data;
        this.loading = false;
      });
    },
  },
};
</script>
<style scoped>
.el-header {
  position: relative;
  width: 100%;
  height: 60px;
}
.el-main {
  position: absolute;
  left: 240px;
  right: 0;
  top: 200px;
  bottom: 40px;
  overflow-y: scroll;
  overflow-x: scroll;
}
.loading-div {
  width: 93%;
  position: absolute;
}
</style>