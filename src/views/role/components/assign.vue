<template>
  <el-dialog
    title="分配权限"
    width="54%"
    :show-close="true"
    :visible.sync="showDialog"
    @open="openDialog"
    @close="close"
  >
    <el-transfer
      v-model="hasPermissions"
      :titles="['未拥有的权限', '已有的权限']"
      :button-texts="['移除', '添加']"
      :data="transferData"
      @change="handleTransferChange"
    ></el-transfer>
    <div slot="footer" class="dialog-footer">
      <el-button size="small" @click="close">取 消</el-button>
      <el-button
        type="primary"
        :loading="submitLoading"
        size="small"
        @click="handleAssignPermissions"
        >确 定</el-button
      >
    </div>
  </el-dialog>
</template>

<script>
import { getAllPermissions } from "@/api/permission";
import { assignPermissions } from "@/api/role";

export default {
  name: "DialogAssign",
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
      transferData: [],
      hasPermissions: [],
      submitLoading: false
    };
  },
  watch: {
    dialogVisible: {
      handler(newValue, oldValue) {
        console.log("dialogAssign");
        console.log(newValue, oldValue);
        this.showDialog = newValue;
      }
    }
  },
  methods: {
    handleTransferChange(value, direction, movedKeys) {
      console.log("[ Transfer ] Handle Transfer Change.");
      console.log("[ Transfer ] selected value", value);
      console.log("[ Transfer ] direction", direction);
      console.log("[ Transfer ] Moved Keys ", movedKeys); // Object

      if (direction === "right") {
        this.hasPermissions.push(movedKeys);
      } else {
        this.hasPermissions.pop(movedKeys);
      }

      console.log("[ Transfer ] Has Permissions ", this.hasPermissions);
    },
    openDialog() {
      this.getTransferData();
    },
    getTransferData() {
      getAllPermissions({ id: this.id }).then(res => {
        let data = res.data.data;
        this.transferData = data.all_permissions;
        this.hasPermissions = data.current_permissions;
      });
    },
    handleAssignPermissions() {
      this.submitLoading = true;

      let requestData = {
        role_id: this.id,
        permissions: this.hasPermissions
      };
      assignPermissions(requestData)
        .then(res => {
          this.$message.success(res.data.message);
          this.close();
          this.submitLoading = false;
        })
        .catch(error => {
          console.log(error);
          this.submitLoading = false;
        });
    },
    close() {
      this.$emit("update:dialogVisible", false);
      this.hasPermissions = [];
      this.transferData = [];
    }
  }
};
</script>

<style lang="less">
.el-dialog__body {
  text-align: center !important;
}
.el-transfer-panel {
  text-align: left;
}
</style>
