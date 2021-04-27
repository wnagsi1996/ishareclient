<template>
  <div id="app">
	  <keep-alive :include="keepAliveName">
		  <router-view />
	  </keep-alive>
  </div>
</template>
<script>
	import {mapGetters} from 'vuex'
	export default({
		name:'App',
		computed:{
			...mapGetters([
				'keepAliveName'
			])
		}
	})
</script>
<style>
html{
	overflow-y: scroll;
}
body{
	margin: 0;
	padding: 0;
	width: 100vw;
	overflow: hidden;
	font-size: 14px;
}
*{
	font-size:14px
}
:root {
  overflow-y: auto;
  overflow-x: hidden;
}

:root body {
  position: absolute;
}

h1,h2,h3,h4,h5,h6{
	margin:0;
	padding: 0;
	font-weight: normal;
}
a{text-decoration: none;}
ul,li,p{margin: 0;padding: 0;list-style-type: none;}

.help-info{width: 96vw;margin: 10px auto;line-height: 24px;font-size:16px;}
.help-info h4{font-size: 16px;margin: 20px 0 5px;font-weight: bold;}
.help-info img{width: 100%;}

</style>
