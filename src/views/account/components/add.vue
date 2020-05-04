<template>
  <el-dialog
    title="新增"
    width="30%"
    :show-close="false"
    :visible.sync="showDialog"
    @close="close"
  >
    <el-form :model="form" :rules="rules" ref="addForm">
      <el-form-item label="账号" :label-width="formLabelWidth" prop="account">
        <el-input v-model="form.account" autocomplete="off" maxlength="11"></el-input>
      </el-form-item>
      <el-form-item
        label="姓名"
        :label-width="formLabelWidth"
        prop="nickname"
      >
        <el-input v-model="form.nickname" autocomplete="off"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="close" size="small">取 消</el-button>
      <el-button
        type="primary"
        :loading="submitLoading"
        @click="handleAddAccount"
        size="small"
        >确 定</el-button
      >
    </div>
  </el-dialog>
</template>

<script>
import { addAccount } from "@/api/user";

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
        nickname: ""
      },
      submitLoading: false,
      formLabelWidth: "80px",
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
    close() {
      this.$emit("update:dialogVisible", false);
      this.resetForm();
    },
    handleAddAccount() {
      this.$refs["addForm"].validate(valid => {
        if (valid) {
          let requestData = {
            account: this.form.account,
            nickname: this.form.nickname
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
    resetForm() {
      this.$refs["addForm"].resetFields();
    }
  }
};
</script>

<style lang="less"></style>
