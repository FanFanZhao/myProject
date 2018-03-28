var _absolute='absolute';
var _map=null;
// var _div=null;
function Box(options){
	options=options || {};
	this.backgroundColor=options.backgroundColor || 'red';
	this.width= options.width || 20;
	this.height=options.height || 20;
	this.x=options.x || 0;
	this.y=options.y || 0;
	this._div=null;
}

Box.prototype.render=function(map){
	_map=map;
	var div=document.createElement('div');
	this._div=div;
	div.style.backgroundColor= this.backgroundColor;
	div.style.width=this.width + 'px';
	div.style.height=this.height +'px';
	div.style.position=_absolute;
	div.style.left=this.x+'px';
	div.style.top=this.y+'px';
	_map.appendChild(div);
}
Box.prototype.random=function(){
	if (!_map) {return;}
	this.x=Tool.getRandom(0,_map.offsetWidth-this.width);
	this.y=Tool.getRandom(0,_map.offsetHeight-this.height);
	this._div.style.left=this.x +'px';
	this._div.style.top=this.y +'px';
}