var productsTool={};
//读取本地存储
var localPros=JSON.parse(window.localStorage.getItem('pros') || '{}');

// 更新本地存储
productsTool.addAndUpdate=function(item){
	if (localPros[item.id]) {
		localPros[item.id]+=item.num;
	}else{
		localPros[item.id]=item.num;
	}
	localStorage.setItem('pros',JSON.stringify(localPros));
}
// 删除对应id数据
productsTool.deletePros=function(id){
	delete localPros[id];
	localStorage.setItem('pros',JSON.stringify(localPros));
}
//获取本地数据库
productsTool.getAllProsInfo=function(){
	return localPros;
}
//获取所有数量
productsTool.getTotalCount=function(){
	let num=0;
	for(var id in localPros){
		num+=localPros[id];
	}
	return num;
}
export default productsTool;