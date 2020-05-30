const path = require("path");
var HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: "./src/index.js",
  module: {
    rules: [
      {
        test: /\.html$/,
        use: [
          {
            loader: "html-loader",
            options: {
              interpolate: true,
            },
          },
        ],
      },
      {
        test: /\.(svg|png|jpe?g|gif)$/,
        use: {
          loader: "file-loader",
          options: {
            name: "[name].[ext]",
            outputPath: "assets/img",
          },
        },
      },
      {
        test: /\.(eot|woff|woff2|svg|ttf|otf)([\?]?.*)$/,
        use: {
          loader: "file-loader",
          options: {
            name: "[name].[hash].[ext]",
            outputPath: "assets/fonts",
          },
        },
      },
    ],
  },
};
