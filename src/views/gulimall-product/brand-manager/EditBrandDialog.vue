<template>
  <el-dialog width="30%" v-dialogDrag :title="_getFormTitle('品牌', primaryId, readonly)" :visible="_visible" @opened="onOpened" @close="closeDialog()">
    <el-form label-width="100px" :model="_form" :disabled="readonly" ref="form" :rules="rules" v-loading="_formLoading">
      <el-row>
        <el-col :span="24">
          <el-form-item label="品牌名" prop="name">
            <el-input :maxlength="200" v-model.trim="_form.name" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form-item label="Logo" prop="logo">
<!--            <el-input :maxlength="50" v-model.trim="_form.logo" />-->
            <OssUploadFile :file-list="fileList" @handleUrl="handleUrl"/>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form-item label="描述" prop="descript">
            <el-input :maxlength="500" v-model.trim="_form.descript" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form-item label="首字母" prop="firstLetter">
            <el-input  :maxlength="50" v-model.trim="_form.firstLetter" />
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <div slot="footer">
      <el-row type="flex" :gutter="20" justify="center">
        <el-button @click="onConfirm" v-if="!readonly" type="primary">确定保存</el-button>
        <el-button @click="closeDialog()">关 闭</el-button>
      </el-row>
    </div>
  </el-dialog>
</template>

<script>

import {findBrandById, updateBrandById, saveBrand} from "@/api/modules/gulimall-product/gulimall-brand";
import OssUploadFile from "_v/components/OssUploadFile.vue";

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
    primaryId: [String, Number],
  },
  components: {
    OssUploadFile
  },
  data() {
    return {
      updateRowApi: updateBrandById,
      createRowApi: saveBrand,
      getRowApi: findBrandById,
      rules: {
        configName: [this._mustValid()],
        configCode: [this._mustValid()],
        configValue: [this._mustValid()],
      },
      loading: false,
      fileList: []
    };
  },
  methods: {
    onOpened() {
      this._form = {};
      this._loadDialogForm(this.primaryId, {id: this.primaryId,}).then((res) => {
        this._form = res.content;
        this.fileList = [{name: '', url: this._form.logo}]
      });
    },
    onConfirm() {
      this._onSubmitForm(this.primaryId, this.readonly, this._form).then((res) => {
        if (res.successFlag) {
          this._form = {};
        } else {
          this._form = {};
          this.$message.error(res.message);
        }
      });
    },
    closeDialog() {
      this.fileList = []
      this._onCloseDialog()
    },
    handleUrl(url){
      this.fileList = [{name: '', url: url}]
      this.$set(this._form, 'logo', url)
    }
  },
};
</script>

<style scoped lang="scss">

</style>
