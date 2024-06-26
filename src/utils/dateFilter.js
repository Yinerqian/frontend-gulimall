import Vue from "vue";
import dayjs from "dayjs";

Vue.filter('dateFormat',function(val){
    return dayjs(val).format('YYYY-MM-DD');
})
Vue.filter('dateTimeFormat',function(val){
    return dayjs(val).format('YYYY-MM-DD HH:mm:ss');
})