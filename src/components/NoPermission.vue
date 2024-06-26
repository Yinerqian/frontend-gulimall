<!--
 * @Author: your name
 * @Date: 2020-04-29 10:10:23
 * @LastEditTime: 2020-07-07 17:00:51
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: \hjh-web\src\components\403.vue
-->
<template>
  <div class="container-403">
    <div class="pic-403">
      <img class="pic-404__parent" src="@/assets/no-permission.png" alt="403" width="500px" />
    </div>
    <div class="text-403">
      <h1 class="title">您的权限不足......</h1>
      <br>
      <div>
        你当前暂无权限访问此页面，请点击以下按钮返回或者联系管理员
      </div>
      <br>
      <h3>
        <el-link @click="toBack"  type="primary" underline>返回上一页</el-link>
      </h3>
    </div>
  </div>
</template>

<script>
export default {
  name: 'NoPermission',  // 没有权限的页面组件
  methods: {
    toBack() {
      this.$router.back()
    },
  },
}
</script>

<style scoped>
.container-403 {
  /* transform: translate(-50%,-50%); */
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
}
.pic-403 {
  position: relative;
  float: left;
  /* width: 600px; */
  overflow: hidden;
}
.text-403 {
  position: relative;
  float: left;
  width: 300px;
  padding: 10% 0;
  overflow: hidden;
}
.title {
  color: #ffc069;
}
</style>
