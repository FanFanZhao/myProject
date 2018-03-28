(function(){
	function Snake(options){
		options =options || {};
		this.width=options.width || 20;
		this.height =options.height || 20;
		this.direction=options.direction || 'right';
		this.body=[
			{x: 3,y: 2 ,color:'red'},
			{x: 2,y: 2 ,color:'blue'},
			{x: 1,y: 2 ,color:'blue'}
		]
	}
	var _absolute ='absolute';
	var elements=[];
	Snake.prototype.render=function(map){
		var that=this;
		remove();
		this.body.forEach(function(item){
			var div=document.createElement('div');
			map.appendChild(div);
			elements.push(div);
			div.style.width=this.width + 'px';
			div.style.height =this.height + 'px';
			div.style.position =_absolute;
			div.style.backgroundColor =item.color;
			div.style.left =item.x * this.width + 'px';
			div.style.top=item.y * this.height + 'px';
		}.bind(that))	
	}
	Snake.prototype.move=function(food,map){
		var body=this.body;
		for(var i=body.length-1;i>0;i--){
			body[i].x=body[i-1].x;
			body[i].y=body[i-1].y;
		}
		var head=this.body[0];
		switch(this.direction){
			case 'right':
				head.x+=1;
				break;
			case 'left':
				head.x-=1;
				break;
			case 'top':
				head.y-=1;
				break;
			case 'bottom':
				head.y+=1;
				break;
		}
		//蛇的坐标
		var headX=head.x * this.width;
		var headY=head.y * this.height;
		if(headX===food.x && headY===food.y){
			var last=this.body[this.body.length-1];
			this.body.push({x:last.x,y:last.y,color:last.color});
			food.render(map);
		}
	}

	// 删除之前渲染的div
	function remove(){
		for(var i=elements.length-1;i>=0;i--){
			elements[i].parentNode.removeChild(elements[i]);
			elements.splice(i,1);
		}
	}
	window.Snake=Snake;
})();
