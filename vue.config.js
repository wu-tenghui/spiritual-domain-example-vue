module.exports = {
    publicPath: '/spiritual-domain-example-vue/',
    outputDir: 'dist/spiritual-domain-example-vue',
    lintOnSave: true,
    runtimeCompiler: true,
    pages: {
        index: 'src/entry.ts',
    },
    configureWebpack: {
        module: {
            rules: [
                {
                    test: /\.html$/,
                    use: 'raw-loader',
                },
            ],
        },
    },
    css: {
        loaderOptions: {
            less: {
                javascriptEnabled: true,
            },
        },
    },
    devServer: {
        proxy: {
            '/spiritual-domain-example/': {
                target: 'http://127.0.0.1:8080/',
                changeOrigin: true,
            },
        },
    },
};
