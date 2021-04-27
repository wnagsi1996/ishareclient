const path = require("path");
const resolve = function(dir) {
  return path.join(__dirname, dir);
};

const webpack=require('webpack')
module.exports={
	publicPath: process.env.NODE_ENV === 'production' ? '/isharechield/' : '/',
	// publicPath:'/isharechield/',
	productionSourceMap: false,
	devServer:{
		host: "192.168.123.121",
		port: "8090",
		proxy:{
			'/Handler':{   //访问路径，可以自己设置，
				target:'http://192.168.123.121',  //代理接口，即后端运行所在的端口
				changeOrigin:true,  //设置是否跨域
				pathRewrite:{
					'^/Handler':''  //访问路径重写
				}
			}
		},
		// https:true
	},
	 css: {
	    loaderOptions: {
	      postcss: {
	        plugins: [
	          require('postcss-pxtorem')({ // 把px单位换算成rem单位
	            rootValue: 37.5, // 换算的基数(设计图750的根字体为32)
	            selectorBlackList: ['weui', 'mu'], // 忽略转换正则匹配项
	            propList: ['*']
	          })
	        ]
	      }
	    }
	  }
	  // chainWebpack: config => {
	  //     config
	  //       .plugin('html')
	  //       .tap(args => {
	  //         args[0].title= '你想设置的title名字'
	  //         return args
	  //       })
	  //   }
}
