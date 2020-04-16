<template>
  <div id="main-wrap">
    <div class="main-content">
      <div class="content">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Main"
};
</script>

<style lang="less" scoped>
#main-wrap {
  height: 100vh;
  // position: fixed;
  // left: 250px;
  // top: 75px;
  // right: 0;
  // bottom: 0;
  // border: 30px solid #f7f7f7;
  // border-bottom: none;
  // -webkit-box-sizing: border;
}
.main-content {
  width: 100%;
  height: 100%;
  padding-top: 105px;
  padding-left: 280px;
  padding-right: 30px;
  box-sizing: border-box;
  background-color: #f7f7f7;
  -webkit-box-sizing: border-box;
  // @include webkit(transition, all .3s ease 0s);
  -webkit-transition: all 0.3s ease 0s;
  -moz-transition: all 0.3s ease 0s;
  -o-transition: all 0.3s ease 0s;
  -ms-transition: all 0.3s ease 0s;
  transition: all 0.3s ease 0s;
}
.open {
  .main-content {
    padding-left: 280px;
  }
}
.close {
  .main-content {
    padding-left: 94px;
  }
}
.content {
  width: 100%;
  height: 100%;
  // padding: 0 20px 0 20px;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  background-color: #fff;
}
</style>
