var map=document.querySelector('.map');
var arr=[];
for(var i=0; i<20;i++){
	var r=Tool.getRandom(0,255);
	var g=Tool.getRandom(0,255);
	var b=Tool.getRandom(0,255);
	var box=new Box({
		backgroundColor:'rgb('+r+','+g+','+b+')'
	});
	box.render(map);
	arr.push(box);
}
setInterval(setPosition,500);
setPosition();
function setPosition(){
	arr.forEach(function(item){
		item.random();
	})
}