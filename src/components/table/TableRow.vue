<template>
  <div class="tr-container" :class="[{ 'tr-container-border': border }]">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "TableRow",
  props: {
    border: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style scoped lang="scss">
.tr-container {
  display: flex;
  flex-direction: row;
  font-size: 14px;
  color: #606266;
  height: 100%
}

.tr-container-border {
  border-left: 1px solid #ebeef5;
  border-top: 1px solid #ebeef5;
}
</style>