

/*
this.elements

getId=function(id){
.getName = function (name)
.getTagName=function(tag){
.getClass=function(className,idName){   父元素idName下指定classname
.getElement=function(num){
.css=function(attr,value){
.addClass=function(className)
.html = function (str) {
.show=function(){
.hide=function(){
*/


	var $ = function (args) {
		return new Base(args);
	};
	
	
function Base(args){
	this.elements = [];
	
	//a lert(_this.tagName)
	if(typeof args =='string'){
		args=trim(args);
		
		if(args.indexOf(' '!=-1)){
			var elements=args.split(' ');//把字节拆开分别保存到数组中去
			var childElements=[];//临时数组
			var nodes=[];//用来存放父节点  因为childElements 循环之后会被清理掉
			
			
			for(var i=0;i<elements.length;i++){
				if(nodes.length==0){
					nodes.push(document)//如果默认没有父节点  就把document放入
				}
				switch(elements[i].charAt(0)){
					case '#':
						//alert(this instanceof Base)
						childElements=[];
					childElements.push(this.getId(elements[i].substr(1)));
					nodes=childElements;
			
						break;
					
					case '.':
						childElements=[];
						for(var j=0;j<nodes.length;j++){
							var temps=this.getClass(elements[i].substr(1),nodes[j]);
							for(var k=0;k<temps.length;k++){
								childElements.push(temps[k])
							}
						}
						nodes=childElements;
							
						break;
					
					default:
					childElements=[];
					for(var j=0;j<nodes.length;j++){
						var temps=this.getTagName(elements[i],nodes[j]);
						for(var k=0;k<temps.length;k++){
							childElements.push(temps[k])
						}
					}
					nodes=childElements;
						
						break;
				}
			}
			this.elements=childElements;
		}else{
				switch(args.charAt(0)){
					case '#':
						//alert(this instanceof Base)
					this.elements.push(this.getId(args.substr(1)));
					//alert(this.elements)
						break;
					
					case '.':
					//alert(this.getClass(args.substr(1)));
					 	this.elements=this.getClass(args.substr(1));
						//alert(this.elements.length)
						break;
					
					default:
						this.elements=this.getTagName(args);
						break;
				}
		
			
		}

		
	}else if(typeof args=='object'){
		if (args != undefined) { //这里需要判断undefined 的对象
		this.elements[0] = args;
	}
	}else if(typeof args=='function'){
		this.ready(args);
	}
	
	
	
	
	
}
//addDomLoaded
Base.prototype.ready=function(fn){
	addDomLoaded(fn);
}



Base.prototype.getId=function(id){
	return 	document.getElementById(id);
		
	};
	
	//获取name 节点数组
	Base.prototype.getName = function (name) {
		var names = document.getElementsByName(name);
		for (var i = 0; i < names.length; i ++) {
			this.elements.push(names[i]);
		}
		return this;
	};

//

	//获取元素节点数组
Base.prototype.getTagName = function (tag, parentNode) {
	var node = null;
	var temps = [];
	if (parentNode != undefined) {
		node=parentNode;
	} else {
		node=document;
	}
	var tags =node.getElementsByTagName(tag);
	for (var i = 0; i < tags.length; i ++) {
		temps.push(tags[i]);
	}
	return temps;
};
	
//获取class
	Base.prototype.getClass=function(className,parentNode){
		var node=null;
		var temps=[];
		if(parentNode!=undefined){
			node=parentNode;
		}else{
			node=document;
		}
		var all=node.getElementsByTagName('*');
		for(var i=0;i<all.length;i++){
			if ((new RegExp('(\\s|^)' +className +'(\\s|$)')).test(all[i].className)) {
			temps.push(all[i]);
		}
		}
	
		return temps;
		
	}
	
	//获取某一个节点，并返回这个节点对象
Base.prototype.getElement = function (num) {	
	return this.elements[num];
};


Base.prototype.ge = function (num) {	
	return this.elements[num];
};

	
Base.prototype.first=function(){
	return this.elements[0]
};

	
Base.prototype.last=function(){
	return this.elements[this.elements.length-1]
}

//获取某组节点的数量
Base.prototype.length=function(){
	return this.elements.length
}
//获取某一节点的属性
Base.prototype.attr=function(attr,value){
	for (var i = 0; i < this.elements.length; i++) {
		if(arguments.length==1){
			return this.elements[i].getAttribute(attr);
		} else if(arguments.length==2){
			this.elements[i].setAttribute(attr,value)
		}
				
	}
	return this;
}

