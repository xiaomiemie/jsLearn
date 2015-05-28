//表单序列化

$().extend('serialize',function(){
	for(var k=0;k<this.elements.length;k++){
		var form=this.elements[k];
		
		var parts={};
	//alert(form.elements.length)
	for(var i=0;i<form.elements.length;i++){
		var filed=form.elements[i];
		switch(filed.type){
			case undefined:
			case 'submit':
			case 'reset':
			case 'file':
			case 'button':
			 break;
			 
			case 'radio':
			case 'checkbox':
			if(!filed.selected) break;
			
			case 'select-one':
			case 'select-multiple':

				for(var j=0;j<filed.options.length;j++){
					var option = filed.options[j];
					if(option.selected){
						
						var optValue='';
						if(option.hasAttribute){ //非IE
							optValue=(option.hasAttribute('value')?option.value:option.text);
						}else{
							optValue=(option.attribute('value').specified?option.value:option.text);
						}
						optValue;
					}
				}
				parts[filed.name]=optValue;
			
			
			
			
			
			default:
			parts[filed.name]=filed.value;
			 
		}
	}
	
	return parts;
	
	
	
	}
	
	
	
	
	
	
	
})
