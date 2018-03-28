//工具函数----------------------Tool------------------
;(function((window,undefined){
	var Tool={
		getRandom:function(min,max){
			min=Math.ceil(min);
			max=Math.floor(max);
			return Math.floor(Math.random()*(max-min+1))+min;
		}
	}
})(window,undefined)
//---------------------------------Food--------------------------
;(function ((window,undefined){
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

//--------------------------------------Snake----------------------------
;(function((window,undefined){
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
})(window,undefined)
//--------------------------------Game---------------------------
;(function ((window,undefined){
	var that=null;
	function Game(map){
		this.food=new Food();
		this.snake=new Snake();
		this.map=map;
		that=this;
	}
	Game.prototype.start=function(){
		//把食物和蛇渲染到地图上
		this.food.render(this.map);
		this.snake.render(this.map);
		//测试移动
		// this.snake.move();
		// this.snake.render(this.map);
		// this.snake.move();
		// this.snake.render(this.map);
		// this.snake.move();
		// this.snake.render(this.map);
		runSnake();
		//通过键盘控制蛇移动方向
		bindKey();
	}
	function runSnake(){
		var timerId=setInterval(function(){
			this.snake.move(this.food,this.map);
			this.snake.render(this.map);
			var maxX=this.map.offsetWidth/this.snake.width;
			var maxY=this.map.offsetHeight/this.snake.height;
			console.log(this.snake.height);
			var headX=this.snake.body[0].x;
			var headY=this.snake.body[0].y;
			if (headX<0 || headX > maxX) {
				alert('Game Over');
				clearInterval(timerId);
			}
			if (headY <0 ||headY> maxY) {
				alert('Game Over');
				clearInterval(timerId);
			}
		}.bind(that),200)
	}
	function bindKey(){
		document.addEventListener('keydown',function(e){
			switch(e.keyCode){
				case 37:
					that.snake.direction='left';
					break;
				case 38:
					that.snake.direction='top';
					break;
				case 39:
					that.snake.direction='right';
					break;
				case 40:
					that.snake.direction='bottom';
					break;
			}
		})
	}
	window.Game=Game;
})(window,undefined)
//-------------------------main-------------------------
;(function ((window,undefined){
	var map=document.querySelector('.map');
	var game=new Game(map);
	game.start();
})((window,undefined);