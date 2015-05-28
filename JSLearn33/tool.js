//*****************************************��������
(function () {
	window.sys = {};
	var ua = navigator.userAgent.toLowerCase();	
	var s;		
	(s = ua.match(/msie ([\d.]+)/)) ? sys.ie = s[1] :
	(s = ua.match(/firefox\/([\d.]+)/)) ? sys.firefox = s[1] :
	(s = ua.match(/chrome\/([\d.]+)/)) ? sys.chrome = s[1] : 
	(s = ua.match(/opera\/.*version\/([\d.]+)/)) ? sys.opera = s[1] : 
	(s = ua.match(/version\/([\d.]+).*safari/)) ? sys.safari = s[1] : 0;
})();

//*****************************************DOM����
function addDomLoaded(fn) {
	var isReady = false;
	var timer = null;
	
	function doReady() {
		if (timer) clearInterval(timer);
		if (isReady) return;
		isReady = true;
		fn();
	}
	
	if ((sys.opera && sys.opera < 9) || (sys.firefox && sys.firefox < 3) || (sys.webkit && sys.webkit < 525)) {
		//���۲������֣��������ò�����
		/*timer = setInterval(function () {
			if (/loaded|complete/.test(document.readyState)) { 	//loaded�ǲ��ּ��أ��п���ֻ��DOM������ϣ�complete����ȫ���أ�������onload
				doReady();
			}
		}, 1);*/

		timer = setInterval(function () {
			if (document && document.getElementById && document.getElementsByTagName && document.body) {
				doReady();
			}
		}, 1);
	} else if (document.addEventListener) {//W3C
		addEvent(document, 'DOMContentLoaded', function () {
			fn();
			
			removeEvent(document, 'DOMContentLoaded', arguments.callee);
		});
	} else if (sys.ie && sys.ie < 9){
		var timer = null;
		timer = setInterval(function () {
			try {
				document.documentElement.doScroll('left');
				doReady();
			} catch (e) {};
		}, 1);
	}
}



//alert(sys.chrome)
//******************************************************��������¼���
function addEvent(obj,type,fn){
	if(typeof addEventListener){
		obj.addEventListener(type,fn,false);
	}else {
		//����һ������¼��Ĺ�ϣ��
		
		if(!obj.events){
			obj.events={}
			};
		if(!obj.events[type]){
			obj.events[type]=[];
			if (obj['on' + type]) {
				obj.events[type][0]=fn;
			}
		
		
		}else {
			//ͬһ��ע�ắ���������Σ�����ӵ���������
			if (addEvent.equal(obj.events[type], fn)) return false;
		}
		obj.events[type][addEvent.ID++]=fn;
		//ִ���¼�������
		obj['on' + type] = addEvent.exec;
	}
}

//Ϊÿ���¼�����һ��������ʵ���ۼӣ�������ר�ŵ�addEvent  JS һ�н�Ϊ���������﷨��ȷ
addEvent.ID=1;

//ִ���¼�������
addEvent.exec = function (event) {
	var e = event || addEvent.fixEvent(window.event);
	var es = this.events[e.type];
	for (var i in es) {
		es[i].call(this, e);
	}
};


//ͬһ��ע�ắ����������
addEvent.equal = function (es, fn) {
	for (var i in es) {
		if (es[i] == fn) return true;
	}
	return false;
}

//�������ɾ���¼�
function removeEvent(obj, type, fn) {
	if (typeof obj.removeEventListener != 'undefined') {
		obj.removeEventListener(type, fn, false);
	} else {
		if (obj.events) {
			for (var i in obj.events[type]) {
				if (obj.events[type][i] == fn) {
					delete obj.events[type][i];
				}
			}
		}
	}
}



//��IE���õ�Event������Ե�W3C��ȥ
addEvent.fixEvent = function (event) {
	event.preventDefault = addEvent.fixEvent.preventDefault;
	event.stopPropagation = addEvent.fixEvent.stopPropagation;
	event.target = event.srcElement;
	return event;
};

//IE��ֹĬ����Ϊ
addEvent.fixEvent.preventDefault = function () {
	this.returnValue = false;
};

//IEȡ��ð��
addEvent.fixEvent.stopPropagation = function () {
	this.cancelBubble = true;
};


