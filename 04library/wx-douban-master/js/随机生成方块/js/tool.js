(function ((window,undefined){
	var Tool={
		getRandom:function(min,max){
			min=Math.ceil(min);
			max=Math.floor(max);
			return Math.floor(Math.random()*(max-min+1))+min;
		}
	}
	window.Tool=Tool;
})((window,undefined);