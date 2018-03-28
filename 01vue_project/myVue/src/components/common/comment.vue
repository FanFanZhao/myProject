<template>
	<div>
		<nav-bar :title='title'></nav-bar>
		<div>{{id}}</div>
	</div>
</template>
<script>
	export default{
		data(){
			return {
				title:'',
				id:this.$route.params.id,
			}
		},
		beforeRouteEnter (to, from, next) {
			let myTitle='';
		    if (from.name=='news.detail') {
		    	myTitle='新闻评论页';
		    }else if(from.name=='goods.detail'){
		    	myTitle='商品评论页面'
		    }
		  	next(vm => {
		  		vm.title=myTitle;
		  	})
		}

	}
</script>
<style scoped>
	
</style>