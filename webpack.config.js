const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const VueLoaderPlugin = require('vue-loader/lib/plugin')

module.exports = {
    module: {
        rules: [
            {
            test: /\.css$/,
            use: [MiniCssExtractPlugin.loader, 'css-loader']
            },
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/
                }
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
          filename: 'css/[name].css',
          chunkFilename: '[id].css',
        }),
        new HtmlWebpackPlugin ({
            template: './src/public/index.html'
        }),
        new VueLoaderPlugin ()
      ],
      devServer: {
        open: true,
        hot: true,
        port: 8080,
        proxy: {
            '/api': {
                target: 'http://localhost:3000',
                pathRewrite: { '^/api' : '' },
                secure: false,
                changeOrigin: true
            }

}
      }
    }