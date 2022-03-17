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
      仓位计算:
      <div
        class="loading-div"
        :style="{ height: windowHeight / 2 + 'px' }"
        v-loading="loading"
        element-loading-text="计算中..."
        v-html="checkData"
      >
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
        marginType: "0",
      },
      loading: false,
      checkData: '',
      windowHeight: document.documentElement.clientHeight, // 实时屏幕高度
    };
  },
  methods: {
    onSubmit() {
      this.loading = true;
      this.checkData = "无";
      this.$http({
        method: "get",
        headers: { "Access-Control-Allow-Origin": "*" },
        url:
          "http://localhost:10090/api/tool/check/positions?userId=" +
          this.formInline.user+"&marginType="+this.formInline.marginType,
      }).then((result) => {
        // console.log(result.data);
        this.checkData = result.data;
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
.loading-div {
  width: 90%;
  position: absolute;
}
.el-divider--vertical {
  height: 2.5em;
  width: 0.3em;
}
</style>