<template>
  <div id="header-wrap">
    <div class="pull-left header-icon" @click="collapseSidebar">
      <svg-icon icon-class="menu" class-name="menu" />
    </div>
    <div class="pull-right">
      <div class="user-info pull-left">
        <el-dropdown @command="handleCommand">
          <span class="el-dropdown-link">
            {{ nickname }}<i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="">基本资料</el-dropdown-item>
            <el-dropdown-item command="">修改密码</el-dropdown-item>
            <el-dropdown-item command="logout" divided
              >退出登录</el-dropdown-item
            >
          </el-dropdown-menu>
        </el-dropdown>
      </div>
      <div class="header-icon pull-left">
        <svg-icon icon-class="more" class-name="more" />
      </div>
    </div>
  </div>
</template>

<script>
// import {mapState} from 'vuex';

export default {
  name: "Header",
  computed: {
    nickname: function() {
      return this.$store.state.auth.userInfo.nickname;
    }
  },
  created() {
    console.log(this.$store.state.auth.userInfo);
  },
  methods: {
    collapseSidebar() {
      this.$store.dispatch("app/collapseSidebar");
    },
    handleCommand(command) {
      console.log("Click on item => " + command);

      if (command == "logout") {
        this.$store.dispatch("auth/handleLogout").then(() => {
          location.reload();
        });
      }
    }
  }
};
</script>

<style lang="less" scoped>
#header-wrap {
  position: fixed;
  top: 0;
  right: 0;
  left: 220px;
  height: 60px;
  background-color: #fff;
  line-height: 60px;
  z-index: 1001;
  -webkit-box-shadow: 0 3px 16px 0 rgba(0, 0, 0, 0.1);
  // @include webkit(transition, all .3s ease 0s);
  -webkit-transition: all 0.3s ease 0s;
  -moz-transition: all 0.3s ease 0s;
  -o-transition: all 0.3s ease 0s;
  -ms-transition: all 0.3s ease 0s;
  transition: all 0.3s ease 0s;
}
.open {
  #header-wrap {
    left: 220px;
  }
}
.close {
  #header-wrap {
    left: 64px;
  }
}
.header-icon {
  padding: 0 32px;
  svg {
    margin-bottom: -8px;
    font-size: 30px;
    cursor: pointer;
  }
}
.user-info {
  height: 100%;
  padding: 0 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-right: 1px solid #ededed;
  + .header-icon {
    padding: 0 28px;
  }
  img {
    width: 42px;
    height: 42px;
    border-radius: 50%;
    margin-right: 15px;
    border: 2px solid #eee;
  }
}
.el-dropdown-link {
  cursor: pointer;
}
</style>
