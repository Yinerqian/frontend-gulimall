/*
 * @Author: your name
 * @Date: 2020-05-21 16:04:11
 * @LastEditTime: 2020-11-20 18:47:41
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \hjh-web\src\element_default_props.js
 */
// 饿了么组件默认[属性]的统一配置
import Vue from 'vue' // 引入vue
import VXETablePluginElement from 'vxe-table-plugin-element'
import 'vxe-table-plugin-element/dist/style.css'
VXETable.use(VXETablePluginElement)
import 'vxe-table/lib/style.css'
import VXETable from 'vxe-table'
import 'xe-utils'


const defaultTrue = {
  type: Boolean,
  default: true,
}
const defaultCenter = {
  type: String,
  default: 'center',
}
const defaultMini = {
  type: String,
  default: 'mini',
}

VXETable.Table.props.align = defaultCenter;
// VXETable.Table.props.showOverflow = defaultTrue;
// VXETable.Table.props.showHeaderOverflow = defaultTrue;
VXETable.Table.props.highlightHoverRow = defaultTrue;
VXETable.Table.props.border = {
  type: [String, Boolean],
  default: true
};
// VXETable.Table.props.highlightHoverColumn = defaultTrue;
console.log(VXETable.Grid, "VXETable.Grid");
VXETable.Table.props.keepSource = defaultTrue;
// VXETable.Table.props.resizable = defaultTrue;
VXETable.Table.props.size = defaultMini
// VXETable.Table.props.stripe = defaultTrue
VXETable.Table.props.emptyText = {
  type: String,
  default: " "
}

// VXETable.Button.props.size = defaultMini
VXETable.Pager.props.perfect = defaultTrue
VXETable.Pager.props.size = defaultMini
VXETable.Toolbar.props.size = defaultMini
VXETable.Pager.props.pageSizes = {
  type: Array,
  default: () => [10, 20, 50, 100]
}
VXETable.Pager.props.layouts = {
  type: Array,
  default: () => [ 'Total', 'PrevJump', 'PrevPage', 'Number', 'NextPage', 'NextJump', 'Sizes' ]
}

function initVXETable() {
  Vue.use(VXETable)
}

export default initVXETable;