<template>
  <div class="tc-container" :class="[{ 'tc-container-border' : border}, { 'padding': padding }]"
    :style="{ flexDirection: fleDirection }">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "TableColumn",
  props: {
    border: {
      type: Boolean,
      default: false
    },
    padding: {
      type: Boolean,
      default: true
    },
    fleDirection: {
      type: String,
      default: 'column'
    }
  }
}
</script>

<style scoped lang="scss">
.tc-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-content: center;
  height: 100%;
}

.padding {
  padding-left: 2px;
  padding-right: 2px;
}

.tc-container-border {
  border-bottom: 1px solid #ebeef5;
  border-right: 1px solid #ebeef5;
}

.col-padding {
  //padding: 8px;
}
</style>