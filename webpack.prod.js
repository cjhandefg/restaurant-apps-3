const { merge } = require("webpack-merge");
const common = require("./webpack.common");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer");

const shouldAnalyze = process.env.ANALYZE === "true";

const plugins = [
  // other plugins
];

if (shouldAnalyze) {
  plugins.push(
    new BundleAnalyzerPlugin({
      analyzerMode: "static",
      reportFilename: "bundle-report.html",
      openAnalyzer: false,
    }),
  );
}

module.exports = merge(common, {
  mode: "production",
  devtool: "source-map",
  plugins: plugins,
  optimization: {
    runtimeChunk: "single",
    minimize: true,
    minimizer: [
      "...", // Use default minimizers (TerserPlugin) for JS
      new CssMinimizerPlugin(), // Minimize CSS
    ],
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          {
            loader: "babel-loader",
            options: {
              presets: ["@babel/preset-env"],
            },
          },
        ],
      },
    ],
  },
});
