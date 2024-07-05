<template>
  <el-dialog v-dialogDrag :title="_getFormTitle('品牌', primaryId, readonly)" :visible="_visible" @opened="onOpened" @close="_onCloseDialog">
    <el-form label-width="100px" :model="_form" :disabled="readonly" ref="form" :rules="rules" v-loading="_formLoading">
      <el-row>
        <el-col :span="24">
          <el-form-item label="参数名称" prop="configName">
            <el-input :maxlength="200" v-model.trim="_form.configName" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form-item label="参数编码" prop="configCode">
            <el-input :maxlength="50" v-model.trim="_form.configCode" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form-item label="参数值" prop="configValue">
            <el-input :maxlength="500" v-model.trim="_form.configValue" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form-item label="备注" prop="remark">
            <el-input type="textarea" rows="6" :maxlength="500" v-model.trim="_form.remark" />
          </el-form-item>
        </el-col>
      </el-row>
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
import {
  saveParamInfo,
  updateByConfigId,
  findByConfigId,
} from "@/api/modules/sys-param";

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

  },
  data() {
    return {
      updateRowApi: updateByConfigId,
      createRowApi: saveParamInfo,
      getRowApi: findByConfigId,
      rules: {
        configName: [this._mustValid()],
        configCode: [this._mustValid()],
        configValue: [this._mustValid()],
      },
      loading: false,
    };
  },
  methods: {
    onOpened() {
      this._form = {};
      this._loadDialogForm(this.primaryId, {configId: this.primaryId,}).then((res) => {
        this._form = res.content;
      });
    },
    onConfirm() {
      this._onSubmitForm(this.primaryId, this.readonly, {
      }).then((res) => {
        if (res.successFlag) {
          this._form = {};
        } else {
          this._form = {};
          this.$message.error(res.message);
        }
      });
    },
  },
};
</script>

<style scoped lang="scss">

</style>
