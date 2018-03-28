<template>
	<div class="templ">
        <nav-bar title="购物车"></nav-bar>
       <div class="pay-detail">
           <ul>
               <li v-for="(item,index) in shopCartInfo" :key="item.id">
                   <mt-switch class="fl" v-model="item.isPicked"></mt-switch>
                   <img :src="item.product_thumbnail">
                   <div class="pay-calc">
                       <p>{{item.product_name}}</p>
                       <div class="calc">
                           <span>￥{{item.price}}</span>
                           <span  class="box">
                               <span class="down" @click="down(index)">-</span>
                               <span class="num">{{item.num}}</span>
                               <span class="add" @click="add(index)">+</span>
                           </span>
                           <a href="javascript:;" class="fr" @click="del(index)">删除</a>
                       </div>
                   </div>
               </li>
           </ul>


            <div class="total">
                <span>已选择商品 {{payment.num}} 件，总共￥{{payment.total}}元</span>
                <a href="javascript:;" class="settlement">去结算</a>
            </div>

       </div>
   </div>
</template>
<script>
   	import  productsTool from '../common/productsTool.js';
    import  connect from '../common/connect.js';
	export default{
		data(){
			return {
				shopCartInfo:[],
                allChecked:true,
			}
		},
		created(){
			let pros=productsTool.getAllProsInfo();
			if (Object.keys(pros).length==0) {return}
			this.$axios.get('products?category_id=52$page=1')
			.then(res=>{
				let allData=res.data.data;
				console.log(allData);

				let keys=Object.keys(pros);
				allData.forEach((ele)=>{
					if (keys.indexOf(ele.id.toString())>=0){
						this.shopCartInfo.push(ele);
					}
				})
				this.shopCartInfo.forEach((ele,index)=>{
					if (pros[ele.id]) {
						this.$set(ele,'num',pros[ele.id]);
						this.$set(ele,'isPicked',true);
					}
				})
			})
		},
		methods:{
			down(i){
				let item=this.shopCartInfo[i];
				if (item.num<=1) {return}
				connect.$emit('addShopCar',-1);
				productsTool.addAndUpdate({id:item.id,num:-1});
			},
			add(i){
				let item=this.shopCartInfo[i];
				item.num++;
				connect.$emit('addShopCar',1);
				productsTool.addAndUpdate({id:item.id,num:1});
			},
			del(i){
				let item=this.shopCartInfo[i];
				productsTool.deletePros(item.id);
				connect.$emit('addShopCar',-item.num);
				this.shopCartInfo.splice(i,1);
			}
		},
		computed:{
			payment(){
				let sum=0;
				let num=0;
				this.shopCartInfo.forEach((ele)=>{
					if (ele.isPicked) {
						num+=ele.num;
						sum+=ele.num * ele.price;
					}
				})
				return {
					num,
					total:sum
				}
			}
		}
	}
</script>
<style scoped>
   .pay-detail ul li{
       border-bottom: 1px solid rgba(0,0,0,.2);
       margin-bottom: 3px;
       padding: 10px 5px;
   }
    .pay-detail ul{
        padding-left: 5px;
        margin-top: 5px;
    }
    .fl{
        float: left;
        margin-right: 10px;
    }
    img{
        max-height: 100px;
    }
   .box{
       border: 1px solid #cac8c8;
       display: inline-block;
       margin-left: 8px;
       margin-top: 10px;
       position: relative;
       line-height: 30px;
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
    .fr{
        float: right;
        margin-right: 10px;
    }
    .settlement{
        display: inline-block;
        padding: 0 10px;
        background-color: #e30;
        color:#fff;
        float: right;
    }
    .switch{
        line-height: 32px;
    }
    .total{
        margin-top: 10px;
        line-height: 40px;
    }
</style>
