<template>
  <div id="sidebar-wrap">
    <div class="sidebar-logo">
      <img src="../../../assets/logo.png" alt="logo" />
      <span v-if="!isCollapse">VueAdmin</span>
    </div>
    <el-menu
      default-active="2"
      class="el-menu-vertical-demo"
      @open="handleOpen"
      @close="handleClose"
      :collapse="isCollapse"
      background-color="#344a5f"
      text-color="#fff"
      active-text-color="#ffd04b"
      router
    >
      <template v-for="(item, index) in routers">
        <el-submenu v-if="!item.hidden" :key="item.id" :index="index + ''">
          <!-- 一级菜单的模板区 -->
          <template slot="title">
            <svg-icon :iconClass="item.meta.icon" :className="item.meta.icon" />
            <span>{{ item.meta.name }}</span>
          </template>

          <!-- 二级菜单 -->
          <el-menu-item
            v-for="subItem in item.children"
            :key="subItem.id"
            :index="subItem.path"
          >
            <template slot="title">
              <span>{{ subItem.meta.name }}</span>
            </template>
          </el-menu-item>
        </el-submenu>
      </template>
    </el-menu>
  </div>
</template>

<script>
export default {
  name: "Sidebar",
  data() {
    return {
      routers: null
    };
  },
  computed: {
    // isCollapse: function() {
    //   return this.$store.state.isCollapse;
    // }
    isCollapse() {
      return this.$store.state.app.isCollapse;
    }
  },
  created() {
    this.routers = this.$router.options.routes;
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    }
  }
};
</script>

<style lang="less" scoped>
#sidebar-wrap {
  position: fixed;
  top: 0;
  left: 0;
  width: 250px;
  height: 100vh;
  background-color: #344a5f;
  // 过渡效果
  // @include webkit(transition, all .3s ease 0s);
  -webkit-transition: all 0.3s ease 0s;
  -moz-transition: all 0.3s ease 0s;
  -o-transition: all 0.3s ease 0s;
  -ms-transition: all 0.3s ease 0s;
  transition: all 0.3s ease 0s;
  svg {
    font-size: 20px;
    margin-right: 10px;
  }
}
.open {
  #sidebar-wrap {
    width: 250px;
  }
}
.close {
  #sidebar-wrap {
    width: 64px;
  }
}
.el-menu {
  border-right: none;
}
.sidebar-logo {
  height: 75px;
  padding: 0 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  -webkit-box-shadow: 0 3px 16px 0 rgba(0, 0, 0, 0.1);
  img {
    width: 42px;
    height: 42px;
    margin-right: 10px;
  }
  span {
    font-size: x-large;
    color: #fff;
    font-weight: bold;
  }
}
</style>
