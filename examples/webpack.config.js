const path = require('path');

module.exports = {
    mode: 'none',
    entry:{
        main: path.resolve(__dirname, 'index.js'),

    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].bundle.js',
        // libraryTarget: "umd",
        // library: "[name]",
        // libraryExport: 'default'
    },
    module: {
        rules: [
            {
                test: /\.md$/,
                use: 'text-loader'
            }
        ]
    },
    externals: {
    },
    plugins: [

    ],
    devServer: {
        // hotOnly: true,
        // contentBase: path.join(__dirname, "dist")
        contentBase: path.join(__dirname, "./")
    }
};

