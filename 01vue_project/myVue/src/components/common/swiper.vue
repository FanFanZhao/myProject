<template>
	<div>
		<mt-swipe :auto="4000">
		  <mt-swipe-item v-for="(value,index) in lunbo" :key='index'>
		  	<a :href="value">
		  		<img :src="value" alt="">
		  	</a>
		  </mt-swipe-item>  
		</mt-swipe>
		
	</div>
</template>
<script>
	export default{
		data(){
			return {
				lunbo:[],
			}
		},
		props:['id','split_id'],
		created(){
			this.$axios.get('product/detail?id='+this.id+'&split_id='+this.split_id)
                .then( (response) => {
                    this.lunbo=response.data.data.img_array;
                })
	   	},
	}
	
</script>
<style scoped>
	.mint-swipe{
        height:300px;
    }
    .mint-swipe-item img{
    	display: block;
    	width: 100%;
    	height: 100%;
    	overflow: hidden;
    }
</style>