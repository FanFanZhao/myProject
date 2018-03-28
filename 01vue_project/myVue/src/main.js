import Vue from 'vue';
import VueRouter from 'vue-router';
import Axios from 'axios';
import VuePreview from 'vue-preview';

import './static/mui/dist/css/mui.css';
//mint-ui组件------------------开始
import './static/css/global.css';
import 'mint-ui/lib/style.css';
import  Header from 'mint-ui/lib/header';
import 	Swipe from 'mint-ui/lib/swipe';
import SwipeItem from 'mint-ui/lib/swipe-item';
import { Tabbar, TabItem } from 'mint-ui';
import { Indicator } from 'mint-ui';
import { Lazyload } from 'mint-ui';
import { Loadmore } from 'mint-ui';
import { Switch } from 'mint-ui';


Vue.component(Header.name, Header);
Vue.component(Swipe.name, Swipe);
Vue.component(SwipeItem.name, SwipeItem);
Vue.component(Tabbar.name, Tabbar);
Vue.component(TabItem.name, TabItem);
Vue.use(Lazyload);
Vue.component(Loadmore.name, Loadmore);
Vue.component(Switch.name, Switch);

//mint-ui组件------------------结束

//引入各个模块-------------开始
import App from './App.vue';
const Home=r=>require(['./components/home/home.vue'],r);
const NewsList=r=>require(['./components/news/newsList.vue'],r);
const NewsDetail=r=>require(['./components/news/newsDetail.vue'],r);
const Member=r=>require(['./components/member/member.vue'],r);
const ShopCart=r=>require(['./components/shopCart/shopCart.vue'],r);
const Search=r=>require(['./components/search/search.vue'],r);
const ShareList =r =>require(['./components/share/shareList.vue'],r);
const ShareDetail=r =>require(['./components/share/shareDetail.vue'],r);
const ProductList =r =>require(['./components/products/productList.vue'],r);
const ProductDetail =r =>require(['./components/products/productDetail.vue'],r);

//引入各个模块-------------结束

//引入全局组件---------------------------开始
import Swiper from './components/common/swiper.vue';
import NavBar from './components/common/navBar.vue';
import Comment from './components/common/comment.vue';
//引入全局组件---------------------------结束

//注册全局组件-------------开始
Vue.component('swiper',Swiper);
Vue.component('navBar',NavBar);
//注册全局组件-------------结束

//注册外部组件----------------------开始
import Moment from 'moment';
Vue.use(VueRouter);
Vue.use(VuePreview);
Vue.prototype.$axios=Axios;
Axios.defaults.baseURL="http://www.zhonghexinshang.com/api/";
// 使用加载显示提示
Axios.interceptors.request.use(function(config){
	Indicator.open('Loding.....');
	return config;
});
Axios.interceptors.response.use(function(data){
	Indicator.close();
	return data;
})
Vue.filter('convertDate',function(time){
	let res='';
	time.forEach(function(item){
		res+=item.time.toString().split('.')[0]+'-';
	});
	return Moment(res.slice(0,-1)).format('YYYY-MM-DD');
});
Vue.filter('imgsSplit',function(imgs){
	return imgs.split('|')[0];
})
//注册外部组件----------------------结束

//路由模块

let router=new VueRouter({
	routes:[
		{path:'/',redirect:{name:'home'}},
		{name:'home',path:'/home',component:Home},
		{name:'member',path:'/member',component:Member},
		{name:'shopCart',path:'/shopCart',component:ShopCart},
		{name:'search',path:'/search',component:Search},

		{name:'news.list',path:'/news/list',component:NewsList},
		{name:'news.detail',path:'/news/detail',component:NewsDetail},
		{name:'news.comment',path:'/news/comment',component:Comment},
		{name:'share.list',path:'/share/list',component:ShareList},
		{name:'share.detail',path:'/share/detail',component:ShareDetail},
		{name:'product.list',path:'/products/list',component:ProductList},
		{name:'product.detail',path:'/product/detail/:id',component:ProductDetail},


	]
});
new Vue({
	el:'#app',
	render:function(createElement){
		return createElement(App)
	},
	router
})