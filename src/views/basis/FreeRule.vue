<template>
	<div class="freerule">
		<Header title="Group Shopping Rules" shareshow />
		<div class="freerule-cen">
			<h3 class="text-center">Group Shopping Process</h3>
			<img src="@/assets/images/pinggou-rule.png" />
			<div class="freerule-detail">
				<h4 class="text-center">How to open a Group Shopping?</h4>
				<p><span>1</span>Clink the "Group Shopping" button in the Product Detail Page;</p>
				<p><span>2</span>Place your order and finish the payment;</p>
				<p><span>3</span>Invite friends to join your Group Shopping;</p>
				<p><span>4</span>Within the validity of a Group Shopping, if you invite enough buyers paying for the item, it will
					become a successful Group Shopping and full shipment will be delivered. Otherwise, it will be a failure Group
					Shopping, and full refund will be given to your payment account.</p>
			</div>
			<div class="freerule-detail">
				<h4 class="text-center">How to join in a Group Shopping?</h4>
				<p><span>1</span>Clink the "Join" button;</p>
				<p><span>2</span>Place your order and finish the payment;</p>
				<p><span>3</span>Invite friends to join your Group Shopping;</p>
				<p><span>4</span>Within the validity of a Group Shopping, if you invite enough buyers paying for the item, it will
					become a successful Group Shopping and full shipment will be delivered. Otherwise, it will be a failure Group
					Shopping, and full refund will be given to your payment account.</p>
			</div>
			<div class="freerule-detail freerule-detail2">
				<h4 class="text-center">Rule</h4>
				<p><span>1</span>What’s Group Shopping?</p>
				<p>Group Shopping is a kind of group buying and you can enjoy buying products at significantly reduced prices on
					the condition that a specified number of buyers would make the purchase.</p>
				<p><span>2</span>What’s the condition for new buyers to enjoy their exclusive?</p>
				<p>Users who have no orders after registration must activate the account before enjoying the newcomer exclusive.</p>
				<p><span>3</span>Does Coupon can be used for Group Shopping orders?</p>
				<p>No, coupon and social saving price cannot be enjoyed at the same time.</p>
				<p><span>4</span>How long does a Group Shopping last?</p>
				<p>Each saving group lasts 24 hours. If the validity of an item's Group Shopping activity is less than 24 hours,
					the valid time should be subjected to the validity of item activity.</p>
				<p><span>5</span>Can I cancel a Group Shopping order?</p>
				<p>No, there is no manual way to cancel a Group Shopping order. But don't worry, if there are not enough buyers
					within a group, the order will be voided and refunded.</p>
				<p><span>6</span>How can I make sure a Group Shopping deal is successful? </p>
				<p>If necessary number of people has been invited and the payment has been finished in the set time, the group will
					succeed.</p>
				<p><span>7</span>What are the reasons for a failure Group Shopping?</p>
				<p>A. If the number of saving group members does not reach its goal in the validity of 24 hours, the group will
					fail.<br />B. If the item has been sold out before group members assemble successfully in the validity of 24
					hours, the group will fail.<br />C. If a participant of a saving group doesn’t finish his or her payment in 30
					minutes, the system will automatically cancel the order and other group participants can continue to join in.</p>
				<p><span>8</span>How to refund?</p>
				<p>If a Social Saving group fails, the system will process the refund within 1-10 working days after the expiration
					of the group, and the refund will return to your original payment account.</p>
				<p><span>9</span>Can I return or exchange a Social Savings product?</p>
				<p>Yes, you can contact customer service to help you return, reissue or refund.</p>
			</div>
		</div>
	</div>
</template>

<script>
	export default({
		name:'FreeRule'
	})
</script>

<style scoped>
	.freerule-cen{margin:10px;}
	.freerule-cen>h3{color:#fff;margin:15px 0;}
	.freerule-cen>img{width:100%;margin-bottom:20px;}
	.freerule-detail{margin-bottom:30px;border-radius:8px;background:#fff;padding:10px;}
	.freerule-detail span{padding:2px 8px;border-radius:50%;background:#f39a0f;color:#fff;display:inline-block;margin:5px 8px 5px 0}
	.freerule-detail2 p:nth-child(odd){margin-bottom:15px;color:#555}
</style>
