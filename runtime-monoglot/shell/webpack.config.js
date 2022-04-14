const HtmlWebpackPlugin = require("html-webpack-plugin");
const { ModuleFederationPlugin } = require("webpack").container;
const path = require("path");
const pkgDependencies = require("./package.json").dependencies;

module.exports = {
	entry: {
		shell: "./src/index.ts",
	},
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
			name: "shell",
			library: { type: "var", name: "shell" },
			remotes: ["absence", "expense"],
			shared: [
				...Object.keys(pkgDependencies),
				"react/jsx-runtime",
			].reduce((shared, name) => {
				shared[name] = {
					/**
					 * Enabling eager allows to not put the shared module in an async chunk
					 * by inlining it inside the initial chunk (ie. inside either inside the
					 * exposed `ModuleFederationPlugin.filename` for remote module or
					 * in the shell entrypoint (defined via `entry` key)).
					 * Please note that fallback modules (ie. unmatched shared modules version) are also inlined
					 * even if they're unmatched outside this shell container.
					 *
					 * By default, set to false.
					 */
					eager: true,
					singleton: true,
					requiredVersion: pkgDependencies[name],
				};

				return shared;
			}, {}),
		}),
		new HtmlWebpackPlugin({
			template: "./public/index.html",
		}),
	],
};
