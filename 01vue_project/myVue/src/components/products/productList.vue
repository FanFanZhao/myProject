<template>
	<div class="templ" style="overflow:auto;">
	
		<nav-bar title="商品列表"></nav-bar>
		<!-- <mt-loadmore  :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" :auto-fill="isAutoLoad" ref="loadmore" :bottom-distance='distance'> -->
		<mt-loadmore :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" :auto-fill="isAutoLoad" ref="loadmore" :bottom-distance='distance'> 
			<ul class="mui-table-view mui-grid-view">
		        <li class="mui-table-view-cell mui-media mui-col-xs-6" v-for="(item,index) in products" :key='item.id'>
		            <router-link :to="{name:'product.detail',params:{id:item.id}}">
		                <img class="mui-media-object" :src="item.product_thumbnail">
		                <div class="mui-media-body">
		                	{{item.product_name}}
		                </div>
		                <div class="mui-media-body">
		                	<span class="price">￥{{item.price}}</span><span class="m_price">￥{{item.market_price}}</span> 
		                </div>
		            </router-link>
		        </li>  
		    </ul>
		</mt-loadmore>
	</div>
</template>
<script>
	export default {
		data(){
			return {
				distance:70,
				products:[],
				allLoaded:false,
				isAutoLoad:false,
				page:1,
				scrollMode:'auto',
			}
		},
		created(){
			this.$axios.get('products?category_id=52&page=1')
			.then(res=>{
				this.products=res.data.data;
			})
			.catch(err=>{
				console.log(err)
			})
		},
		methods:{
			
			loadBottom(){
				this.page+=1;
				console.log(this.page);
				this.$axios.get('products?category_id=52&page='+ this.page)
				.then(res=>{
					console.log(this.page);
					this.products=this.products.concat(res.data.data);
					if (res.data.data.length<10) {
						this.allLoaded=true;
						console.log('没有数据了')
					}
					this.$refs.loadmore.onBottomLoaded();
				})
				.catch(err=>{
					console.log(err);
				})
			}
		}
	}
</script>
<style scoped>
	.price{
		float: left;
		color: #e00;
	}
	.m_price{
		float: right;
		color: #9e9e9e;
		text-decoration: line-through;
	}
</style>