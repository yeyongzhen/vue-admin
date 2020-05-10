<template>
  <el-dialog
    title="新增"
    width="32%"
    :show-close="false"
    :visible.sync="showDialog"
    @open="openDialog"
    @close="close"
  >
    <el-form ref="addForm" :model="form" :rules="rules">
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
        @click="handleAddAccount"
        >确 定</el-button
      >
    </div>
  </el-dialog>
</template>

<script>
import { addAccount, getRoles } from "@/api/user";

export default {
  name: "DialogAdd",
  props: {
    dialogVisible: {
      type: Boolean,
      default: false
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
      formLabelWidth: "60px",
      rules: {
        account: [{ required: true, message: "请输入账号", trigger: "blur" }],
        nickname: [
          { required: true, message: "请输入真实姓名", trigger: "blur" }
        ]
      }
    };
  },
  watch: {
    dialogVisible: {
      handler(newValue, oldValue) {
        console.log("dialogAdd");
        console.log(newValue, oldValue);
        this.showDialog = newValue;
      }
    }
  },
  methods: {
    openDialog() {
      this.getRoleList();
    },
    close() {
      this.$emit("update:dialogVisible", false);
      this.resetForm();
    },
    handleAddAccount() {
      this.$refs["addForm"].validate(valid => {
        if (valid) {
          let requestData = {
            account: this.form.account,
            nickname: this.form.nickname,
            role_ids: this.form.checkedRoles
          };

          this.submitLoading = true;

          addAccount(requestData)
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
    getRoleList() {
      getRoles().then(res => {
        this.roles = res.data.data;
      });
    },
    handleCheckboxChange() {
      console.log("[ Checkbox ] checkbox values", this.form.checkedRoles);
    },
    resetForm() {
      this.$refs["addForm"].resetFields();
    }
  }
};
</script>

<style lang="less">
#roleform .el-checkbox-group {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  .el-checkbox {
    width: 50%;
    margin: 0;
    text-align: left;
  }
}
</style>
