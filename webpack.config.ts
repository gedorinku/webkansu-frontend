import webpack from 'webpack';

const config: webpack.Configuration = {
  module: {
    rules: [
      { test: /\.tsx?$/, use: 'ts-loader' },
    ],
  },
  // ...
};

export default config;
