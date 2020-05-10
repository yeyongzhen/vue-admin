<template>
  <el-select v-model="selectValue" placeholder="请选择">
    <el-option
      v-for="item in initOptionData"
      :key="item.value"
      :value="item.value"
      :label="item.label"
    ></el-option>
  </el-select>
</template>

<script>
export default {
  props: {
    optionData: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      selectValue: "nickname",
      options: [
        { value: "nickname", label: "姓名" },
        { value: "account", label: "账号" }
      ],
      initOptionData: []
    };
  },
  mounted() {
    this.initOptions();
  },
  methods: {
    initOptions() {
      if (this.optionData.length === 0) {
        return false;
      }

      let options = [];
      this.optionData.forEach(item => {
        let arr = this.options.filter(elem => elem.value == item);

        if (arr.length > 0) {
          options.push(arr[0]);
        }
      });

      if (options.length === 0) {
        return false;
      }

      this.initOptionData = options;
      this.selectValue = options[0].value;
    }
  }
};
</script>

<style lang="less"></style>

<!-- 组件说明
组件目录位置：src > components > Select > index.vue;
组件引用方式：import SelectVue from "@c/Select";
template：<SelectVue :config="configOption" />

参数配置：
configOption: {
  init: ["name", "phone"]
}
configOption: Object;
init: Array;
-->
