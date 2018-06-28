const {resolve} = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const path = require("path");

const config = {
    devtool: "source-map",

    target: "web",

    entry: [
        "./main.js",
        "./assets/scss/main.scss",
    ],

    context: resolve(__dirname, "app"),

    output: {
        filename      : "[name]-[hash].js",
        path          : resolve(__dirname, "docs"),
        publicPath    : ""
    },

    plugins: [
        new webpack.optimize.ModuleConcatenationPlugin(),
        new HtmlWebpackPlugin({
            template: `${__dirname}/app/index.html`,
            filename: "index.html",
            inject  : "body",
        }),
        new webpack.optimize.OccurrenceOrderPlugin(),
        new webpack.LoaderOptionsPlugin({
            minimize: true,
            debug   : false,
        }),
        new webpack.optimize.UglifyJsPlugin({
            beautify: false
        }),
        new webpack.DefinePlugin({"process.env": {NODE_ENV: JSON.stringify("production")}}),
        new ExtractTextPlugin({filename: "./styles/style-[contenthash].css", disable: false, allChunks: true}),
        new CopyWebpackPlugin([{from: "./vendors", to: "vendors"}]),
    ],

    resolve: {
        extensions: ["*", ".js", ".jsx"],
        modules   : [
            path.resolve("./app"),
            path.resolve("./node_modules")
        ]
    },

    module: {
        loaders: [
            {
                test: /\.less$/,
                use : [{
                    loader: "style-loader" // creates style nodes from JS strings
                }, {
                    loader: "css-loader" // translates CSS into CommonJS
                }, {
                    loader : "less-loader", // compiles Less to CSS
                    options: {
                        javascriptEnabled: true
                    }
                }].concat(ExtractTextPlugin.extract({
                    fallback  : "style-loader",
                    use       : [
                        "css-loader",
                        {
                            loader : "less-loader",
                            options: {
                                javascriptEnabled: true
                            }
                        },
                    ],
                    publicPath: "../"
                }))
            },
            {
                test   : /\.jsx?$/,
                exclude: /node_modules/,
                loader : "babel-loader",
            },
            {
                test: /\.(png|jpg|gif)$/,
                use : [
                    {
                        loader : "url-loader",
                        options: {
                            limit   : 8192,
                            mimetype: "image/png",
                            name    : "images/[name].[ext]",
                        }
                    }
                ],
            },
            {
                test: /\.eot(\?v=\d+.\d+.\d+)?$/,
                use : [
                    {
                        loader : "file-loader",
                        options: {
                            name: "fonts/[name].[ext]"
                        }
                    }
                ],
            },
            {
                test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                use : [
                    {
                        loader : "url-loader",
                        options: {
                            limit   : 8192,
                            mimetype: "application/font-woff",
                            name    : "fonts/[name].[ext]",
                        }
                    }
                ],
            },
            {
                test: /\.[ot]tf(\?v=\d+.\d+.\d+)?$/,
                use : [
                    {
                        loader : "url-loader",
                        options: {
                            limit   : 8192,
                            mimetype: "application/octet-stream",
                            name    : "fonts/[name].[ext]",
                        }
                    }
                ],
            },
            {
                test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
                use : [
                    {
                        loader : "url-loader",
                        options: {
                            limit   : 8192,
                            mimetype: "image/svg+xml",
                            name    : "images/[name].[ext]",
                        }
                    }
                ],
            },
        ]
    },
};

module.exports = config;
