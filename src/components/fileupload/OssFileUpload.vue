<template>
  <div>
    <!-- 图片形式 -->
    <div class="image-container" v-if="listType == 'picture-card' && showFileList">
      <div v-for="(item, index) in fileList" :key="index" class="image-wrap">
        <el-image v-if="picTypeArr.indexOf(item.fileType) !== -1" style="width: 100%; height: 100%" :key="index" :src="item.url" :preview-src-list="fileList.map(item => { return item.url; })"></el-image>
        <svg-icon style="width: 100%; height: 100%" v-else class-name="file"></svg-icon>
        <span class="name" :title="item.name" size="mini">{{ item.name }}</span>
        <i class="el-icon-close" @click.stop="handleRemove(item,index)" title="删 除" v-if="!disabled"></i>
      </div>
    </div>
    <!-- 上传按钮 -->
    <el-upload action="" :limit="limit" :list-type="listType" :before-upload="beforeUpload" :show-file-list="false" :http-request="onUpload" v-if="fileList.length < limit && !disabled">
      <i class="el-icon-plus" v-if="listType === 'picture-card'"></i>
      <el-button size="mini" type="primary" v-if="listType === 'text'">点击上传</el-button>
    </el-upload>
    <!-- 文件列表 -->
    <ul class="text-list" v-if="listType == 'text' && showFileList">
      <li v-for="(item, index) in fileList" :key="index">
        <el-tag :closable="!disabled" @close="handleRemove(item,index)" :style="{
          'padding-right': disabled ? '0px' : '25px'
        }">
          <span :title="item.name">
            {{item.name}}
          </span>
          <i class="el-icon-download" title="下载" @click="download(item)"></i>
        </el-tag>
      </li>
    </ul>
  </div>
</template>

<script>
import { FILESERVER_URL, FILE_BASE_API } from "@/utils/constant"

import SvgIcon from "../svg-icon/SvgIcon";
import { Request } from "@/utils/index.js";
import "./iconfont"
function uploadFile(serverUrl, fileData) {
  //上传接口
  let data = new FormData();
  data.append("file", fileData.file);
  return Request({
    url: FILESERVER_URL,
    method: "post",
    params: { bucket: 'dolphinscheduler' },
    data: data
  });
}

let imgTypes = ["png", "jpg", "jpeg", "bmp", "gif", "webp", "psd", "svg", "tiff"];
import Vue from "vue"; // 引入vue
import ElementUI from "element-ui";
Vue.use(ElementUI); //统一组件的大小
export default {
  name: "OssFileUpload",
  components: { SvgIcon },
  model: {
    prop: "_fileList", //v-model 接受的值就是 显示与隐藏
    event: "change",
  },
  props: {
    _fileList: {
      // 绑定的值
      type: String,
      default: "",
    },
    showFileList: {
      type: Boolean,
      default: true,
    },
    disabled: {
      // 是否禁用
      type: Boolean,
      default: false,
    },
    limit: {
      // 限制最多上传多少个
      type: Number,
      required: false,
      default: 1,
    },
    // 文件列表的类型text/picture-card
    listType: {
      type: String,
      default: "picture-card",
    },
    fileType: {
      // 数组或者逗号隔开的字符串 比如 "png,jpg,gif" 或者 ["png","jpg","gif"]
      type: String,
      default: "*",
    },
    maxSize: {
      // 文件最大多少兆
      type: Number,
      default: 5,
    },
    bucketName: {
      type: String,
      default: "dolphinscheduler",
    }
  },
  data() {
    return {
      picTypeArr: imgTypes
    };
  },
  computed: {
    fileList: {
      get() {
        if (this._fileList) {
          return this.parseJSONSafely(this._fileList);
        } else {
          return [];
        }
      },
      set(val) {
        this.$emit("change", JSON.stringify(val));
      },
    },
  },
  mounted() { },
  methods: {
    handleRemove(file, index) {
      let fileList = this.fileList;
      fileList.splice(index, 1);
      this.fileList = fileList;
      if (this.fileList && this.fileList.length > 0) {
        this.$emit("change", JSON.stringify(this.fileList));
      } else {
        this.$emit("change", null);
      }
    },
    onUpload(data) {
      // let DataImgName = data.file.name
      uploadFile(`${FILESERVER_URL}?bucket=${this.bucketName}`, data).then(
        (res) => {
          let fileList = this.fileList;
          fileList.push({
            name: data.file.name,
            path: res.content,
            fileType: this.getFileExt(data.file.name),
            url: `${FILE_BASE_API}/download?bucket=${this.bucketName}&filePath=/${res.content}`,
            uid: data.file.uid, // 解决多次移除后uid消失
          });

          this.fileList = fileList;
        },
        (err) => {
          this.$message.error("上传失败!");
        }
      );
    },
    beforeUpload(file) {
      return new Promise((resolve, reject) => {
        if (
          this.fileType != "*" &&
          this.fileType.indexOf(this.getFileType(file.name)) < 0
        ) {
          this.$notify.error({
            title: "错误",
            message: `文件格式不支持，请重新选择！`,
          });
          reject();
        }
        let isMaxMB = file.size / 1024 / 1024 < this.maxSize;
        if (!isMaxMB) {
          this.$notify.error({
            title: "错误",
            message: `文件大小不能超过 ${this.maxSize} MB !， 请重新选择！`,
          });
          reject();
        } else {
          resolve(file);
        }
      });
    },
    getFileExt(fileName) {
      return fileName.substring(fileName.lastIndexOf('.') + 1);
    },
    getFileType(name) {
      let arr = name.split(".");
      return arr[arr.length - 1];
    },
    isPic(type) {
      return imgTypes.indexOf(type) != -1;
    },
    download(item) {
      window.open(item.url);
    },
    parseJSONSafely(str) {
      try {
        return JSON.parse(str);
      } catch (e) {
        this.$message.error("数据格式错误,无法解析!")
        //返回默认对象，或根据用例返回null。
        return [];
      }
    },
  },
};
</script>

