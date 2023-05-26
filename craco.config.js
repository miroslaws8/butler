const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
    webpack: {
        configure: (webpackConfig, {env, paths}) => {
            webpackConfig.plugins.forEach((plugin) => {
                if (plugin.constructor.name === 'HtmlWebpackPlugin') {
                    plugin.userOptions.excludeChunks = ['main'];
                }
            });

            return {
                ...webpackConfig,
                devServer: {
                    static: './dist',
                    hot: true,
                },
                entry: {
                    main: './src/index.js',
                    toolbar: './src/toolbar.js',
                },
                output: {
                    ...webpackConfig.output,
                    filename: 'static/js/[name].js',
                },
                optimization: {
                    ...webpackConfig.optimization,
                    runtimeChunk: false,
                },
                plugins: [
                    ...webpackConfig.plugins,
                    new MiniCssExtractPlugin({
                        filename: 'static/css/[name].css',
                    })
                ],
            }
        },
    },
}