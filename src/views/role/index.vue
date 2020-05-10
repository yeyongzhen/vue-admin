<template>
  <div id="role">
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
        >新增角色</el-button
      >
    </div>

    <!-- 列表区 -->
    <div class="items-list">
      <TableVue :table-config="tableConfig" :table-data="tableData">
        <template v-slot:action="slotData">
          <el-button type="text" size="small" @click="edit(slotData.data.id)"
            >编辑</el-button
          >
          <el-button
            type="text"
            size="small"
            @click="assignPermissions(slotData.data.id)"
            >分配权限</el-button
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
      :current-page="currentPage"
      :page-sizes="[10, 20, 30, 40, 50]"
      :page-size="pageSize"
      layout="total, sizes, prev, pager, next"
      :total="total"
      @size-change="pageSizeChange"
      @current-change="pageChange"
    >
    </el-pagination>

    <!-- 新增弹窗 -->
    <DialogAdd :dialog-visible.sync="visible" @on-reload-table="getTableData" />
    <!-- 编辑弹窗 -->
    <DialogEdit
      :id="roleId"
      :dialog-visible.sync="dialogEditVisible"
      @on-reload-table="getTableData"
    />
    <!-- 分配权限 -->
    <DialogAssign :id="roleId" :dialog-visible.sync="dialogAssignVisible" />
  </div>
</template>

<script>
import { getRoleList, delRole } from "@/api/role.js";
import TableVue from "@c/Table";
import DialogAdd from "@/views/role/components/add";
import DialogEdit from "@/views/role/components/edit";
import DialogAssign from "@/views/role/components/assign";

export default {
  name: "RoleIndex",
  components: {
    TableVue,
    DialogAdd,
    DialogEdit,
    DialogAssign
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
            field: "id",
            width: "60px"
          },
          {
            label: "角色",
            field: "name"
          },
          {
            label: "显示名称",
            field: "display_name"
          },
          {
            label: "创建时间",
            field: "created_at",
            width: "180px"
          },
          {
            label: "更新时间",
            field: "updated_at",
            width: "180px"
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
      dialogAssignVisible: false,
      roleId: 0
    };
  },
  created() {
    this.getTableData();
  },
  methods: {
    getTableData() {
      let requestData = this.handleSearchData();

      getRoleList(requestData).then(res => {
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
    edit(roleId) {
      console.log(roleId);
      this.dialogEditVisible = true;
      this.roleId = roleId;
    },
    assignPermissions(roleId) {
      console.log(roleId);
      this.dialogAssignVisible = true;
      this.roleId = roleId;
    },
    del(id) {
      this.$confirm("确认删除该角色, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
        center: true
      })
        .then(() => {
          let requestData = { id: id };
          delRole(requestData).then(res => {
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
  }
};
</script>

<style lang="less" scoped>
.search-form .el-form .el-form-item {
  margin-bottom: 0;
}
</style>
