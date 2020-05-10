<template>
  <el-dialog
    title="新增"
    width="30%"
    :show-close="false"
    :visible.sync="showDialog"
    @close="close"
  >
    <el-form ref="addForm" :model="form" :rules="rules">
      <el-form-item label="角色" :label-width="formLabelWidth" prop="name">
        <el-input v-model="form.name" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item
        label="显示名称"
        :label-width="formLabelWidth"
        prop="displayName"
      >
        <el-input v-model="form.displayName" autocomplete="off"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button size="small" @click="close">取 消</el-button>
      <el-button
        type="primary"
        :loading="submitLoading"
        size="small"
        @click="handleAddRole"
        >确 定</el-button
      >
    </div>
  </el-dialog>
</template>

<script>
import { addRole } from "@/api/role";

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
        name: "",
        displayName: ""
      },
      submitLoading: false,
      formLabelWidth: "80px",
      rules: {
        name: [{ required: true, message: "请输入角色", trigger: "blur" }],
        displayName: [
          { required: true, message: "请输入显示名称", trigger: "blur" }
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
    handleAddRole() {
      this.$refs["addForm"].validate(valid => {
        if (valid) {
          let requestData = {
            name: this.form.name,
            display_name: this.form.displayName
          };

          this.submitLoading = true;

          addRole(requestData)
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
