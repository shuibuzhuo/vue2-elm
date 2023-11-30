const path = require("path");
const SpeedMeasurePlugin = require("speed-measure-webpack-plugin");
const BundleAnalyzerPlugin =
  require("webpack-bundle-analyzer").BundleAnalyzerPlugin;

const smp = new SpeedMeasurePlugin({
  disable: !(process.env.MEASURE === "true"),
});

module.exports = {
  publicPath: "./",
  parallel: true,
  configureWebpack: smp.wrap({
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
    ],
  }),
};
