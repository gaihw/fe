<template>
  <el-container>
    <el-header>
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item label="类型">
    <el-select v-model="formInline.type" placeholder="请选择类型">
      <el-option label="手机号" value="0"></el-option>
      <el-option label="用户ID" value="1"></el-option>
    </el-select>
  </el-form-item>
        <el-form-item label="条件">
          <el-input
            v-model="formInline.data"
            placeholder="请输入数据"
          ></el-input>
        </el-form-item>
        
        <el-form-item>
          <el-button type="primary" @click="onSubmit">查询</el-button>
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
        element-loading-text="查询中..."
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
        type: "",
        data:"",
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
          "http://localhost:10090/api/tool/account/userInfo?type=" +
          this.formInline.type +
          "&data=" +
          this.formInline.data ,
      }).then((result) => {
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