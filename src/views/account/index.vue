<template>
  <div id="account">
    <!-- 搜索区域 -->
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
          <el-button type="primary" size="small" @click="getTableData"
            >搜索</el-button
          >
        </el-form-item>
      </el-form>

      <div class="pull-right"></div>
    </div>

    <!-- 按钮区域 -->
    <div class="btns-container">
      <el-button type="primary" size="small" @click="visible = true"
        >新增账号</el-button
      >
    </div>

    <!-- 列表区 -->
    <div class="items-list">
      <TableVue :table-config="tableConfig" :table-data="tableData">
        <template v-slot:enable="slotData">
          <el-switch
            v-model="slotData.data.enable"
            active-color="#13ce66"
            inactive-color="#ff4949"
            @change="handleSwitchValue(slotData.data.id, slotData.data.enable)"
          ></el-switch>
        </template>
        <template v-slot:action="slotData">
          <el-button
            type="text"
            size="small"
            @click="editOrDetail(slotData.data.id)"
            >查看/编辑</el-button
          >
          <!-- <el-button type="text" size="small" @click="edit">删除</el-button> -->
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
    <DialogEdit :dialog-visible.sync="dialogEditVisible" :id="accountId" @on-reload-table="getTableData" />
  </div>
</template>

<script>
import { getAccountList, changeAccountStatus } from "@/api/user.js";
import TableVue from "@c/Table";
import DialogAdd from "@/views/account/components/add";
import DialogEdit from "@/views/account/components/edit";

export default {
  name: "AccountIndex",
  components: {
    TableVue,
    DialogAdd,
    DialogEdit
  },
  data() {
    return {
      searchData: {
        account: "",
        nickname: "",
        enable: ""
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
            width: "64px",
            sortable: true
          },
          {
            label: "账号",
            field: "account",
            width: "120px"
          },
          {
            label: "姓名",
            field: "nickname"
          },
          {
            label: "角色",
            field: "roles",
          },
          // {
          //   label: "状态",
          //   field: "enable",
          //   columnType: "slot",
          //   slotName: "enable"
          // },
          {
            label: "创建时间",
            field: "created_at",
            width: "150px"
          },
          {
            label: "最近登录时间",
            field: "last_login_time",
            width: "150px"
          },
          {
            label: "登录IP",
            field: "login_ip",
            width: "100px"
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
      accountId: 0,
      switchClickStatus: false
    };
  },
  created() {
    this.getTableData();
  },
  methods: {
    getTableData() {
      let requestData = this.handleSearchData();

      getAccountList(requestData).then(res => {
        console.log("accountList ", res.data.data.data_list);
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
    showDetail(row) {
      console.log(row);
    },
    // 查看、编辑
    editOrDetail(accountId) {
      console.log(accountId);
      this.dialogEditVisible = true;
      this.accountId = accountId;
    },
    getRoleName(data) {
      if (data.length === 0) {
        return "";
      }

      let roles = "";
      for (let item of data) {
        roles += item.display_name + "、";
      }
      return roles.slice(0, -1);
    },
    handleSwitchValue(id, enable) {
      if (this.switchClickStatus) {
        return false;
      }
      this.switchClickStatus = true;

      if (enable === true) {
        enable = 1;
      } else if (enable === false) {
        enable = 2
      } else {
        return false;
      }

      changeAccountStatus({
        id: id,
        enable: enable
      }).then(res => {
        this.$message.success(res.data.message);
        this.switchClickStatus = !this.switchClickStatus;
      }).catch(error => {
        this.switchClickStatus = !this.switchClickStatus;
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
