<template>
  <el-dialog v-dialogDrag :title="_getFormTitle('参数', primaryId, readonly)" class="role_dialog" :visible="_visible" @opened="onOpened" @close="_onCloseDialog">
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

<style lang="scss">
.role_dialog {
  .el-dialog__body {
    padding: 20px !important;
  }
  .role-tabs {
    height: 50vh;
    box-shadow: none;
    -webkit-box-shadow: none;
    .el-tabs__content {
      height: calc(100% - 39px);
      .el-tab-pane {
        height: 100%;
      }
    }
    .role-tab-header {
      height: 45px !important;
    }
    .role-tab-add-main {
      height: calc(100% - 45px) !important;
    }
    .role-tab-main {
      height: 100% !important;
    }
    .role-tab-container {
      margin: 0 !important;
      height: 100%;
      .app-tree-aside {
        padding: 0 !important;
        margin-right: 15px !important;
      }
      .role-tab-app-main {
        .el-card__body {
          padding: 20px 0 0 20px !important;
        }
        .el-checkbox {
          margin: 0 20px 20px 0 !important;
        }
      }
      .active-title {
        font-size: 14px;
      }
    }
  }
  .role-box-card {
    margin: 10px 1px 0 0;
    .el-card__header {
      background: #f6faff;
      padding: 12px 20px;
    }
  }
  .role-box-card:nth-child(1) {
    margin-top: 0 !important;
  }
  .role-not-content {
    margin: auto;
  }
}
</style>
