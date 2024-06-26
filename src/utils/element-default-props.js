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
import 'element-ui/lib/theme-chalk/index.css'
import ElementUI from 'element-ui'

for (const key in ElementUI) {  //统一修组件大小
  const item = ElementUI[key];
    if (item.props && item.props.size) {
      item.props.size = {
        type: String,
        default: 'small',
      }
    }
}

const boolObj = {
  //表格只显示一行,超出用提示框显示
  type: Boolean,
  default: true,
}
ElementUI.Dialog.props.closeOnClickModal.default = false; //弹出框设置点击蒙版不关闭
// ElementUI.Dialog.props.appendToBody.default = true;
ElementUI.Dialog.props.width.default = '70%'
ElementUI.Dialog.props.top.default = '7vh'
ElementUI.Drawer.props.wrapperClosable.default = false    // 统一修改 Drawer 点击外部不关闭

// ElementUI.Dialog.props.destroyOnClose = boolObj; wrapper-closable="false"

ElementUI.Table.props.stripe = {
  type: Boolean,
  default: false,
} //表格的斑马线条纹
// ElementUI.Table.props.highlightCurrentRow = boolObj; //表格的当前行高亮

ElementUI.Table.props.border = {
  type: Boolean,
  default: false,
}

ElementUI.Table.props.headerCellStyle = {
  //表格头部样式
  default: () => ({
    height: '4rem !important',
    background: '#F6F8FA',
    'font-size': '1rem',
    'letter-spacing': '1px',
    color: '#7D8592',
  }),
}

ElementUI.Link.props.underline.default = false

ElementUI.Table.props.rowStyle = {
  //表格每一行的样式
  default: () => ({
    cursor: 'pointer',
    height: '4rem',
  }),
}

ElementUI.Table.props.cellStyle = {
  //表格每个单元格的样式
  default: () => ({
    color: '#25282D',
    'font-weight': 500,
    // padding: '10px 0',
    "font-size": '1rem',
  }),
}

ElementUI.TableColumn.props.align = {
  //表格每列居中
  type: String,
  default: 'left',
}

ElementUI.Select.props.placeholder = {
  type: String,
  default: '请选择',
}

ElementUI.TableColumn.props.showOverflowTooltip = boolObj //表格只显示一行,超出用提示框显示

ElementUI.Pagination.props.layout.default = 'total, sizes, prev, pager, next, jumper' // 分页的功能栏
ElementUI.Pagination.props.prevText.default = '上一页'
ElementUI.Pagination.props.nextText.default = '下一页'
ElementUI.Pagination.props.background = boolObj; // 分页有背景
// prev-text
ElementUI.Select.props.filterable = boolObj //选择器的可过滤

ElementUI.Input.props.clearable.default = true; //输入框清除按钮
// ElementUI.Select.props.clearable = boolObj;

ElementUI.DatePicker.props.align = {
  //日期弹出框偏左
  type: String,
  default: 'left',
}

ElementUI.InputNumber.props.controlsPosition = {
  type: String,
  default: 'right',
}

ElementUI.Card.props.shadow = {
  type: String,
  default: 'none',
}

ElementUI.Tag.props.size = {
  type: String,
  default: 'medium',
}

ElementUI.Tooltip.props.effect = {
  type: String,
  default: 'light',
}

ElementUI.Tooltip.props.placement = {
  type: String,
  default: 'top',
}
// ElementUI.Form.props.labelSuffix = {
//   type: String,
//   default: ':',
// }

function initElement() {
  Vue.use(ElementUI, {
    size: 'mini',
    zIndex: 3000,
  }) //统一组件的大小
}

export default initElement;
