<template>
  <el-dialog
    title="编辑"
    width="30%"
    :show-close="false"
    :visible.sync="showDialog"
    @close="close"
    @open="openDialog"
  >
    <el-form :model="form" :rules="rules" ref="editForm">
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
      <el-button @click="close" size="small">取 消</el-button>
      <el-button
        type="primary"
        :loading="submitLoading"
        @click="handleEditRole"
        size="small"
        >确 定</el-button
      >
    </div>
  </el-dialog>
</template>

<script>
import { updateRole, getRoleById } from "@/api/role";

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
        name: "",
        displayName: ""
      },
      submitLoading: false,
      rules: {
        name: [{ required: true, message: "请输入角色", trigger: "blur" }],
        displayName: [
          { required: true, message: "请输入显示名称", trigger: "blur" }
        ]
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
      this.getFormDataById();
    },
    getFormDataById() {
      let requestData = {
        id: this.id
      };
      getRoleById(requestData).then(res => {
        console.log(res.data);
        this.form.name = res.data.data.name;
        this.form.displayName = res.data.data.display_name;
      });
    },
    handleEditRole() {
      this.$refs["editForm"].validate(valid => {
        if (valid) {
          let requestData = {
            id: this.id,
            name: this.form.name,
            display_name: this.form.displayName
          };

          this.submitLoading = true;

          updateRole(requestData)
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
      this.form.name = "";
      this.form.displayName = "";
      this.$refs["editForm"].resetFields();
    }
  }
};
</script>

<style lang="less"></style>
