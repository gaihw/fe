<template>
  <el-container>
    <el-header>
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item label="平台">
          <el-select v-model="formInline.region" clearable placeholder="全部">
            <el-option label="榴莲" value="榴莲"></el-option>
            <el-option label="币王" value="币王"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="项目">
          <el-input
            v-model="formInline.user"
            placeholder="请输入项目名称"
          ></el-input>
        </el-form-item>

        <el-form-item label="模块">
          <el-input
            v-model="formInline.user"
            placeholder="请输入模块名称"
          ></el-input>
        </el-form-item>
        <el-form-item label="域名">
          <el-input
            v-model="formInline.user"
            placeholder="请输入域名"
          ></el-input>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="onSubmit">查询</el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">新增</el-button>
        </el-form-item>
      </el-form>
      <el-row>
        <el-col :span="24"><div class="grid-content">1</div></el-col>
      </el-row>
    </el-header>
    <el-main>
      <div>
        <el-table :data="tableData" style="width: 100%" max-height="440">
          <el-table-column type="index" label="序号" width="100">
          </el-table-column>
          <el-table-column prop="platform" label="平台" width="150">
          </el-table-column>
          <el-table-column prop="project" label="项目" width="120">
          </el-table-column>
          <el-table-column prop="module" label="模块" width="120">
          </el-table-column>
          <el-table-column prop="ip" label="域名" width="120">
          </el-table-column>
          <el-table-column prop="state" label="备注" width="300">
          </el-table-column>
          <el-table-column prop="is_delete" label="状态" width="120">
          </el-table-column>
          <el-table-column prop="creator" label="创建人" width="120">
          </el-table-column>
          <el-table-column prop="create_date" label="创建时间" width="120">
          </el-table-column>
          <el-table-column fixed="right" label="操作" width="120">
            <template slot-scope="scope">
              <el-button
                @click.native.prevent="deleteRow(scope.$index, tableData)"
                type="text"
                size="small"
              >
                编辑
              </el-button>
              <el-button
                @click.native.prevent="deleteRow(scope.$index, tableData)"
                type="text"
                size="small"
              >
                删除
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="page">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-sizes="[10, 20, 50, 100]"
          :page-size="10"
          layout="total, sizes, prev, pager, next, jumper"
          :total="count"
        >
        </el-pagination>
      </div>
    </el-main>
  </el-container>
</template>

<script>
export default {
  methods: {
    deleteRow(index, rows) {
      rows.splice(index, 1);
    },
    onSubmit() {
      console.log("submit!");
    },
    handleSizeChange(val) {
      this.limit = val;
      this.$http({
        method: "post",
        headers: { "Access-Control-Allow-Origin": "*" },
        url: "http://localhost:10090/api/auto/platform/list",
        data: {
          page: 1,
          limit: this.limit,
        },
      }).then((result) => {
        console.log(result.data);
        this.count = result.data.count;
        this.tableData = result.data.data;
      });
    },
    handleCurrentChange(val) {
      this.page = val;
      this.currentPage = val;
      this.$http({
        method: "post",
        headers: { "Access-Control-Allow-Origin": "*" },
        url: "http://localhost:10090/api/auto/platform/list",
        data: {
          page: this.page,
          limit: this.limit,
        },
      }).then((result) => {
        console.log(result.data);
        this.count = result.data.count;
        this.tableData = result.data.data;
      });
    },
  },
  mounted() {
    this.$http({
      method: "post",
      headers: { "Access-Control-Allow-Origin": "*" },
      url: "http://localhost:10090/api/auto/platform/list",
      data: {
        page: 1,
        limit: 10,
      },
    }).then((result) => {
      console.log(result.data);
      this.count = result.data.count;
      this.tableData = result.data.data;
    });
  },
  data() {
    return {
      formInline: {
        user: "",
        region: "",
      },
      currentPage: 0,
      tableData: [],
      count: 0,
      page:1,
      limit:10
    };
  },
};
</script>
<style lang="less" scoped>
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
.el-row {
  margin-bottom: 20px;
  &:last-child {
    margin-bottom: 0;
  }
}
.el-col {
  border-radius: 4px;
}
.grid-content {
  background: #eff1f5;
  border-radius: 4px;
  min-height: 5px;
  color: #eff1f5;
}

.page {
  text-align: right;
  margin-top: 20px;
}
</style>