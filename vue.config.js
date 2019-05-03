module.exports = {
	devServer: {
		host: "0.0.0.0",
		proxy: {
			'/api': {
                target: "http://localhost:5000/api/",
                ws:true,
                changOrigin:true,
                pathRewrite:{
                    '^/api':''
                }
            }
		}
	},
}