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
		var t = obj['t'] != undefined ? obj['t'] : 50;		//��ѡ��Ĭ��50����ִ��һ��
		var step = obj['step'] != undefined ? obj['step'] : 10;			//��ѡ��ÿ������10����
		var speed = obj['speed']!=undefined?obj['speed']:6;//��ѡ��Ĭ�ϻ����ٶ�Ϊ6
		var type = obj['type'] == 0 ? 'constant' : obj['type'] == 1 ? 'buffer' : 'buffer';		//��ѡ��0��ʾ���٣�1��ʾ���壬Ĭ�ϻ���
		var alter = obj['alter'];
		var target = obj['target'];
		var mul=obj['mul'];  //���ͬ������������
		
		if (alter != undefined && target == undefined) {
			target = alter + start;
		} else if (alter == undefined && target == undefined && mul==undefined) {
			throw new Error('alter������targetĿ�������봫һ����');
		}
		//alert(target)
				//�ж��Ƿ���͸����
		if(attr=='opacity'){
			
			element.style.opacity=parseInt(start)/100;
			element.style.filter='alpha(opacity='+start+')';
		}else{
			//element.style[attr]=start+'px';    //ʹ��ΰ�����ť���ӿ�ʼλ��
		}
		
		if (start > target) {
			step = -step;
			//alert('�������ж�step�Ƿ�Ϊ��ִ��')
		//	alert(step)
		}
		
		

		clearInterval(element.timer);       //�����ٶȼӿ�    element.timer ��ÿһ��������һ���Լ���
			
			
			if(mul==undefined){
				mul={};
				mul[attr]=target
			}								//timer �Ӷ��������ڶ������ͬʱʹ��һ��timer������;�ж�
		

		
		 element.timer=setInterval(function(){
		 	
		 //����һ �������ִ���˶���жӶ�������������ϣ��ִֻ��һ���жӶ���
		 //���ͬ����������ͬһ��timer��������Ŀ��ֵ��ͬʱ��Ŀ��ֵ�ϴ���޷����
		 //���1�� ���ܶ��ٸ�������ֻ���жӶ���һ��ִ�еĻ���
		 //���2 ������������һ������ִ�����֮��������timer 
		 
		 //����һ������ֵ�����ֵ�����˽��������Ƿ�ִ�����
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
			
			//alert('���￴��'+step)
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
		 * ��ʱ��ѭ��һ�� ִ��һ��ֵ��
		 * for ѭ��ִ��һ��ֵ��w,h��������
		 * ��ʱ��for������ɵģ���ֻҪ����û��ɵģ�flag�ͻ���false��������δ���жϵ�true

*/
		if(flag){
			clearInterval(element.timer);
			if(obj.fn!=undefined){
				obj.fn();                             //fn()��Ϊ��ʵ������ִ�У���ǰһ��animate����֮����ִ��fn()
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



