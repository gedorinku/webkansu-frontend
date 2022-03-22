const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
  entry: {
    popup: "./src/popup/Popup.tsx",
    contentScript: "./src/content-script/index.ts",
    background: './src/background/index.ts'
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].js",
  },
  module: {
    rules: [
      {
        test: [/\.ts$/, /\.tsx$/],
        exclude: /node_modules/,
        use: [
          {
            loader: "babel-loader",
            options: {
              presets: ["@babel/preset-env", "@babel/preset-react"],
              plugins: ['@babel/plugin-transform-runtime'],
            },
          },
          'ts-loader'
        ]
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/popup/index.html",
      filename: "popup.html",
    }),
    new CopyPlugin({
      patterns: [{ from: "./src/public" }],
    }),
  ],
  resolve: {
    extensions: ['.ts', '.js']
  },
};
