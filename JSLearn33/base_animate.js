$().extend('animate',function(obj){
		
	//console.log(typof step)
	for (var i = 0; i < this.elements.length; i++) {
		
		var element=this.elements[i];
		var attr = obj['attr'] == 'x' ? 'left' : obj['attr'] == 'y' ? 'top' : 
				   obj['attr'] == 'w' ? 'width' : obj['attr'] == 'h' ? 'height' : 
				   obj['attr'] == 'o'?  'opacity':obj['attr']!= undefined ?obj['attr']:'left';
		var start = obj['start'] != undefined ? obj['start'] :	
				attr == 'opacity' ? parseFloat(getStyle(element, attr)) * 100 : 
								    parseInt(getStyle(element, attr));
									//alert(start);
		var t = obj['t'] != undefined ? obj['t'] : 50;		//可选，默认50毫秒执行一次
		var step = obj['step'] != undefined ? obj['step'] : 10;			//可选，每次运行10像素
		var speed = obj['speed']!=undefined?obj['speed']:6;//可选，默认缓冲速度为6
		var type = obj['type'] == 0 ? 'constant' : obj['type'] == 1 ? 'buffer' : 'buffer';		//可选，0表示匀速，1表示缓冲，默认缓冲
		var alter = obj['alter'];
		var target = obj['target'];
		var mul=obj['mul'];  //解决同步动画的问题
		
		if (alter != undefined && target == undefined) {
			target = alter + start;
		} else if (alter == undefined && target == undefined && mul==undefined) {
			throw new Error('alter增量或target目标量必须传一个！');
		}
		//alert(target)
				//判断是否是透明度
		if(attr=='opacity'){
			
			element.style.opacity=parseInt(start)/100;
			element.style.filter='alpha(opacity='+start+')';
		}else{
			//element.style[attr]=start+'px';    //使多次按动按钮都从开始位置
		}
		
		if (start > target) {
			step = -step;
			//alert('这里是判断step是否为副执行')
		//	alert(step)
		}
		
		

		clearInterval(element.timer);       //避免速度加快    element.timer 给每一个对象都有一个自己的
			
			
			if(mul==undefined){
				mul={};
				mul[attr]=target
			}								//timer 从而不至于在多个对象同时使用一个timer导致中途中断
		

		
		 element.timer=setInterval(function(){
		 	
		 //问题一 多个动画执行了多个列队动画，但是我们希望只执行一次列队动画
		 //多个同步动画用了同一个timer，当他们目标值不同时，目标值较大的无法完成
		 //解决1： 不管多少个动画，只给列队动画一次执行的机会
		 //解决2 ：多个动画最后一个动画执行完毕之后再清理timer 
		 
		 //创建一个布尔值，这个值可以了解多个动画是否执行完毕
		 var flag=true;
		 	
		 for(var i in mul){
			attr=i=='x'?'left':i=='y'?'top':i=='w'?'width':i=='h'?'height':i=='o'?'opacity':i!=undefined?i:'left';
			target=mul[i];
		//	console.log(target);
			if (type == 'buffer') {
				step = attr == 'opacity' ? (target - parseFloat(getStyle(element, attr)) * 100) /speed :
													 (target - parseInt(getStyle(element, attr))) /speed;
				step = step > 0 ? Math.ceil(step) : Math.floor(step);
			}else if(target - parseFloat(getStyle(element, attr))<0){
				step=-Math.abs(step);
			}
			
			//alert('这里看看'+step)
			if (attr == 'opacity') {
				if (step == 0) {
					setOpacity();
				} else if (step > 0 && Math.abs(parseFloat(getStyle(element, attr)) * 100 - target) <= step) {
					setOpacity();
				} else if (step < 0 && (parseFloat(getStyle(element, attr)) * 100 - target) <= Math.abs(step)) {
					setOpacity();
				} else {
					var temp = parseFloat(getStyle(element, attr)) * 100;
					element.style.opacity = parseFloat((temp + step) / 100);
					element.style.filter = 'alpha(opacity=' + parseInt(temp + step) + ')'
				}
				if(target!=parseInt(parseFloat(getStyle(element,attr))*100)){
					flag=false;
				}
				
				
			}else{
				if(step==0){
					setTarget();
				}
				else if (step > 0 && Math.abs( parseInt(getStyle(element, attr))-target) <=step) {
					 setTarget(); 
				} else if (step < 0 && ( parseInt(getStyle(element, attr)) -target)<=Math.abs(step)) {
					 setTarget();
				}else{
					//alert('step:'+step)
					element.style[attr] =  parseInt(getStyle(element, attr)) + step + 'px';
				}
				
				if(target!=parseInt(getStyle(element, attr))){
					flag=false;
				}
			
			}
		}
		
		
		/*
		 * 定时器循环一次 执行一组值，
		 * for 循环执行一个值，w,h。。。。
		 * 及时在for中有完成的，但只要还有没完成的，flag就还是false，不能是未经判断的true

*/
		if(flag){
			clearInterval(element.timer);
			if(obj.fn!=undefined){
				obj.fn();                             //fn()是为了实现序列执行，在前一个animate结束之后，在执行fn()
			}
		}
		
	//	document.getElementById('test').innerHTML += parseInt(getStyle(element, attr)) + '<br />';

			
			 
		
		//document.getElementById('aaa').innerHTML += step + '<br />';
		},t);
		
		

	}
	return this;
		function setTarget(){
			element.style[attr] = target + 'px';
			
		}
		function setOpacity() {
			element.style.opacity = parseInt(target)/100;
			element.style.filter = 'alpha(opacity=' + parseInt(target) + ')';
			clearInterval(element.timer);
				if(obj.fn!=undefined){
				obj.fn();
			}
		}
})