//获取某一个索引在整个节点组中是第几个索引
Base.prototype.index=function(){
	var children=this.elements[0].parentNode.children;
	for(var i=0;i<children.length;i++){
		if(this.elements[0]==children[i]) return i;
	}
	
}

//获取某一个节点

Base.prototype.eq=function(num){
	var element=this.elements[num];
	this.elements=[];
	this.elements[0]=element;
	return this;
}
//获取当前节点的下一个同辈节点
//有属性 nextElementSibling 可以达到相同的效果
Base.prototype.next=function(){
		for (var i = 0; i < this.elements.length; i ++) {
			this.elements[i]=this.elements[i].nextSibling;
			if(this.elements[i]==null) throw new Error('找不到');
			if(this.elements[i].nodeType==3) this.next();
		
		}
	return this;
};
//获取当前节点的上一个同辈节点
//有属性 nextElementSibling 可以达到相同的效果
Base.prototype.prev=function(){
		for (var i = 0; i < this.elements.length; i ++) {
			this.elements[i]=this.elements[i].previousSibling;
			if(this.elements[i]==null) throw new Error('找不到');
			if(this.elements[i].nodeType==3) this.prev();
		
		}
	return this;
};
	
		//设置CSS  //如果传入参数是一个，说明是只读，因为对于未在内联中声明的style，
		//普通的.style显示为空，所以用 调用getStyle(ele,attr)
Base.prototype.css = function (attr, value) {
	
	for (var i = 0; i < this.elements.length; i ++) {
		if (arguments.length == 1) {     
			return getStyle(this.elements[i], attr);
		}
		this.elements[i].style[attr] = value;
	}
	return this;
}



//设置innerhtml	
	Base.prototype.html = function (str) {
		
		
		
		for (var i = 0; i < this.elements.length; i ++) {
			if(arguments.length==0){
				return this.elements[i].innerHTML;
			}
			this.elements[i].innerHTML = str;
		}
		return this;
	}
//跨浏览器获取innerTex		
Base.prototype.text=function(str){
		for (var i = 0; i < this.elements.length; i ++) {
			if(arguments.length==0){
				return getText(this.elements[i])
			}
			setText(this.elements[i],str)
			
		 }
		return this;
}	
	
	//增加class
	
	Base.prototype.addClass=function(className){
		for(var i=0;i<this.elements.length;i++){
			if ((!hasClass(this.elements[i], className))) {
				this.elements[i].className += ' ' + className;
			}
		}
		return this;
	}
	//删除class
		Base.prototype.removeClass=function(className){
		for(var i=0;i<this.elements.length;i++){
			if(hasClass(this.elements[i], className)){
				this.elements[i].className = this.elements[i].className.replace(new RegExp('(\\s|^)' + className + '(\\s|$)'), ' ');
			}
			
		}
		return this;
	}
	//添加link 或style 中的CSS 规则
	/*
Base.prototype.addRule=function(num,selectorText,cssText,position){
		var sheet=document.styleSheets[num];
		if (typeof sheet.insertRule != 'undefined') {
			sheet.insertRule(selectorText + "{" + cssText + "}", position);
		}else if(typeof sheet.addRule!='undefined'){
			sheet.addRule(selectorText,cssText,position)
		}
		
	};
	
*/

Base.prototype.addRule = function (num, selectorText, cssText, position) {
	var sheet = document.styleSheets[num];
	insertRule(sheet, selectorText, cssText, position);
	return this;
};


//移除link 或style 中的CSS 规则
Base.prototype.removeRule = function (num, index) {
	var sheet = document.styleSheets[num];
	deleteRule(sheet, index);
	return this;
};

//设置表单字段元素  这个name是指属性name 这里的base只能是$('form')
Base.prototype.form=function(name){
		for (var i = 0; i < this.elements.length; i ++) {
			this.elements[i]=this.elements[i][name];
			}
		return this;
}
//设置表单字段内容获取
	Base.prototype.value = function (str) {
		for (var i = 0; i < this.elements.length; i ++) {
			if(arguments.length==0){
				return this.elements[i].value;
			}
			this.elements[i].value = str;
		}
		return this;
	}

		
	//设置点击事件	
	Base.prototype.click = function (fn) {
		for (var i = 0; i < this.elements.length; i ++) {
			this.elements[i].onclick = fn;
		}
		return this;
	};




//设置鼠标移入移出方法
Base.prototype.hover=function(over,out){
	for (var i = 0; i < this.elements.length; i ++) {
		
		addEvent(this.elements[i],'mouseover',over);
		addEvent(this.elements[i],'mouseout',out);
	}
	return this;
};

