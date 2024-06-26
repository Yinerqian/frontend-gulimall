<template>
  <div class="goodrolldigits-container" v-if="_val">
    <el-row type="flex" align="middle" v-if="Array.isArray(splitValue)">
      <el-row type="flex" align="middle" v-for="(item, index) in splitValue" :key="index">
        <DigitRoll :rollDigits="item"/>
        <div v-if="index == 0" style="line-height:2">.</div>
      </el-row>
    </el-row>
    <DigitRoll :rollDigits="_val" v-else-if="_val != '--'" />
    <span v-else>{{_val}}</span>
  </div>
</template>

<script>
import DigitRoll from '@huoyu/vue-digitroll';
export default {
  components: { DigitRoll },
  model: {
    prop: "_val", //v-model 接受的值就是 显示与隐藏
    event: "change",
  },
  props: {
    _val: {
      type: [String, Number],
      default: "",
    },
  },
  computed: {
    splitValue() {
      let strVal = String(this._val)
      if (strVal && strVal.indexOf(".") > -1) {
        this.hasPoint = true
        return strVal.split(".")
      } else {
        return this._val
      }
    }
  },
  data() {
    return {
      hasPoint: false
    }
  }
}
</script>

<style lang="scss" scoped>
.goodrolldigits-container {
  ::v-deep .d-roll-wrapper {
    .d-roll-bar {
      div {
        font-family: "shishang";
        font-size: 16px;
      }
    }
    margin: 0;
    display: inline-block;
    // margin-top: -2px;
  }
}
</style>>