<template>
  <el-dialog
    title="查看/编辑"
    width="30%"
    :show-close="false"
    :visible.sync="showDialog"
    @close="close"
    @open="openDialog"
  >
    <el-form ref="editForm" :model="form" :rules="rules">
      <el-form-item label="账号" :label-width="formLabelWidth" prop="account">
        <el-input
          v-model="form.account"
          autocomplete="off"
          maxlength="11"
        ></el-input>
      </el-form-item>
      <el-form-item label="姓名" :label-width="formLabelWidth" prop="nickname">
        <el-input v-model="form.nickname" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item
        id="roleform"
        label="角色"
        :label-width="formLabelWidth"
        prop="checkedRoles"
      >
        <el-checkbox-group
          v-model="form.checkedRoles"
          @change="handleCheckboxChange"
        >
          <el-checkbox
            v-for="item in roles"
            :key="item.id"
            :label="item.id"
            name="type"
            size="small"
            >{{ item.display_name }}</el-checkbox
          >
        </el-checkbox-group>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button size="small" @click="close">取 消</el-button>
      <el-button
        type="primary"
        :loading="submitLoading"
        size="small"
        @click="handleEditAccount"
        >确 定</el-button
      >
    </div>
  </el-dialog>
</template>

<script>
import { getRoles, getAccountById, updateAccount } from "@/api/user";

export default {
  name: "DialogEdit",
  props: {
    dialogVisible: {
      type: Boolean,
      default: false
    },
    id: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      showDialog: false,
      form: {
        account: "",
        nickname: "",
        checkedRoles: []
      },
      roles: [],
      submitLoading: false,
      rules: {
        account: [{ required: true, message: "请输入权限", trigger: "blur" }],
        nickname: [{ required: true, message: "请输入显示名称", trigger: "blur" }]
      },
      formLabelWidth: "80px"
    };
  },
  watch: {
    dialogVisible: {
      handler(newValue, oldValue) {
        console.log("showDialog");
        console.log(newValue, oldValue);
        this.showDialog = newValue;
      }
    }
  },
  methods: {
    close() {
      this.$emit("update:dialogVisible", false);
      this.resetForm();
    },
    openDialog() {
      this.getRoleList();
      this.getFormDataById();
    },
    getRoleList() {
      getRoles().then(res => {
        this.roles = res.data.data;
      });
    },
    getFormDataById() {
      let requestData = {
        id: this.id
      };
      getAccountById(requestData).then(res => {
        console.log(res.data);
        let data = res.data.data;
        this.form.account = data.account;
        this.form.nickname = data.nickname;
        this.form.checkedRoles = data.has_roles;
      });
    },
    handleCheckboxChange() {
      console.log("[ Checkbox ] checkbox values", this.form.checkedRoles);
    },
    handleEditAccount() {
      this.$refs["editForm"].validate(valid => {
        if (valid) {
          let requestData = {
            id: this.id,
            account: this.form.account,
            nickname: this.form.nickname,
            role_ids: this.form.checkedRoles
          };

          this.submitLoading = true;

          updateAccount(requestData)
            .then(res => {
              this.$message.success(res.data.message);
              this.close();
              this.submitLoading = false;
              this.$emit("on-reload-table");
            })
            .catch(error => {
              console.log(error);
              this.submitLoading = false;
            });
        } else {
          return false;
        }
      });
    },
    resetForm() {
      this.form.account = "";
      this.form.nickname = "";
      this.form.checkedRoles = [];
      this.$refs["editForm"].resetFields();
    }
  }
};
</script>

<style lang="less"></style>
