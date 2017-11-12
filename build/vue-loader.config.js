module.exports = {
    loaders: {
        'css': 'vue-style-loader!css-loader?minimize',
        'scss': 'vue-style-loader!css-loader?minimize!sass-loader',
        'sass': 'vue-style-loader!css-loader?minimize!sass-loader?indentedSyntax'
    },
    extractCSS: true,
    preserveWhitespace: false,
    postcss: [
        require('autoprefixer')({
            browsers: [ 'last 5 version', '> 1%' ]
        })
    ]
};
