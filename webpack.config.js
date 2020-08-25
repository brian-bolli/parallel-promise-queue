"use strict";

const path = require("path");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = {

    entry: "./src/index.ts",
    devtool: "inline-source-map",
    mode: "production",
	target: "node",
    module: {
        rules: [
            {
				test: /\.(ts|js)$/,
				exclude: /node_modules/,
                use: ["ts-loader"]
            }
        ]
    },

    resolve: {
        extensions: [ ".js", ".ts"]
	},
	
	plugins: [
		new CleanWebpackPlugin()
	],

    output: {
        filename: "index.js",
		path: path.join(__dirname, "./dist"),
		library: "parallel-promise-queue",
		libraryTarget: "commonjs2",
		libraryExport: "default"
	}

};
