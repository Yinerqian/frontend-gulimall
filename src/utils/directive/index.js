import dialogDrag from "./dialogDrag";
import tableDrag from "./tableDrag";
import drag from "./drag";

const install = function(Vue) {
  Vue.directive("dialogDrag", dialogDrag);
  Vue.directive("tableDrag", tableDrag);
};

if (window.Vue) {
  window["dialogDrag"] = dialogDrag;
  window["tableDrag"] = tableDrag;
  Vue.use(install); // eslint-disable-line
}

export default install;
