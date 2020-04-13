<template>
  <div id="layout" :class="[menuCollapseStatus ? 'close' : 'open']">
    <LayoutHeader></LayoutHeader>
    <LayoutMain></LayoutMain>
    <LayoutSidebar></LayoutSidebar>
  </div>
</template>

<script>
import LayoutHeader from "./components/Header";
import LayoutMain from "./components/Main";
import LayoutSidebar from "./components/Sidebar";

export default {
  name: "layout",
  components: {
    LayoutHeader,
    LayoutMain,
    LayoutSidebar
  },
  computed: {
    menuCollapseStatus() {
      return this.$store.state.app.isCollapse;
    }
  }
};
</script>

<style lang="less" scoped></style>
