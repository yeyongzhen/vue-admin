<template>
  <div id="layout">
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
  }
};
</script>

<style lang="less" scoped></style>
