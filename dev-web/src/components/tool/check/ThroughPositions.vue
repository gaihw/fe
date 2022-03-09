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
        <el-form-item label="初始金额">
          <el-input
            v-model="formInline.money"
            placeholder="请输入初始金额"
          ></el-input>
        </el-form-item>
        <el-form-item label="模式" prop="marginType">
          <el-radio-group v-model="formInline.marginType">
            <el-radio label="0">全仓</el-radio>
            <el-radio label="1">逐仓</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">计算</el-button>
        </el-form-item>
      </el-form>
      <el-row>
        <el-col :span="24"><div class="grid-content">1</div></el-col>
      </el-row>
    </el-header>
    <el-main>
      对账结果:
      <div
        class="loading-div"
        :style="{ height: windowHeight / 2 + 'px' }"
        v-loading="loading"
        element-loading-text="加载中..."
        v-html="checkData"
      ></div>
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
        money:"",
        marginType: "0",
      },
      report: "无",
      value: "",
      checkData: "",
      loading: false,
      windowHeight: document.documentElement.clientHeight, // 实时屏幕高度
    };
  },
  mounted() {
    this.checkData = "<div>" + this.report + "</div>";
  },
  methods: {
    onSubmit() {
      this.checkData = "<div>" + this.report + "</div>";
      this.loading = true;
      this.$http({
        method: "get",
        headers: { "Access-Control-Allow-Origin": "*" },
        url:
          "http://localhost:10090/api/tool/check/throughPositions?userId=" +
          this.formInline.user +
          "&money=" +
          this.formInline.money +
          "&marginType=" +
          this.formInline.marginType,
      }).then((result) => {
        console.log(result.data);
        this.checkData = result.data;
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
.loading-div {
  width: 90%;
  position: absolute;
}
</style>