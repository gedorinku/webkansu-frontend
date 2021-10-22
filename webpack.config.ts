import path from "path";
import webpack from "webpack";
import 'webpack-dev-server';

const config: webpack.Configuration = {
  module: {
    rules: [{ test: /\.tsx?$/, use: "ts-loader" }],
  },
  output: {
    path: path.join(__dirname, "dist", process.env.BROWSER),
  }
};

export default config;
