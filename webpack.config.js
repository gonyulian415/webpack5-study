const { resolve } = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
    mode: 'development',
    devtool: false,
    entry: './src/index.js',
    output: {
        path: resolve(__dirname, 'dist'),
        filename: 'main.js',
    },
    devServer: {
        static: {
            directory: resolve(__dirname, 'dist')
        },
        port: 8080,
        open: true,
        compress: true,
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/, use: [{
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            "@babel/preset-env",
                            "@babel/preset-react"
                        ]
                    }
                }]
            },
            { test: /\.txt$/, use: 'raw-loader' },
            { test: /\.css$/, use: ['style-loader', 'css-loader'] }, //处理顺序: 从右往左
            { test: /\.less$/, use: ['style-loader', 'css-loader', 'less-loader'] },
            { test: /\.scss$/, use: ['style-loader', 'css-loader', 'sass-loader'] },
            {
                test: /\.(jpg|png|gif|bmp)$/, use: [{
                    loader: 'url-loader',
                    options: {
                        name: '[hash:10].[ext]',
                        esModule: false,    //如果是true，require出来的值需要用xxx.default来取
                        limit: 128 * 1024,  //这个属性是url-loader对file-loader的补强，小于limit的会转成base64字符串内嵌进html里
                        //大于limit的会交回file-loader处理，即url-loader也是通过file-loader实现的
                    }
                }]
            },
            { test: /\.html$/, use: ['html-loader'] },
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html',
        })
    ]
}