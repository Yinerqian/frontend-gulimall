<template>
  <div style="height: 200px">
    <el-upload
        action="http://ningmall-file.oss-cn-nanjing.aliyuncs.com"
        :data="dataObj"
        :multiple="false"
        :before-upload="beforeUpload"
        :on-success="handleUploadSuccess"
        :on-preview="handlePreview"
        :on-remove="handleRemove"
        :file-list="fileList"
        list-type="picture">
      <el-button size="small" type="primary">点击上传</el-button>
      <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
    </el-upload>
  </div>
</template>

<script>
import {Constant, Request} from "@/utils";

export default {
  name: "OssUploadFile",
  props: {
    fileList: {
      type: Array,
    }
  },
  data() {
    return {
      url: '',
      dataObj: {    //提交到OSS的参数
        policy: '',
        signature: '',
        key: '',
        ossaccessKeyId : 'LTAI5tNW8qVVVjLfKEYByTut',
        dir: '',
        host: '',
        accessKeyId: ''
      }
    }
  },
  methods: {
    handleRemove(file, fileList) {
    },
    handlePreview(file, fileList) {
    },
    beforeUpload(file) {
      let $this = this;
      console.log("file===", file)
      return Request({
        url: `${Constant.FILE_PREFIX}/file/ossSign`,
        method: "get",
      }).then(res => {
        //设置相关的参数
        $this.dataObj.policy = res.content.policy;
        $this.dataObj.signature = res.content.signature;
        this.dataObj.ossaccessKeyId = res.content.accessid;
        //上传的文件名，使用UUID处理一下
        $this.dataObj.key = res.content.dir + '/'+`${file.name}`;
        $this.dataObj.dir = res.content.dir;
        $this.dataObj.host = res.content.host;
        console.log("$this.dataObj===", this.dataObj)
      })
    },
    handleUploadSuccess(res, file) {
      console.log("res====上传成功===", res)

      //上传的完整的文件地址
      let urlPath = this.dataObj.host + '/' + this.dataObj.key.replace(`${file.fileName}`,file.name);
      this.url = urlPath
      // 发送url
      this.$emit('handleUrl', urlPath)
    }
  }
}
</script>

<style scoped lang="scss">

</style>