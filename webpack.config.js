const path = require("path");
const { EnvironmentPlugin } = require("webpack");
const UglifyJSPlugin = require("uglifyjs-webpack-plugin");

const OUTPUT_DIR = path.join(__dirname, "dist");

const baseConfig = {
  entry: {
    entry1: "./lib/entry1.js",
    entry2: "./lib/entry2.js"
  },
  output: {
    filename: "[name].umd.js",
    path: OUTPUT_DIR,
    library: "[name]",
    libraryTarget: "umd"
  },
  mode: "development",
  stats: {
    assets: true,
    modules: false
  },
  node: false,
  module: {
    rules: [
      {
        test: /\.js$/,
        use: {
          loader: "babel-loader"
        }
      }
    ]
  },
  plugins: [
    new EnvironmentPlugin({
      NODE_ENV: "development"
    })
  ]
};

const optimizeConfig = Object.assign({}, baseConfig, {
  output: {
    filename: "[name].umd.min.js",
    path: OUTPUT_DIR
  },
  mode: "production",
  devtool: "source-map",
  optimization: {
    minimizer: [
      new UglifyJSPlugin({
        sourceMap: true,
        extractComments: true
      })
    ]
  },
  plugins: [
    new EnvironmentPlugin({
      NODE_ENV: "production"
    })
  ]
});

module.exports = [baseConfig, optimizeConfig];
