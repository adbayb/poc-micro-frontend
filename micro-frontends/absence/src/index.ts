/**
 * We create an asynchronous boundary to prevent such error "Uncaught Error: Shared module is not available for eager consumption".
 * If this error occurs, it means that Webpack tries to run the application entrypoint with unloaded dependencies and modules.
 * By creating an asynchronous boundary, we let the initial chunk to load both the bootstrap file asynchronously and all dependencies/modules
 * and waits until loading is done before executing the bootstrap file.
 * In other words, this gives webpack an opportunity to fetch dependencies before executing the bootstrap code.
 *
 * @see: https://webpack.js.org/concepts/module-federation/#uncaught-error-shared-module-is-not-available-for-eager-consumption
 */
import("./bootstrap");

export {};
