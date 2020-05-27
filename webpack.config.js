const webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
// const CopyWebpackPlugin = require('copy-webpack-plugin');
const config = {
  context: __dirname,
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, ""),
    publicPath: '/',
    filename: 'bundle.js',
  },
  module: {
    loaders: [{
      exclude: /node_modules/,
      test: /\.(js|jsx)$/,
      loader: 'babel',
    },
    {
      test: /\.scss$/,
      // Query parameters are passed to node-sass
      loader: 'style!css!sass?outputStyle=expanded&' +
      'includePaths[]=' + (path.resolve(__dirname, './bower_components')) + '&' +
      'includePaths[]=' + (path.resolve(__dirname, './node_modules')),
    },
    {
      test: /\.html$/,
      loader: "file?name=[name].[ext]"
    }, { test: /\.json$/, loader: 'json-loader' },
    {
      test: /\.(gif|png|jpe?g|svg)$/i,
      loaders: [
        'file-loader',
        {
          loader: 'image-webpack-loader',
          query: {
            progressive: true,
            optimizationLevel: 7,
            interlaced: false,
            pngquant: {
              quality: '65-90',
              speed: 4
            }
          }
        }
      ]
    },
    { test: /\.less$/, loader: 'style!css?modules&importLoaders=2&sourceMap&localIdentName=[local]___[hash:base64:5]!autoprefixer?browsers=last 2 version!less?outputStyle=expanded&sourceMap' },
    { test: /\.woff(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=10000&mimetype=application/font-woff' },
    { test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=10000&mimetype=application/font-woff' },
    { test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=10000&mimetype=application/octet-stream' },
    { test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: 'file' },
    { test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=10000&mimetype=image/svg+xml' }],
  },
  devServer: {
    historyApiFallback: true,
    contentBase: './',
    host: 'localhost',
    port: 7001,
    compress: true,
    setup: function (app) {
      app.post('/payment', function (req, res) {
        // console.log("req", req.body);
        res.redirect('/appointment?pay=');
      });
      app.post("/paymentselectplan", function (req, res) {
        //  console.log("req", req.body);
         res.redirect('/selectplan?pay=');
      })
    },
  },
  cache: true,
  devtool: 'source-map',
  watch: false,
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': '"production"',
    }),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
      },
    })
  ],
};

module.exports = config;
