/**
 * Webpack config for production electron main process
 */

import path from 'path';
import webpack from 'webpack';
import merge from 'webpack-merge';
import TerserPlugin from 'terser-webpack-plugin';
import baseConfig from '../webpack.config.base';

export default merge(baseConfig, {
  devtool: 'source-map',
  mode: 'production',
  target: 'electron-main',
  entry: './app/preload/index',
  output: {
    path: path.join(__dirname, '..', '..', 'app/dist/prod'),
    publicPath: './dist/prod/',
    filename: 'preload.prod.js'
  },

  optimization: {
    minimizer: [
      new TerserPlugin({
        parallel: true
      })
    ]
  },

  plugins: [
    /**
     * Create global constants which can be configured at compile time.
     *
     * Useful for allowing different behaviour between development builds and
     * release builds
     *
     * NODE_ENV should be production so that modules do not perform certain
     * development checks
     */
    new webpack.EnvironmentPlugin({
      NODE_ENV: 'production',
      DEBUG_PROD: false,
      START_MINIMIZED: false
    })
  ],

  /**
   * Disables webpack processing of __dirname and __filename.
   * If you run the bundle in node.js it falls back to these values of node.js.
   * https://github.com/webpack/webpack/issues/2010
   */
  node: {
    __dirname: false,
    __filename: false
  }
});
