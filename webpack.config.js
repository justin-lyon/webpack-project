const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require("html-webpack-plugin");

const VENDOR_LIBS = [
	"faker",
	"lodash",
	"redux",
	"react",
	"react-redux",
	"react-dom",
	"react-input-range",
	"redux-form",
	"redux-thunk"
];

module.exports = {
  entry: {
		bundle: "./src/index.js",
		vendor: VENDOR_LIBS
	},
  output: {
    path: path.join(__dirname, 'dist'),
    filename: "[name].[chunkhash].js"
  },

	module: {
		rules: [
			{
				use: "babel-loader",
				test: /\.js$/,
				exclude: /node_modules/
			},
			{
				use: ["style-loader", "css-loader"],
				test: /\.css$/
			}
		]
	},

	plugins: [
		// remove VENDOR_LIBS duplicate dependencies from bundle.js
		new webpack.optimize.CommonsChunkPlugin({
			names: ["vendor", "manifest"]
		}),
		// Inject script dependencies to index.html for us
		new HtmlWebpackPlugin({
			template: "src/index.html"
		})
	]
};
