const Dotenv = require('dotenv-webpack');

module.exports = {
	devtool: 'none',
	entry: {
		main: ['@babel/polyfill', './src/assets/js/index.js'] // Which file we want to use to be our source file, entry point, that have modern JS
	},
	module: {
		rules: [
			{
				// where we define our loaders (e.g: babel loader)
				test: /\.js?$/, // Look at all .js files
				exclude: /node_modules/,
				loader: 'babel-loader',
				// Where we define our presets
				query: {
					presets: ['@babel/preset-env', '@babel/preset-react'],
					plugins: ['@babel/plugin-proposal-class-properties']
				}
			},
			{
				test: /\.html$/,
				use: ['html-loader']
			},
			{
				test: /\.(webp|jpg|jpeg|png|gif|mp3|svg|ttf|woff2|woff|eot)$/i,
				use: {
					loader: 'file-loader',
					options: {
						name: 'assets/media/[name].[hash].[ext]',
						esModule: false
					}
				}
			},
		]
	},
	plugins: [
		new Dotenv()
	],
	externals: {
		moment: 'moment'
	}
};
