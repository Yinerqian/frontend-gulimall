<template>
  <div class="footer">Powered by: 策立科技 Copyright © {{year}}</div>
</template>

<script>
export default {
  data() {
    return {
      year: new Date().getFullYear()
    }
  }
}
</script>

<style scoped>
.footer {
  user-select: none;
  /* opacity: 0.7; */
  position: absolute;
  font-size: 12px;
  left: 0px;
  bottom: 0px;
  padding-left: 70px;
  color: rgb(153, 153, 153);
  background: url("~@/assets/celi-logo.png") no-repeat;
  line-height: 36px;
  background-size: 67px 36px;
  width: 436px;
  height: 36px;
}
</style>