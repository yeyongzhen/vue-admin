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
          <el-button type="primary" @click="getTableData" size="small"
            >搜索</el-button
          >
        </el-form-item>
      </el-form>

      <div class="pull-right"></div>
    </div>

    <!-- 按钮区域 -->
    <div class="btns-container">
      <el-button type="primary" size="small" @click="visible = true">新增账号</el-button>
    </div>

    <!-- 列表区 -->
    <div class="items-list">
      <TableVue :tableConfig="tableConfig" :tableData="tableData">
        <template v-slot:status="slotData">
          <el-switch
            v-model="slotData.data.status"
            active-color="#13ce66"
          ></el-switch>
        </template>
        <template v-slot:action="slotData">
          <el-button
            @click="showDetail(slotData.data.id)"
            type="text"
            size="small"
            >查看</el-button
          >
          <el-button type="text" size="small" @click="edit">编辑</el-button>
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
  </div>
</template>

<script>
import { getAccountList } from "@/api/user.js";
import TableVue from "@c/Table";
import DialogAdd from "@/views/account/components/add";

export default {
  name: "AccountIndex",
  components: {
    TableVue,
    DialogAdd
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
            label: "账号",
            field: "account",
            width: "120px"
          },
          {
            label: "姓名",
            field: "nickname"
          },
          {
            label: "登录IP",
            field: "login_ip"
          },
          {
            label: "最后登录时间",
            field: "last_login_time",
            width: "150px"
          },
          {
            label: "创建时间",
            field: "created_at",
            width: "150px"
          },
          {
            label: "更新时间",
            field: "updated_at",
            width: "150px"
          },
          {
            label: "操作",
            columnType: "slot",
            slotName: "action"
          }
        ]
      },
      visible: false
    };
  },
  methods: {
    getTableData() {
      let requestData = this.handleSearchData();

      getAccountList(requestData).then(res => {
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
    edit() {
      this.confirm({
        content: "确认删除？",
        tip: "警告",
        type: "warning"
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
