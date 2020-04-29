<template>
  <el-table
    :data="tableData"
    border
    size="small"
    :cell-style="rowClass"
    :header-cell-style="headClass"
    style="width: 100%"
  >
    <!-- 多选框 -->
    <el-table-column v-if="config.selection" type="selection"></el-table-column>

    <template v-for="item in config.thead">
      <!-- v-slot 插槽 -->
      <el-table-column
        :key="item.field"
        :prop="item.field"
        :label="item.label"
        :width="item.width"
        v-if="item.columnType === 'slot'"
      >
        <template slot-scope="scope">
          <slot :name="item.slotName" :data="scope.row"></slot>
        </template>
      </el-table-column>

      <!-- 普通文本 -->
      <el-table-column
        :key="item.field"
        :prop="item.field"
        :label="item.label"
        :width="item.width"
        v-else
      ></el-table-column>
    </template>
  </el-table>
</template>

<script>
export default {
  name: "TableVue",
  props: {
    tableConfig: {
      type: Object,
      default: () => {}
    },
    tableData: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      config: {
        selection: false,
        thead: []
      }
    };
  },
  methods: {
    // 表头样式设置
    headClass() {
      return "text-align: center;background:#f5f7fa;";
    },
    // 表格样式设置
    rowClass() {
      return "text-align: center;";
    },
    // 初始化表格配置
    initTableConfig() {
      let configData = this.tableConfig;
      let keys = Object.keys(this.config);
      console.log(keys);

      for (let key in configData) {
        if (keys.includes(key)) {
          this.config[key] = configData[key];
        }
      }
    }
  },
  beforeMount() {
    this.initTableConfig();
  }
};
</script>

<style lang="less" scoped></style>

<!-- 
  初始化数据，不需要监听，
  可在挂在之前预先处理
-->

<!--
  v-slot 插槽，父组件传内容到子组件显示
  1.匿名插槽，没有指定某一个，全部显示
  2.具名插槽：指定插槽显示内容
  3.作用域插槽：可以进行数据绑定，父子组件通讯
-->
