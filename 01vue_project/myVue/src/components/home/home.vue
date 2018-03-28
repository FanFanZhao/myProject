<template>
	<div>
		<swiper id="4048" split_id="0"></swiper>
		<ul class="mui-table-view mui-grid-view mui-grid-9">
	        <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
	        	<router-link :to="{name:'news.list'}">
	                <span class="icon icon_new"></span>
	                <div class="mui-media-body">新闻资讯</div>
	            </router-link>
	        </li>
	        <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
	        	<router-link :to="{name:'share.list'}">
	                <span class="icon icon_share">
	                	
	            	</span>
	                <div class="mui-media-body">图文分享</div>
	            </router-link>
	        </li>
	        <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
	        	<router-link :to="{name:'product.list'}">
	                <span class="icon icon_pro"></span>
	                <div class="mui-media-body">商品展示</div>
	            </router-link>
	        </li>  
	    </ul>
	</div>
</template>
<script>
	export default{
		data(){
			return {

			}
		}
	}
</script>
<style scoped>
  	.mui-grid-view.mui-grid-9{
        margin-top:0;
        border:none;
        background-color: #fff;
    }
	.icon{
		display: block;
		width: 50px;
		height: 50px;
		margin: 0 auto;
	}
	.icon_new{
        background: url("../../static/images/icon_15.png");
        background-repeat:round;
    }
    .icon_share{
        background: url("../../static/images/icon_03.png");
        -webkit-background-size: cover;
        background-size: cover;
    }
    .icon_pro{
        background: url("../../static/images/icon_05.png");
        -webkit-background-size: cover;
        background-size: cover;
    }
</style>