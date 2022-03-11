<template>
  <el-container>
    <el-header>
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item label="币种">
    <el-select v-model="formInline.symbol" placeholder="请选择币种">
      <el-option label="btcusdt" value="btcusdt"></el-option>
      <el-option label="ethusdt" value="ethusdt"></el-option>
    </el-select>
  </el-form-item>
        <el-form-item label="价格">
          <el-input
            v-model="formInline.price"
            placeholder="请输入价格"
          ></el-input>
        </el-form-item>
        
        <el-form-item>
          <el-button type="primary" @click="onSubmit">推送</el-button>
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
        element-loading-text="推送中..."
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
        symbol: "",
        price:"",
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
          "http://localhost:10090/api/tool/symbol/updateMarket?symbol=" +
          this.formInline.symbol +
          "&price=" +
          this.formInline.price ,
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