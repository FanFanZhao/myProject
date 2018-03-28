<template>
	<div class="templ">
		<nav-bar title='图文分享'></nav-bar>
		<ul class="tab">
			<li class="item" v-for="tab in tabs " v-text="tab.name" @click='changeTab(tab.id,page)' :class='{active:tab.id==activeItem}' :key='tab.id'></li>
		</ul>
		<div class="photo-list">
            <ul>
                <li v-for="item in contents" :key="item.id" class="item">
                    <router-link :to="{name:'share.detail',params:{id:item.id,split_id:item.brand_id}}" class="box">
                        <img v-lazy="item.product_thumbnail" alt="">
                        <span v-html="item.product_name"></span>
                        <span v-text="item.create_time"></span>
                    </router-link>
                </li>
            </ul>
        </div>
        <div class="t-r"><input type="button" class="btn" value="加载更多" @click="getMore"></div>
	</div>
</template>
<script>
	export default{
		data(){
			return {
				tabs:[],
				page:1,
				contents:[],
				activeItem:0
			}
		},
		 created(){
            // 获取分类
            this.$axios.get('index')
                .then(res=>{
                    this.tabs=res.data.message.top_class;
                    this.tabs.unshift({id:0,name:'全部'});
                    console.log(this.tabs);
                })
                .catch(err=>{
                    console.log(err);
                });
            //点击分类获取数据
            this.changeTab(0,this.page);
        },
		methods:{
			changeTab(id,page){
				if (id!=this.activeItem) {
					this.page=1;
					this.contents=[];
				}
				this.activeItem=id;
				let url='products?';
				url=(id==0)?url+'page='+page:url+'category_id='+id+'&page='+page;
				this.$axios.get(url)
				.then(res=>{
					this.contents=this.contents.concat(res.data.data);
				})
				.catch(err=>{
					console.log(err)
				})
			},
			getMore(){
				this.changeTab(this.activeItem,++this.page);
			}
		}
	}
</script>
<style scoped>
    .tab{
        width: 100%;
        overflow-x: auto;
        margin: 10px 10px;
        white-space:nowrap;
    }
    .item{
        width:25%;
        display: inline-block;
        text-align: center;
        color: #03A9F4;
        padding: 10px 0;
    }

    .photo-list .item{
        width: 50%;
    }
    .photo-list .box{
        display: inline-block;
        width: 90%;
        height:100%;
        margin: 5px auto;
    }

    .photo-list .box img{
        display:block;
        width: 100%;
        height: 100%;
        /*max-height: 200px;*/
    }
    .active{
        color: #ee1330;
        border-bottom: 1px solid #e00;
    }



    .t-r{
        text-align: right;
        margin-bottom: 10px;
    }
    .t-r input[type=button]{
        background-color: #03A9F4;
        border-radius: 3px;

    }
    input.btn{
        width:100px;
        height: 40px;
        border:none;
        color: #fff;
        margin-right:10px;
    }
</style>