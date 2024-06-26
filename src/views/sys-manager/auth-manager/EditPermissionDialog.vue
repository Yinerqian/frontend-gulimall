<template>
  <el-dialog v-dialogDrag  :title="_getFormTitle('权限', primaryId, readonly)" :visible="_visible" @close="_onCloseDialog" @open="initForm" width="40%">
    <el-form label-width="100px" :model="_form" :disabled="readonly" ref="form" :rules="rules" v-loading="_formLoading">
      <el-row>
        <el-col :span="24">
          <el-form-item label="分组名称" prop="groupName">
            <el-input :maxlength="100" v-model.trim="_form.groupName" disabled />
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="权限名称" prop="permissionName">
            <el-input :maxlength="100" v-model.trim="_form.permissionName" />
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="权限编码" prop="permissionCode">
            <el-input :maxlength="50" v-model.trim="_form.permissionCode" />
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="权限类型" prop="permissionType">
            <el-select v-model.trim="_form.permissionType" style="width: 100%">
              <el-option v-for="item in permissionOptions" :key="item.key" :label="item.title" :value="item.key"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="24" v-if="_form.permissionType == 'MENU'">
          <el-form-item label="排序" prop="sort">
            <el-input-number v-model.trim.number="_form.sort" :min="0" style="width: 100%;text-align:left" />
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="菜单URL" prop="menuUrl">
            <el-input :maxlength="100" v-model.trim="_form.menuUrl" />
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="菜单图标" prop="menuIconClass">
            <el-row type="flex" align="middle">
              <IconSelect v-model.trim="_form.menuIconClass" @change="onSelect" :iconList="iconList" />
            </el-row>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="管理员权限" prop="platformAdminFlag">
            <el-radio-group v-model.trim="_form.platformAdminFlag">
              <el-radio :label="1">是</el-radio>
              <el-radio :label="0">否</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <div slot="footer">
      <el-row type="flex" :gutter="20" justify="center">
        <el-button @click="_onSubmitForm(primaryId, readonly)" v-if="!readonly" type="primary">确定保存</el-button>
        <el-button @click="_onCloseDialog">关 闭</el-button>
      </el-row>
    </div>
  </el-dialog>
</template>

<script>
import {
  findPermissionByGroupId,
  findPermissionByPermissionId,
  savePermissionInfo,
  updatePermissionInfo,
  getPermissionTypeList,
} from "@/api/modules/sys-permission";
import "./iconfont";

export default {
  extends: Table2form.default,
  components: {
    IconSelect: (resolve) => require(["@/components/IconSelect"], resolve),
  },
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
    primaryId: [String, Number],
    groupId: [String, Number],
  },
  created() {
    this.loadPermissionTypeList();
  },
  data() {
    return {
      updateRowApi: updatePermissionInfo,
      createRowApi: savePermissionInfo,
      getRowApi: findPermissionByPermissionId,
      permissionOptions: [],
      rules: {
        permissionName: [this._mustValid()],
        permissionCode: [this._mustValid()],
        permissionType: [this._mustValid()],
      },
      iconList: [
        "zuhuguanli",
        "yonghuguanli",
        "yingyongguanli",
        "rizhiguanli",
        "quanxianguanli",
        "jiaoseguanli",
        "jigouguanli",
        "shebeiguanli",
        "shebeijianmo",
        "shebeikongjian",
        "tongxinguanli",
        "guizeyinqing",
        "shijiantongzhi",
        "shujuyuan",
        "biaodanshuju",
        "biaodansheji",
        "jihuagongdan",
        "biaodanjihua",
        "biaodanfenzu",
        "shujukujicheng",
        "restjicheng",
        "yewuxitongguanli",
        "shujuyuanguanli",
        "jiedianguanli",
        "kaifazheguanli",
        "jiekoutiaoshi",
        "kaifangjiekou",
        "jiekourizhi",
        "wodeshenpi",
        "shouye",
        "wodejiekou",
        "kaifangkongjian",
        "wodeshenqing",
      ],
    };
  },
  methods: {
    initForm() {
      if (!this.primaryId) {
        this._form = { platformAdminFlag: 0 }
        this.loadForm()
      } else {
        this.loadDialogForm(this.primaryId, { permissionId: this.primaryId }).then(res => {
        })
      }
    },
    loadPermissionTypeList() {
      getPermissionTypeList().then((res) => {
        if (res.successFlag) {
          this.permissionOptions = res.content || [];
        }
      });
    },
    loadForm() {
      findPermissionByGroupId(this.groupId).then((res) => {
        if (res.successFlag) {
          this._form = Object.assign(res.content, this._form)
        }
      });
    },
    onSelect(item) {
      this.$set(this._form, "menuIconClass", item);
    },
    loadDialogForm(primaryId, params) {
      this.$nextTick(() => {
        this.$refs.form.resetFields()
      })
      return new Promise((resolve, reject) => {
        this._formLoading = true
        if (primaryId) {
          // 有主键获取详情
          this.getRowApi('', params).then((res) => {
            this._form = res.content
            this._formLoading = false
            resolve(res)
          })
        } else {
          this._form = Vue.observable({}) // 让_form变成可响应式的
          this._formLoading = false
        }
      }).catch((err) => {

      })
    }
  },
};
</script>
<style lang="scss" scoped>
::v-deep .el-input__inner {
  text-align: left !important;
}
</style>
