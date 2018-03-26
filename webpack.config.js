const commonConfig = require('./build-utils/webpack.common');
const webpackMerge = require('webpack-merge');

module.exports = () => {
  console.log(process.env.NODE_ENV);
  const envConfig = require(`./build-utils/webpack.${process.env.NODE_ENV}.js`);
  return webpackMerge(commonConfig, envConfig);
};
