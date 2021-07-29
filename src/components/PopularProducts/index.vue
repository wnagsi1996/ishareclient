<template>
	<div class="deals-product" v-if="dealsList.length>0">
		<div class="deals-title">
			<h3>{{title}}</h3>
			<router-link v-if="dealsList[0].oriprice=='Free'" to='/freeproductlist'>More</router-link>
			<router-link v-else to='/dealslist'>More</router-link>
		</div>
		<div class="deals-item" v-if="isdata">
			<div class="deals-item4" v-for="(item,index) in dealsList" :key="item.rid">
				<router-link :to="item | urlCompile">
					<div class="dealsImg">
						<van-image lazy-load
							:style="{width:detailimg[index].isWidth ? detailimg[index].isWidth: '100%',height:detailimg[index].isHeight}"
							:index="index" fit="scale-down" :src="item.img" />
					</div>
					<span class="oriprice" v-if="item.oriprice=='Free'">{{item.oriprice}}</span>
					<span class="oriprice" v-else>${{item.oriprice}}</span>
					<span class="zkj">{{item.zkj}}</span>
				</router-link>
			</div>
		</div>
	</div>
</template>

<script>
	export default ({
		name: 'PopularProducts',
		props: {
			dealsList: {
				type: Array
			},
			title: {
				title: String
			}
		},
		data() {
			return {
				detailimg: [],
				isdata: false
			}
		},
		mounted() {
			// console.log(this.dealsList[0].oriprice)
			if (this.dealsList.length > 0) {
				this.isdata = true;
				for (let i = 0; i < this.dealsList.length; i++) {
					this.detailimg.push({
						'isWidth': '100%',
						'isHeight': 'auto'
					});
				}
			}
		},
		methods: {
			loadimg(evt) {
				let index = evt.path[0].attributes.index.value;
				let imgWidth = evt.path[0].clientWidth;
				let imgHeight = evt.path[0].clientHeight;
				if (imgWidth < imgHeight) {
					this.detailimg[index].isWidth = 'auto';
					this.detailimg[index].isHeight = '100%'
				}
			}
		},
		watch: {
			dealsList(newdata, olddata) {
				if (newdata) {
					this.dealsList = newdata;
					this.isdata = true;
					if (this.dealsList.length > 0) {
						for (let i = 0; i < this.dealsList.length; i++) {
							this.detailimg.push({
								'isWidth': '100%',
								'isHeight': 'auto'
							});
						}
					}
				}
			}
		},
		filters: {
			urlCompile: (item) => {
				if (item.platformname == undefined) {
					return item.url
				} else {
					let newurl = item.title.replace(/ /g, '-').replace(/'/g, '').replace(new RegExp('/', 'gm'),
						'-').replace(/:/g, '-').replace(/,/g, '-')
					return '/deals?rid=' + item.rid
				}
			}
		}
	})
</script>

<style scoped>
	.deals-product {
		margin: 20px 5px 0
	}

	.deals-title {
		display: flex;
	}

	.deals-title h3 {
		flex: 1;
		font-size: 16px
	}

	.deals-title a {
		width: 100px;
		color: #888;
		font-size: 14px;
		text-align: right;
	}

	.deals-item {
		width: calc(100% - 10px);
		display: flex;
		flex-wrap: wrap;
		background-color: #fff;
		border-radius: 5px;
		padding: 5px;
		margin-top: 10px;
	}

	.deals-item4 {
		width: 25%;
		height: 150px;
		border: 1px solid #f7f7f7;
		box-sizing: border-box;
	}

	.deals-item4>a {
		display: flex;
		flex-direction: column;
		color: #000;
	}

	.dealsImg {
		width: 80px;
		height: 80px;
		margin: 5px auto;
	}

	.deals-item4>a img {
		display: block;
		margin: 0 auto;
	}

	.deals-item4>a span {
		font-size: 12px;
		line-height: 20px;
		display: block;
		padding: 0 8px;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	.oriprice {
		color: #e41c1d
	}

	.zkj {
		color: #888
	}
</style>
