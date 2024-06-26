'use strict'
const path = require('path')
const webpack = require('webpack');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

function resolve(dir) {
  return path.join(__dirname, dir)
}

const name = process.env.VUE_APP_TITLE || '策立之芯 报表平台' // 网页标题

const port = process.env.port || process.env.npm_config_port || 8989 // 端口

let plugins = []
if(process.env.NODE_ENV === 'production'){
  plugins.push(  new UglifyJsPlugin({
    uglifyOptions: {
      compress: {
        drop_debugger: true,
        drop_console: true,  //生产环境自动删除console
      },
      warnings: false,
    },
    sourceMap: false,
    parallel: true //使用多进程并行运行来提高构建速度。默认并发运行数：os.cpus().length - 1。
  }))
}

// vue.config.js 配置说明
//官方vue.config.js 参考文档 https://cli.vuejs.org/zh/config/#css-loaderoptions
// 这里只列一部分，具体配置参考文档
module.exports = {
  // 部署生产环境和开发环境下的URL。
  // 默认情况下，Vue CLI 会假设你的应用是被部署在一个域名的根路径上
  // 例如 https://www.ruoyi.vip/。如果应用被部署在一个子路径上，你就需要用这个选项指定这个子路径。例如，如果你的应用被部署在 https://www.ruoyi.vip/admin/，则设置 baseUrl 为 /admin/。
  publicPath: "./",
  // 在npm run build 或 yarn build 时 ，生成文件的目录名称（要和baseUrl的生产环境路径一致）（默认dist）
  outputDir: 'dist',
  // 用于放置生成的静态资源 (js、css、img、fonts) 的；（项目打包之后，静态资源会放在这个文件夹下）
  assetsDir: 'static',
  // 是否开启eslint保存检测，有效值：ture | false | 'error'
  lintOnSave: process.env.NODE_ENV === 'development',
  // 如果你不需要生产环境的 source map，可以将其设置为 false 以加速生产环境构建。
  // productionSourceMap: false,
  // webpack-dev-server 相关配置
  devServer: {
    port,
  },
  configureWebpack: {
    name: name,
    resolve: {
      alias: {
        '@': resolve('src'),
        'vue$': 'vue/dist/vue.esm.js',
        '_c': resolve('src/components'),
        '_v': resolve('src/views')
      }
    },
    plugins,
  },
  chainWebpack(config) {
    config.plugins.delete("preload").delete("prefetch");

    config
      .plugin('provide')
      .use(webpack.ProvidePlugin, [{
        Table2form: path.resolve(__dirname, './src/utils/table2form.js')
      }]);

    // set svg-sprite-loader
    config.module
      .rule('svg')
      .exclude.add(resolve('src/assets/icons'))
      .end()
    config.module
      .rule('icons')
      .test(/\.svg$/)
      .include.add(resolve('src/assets/icons'))
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'icon-[name]'
      })
      .end()
    // 10kb以内的图片会被打包成内联元素
    config.module
      .rule('images')
      .use('url-loader')
      .loader('url-loader')
      .tap(options => Object.assign(options, { limit: 10240 }));

    if (process.env.NODE_ENV === 'production') {
      config.optimization.splitChunks({
        chunks: 'async',
        minSize: 1024 * 10, // 30000,
        maxSize: 0,
        minChunks: 1,
        maxAsyncRequests: 6,
        maxInitialRequests: 4,
        automaticNameDelimiter: '~',
        // 1.做代码分割，默认是将所以的异步引入单独打包，如常见的Vue异步路由组件
        // 2.将不常改变的模块代码单独打包，这样更有利于浏览器的缓存处理，如将vue vuex vue-router, ui库，这些都是不常改变
        // 3.将业务代码单独打包，这是经常改变的
        // 4.异步模块代码单独打包，做预加载处理，加快首页加载速度
        cacheGroups: {
          libs: {
            name: "chunk-libs",
            test: /[\\/]node_modules[\\/]/,
            priority: 10,
            chunks: "initial",
          },
          // 链接：https://juejin.cn/post/6844904105555525640
          echarts: {
            name: 'echarts',
            test: /[\\/]node_modules[\\/]echarts[\\/]/,
            minSize: 0,
            minChunks: 1,
            reuseExistingChunk: true,
            priority: 20,
            chunks: 'all'
          },
          'element-ui': {
            name: 'element-ui',
            test: /[\\/]node_modules[\\/]element-ui[\\/]/,
            minSize: 0,
            minChunks: 1,
            reuseExistingChunk: true,
            priority: 20,
            chunks: 'all'
          },
          vendors: {
            name: 'chunk-vendors',
            test: /[\\/]node_modules[\\/]/,
            priority: -10,
            chunks: 'initial'
          },
          common: {
            name: 'chunk-common',
            minChunks: 2,
            priority: -20,
            chunks: 'initial',
            reuseExistingChunk: true
          }
        }
      });
    }
  },
  // CSS相关选项
  css: {
    //将组件内的CSsS 提取到一个单独的CSS文件(只用在生产环境中)
    //也可以是一个传递给、 extract text -webpack- plugin^的选项对象
    extract: true,
    //是否开启CSsS source map?
    sourceMap: false,
    //为预处理器的loader 传递自定义选项。比如传递给
    //css-loader时，使用{Css:{...}}。I
    // loaderOptions: {
    //   css: {
    //     //这里的选项会传递给css - loader
    //   },
    //   postcss: {
    //     //这里的选项会传递给postcss - loader
    //   },
    // }
  },
  // 兼容IE
  transpileDependencies: [
    /[/\\]node_modules[/\\](.+?)?element-ui(.*)[/\\]src/,
    /[/\\]node_modules[/\\](.+?)?element-ui(.*)[/\\]package/,
  ],
}
