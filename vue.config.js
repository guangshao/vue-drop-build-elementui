/**
 * vue项目配置文件
 * @author szyeliming@ininin.com
 * @since 2020-02-14
 * @version 1.0.0
 * @description vue项目配置文件
 * @copyright ininin.com
 */
const path = require("path");
// const env = process.env.NODE_ENV;
const TerserWebpackPlugin = require("terser-webpack-plugin"); // 引入plugin

// const utils = require("./utils");
// /** 更新版本号 */
// if (env === "production") {
//     const version = utils.writeVersion("./public/static/version.txt", process.env.VUE_APP_API_MODE);
//     process.env.VUE_APP_VERSION = version;
// }

// const cdn = "//wg.cloud.ininin.com/libs";
// const externalConfig = [
//     {
//         name: "vue",
//         scope: "Vue",
//         js: process.env.VUE_APP_API_MODE === "development" ? "vue.js" : "vue.min.js"
//     },
//     { name: "element-ui", scope: "ELEMENT", js: "index.js", css: "theme/dss/index.css" },
//     { name: "lodash", scope: "_", js: "lodash.min.js" },
//     {
//         customer: true,
//         js:
//             process.env.VUE_APP_API_MODE === "prod"
//                 ? "https://s9.cnzz.com/z_stat.php?id=1278235901&web_id=1278235901"
//                 : "https://v1.cnzz.com/z_stat.php?id=1278235888&web_id=1278235888"
//     }
// ];

// const externals = JSON.parse(JSON.stringify(externalConfig)); // 读取配置
// const externalModules = utils.getExternalModules(cdn, externals); // 获取到合适路径和忽略模块
module.exports = {
    assetsDir: "static",
    publicPath: "./",
    pluginOptions: {},
    chainWebpack: config => {
        config.resolve.alias
            .set("@", path.resolve(__dirname, "src"))
            .set("@customForm", path.resolve(__dirname, "src/components/customForm"));
        /** ** svg图标处理 添加压缩loader "image-webpack-loader" */
        // 修改svg-loader 不包含icons列表
        config.module
            .rule("svg")
            .exclude.add(path.resolve(__dirname, "src/assets/img/icons"))
            .end()
            .use("image-webpack")
            .loader("image-webpack-loader")
            .tap((options = {}) =>
                Object.assign(options, {
                    disable: false
                })
            )
            .end();
        // 添加 svg-sprite-loader
        config.module
            .rule("svg-sprite")
            .test(/\.(svg)(\?.*)?$/)
            .include.add(path.resolve(__dirname, "src/assets/img/icons"))
            .end()
            .use("svg-sprite-loader")
            .loader("svg-sprite-loader")
            .tap((options = {}) =>
                Object.assign(options, {
                    symbolId: "icon-[name]"
                })
            )
            .end()
            .use("image-webpack")
            .loader("image-webpack-loader")
            .tap((options = {}) =>
                Object.assign(options, {
                    disable: false
                })
            )
            .end();

        // 设置 htmlPlugin
        const setExternals = (opts = []) =>
            config.plugin("html").tap(args => {
                args[0].cdnConfig = opts;
                return args;
            });
        config.when(
            // env === "production",
            true,
            () => setExternals()
        );
    },
    /**
     * @author shzhangchaoyang@ininin.com
     * @since 2020-5-9
     *
     */
    /** 发布生产取消控制台console 和 warnings */
    configureWebpack: {
        optimization: {
            minimizer: [
                new TerserWebpackPlugin({
                    terserOptions: {
                        ecma: undefined,
                        warnings: false,
                        parse: {},
                        compress: {
                            warnings: false,
                            drop_console: true, // console
                            drop_debugger: false,
                            pure_funcs: ["console.log"] // 移除console
                        }
                    }
                })
            ]
        }
        // externals: externalModules
    }
};
