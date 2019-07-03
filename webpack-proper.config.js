/**
 * MIT License
 *
 * Copyright (c) 2017-present, Elasticsearch BV
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 *
 */

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
