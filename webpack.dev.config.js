const path = require('path')
const os = require('os')
// const ParallelUglifyPlugin = require('webpack-parallel-uglify-plugin'); // 引入插件
// const ExtractTextPlugin = require("extract-text-webpack-plugin");
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin; //包大小分析工具
const TerserPlugin = require('terser-webpack-plugin') // 去掉console  
const MiniCssExtractPlugin = require('mini-css-extract-plugin')   // 分离css
// const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')  // 压缩css
const webpack = require('webpack')
// 导入速度分析插件
const SpeedMeasurePlugin = require("speed-measure-webpack-plugin");
const threadLoader = require('thread-loader');
const smp = new SpeedMeasurePlugin();
console.log('cups', os.cpus().length)
const jsWorkerPool = {
  // options

  // 产生的 worker 的数量，默认是 (cpu 核心数 - 1)
  // 当 require('os').cpus() 是 undefined 时，则为 1
  workers: os.cpus().length,

  // 闲置时定时删除 worker 进程
  // 默认为 500ms
  // 可以设置为无穷大， 这样在监视模式(--watch)下可以保持 worker 持续存在
  poolTimeout: 2000
};

const cssWorkerPool = {
  // 一个 worker 进程中并行执行工作的数量
  // 默认为 20
  workerParallelJobs: 2,
  poolTimeout: 2000
};

threadLoader.warmup(jsWorkerPool, ['babel-loader']);
threadLoader.warmup(cssWorkerPool, ['css-loader', 'postcss-loader']);

module.exports = smp.wrap({

  devtool: 'eval-source-map',
  //   externals: {
  //     vue: {
  //       root: "Vue",   //通过 script 标签引入，此时全局变量中可以访问的是 Vue
  //       commonjs: "vue",  //可以将vue作为一个 CommonJS 模块访问
  //       commonjs2: "vue",  //和上面的类似，但导出的是 module.exports.default
  //       amd: "vue"   //类似于 commonjs，但使用 AMD 模块系统
  //     }
  //   },
  resolve: {
    // modules: ['node_modules'], // 指定import的最开始查找路径
    // import导入时省略后缀
    // 注意：尽可能的减少后缀尝试的可能性
    extensions: ['.js', '.vue', '.css', '.json'],
  },
  module: {
    rules: [
      // {
      //   test: /\.js$/,
      //   exclude: /node_modules/,
      //   use: [
      //     {
      //       loader: 'thread-loader',
      //       options: jsWorkerPool
      //     },
      //     'babel-loader'
      //   ]
      // },
      //  {
      //   test: /\.(sass|scss)$/,
      //   exclude: /node_modules/,
      //   use: [
          
      //     {
      //       loader: 'thread-loader',
      //       options: cssWorkerPool
      //     },
      //     // 'style-loader',
      //     // 'css-loader',
      //     'sass-loader'
      //   ]
      // },
      // {
      //   test: /\.(sass|scss)$/,
      //   exclude: /node_modules/,
      //   use: [
      //     // 'style-loader',
      //     // {
      //     //   loader: 'thread-loader',
      //     //   options: cssWorkerPool
      //     // },
      //     // {
      //     //   loader: 'css-loader',
      //     //   options: {
      //     //     modules: true,
      //     //     localIdentName: '[name]__[local]--[hash:base64:5]',
      //     //     importLoaders: 1
      //     //   }
      //     // },

      //     'sass-loader'
      //   ]
      // }
    ],
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(), // 热加载
    //     new CompressionPlugin({
    //       test: /\.(js|css|less|map)$/, // 匹配文件名
    //       threshold: 1024, // 对超过10k的数据压缩
    //       minRatio: 0.8,
    //     }),
    new MiniCssExtractPlugin({
      ignoreOrder: true,
      filename: 'css/[name]_[contenthash:3].css',
      chunkFilename: 'css/[name]_[contenthash:3].css'
    }),
    //     new ExtractTextPlugin('styles.css'),
    // new BundleAnalyzerPlugin(),
    //     // 使用 ParallelUglifyPlugin 并行压缩输出JS代码
    // new ParallelUglifyPlugin({
    //   // 传递给 UglifyJS的参数如下：
    //   test: /.js$/g,
    //   /*
    //   uglifyJS：用于压缩 ES5 代码时的配置，Object 类型，直接透传给 UglifyJS 的参数。
    //   uglifyES：用于压缩 ES6 代码时的配置，Object 类型，直接透传给 UglifyES 的参数。
    //   */
    //   uglifyES: {
    //     output: {
    //       /*
    //        是否输出可读性较强的代码，即会保留空格和制表符，默认为输出，为了达到更好的压缩效果，
    //        可以设置为false
    //       */
    //       beautify: false,
    //       /*
    //        是否保留代码中的注释，默认为保留，为了达到更好的压缩效果，可以设置为false
    //       */
    //       comments: false
    //     },
    //     compress: {
    //       /*
    //        是否在UglifyJS删除没有用到的代码时输出警告信息，默认为输出，可以设置为false关闭这些作用
    //        不大的警告
    //       */
    //       warnings: false,
    //       /*
    //        是否删除代码中所有的console语句，默认为不删除，开启后，会删除所有的console语句
    //       */
    //       drop_console: true,
    //       /*
    //        是否内嵌虽然已经定义了，但是只用到一次的变量，比如将 var x = 1; y = x, 转换成 y = 5, 默认为不
    //        转换，为了达到更好的压缩效果，可以设置为false
    //       */
    //       collapse_vars: true,
    //       /*
    //        是否提取出现了多次但是没有定义成变量去引用的静态值，比如将 x = 'xxx'; y = 'xxx'  转换成
    //        var a = 'xxxx'; x = a; y = a; 默认为不转换，为了达到更好的压缩效果，可以设置为false
    //       */
    //       reduce_vars: true
    //     }
    //   },
    //   sourceMap: false
    // }),

  ],
  optimization: {
    //     minimize: true,
    //     runtimeChunk: 'single',
    minimizer: [
      // new CssMinimizerPlugin(),
      new TerserPlugin({
        parallel: true,
        extractComments: false,
        terserOptions: {
          format: {
            comments: false
          },
          toplevel: true
        }
      }),
    ],
    splitChunks: {
      chunks: 'all',
      maxInitialRequests: Infinity,
      minSize: 20000,
      cacheGroups: {
        vendors: {
          chunks: 'all',
          name: 'vendors',
          test: /[\\/]node_modules[\\/]/
        }
      }
    }
  }

})