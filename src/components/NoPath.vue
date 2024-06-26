<!--
 * @Author: your name
 * @Date: 2020-04-29 10:10:23
 * @LastEditTime: 2020-07-07 17:00:51
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: \hjh-web\src\components\404.vue
-->
<template>
  <div class="container-404">
    <div class="pic-404">
      <img class="pic-404__parent" src="@/assets/no-path.png" alt="404" width="500px"/>
    </div>
    <div class="text-404">
      <h1 class="title">页面不存在......</h1>
      <br>
      <div>
        请检查您输入的网址是否正确，请点击以下按钮返回或者联系管理员
      </div>
      <br>
      <h3>
        <el-link @click="toBack" type="primary" underline>返回上一页</el-link>
      </h3>
    </div>
  </div>
</template>

<script>
export default {
  name: 'NoPath',  // 404不存在页面组件
  methods: {
    toBack() {
      this.$router.back()
    },
  },
}
</script>

<style scoped>
.container-404 {
  /* transform: translate(-50%,-50%); */
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
}
.pic-404 {
  position: relative;
  float: left;
  /* width: 600px; */
  overflow: hidden;
}
.text-404 {
  position: relative;
  float: left;
  width: 300px;
  padding: 10% 0;
  overflow: hidden;
}
.title {
  color: #40a9ff;
}
</style>
