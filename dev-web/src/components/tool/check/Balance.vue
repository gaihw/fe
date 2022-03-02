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
      </el-form>
      <el-row>
      <el-col :span="24"><div class="grid-content">1</div></el-col>
    </el-row>
    </el-header>
    <el-main>
      <p>{{ report }}</p>
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
      report: "",
    };
  },
  methods: {
    onSubmit() {
      console.log('时间:',this.value)
      this.$http({
        method: "get",
        headers: { "Access-Control-Allow-Origin": "*" },
        url:
          "http://localhost:10090/api/tool/check/getBalance?userId=" +
          this.formInline.user,
      }).then((result) => {
        console.log(result.data);
        this.report = result.data.data;
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
</style>