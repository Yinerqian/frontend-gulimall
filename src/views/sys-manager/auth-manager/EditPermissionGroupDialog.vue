<template>
  <el-dialog v-dialogDrag  :title="_getFormTitle('权限分组', groupId, readonly)" :visible="_visible" @close="_onCloseDialog" @opened="onOpened" width="500px">
    <el-form label-width="90px" :model="_form" :disabled="readonly" ref="form" :rules="rules" v-loading="_formLoading">
      <el-row>
        <el-col :span="24">
          <el-form-item label="分组名称" prop="groupName">
            <el-input :maxlength="50" v-model.trim="_form.groupName" />
          </el-form-item>
          <el-form-item label="父分组" prop="parentGroupId">
            <el-select v-model.trim="_form.parentGroupId" style="width: 100%">
              <el-option :key="0" label="无父分组" :value="'0'">
                <span style="float: left">无父分组</span>
                <span style="float: right; color: #8492a6; font-size: 13px">0</span>
              </el-option>
              <el-option v-for="item in groupList" :key="item.groupId" :label="item.groupName" :value="item.groupId">
                <span style="float: left">{{ item.groupName }}</span>
                <span style="float: right; color: #8492a6; font-size: 13px">{{ item.sort || 0 }}</span>
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="排序" prop="sort">
            <el-input-number v-model.trim.number="_form.sort" :min="0" style="width: 100%; text-align: left !important;" />
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <div slot="footer">
      <el-row type="flex" :gutter="20" justify="center">
        <el-button @click="_onSubmitForm(groupId, readonly)" v-if="!readonly" type="primary">确定保存</el-button>
        <el-button @click="_onCloseDialog">关 闭</el-button>
      </el-row>
    </div>
  </el-dialog>
</template>

<script>
import {
  findPermissionByGroupId,
  savePermissionGroupInfo,
  updatePermissionGroupInfo,
} from "@/api/modules/sys-permission";

export default {
  extends: Table2form.default,
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
    groupId: [String, Number],
    groupList: {
      type: Array,
      default: []
    },
  },
  data() {
    return {
      createRowApi: savePermissionGroupInfo,
      updateRowApi: updatePermissionGroupInfo,
      getRowApi: findPermissionByGroupId,
      rules: {
        groupName: [this._mustValid()],
      },
    };
  },
  methods: {
    onOpened() {
      if (!this.groupId) {
        this.$set(this._form, 'parentGroupId', '0')
      } else {
        this._loadDialogForm(this.groupId, { groupId: this.groupId });
      }
    },
  },
};
</script>

<style scoped lang="scss"></style>
