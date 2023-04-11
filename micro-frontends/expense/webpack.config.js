const HtmlWebpackPlugin = require("html-webpack-plugin");
const { ModuleFederationPlugin } = require("webpack").container;
const path = require("path");
const pkgDependencies = require("./package.json").dependencies;

module.exports = {
	entry: "./src/index.ts",
	/**
	 * Dev server configuration to serve MFE during development.
	 * In production, the assets will be ideally served from a CDN.
	 */
	devServer: {
		static: path.join(__dirname, "dist"),
		port: 3002,
		hot: true,
		liveReload: true,
		open: true,
	},
	output: {
		/**
		 * The publicPath is a key configuration to set the base path for all MFE assets.
		 * The public path should be configured per environment (can be statically via
		 * different webpack config or dynamically (at runtime) via https://scriptedalchemy.medium.com/micro-fe-architecture-webpack-5-module-federation-and-custom-startup-code-9cb3fcd066c)
		 */
		publicPath: "http://localhost:3002/",
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
			/**
			 * The name of the micro frontend container (has no repercussion on the way MFE is served: dummy field?)
			 */
			name: "expense",
			/**
			 * Var library type allows to assign the output of the MFE build into the variable `expense`.
			 * It allows to reference more easily in the shell configuration instead of resolving it by its publicPath
			 * (ie. via `remotes: "expense"` instead of `remotes: { expense: "expense@http://localhost:3001/remoteEntry.js" }`)
			 */
			// library: { type: "var", name: "expense" },
			/**
			 * The filename of the MFE entrypoint relative to the `output.path` directory.
			 * This entrypoint is a tiny mapping for webpack to let it resolve and download asynchronously imported modules and chunks specified in the mapping.
			 * If a shared library (see `shared` config key) has the `eager` option set to `true`, the entrypoint will resolve this shared dependency
			 * by inlining it inside the entrypoint (ie. Webpack will include it directly instead of fetching the library via an asynchronous request).
			 *
			 * This file should never get cached client side since no cache busting could be applied (the name remains the same even if the content has been updated).
			 * By not getting cached, always a fresh version of remoteEntry file will be served with new chunks mapping to serve updated (or not) assets.
			 * @see: https://stackoverflow.com/a/68489615
			 */
			filename: "remoteEntry.js",
			/**
			 * List of inner modules that should be exposed by the MFE.
			 * Each value is a relative path to the exposed module.
			 * The key is used to consume the exposed module consumer side:
			 * eg. `import { View } from "${library.name}/${key of exposes}"`
			 * => `import { View } from "expense/View"`
			 */
			exposes: {
				"./all": "./src/MicroFrontend.tsx",
			},
			shared: [
				...Object.keys(pkgDependencies),
				"react/jsx-runtime",
				"react-dom/client",
			].reduce((shared, moduleName) => {
				shared[moduleName] = {
					/**
					 * Enabling eager allows to not put the shared module in an async chunk
					 * by inlining it inside the initial chunk (ie. inside either inside the
					 * exposed `ModuleFederationPlugin.filename` for remote module or
					 * in the shell entrypoint (defined via `entry` key)).
					 * By default, set to false.
					 */
					eager: false,
					/**
					 * When enabled, force only a single version of the shared module in share scope (by default, false).
					 * Even if it's not enabled, a module is shared also if the `requiredVersion` matches (or is compatible
					 * if the specified version is not a strict one (via `^`, `~` prefixes...)) the specified one in the shell container.
					 * Otherwise, if it's not enabled and the module version is not matched, the fallback module is loaded (ie. new copy of the module with the required version).
					 */
					singleton: true,
					/**
					 * Version requirement for the shared module in the share scope.
					 * If the requiredVersion doesn't match (ie. not compatible strictly or within the specified range (if `^`, `~` prefix... is used))
					 * the one resolved during the initialization phase (the highest range version is resolved in the share scope)
					 * a warning is displayed (eg. `Unsatisfied version 17.0.2 from shell of shared singleton module react (required ^16.14.0)`).
					 */
					requiredVersion: pkgDependencies[moduleName],
					/**
					 * Has effect only if `singleton` is enabled (otherwise, ignored):
					 * Do not accept shared module if version is not valid.
					 * It'll throw an error if sets to true and the version doesn't match with the share scope.
					 * It allows to fail fast when detecting the mismatch but needs to be used carefully to not lead to runtime error.
					 */
					strictVersion: false,
				};

				return shared;
			}, {}),
		}),
		new HtmlWebpackPlugin({
			template: "./public/index.html",
		}),
	],
};
