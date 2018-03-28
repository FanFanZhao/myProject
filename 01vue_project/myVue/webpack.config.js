const webpack=require('webpack');
const HtmlWebpackPlugin=require('html-webpack-plugin');
const path=require('path');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const postcss = require('postcss');
module.exports={
    entry:{
        main:'./src/main.js',
        vendors:['vue','vue-router','moment','axios','vue-preview']
    },
    output:{
       
        path:path.join(__dirname,'dist'),
        publicPath:'/',
       
        filename:'js/[name].[chunkhash:6].js'
    },
    devServer:{
        contentBase:'./src',
        historyApiFallback:true,
        inline:true,
        port:'9988'
    },
    module:{
        loaders:[
            {
                test:/\.css$/,
                 use: ExtractTextPlugin.extract({
                  fallback: "style-loader",
                  use: "css-loader!postcss-loader"
                })
            },
            {
                test: /\.less$/,
                loader: 'style-loader!css-loader!postcss-loader!less-loader'
            },
            {
                test:/\.(jpg|svg|png|woff|woff2|eot|ttf|jpeg|gif)$/,
                loader:'url-loader',
                options:{
                    limit:4096,
                    name:'assets/[name].[ext]'
                }
            },
            {
                test:/\.js$/,
                loader:'babel-loader',
              
                exclude:/node_modules/
            },

            {
                test:/vue-preview.src.*?js$/,
                loader:'babel-loader',               
            },
            {
                test:/\.vue$/,
                loader:'vue-loader',
            }
        ]
    },
    
    plugins:[
        // new webpack.LoaderOptionsPlugin({  
        //     options: {  
        //         postcss: function(){  
        //             return [  
        //                 require("autoprefixer")({  
        //                     browsers: ['ie>=8','>1% in CN']  
        //                 })  
        //             ]  
        //         }  
        //     }  
        // }) ,
        // 'autoprefixer': {browsers: 'last 5 version'} , 
        new UglifyJsPlugin(),
        
        new webpack.optimize.CommonsChunkPlugin({
          
            names:['vendors','manifest']
        }),

        new webpack.BannerPlugin('fanfan所有!'),
       
        new ExtractTextPlugin("css/style.[contenthash:6].css"),

        new HtmlWebpackPlugin({
            template: "./src/index.html"
        }),
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: '"production"'
            }
        })

    ]
}