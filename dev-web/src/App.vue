<template>
  <div id="app">
    <el-container style="height: 100%">
      <el-header
        style="
          text-align: right;
          font-size: 17px;
          background-color: #b5c0cf;
          border-bottom: 1px solid #e6e6e6;
        "
      >
        <el-row>
          <el-col :span="2"
            ><div class="grid-content">测试平台</div></el-col
          >
          <el-col :span="22"
            ><div class="grid-content">
              <div class="grid-content">
                <el-dropdown>
                  <i class="el-icon-arrow-down" style="margin-right: 15px"></i>
                  <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item>查看</el-dropdown-item>
                    <el-dropdown-item>新增</el-dropdown-item>
                    <el-dropdown-item>删除</el-dropdown-item>
                  </el-dropdown-menu>
                </el-dropdown>
                <span>TEST</span>
              </div>
            </div></el-col
          >
        </el-row>
      </el-header>
      <el-container>
        <el-aside
          width="200px"
          style="text-align: left; background-color: rgb(238, 241, 246)"
        >
          <el-menu class="el-menu-vertical-demo" active-text-color="#409EFF" @select="handleSelect" menu-trigger="click" :unique-opened='true' :default-active="this.$route.path" router>
            <el-menu-item index="/dashboard">
              <i class="el-icon-s-home"></i>
              <span slot="title">首页</span>
            </el-menu-item>
            <el-submenu index="2" disabled>
              <template slot="title"
                ><i class="el-icon-s-operation"></i>接口自动化</template
              >
              <el-menu-item index="/test/auto/project"><span slot="title">项目管理</span></el-menu-item>
              <el-menu-item index="/test/auto/interface"><span slot="title">接口管理</span></el-menu-item>
              <el-menu-item index="/test/auto/case"><span slot="title">用例管理</span></el-menu-item>
              <el-menu-item index="/test/auto/execute"><span slot="title">用例执行</span></el-menu-item>
              <el-menu-item index="/test/auto/report"><span slot="title">报告查看</span></el-menu-item>
            </el-submenu>
            <el-submenu index="3">
              <template slot="title"
                ><i class="el-icon-s-tools"></i>常用工具</template
              >
              <el-submenu index="3-1">
                <template slot="title">账户</template>
                <el-menu-item index="/test/tool/account/info">用户信息</el-menu-item>
                <el-menu-item index="/test/tool/account/deposit" >充值</el-menu-item>
                <el-menu-item index="/test/tool/account/partner">合伙人</el-menu-item>
              </el-submenu>
              <el-submenu index="3-2">
                <template slot="title">对账相关</template>
                <el-menu-item index="/test/tool/check/balance">余额同步</el-menu-item>
                <el-menu-item index="/test/tool/check/userCheck">对账</el-menu-item>
                <el-menu-item index="/test/tool/check/throughPositions">爆仓计算</el-menu-item>
                <el-menu-item index="/test/tool/check/positions">仓位</el-menu-item>
              </el-submenu>
              <el-menu-item index="/test/tool/smsCode">短信验证码</el-menu-item>
              <el-menu-item index="/test/tool/symbol">行情推送</el-menu-item>
            </el-submenu>
          </el-menu>
        </el-aside>
        <el-container>
          <el-main>
            <el-row>
              <el-col :span="24" 
                ><div class="grid-content bg-purple-dark">
                  <el-breadcrumb separator-class="el-icon-arrow-right">
                  <el-breadcrumb-item
                    v-for="(item, index) in levelList"
                    :key="index"
                    :to="{ path: item.path }"
                    >{{ item.title }}</el-breadcrumb-item>
                  </el-breadcrumb>
                </div></el-col
              >
            </el-row>
            <el-card class="box-card">
              <router-view ></router-view>
            </el-card>
          </el-main>
        </el-container>
      </el-container>
    </el-container>
  </div>
</template>

<script>
export default {
  data() {
    const levelList = [];
    return {
      routerName : '首页',
      levelList
    };
  },
  methods: {
    handleSelect(key, keyPath) {
      // console.log('title:',this.$router.history.current.name)

      // console.log('title:',this.$route.name)
      // this.levelList = [{'title':'接口自动化','path':''},{'title':this.$route.name,'path':this.$router.path}]
    }
  },
  mounted() {
    this.levelList = []
    for (let i = 0; i < this.$route.matched.length; i++) {
      if(i != this.$route.matched.length-1){
        this.levelList.push({'title':this.$route.matched[i].name,'path':''})
      }else{
        this.levelList.push({'title':this.$route.matched[i].name,'path':this.$route.matched[i].path})
      }
    }
    // let _this = this;
    // setTimeout(function() {
    //   console.log('-=======',_this.$route);
    // }, 100);
  },
  watch:{
    //点击侧边栏，跳转的路由
    $route(to, from) {
        this.levelList = []
        // to 和 from 都是 路由信息对象
        //遍历to路由的上级侧边栏的名称，el-breadcrumb-item面包屑中
        for (let i = 0; i < to.matched.length; i++) {
          if(i != to.matched.length-1){
            this.levelList.push({'title':to.matched[i].name,'path':''})
          }else{
            this.levelList.push({'title':to.matched[i].name,'path':to.matched[i].path})
          }
        }
    }
  }
  
};
</script>

<style lang="less" scoped>
#app {
  height: 100%;
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
}
.el-header {
  background-color: #409eff;
  color: #333;
  line-height: 60px;
}

.el-aside {
  color: #333;
}
.el-footer {
  background-color: #409eff;
  color: #333;
  text-align: center;
  line-height: 60px;
  display: flex;
}

.el-aside {
  // background-color: #d3dce6;
  color: #333;
  text-align: center;
  line-height: 200px;
}

.el-main {
  // background-color: #e9eef3;
  color: #333;
  text-align: left;
}

body > .el-container {
  margin-bottom: 40px;
}

.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
  line-height: 260px;
}

.el-container:nth-child(7) .el-aside {
  line-height: 320px;
}
.el-row {
  &:last-child {
    margin-bottom: 0;
  }
}
.el-col {
  border-radius: 4px;
}
.grid-content {
  border-radius: 4px;
  min-height: 36px;
}
.row-bg {
  padding: 10px 0;
}
.box-card {
  width: 100%;
  height: 96%;
  overflow-y: auto;
}
// .router-link-active {
  // text-decoration: none;
  // color: #303133;
// }
a {
  text-decoration: none;
  color: #303133;
}
</style>