/*
//设置点击切换功能
Base.prototype.toggle=function(){
	var args=arguments;
	for (var i = 0; i < this.elements.length; i ++) {
		this.elements[i].count=0;
		addEvent(this.elements[i],'click',function(){					//console.log(this)返回时的this.elements[i]												
			args[this.count++%args.length].call(this);				//注意作用yu问题,用call决定了对象是特定的单个elements[i]
		});
	}
	return this;
};
*/

//设置事件发生器
Base.prototype.bind=function(event,fn){
	for (var i = 0; i < this.elements.length; i ++) {
		addEvent(this.elements[i],event,fn);
	}
	return this;
}

 //切换

Base.prototype.toggle=function(){
	
	for (var i = 0; i < this.elements.length; i ++) {
		
		(function(element,args){
			var count=0;
			addEvent(element,'click',function(){
				args[count++%args.length].call(this);
			});
			
		})(this.elements[i],arguments);
		
	}
	return this;
};






//设置显示
Base.prototype.show=function(){
	for (var i = 0; i < this.elements.length; i ++) {
		this.elements[i].style.display='block'
	}
	return this;
	
	
	
};
//设置隐藏
Base.prototype.hide=function(){
	for (var i = 0; i < this.elements.length; i ++) {
		this.elements[i].style.display='none'
	}
	return this;
	
	
	
}

//设置物体居中
Base.prototype.center=function(width,height){
	var top=(getInner().height-height-30)/2+getScroll().top;
	var left=(getInner().width-width)/2+getScroll().left;
	for (var i = 0; i < this.elements.length; i ++){
		this.elements[i].style.top=top+'px';
		this.elements[i].style.left=left+'px';
		
	}
	return this;
	}
//触发浏览器窗口事件
	
Base.prototype.resize=function(fn){
	for (var i = 0; i < this.elements.length; i ++){
		var element = this.elements[i];
		
		addEvent(window,'resize',function(){
			fn();
			if(element.offsetLeft>(getInner().width+getScroll().left-element.offsetWidth)){
				element.style.left=getInner().width+getScroll().left-element.offsetWidth+'px';
				
				if(element.offsetLeft<0+getScroll().left){
				element.style.left=getScroll().left+'px';
			}
				
			} 
			
			if(element.offsetTop>(getInner().height+getScroll().top-element.offsetHeight)){
				element.style.top=getInner().height+getScroll().top-element.offsetHeight+'px';
				
				if(element.offsetTop<0+getScroll().top){
					element.style.top=getScroll().top+'px';
				}
			} 
			
		})
	}
	
	return this;
}
//锁屏功能
Base.prototype.lock=function(){
	var width=getInner().width;
	var height=getInner().height;
	for (var i = 0; i < this.elements.length; i ++){
		this.elements[i].style.width=width+getScroll().left+'px';
		this.elements[i].style.height=height+getScroll().top+'px';
		this.elements[i].style.display='block';
		parseFloat(sys.firefox)<4?document.body.style.overflow='hidden':document.documentElement.style.overflow='hidden';
		//旧版火狐 一点会清零
		fixedScroll.top=getScroll().top;
		fixedScroll.left=getScroll().left;
		//addEvent(window,'scroll',scrollTop);
	//addEvent(document,'mousedown',predef);
	//addEvent(document,'mouseup',predef);
	//addEvent(document,'selectstart',predef);
	addEvent(document,'mousewheel',predef);
	addEvent(this.elements[i],'scroll',fixedScroll)
	}
	return this;
}

//解锁
Base.prototype.unclock=function(){
	for (var i = 0; i < this.elements.length; i ++){
		this.elements[i].style.display='none';
		parseFloat(sys.firefox)<4?document.body.style.overflow='auto':document.documentElement.style.overflow='auto';
		//removeEvent(window, 'scroll', scrollTop);
		//removeEvent(document,'mousedown',predef);
	//removeEvent(document,'mouseup',predef)
	//removeEvent(document,'selectstart',predef);
	removeEvent(document,'mousewheel',predef);
removeEvent(this.elements[i],'scroll',fixedScroll)
	}
	return this;
}

Base.prototype.opacity=function(num){
	for (var i = 0; i < this.elements.length; i ++){
		this.elements[i].style.opacity=num/100;
		this.elements[i].style.filter = 'alpha(opacity=' + num + ')';
	}
	return this;
}
/*
	
//拖拽
Base.prototype.drag=function(){

}
*/



	
//插件入口
Base.prototype.extend=function(name,fn){
	Base.prototype[name]=fn;
}



