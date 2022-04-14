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
		port: 3001,
		hot: true,
		liveReload: true,
	},
	output: {
		/**
		 * The publicPath is a key configuration to set the base path for all MFE assets.
		 * The public path should be configured per environment (can be statically via
		 * different webpack config or dynamically (at runtime) via https://scriptedalchemy.medium.com/micro-fe-architecture-webpack-5-module-federation-and-custom-startup-code-9cb3fcd066c)
		 */
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
			/**
			 * The name of the micro frontend container (has no repercussion on the way MFE is served: dummy field?)
			 */
			name: "absence",
			/**
			 * Var library type allows to assign the output of the MFE build into the variable `absence`.
			 * It allows to reference more easily in the shell configuration instead of resolving it by its publicPath
			 * (ie. via `remotes: "absence"` instead of `remotes: { absence: "absence@http://localhost:3001/remoteEntry.js" }`)
			 */
			library: { type: "var", name: "absence" },
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
			 * => `import { View } from "absence/View"`
			 */
			exposes: {
				"./View": "./src/View",
			},
			shared: [
				...Object.keys(pkgDependencies),
				"react/jsx-runtime",
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
					 * the one resolved during the initialization phase (the highest range version is resolved in the share scope (more often, the version required by the shell is resolved))
					 * a warning is displayed (eg. `Unsatisfied version 0.0.0 from shell of shared singleton module @shared/context (required =19.0.0)`).
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