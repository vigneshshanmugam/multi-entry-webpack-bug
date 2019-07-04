const path = require("path");
const { EnvironmentPlugin } = require("webpack");
const UglifyJSPlugin = require("uglifyjs-webpack-plugin");

const OUTPUT_DIR = path.join(__dirname, "dist");

const devConfig = entry => ({
  entry,
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
});

const prodConfig = {
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
};

const entry1DevConfig = devConfig({
  entry1: "./lib/entry1.js"
});

const entry2DevConfig = devConfig({
  entry2: "./lib/entry2.js"
});

module.exports = [
  entry1DevConfig,
  entry2DevConfig,
  Object.assign({}, entry1DevConfig, prodConfig),
  Object.assign({}, entry2DevConfig, prodConfig)
];
