<template>
  <el-dialog v-dialogDrag title="选择用户角色" width="30%" :visible="_visible" @close="_onCloseDialog" append-to-body>
    <el-form ref="_form" :model="_form" :disabled="readonly" label-width="100px">
      <el-form-item label="用户角色" prop="roleList">
        <el-select v-model.trim="_form.roleList" placeholder="请选择" multiple collapse-tags value-key="roleId">
          <el-option v-for="item in roleList" :key="item.roleId" :label="item.roleName" :value="item"></el-option>
        </el-select>
      </el-form-item>
    </el-form>
    <div slot="footer">
      <el-row type="flex" :gutter="20" justify="center">
        <el-button @click="onConfirm" v-if="!readonly" type="primary">确定保存</el-button>
        <el-button @click="_onCloseDialog">关 闭</el-button>
      </el-row>
    </div>
  </el-dialog>
</template>

<script>
import { queryByPage } from "@/api/modules/sys-role";

export default {
  extends: Table2form.default,
  name: "RoleListRelDialog",
  model: {
    prop: "_visible", //v-model 接受的值就是 显示与隐藏
    event: "_display",
  },
  props: {
    _visible: {
      type: Boolean,
      default: false,
    },
    readonly: {
      type: Boolean,
      default: false,
    },
    subForm: {
      type: Array,
      default: function () {
        // 默认值必须为函数，但是返回数组或对象
        return [];
      },
    },
  },
  data() {
    return {
      roleList: [],
    };
  },

  watch: {
    _visible(bool) {
      if (bool) {
        this.loadData();
      }
    },
  },

  methods: {
    onConfirm() {
      // 确定之后将数据发送到父组件中
      this.$refs["_form"].validate((valid) => {
        if (valid) {
          this.$emit("confirmEntity", this._form.roleList);
          this._onCloseDialog();
        }
      });
    },

    loadData() {
      this.$set(this._form, "roleList", this.subForm);
      this.loadRoleList();
    },
    loadRoleList() {
      queryByPage(1, 100).then((data) => {
        this.roleList = data.content.list;
      });
    },
  },
};
</script>

<style scoped>
</style>
