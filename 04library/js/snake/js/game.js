(function (){
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
})();