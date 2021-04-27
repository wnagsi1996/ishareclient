<template>
	<div class="paysuccess">
		<van-icon name="success" size="100" color="#00a71c" />
		<p>Payment successful</p>
		<router-link to="/myorder" class="order">View order</router-link>
		<router-link to="/">Home</router-link>
	</div>
</template>

<script>
</script>

<style scoped>
	.paysuccess{text-align: center;margin-top: 50px;}
	.paysuccess p{font-size: 24px;padding: 10px 0 20px;}
	.paysuccess a{display: block;width: 50vw;height:40px;line-height: 40px;text-align: center;border-radius: 50px;margin:20px auto;border:1px solid #000}
	.paysuccess a.order{background-color: red;color: #fff;border:1px solid red}
</style>
