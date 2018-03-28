<template>
	<div class="templ">
		<ul class="mui-table-view mui-grid-view">
			<li class="mui-table-view-cell mui-media ">
				<!--<img class="mui-media-object" :src="imgDetail.product_thumbnail">-->
				<mt-swipe >
					<mt-swipe-item v-for='(value,index) in lunbo' :key="index">
						<a :href="value"><img :src="value" alt=""></a>
					</mt-swipe-item>
				</mt-swipe>
				<div class="mui-media-body">
					<span class="price">￥{{imgDetail.price}}</span>
					<span class="m_price">￥{{imgDetail.market_price}}
					</span>
				</div>
				<div class="mui-media-body">
					{{imgDetail.product_name}}
				</div>
				<div class="d_explain">
					选择 <span class="guige" >商品规格</span><span class="fr">></span>
				</div>
				<div class="num_box">数量<span class="box">
					<span class="down" @click='down'>-</span>
					<span class="num">{{num}}</span>
					<span class="add" @click='add'>+</span>
				<transition name="bool" @after-enter="afterEnter">
					<span class="circle" v-if="isActive"></span>
				</transition>
				</span>
				</div>
				<div class="d_explain">运费 <div class="guige">顺丰快递 ￥ 6.00</div></div>

				<div>
					<a href="javascript:;" class="addShopCar" @click='addShopCar'>加入购物车</a>
				</div>


			</li>
		</ul>
		<div @click="goToComment" class="comment">商品详情</div>
	</div>
</template>
<script>
import productsTool from '../common/productsTool.js';
import connect from '../common/connect.js';
	export default{
		data(){
			return {
				imgDetail:{},
				lunbo:[],
				num:1,
				isActive:false
			}
		},
		created(){
			this.$axios.get('http://www.zhonghexinshang.com/api/product/detail?id='+this.$route.params.id+'&split_id=0')
				.then(res=>{
				    this.imgDetail=res.data.data;
				    this.lunbo=this.imgDetail.img_array;
				})
		},
		methods:{
			down(){
				if (this.num<=1) {return;}
				this.num-=1;
			},
			add(){
				if (this.num>=200) {return;}
				this.num+=1;
			},
			addShopCar(){
				connect.$emit('addShopCar',this.num);
				// 添加到本地
				this.isActive=true;
				productsTool.addAndUpdate({id:this.$route.params.id,num:this.num});
			},
			goToComment(){

			},
			afterEnter(){
				this.isActive=false;
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
	.fr{
		float: right;
		color:#8f8f94;
	}
	.d_explain{
		text-align: left;
		margin-top: 20px;
		font-size:15px;
	}
	.guige{
		color: #8f8f94;
		font-size: 12px;

	}
	.mui-table-view.mui-grid-view .mui-table-view-cell .mui-media-body{
		text-align:left;
	}
	.mui-table-view.mui-grid-view .mui-table-view-cell{
		margin-left: 0;
		margin-right: 0;
	}
	.mint-swipe{
		height:360px;
	}
	.mint-swipe-item img{
		display: block;
		width:100%;
		height:100%;
		overflow:hidden;
	}
	.mui-table-view.mui-grid-view{
		padding-right: 0;
	}
	.num_box{
		text-align: left;
		line-height: 30px;
		font-size: 14px;

	}
	.box{
		border: 1px solid #cac8c8;
		display: inline-block;
		margin-left: 8px;
		margin-top: 10px;
		position: relative;
	}
	.down,
	.num,
	.add{
		width: 30px;
		height: 30px;
		display: inline-block;
		text-align: center;
	}
	.down{
		
		border-right: 1px solid #cac8c8;
	}
	.add{
		
		border-left: 1px solid #cac8c8;		
	}
	.num{
		color: #e30;
	}
	.addShopCar{
		display: inline-block;
		width: 30%;
		height: 40px;
		line-height: 40px;
		text-align: center;
		background-color: orange;
		color: #fff;
		margin-top: 10px;
		margin-right: 10px;
		float: right;
	}
	.circle{
		width: 16px;
		height: 16px;
		position: absolute;
		background-color: #e30;
		border-radius: 50%;
		top:0;
		right: 50%;
		transform: translate3d(50%,-100%,0);
	}
	.bool-enter-active{
		animation: boll_move .5s;
	}
	@keyframes boll_move{
		0%{
			transform: translate3d(0,-0,0);
		}
		25%{
			transform: translate3d(50px,-50px,0);
		}
		50%{
			transform: translate3d(80px,20px,0);
		}
		75%{
			transform: translate3d(100px,90px,0);
		}
		100%{
			transform: translate3d(155px,170px,0);
		}
	}
	.comment{
		height: 40px;
		line-height: 40px;
		background-color: #03A9F4;
		color: #fff;
		text-align:center;
	}
</style>