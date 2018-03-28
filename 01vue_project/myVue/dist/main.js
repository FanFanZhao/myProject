module.exports={
	entry:{
		main:'./src/main.js',

	},
	output:{
		path:path.join(__dirname,'dist'),
		filename:'js/[name][chunkhash:6].js'
	}
}