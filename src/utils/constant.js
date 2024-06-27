// 跟框架性质相关的，全局组件相关的常量定义在这里
const FILE_BASE_API= `${process.env.VUE_APP_BASE_API}/cii-file/file`;
export default {
    SYSTEM_PREFIX: "/gulimall-system",  // gulimall-system api接口前缀
    PRODUCT_PREFIX: "/gulimall-product",  // gulimall-product api接口前缀
    ODC_PREFIX: "/odc/lgsm",
    LOADING_BLACK_LIST: ["/oauth", '/scheduleOverview', '/zrl'],  // 全屏loading根据接口状态显示, 这是黑名单过滤某些接口
    HEADER_ADD_PARAMS_WHITE_LIST: ['/api/lgsm/oauth/login'],  // 接口header头部信息添加一些参数,这是白名单过滤某些接口
    FILE_BASE_API,
    FILESERVER_URL: `${FILE_BASE_API}/upload`,  // 上传组件path路径
    VUE_APP_MASTER_KEY: '56009a92e93f46f6b9319918e2b47228', //  应用开发者key
    VUE_APP_APP_KEY: '936ba5973e67437aa2b87b39c23329c7', // 应用的key
    WHITE_ROUTE_PATH_LIST: ['/404/index', '/403/index', "/login", "/sys-manager/profile-manager", "/test/main-page"] // 白名单路由
}
