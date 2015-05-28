
$(function(){

	
	//个人中心
	
$('#header .member').hover(function(){
		
		$(this).css('background','url(images/arrow2.png) no-repeat 55px center');
		$('#header .member_ul').show().animate({

	
	mul:{
				o:100,
				height:80
			},

			'start':0,
			'type':1,
			'step':10,
			
			
		});
	},function(){

		$(this).css('background','url(images/arrow.png) no-repeat 55px center');
		$('#header .member_ul').animate({
			mul:{
					o:0,
				height:0
			},
			'type':1,
			'step':10,
			't':30,
			'fn':function(){
				$('#header .member_ul').hide();
			}
		});

	});


//登陆框
	var login=$('#login')
	var screen = $('#screen');

	login.center(350,250).resize(function(){
		
		if (login.css('display') == 'block') {
			screen.lock();
		}	
	});
	
	$('.login').click(function(){
		login.center(350,250)
		login.css('display','block');
		screen.lock().animate({
			'target':30,
			'start':0,
			'attr':'o',
			'type':1
		})
	});
	
	$('#login .close').click(function(){
		//先执行渐变，再关闭   
		login.css('display','none');
		screen.animate({
			'target':0,
			
			'attr':'o',
			'type':1,
			'fn':function(){
				screen.unclock();
			}
		});
		
		
	});

$('form').eq(1).form('sub').click(function(){
	
	if(/[\w]{2,20}/.test($('form').eq(1).form('user').value()) && $('form').eq(1).form('pass').value().length>=6){
		var _this=this;
		$('#loading').css('display','block').center(200,40);
		$('loading p').html('正在登陆，请稍后...');
	
		$(_this).css('backgroundPosition', 'right');
		_this.disabled=true;
		ajax({
				method : 'post',
				url : 'is_login.php',
				data : $('form').eq(1).serialize(),
				success : function (text) {
					
					if (text == 1) { //失败
						$('#login .info').html('登陆失败：用户名或密码不正确!');
						$('#loading').css('display','none');
					} else {
						$('#login .info').html(' ');
						$('#loading').css('display','none');
						$('#success').css('display','block').center(200,40);
						$('#success p').html('登录成功，请稍后...');
						setCookie('user',$('form').eq(1).form('user').value())
						setTimeout(function(){
							$('#success').css('display','none');
							login.css('display','none');
							
							$('form').eq(1).first().reset();
							screen.animate({
								'target':0,
								'attr':'o',
								'type':1,
								'fn':function(){
									screen.unclock();
								}
							});
							$('#header .login').css('display','none');
							$('#header .reg').css('display','none');
							$('#header .info').css('display','block').html(getCookie('user')+'，您好!');
								
						},1500);
						
						
					};
					_this.disabled = false;
					$(_this).css('backgroundPosition', 'left');
					
				},
				async : true
			});
		
		
			
	}else {
		$('#login .info').html('登陆失败：用户名或密码不正确!');
		
	}
	
	
	
	
	
});


//*****************************注册
 
 var reg=$('#reg');
	$('.reg').click(function(){
	//	console.log(reg)
		reg.center(600,550);
		reg.show();
		screen.lock().animate({
			'target':30,
			'start':0,
			'attr':'o',
			'type':1
		})
	});
	reg.center(600,550).resize(function(){
	
		if (reg.css('display') == 'block') {
			screen.lock();
		}
			
	})
	
	$('#reg .close').click(function(){
		reg.hide();
				screen.animate({
			'target':0,
			
			'attr':'o',
			'type':1,
			'fn':function(){
				screen.unclock();
			}
		});
	});
	













	//拖拽流程 
	//1.点下去
	//2.点下去物体被选中 

	login.drag($('#login h2').first());
	reg.drag($('#reg h2').first())



//百度分享初始化位置

$('#share').css('top',getScroll().top+(getInner().height-parseInt(getStyle($('#share').first(),'height')))/2+'px');
//alert(getInner().height-30-parseInt(getStyle($('#share').first(),'height'))/2);
//百度分享收缩
$('#share').hover(function(){
	$('#share').animate({
		'target':0,
		'attr':'x',
		'step':10,
		'type':1,
		'speed':5,
		't':50
		
	});
},function(){
		$('#share').animate({
		'target':-211,
		'attr':'x',
		'step':10,
		'type':1,
		'speed':5,
		't':50
	});
});


$(window).bind('scroll',function(){
	setTimeout(function(){
	$('#share').animate({
		'target':(getInner().height-parseInt(getStyle($('#share').first(),'height')))/2+t,
		'attr':'y'
	});		
	},100);
	var t=getScroll().top;

})

 

//滑动导航


//鼠标的出发事件 默认是在最上边那一层

$('#nav .about li').hover(function(){
	//console.log('aaa')
	var target=parseInt($(this).first().offsetLeft)+20;
	$('#nav .nav_bg').animate({
		target:target,
		attr:'x',
		type:1,
		step:30,
		fn: function(){
			$('#nav .white').animate({
				target: -target+20,
				attr: 'x',
				type: 1,
				step: 30,
				t:10
			});
		}
	});
},function(){
	//.nav_bg是后面的黑色块
$('#nav .nav_bg').animate({
		target:20,
		attr:'x',
		type:1,
		step:30,
		fn: function(){
			$('#nav .white').animate({
				target: 0,
				attr: 'x',
				type: 1,
				step: 30,
				t:10
			});
		}
	});

	
});

//******************************左侧菜单
 
 $('#sidebar h2').toggle(function(){
 //	console.log(this.nextSibling)
	//console.log($(this).next().html());
	$(this).next().animate({
		mul:{
			h:0,
			o:0
		}
	})
 },function(){
 	$(this).next().animate({
		mul:{
			
			o:100,
			h:150
			
		},
		
	})
 });



//表单验证
//初始化表单操作

$('form').eq(0).first().reset();


//focus blur
//用户名

$('form').eq(0).form('user').bind('focus',function(){
	$('#reg .info_user').css('display','block');
	$('#reg .error_user').css('display','none');
	$('#reg .succ_user').css('display','none');
}).bind('blur',function(){
	if(trim($(this).value())==''){
		$('#reg .info_user').css('display','none');
		$('#reg .error_user').css('display','none');
		$('#reg .succ_user').css('display','none');
	}else if(!check_user()){
		$('#reg .info_user').css('display','none');
		$('#reg .error_user').css('display','block');
		$('#reg .succ_user').css('display','none');
	}else{
		$('#reg .succ_user').css('display','block');
		$('#reg .info_user').css('display','none');
		$('#reg .error_user').css('display','none');
		
	}
});
function check_user(){
	var flag = true;
		if (!/[\w]{2,20}/.test(trim($('form').eq(0).form('user').value()))) {
			$('#reg .error_user').html('输入不合法，请重新输入！');
			return false;
		} else {
			
			$('#reg .info_user').css('display', 'none');
			$('#reg .loading').css('display', 'block');
			
			ajax({
				method : 'post',
				url : 'is_user.php',
				data : $('form').eq(0).serialize(),
				success : function (text) {
					if (text == 1) {
						$('#reg .error_user').html('用户名被占用！');
						flag = false;
					} else {
						flag = true;
					}
					$('#reg .loading').css('display', 'none');
				},
				async : false
			});
	

		}
		return flag;
}

//************************************888密码


$('form').eq(0).form('pass').bind('focus',function(){
	$('#reg .info_pass').css('display','block');
	$('#reg .error_pass').css('display','none');
	$('#reg .succ_pass').css('display','none');
}).bind('blur',function(){

	if(trim($(this).value())==''){
		$('#reg .info_pass').css('display','none');
		$('#reg .error_pass').css('display','none');
		$('#reg .succ_pass').css('display','none');
	}else{
		if(check_pass()){
			$('#reg .succ_pass').css('display','block');
			$('#reg .info_pass').css('display','none');
			$('#reg .error_pass').css('display','none');
		}else{
			$('#reg .info_pass').css('display','none');
			$('#reg .error_pass').css('display','block');
			$('#reg .succ_pass').css('display','none');
		}
	}
	

});




//密码强度
$('form').eq(0).form('pass').bind('keyup',function(){
	check_pass();
});

function check_pass(){
	var value=trim($('form').eq(0).form('pass').value());
	var value_length=value.length;
	var code_length=0;
	
	//第一个条件验证
	if(value_length>=6 && value_length<=20 ){
		$('#reg .info_pass .q1').html('●').css('color','green')
	}else{
		$('#reg .info_pass .q1').html('○').css('color','#666')
	}
	
	//第二个
	if (value_length > 0 && !/\s/.test(value)) {
		$('#reg .info_pass .q2').html('●').css('color', 'green');
		} else {
		$('#reg .info_pass .q2').html('○').css('color', '#666');
	}
	
	//第三个
	if(/[0-9]/.test(value)){
		code_length++;
	}
	if(/[a-z]/.test(value)){
		code_length++;
	}
	if(/[A-Z]/.test(value)){
		code_length++;
	}
	if (/[^a-zA-Z0-9]/.test(value)) {
		code_length++;
	}
	if(code_length>=2){
		$('#reg .info_pass .q3').html('●').css('color', 'green');
	}else{
		$('#reg .info_pass .q3').html('○').css('color', '#666');
	}
	
	//安全级别
	//高 >=10个字符 三种字符混拼
	// 8     2
	//1
	
	if(value_length>=10 && code_length>=3){
		$('reg info_pass .s1').css('color','green');
		$('reg info_pass .s2').css('color','green');
		$('reg info_pass .s3').css('color','green');
		$('reg info_pass .s4').html('高').css('color','green');
	}else if(value_length>=8 && code_length>=2){
		$('reg info_pass .s1').css('color','#f60');
		$('reg info_pass .s2').css('color','#f60');
		$('reg info_pass .s3').css('color','#f60');
		$('reg info_pass .s4').html('中').css('color','#f60');
	}else if (code_length >= 1) {
		$('#reg .info_pass .s1').css('color', 'maroon');
		$('#reg .info_pass .s2').css('color', '#ccc');
		$('#reg .info_pass .s3').css('color', '#ccc');
		$('#reg .info_pass .s4').html('低').css('color', 'maroon');
	}else{
		$('#reg .info_pass .s1').css('color', '#ccc');
		$('#reg .info_pass .s2').css('color', '#ccc');
		$('#reg .info_pass .s3').css('color', '#ccc');
		$('#reg .info_pass .s4').html('');
	}
	if (value_length >= 6 && value_length <= 20 && code_length >= 2){
		return true;
	}else{
		return false;
	}
	
}


//密码确认
$('form').eq(0).form('notpass').bind('focus',function(){
	$('#reg .info_notpass').css('display','block');
	$('#reg .error_notpass').css('display','none');
	$('#reg .succ_notpass').css('display','none');
}).bind('blur',function(){
	if(trim($(this).value())==''){
		$('#reg .info_notpass').css('display','none');
		$('#reg .error_notpass').css('display','none');
		$('#reg .succ_notpass').css('display','none');
	}else if(check_notpass()){
		$('#reg .succ_notpass').css('display','block');
			$('#reg .info_notpass').css('display','none');
			$('#reg .error_notpass').css('display','none');
		
	}else{
			$('#reg .info_notpass').css('display','none');
			$('#reg .error_notpass').css('display','block');
			$('#reg .succ_notpass').css('display','none');
	}
});
function check_notpass(){
	if(trim($('form').eq(0).form('notpass').value())==trim($('form').eq(0).form('pass').value())){
		return true;
	}else{
		return false;
	}
};

//提问
$('form').eq(0).form('ques').bind('change',function(){

	$('#reg .error_ques').css('display','none');
});
function check_ques(){
	if($('form').eq(0).form('ques').value()!=0){
		return true;
	}else{
		return false;
	}
}

//回答
$('form').eq(0).form('ans').bind('focus',function(){
	$('#reg .info_ans').css('display','block');
	$('#reg .error_ans').css('display','none');
	$('#reg .succ_ans').css('display','none');
}).bind('blur',function(){

	if(trim($(this).value())==''){
		$('#reg .info_ans').css('display','none');
		$('#reg .error_ans').css('display','none');
		$('#reg .succ_ans').css('display','none');
	}else if(check_ans()){
		
		$('#reg .succ_ans').css('display','block');
			$('#reg .info_ans').css('display','none');
			$('#reg .error_ans').css('display','none');
		
	}else{
			$('#reg .info_ans').css('display','none');
			$('#reg .error_ans').css('display','block');
			$('#reg .succ_ans').css('display','none');
	}
});
function check_ans(){
	if(trim($('form').eq(0).form('ans').value()).length>=2 && trim($('form').eq(0).form('ans').value()).length<=32){
		return true;
		}else{
			return false;
		}
	}

//电子邮件

	$('form').eq(0).form('email').bind('focus', function () {
		//补全界面
		if ($(this).value().indexOf('@') == -1) {
			$('#reg .all_email').show();
		}
		
		
		$('#reg .info_email').css('display', 'block');
		$('#reg .error_email').css('display', 'none');
		$('#reg .succ_email').css('display', 'none');
	}).bind('blur', function () {
			//补全界面
			$('#reg .all_email').hide()
			
			
		if (trim($(this).value()) == '') {
			$('#reg .info_email').css('display', 'none');
		} else if (check_email()) {
			$('#reg .info_email').css('display', 'none');
			$('#reg .error_email').css('display', 'none');
			$('#reg .succ_email').css('display', 'block');
		} else {
			$('#reg .info_email').css('display', 'none');
			$('#reg .error_email').css('display', 'block');
			$('#reg .succ_email').css('display', 'none');
		}
	});
function check_email(){
	if(/^[\w\-\.]+@[\w\-]+(\.[a-zA-Z]{2,4}){1,2}$/.test(trim($('form').eq(0).form('email').value()))){
		return true;
	}else{
		return false;
	}
}

//电子邮件补全移入移出li
$('#reg .all_email li').hover(function(){
	$(this).css('background','#e5edf2');
	$(this).css('color','#369');
},function(){
	$(this).css('background','none');
	$(this).css('color','#666')
	
});


//电子邮件键入
$('form').eq(0).form('email').bind('keyup',function(event){
	if($(this).value().indexOf('@')==-1){  
	$('#reg .all_email').show(); //如果用户没有输入@符号，继续补全
		var text=$(this).value();
		$('#reg .all_email span').html(text)
		
	}else{
		$('#reg .all_email').hide();
		$('#reg .all_email li span').html('');
	};
	
	$('#reg .all_email li').css('background','none');
	$('#reg .all_email li').css('color','#666')	;
    var length=$('reg .all_email li').length();
	if(event.keyCode==40){
		if(this.index==undefined || this.index>=length-1){
			this.index=0;
		} else {
			this.index++;
		}

	$('#reg .all_email li').eq(this.index).css('background','#e5edf2');
	$('#reg .all_email li').eq(this.index).css('color','#369');

	}else if(event.keyCode==38){
		if(this.index==undefined || this.index<=0 ){
			this.index=length-1;
		}else  {
			this.index--;
		}
	
	$('#reg .all_email li').eq(this.index).css('background','#e5edf2');
	$('#reg .all_email li').eq(this.index).css('color','#369');
	}
	else if(event.keyCode==13){
		var t = $('#reg .all_email li').eq(this.index).text();
		$('form').eq(0).form('email').value(t);
		
		this.index=undefined;
	}
	

});

//电子邮件补全 点击获取 
//click 事件是点击弹起后出发的，此时blur事件已经出发，而失去焦点后，没有点击弹起的元素，无法触发

/*
$('#reg .all_email li').click(function(){
	var text_li = $(this).innerText;	
	$('form').eq(0).form('email').value(text_li);
})
*/
$('#reg .all_email li').bind('mousedown',function(){
var text_li = $(this).text();
	
	$('form').eq(0).form('email').value(text_li);
});


//年月日

var year = $('form').eq(0).form('year');
var month = $('form').eq(0).form('month');
var  day = $('form').eq(0).form('day');
var date = new Date();
var day30= [4,6,9,11];
var day31 = [1,3,5,7,8,10,12];
//注入

//年
for(var i=1950;i<=date.getFullYear();i++){
	year.first().add(new Option(i,i),undefined);
};
//月
for(var m=1;m<=12;m++){
	month.first().add(new Option(m,m),undefined)
};
//日
month.bind('change',select_day);
year.bind('change',select_day);

day.bind('change',function(){
	$('#reg .error_birthday').css('display','none')
})
function check_birthday() {
	if (year.value() != 0 && month.value() != 0 && day.value() != 0){
		 return true;
	}else {
		return false;
	};
} 
function select_day(){
	if(year.value()!=0 && month.value()!=0){
		//清理之前的注入
		day.first().options.length=1;
		var cur_day=0;
		//注入日
		if (inArray(day30, parseInt(month.value()))) {
			cur_day=30;
		}else if (inArray(day31, parseInt(month.value()))) {
				cur_day=31;
		}else{
			if((parseInt(year.value())%4==0&& parseInt(year.value())%100!=0)|| parseInt(year.value())%400==0){
				cur_day=29;
			}else {
				cur_day=28;	
			}                 
		}
			for (var d = 1; d <= cur_day; d++) {
				day.first().add(new Option(d, d), undefined);
			};
	}else{
		day.first().options.length=1;
	}
}

//备注

$('form').eq(0).form('ps').bind('keyup',check_ps);
//粘贴事件会在内容粘贴到文本框之前触发。
$('form').eq(0).form('ps').bind('paste',function(){
setTimeout(check_ps,50);
	
})
//清理尾巴


function check_ps(){
	var num = 200-$('form').eq(0).form('ps').value().length;
	if(num>=0){
		$('#reg .ps .num').eq(0).html(num);
		$('#reg .ps').eq(0).show();
		$('#reg .ps').eq(1).hide();
		return true;
	}else{
		$('#reg .ps').eq(0).hide(); 
		$('#reg .ps .num').eq(1).html(Math.abs(num)).css('color','red');
		$('#reg .ps').eq(1).show();
		return false;
	}
}

$('#reg .ps .clear').click(function(){
	$('form').eq(0).form('ps').value($('form').eq(0).form('ps').value().substring(0,200));
	check_ps();
});



//提交
$('form').eq(0).form('sub').click(function(){
	var flag=true;
	
	if(!check_user()){
		$('#reg .error_user').css('display','block');
		flag=false;
	} 
	if(!check_pass()){
		$('#reg .error_pass').css('display','block');
		flag=false;
	}
	
	if(!check_notpass()){
		$('#reg .error_notpass').css('display','block');
		flag=false;
	}
	
	if(!check_ques()){
		$('#reg .error_ques').css('display','block');
		flag=false;
	}
	
	if (!check_ans()) {
		$('#reg .error_ans').css('display', 'block');
		flag = false;
	}
	
	if (!check_email()) {
		$('#reg .error_email').css('display', 'block');
		flag = false;
	}
	
	if (!check_birthday()) {
		
		$('#reg .error_birthday').css('display', 'block');
		flag = false;
	}
	
	if (!check_ps()) {
		flag = false;
	}
	
	if(flag){
		var _this=this;
		//$('form').eq(0).first().submit();
		$('#loading').css('display','block').center(200,40);
		$('#loading p').html('正在提交注册中...');
		$(_this).css('backgroundPosition','right');
		_this.disabled=true;
		
		ajax({
		
			method:'post',
			url:'add.php',
			data:$('form').eq(0).serialize(),
			success:function(text){
				if(text==1){
					$('#loading').css('display','none');
					$('#success').css('display','block').center(200,40);
					$('#success p').html('注册成功，请登录.');
					setTimeout(function(){
						$('#success').css('display','none');
						reg.css('display','none');
					
						$('#reg .succ').css('display','none');
						$('form').eq(0).first().reset();
						_this.disabled = false;
						$(_this).css('backgroundPosition', 'left');
						screen.animate({
							'target':0,
							
							'attr':'o',
							'type':1,
							'fn':function(){
								screen.unclock();
							}
						});
					},1500);
				}
			},
			async:true	
		
		});

	

	}
	
	

	
});







//轮播器初始化

//$('#banner img').hide();
//$('#banner img').eq(0).show();


$('#banner img').opacity(0);
$('#banner img').eq(0).opacity(100);
$('#banner ul li').eq(0).css('color','#333');
$('#banner strong').html($('#banner img').eq(0).attr('alt'));

//自动轮播器
var banner_index=1;
//轮播器的种类
var banner_type = 1; 		//1表示透明度，2表示上下滚动
var banner_len=$('#banner ul li').length();

//自动播放
var banner_timer=setInterval(banner_fn,2000);

//手动轮播器
$('#banner ul li').hover(function(){
	clearInterval(banner_timer);
	if($(this).index()!=banner_index-1){
		banner(this,banner_index==0?$('#banner ul li').length()-1:banner_index-1);
	}
	
},function(){
	banner_index=$(this).index()+1;
	banner_timer=setInterval(banner_fn,2000);
});

//公用部分
function banner(obj,prev){


	$('#banner ul li').css('color','#999');
	$(obj).css('color','#333');
	$('#banner strong').html($('#banner img').eq($(obj).index()).attr('alt'));
	//$('#banner img').css('zIndex',1).opacity(0);
	if(banner_type==1){                         //透明度转变
		$('#banner img').eq(prev).animate({
			attr:'o',
			target:0,
			t:100,
			step:5
		}).css('zIndex',1)
		
		
		$('#banner img').eq($(obj).index()).animate({
			attr:'o',
			target:100,
			t:100,
			step:5
		}).css('zIndex',2);		
		
	}else if(banner_type==2){          //上下滚动播放
		
		$('#banner img').eq(prev).css('zIndex',1).animate({
			attr:'y',
			target:-150,
			t:50,
			step:10,

		}).opacity(100);
		
		
		$('#banner img').eq($(obj).index()).css('top','150px').css('zIndex',2).animate({
			attr:'y',
			target:0,
			t:50,
			step:10
		}).opacity(100);		
	}

}

function banner_fn(){
	if(banner_index>=banner_len){
		banner_index=0;
	} 
	banner($('#banner ul li').eq(banner_index).first(),banner_index==0? $('#banner ul li').length()-1:banner_index-1);
	banner_index++;	    //在没有显示完banner()的动作时，banner_index已经++了，所以上面再判断
	
}

//图片加载

//1.当图片进入到可见区域时，将图片的xsrc替换到src 

//alert($('.wait_load').attr('xsrc'))

//$('.wait_load').eq(0).attr('src',$('.wait_load').attr('xsrc'));

//2.获取图片元素到最外层顶点元素的距离
//alert(offsetTop($('.wait_load').first()))

//3、获取屏幕页面可是区域的最低点的位置  屏幕
//alert(getInner().height+getScroll().top);


var len=$('.wait_load').length();
var wait_load=$('.wait_load');//图片都加有class=wait_load
wait_load.opacity(0);
$(window).bind('scroll',_wait_load);
$(window).bind('resize',_wait_load);

function _wait_load(){
	setTimeout(function(){
		for(var i=0;i<len;i++){
			var _this=wait_load.ge(i);
			if(getInner().height+getScroll().top>offsetTop(_this)){
			
			$(_this).attr('src',$(_this).attr('xsrc')).animate({
				attr:'o',
				target:100,
				t:30,
				step:10
			})				
			}

		
		}
		
	},100);
};



//图片弹窗

var photo_big=$('#photo_big');
	$('photo .wait_load').click(function(){
		photo_big.center(600,550);
		photo_big.show();
		screen.lock().animate({
			'target':30,
			'start':0,
			'attr':'o',
			'type':1
		});
		
	var temp_img=new Image();
	$(temp_img).bind('load',function(){
		$('#photo_big .big img').attr('src',temp_img.src).animate({
		attr:'o',
		target:100,
		t:30
	}).css('width','600px').css('height','450px').css('top','0').opacity(0);
	});
	
	temp_img.src=$(this).attr('bigsrc');  //src属性可以让他在后台加载这张图片到本地缓存，并不现实

	var children=this.parentNode.parentNode;
	
	prev_next_img(children);
	});
	
	
	photo_big.center(620,511).resize(function(){
	
		if (photo_big.css('display') == 'block') {
			screen.lock();
		}
			
	})
	
	$('#photo_big .close').click(function(){
		photo_big.hide();
				screen.animate({
			'target':0,
			
			'attr':'o', 
			'type':1,
			'fn':function(){
				screen.unclock();
			}
		});
		
		$('#photo_big .big img').attr('src','images/loading.gif').css('width','32px').css('height','32px').css('top','190px');
	});
	
photo_big.drag($('#photo_big h2').first());
	

//图片加载
/*
$('#photo_big .big img').attr('src','http://pic2.desk.chinaz.com/file/201212/6/yidaizongshi6.jpg').animate({
	attr:'o',
	target:100,
	t:30
}).css('width','600px').css('height','450px').css('top','0').opacity(0);
//问题： 1 loading的样式被改变了  2 动画效果没有出现
*
//创建一个临时区域图片对象用来保存图片
/*
var temp_img=new Image();


//onload  onerror onload等在加载完毕之后，才可以执行
$(temp_img).bind('load',function(){
	$('#photo_big .big img').attr('src',temp_img.src).animate({
	attr:'o',
	target:100,
	t:30
}).css('width','600px').css('height','450px').css('top','0').opacity(0);
});
temp_img.src='http://pic2.desk.chinaz.com/file/201212/6/yidaizongshi6.jpg'  //src属性可以让他在后台加载这张图片到本地缓存，并不现实
*/

	//图片鼠标划过左边
$('#photo_big .big .left').hover(function () {
		$('#photo_big .big .sl').animate({
			attr : 'o',
			target : 50,
			t : 30,
			step : 10
		});		
	}, function () {
		$('#photo_big .big .sl').animate({
			attr : 'o',
			target : 0,
			t : 30,
			step : 10
		});
	});
	
	//图片鼠标划过右边
	$('#photo_big .big .right').hover(function () {
		$('#photo_big .big .sr').animate({
			attr : 'o',
			target : 50,
			t : 30,
			step : 10
		});		
	}, function () {
		$('#photo_big .big .sr').animate({
			attr : 'o',
			target : 0,
			t : 30,
			step : 10
		});
	});

//图片上一张
$('#photo_big .big .left').click(function(){
	$('#photo_big .big img').attr('src','images/loading.gif').css('width','32px').css('height','32px').css('top','190px');
	var current_img=new Image();
	$(current_img).bind('load',function(){
		$('#photo_big .big img').attr('src', current_img.src).animate({
		attr : 'o',
		target : 100,
		t : 30,
		step : 10
	}).opacity(0).css('width','600px').css('height','450px').css('top','0');
	});
	
	current_img.src=$(this).attr('src');
	var children=$('#photo dl dt img').ge(prevIndex($('#photo_big .big img').attr('index'),$('#photo').first())).parentNode.parentNode;
	prev_next_img(children);
	
	
});
//图片下一张
$('#photo_big .big .right').click(function(){
$('#photo_big .big img').attr('src','images/loading.gif').css('width','32px').css('height','32px').css('top','190px');
	var current_img=new Image();
	$(current_img).bind('load',function(){
		$('#photo_big .big img').attr('src', current_img.src).animate({
		attr : 'o',
		target : 100,
		t : 30,
		step : 10
	}).opacity(0).css('width','600px').css('height','450px').css('top','0');
	});
	current_img.src=$(this).attr('src');
	var children=$('#photo dl dt img').ge(nextIndex($('#photo_big .big img').attr('index'),$('#photo').first())).parentNode.parentNode;
	prev_next_img(children);
	
});


//图片传递
function prev_next_img(children){
	var prev=prevIndex($(children).index(),children.parentNode);
	var next=nextIndex($(children).index(),children.parentNode);
	
	var prev_img=new Image();
	var next_img=new Image();
	prev_img.src = $('#photo dl dt img').eq(prev).attr('bigsrc');
	next_img.src = $('#photo dl dt img').eq(next).attr('bigsrc');
	$('#photo_big .big .left').attr('src',prev_img.src);
	$('#photo_big .big .right').attr('src',next_img.src);
	$('#photo_big .big img').attr('index',$(children).index());	
	$('#photo_big .big .index').html($(children).index()+1+'/'+children.parentNode.children.length)
}

/*
$(document).click(function(){
	ajax({
		
		method:'post',
		url:'demo.php',
		data:{
			'name':'Lee',
			'age':100
		},
		success:function(text){
			//alert(text)
		},
		async:true
		
		
		
		
	});
})
*/


/*********************************************发表博文**********/

 

	/*
$('#header .member a').click(function(){

		$('#blog').center(580,320);
		$('#blog').css('display','block');
		screen.lock().animate({
			'target':30,
			'start':0,
			'attr':'o',
			'type':1
		})
	});
	$('#blog').center(580,320).resize(function(){
	
	
		if ($('#blog').css('display') == 'block') {
			screen.lock();
		}
			
	})
	
	$('#blog .close').click(function(){
		$('#blog').hide();
				screen.animate({
			'target':0,
			
			'attr':'o',
			'type':1,
			'fn':function(){
				screen.unclock();
			}
		});
	});

	$('#blog').drag($('#blog h2').last());

*/

	//发表博文弹窗
	$('#blog').center(580, 320).resize(function () {
		if ($('#blog').css('display') == 'block') {
			screen.lock();
		}
	});
	
	$('#header .member a').eq(0).click(function () {	
		$('#blog').center(580, 320).show();
		screen.lock().animate({
			attr : 'o',
			target : 30,
			t : 30,
			step : 10
		});
	});
	$('#blog .close').click(function () {
		$('#blog').hide();
		screen.animate({
			attr : 'o',
			target : 10,
			t : 30,
			step : 10,
			fn : function () {
				
				screen.css('display','none');
				screen.unclock();
			}
		});
	});
	
	//拖拽
	$('#blog').drag($('#blog h2').last());


$('form').eq(2).form('sub').click(function(){
	if(trim($('#blog .title').value()).length!=0 && trim($('#blog .content').value()).length!=0){
		
		
		var _this=this;
		$('#loading').css('display','block').center(200,40);
		$('loading p').html('正在发表，请稍后...');
	
		$(_this).css('backgroundPosition', 'right');
		_this.disabled=true;
		ajax({
				method : 'post',
				url : 'add_blog.php',
				data : $('form').eq(2).serialize(),
				success : function (text) {
					
					if (text == 1) { //
						
						$('#blog .info').html(' ');
						$('#loading').css('display','none');
						$('#success').css('display','block').center(200,40);
						$('#success p').html('发表成功，请稍后...');
						
						setTimeout(function(){
							$('#success').css('display','none');
							$('#blog').hide();
							
							$('form').eq(2).first().reset();
							screen.animate({
								'target':0,
								'attr':'o',
								'type':1,
								'fn':function(){
									screen.unclock();
									
									//获取博文列表
									$('#index').html('<span class="loading"></span>');
									$('index .loading').show();
									
									ajax({
										method:'post',
										url:'get_blog.php',
										data:{
											
											
										},
										success:function(text){
											$('index .loading').show()
											var json=JSON.parse(text);
											var html='';
											for(var i=0;i<3;i++){
												html+='<div class="content"><h2><em>'+json[i].date+'</em>'+json[i].title+'</h2><p>'+json[i].content +'</p>'
											}
											$('#index').html(html)
											
										},
										async:true
									});
									
										}
										});
								},1500);
															
															
							};
							_this.disabled = false;
					 		$(_this).css('backgroundPosition', 'left');
														
					},
								async : true
								});
												
												
											
						}else{
						 $('#blog .info').html('发表失败:标题或内容不得为空!');
											
				}
});


//获取博文列表
$('#index').html('<span class="loading"></span>');
$('index .loading').show()

ajax({
	method:'post',
	url:'get_blog.php',
	success:function(text){
		$('index .loading').show()
		var json=JSON.parse(text);
		var html='';
		for(var i=0;i<3;i++){
			html+='<div class="content"><h2><em>'+json[i].date+'</em>'+json[i].title+'</h2><p>'+json[i].content +'</p>'
		}
		$('#index').html(html)
		
	},
	async:true
});




//换肤弹窗
	$('#skin').center(650,400).resize(function () {
		if ($('#skin').css('display') == 'block') {
			screen.lock();
		}
	});
	
	$('#header .member a').eq(2).click(function () {	
		$('#skin').center(650, 400).show();
		screen.lock().animate({
			attr : 'o',
			target : 30,
			t : 30,
			step : 10
		});
		ajax({
			method:'post',
			url:'get_skin.php',
			data:{
				'type':'all'
			},
			success:function(text){
				var json=JSON.parse(text);
				var html='';
				for(var i=0;i<json.length;i++){
					html+='<dl><dt><img src=images/'+json[i].small_bg+" big_bg="+json[i].big_bg+" bg_color="+json[i].bg_color+'></img></dt><dd>'+json[i].bg_text+'</dd></dl>';
					
				}
				$('#skin .skin_bg').html(html);
				
				$('#skin dl dt img').click(function(){
					$('body').css('background','url(images/'+$(this).attr('big_bg')+') repeat-x'+$(this).attr('bg_color'));
					
					ajax({
						method:'post',
						url:'get_skin.php',
						data : {
							'type' : 'set',
							'big_bg' : $(this).attr('big_bg')
						},
						success:function(text){
						
							if (text == 1) {
								$('#success').show().center(200, 40);
								$('#success p').html('皮肤更换成功...');
								setTimeout(function () {
								$('#success').hide();
						
								}, 1500);
								}
								
						},
						async:true
					});
					
					
				});
			},
			async:true
		});
	});
	$('#skin .close').click(function () {
		$('#skin').hide();
		screen.animate({
			attr : 'o',
			target : 10,
			t : 30,
			step : 10,
			fn : function () {
				
				screen.css('display','none');
				screen.unclock();
			}
		});
	});
	
	//拖拽
	$('#skin').drag($('#skin h2').last());



//默认显示背景

ajax({
	method:'post',
	url:'get_skin.php',
	data:  {
		'type':'main'
	} ,
	success:function(text){
		var json=JSON.parse(text);

		$('body').css('background','url(images/'+json.big_bg+') repeat-x'+json.bg_color);
	},
	async:true
});






















});

