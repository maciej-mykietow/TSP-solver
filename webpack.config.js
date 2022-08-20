const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const path = require('path');

module.exports = {

  entry: './src/index.js',

  output: {
    path: path.resolve(__dirname, 'dist'),
    publicPath: '',
    filename: 'bundle.js'
  },

  module: {
    rules: [
        {
          test: /\.(png|jpg|gif)$/i,
          use: [
            {
              loader: 'url-loader',
              options: {
                limit: 8192
              }
            }
          ]
        },
        {
            test: /\.js$/,
            exclude: /(node_modules)/,
            use: {
              loader: 'babel-loader',
              options: {
                presets: ['@babel/preset-env', '@babel/preset-react']
              }
            }
          },
          {
            test: /\.js$/,
            /* ... */
          },
          {
            test: /\.(sa|sc|c)ss$/,
      
            use: [
                   {
                     loader: "css-loader",
                   },
                   {
                     loader: "postcss-loader"
                   },
                   {
                     loader: "sass-loader",
                     options: {
                       implementation: require("node-sass")
                     }
                   }
                 ]
          },
          {
            test: /\.(svg|eot|woff|woff2|ttf)$/,
            use: ['file-loader']
        }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
        filename: "bundle.css"
      })
  ],

  mode: 'production'
};