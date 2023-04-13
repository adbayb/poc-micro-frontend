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
		historyApiFallback: true,
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
				test: /\.tsx?$/,
				loader: "ts-loader",
			},
		],
	},
	plugins: [
		/**
		 * The plugin to configure module federation.
		 * Some terminology useful to known when talking about Webpack Module federation:
		 * - Host (aka the container or shell): A Webpack build that is initialized first during a page load
		 * - Remote (aka the micro frontend): Another Webpack build, where part of it is being consumed by a host
		 * - Bidirectional-hosts: configured to consume remote modules and be consumed as a remote module
		 * - Omnidirectional-hosts: A host that behaves like a remote & host **at the same time at runtime**
		 */
		new ModuleFederationPlugin({
			name: "shell",
			/**
			 * Consume remote (micro frontend) modules.
			 * Please note that the shell can be at the same time a host and a remote module
			 * so we can have both the `remotes` and `exposes` configuration fields.
			 */
			remotes: {
				classifieds: "classifieds@http://localhost:3001/remoteEntry.js",
			},
			shared: [
				...Object.keys(pkgDependencies),
				"react/jsx-runtime",
				"react-dom/client",
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
