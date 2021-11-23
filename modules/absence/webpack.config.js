const { ModuleFederationPlugin } = require("webpack").container;
const HtmlWebpackPlugin = require("html-webpack-plugin");
const pkg = require("./package.json");

module.exports = {
	entry: "./src/index.ts",
	output: {
		filename: "main.js",
	},
	resolve: {
		extensions: [".ts", ".tsx", ".js"],
	},
	module: {
		rules: [{ test: /\.tsx?$/, loader: "ts-loader" }],
	},
	plugins: [
		new ModuleFederationPlugin({
			name: "absence",
			filename: "remoteEntry.js",
			exposes: {
				"./ModuleEntrypoint": "./src/ModuleEntrypoint",
			},
			shared: {
				react: {
					singleton: true,
					eager: true,
					requiredVersion: pkg.devDependencies.react,
				},
				"react-dom": {
					singleton: true,
					eager: true,
					requiredVersion: pkg.devDependencies["react-dom"],
				},
			},
		}),
		new HtmlWebpackPlugin({
			template: "public/index.html",
		}),
	],
};
