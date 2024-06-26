<template>
  <div class="no-data-container">
    <slot />
    <el-empty class="empty" :image-size="120" v-if="empty" :style="{
      top: `calc(50% + ${offsetY}px)`,
      left: `calc(50% + ${offsetX}px)`,
    }"/>
  </div>
</template>

<script>
export default {
  props: {
    empty: {
      type: Boolean,
      default: true,
    },
    offsetX: {
      type: Number,
      default: 0,
    },
    offsetY: {
      type: Number,
      default: 0,
    },
    targetDom: {
      require: true
    }
  },
}
</script>

<style scoped lang="scss">
.no-data-container {
  position: relative;
  .empty {
    position: absolute;

    transform: translate(-50%, -50%);
    z-index: 10;
    .el-empty__description {
      font-size: 13px;
    }
  }
}
</style>