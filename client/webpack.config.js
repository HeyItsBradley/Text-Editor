const HtmlWebpackPlugin = require("html-webpack-plugin");
const WebpackPwaManifest = require("webpack-pwa-manifest");
const path = require("path");
const { InjectManifest } = require("workbox-webpack-plugin");

module.exports = () => {
  return {
    mode: "development",
    entry: {
      main: "./src/js/index.js",
      install: "./src/js/install.js",
    },
    output: {
      filename: "[name].bundle.js",
      path: path.resolve(__dirname, "dist"),
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: "./index.html",
        title: "TODOs List",
      }),
      new InjectManifest({
        swSrc: "./src/src-sw.js",
        swDest: "service-worker.js",
      }),
      new WebpackPwaManifest({
        name: "Just Another Text Editer",
        short_name: "JATE",
        description: "An app for editing text",
        background_color: "#224ca3",
        crossorigin: null, //can be null, use-credentials or anonymous
        icons: [
          {
            src: path.resolve("src/images/logo.png"),
            sizes: [96, 128, 192, 256, 384, 512], // multiple sizes
          },
          {
            src: path.resolve("src/images/logo.png"),
            size: "1024x1024", // you can also use the specifications pattern
          },
          {
            src: path.resolve("src/images/logo.png"),
            size: "1024x1024",
            purpose: "maskable",
          },
        ],
      }),
    ],

    module: {
      rules: [
        {
          test: /\.css$/i,
          use: ["style-loader", "css-loader"],
        },
        {
          test: /\.m?js$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader",
            options: {
              presets: ["@babel/preset-env"],
              plugins: [
                "@babel/plugin-proposal-object-rest-spread",
                "@babel/transform-runtime",
              ],
            },
          },
        },
      ],
    },
  };
};
