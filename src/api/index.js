var apiObj = {} //导出路由对象
//自动注册,不必一个个导入导出
const requireComponent = require.context(
    // 其组件目录的相对路径
    './',
    // 是否查询其子目录
    true,
    // 匹配基础组件文件名的正则表达式
    /.(js)$/
)

requireComponent.keys().forEach((fileName) => {
    // 获取组件配置
    const componentConfig = requireComponent(fileName)
    Object.assign(apiObj, componentConfig)
})

export default apiObj;