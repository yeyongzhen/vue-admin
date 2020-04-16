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
          <el-button type="primary" @click="getAccountList" size="small"
            >搜索</el-button
          >
        </el-form-item>
        <el-form-item class="pull-right">
          <el-button type="primary" size="small">新增账号</el-button>
        </el-form-item>
      </el-form>

      <div class="pull-right">
      </div>
    </div>

    <!-- 按钮区域 
    <div class="btns-container">
      <el-button type="primary" size="small">新增账号</el-button>
    </div>
    -->

    <!-- 列表区 -->
    <div class="items-list">
      <el-table
        :data="accountList"
        border
        size="small"
        :cell-style="rowClass"
        :header-cell-style="headClass"
        style="width: 100%"
      >
        <el-table-column fixed prop="account" label="账号"></el-table-column>
        <el-table-column prop="nickname" label="姓名"></el-table-column>
        <el-table-column prop="login_ip" label="登录IP"></el-table-column>
        <el-table-column
          prop="last_login_time"
          label="最后登录"
        ></el-table-column>
        <el-table-column prop="created_at" label="创建时间"></el-table-column>
        <el-table-column fixed="right" label="操作" width="100">
          <template slot-scope="scope">
            <el-button @click="showDetail(scope.row)" type="text" size="small"
              >查看</el-button
            >
            <el-button type="text" size="small" @click="edit">编辑</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <!-- 分页区域 -->
    <el-pagination
        class="pull-right"
        background
        @current-change="handlePageChange"
        :current-page="currentPage"
        :page-size="pageSize"
        layout="total, prev, pager, next"
        :total="total"
      >
      </el-pagination>
  </div>
</template>

<script>
import { getAccountList } from "@/api/user.js";

export default {
  name: "AccountIndex",
  data() {
    return {
      searchData: {
        account: "",
        nickname: ""
      },
      accountList: [],
      total: 0,
      currentPage: 1,
      pageSize: 0
    };
  },
  methods: {
    getAccountList() {
      let requestData = this.handleSearchData();

      getAccountList(requestData).then(res => {
        this.accountList = res.data.data.account_list;
        this.total = res.data.data.pagination.total;
        this.pageSize = res.data.data.pagination.per_page;
      });
    },
    handleSearchData() {
      let requestData = {
        page: this.currentPage
      }
      if (this.searchData.account) {
        requestData.account = this.searchData.account;
      }
      if (this.searchData.nickname) {
        requestData.nickname = this.searchData.nickname;
      }

      return requestData;
    },
    handlePageChange(val) {
      console.log(`当前页: ${val}`);
      this.currentPage = val;
      this.getAccountList();
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
    },
    // 表头样式设置
    headClass() {
      return "text-align: center;background:#f5f7fa;";
    },
    // 表格样式设置
    rowClass() {
      return "text-align: center;";
    }
  },
  created() {
    this.getAccountList();
  }
};
</script>

<style lang="less" scoped>
.search-form .el-form .el-form-item {
  margin-bottom: 0;
}
</style>
