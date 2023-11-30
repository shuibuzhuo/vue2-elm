const path = require("path");
const SpeedMeasurePlugin = require("speed-measure-webpack-plugin");
const BundleAnalyzerPlugin =
  require("webpack-bundle-analyzer").BundleAnalyzerPlugin;
const webpack = require("webpack");
const AddAssetHtmlWebpackPlugin = require("add-asset-html-webpack-plugin");
const PurgeCssPlugin = require("purgecss-webpack-plugin");
const glob = require("glob");

const PATHS = {
  src: path.join(__dirname, "src"),
};

const smp = new SpeedMeasurePlugin({
  disable: !(process.env.MEASURE === "true"),
});

module.exports = {
  publicPath: "./",
  parallel: true,
  configureWebpack: smp.wrap({
    module: {
      // rules: [
      //   {
      //     test: /\.(gif|png|jpe?g|svg|webp)$/i,
      //     use: [
      //       {
      //         loader: "image-webpack-loader",
      //         options: {
      //           mozjpeg: {
      //             progressive: true,
      //           },
      //           // optipng.enabled: false will disable optipng
      //           optipng: {
      //             enabled: false,
      //           },
      //           pngquant: {
      //             quality: [0.65, 0.9],
      //             speed: 4,
      //           },
      //           gifsicle: {
      //             interlaced: false,
      //           },
      //           // the webp option will enable WEBP
      //           webp: {
      //             quality: 75,
      //           },
      //         },
      //       },
      //     ],
      //   },
      // ],
    },
    cache: {
      type: "filesystem",
      cacheDirectory: path.resolve(__dirname, "./node_modules/.cache_temp"),
    },
    resolve: {
      alias: {
        src: path.resolve(__dirname, "./src"),
        assets: path.resolve(__dirname, "./src/assets"),
        components: path.resolve(__dirname, "./src/components"),
      },
    },
    plugins: [
      new BundleAnalyzerPlugin({
        analyzerMode: !(process.env.MEASURE === "true") ? "server" : "disabled",
      }),
      new webpack.DllReferencePlugin({
        context: __dirname,
        manifest: path.resolve(__dirname, "./dll/vue-manifest.json"),
      }),
      new AddAssetHtmlWebpackPlugin({
        filepath: path.resolve(__dirname, "./dll/vue.dll.js"),
      }),
      new PurgeCssPlugin({
        paths: glob.sync(`${PATHS.src}/**/*`, {
          nodir: true,
        }),
      }),
    ],
  }),
};
