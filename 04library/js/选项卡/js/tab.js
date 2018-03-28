;(function(window,undefined){
	var _that=null;
	var _menus=null;
	var _mains=null;
	function Tab(options){
		options=options ||{};
		this.container=options.container || '.tab';
		this.tabMenuSelected=options.tabMenuSelected || "selected" ;
		this.tabMainSelected=options.tabMainSelected || "selected" ;
		_that=this;
		_toggleTab();
	}

	function _toggleTab(){
		//1.点击切换tab栏
		var box=document.querySelector('.tab');
		_menus=box.children[0].children;
		_mains=box.children[1].children;
		var i=0,len=_menus.length;
		for(;i<len;i++){
			_menus[i].index=i;
			_menus[i].onclick=_tabMenu;
		}
	}
	function _tabMenu(){
		//先清空所有selected
		var i=0,len=_menus.length;
		for(;i<len;i++){
			var menu=_menus[i];
			menu.className=menu.className.replace(_that.tabMenuSelected,"");

		}
		this.className+= " "+_that.tabMenuSelected;
		//点击菜单切换对应内容
		 i=0,len=_mains.length;
		for(;i<len;i++){
			var main=_mains[i];
			main.className=main.className.replace(_that.tabMainSelected,"");
		}
		_mains[this.index].className+=" "+_that.tabMainSelected;
	}
	window.Tab=Tab;
})(window,undefined)