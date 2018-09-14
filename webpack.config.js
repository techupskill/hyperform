const path = require('path');
const webpack = require('webpack');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const module_type = process.env.MODULE_TYPE || 'window';

let path_mod = '';
switch (module_type) {
  case 'amd':
    path_mod = '.amd';
    break;
  case 'commonjs2':
    path_mod = '.cjs';
    break;
}
const entry = {};
entry['hyperform'+path_mod] = './src/hyperform.js';
entry['hyperform'+path_mod+'.min'] = './src/hyperform.js';

module.exports = {
  mode: 'production',
  entry,
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js',
    library: 'hyperform',
    libraryTarget: module_type,
    libraryExport: 'default',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      }
    ]
  },
  plugins: [
    new webpack.BannerPlugin({
      banner: 'hyperform.js.org',
      entryOnly: true,
    }),
  ],
  optimization: {
    minimize: true,
    minimizer: [new UglifyJsPlugin({
      include: /\.min\.js$/,
    })]
  }
};
