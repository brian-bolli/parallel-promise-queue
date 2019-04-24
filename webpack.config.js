"use strict";

const path = require("path");

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

    output: {
        filename: "ppq.js",
		path: path.join(__dirname, "dist"),
		libraryTarget: "umd",
		globalObject: "this"
	}

};