<style scoped lang="scss">
::v-deep .el-upload {
  max-width: 130px;
  max-height: 130px;
  .el-icon-plus {
    font-size: 42px;
  }
}
.text-list {
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
  .el-tag {
    margin-right: 10px;
    display: inline-block;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    max-width: 200px;
    position: relative;
  }
  ::v-deep .el-tag__close {
    position: absolute;
    top: 4px;
    right: 3px;
  }
  .el-icon-download {
    &:hover {
      background: #007bff;
      color: #fff;
    }
    border-radius: 50%;
    padding: 1px;
  }
}
.image-container {
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
  margin: 10px 0;
  .image-wrap {
    width: 130px;
    height: 130px;
    border-radius: 5px;
    //   overflow: hidden;
    cursor: pointer;
    position: relative;
    margin-right: 10px;
    img {
      border-radius: 5px;
      object-fit: cover;
    }
    .name {
      display: inline-block;
      text-align: center;
      width: 90%;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      opacity: 0;
      position: absolute;
      top: 85%;
      left: 50%;
      color: #fff;
      transition: 0.3s;
      font-size: 12px;
      text-shadow: #333 1px 0 0, #333 0 1px 0, #333 -1px 0 0, #333 0 -1px 0;
      transform: translate(-50%, -30%);
    }
    .el-icon-close,
    .el-icon-download,
    .el-icon-view {
      opacity: 0;
      position: absolute;
      top: -10px;
      padding: 4px;
      z-index: 10;
      background-color: #409eff;
      border-radius: 50%;
      font-size: 16px;
      transition: 0.3s;
      font-weight: bolder;
      color: #fff;
      transform: translateY(-20%);
      box-shadow: 0 0 3px #666;
    }
    .el-icon-close {
      right: -8px;
      &:hover {
        background-color: #007bff;
      }
    }
    .el-icon-download {
      left: -8px;
      &:hover {
        background-color: #007bff;
      }
    }
    .el-icon-view {
      left: 50%;
      transform: translate(-50%, -20%);
      &:hover {
        background-color: #007bff;
      }
    }
    &:hover .el-icon-close {
      opacity: 1;
      transform: translateY(0%);
    }
    &:hover .el-icon-download {
      opacity: 1;
      transform: translateY(0%);
    }
    &:hover .el-icon-view {
      opacity: 1;
      transform: translate(-50%, 0%);
    }
    &:hover .name {
      transform: translate(-50%, -50%);
      opacity: 1;
    }
  }
}
</style>
