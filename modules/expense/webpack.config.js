const HtmlWebpackPlugin = require("html-webpack-plugin");
const { ModuleFederationPlugin } = require("webpack").container;
const path = require("path");
const pkgDependencies = require("./package.json").dependencies;

module.exports = {
	entry: "./src/index.ts",
	devServer: {
		static: path.join(__dirname, "dist"),
		port: 3002,
		hot: true,
		liveReload: true,
	},
	output: {
		publicPath: "http://localhost:3002/",
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
			name: "expense",
			library: { type: "var", name: "expense" },
			filename: "remoteEntry.js",
			exposes: {
				"./View": "./src/View",
			},
			shared: ["react", "react-dom", "@shared/context"].map((name) => ({
				[name]: {
					singleton: true,
					requiredVersion: pkgDependencies[name],
				},
			})),
		}),
		new HtmlWebpackPlugin({
			template: "./public/index.html",
		}),
	],
};
