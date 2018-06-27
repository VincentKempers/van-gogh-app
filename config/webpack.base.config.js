const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

const isProd = process.env.NODE_ENV === 'production';

module.exports = {
	devtool: isProd ? false : '#cheap-module-source-map',

	output: {
		path: path.resolve(__dirname, '../src/assets/dist'),
		publicPath: '/assets/dist',
		filename: '[name].[hash].js',
	},

	resolve: {
		extensions: ['.js',
'.vue',
'.json'],
		alias: {
			vue$: 'vue/dist/vue.esm.js',
			'@': path.resolve('src'),
		},
	},

	module: {
		noParse: /es6-promise\.js$/, // avoid webpack shimming process
		rules: [
			{
				test: /\.vue$/,
				loader: 'vue-loader',
				options: {
					extractCSS: process.env.NODE_ENV === 'production',
				},
			},

			{
				test: /\.js$/,
				loader: 'babel-loader',
				exclude: /node_modules/,
			},

			{
				test: /\.(png|jpg|gif|svg)$/,
				loader: 'url-loader',
				options: {
					limit: 10000,
					name: '[name].[ext]?[hash]',
				},
			},
			{
				test: /\.scss$/,
				use: ['vue-style-loader',
'css-loader',
'sass-loader'],
			},
		],
	},

	plugins: isProd
		? [
				new webpack.optimize.ModuleConcatenationPlugin(),
				new ExtractTextPlugin({
					filename: 'common.[hash].css',
				}),
				new UglifyJsPlugin(),
		  ]
		: [],
	devServer: {
		// Display only errors to reduce the amount of output.
		stats: 'errors-only',

		// Parse host and port from env to allow customization.
		//
		// If you use Docker, Vagrant or Cloud9, set
		// host: options.host || "0.0.0.0";
		//
		// 0.0.0.0 is available to all network devices
		// unlike default `localhost`.
		historyApiFallback: true,
		noInfo: true,
		overlay: true,

		// host: process.env.HOST, // Defaults to `localhost`
		// port: process.env.PORT, // Defaults to 8080
		open: false, // Open the page in browser
	},
};
