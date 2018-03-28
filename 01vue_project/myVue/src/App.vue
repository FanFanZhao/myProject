<template>
	<div class="templ">
		<mt-header  title="vue首页"></mt-header>
		<transition name="router" mode="out-in">
			<router-view></router-view>
		</transition>
		<nav class="mui-bar mui-bar-tab">
			<router-link class="mui-tab-item mui-active" :to="{name:'home'}">
				<span class="mui-icon icon-shouye"></span>
				<span class="mui-tab-label">首页</span>
			</router-link>
			<router-link :to="{name:'member'}" class="mui-tab-item" >
				<span class="mui-icon icon-huiyuan">
					
				</span>
				<span class="mui-tab-label">会员</span>
			</router-link >
			<router-link :to="{name:'shopCart'}" class="mui-tab-item" >
				<span class="mui-icon icon-gouwuche">
					<span class="mui-badge">{{num}}</span>
				</span>
				<span class="mui-tab-label">购物车</span>
			</router-link >
			<router-link :to="{name:'search'}" class="mui-tab-item" >
				<span class="mui-icon icon-sousuo"></span>
				<span class="mui-tab-label">查找</span>
			</router-link >
		</nav>
	</div>
</template>
<script>
import connect from './components/common/connect.js';
import productsTool from './components/common/productsTool.js';
	export default{
		data(){
			return {
				selected:'1',
				num:productsTool.getTotalCount()
			}
		},
		created(){
			connect.$on('addShopCar',num=>{
				this.num+=num;
			})
		}
	}
</script>
<style scoped>
	.router-enter-active,.router-leave-active{
		transition: opacity 1s;
	}
	.router-enter,.router-leave{
		opacity: 0;
	}
</style>