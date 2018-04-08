const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
  entry: '../main.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, '../dist')
  },
  resolve: {
    alias: {
      '../../@polymer': './node_modules/@polymer',
      '../../leaflet': './node_modules/leaflet'
    }
  },
  module: {
    rules: [
      { 
        test: /\.js$/, 
        loader: "babel-loader",
        include: [
          path.join(__dirname, '..'),
          /\/node_modules\/@polymer/
        ],
        options: {
          presets: [
            'babel-preset-env'
          ].map(require.resolve)
        }
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader'
        ]
      },
      {
        test: /\.(png|svg|jpg)$/,
        use: [
          'file-loader'
        ]
      },
      {
        test: /\.json$/,
        use: [
          'json-loader'
        ]
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(['dist'])
  ]
};
