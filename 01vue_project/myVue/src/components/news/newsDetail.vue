<template>
	<div class="templ">
		<nav-bar title='新闻详情'></nav-bar>
		<div class="mui-card">
            
            <div class="mui-card-header mui-card-media" style="height:40vw;">
                <img :src="imgs[0]" alt="">
            </div>
            <div class="mui-card-content">
                <div class="mui-card-content-inner">
                    <p>快递名称：{{detail.express}}</p>
                    <p style="color: #333;">{{detail.create_time}}</p>
                </div>
            </div>
            <div class="mui-card-footer">
                <a class="mui-card-link">Like</a>
                <button class="mui-card-link" @click="goToComment">商品评论</button>
            </div>
            <div class="mui-card-header">{{detail.product}}----》详细信息</div>
            <div class="imgs">
                <div v-for="(item,index) in imgs" :key='index'>
                	<img class="preview-img" v-lazy="item" :key='index' height="100" @click="$preview.open(index, imgs)" alt="">
                </div>
            </div>
        </div>
	</div>
</template>
<script>
	export default {
		data(){
			return {
				detail:{},
				imgs:[]
			}
		},
		created(){
			let id=this.$route.query.id;
			this.$axios.get('product/detail?id='+id+'&split_id=0')
			.then(res=>{
				this.detail=res.data.data;
				this.imgs=this.detail.img_array;
				let arr=[];
				for(var i=0,len=this.imgs.length;i<len;i++){
					let item=new Object(this.imgs[i]);
					item.src=this.imgs[i];
					item.w=400;
					item.h=460;
					arr.push(item)

				}
				this.imgs=arr;
			})
			.catch(err=>{
				console.log(err);
			})
		},
		methods:{
			goToComment(){
				this.$router.push({name:'news.comment',params:{id:this.$route.query.id}})
			}
		}
	}
</script>
<style scoped>
	.mui-card-header .mui-card-link, .mui-card-footer button.mui-card-link{
        background-color: #03A9F4;
        color: #fff;
        line-height: 44px;
    }
    .mui-card-header img{
        width:100%;
        height: 100%;
    }
    .imgs img{
        width:100%;
        height: 100%;
    }
</style>