const path = require('path');

const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = { 
    entry: "./App.js", // основной файл приложения
    output:{ 
        path: __dirname, // путь к каталогу выходных файлов
        filename: "bundle.js"  // название создаваемого файла 
    },
    mode: 'development',
    devtool:'source-map',
    devServer: {
        contentBase: path.resolve(__dirname),
        port: 3200
    },
    module:{ 
        rules:[
            { 
                test: /\.jsx?$/, // какие файлы обрабатывать
                exclude: /node_modules/, // какие файлы пропускать
                use: { loader: "babel-loader" }
            },
            {
                test: /\.css$/,
                use: [
                    {
                      loader: MiniCssExtractPlugin.loader,
                      options: {
                        // you can specify a publicPath here
                        // by default it uses publicPath in webpackOptions.output
                        hmr: process.env.NODE_ENV === 'development',
                      },
                    },
                    'css-loader',
                ],
            }            
        ] 
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: "bundle.css"
        })
    ]
}