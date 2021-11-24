const HtmlWebpackPlugin = require("html-webpack-plugin");
const { ModuleFederationPlugin } = require("webpack").container;
const path = require("path");
const pkgDependencies = require("./package.json").dependencies;

module.exports = {
	entry: "./src/index.ts",
	devServer: {
		static: path.join(__dirname, "dist"),
		port: 3001,
		hot: true,
		liveReload: true,
	},
	output: {
		publicPath: "http://localhost:3001/",
	},
	resolve: {
		extensions: [".ts", ".tsx", ".js"],
	},
	module: {
		rules: [
			{
				test: /\.(jsx?|tsx?)$/,
				loader: "ts-loader",
				exclude: /node_modules/,
			},
		],
	},
	plugins: [
		new ModuleFederationPlugin({
			name: "absence",
			library: { type: "var", name: "absence" },
			filename: "remoteEntry.js",
			exposes: {
				// @note: expose remote assets
				"./View": "./src/View",
			},
			shared: {
				// @note: defines share dependency across modules
				// ...pkgDependencies,
				react: {
					singleton: true,
					requiredVersion: pkgDependencies.react,
				},
				"react-dom": {
					singleton: true,
					requiredVersion: pkgDependencies["react-dom"],
				},
				"@shared/context": {
					singleton: true,
					requiredVersion: pkgDependencies["@shared/context"],
				},
			},
		}),
		new HtmlWebpackPlugin({
			template: "./public/index.html",
		}),
	],
};
