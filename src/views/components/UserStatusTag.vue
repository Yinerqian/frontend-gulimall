<template>
  <!--
        type: 类型, success/info/warning/danger
        effect: 主题, dark / light / plain
        size: 尺寸, medium / small / mini
    -->
  <el-tag :type="tagType" :size="tagSize">
    {{ tagName }}
  </el-tag>

</template>

<script>
export default {
  name: "UserStatusTag",
  props: {
    value: {
      required: true,
      type: String,
      default: "",
    },
    tagSize: {
      type: String,
      required: false,
      default: "small",
    },
  },
  computed: {
    tagType: function () {
      return this.value == "0" ? "success" : "danger"
    },
    tagName: function () {
      return this.value == "0" ? "在线" : "离线"
    },
  },
};
</script>

<style scoped>
</style>
