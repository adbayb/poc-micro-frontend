const HtmlWebpackPlugin = require("html-webpack-plugin");
const { ModuleFederationPlugin } = require("webpack").container;
const path = require("path");
const pkgDependencies = require("./package.json").dependencies;

module.exports = {
	entry: "./src/index.ts",
	devServer: {
		static: path.join(__dirname, "dist"),
		port: 3000,
		liveReload: true,
		hot: true,
	},
	output: {
		publicPath: "http://localhost:3000/",
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
			name: "container",
			library: { type: "var", name: "container" },
			remotes: {
				absence: "absence",
				expense: "expense",
			},
			// @note: enforces share dependency between remote modules and shell
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
