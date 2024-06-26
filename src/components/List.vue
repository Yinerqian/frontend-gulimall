<template>
  <div class="celi-list-container">
    <ul v-if="list && list.length > 0">
      <li v-for="(item, index) in list" :key="index" @click="onClick(item)" :class="[
          'title',
          {
            'active-title': _value == item[options.value],
          },
        ]">
        <slot :row="item" v-if="$scopedSlots.default"></slot>
        <span v-else>
          {{ item[options.label] }}
        </span>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "List", // 简单的列表清单组件
  model: {
    prop: '_value', //v-model 接受的值就是 显示与隐藏
    event: 'change',
  },
  props: {
    _value: {
      type: [String, Number],
      default: null,
    },
    list: {
      type: Array,
      default: () => [],
    },
    options: {
      type: Object,
      default: () => ({
        label: 'label',
        value: 'value',
      }),
    },
  },
  watch: {
    'list.length'() {
      if (this.defaultFirst && this.list.length > 0) {
        this.defaultFirst = false
        this.$emit('change', this.list[0][this.options.value], this.list[0])
      }
    },
  },
  data() {
    return {
      defaultFirst: true,
    }
  },
  methods: {
    onClick(item) {
      this.$emit('change', item[this.options.value], item)
    },
  },
}
</script>

<style scoped lang="scss">
.celi-list-container {
  width: 100%;
  .title {
    font-size: 13px;
    line-height: 24px;
    padding: 6px 10px;
    cursor: pointer;
    border-bottom: 1px solid #f2f2f2;
    border-left: 2px solid transparent;
    &:hover {
      background: #f8fafb;
    }
  }
  .active-title {
    color: #1a94f7;
    font-weight: 600;
    border-left: 2px solid #1a94f7;
    background: #f8fafb;
    font-size: 15px;
  }
}
</style>
