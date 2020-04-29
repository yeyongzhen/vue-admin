<template>
  <div id="permission">
    <!-- 搜索区域 
    <div class="search-form">
      <el-form :inline="true" :model="searchData" class="demo-form-inline">
        <el-form-item label="姓名:">
          <el-input
            v-model="searchData.nickname"
            maxlength="10"
            size="small"
            placeholder="姓名"
          ></el-input>
        </el-form-item>
        <el-form-item label="账号:">
          <el-input
            v-model="searchData.account"
            maxlength="11"
            size="small"
            placeholder="账号"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="getTableData" size="small"
            >搜索</el-button
          >
        </el-form-item>
      </el-form>

      <div class="pull-right"></div>
    </div>
    -->

    <!-- 按钮区域 -->
    <div class="btns-container">
      <el-button type="primary" size="small" @click="visible = true"
        >新增权限</el-button
      >
    </div>

    <!-- 列表区 -->
    <div class="items-list">
      <TableVue :tableConfig="tableConfig" :tableData="tableData">
        <template v-slot:action="slotData">
          <el-button type="text" size="small" @click="edit(slotData.data.id)"
            >编辑</el-button
          >
          <el-button type="text" size="small" @click="del(slotData.data.id)"
            >删除</el-button
          >
        </template>
      </TableVue>
    </div>

    <!-- 分页区域 -->
    <el-pagination
      class="pull-right"
      background
      small
      @size-change="pageSizeChange"
      @current-change="pageChange"
      :current-page="currentPage"
      :page-sizes="[10, 20, 30, 40, 50]"
      :page-size="pageSize"
      layout="total, sizes, prev, pager, next"
      :total="total"
    >
    </el-pagination>

    <!-- 新增弹窗 -->
    <DialogAdd :dialogVisible.sync="visible" @on-reload-table="getTableData" />
    <!-- 编辑弹窗 -->
    <DialogEdit
      :dialogVisible.sync="dialogEditVisible"
      :id="permissionId"
      @on-reload-table="getTableData"
    />
  </div>
</template>

<script>
import { getPermissionList, delPermission } from "@/api/permission.js";
import TableVue from "@c/Table";
import DialogAdd from "@/views/permission/components/add";
import DialogEdit from "@/views/permission/components/edit";

export default {
  name: "PermissionIndex",
  components: {
    TableVue,
    DialogAdd,
    DialogEdit
  },
  data() {
    return {
      searchData: {
        account: "",
        nickname: ""
      },
      tableData: [],
      total: 0,
      pageSize: 10,
      currentPage: 1,
      tableConfig: {
        selection: false,
        thead: [
          {
            label: "ID",
            field: "id"
          },
          {
            label: "权限",
            field: "name"
          },
          {
            label: "显示名称",
            field: "display_name"
          },
          {
            label: "创建时间",
            field: "created_at"
          },
          {
            label: "操作",
            columnType: "slot",
            slotName: "action"
          }
        ]
      },
      visible: false,
      dialogEditVisible: false,
      permissionId: 0
    };
  },
  methods: {
    getTableData() {
      console.log("get table data ...");
      let requestData = this.handleSearchData();

      getPermissionList(requestData).then(res => {
        this.tableData = res.data.data.data_list;
        this.total = res.data.data.total;
        this.pageSize = res.data.data.page_size;
      });
    },
    handleSearchData() {
      let requestData = {
        page: this.currentPage,
        per_page: this.pageSize
      };
      if (this.searchData.account) {
        requestData.account = this.searchData.account;
      }
      if (this.searchData.nickname) {
        requestData.nickname = this.searchData.nickname;
      }

      return requestData;
    },
    pageChange(val) {
      console.log(`当前页: ${val}`);
      this.currentPage = val;
      this.getTableData();
    },
    pageSizeChange(val) {
      console.log(`每页显示: ${val} 条`);
      this.pageSize = val;
      this.getTableData();
    },
    edit(permissionId) {
      console.log(permissionId);
      this.dialogEditVisible = true;
      this.permissionId = permissionId;
    },
    del(id) {
      this.$confirm("确认删除该权限, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
        center: true
      })
        .then(() => {
          let requestData = { id: id };
          delPermission(requestData).then(res => {
            this.$message.success(res.data.message);
            this.getTableData();
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    }
  },
  created() {
    this.getTableData();
  }
};
</script>

<style lang="less" scoped>
.search-form .el-form .el-form-item {
  margin-bottom: 0;
}
</style>