//���������ȡ�ӿڴ�С
function getInner(){
	if(typeof window.innerwidth != 'undefined'){
		return {
			width:window.innerWidth,
			height:window.innerHeight
		}
	}else{
		return {
			width:document.documentElement.clientWidth,
			height:document.documentElement.clientHeight
		}
	}
}

//���������ȡStyle
function getStyle(element, attr) {
	if (typeof window.getComputedStyle != 'undefined') {//W3C
//	alert(window.getComputedStyle(element, null)[attr])
		return window.getComputedStyle(element, null)[attr];
	} else if (typeof element.currentStyle != 'undeinfed') {//IE
		return element.currentStyle[attr];
	}
}


//�ж�class�Ƿ����
function hasClass(element, className) {
	return element.className.match(new RegExp('(\\s|^)' +className +'(\\s|$)'));
} 

//����������link����
function insertRule(sheet, selectorText, cssText, position){
	if (typeof sheet.insertRule != 'undefined') {
		 sheet.insertRule(selectorText + "{" + cssText + "}", position);
	}
	else if (typeof sheet.addRule != 'undefined') {
			 sheet.addRule(selectorText, cssText, position);
		}
}


//��������Ƴ�link����
function deleteRule(sheet, index) {
	if (typeof sheet.deleteRule != 'undefined') {//W3C
		sheet.deleteRule(index);
	} else if (typeof sheet.removeRule != 'undefined') {//IE
		sheet.removeRule(index);
	}
}


//ɾ�����ո�
function trim(str) {
	return str.replace(/(^\s*)|(\s*$)/g, '');
}

//����������
function scrollTop() {
	document.documentElement.scrollTop = 0;
	document.body.scrollTop = 0;
}


//���������ȡ������λ��
function getScroll(){
	return {
		top : document.documentElement.scrollTop || document.body.scrollTop,
		left : document.documentElement.scrollLeft || document.body.scrollLeft
	}
};
//���������ȡinnertext
function getText(element){
	return (typeof element.textContent=='string')?element.textContent:element.innerText;
	
}
function setText(element,str){
	if (typeof element.textContent == 'string') {
		element.textContent = str;
		} else {
		element.innerText = str;
}
};

//ĳһ��ֵ�Ƿ����ĳһ��������
function inArray(array,value){
	for(var i in array){
		if(array[i]===value) return true;
	}
	return false;

}; 


//��ȡĳһһ��Ԫ�ص�����㶨���λ��

function offsetTop(element){
	var top=element.offsetTop;
	var parent=element.offsetParent;
	while(parent!=null){
		top+=parent.offsetTop;
		parent=parent.offsetParent;
	}
	return top;
}

//��ֹĬ����Ϊ
function predef(e) {
	e.preventDefault();
}

//��ȡĳһ���ڵ����һ���ڵ������

function prevIndex(current,parent){
	var length=parent.children.length;
	
	if(current==0) return length-1;
	return parseInt(current)-1;	
}


function nextIndex(current,parent){
	var length=parent.children.length;
	
	if(current==length-1) return 0;
	return parseInt(current)+1;	
}

function fixedScroll(){
	window.scrollTo(fixedScroll.left,fixedScroll.top);
}

//����cookie
function setCookie(name, value, expires, path, domain, secure) {
	var cookieText = encodeURIComponent(name) + '=' + encodeURIComponent(value);
	if (expires instanceof Date) {
		cookieText += '; expires=' + expires;
	}
	if (path) {
		cookieText += '; expires=' + expires;
	}
	if (domain) {
		cookieText += '; domain=' + domain;
	}
	if (secure) {
		cookieText += '; secure';
	}
	document.cookie = cookieText;
}

//��ȡcookie
function getCookie(name) {
	var cookieName = encodeURIComponent(name) + '=';
	var cookieStart = document.cookie.indexOf(cookieName);
	var cookieValue = null;
	if (cookieStart > -1) {
		var cookieEnd = document.cookie.indexOf(';', cookieStart);
		if (cookieEnd == -1) {
			cookieEnd = document.cookie.length;
		}
		cookieValue = decodeURIComponent(document.cookie.substring(cookieStart + cookieName.length, cookieEnd));
	}
	return cookieValue;
}

//ɾ��cookie
function unsetCookie(name) {
	document.cookie = name + "= ; expires=" + new Date(0);
}


