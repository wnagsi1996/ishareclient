//去除console.log()打印
const prodPlugind=[];
if(process.env.NODE_ENV==='production'){  //生产环境
	prodPlugind.push('transform-remove-console')
}


module.exports = {
  presets: [
    '@vue/cli-plugin-babel/preset'
  ],
  plugins: [
      ['import', {
        libraryName: 'vant',
        libraryDirectory: 'es',
        style: true
      }, 'vant'],
	  //生产环境得插件数组
	  ...prodPlugind
    ]
}
