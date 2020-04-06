<template>
  <div id="header-wrap">
    <div class="pull-left header-icon">
      <svg-icon iconClass="menu" className="menu" />
    </div>
    <div class="pull-right">
      <div class="user-info pull-left">
        <img src="../../../assets/logo.png" alt="avatar" />
        <el-dropdown>
          <span class="el-dropdown-link">
            管理员<i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>基本资料</el-dropdown-item>
            <el-dropdown-item>修改密码</el-dropdown-item>
            <el-dropdown-item divided>退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
      <div class="header-icon pull-left">
        <svg-icon iconClass="more" className="more" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Header"
};
</script>

<style lang="less" scoped>
#header-wrap {
  position: fixed;
  top: 0;
  right: 0;
  left: 250px;
  height: 75px;
  background-color: #fff;
  -webkit-box-shadow: 0 3px 16px 0 rgba(0, 0, 0, 0.1);
  line-height: 75px;
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
// .el-icon-arrow-down {
//   font-size: 12px;
// }
</style>
