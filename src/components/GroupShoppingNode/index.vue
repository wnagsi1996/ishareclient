<template>
	<div class="group-buy">
		<div class="title">Latest Group Shopping:</div>
		<div class="item">
			<div class="img-box">
				<span>
					<img :src="infoData.userheadimg" alt="">
				</span>
				<span></span>
			</div>
			<div class="node">
				<div class="name">Needs <em>1</em> more user</div>
				<div class="time">
					<span>Deal ends in</span>
					<van-count-down class="count" millisecond :time="infoData.djsms*1000" format="HH:mm:ss" />
				</div>
			</div>
			<div class="btn">
				<van-button size="mini" type="danger" @click="_handJoin">Join Now</van-button>
			</div>
		</div>
	</div>
</template>

<script>
	import {Button,CountDown} from 'vant'
	export default({
		name:'GroupShoppingNode',
		components:{
			[Button.name]:Button,
			[CountDown.name]:CountDown
		},
		props:{
			infoData:{
				type:Object,
				default:new Object()
			}
		},
		methods:{
			_handJoin(){
				this.$emit('jonNow');
			}
		}
	})
</script>

<style scoped>
	.group-buy{
		background-color: #fff;
		box-shadow: 0 0 3px #ccc;
		border-radius:8px;
		padding: 10px;
	}
	.item{
		display: flex;
		margin:10px 0;
		padding:10px 0;
	}
	.img-box{
		width: 60px;
	}
	.img-box span{
		width: 35px;
		height: 35px;
		border-radius: 20px;
		background: #ccc url(../../assets/images/user_add.png) no-repeat center center/20px;
		display: inline-block;
		border: 2px solid #fff;
		box-sizing: border-box;
		vertical-align: middle;
	}
	.img-box span img{
		width: 100%;
	}
	.img-box span:last-child{
		margin-left: -10px;
	}
	.node{
		flex: 1;
		padding:0 5px 0 10px;
	}
	.node .time{
		display: flex;
		align-items: center;
	}
	.node .time span,
	.node .time .count{
		color: #e41c1d;
		padding: 0 4px 0 0;
	}
	.node .name em{
		font-style: normal;
		color: #e41c1d;
	}
	.btn{
		text-align: center;
		width: 80px;
	}
</style>
