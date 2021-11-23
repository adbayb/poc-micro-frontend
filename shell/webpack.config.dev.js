const config = require("./webpack.config");

module.exports = {
	...config,
	mode: "development",
	devServer: {
		compress: true,
		port: 9000,
	},
};
