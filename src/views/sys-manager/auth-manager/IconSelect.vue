<template>
  <div>
    <el-tag type="primary" v-if="_val">
      <SvgIcon :class-name="_val" style="margin-right: 10px;fill: #000" />
    </el-tag>
    <el-popover placement="bottom" title="选择图标" width="217" trigger="click" style="margin-right: 10px;" v-if="!disabled">
      <div class="flex">
        <el-tag v-for="(item,index) in iconList" :key="index" class="icon-wrap" @click="onSelect(item)">
          <SvgIcon :class-name="item" style="fill: #000" />
        </el-tag>
      </div>
      <el-button slot="reference">选择图标</el-button>
    </el-popover>
    <el-link type="danger" @click="$emit('change', null)" v-if="_val && !disabled">清 除</el-link>
  </div>
</template>

<script>
import SvgIcon from "./SvgIcon.vue";
export default {
  components: {
    SvgIcon,
  },
  model: {
    prop: "_val", //v-model 接受的值就是 显示与隐藏
    event: "change",
  },
  props: {
    _val: {
      type: String,
      default: "",
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    iconList: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {};
  },
  methods: {
    onSelect(item) {
      this.$emit("change", item);
    },
  },
};
</script>

<style scoped lang="scss">
.icon-wrap {
  margin-right: 8px;
  margin-bottom: 8px;
  padding: 5px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 30px;
}
</style>