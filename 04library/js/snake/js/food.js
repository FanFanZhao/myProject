(function (window,undefined){
	var elements=[];
	var _map=null;
	var _absolute='absolute';
	function Food(options){
		options = options || {}
		this.color=options.backgroundColor || 'green';
		this.width=options.width || 20;
		this.height=options.height || 20;
		this.x=options.x || 0;
		this.y=options.y || 0;
	}

	Food.prototype.render=function(map){
		// 先删除食物对象
		remove();
		_map=map;
		var div=document.createElement('div');
		elements.push(div);
		map.appendChild(div);
		this.x=Tool.getRandom(0,_map.offsetWidth/this.width-1)*this.width;
		this.y=Tool.getRandom(0,_map.offsetHeight/this.height-1)*this.height;
		div.style.backgroundColor =this.color;
		div.style.height=this.height + 'px';
		div.style.width=this.width + 'px';
		div.style.position=_absolute;
		div.style.top=this.y + 'px';
		div.style.left=this.x + 'px';
	}
	
	function remove(){
		for(var i=elements.length-1;i>=0;i--){
			elements[i].parentNode.removeChild(elements[i]);
			elements.splice(i,1);
		}
	}
	window.Food=Food;
})(window,undefined);


