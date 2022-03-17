<template>
  <el-container>
    <el-header>
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item label="用户id">
          <el-input
            v-model="formInline.user"
            placeholder="请输入用户id"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">同步</el-button>
        </el-form-item>
        <el-divider direction="vertical"></el-divider>
        <el-form-item>
          <el-button type="primary" @click="allUserSyn">全部用户同步</el-button>
        </el-form-item>
      </el-form>
      <el-row>
        <el-col :span="24"><div class="grid-content">1</div></el-col>
      </el-row>
    </el-header>
    <el-main>
      <div
        class="loading-div"
        :style="{ height: windowHeight / 2 + 'px' }"
        v-loading="loading"
        element-loading-text="同步中..."
      >
        <el-table
          :data="tableData"
          style="width: 90%"
          :row-class-name="tableRowClassName"
          :header-cell-style="{ textAlign: 'center' }"
          :cell-style="{ textAlign: 'center' }"
        >
          <el-table-column prop="userId" label="用户ID" width="180">
          </el-table-column>
          <el-table-column prop="currencyId" label="币种ID" width="180">
          </el-table-column>
          <el-table-column prop="balance" label="余额"> </el-table-column>
          <el-table-column prop="hold" label="冻结"> </el-table-column>
        </el-table>
      </div>
    </el-main>
  </el-container>
</template>
<script>
export default {
  data() {
    return {
      formInline: {
        user: "",
        region: "",
      },
      tableData: [],
      loading: false,
      windowHeight: document.documentElement.clientHeight, // 实时屏幕高度
    };
  },
  methods: {
    onSubmit() {
      this.loading = true;
      this.$http({
        method: "get",
        headers: { "Access-Control-Allow-Origin": "*" },
        url:
          "http://localhost:10090/api/tool/check/getBalance?userId=" +
          this.formInline.user,
      }).then((result) => {
        console.log(result.data);
        this.tableData = result.data.data;
        this.loading = false;
      });
    },
    allUserSyn() {
      this.loading = true;
      this.$http({
        method: "get",
        headers: { "Access-Control-Allow-Origin": "*" },
        url: "http://localhost:10090/api/tool/check/getAllUserBalance",
      }).then((result) => {
        console.log(result.data);
        this.tableData = result.data.data;
        this.loading = false;
      });
    },
    tableRowClassName({ row, rowIndex }) {
      // console.log("row==",row.userId)
      if (row.userId == null) {
        return "warning-row";
      }
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
  left: 220px;
  right: 0;
  top: 240px;
  bottom: 20px;
  overflow-y: scroll;
}
.grid-content {
  background: #eff1f5;
  border-radius: 4px;
  min-height: 5px;
  color: #eff1f5;
}
.el-divider--vertical {
  height: 2.5em;
  width: 0.3em;
}
</style>