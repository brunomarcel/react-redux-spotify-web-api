const webpack = require('webpack')
const ExtractTextPlugin = require("extract-text-webpack-plugin")

module.exports = env => {

  console.log(env)
  const apiHost = env.NODE_ENV;

  switch (env.NODE_ENV) {
    case 'DSV':
    default:
      return {
        entry: './src/index.jsx',
        output: {
          path: __dirname + '/public',
          filename: './bundle.js'
        },
        devServer: {
          historyApiFallback: true,
          port: 8080,
          contentBase: './public'
        },
        module: {
          rules: [
            {
              test: /\.(js|jsx)$/,
              exclude: /node_modules/,
              use: ['babel-loader']
            },
            {
              test: /\.scss$/,
              use: [
                "style-loader", // creates style nodes from JS strings
                "css-loader", // translates CSS into CommonJS
                "sass-loader" // compiles Sass to CSS, using Node Sass by default
              ]
            }
          ]
        },
        resolve: {
          extensions: ['*', '.js', '.jsx', '.scss']
        },
        plugins: [
          new webpack.DefinePlugin({
            __API__: apiHost
          })
        ]
      }
      
  }
}
