<template>
	<div class="templ">
		<nav-bar title='新闻列表'></nav-bar>
		<ul class="mui-table-view mui-table-view-chevron">
			<li class="mui-table-view-cell mui-media" v-for="item in newList" :key="item.id">
				<router-link class="mui-navigate-right" :to="{name:'news.detail',query:{id:item.id}}">
					<img class="mui-media-object mui-pull-left" v-lazy="item.product_thumbnail">
					<div class="mui-media-body">
						<p v-text="item.product_name" class="title"></p>
						<div class="news-desc">
							<p>价格：{{item.price}}</p>
							<p>售出时间：{{time | convertDate }} </p>
						</div>
					</div>
				</router-link>
			</li>
			
		</ul>
	</div>
</template>
<script>
	export default{
		data(){
			return {
				newList:[],
				time:this.getDate()
			}
		},
		created(){
			this.$axios.get('index')
			.then(res=>{
				this.newList=res.data.message.new_product;
			})
			.catch(err=>{
				console.log(err);
			})
		},
		methods:{
			getDate:function(){
                let y=Math.random()*18+2000;
                let m=Math.random()*12+1;
                let h=Math.random()*30+1;
				return  [{time:y,len:4},{time:m,len:2},{time:h,len:2}];
			},
			 pad:function pad(num, n) {
				var i = (num + "").length;
				while(i++ < n) num = "0" + num;
				return num;
			}
		}
	}
</script>
<style scoped>
	.mui-media-body p{
		color: #0bb0f5;
	}
	.news-desc p:nth-child(1){
		float: left;
	}
	.news-desc p:nth-child(2){
		float: right;
	}
	.mui-media-body .title{
		word-wrap: break-word;
		word-break:break-all;
		color: #666;
		line-height: 40px;
		text-overflow: ellipsis;
		overflow: hidden;
		white-space: nowrap;
	}
	.mui-table-view .mui-media-object{
		margin-top: 10px;
	}
	.mui-table-view-chevron .mui-table-view-cell > a:not(.mui-btn){
		margin-right: -75px;
	}
</style>