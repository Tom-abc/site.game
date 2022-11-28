
var com = com||{};


var play = play||{};



var AI = AI||{};

com.init = function (stype){
	
	com.nowStype= stype || com.getCookie("stype") ||"stype1";
	var stype = com.stype[com.nowStype];
	com.width			=	stype.width;		//��������
	com.height			=	stype.height; 		//�����߶�
	com.spaceX			=	stype.spaceX;		//�ŵ�X���
	com.spaceY			=	stype.spaceY;		//�ŵ�Y���
	com.pointStartX		=	stype.pointStartX;	//��һ���ŵ�X����;
	com.pointStartY		=	stype.pointStartY;	//��һ���ŵ�Y����;
	com.page			=	stype.page;			//ͼƬĿ¼
	
	com.get("box").style.width = com.width+130+"px";
	
	com.canvas			=	document.getElementById("chess"); //����
	com.ct				=	com.canvas.getContext("2d") ; 
	com.canvas.width	=	com.width;
	com.canvas.height	=	com.height;
	
	com.childList		=	com.childList||[];
	
	com.loadImages(com.page);		//����ͼƬ/ͼƬĿ¼
	//z(com.initMap.join())
}

//��ʽ
com.stype = {
	stype1:{
		width:325,		//��������
		height:402, 		//�����߶�
		spaceX:35,		//�ŵ�X���
		spaceY:36,		//�ŵ�Y���
		pointStartX:5,		//��һ���ŵ�X����;
		pointStartY:19,		//��һ���ŵ�Y����;
		page:"stype_1"	//ͼƬĿ¼
	},
	stype2:{
		width:530,		//��������
		height:567, 		//�����߶�
		spaceX:57,		//�ŵ�X���
		spaceY:57,		//�ŵ�Y���
		pointStartX:-2,		//��һ���ŵ�X����;
		pointStartY:0,		//��һ���ŵ�Y����;
		page:"stype_2"	//ͼƬĿ¼
	}		
}
//��ȡID
com.get = function (id){
	return document.getElementById(id)
}

function  abc(){  
	com.bg=new com.class.Bg();
	com.dot = new com.class.Dot();
	com.pane=new com.class.Pane();
	com.pane.isShow=false;
	
	com.childList=[com.bg,com.dot,com.pane];	
	com.mans	 ={};		//���Ӽ���
	com.createMans(com.initMap)		//��������	
	com.bg.show();
	com.get("bnBox").style.display = "block";
	//play.init();
	
	com.get("gao").addEventListener("click", function(e) {
			play.isPlay=true ;	
			com.get("moveInfo").style.display = "block";
			com.get("moveInfo").innerHTML="";
			play.depth = 5;
			play.init();
	})
	com.get("superPlay").addEventListener("click", function(e) {
		
		play.isPlay=true ;	
		com.get("moveInfo").style.display = "block";
		com.get("moveInfo").innerHTML="";
		play.depth = 4;
		play.init();
	})
	com.get("tyroPlay").addEventListener("click", function(e) {

			play.isPlay=true ;	
			com.get("moveInfo").style.display = "block";
			com.get("moveInfo").innerHTML="";
			play.depth = 3;
			play.init();
	})
	
	/*com.get("stypeBn").addEventListener("click", function(e) {
		var stype =com.nowStype;
		if (stype=="stype1") stype="stype2";
		else if (stype=="stype2") stype="stype1";
		com.init(stype);
		com.show();
		play.depth = 4;
		play.init();
		document.cookie="stype=" +stype;
		clearInterval(timer);
		var i=0;
		var timer = setInterval(function (){
			com.show();
			if (i++>=5) clearInterval(timer);
		},2000);
	})*/
	
	
}

//����ͼƬ
com.loadImages = function(stype){
	
	//��������
	com.bgImg = new Image();
	com.bgImg.src  = "img/"+stype+"/bg.png";
	
	//��ʾ��
	com.dotImg = new Image();
	com.dotImg.src  = "img/"+stype+"/dot.png";
	
	//����
	for (var i in com.args){
		com[i] = {};
		com[i].img = new Image();
		com[i].img.src = "img/"+stype+"/"+ com.args[i].img +".png";
	}
	
	//�������
	com.paneImg = new Image();
	com.paneImg.src  = "img/"+stype+"/r_box.png";
	
	document.getElementsByTagName("body")[0].style.background= "url(img/"+stype+"/bg.jpg)";
	
}

//��ʾ�б�
com.show = function (){
	com.ct.clearRect(0, 0, com.width, com.height);  
	for (var i=0; i<com.childList.length ; i++){
		com.childList[i].show();
	}
}

//��ʾ�ƶ����������
com.showPane  = function (x,y,newX,newY){
	com.pane.isShow=true;
	com.pane.x= x ;
	com.pane.y= y ;
	com.pane.newX= newX ;
	com.pane.newY= newY ;
}

//����map�����е�����
com.createMans = function(map){
	for (var i=0; i<map.length; i++){
		for (var n=0; n<map[i].length; n++){
			var key = map[i][n];
			if (key){
				com.mans[key]=new com.class.Man(key);
				com.mans[key].x=n;
				com.mans[key].y=i;
				com.childList.push(com.mans[key])
			}
		}
	}
}


//debug alert
com.alert = function (obj,f,n){
	if (typeof obj !== "object") {
		try{console.log(obj)} catch (e){}
		//return alert(obj);
	}
	var arr = [];
	for (var i in obj) arr.push(i+" = "+obj[i]);
	try{console.log(arr.join(n||"\n"))} catch (e){}
	//return alert(arr.join(n||"\n\r"));
}

//com.alert�ļ�д������z�����������
var z = com.alert;

//��ȡԪ�ؾ���ҳ�����ľ���
com.getDomXY = function (dom){
	var left = dom.offsetLeft;
	var top = dom.offsetTop;
	var current = dom.offsetParent;
	while (current !== null){
		left += current.offsetLeft;
		top += current.offsetTop;
		current = current.offsetParent;
	}
	return {x:left,y:top};
}

//���cookie
com.getCookie = function(name){
	if (document.cookie.length>0){
		start=document.cookie.indexOf(name + "=")
		if (start!=-1){ 
			start=start + name.length+1 
			end=document.cookie.indexOf(";",start)
		if (end==-1) end=document.cookie.length
			return unescape(document.cookie.substring(start,end))
		} 
	}
	return false;
}
//��ά�����¡
com.arr2Clone = function (arr){
	var newArr=[];
	for (var i=0; i<arr.length ; i++){	
		newArr[i] = arr[i].slice();
	}
	return newArr;
}

//ajax��������
com.getData = function (url,fun){
	var XMLHttpRequestObject=false;
	if(window.XMLHttpRequest){
		XMLHttpRequestObject=new XMLHttpRequest();
	}else if(window.ActiveXObject){
	XMLHttpRequestObject=new ActiveXObject("Microsoft.XMLHTTP");
	}
	if(XMLHttpRequestObject){
		XMLHttpRequestObject.open("GET",url);
		XMLHttpRequestObject.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
		XMLHttpRequestObject.onreadystatechange=function (){
			if(XMLHttpRequestObject.readyState==4 && XMLHttpRequestObject.status==200){
				fun (XMLHttpRequestObject.responseText)
				//return XMLHttpRequestObject.responseText;
			}
		}
	XMLHttpRequestObject.send();
	}
}

//�����������ŷ�
com.createMove = function (map,x,y,newX,newY){
	var h="";
	var man = com.mans[map[y][x]];
	h+= man.text;
	map[newY][newX] = map[y][x];
	delete map[y][x];
	if (man.my===1){
		var mumTo=["һ","��","��","��","��","��","��","��","��","ʮ"];	
		newX=8-newX;
		h+= mumTo[8-x];
		if (newY > y) {
			h+= "��";
			if (man.pater == "m" || man.pater == "s" || man.pater == "x"){
				h+= mumTo[newX];
			}else {
				h+= mumTo[newY - y -1];
			}
		}else if (newY < y) {
			h+= "��";
			if (man.pater == "m" || man.pater == "s" || man.pater == "x"){
				h+= mumTo[newX];
			}else {
				h+= mumTo[y - newY -1];
			}
		}else {
			h+= "ƽ";
			h+= mumTo[newX];
		}
	}else{
		var mumTo=["��","��","��","��","��","��","��","��","��","10"];
		h+= mumTo[x];
		if (newY > y) {
			h+= "��";
			if (man.pater == "M" || man.pater == "S" || man.pater == "X"){
				h+= mumTo[newX];
			}else {
				h+= mumTo[newY - y-1];
			}
		}else if (newY < y) {
			h+= "��";
			if (man.pater == "M" || man.pater == "S" || man.pater == "X"){
				h+= mumTo[newX];
			}else {
				h+= mumTo[y - newY-1];
			}
		}else {
			h+= "ƽ";
			h+= mumTo[newX];
		}
	}
	return h;
}

com.initMap = [
	['C0','M0','X0','S0','J0','S1','X1','M1','C1'],
	[    ,    ,    ,    ,    ,    ,    ,    ,    ],
	[    ,'P0',    ,    ,    ,    ,    ,'P1',    ],
	['Z0',    ,'Z1',    ,'Z2',    ,'Z3',    ,'Z4'],
	[    ,    ,    ,    ,    ,    ,    ,    ,    ],
	[    ,    ,    ,    ,    ,    ,    ,    ,    ],
	['z0',    ,'z1',    ,'z2',    ,'z3',    ,'z4'],
	[    ,'p0',    ,    ,    ,    ,    ,'p1',    ],
	[    ,    ,    ,    ,    ,    ,    ,    ,    ],
	['c0','m0','x0','s0','j0','s1','x1','m1','c1']
];



com.initMap1 = [
	[    ,    ,    ,, "J0"   ,    ,    ,    ,    ],
	[    ,    ,    ,    ,    ,    ,    ,    ,    ],
	[    ,    ,    ,    ,    ,"c0",    ,    ,    ],
	[    ,    ,    ,    ,    ,    ,    ,    ,    ],
	[    ,    ,    ,    ,    ,    ,    ,    ,    ],
	[    ,    ,    ,    ,    ,    ,    ,    ,    ],
	[    ,    ,    ,    ,    ,    ,    ,    ,    ],
	[    ,    ,    ,    ,    ,	  ,    ,    ,    ],
	[    ,    ,    ,    ,"s0",    ,    ,"C0",    ],
	[    ,    ,    ,"s1",    ,"j0",    ,    ,    ]
];

com.initMap1 = [
	[    ,    ,    ,, "J0"   ,    ,    ,    ,    ],
	[    ,    ,    ,    ,    , ,    ,    ,    ],
	[    ,    ,    ,    ,    ,"z0",    ,    ,    ],
	[    ,    ,    ,    ,    ,    ,    ,    ,    ],
	[    ,    ,    ,    ,    ,    ,    ,    ,    ],
	[    ,    ,    ,    ,    ,    ,    ,    ,    ],
	[    ,    ,    ,    ,    ,    ,    ,    ,    ],
	[    ,    ,    ,    ,    ,	  ,    ,    ,    ],
	[    ,    ,    ,    ,    ,    ,    ,    ,    ],
	[    ,    ,    , "j0"   ,,    ,    ,    ]
];

com.keys = {
	"c0":"c","c1":"c",
	"m0":"m","m1":"m",
	"x0":"x","x1":"x",
	"s0":"s","s1":"s",
	"j0":"j",
	"p0":"p","p1":"p",
	"z0":"z","z1":"z","z2":"z","z3":"z","z4":"z","z5":"z",
	
	"C0":"c","C1":"C",
	"M0":"M","M1":"M",
	"X0":"X","X1":"X",
	"S0":"S","S1":"S",
	"J0":"J",
	"P0":"P","P1":"P",
	"Z0":"Z","Z1":"Z","Z2":"Z","Z3":"Z","Z4":"Z","Z5":"Z",
}

//�������ߵ��ŵ�
com.bylaw ={}
//��
com.bylaw.c = function (x,y,map,my){
	var d=[];
	//������
	for (var i=x-1; i>= 0; i--){
		if (map[y][i]) {
			if (com.mans[map[y][i]].my!=my) d.push([i,y]);
			break
		}else{
			d.push([i,y])	
		}
	}
	//�Ҳ����
	for (var i=x+1; i <= 8; i++){
		if (map[y][i]) {
			if (com.mans[map[y][i]].my!=my) d.push([i,y]);
			break
		}else{
			d.push([i,y])	
		}
	}
	//�ϼ���
	for (var i = y-1 ; i >= 0; i--){
		if (map[i][x]) {
			if (com.mans[map[i][x]].my!=my) d.push([x,i]);
			break
		}else{
			d.push([x,i])	
		}
	}
	//�¼���
	for (var i = y+1 ; i<= 9; i++){
		if (map[i][x]) {
			if (com.mans[map[i][x]].my!=my) d.push([x,i]);
			break
		}else{
			d.push([x,i])	
		}
	}
	return d;
}

//��
com.bylaw.m = function (x,y,map,my){
	var d=[];
		//1��
		if ( y-2>= 0 && x+1<= 8 && !play.map[y-1][x] &&(!com.mans[map[y-2][x+1]] || com.mans[map[y-2][x+1]].my!=my)) d.push([x+1,y-2]);
		//2��
		if ( y-1>= 0 && x+2<= 8 && !play.map[y][x+1] &&(!com.mans[map[y-1][x+2]] || com.mans[map[y-1][x+2]].my!=my)) d.push([x+2,y-1]);
		//4��
		if ( y+1<= 9 && x+2<= 8 && !play.map[y][x+1] &&(!com.mans[map[y+1][x+2]] || com.mans[map[y+1][x+2]].my!=my)) d.push([x+2,y+1]);
		//5��
		if ( y+2<= 9 && x+1<= 8 && !play.map[y+1][x] &&(!com.mans[map[y+2][x+1]] || com.mans[map[y+2][x+1]].my!=my)) d.push([x+1,y+2]);
		//7��
		if ( y+2<= 9 && x-1>= 0 && !play.map[y+1][x] &&(!com.mans[map[y+2][x-1]] || com.mans[map[y+2][x-1]].my!=my)) d.push([x-1,y+2]);
		//8��
		if ( y+1<= 9 && x-2>= 0 && !play.map[y][x-1] &&(!com.mans[map[y+1][x-2]] || com.mans[map[y+1][x-2]].my!=my)) d.push([x-2,y+1]);
		//10��
		if ( y-1>= 0 && x-2>= 0 && !play.map[y][x-1] &&(!com.mans[map[y-1][x-2]] || com.mans[map[y-1][x-2]].my!=my)) d.push([x-2,y-1]);
		//11��
		if ( y-2>= 0 && x-1>= 0 && !play.map[y-1][x] &&(!com.mans[map[y-2][x-1]] || com.mans[map[y-2][x-1]].my!=my)) d.push([x-1,y-2]);

	return d;
}

//��
com.bylaw.x = function (x,y,map,my){
	var d=[];
	if (my===1){ //�췽
		//4���
		if ( y+2<= 9 && x+2<= 8 && !play.map[y+1][x+1] && (!com.mans[map[y+2][x+2]] || com.mans[map[y+2][x+2]].my!=my)) d.push([x+2,y+2]);
		//7���
		if ( y+2<= 9 && x-2>= 0 && !play.map[y+1][x-1] && (!com.mans[map[y+2][x-2]] || com.mans[map[y+2][x-2]].my!=my)) d.push([x-2,y+2]);
		//1���
		if ( y-2>= 5 && x+2<= 8 && !play.map[y-1][x+1] && (!com.mans[map[y-2][x+2]] || com.mans[map[y-2][x+2]].my!=my)) d.push([x+2,y-2]);
		//10���
		if ( y-2>= 5 && x-2>= 0 && !play.map[y-1][x-1] && (!com.mans[map[y-2][x-2]] || com.mans[map[y-2][x-2]].my!=my)) d.push([x-2,y-2]);
	}else{
		//4���
		if ( y+2<= 4 && x+2<= 8 && !play.map[y+1][x+1] && (!com.mans[map[y+2][x+2]] || com.mans[map[y+2][x+2]].my!=my)) d.push([x+2,y+2]);
		//7���
		if ( y+2<= 4 && x-2>= 0 && !play.map[y+1][x-1] && (!com.mans[map[y+2][x-2]] || com.mans[map[y+2][x-2]].my!=my)) d.push([x-2,y+2]);
		//1���
		if ( y-2>= 0 && x+2<= 8 && !play.map[y-1][x+1] && (!com.mans[map[y-2][x+2]] || com.mans[map[y-2][x+2]].my!=my)) d.push([x+2,y-2]);
		//10���
		if ( y-2>= 0 && x-2>= 0 && !play.map[y-1][x-1] && (!com.mans[map[y-2][x-2]] || com.mans[map[y-2][x-2]].my!=my)) d.push([x-2,y-2]);
	}
	return d;
}

//ʿ
com.bylaw.s = function (x,y,map,my){
	var d=[];
	if (my===1){ //�췽
		//4���
		if ( y+1<= 9 && x+1<= 5 && (!com.mans[map[y+1][x+1]] || com.mans[map[y+1][x+1]].my!=my)) d.push([x+1,y+1]);
		//7���
		if ( y+1<= 9 && x-1>= 3 && (!com.mans[map[y+1][x-1]] || com.mans[map[y+1][x-1]].my!=my)) d.push([x-1,y+1]);
		//1���
		if ( y-1>= 7 && x+1<= 5 && (!com.mans[map[y-1][x+1]] || com.mans[map[y-1][x+1]].my!=my)) d.push([x+1,y-1]);
		//10���
		if ( y-1>= 7 && x-1>= 3 && (!com.mans[map[y-1][x-1]] || com.mans[map[y-1][x-1]].my!=my)) d.push([x-1,y-1]);
	}else{
		//4���
		if ( y+1<= 2 && x+1<= 5 && (!com.mans[map[y+1][x+1]] || com.mans[map[y+1][x+1]].my!=my)) d.push([x+1,y+1]);
		//7���
		if ( y+1<= 2 && x-1>= 3 && (!com.mans[map[y+1][x-1]] || com.mans[map[y+1][x-1]].my!=my)) d.push([x-1,y+1]);
		//1���
		if ( y-1>= 0 && x+1<= 5 && (!com.mans[map[y-1][x+1]] || com.mans[map[y-1][x+1]].my!=my)) d.push([x+1,y-1]);
		//10���
		if ( y-1>= 0 && x-1>= 3 && (!com.mans[map[y-1][x-1]] || com.mans[map[y-1][x-1]].my!=my)) d.push([x-1,y-1]);
	}
	return d;
		
}

//��
com.bylaw.j = function (x,y,map,my){
	var d=[];
	var isNull=(function (y1,y2){
		var y1=com.mans["j0"].y;
		var x1=com.mans["J0"].x;
		var y2=com.mans["J0"].y;
		for (var i=y1-1; i>y2; i--){
			if (map[i][x1]) return false;
		}
		return true;
	})();
	
	if (my===1){ //�췽
		//��
		if ( y+1<= 9  && (!com.mans[map[y+1][x]] || com.mans[map[y+1][x]].my!=my)) d.push([x,y+1]);
		//��
		if ( y-1>= 7 && (!com.mans[map[y-1][x]] || com.mans[map[y-1][x]].my!=my)) d.push([x,y-1]);
		//�Ͻ����Ͻ������
		if ( com.mans["j0"].x == com.mans["J0"].x &&isNull) d.push([com.mans["J0"].x,com.mans["J0"].y]);
		
	}else{
		//��
		if ( y+1<= 2  && (!com.mans[map[y+1][x]] || com.mans[map[y+1][x]].my!=my)) d.push([x,y+1]);
		//��
		if ( y-1>= 0 && (!com.mans[map[y-1][x]] || com.mans[map[y-1][x]].my!=my)) d.push([x,y-1]);
		//�Ͻ����Ͻ������
		if ( com.mans["j0"].x == com.mans["J0"].x &&isNull) d.push([com.mans["j0"].x,com.mans["j0"].y]);
	}
	//��
	if ( x+1<= 5  && (!com.mans[map[y][x+1]] || com.mans[map[y][x+1]].my!=my)) d.push([x+1,y]);
	//��
	if ( x-1>= 3 && (!com.mans[map[y][x-1]] || com.mans[map[y][x-1]].my!=my))d.push([x-1,y]);
	return d;
}

//��
com.bylaw.p = function (x,y,map,my){
	var d=[];
	//������
	var n=0;
	for (var i=x-1; i>= 0; i--){
		if (map[y][i]) {
			if (n==0){
				n++;
				continue;
			}else{
				if (com.mans[map[y][i]].my!=my) d.push([i,y]);
				break	
			}
		}else{
			if(n==0) d.push([i,y])	
		}
	}
	//�Ҳ����
	var n=0;
	for (var i=x+1; i <= 8; i++){
		if (map[y][i]) {
			if (n==0){
				n++;
				continue;
			}else{
				if (com.mans[map[y][i]].my!=my) d.push([i,y]);
				break	
			}
		}else{
			if(n==0) d.push([i,y])	
		}
	}
	//�ϼ���
	var n=0;
	for (var i = y-1 ; i >= 0; i--){
		if (map[i][x]) {
			if (n==0){
				n++;
				continue;
			}else{
				if (com.mans[map[i][x]].my!=my) d.push([x,i]);
				break	
			}
		}else{
			if(n==0) d.push([x,i])	
		}
	}
	//�¼���
	var n=0;
	for (var i = y+1 ; i<= 9; i++){
		if (map[i][x]) {
			if (n==0){
				n++;
				continue;
			}else{
				if (com.mans[map[i][x]].my!=my) d.push([x,i]);
				break	
			}
		}else{
			if(n==0) d.push([x,i])	
		}
	}
	return d;
}

//��
com.bylaw.z = function (x,y,map,my){
	var d=[];
	if (my===1){ //�췽
		//��
		if ( y-1>= 0 && (!com.mans[map[y-1][x]] || com.mans[map[y-1][x]].my!=my)) d.push([x,y-1]);
		//��
		if ( x+1<= 8 && y<=4  && (!com.mans[map[y][x+1]] || com.mans[map[y][x+1]].my!=my)) d.push([x+1,y]);
		//��
		if ( x-1>= 0 && y<=4 && (!com.mans[map[y][x-1]] || com.mans[map[y][x-1]].my!=my))d.push([x-1,y]);
	}else{
		//��
		if ( y+1<= 9  && (!com.mans[map[y+1][x]] || com.mans[map[y+1][x]].my!=my)) d.push([x,y+1]);
		//��
		if ( x+1<= 8 && y>=6  && (!com.mans[map[y][x+1]] || com.mans[map[y][x+1]].my!=my)) d.push([x+1,y]);
		//��
		if ( x-1>= 0 && y>=6 && (!com.mans[map[y][x-1]] || com.mans[map[y][x-1]].my!=my))d.push([x-1,y]);
	}
	
	return d;
}

com.value = {
	
	//����ֵ
	c:[
		[206, 208, 207, 213, 214, 213, 207, 208, 206],
		[206, 212, 209, 216, 233, 216, 209, 212, 206],
		[206, 208, 207, 214, 216, 214, 207, 208, 206],
		[206, 213, 213, 216, 216, 216, 213, 213, 206],
		[208, 211, 211, 214, 215, 214, 211, 211, 208],
		
		[208, 212, 212, 214, 215, 214, 212, 212, 208],
		[204, 209, 204, 212, 214, 212, 204, 209, 204],
		[198, 208, 204, 212, 212, 212, 204, 208, 198],
		[200, 208, 206, 212, 200, 212, 206, 208, 200],
		[194, 206, 204, 212, 200, 212, 204, 206, 194]
	],
	
	//����ֵ
	m:[
		[90, 90, 90, 96, 90, 96, 90, 90, 90],
		[90, 96,103, 97, 94, 97,103, 96, 90],
		[92, 98, 99,103, 99,103, 99, 98, 92],
		[93,108,100,107,100,107,100,108, 93],
		[90,100, 99,103,104,103, 99,100, 90],
		
		[90, 98,101,102,103,102,101, 98, 90],
		[92, 94, 98, 95, 98, 95, 98, 94, 92],
		[93, 92, 94, 95, 92, 95, 94, 92, 93],
		[85, 90, 92, 93, 78, 93, 92, 90, 85],
		[88, 85, 90, 88, 90, 88, 90, 85, 88]
	],
	
	//���ֵ
	x:[
		[0, 0,20, 0, 0, 0,20, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0,23, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0,20, 0, 0, 0,20, 0, 0],
		
		[0, 0,20, 0, 0, 0,20, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0],
		[18,0, 0, 0,23, 0, 0, 0,18],
		[0, 0, 0, 0, 0, 0, 0, 0, 0], 
		[0, 0,20, 0, 0, 0,20, 0, 0]
	],
	
	//ʿ��ֵ
	s:[
		[0, 0, 0,20, 0,20, 0, 0, 0],
		[0, 0, 0, 0,23, 0, 0, 0, 0],
		[0, 0, 0,20, 0,20, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0],
		
		[0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0,20, 0,20, 0, 0, 0],
		[0, 0, 0, 0,23, 0, 0, 0, 0], 
		[0, 0, 0,20, 0,20, 0, 0, 0]
	],
	
	//����ֵ
	j:[
		[0, 0, 0, 8888, 8888, 8888, 0, 0, 0],
		[0, 0, 0, 8888, 8888, 8888, 0, 0, 0], 
		[0, 0, 0, 8888, 8888, 8888, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0],
		
		[0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 8888, 8888, 8888, 0, 0, 0],
		[0, 0, 0, 8888, 8888, 8888, 0, 0, 0], 
		[0, 0, 0, 8888, 8888, 8888, 0, 0, 0]
	],
	
	//�ڼ�ֵ
	p:[
		
		[100, 100,  96, 91,  90, 91,  96, 100, 100],
		[ 98,  98,  96, 92,  89, 92,  96,  98,  98],
		[ 97,  97,  96, 91,  92, 91,  96,  97,  97],
		[ 96,  99,  99, 98, 100, 98,  99,  99,  96],
		[ 96,  96,  96, 96, 100, 96,  96,  96,  96], 
		
		[ 95,  96,  99, 96, 100, 96,  99,  96,  95],
		[ 96,  96,  96, 96,  96, 96,  96,  96,  96],
		[ 97,  96, 100, 99, 101, 99, 100,  96,  97],
		[ 96,  97,  98, 98,  98, 98,  98,  97,  96],
		[ 96,  96,  97, 99,  99, 99,  97,  96,  96]
	],
	
	//���ֵ
	z:[
		[ 9,  9,  9, 11, 13, 11,  9,  9,  9],
		[19, 24, 34, 42, 44, 42, 34, 24, 19],
		[19, 24, 32, 37, 37, 37, 32, 24, 19],
		[19, 23, 27, 29, 30, 29, 27, 23, 19],
		[14, 18, 20, 27, 29, 27, 20, 18, 14],
		
		[ 7,  0, 13,  0, 16,  0, 13,  0,  7],
		[ 7,  0,  7,  0, 15,  0,  7,  0,  7], 
		[ 0,  0,  0,  0,  0,  0,  0,  0,  0],
		[ 0,  0,  0,  0,  0,  0,  0,  0,  0],
		[ 0,  0,  0,  0,  0,  0,  0,  0,  0]
	]
}

//����Ϊ���ּ�ֵλ�õĵ���
com.value.C = com.arr2Clone(com.value.c).reverse();
com.value.M = com.arr2Clone(com.value.m).reverse();
com.value.X = com.value.x;
com.value.S = com.value.s;
com.value.J = com.value.j;
com.value.P = com.arr2Clone(com.value.p).reverse();
com.value.Z = com.arr2Clone(com.value.z).reverse();

//������
com.args={
	//���� ����/ͼƬ��ַ/��Ӫ/Ȩ��
	'c':{text:"��", img:'r_c', my:1 ,bl:"c", value:com.value.c},
	'm':{text:"��", img:'r_m', my:1 ,bl:"m", value:com.value.m},
	'x':{text:"��", img:'r_x', my:1 ,bl:"x", value:com.value.x},
	's':{text:"��", img:'r_s', my:1 ,bl:"s", value:com.value.s},
	'j':{text:"��", img:'r_j', my:1 ,bl:"j", value:com.value.j},
	'p':{text:"��", img:'r_p', my:1 ,bl:"p", value:com.value.p},
	'z':{text:"��", img:'r_z', my:1 ,bl:"z", value:com.value.z},
	
	//����
	'C':{text:"܇", img:'b_c', my:-1 ,bl:"c", value:com.value.C},
	'M':{text:"�R", img:'b_m', my:-1 ,bl:"m", value:com.value.M},
	'X':{text:"��", img:'b_x', my:-1 ,bl:"x", value:com.value.X},
	'S':{text:"ʿ", img:'b_s', my:-1 ,bl:"s", value:com.value.S},
	'J':{text:"˧", img:'b_j', my:-1 ,bl:"j", value:com.value.J},
	'P':{text:"��", img:'b_p', my:-1 ,bl:"p", value:com.value.P},
	'Z':{text:"��", img:'b_z', my:-1 ,bl:"z", value:com.value.Z}
};

com.class = com.class || {} //��
com.class.Man = function (key, x, y){
	this.pater = key.slice(0,1);
	var o=com.args[this.pater]
	this.x = x||0;   
    this.y = y||0;
	this.key = key ;
	this.my = o.my;
	this.text = o.text;
	this.value = o.value;
	this.isShow = true;
	this.alpha = 1;
	this.ps = []; //�ŵ�
	
	this.show = function (){
		if (this.isShow) {
			com.ct.save();
			com.ct.globalAlpha = this.alpha;
			com.ct.drawImage(com[this.pater].img,com.spaceX * this.x + com.pointStartX , com.spaceY *  this.y +com.pointStartY);
			com.ct.restore(); 
		}
	}
	
	this.bl = function (map){
		var map = map || play.map
		return com.bylaw[o.bl](this.x,this.y,map,this.my)
	}
}

com.class.Bg = function (img, x, y){
	this.x = x||0; 
    this.y = y||0;
	this.isShow = true;
	
	this.show = function (){
		if (this.isShow) com.ct.drawImage(com.bgImg, com.spaceX * this.x,com.spaceY *  this.y);
	}
}
com.class.Pane = function (img, x, y){
	this.x = x||0; 
    this.y = y||0;
	this.newX = x||0; 
    this.newY = y||0;
	this.isShow = true;
	
	this.show = function (){
		if (this.isShow) {
			com.ct.drawImage(com.paneImg, com.spaceX * this.x + com.pointStartX , com.spaceY *  this.y + com.pointStartY)
			com.ct.drawImage(com.paneImg, com.spaceX * this.newX + com.pointStartX  , com.spaceY *  this.newY + com.pointStartY)
		}
	}
}

com.class.Dot = function (img, x, y){
	this.x = x||0; 
    this.y = y||0;
	this.isShow = true;
	this.dots=[]
	
	this.show = function (){
		for (var i=0; i<this.dots.length;i++){
			if (this.isShow) com.ct.drawImage(com.dotImg, com.spaceX * this.dots[i][0]+10  + com.pointStartX ,com.spaceY *  this.dots[i][1]+10 + com.pointStartY)
		}
	}
}

com.init();



play.init = function (){
	
	play.my				=	1;				//��ҷ�?
	play.map 			=	com.arr2Clone (com.initMap);		//��ʼ������
	play.nowManKey		=	false;			//����Ҫ����������
	play.pace 			=	[];				//��¼ÿһ��
	play.isPlay 		=	true ;			//�Ƿ�������
	play.mans 			=	com.mans;
	play.bylaw 			= 	com.bylaw;
	play.show 			= 	com.show;
	play.showPane 		= 	com.showPane;
	play.isOffensive	=	true;			//�Ƿ�����
	play.depth			=	play.depth || 3;				//�������?
	
	play.isFoul			=	false;	//�Ƿ񷸹泤��
	
	
	
	com.pane.isShow		=	 false;			//���ط���
	
	//��ʼ������
	for (var i=0; i<play.map.length; i++){
		for (var n=0; n<play.map[i].length; n++){
			var key = play.map[i][n];
			if (key){
				com.mans[key].x=n;
				com.mans[key].y=i;
				com.mans[key].isShow = true;
			}
		}
	}
	play.show();
	
	//�󶨵���¼�?
	com.canvas.addEventListener("click",play.clickCanvas)
	com.get("bnBox").style="display:none"
	//clearInterval(play.timer);
	//com.get("autoPlay").addEventListener("click", function(e) {
		//clearInterval(play.timer);
		//play.timer = setInterval("play.AIPlay()",1000);
	//	play.AIPlay()
	//})
	/*
	com.get("offensivePlay").addEventListener("click", function(e) {
		play.isOffensive=true;
		play.isPlay=true ;	
		com.get("chessRight").style.display = "none";
		play.init();
	})
	
	com.get("defensivePlay").addEventListener("click", function(e) {
		play.isOffensive=false;
		play.isPlay=true ;	
		com.get("chessRight").style.display = "none";
		play.init();
	})
	*/
	
	
	
	/*
	var initTime = new Date().getTime();
	for (var i=0; i<=100000; i++){
		
		var h=""
		var h=play.map.join();
		//for (var n in play.mans){
		//	if (play.mans[n].show) h+=play.mans[n].key+play.mans[n].x+play.mans[n].y
		//}
	}
	var nowTime= new Date().getTime();
	z([h,nowTime-initTime])
	*/
	
}



//����
play.regret = function (){
	var map  = com.arr2Clone(com.initMap);
	//��ʼ����������
	for (var i=0; i<map.length; i++){
		for (var n=0; n<map[i].length; n++){
			var key = map[i][n];
			if (key){
				com.mans[key].x=n;
				com.mans[key].y=i;
				com.mans[key].isShow = true;
			}
		}
	}
	var pace= play.pace;
	pace.pop();
	pace.pop();
	
	for (var i=0; i<pace.length; i++){
		var p= pace[i].split("")
		var x = parseInt(p[0], 10);
		var y = parseInt(p[1], 10);
		var newX = parseInt(p[2], 10);
		var newY = parseInt(p[3], 10);
		var key=map[y][x];
		//try{
	 
		var cMan=map[newY][newX];
		if (cMan) com.mans[map[newY][newX]].isShow = false;
		com.mans[key].x = newX;
		com.mans[key].y = newY;
		map[newY][newX] = key;
		delete map[y][x];
		if (i==pace.length-1){
			com.showPane(newX ,newY,x,y)	
		}
		//} catch (e){
		//	com.show()
		//	z([key,p,pace,map])
			
		//	}
	}
	play.map = map;
	play.my=1;
	play.isPlay=true;
	com.show();
}

play.AIPlay = function (){
	//return
	play.my = -1 ;
	var pace=AI.init(play.pace.join(""))
	if (!pace) {
		play.showWin (1);
		return ;
	}
	play.pace.push(pace.join(""));
	var key=play.map[pace[1]][pace[0]]
		play.nowManKey = key;
	
	var key=play.map[pace[3]][pace[2]];
	if (key){
		play.AIclickMan(key,pace[2],pace[3]);	
	}else {
		play.AIclickPoint(pace[2],pace[3]);	
	}
	
}

//��������¼�?
play.clickCanvas = function (e){
	if (!play.isPlay) return false;
	var key = play.getClickMan(e);
	var point = play.getClickPoint(e);
	
	var x = point.x;
	var y = point.y;
	
	if (key){
		play.clickMan(key,x,y);	
	}else {
		play.clickPoint(x,y);	
	}
	play.isFoul = play.checkFoul();//����ǲ��ǳ���?
}

//������ӣ����������ѡ�л��߳���
play.clickMan = function (key,x,y){
	var man = com.mans[key];
	//����
	if (play.nowManKey&&play.nowManKey != key && man.my != com.mans[play.nowManKey ].my){
		//manΪ���Ե�������
		if (play.indexOfPs(com.mans[play.nowManKey].ps,[x,y])){
			man.isShow = false;
			var pace=com.mans[play.nowManKey].x+""+com.mans[play.nowManKey].y
			//z(bill.createMove(play.map,man.x,man.y,x,y))
			delete play.map[com.mans[play.nowManKey].y][com.mans[play.nowManKey].x];
			play.map[y][x] = play.nowManKey;
			com.showPane(com.mans[play.nowManKey].x ,com.mans[play.nowManKey].y,x,y)
			com.mans[play.nowManKey].x = x;
			com.mans[play.nowManKey].y = y;
			com.mans[play.nowManKey].alpha = 1
			
			play.pace.push(pace+x+y);
			play.nowManKey = false;
			com.pane.isShow = false;
			com.dot.dots = [];
			com.show()
			setTimeout("play.AIPlay()",500);
			if (key == "j0") play.showWin (-1);
			if (key == "J0") play.showWin (1);
		}
	// ѡ������
	}else{
		if (man.my===1){
			if (com.mans[play.nowManKey]) com.mans[play.nowManKey].alpha = 1 ;
			man.alpha = 0.6;
			com.pane.isShow = false;
			play.nowManKey = key;
			com.mans[key].ps = com.mans[key].bl(); //����������ŵ�?
			com.dot.dots = com.mans[key].ps
			com.show();
		}
	}
}

//����ŵ�?
play.clickPoint = function (x,y){
	var key=play.nowManKey;
	var man=com.mans[key];
	if (play.nowManKey){
		if (play.indexOfPs(com.mans[key].ps,[x,y])){
			var pace=man.x+""+man.y
			//z(bill.createMove(play.map,man.x,man.y,x,y))
			delete play.map[man.y][man.x];
			play.map[y][x] = key;
			com.showPane(man.x ,man.y,x,y)
			man.x = x;
			man.y = y;
			man.alpha = 1;
			play.pace.push(pace+x+y);
			play.nowManKey = false;
			com.dot.dots = [];
			com.show();
			setTimeout("play.AIPlay()",500);
		}else{
			//alert("������ô��Ŷ��")	
		}
	}
	
}

//Ai�Զ�����


//����Ƿ񳤽�?
play.checkFoul = function(){
	var p=play.pace;
	var len=parseInt(p.length,10);
	if (len>11&&p[len-1] == p[len-5] &&p[len-5] == p[len-9]){
		return p[len-4].split("");
	}
	return false;
}



play.AIclickMan = function (key,x,y){
	var man = com.mans[key];
	//����
	man.isShow = false;
	delete play.map[com.mans[play.nowManKey].y][com.mans[play.nowManKey].x];
	play.map[y][x] = play.nowManKey;
	play.showPane(com.mans[play.nowManKey].x ,com.mans[play.nowManKey].y,x,y)
	
	com.mans[play.nowManKey].x = x;
	com.mans[play.nowManKey].y = y;
	play.nowManKey = false;
	
	com.show()
	if (key == "j0") play.showWin (-1);
	if (key == "J0") play.showWin (1);
}

play.AIclickPoint = function (x,y){
	var key=play.nowManKey;
	var man=com.mans[key];
	if (play.nowManKey){
		delete play.map[com.mans[play.nowManKey].y][com.mans[play.nowManKey].x];
		play.map[y][x] = key;
		
		com.showPane(man.x,man.y,x,y)
		
	
		man.x = x;
		man.y = y;
		play.nowManKey = false;
		
	}
	com.show();
}


play.indexOfPs = function (ps,xy){
	for (var i=0; i<ps.length; i++){
		if (ps[i][0]==xy[0]&&ps[i][1]==xy[1]) return true;
	}
	return false;
	
}

//��õ�����ŵ�
play.getClickPoint = function (e){
	var domXY = com.getDomXY(com.canvas);
	var x=Math.round((e.pageX-domXY.x-com.pointStartX-20)/com.spaceX)
	var y=Math.round((e.pageY-domXY.y-com.pointStartY-20)/com.spaceY)
	return {"x":x,"y":y}
}

//�������?
play.getClickMan = function (e){
	var clickXY=play.getClickPoint(e);
	var x=clickXY.x;
	var y=clickXY.y;
	if (x < 0 || x>8 || y < 0 || y > 9) return false;
	return (play.map[y][x] && play.map[y][x]!="0") ? play.map[y][x] : false;
}

play.showWin = function (my){
	play.isPlay = false;
	if (my===1){
		alert("You won!");
	}else{
		alert("You lost!");
	}
}


AI.historyTable	=	{};		//��ʷ��


//�˹����ܳ�ʼ��
AI.init = function(pace){
	com.getData("js/gambit.all.js",
		function(data){
		com.gambit=data.split(" ");
		AI.historyBill = com.gambit;
	})
	com.getData("js/store.js",
		function(data){
		com.store=data.split(" ");
	})
	
	var bill = AI.historyBill || com.gambit; //���ֿ�
	if (bill.length){
		var len=pace.length;
		var arr=[];
		//����������
		for (var i=0;i< bill.length;i++){
			if (bill[i].slice(0,len)==pace) {
			arr.push(bill[i]);
			}
		}
		if (arr.length){
			var inx=Math.floor( Math.random() * arr.length );
			AI.historyBill = arr ;
			return arr[inx].slice(len,len+4).split("");
		}else{
			AI.historyBill = [] ;
		}
		
	}
	 //�����������û�У��˹����ܿ�ʼ����
	var initTime = new Date().getTime();
	AI.treeDepth=play.depth;
	//AI.treeDepth=4;
	
	AI.number=0;
	AI.setHistoryTable.lenght = 0

	var val=AI.getAlphaBeta(-99999 ,99999, AI.treeDepth, com.arr2Clone(play.map),play.my);
	//var val = AI.iterativeSearch(com.arr2Clone(play.map),play.my)
	if (!val||val.value==-8888) {
		AI.treeDepth=2;
		val=AI.getAlphaBeta(-99999 ,99999, AI.treeDepth, com.arr2Clone(play.map),play.my);
	}
	//var val = AI.iterativeSearch(com.arr2Clone(play.map),play.my);
	if (val&&val.value!=-8888) {
		var man = play.mans[val.key];
		var nowTime= new Date().getTime();
		/*com.get("moveInfo").innerHTML='<h3>AI���������</h3>����ŷ���'+
										com.createMove(com.arr2Clone(play.map),man.x,man.y,val.x,val.y)+
										'<br />������ȣ�'+AI.treeDepth+'<br />������֧��'+
										AI.number+'�� <br />����ŷ�������'+
										val.value+'��'+
										' <br />������ʱ��'+
										(nowTime-initTime)+'����'*/
		return [man.x,man.y,val.x,val.y]
	}else {
		return false;	
	}
}


//�������������ŷ�
AI.iterativeSearch = function (map, my){
	var timeOut=100;
	var initDepth = 1;
	var maxDepth = 8;
	AI.treeDepth=0;
	var initTime = new Date().getTime();
	var val = {};
	for (var i=initDepth; i<=maxDepth; i++){
		var nowTime= new Date().getTime();
		AI.treeDepth=i;
		AI.aotuDepth=i;
		var val = AI.getAlphaBeta(-99999, 99999, AI.treeDepth , map ,my)
		if (nowTime-initTime > timeOut){
			return val;
		}
	}
	return false;
}

//ȡ����������������
AI.getMapAllMan = function (map, my){
	var mans=[];
	for (var i=0; i<map.length; i++){
		for (var n=0; n<map[i].length; n++){
			var key = map[i][n];
			if (key && play.mans[key].my == my){
				play.mans[key].x = n;
				play.mans[key].y = i;
				mans.push(play.mans[key])
			}
		}
	}
	return mans;
}

/*
//ȡ���������м������ӵ��ŷ�
AI.getMoves = function (map, my, txtMap){
	var highMores = [];   //���ȼ��ߵ��ŷ�
	var manArr = AI.getMapAllMan (map, my);
	var moves = [];
	var history=AI.historyTable[txtMap];
	for (var i=0; i<manArr.length; i++){
		var man = manArr[i];
		var val=man.bl(map);
		for (var n=0; n<val.length; n++){
			if (history){
				highMores.push([man.x,man.y,val[n][0],val[n][1],man.key])
			}else{
				moves.push([man.x,man.y,val[n][0],val[n][1],man.key])
			}
		}
	}
	return highMores.concat(moves);
}
*/
//ȡ���������м������ӵ��ŷ�
AI.getMoves = function (map, my){
	var manArr = AI.getMapAllMan (map, my);
	var moves = [];
	var foul=play.isFoul;
	for (var i=0; i<manArr.length; i++){
		var man = manArr[i];
		var val=man.bl(map);
		
		for (var n=0; n<val.length; n++){
			var x=man.x;
			var y=man.y;
			var newX=val[n][0];
			var newY=val[n][1];
			 //������ǳ����ŷ�
			if (foul[0]!=x || foul[1]!=y || foul[2]!=newX || foul[3]!=newY ){
				moves.push([x,y,newX,newY,man.key])
			}
		}
	}
	return moves;
}
//A:��ǰ����value/B:����value/depth���㼶
AI.getAlphaBeta = function (A, B, depth, map ,my) { 
	//var txtMap= map.join();
	//var history=AI.historyTable[txtMap];
	//	if (history && history.depth >= AI.treeDepth-depth+1){
	//		return 	history.value*my;
	//}
	if (depth == 0) {
		return {"value":AI.evaluate(map , my)}; //�������ۺ���; 
	}
	var moves = AI.getMoves(map , my ); //����ȫ���߷�; 
	//���������Ժ������Ч��

	for (var i=0; i < moves.length; i++) {
		
		
	//������߷�;
		var move= moves[i];
		var key = move[4];
		var oldX= move[0];
		var oldY= move[1];
		var newX= move[2];
		var newY= move[3];
		var clearKey = map[ newY ][ newX ]||"";

		map[ newY ][ newX ] = key;
		delete map[ oldY ][ oldX ];
		play.mans[key].x = newX;
		play.mans[key].y = newY;
		
	if (clearKey=="j0"||clearKey=="J0") {//�����Ͻ�,��������߷�; 
			play.mans[key]	.x = oldX;
			play.mans[key]	.y = oldY;
			map[ oldY ][ oldX ] = key;
			delete map[ newY ][ newX ];
			if (clearKey){
				 map[ newY ][ newX ] = clearKey;
				// play.mans[ clearKey ].isShow = false;
			}

			return {"key":key,"x":newX,"y":newY,"value":8888};
			//return rootKey; 
	}else { 
		var val = -AI.getAlphaBeta(-B, -A, depth - 1, map , -my).value; 
			//val = val || val.value;
	
		//��������߷�;�� 
			play.mans[key]	.x = oldX;
			play.mans[key]	.y = oldY;
			map[ oldY ][ oldX ] = key;
			delete map[ newY ][ newX ];
			if (clearKey){
				 map[ newY ][ newX ] = clearKey;
				 //play.mans[ clearKey ].isShow = true;
			}
		if (val >= B) { 
				//������߷���¼����ʷ����; 
				//AI.setHistoryTable(txtMap,AI.treeDepth-depth+1,B,my);
				return {"key":key,"x":newX,"y":newY,"value":B}; 
			} 
			if (val > A) { 
		A = val; //��������߷�; 
				if (AI.treeDepth == depth) var rootKey={"key":key,"x":newX,"y":newY,"value":A};
			} 
		} 
	} 
	//������߷���¼����ʷ����; 
	//AI.setHistoryTable(txtMap,AI.treeDepth-depth+1,A,my);
	if (AI.treeDepth == depth) {//�Ѿ��ݹ�ظ���
		if (!rootKey){
			//AIû������߷���˵��AI�������ˣ�����false
			return false;
		}else{
			//�����������߷�;
			return rootKey;
		}
	}
return {"key":key,"x":newX,"y":newY,"value":A}; 
}

//���ŷ���¼����ʷ��
AI.setHistoryTable = function (txtMap,depth,value,my){
	AI.setHistoryTable.lenght ++;
	AI.historyTable[txtMap] = {depth:depth,value:value} 
}

//������� ȡ������˫�����Ӽ�ֵ��
AI.evaluate = function (map,my){
	var val=0;
	for (var i=0; i<map.length; i++){
		for (var n=0; n<map[i].length; n++){
			var key = map[i][n];
			if (key){
				val += play.mans[key].value[i][n] * play.mans[key].my;
			}
		}
	}
	//val+=Math.floor( Math.random() * 10);  //��AI�����������Ԫ��
	//com.show()
	//z(val*my)
	AI.number++;
	return val*my;
}

//������� ȡ������˫�����Ӽ�ֵ��
AI.evaluate1 = function (map,my){
	var val=0;
	for (var i in play.mans){
		var man=play.mans[i];
		if (man.isShow){
			val += man.value[man.y][man.x] * man.my;
		}
	}
	//val+=Math.floor( Math.random() * 10);  //��AI�����������Ԫ��
	//com.show()
	//z(val*my)
	AI.number++;
	return val*my;
}




com.gambit=com.gambit || 
"774770627967807089797276666512422625000119270171 774770627967807026256364192772821715204289883041 192723247757102279677062897980706665604217132214 774770627967807089791022190763641727121479736254 774710222625808117272042796770828979726219070010 262563647767724219277062294780706764122279672324 774770627967636489798070797310221927232409081213 773772427967706259488070694710228959120217150010 774772427967706289798081192710222625815139480001 774770627967636417378070192710220919001089791216 773770627967807089792324797572827535102229477074 262512227747204279678081897981111927103109193041 774772427967706289798081192781313948102226250001 774770627967807026257282192763641707124209191022 774770627967807089791022666523241907030417272214 774772427967706289791022262580811927815139480001 774710227967725266657062262580708979707967791215 774710227967725289797062262512021727204227236364 774710222625725219277062170780707967636409190010 174710221927001066657242796770628979808167552324 774770627967124219271022091900012625013189798070 192723247757102279677082897980706665727629473041 262512227747204279672324897924251907808109198131 262563647767724219277062294710023948123209190010 174710221927001009197062262563647987838477676274 774772427967706289798081192781316665232479744241 262520427747706279678070897963641927102217150020 774770627967807089791022190772766665232409086042 774770627967807026256364192720428979727617071022 262512227747724219272324273524253543808179678121 773772427967706289798081192781313948102279754344 774770627967807089796364797310222625728273638281 774770627967807089791022262563647973728273638281 262570626665728277676042192780700908100269470001 694712322625100219270010091910141707143477576042 694772526665708279678070897970741927102217152324 774770627967807089886364262510221927204288583041 774770627967232466651022190780708979030417377274 774770627967807089791022262563647973204219277282 666510222625724279677062897980707773121909190010 262512227747204279672324190724258979103109193041 775772526665708279678070192723241707102209190010 774770627967807089796364173772761927100209190010 774770627967807089791022190763641727001009191216 774770627967636489798082192710224645304117156254 694763642625706219276042090810020868000166656465 774770627967807089791022666523241713604279737282 774770627967807089791022666523241713604279732234 796763642625706219278081898881211718100288586042 262512227747204219078081091981317967304139483134 774772427967706289796364192710222625000117150131 774770627967807026256364192710228988204227353041 796763642625706219278081170712520919102277736274 666560427757232479677062897980701927102217132214 774770627967807026257282192770752907636489881216 774772427967706289798081192781312625100279753136 773770627967807066657282192723241713604213631022 262512227747204239486364796770628979807079757282 262512227747204247433041294710314344001019388081 774770627967807026256364192710221715627427352042 774770627967636417371022897980701927001009191216 774770627967807089791022262563641927121627351666 694772327967706289798070777363647363204279706270 773772427967706289791022192723243948636417070010 775712522625102219270010796770828979807009191014 666572622947708279671242897910221927001009198070 694772327967706289796364778720421927232417071022 192723247757102279677082897980702947204257527262 773770627967807089797276666576662625124219277079 774770627967807089791022190723246665030417272214 294723246665102219277252796770628979807017136042 796763642625706219278081898881211718728288582171 174710221927001009196364191570626665646515657271 694712322625100219270010091910141707143477577062 262563641927706269472042795810318969002066656465 262563647767124219271022091900101713706269472201 666510222625120217272042190700107967708269478081 262520421927636417071022091900107737706279676274 262572427967706219278070897970747787747967791002 262520421927636417071022091900107737706279676254 775772421927706279678070694763642625100206050001 262512226947100219270010091972421713706277578070 262512227747204279678081192781118979103117077082 694772327967706289798070777363642625100219271222 774770627967807026257282192770754645124227461022 774770627967807089792324190710221737727426252425 262563647767724219277062294780703948100209395041 262512226947100219270010091910141707143479677062 192763642625706279672042090880810838122227151002 774770627967807026257282192763641715204289887076 774770626665807079672324171310221323604219271214 774770627967807026256364192710221715727789797747 262570626665124277471022190780707967728217277074 173772427967100219272324091912226947242547250001 262570621927728279678070897963640908204269473041 262512227747204279672324190724258979808109198131 774770627967807026256364192710228988204288587282 774710227967725266652324190760421727001009191216 774772427967706289798081797581311927313629071002 774770627967807089796364797310221927304109081202 262512221747724279677062897923241907242509191002 774772427967808189797062192781316665100267553135 262570621927100229476364798760427757000189798070 262512227747604219071002091900010605013179673134 262570627767807066651242174710221927001067631014 774770626665807079677282192723241713102213230010 774710227967808189798131192730411707708209193136 774710227967706226256364192780708988304117156274 262563647767724219277062294780703948625467645446 262563647767604279877062897980707973728273706270 262570626665728277672042798780702947232425247074 262520421927102266657082796772528979807077728384 774712427967102289797262173770821927001026256266 773770627967807066657282192710222625232425247074 694772427967636419277062897980701707102209192324 774710227967636489797252797130411927121171737062 666572621747124219277082775780707967707667557656 774770627967807066652324897910221713604219272214 774770627967807026256364192710228988604288587274 774770627967807026256364192772821715102266657076 774770627967807089791022190763647973625409082042 773772427967706259488070190710226947434489594445 774770627967807026256364192710228988204288586274 192723246665102279670001090801611713636413236465 774710227967808189797082262572621927204227358151 774710227967725266652324190760428988030417270010 262572427967706289798081778781317975102239484344 694763641737100219270010091960422625706279675041 774772427967808189797062192723247974812129071002 262520427747706279678070897963647973102219277282 774770627967807019277282170710220919001026256364 174710221927001066652324796770627775204209198081 774710227967706226256364192780701715000189790131 192723241707102209190010191512021510221077477062 694772427967706219278070897910022625123277752324 694712522625102219270010273510140908504108586364 774710227967725289797062262563641713304119272042 774770627967807089796364797310221927625409083041 666572621747604279870001897901511927504159481002 175712421927102209197062666572827987232419150001 294710222625724219277062798780817767434417134445 774770627967807089792324666510221907030417136042 774710227967725289797062666523241907604246455041 774710227967808189798131262531341927708279757252 774770627967636426258070192772828988707529071022 796763647787706289798070797572827570627017477062 774770627967807089797276262512426665000119270171 174710221927001066651202796723240908604267555041 774772427967706289888070883870741927121426252324 262520421747706279871031898800208838808109077276 774770627967636489798070797310222625728273638281 666523247967102229472042898870828828121026251020 774710227967808189798131192730411707708209198384 666572622947708279678070897912427773102217370010 262512227747204247433041294710314344001019386364 774770627967807026256364192720421707102209190010 773770627967807019077282666510020605707489797479 774770627967807089796364797310221907728273638281 262512227747204279678081897981111927103117077082 774770626665232479678070171310221323728219270010 774770627967807089791022666523241713604213230010 774710227967725289797062262563641713204219272324 774770626665807079672324897910221713604279737282 694772427967706289798070192710026665123209190010 262520421927636417071022091900107737706279678070 192723246665102279670001394801618987636465646164 774770627967807019277282898810224645304188382042 262520421927706217076364091910317987232425240020 774770627967807089791022666523241907000117272214 796763641737706219271002091900102625122219100210 774770627967636489798070797310221907625409082042 774770627967807089791022190723241727221409086042 774710227967725266652324190760428988706288285041 774772427967706266658070192710222625000189880131 775712421927102279677082897980700919001017132324 694763642625604219271002090800010858706227151217 774770627967807089796364797310221927232409081213 774772427967706266658070192710222625000109080131 774770627967232419278070170710220919001019136364 262520427747636479677062192710221707121609191626 774770627967636417378070192712320919102226253041 774712427967102289797062173750417973608219270010 262563647767724219277062294780703948625479871022 774770627967807089796364797310222625204273632241 262512227967232419072425778710028979604279757051 262563641927706209081002694700016665646508686042 774772427967808189797062192723246665122229071002 774770627967807089791022262563647973000117270131 774772427967706289798081192781313948102217152324 192723247757102229471202170700106665708279678070 775712421927102279677082091900108979807017112324 694772322625706219278070795810020605000109080151 774770627967807089796364797310221927232409083041 174710222625636419277062091900107773204273637274 774770627967807026256364192772821707102209190010 174710221927001066652324796712020908504177877232 262512227747204279678081192781111707103127357082 774710227967725266657062897923241907604217270010 796763642625706219278081694723242524812127352124 262570626665122279672324190724250919808129472042 774770627967807089791022262563641715120219270010 774772428988706279678070883870741927102238331214 774772427967706289798081192781316665102226250001 774770627967807026256364192720428988102288587282 774770626665232479671022897980701907030417272214 774770627967807089791242192710222625001009191014 774710227967120219070010091970628979807079736364 774770627967807089792324797510222625242575251211 774770627967636417371022897980701927001009192324 774770627967807089796364173772761927124239481022 773770627967807089797276666576662625707967791242 774770627967807026256364192710228979121679751666 262570621927636409086042694772702735100235230001 774770627967807089796364797310222625625419272042 262512227747204247433041294780817967103143440010 774770627967807066657282192723241713102213230010 262570621927636417071022091900107747807079676042 774770627967636489798070797310224645232445443041 694710221907724279677062090800010838434477734445 775712421927102279877277294770628988808188380001 694772421927706277578070796723246665102267551215 774770627967807066652324897910221713604213230304 174712421927102209192324798770628988000219150212 262563647767724219277062294710026764123264650010 774770627967807089791022262563647973625419272042 666510227967232429476042193870510929806026252425 694763641907706217271002060500100919604279585041 774770627967807089796364797310221927625409082042 666510222625120219077262694770827967807089796364 262512227747204279672324190724258979808147433041 774770627967807089797276666512421927102226250010 262512221747724219277062796780708979707509191002 774710227967725289797062173700101927120226256364 666572621747604247435041694770514344807079581022 774770627967807089797276666512422625102219270010 262563647767724219277062294762543948807079871022 774710227967120219270010091910168979725217071626 774772427967706266658070192710222625707489797479 775712421927102209190010796770828979807057521016 774770627967807026256364192710221715204289881211 774710227967706217370010192780700919232489797276 262512227747204279672324190724250919808139488131 774770627967807089797276666512422625102219270001 666570626947100279678081192760420908815126250001 774772427967706289798081192710222625000117160151 262570626665728279678070897923242524707424232042 774770627967232489798070797510222625242575251211 774770627967232489798070190710227975204226253041 774772428988706288388070796710221927707409081202 774710227967725289797062262530416665204267550030 774770626665807079672324171310221323204289790010 694772321907706279676364594810022625030417370010 773772427967706269478070594870748959102259526270 774770626665807079677282192750412625232425247074 190703047747706279678070897910026665000179736042 774770627967636489798070797310222625121646452042 796763641747102219277062090830414645627477721272 262512227747604219075041796703044743040506050005 262512227747724279671002897900101927706209191014 262520421927636477377062796780812735815109081222 774772427967706289798081666581311927100267551222 192723246665102279670001778701618979636465646164 774772427967706289888070883870741927102217151214 774772428988706279678070883870743831102231211214 262512227747204219078081091981317967304189793134 774770627967807026256364192710228988604288585041 774772427967706289798081192781316665100239483135 262512227747204279678081190781310919313489791031 262570626665122269471002192700100919101479676042 774770627967807026256364192710222735304117271202 774772427967808189797062192781312625100279753136 190763641727100209190010774770627967807089886042 262512227747204219077062666580707967222509191022 666523247727204289878081873763646564816129476164 262512227747204279672324190724258979808139488111 774772427967706289796364192710227975807075251211 262570626665122219071002171220422947728279678070 262512227747204219078081091981317967313447433041 774710227967725289797062666520421907232417270010 192723246665102279677082898883848858204217070010 774770627967807066652324171310221323001019276042 262563641927706209082042694710317958002066656465 262570621927636409086042273510227727120225244224 774770627967807026256364192710228988204288583041 262563641927706209086042694710020858000158530131 774770626665807079672324897910221713604213230010 773763647967723289797062797580707555100206056042 774710222625304179672042192700301707725209191202 796763641737102219270010262512162735706209197275 774770627967807089791022190723246665000117272214 694772327967706289796364262580811907030477871002 774770627967124219071022897980700919727666652324 262512227747204247433041294710314344808119380010 774770627967807089796364262510221715000119270131 774770627967807089797276262563641927204267887675 694772327967706289796364262520421927808117078151 774710227967725289797062262580811713813119275257 774710222625725219277062273520421707807009190010 666560427967232417571022192700106947706277752214 262563647767604279877062897980701747000119271232 773772427967706269478081594881511907030417271002 774770627967807026257282192763648988707546451242 774710227967706289798070190723241727221409082042 262512227747204279678081474330412947103143440010 774770627967636489797274192710221707121179756042 262512227747724279671002897970621927001009191014 774710227967725289797062262563641713204219273041 774770627967807089791022190763641737001009197276 774772427967706266658070192710222625000109087074 773772427967706259488070694710228959232419272234 694763642625604219271002090800010868016127351215 774770627967807026256364192772821715204227357078 262570621927636409082042694772820868807027357075 174710221927001009192324191370627757636479877273 773770627967807026256364192710020605000105040304 774770627967807066652324897910221907030417272214 666523247747102279677082190720421727001009191216 774772427967808119277062897981316665100239481222 774710227967725289797062262530411927204227350030 774710227967725266658081190781311727313569872042 773772427967706289791022394812021927001079758070 774770627967807089796364262572761927124259481022 262520427747706279676364192780708988728227353041 774710227967725289797062262512021737001019276364 774772427967706289798081192781317975102239480001 775763647987706217478070192710220919001089791216 774770627967807066652324171310221323728219270010 262512227747204279672324897924251907808139488131 773772427967706289791022262500011927013139484344 666512421927102209190010171372627967636467556465 774770627967807089792324666510221907000117272214 262512227747204219078081091981317967304189797082 774770627967807089791022190723247975204226253041 774772428988706279678070883810221927707409082324 773770627967807066657282262523242524707437341222 262563647767724229477062192762543948807079875446 262563647767724229477062676410021927122227154246 774770627967807026256364192772821715102227357078 262570626665728279678070897970747787741417128212 262563641927706209082042777383842735103179676274 262512227747204279672324190724258979808179758131 774770627967807089791022666523241713604213230304 174710221927001009197062798723247767807089791216 774770627967807089791022190763641727001009197276 262563647767724219277062294762543948544609391022 262570626665728279871222897910021712222112828082 262512227747204219078081796781318979313439487082 774772427967706289796364262510221927000179758081 262572222947808266658272798720428979708277731031 774770627967807089791242797372827370627019271022 192712226665232479676042091910021707705189888060 192723247747102279677252898880818838000146458131 798723242947204289888384262524258828708228258274 774770627967232489798070797510221907204226253041 773763647967723219070304172710020919001019151222 262563641927706277478070796772822735204289883041 774770627967807026256364192710221715604289790001 262512227747204279678081173723241907813139482425 773772427967706289791022262512021907001009196364 262570626665728277578070796712222947100217122042 262563647767724219277062294780703948625479874246 774770627967636426251022192780708988204288587274 262512227747204279672324190724258979808139488131 775712521927102209192324796770826665204267555257 774770627967807089791022262563641927121646457276 175710221927001009191216262516267967636477871019 262563647767724219277062294710028988122209190010 773770627967807066657282192723241713604213631222 694763642625706219276042170710220919001077732324 262512227747204247433041294710314344001019387062 262563647767124217471022798770821927001089798070 773772427967706259481022262580701927707489797479 694772327967636489797062262580701927204217071031 694710226665232479672234594872421927706267750001 262563647767724219277062294762543948102267641216 262520421747636419277062091910317967625489885466 774770627967807089797276666512421927232417131022 773770627967807066657282192723241713604267556364 773772427967706289791022262580811927813159480001 192720421707102209190010262563647987706289881214 774772427967808189797062192710222625815179750001 774710227967636489793041262572627975626669877062 774710227967725289797062190763641727625409191202 774770627967807089797276666512421927102209192324 774772427967706289791022192763642625121627158081 774770627967807089791022797372827370627019272324 774712427967706289798070192710220919727626256364 774770627967636426251022192780701715627427352042 262512227747204239487082173750411927222509191022 666512521927102209190001262501617767636427356042 774770627967807089791022190723247975728275706270 694772327757706266658070796710221927232417136042 774770627967807026256364192772821707707509197525 192723247757708279678070666510223948304129477252 774770627967807089791242192710220919727666652324 774772427967808119277062666523241713122229072226 774772427967706289791022192723247974200217138070 262512227747204239487062796763648979807079757282 774710227967725289797062262563641737001019271202 774772427967808189797062192781316665102226251202 774770627967807026257282192763641715102289882042 262572427967706289798070192770747787747967791002 774770627967807089791242192710227973728273706270 262572222947706279878070897920421927232425247074 774710227967120219077082091980708979204266650010 774710227967725289797062666580812625813117273134 774772428988706288388070796770741927102266653041 773780817967813119277222897970621707100266653134 773770627967807066652324171310221323001019277282 774770627967807089796364797310222625625419270001 262570621927636409086042694710022715123208580001 774770627967807066651022192723241713223413636042 774770627967807089881022262563641927204288583041 774710228988808188380001192781310908706246453041 262512227747724279677062897910021737808119278131 192723246665102277476042796770518979636465648060 774710227967636489798082192712117973116117158384 262563641927706229478081798781318988313488582324 192723246665102277477062796772764645204289888070 774710227967808189798131262531341927708217078384 774710227967725289797062173780811927813159480010 774710227967636489798082192770621715838426251211 774772427967808189797062666510222625813119270001 694772326665706279678070897970741927102259482042 774770627967636426251022192780701715604289790001 774770627967102289798070666523241907304109082042 774710227967725289887082192780708858304146457074 262563641927706229471252798710220919838489882042 666572621747124219271022091970827757000179670151 694772427967706219278070897910026665707667557674 774770627967102289798070262563647973625419272042 774770627967807089796364797310221927728273638281 774710227967725289797062666512021907001009191015 774772427967706289796364262580811927232479758121 774770627967636419078070172712420919102219146082 262512222947100219277242898870628858807027350010 774770627967102289798070666523241907030417272214 775770626665807079677282192712420919000167550131 774710227967725289797062262563647973807073637072 262512227747204279672324897924251907808179758131 694772427967706289798070192710022625707477877479 666572621747204279877082897980818685813187753136 694712321907102209080010060570620838101438351454 262563641747706219271002091900102735604235436243 774770627967232417271022190722140908030408380003 774770626665807079672324897910221907030417272214 774772427967706289888070883850411927102266657074 174710221927001066652324796712020908101546457242 262512227747604219071002091900010605013179675041 262560421927636409081002694700010858013158557062 262512227747204279677062173700011927013139482225 774710227967706289798070262563647973728273638281 262512227747204219078081796781318979313409191031 694772527967636426257062192780708979102227357076 262520421927636479877062898880812947813109081022 262570626665728277578070796723242524707424236364 262512227747204219078081796781318979304109197082 773763647967723289797062192710022625604229475041 174710221927232466650010796770620919727626252425 774772428988706279678070883870741927102209082324 262563641927706229472042798710228988808188588131 773763647967723219277062897910022625808179758121 694772327967706289796364262580701927204209083041 262520421737636419271022091900107747706279676254 773770627967807066657282192723241713604213631002 774770627967807089791022666523241907030417132214 262563641927706209086042694710020868727066656465 694772327967706289796364262512221927232427152425 694763641927604209081002262500017967013177877062 262512227747204219077062796780818979728266658131 174712421927102209192324796770626665808177760001 774770627967807026256364192710228979121679757282 774770627967807089791022666523241713604219272234 192723246665102279677082170780810919001019151202 774770627967807089791022190763641737001009191216 262570626665728279678070897923247773242529471022 775770627967636489798070797323241747102219271213 774772427967706289798081192781316665102226251202 694772322625706279871002192700010908017189797174 774710227967725289797062666580811907813159483135 773770627967807089797276666576661927707967792324 694772421927706279678070897910026665123209190010 262512227747204219078081796781318979313466651031 262512227747204239486364796770628979807079731031 694763641907706209081022795800011727625408181202 262563641927706209081022694772827773807073232042 262570626665122219072042091972827747807079677074 262570626665728279678070897923242524707424236364 775712421927102279677082897980700919001057521016 774770627967807026256364192710228988204288587274 774770627967807026256364192710228988204227351216 262570621927636477478070796710221715627427356042 262512227747204219078081091981317967313439481031 262570626665122219077282796780708979707477877414 694763642625706219276042090810020868727066656465 774710227967725289887062885880701927304146452324 774772427967706289796364192710222625121627151666 694763641907030409081002666564650868604268650214 262512227747706279678070897900011927727627352042 774710222625636419277062796780702735204289887282 774710227967725289797062666523241907604217270010 774772428988706279678070883870741927504166651022 774770627967807089792324666510221907030417272214 694723241727204219071022091900107958708219151202 262570621927636409086042694710020868727066657060 262570626665122219070304091904050605000517671002 774770627967807089792324797510221907728275706270 775712421927102279677082091900108979807017132324 192770622625636477371002796780701707001009191216 174770621927123209191022262563647987604277578070 262520421927706229476364798780818988813186853136 774770627967807089791242666510221927001009191015 262512227747204279678081192781318979304109193136 774770627967636489798082173712117973000219270232 262563641927706277471022796780701715604289790001 774772427967808189797062192781316665232479744241 694763642625706219278081090820427958103189690020 774770627967636489798070797310222625625419272042 262512227747204279678081897981111927103179757082 694772427967706266658070897910221927000117157076 774772428988706279678070883870741927102217152324 774710227967725289797082190780811727204209191202 774770627967807089796364797372827370627047431022 774770627967807089792324666510221713604219272234 774710227967725289797062666523241907204217138081 774772427967808119278131897970622625102279750001 774770627967807089791022262563647975604219271214 192723246665102277477062796780708988000109086042 262570621927808129476364090820427987838489886274 262512227747204239486364796770628979807079737282 773770627967807026257282192710226665204227356364 774710227967636489790001192770821707807009191211 262520421927706266651031796700208988232488388081 262570626665204279671031898872826775315275638070 666523247967102289887082262524258828204228251211 775780816665815139487082174710221927001009191216 694772326665706279678070897970741927102259486364 192763642625706217071022091900107967604277732324 774770627967807089791242192710221715636415250002 774770627967807089797276666512422625102219070010 774772428988706279678070883870741927102266652324 262563641927706277471022796780708988728217152042 774772427967808189797062192781316665102226250001 774770627967807089791022262563647975204219273041 774770627967102289798070262563647973625419270001 774770626665807079677282192723241713604213631022 774710227967808119077082897981311727313409198384 262563641927706229471022798720428988728288688070 774710222625808179678131897931341927708279750001 774710227967636489798082262512117973117173536042 773772427967706289798081594881317973122219070304 774770627967636489798070262572761927204217100010 774770627967807089791022666523241907304109082042 774770627967807089792324190710221727221479730304 774770627967636489798070797310221927000117076254 774770627967807019071022897963641727001009191216 192723246665102277477062796780708988728246453041 774710227967808189797082262572621927204279751216 774710227967725289887062192780708858304146452042 666572621747204219276364091964657987708219158263 774710227967636426257062897980821927121179786042 774710227967636489797252262570621713504119270001 774770627967807066651022897900011907013117273134 774712427967102289797252173770821927000126250131 262512421927000179676364090870620858808158534232 773780817967813139487242897970627975102219274344 666523247967102289881214262560422524422419276364 774710227967725289797062173763641927000109190131 174770621927000109190151777563647525200279671031 774770627967807089791022666523241927604217132234 774772427967706289798081192781316665100267553135 774770627967807066651242190710220919728217370001 774770627967807066652324897910221907000117272214 774710227967636489798082173700011927013139483136 774770627967807089796364797310221737001019271202 666523241727124279671022694770821907726289798070 774772427967706289791022192763642625000117168081 262563641927706269472042795810318969808109080020 262520421927636477477062796780708979727617071031 262512222947100219270010091910166665724279677062 174770626665123279671022778700101927504189792324 774770627967807089796364797310221907625409086465 774770627967807026257282192763641715204227357078 774770627967102289798070262563641927121627351666 774770627967807026256364192772821707707546451242 774770626665807079672324171310221323121419276042 666523247967102289882042675570821747304119277252 774710227967725266658081190781315948304117373135 262512227747604219077062796780706665100209190010 262563641927706277478070796710228988604288586274 174710221927232466650010796770620908504177752234 190710226947232409082042082870822625242528253041 774710227967725289797062262512021713001013432243 774710222625636419277062796780702735204289881216 774770627967807089791022262563647973728273637072 262560421927636477477062796780708988102288585041 774770622625807079677282192770752907636489883041 262563647767724219277062294710028988122288380010 174710221927001066652324796770620908204208382214 262512227967636419277062273520427773103117378081 774772427967706289796364192710222625121627158081 774770626665807079677282190723241737102209190010 262563647767724219277062294780707987625439481022 774770626665807079677282190710020908707408380001 262563641927706269476042090810020868727066657060 262520421927636417077062091910317987838489888485 774770627967807026257282192770754645124227460002 774710227967724289797062192763642625000117162002 174710221927001009197062798763642625838477676274 774772427967706289888070883870741927102238331214 773770627967807066657282190703041727000109190131 192723246665102279677082868520422947808177877262 774772428988706288388070796770741927102217152324 774770627967807026257282192712420919102289880010 262570621927636429472042798780818988812117192324 262512227747724279671002192700100919706289791014 774770626665232419071022796780708979030417272214 774710227967120217370010192770628979807026256364 774770626665807079672324897910221713604279732214 774770627967807089791022666523241907304117136042 174710221927001009192324191370627967636489887273 262512227747724279672324897924251907706279752526 262512227747604219071002091900101713232425242229 262572427967706289798070777312221927232427352425 262570626665728279878070897923242524707424232042 774770627967636489798070797310221927232409083041 192723247757706279678070897910226665304117137276 174710221927001009192324191370627967636489886254 774772428988706288388070796770741927504166651022 262563647767204279877276192770622947100289888081 192723246665102279677082294720428988808188388151 774710227967808189798131192770821707313609190010 774770627967636489798070797310221927232409082234 773770627967807026256364192710026947123209190010 174710221927001009197062798723241913223489886042 262512227747604219071002091900017967013189795041 774770626665807079672324171310221323121489796042 774770627967807089791022190763641727001009191214 774710227967706289798070666523241907000117132214 774770626665232479678070897910221907000117132214 774772427967706289798081666510221927000126250131 192723246665102279677062171322140908000108380121 774770627967807089791022666523241727304109082042 773772427967706289791022192723247975807075357074 774710227967706289798070262563641727001019071216 262512227747204219078081091981313948313479673041 694760421907030409081002666500010858016158545041 774770626665807079672324190772821727102209192234 694763641927604226251002090800010858706279672324 262512227747204219078081091981317967708289798384 774770627967807089797274262512221927204227351002 774772427967706289796364192710222625000117168081 774772427967706289888070883810221927121466651424 262563647767724269474246594860427958464419271002 774770627967102289798070666523241907000117272214 775770626665124219271022796700108979807009191014 773772427967706269471022594812021907001009198070 262512227967232419072425778710028979604279750223 774770626665232417131022132312147967636489798070 262520421927636417071022091900107747706279678070 774772427967706289798081192781317975102226250001 774710227967725289797062666580811713524219278131 774770627967807026256364192772821715204289887076 262512227747204219078081091981314743304143837282 774770626665807079671242192710220919232417137276 774770627967636489798070797310221907625409086465 775763647987724217477062192710020919001066656465 694720426665232479671022190770828685808159488161 262572222947706279878070897920421927103139487074 775712421927102279677082897980702625001009191014 262512227747204219077062796780708979727666657606 174710221927001009197062666523241913120213230201 774772427967706289888070883810221927707438331214 774710227967725266652324190770621727204209190010 774772427967706289796364190710221727808109196254 262520421927706279876364898880812947813109081022 774770627967807089887282192723240908304108387074 192723247757706279678070666572766755762629477076 262563641927706229471002798780813948813177576274 694772327967706289796364778710222625120219070010 694710227967232466656042190700010908016177796364 262512227747204279672324897924251907808147433041 774770627967807026257282192763641715204289881022 694712321907030409191002173770626665604279675041 774710227967706289798070666523241713604219070304 262512227747604219071002091900017967030489790131 774770627967807089796364797310221927232409081214 774772427967706289888070883810221927707417152324 174710221927001066651202796723240908101546457242 774710227967120289790010192772520919101617071626 694710227967232466656042190700011737727406057062 262512227747604219071002091900017967013106055041 774770627967807026256364192720422735102289881216 666560427757232479677062897980701927102217132234 774770626665232479678070171310221323001019276042 774710227967725289797062262580811713524219278131 774710227967706266658070190723248979030417272214 262520421737706219278081091981315948122277476364 774770627967807089796364262510221927121646457276 262563647767724269471002666542465948604265644264 192723246665102279677082898820422947725267758384 666523247747102279677252190760428979706217270010 774770627967807089796364797510226665646575657271 262563641747706219271022091900107987808177736274 774772427967808189797062192781316665100239483135 774770627967636426258070192710228988204288587282 774710227967725289797062262563641737000119270131 774770627967102289798070190763641727001009191216 773770627967807066657282694710021927000159480131 774772427967808189797062192781317973232473631022 774710227967706289798070190723247975728275706270 192723247757102279677082897980706665304129472042 773770627967807026256364192710022947000106050131 262563641927706277478070796772821715204289883041 262512227747604219071002796700100919101489797051 694763647767604279877062897972821927100217070010 774770627967102289798070262563641727121679751666 774770626665807079672324897910221727304109082042 774710227967808189797082262581311927304166653138 774710227967808189797082262581312524232417273132 774770627967807089791022262563647973000119270131 774770627967636489798070797310221737728273706270 192723246665102279670001898801616755727555477572 774770627967807089796364797310221737232419071213 774770627967807089791022190723240908636417272234 774770627967807089791022666523241713604219070304 694763641927604226251002090800017958015189697062 192723247757708279678070666510228979726279708270 666572621747124219276364091964657987626189791022 774770627967807089796364797310221927232409082234 694770827967725289798070262570747787743419271022 174710221927001009197062798723247767807089797276 774770627967807026251022192763641715627427352042 773772427967706289791022262512021907808109198131 774770627967807026256364192710221715604247376274 694763642625604219271002090800017958015189697062 694763642625100219276042090800010858013179677062 262512227747604219071002091900017967015189795154 774710227967808189797082666581511927515426258384 262520421927636477477062796780701707102209190010 774772427967706289798081173710221927001009191216 773772427967706259481022694780708959707419072324 774710227967808189797082192772522625204266658131 262563641927706209082042694710317958002027352324 774770627967807026256364192710228988604288386254 694763642625604219271002090800017958015189695041 192723247757102279677082897980706665000117076364 694763641907030417371002091900106665646519157062 774710227967706289798070190723240908727666652042 773772427967706259488070694710228959232419076364 774770627967807089791022190723241737636409190010 262512227747204279678081897981111927708217100010 775712421927102209190010171570826665807029477252 774772428988706279678070883870741927504109081022 174710221927001009192324191370624645636445445041 262520421927636477377062796780812735103189797282 774772427967706266658081192781318979102226250001 774770627967807089791022666523241907030417136042 774770627967807089791022262563641727001019077274 774710227967725289797062190763641727001009191216 774710227967706289798070666523241907030417272214 262563641747706219271022091900107987838477676274 262512227775636419277062273580811737811179672042 694712321927232409191022666500107967706267551016 262563647767124219271022091970626764625479675446 774770627967807026256364192772821715204227351022 174710221927001066651202796723240908604277751016 262512226947100219270010091972327757706279678070 694710226665232479676042190700010908015106055041 694772327967706289796364778710222625120217370010 262563647767724219277062694780706764122279672324 262520421737636419271022091900107967706277736254 262563641927706209086042694710027958000189690151 774710227967725289797062262563647973808217272042 694772327967706289798070777363641907100206052042 773770627967807066657282192710022625232429472425 774770627967807089791022262563647973625473752042 262512221907724279677062897980700605636407151002 774770627967636426251022192720421707001009198070 192723247757102279677262897970826947204266656364 262512227967232477872425190710028979604279757051 694712321927232466651022796700100919706267558081 190710227747725279677062897963641727001009191216 262563647767204279877062897980707975728275351022 774770627967807089791242173772766665000219270232 773770627967807066651002192700011707013109190304 774772427967706289798081192781312625102279751216 666510221927000117076042091912021915232479677051 262563641927706229471002798760428988728288388070 694710222625724279677062192780708979707477877479 294710026665000179676042778763646564016189796164 694772326665706277578070796723241927102217132234 694770626665728279678070897970747787747967791242 666510227967232477877062897980701757604219272234 666510227967232469476042190700017787706289798070 262512227747204219076364796770628979807079757282 694710226665232479672234594872321907706267751215 694712320908102208387062190700100605101438351454 694763641907706209086042795810226665646589696254 694710226665232479672234594872321907706289791216 262570621927636409086042086872707987100266656465 774770627967807089791022666523241727304119072214 694763641927706217071022091900102625808179671217 694712320908100208386042060500101907101438337051 694712321927232466651022796700100919706267551016 666560427757232479677062897980701713102213231217 262563641927706217071022091900107747807079672042 774770627967102289798070262563647973304119277282 774770627967807089796364797310224645304119272324 774772427967706219271022262580706665000127350131 774770627967807089796364797310222625728273706270 262512226947100219277242271542465948464515032221 796763642625706219278081170710020919001077878121 774772428988424639481242192746447967102209190010 774710227967706226256364192712164645807089882042 774770627967807089791242797310221927001009191016 774770627967807089791022190723247975636417272214 666572621747604219270001796701710919705177871002 694763647767604279871002192783841707001007032324 774770627967102226256364192712164645807089882042 694763642625706219271002090860420868727066656465 694772521907706209081022795812028979001077671014 796763641737100219270010091970626947122219100210 774772427967706289791022192763642625000117150131 774772427967706289798081594881311737102219270010 694772322625706279878070897970747767744419272042 774710227967808189798131262531341927708279750001 694772522625706279676364897920421927808117078131 694772427967706289798070666512327773102219070010 694763641907706209081022795800018969625466657262 192723246665102279670001778770628979807079737282 262512227747604219071002091900017967015189795041 774770627967102289798070262563641907121646452042 694710226665232479672234594872321907706277743426 774770627967807066652324171360428979102213230304 774772427967706289798081192781316665100267551222 774770626665232479678070897910221727304119072214 796763642625706219276042694710020908000108580131 192723246665102279670001778760428979725209080161 192723246665102279676042778722348979705109081222 774770627967807089791022666523241907000117132214 694763647767604279878384897910027975000119277282 774770627967102289798070190763641727121479736254 774770626665807079672324897910221907000117132214 796763642625706219278081170710020919001077736254 192723247747102279677062898880708838728246455041 773772427967706259488070694710228959232419077074 192723246665102279677082170720420919121419153041 774770627967636426258070192710228988204288587274 774772427967706289796364190710220908232408383041 774770627967807026256364192712428988102209190001 773772427967706289791022262580811927813139484344 774770627967807089796364262510221927121679757282 262572327967706289796364192710027787121627351666 774772427967706289796364192710227975807075252002 262572427967706289798070777363641747122219272324 774770627967636489798070797310221927625446456465 666572621927636417076465798712420919102289797082 262512227967100277870010897970621907807009191014 262512226947100219277242091970627757807017070010 694712521927102209192324666560427967001059487082 694772327967706289796364778720421907102226251202 694720426665232479671022190770820908808108388151 666572621747124219277082091980707967636419146263 774770627967807089791022190723241727221479730001 262563647767204279877062897980701747727619273041 262563641747102219277062091900107987604289885041 262520421927636479877062775780708979727769471031 774710227967725289797062666523241907604217370010 694712321927232409081022083870626665001017075041 775720427967808189798151594870821747838419275154 694712421927102209190010796710141707141927192324 774770622625808179672042192723242524812127351031 774770627967807026257282192763642735124289881022 774770627967807089791022666523241713604219272214 774770627967807089791022262563641727727419071211 262563641927706217071022091900107747807079676042 774770627967807089796364797310222625625417370001 774772427967706289888070883870741927504166657454 774770627967807089797276666512426755000119270151 694720421737102226256364192700100919706279678081 294772527967636489797062778710222625120219270010 773770627967807066651002897900011907013139483134 262572427967706289796364778710221927000117150151 774770627967636489797274262510221927121179751161 774770627967807089792324190710221727221479732042 262563647767724219277062694710020908807008381222 774770627967636489797274262510221927121179786042 694772327967636489797062262520421927100209080020 774770627967807089791022666523241907604217272214 774770627967807089791022173700101927636479737282 192723247757706266658070796710228979204217132214 774770627967807089796364797310221927625446456465 774770627967807089796364797310221927625426252042 774710227967725289887062192780700908304188587074 262512227747604219071002091900107967101489797051 774772427967706289796364797580707535102235332002 192723246665102279670001898860420908221417151215 774770627967636489798070192772760908102226251216 773772427967706259488081694781318959102259536364 774770627967807089791022262563647973000117272042 694763641927706217071002091900106665646519156042 262572327967706289796364778710021927604279750001 774770627967807089791022190772766665232417272234 774770627967807089792324190710221737727466650010 262520421737708219277262774780707967707409197434 262520427747706279676364192710228979807079736254 774710227967725219077062172780702625707509190010 796763641907706209081022060523240715121777178070 774772427967706289798081666581311927100239483135 774770627967636489798070797310222625625419270001 694763642625604219271002090800010858013179677062 774712427967706289798070797372827370627019271022 773772427967706289798081192781315948102217152324 774770627967807089791022262563641927121679751666 773770627967807066657282192723241713604229471022 774772427967706289798081797363647363813139483134 774710227967725289797062666580816755525949598151 773772427967706259488070190710226947232489597074 774710227967725289797062666580811713232419076042 262563641927706209086042774710227967121689798070 774770627967807089796364797310221907625473752042 262520421737636419271022091900107967706277736274 262520421927636417077062091910317737625479672324 774770627967807026256364192772828988102288582042 774772427967706289798081666581311927100267553135 262563647767724219277062294710023948122227158070 774770627967807089791022190723241727221479732042 774770627967232489798070666510221907727609082042 774710222625120219270010091910141707147479676042 262512227967232419072425174760427775705146451002 294760422625636419277062798712327757102289798070 192723246665102279670001778770628979807079736042 694772527967708289791242192710220919001017138070 262570621927636477478070796710222735728289882042 174710222625636419277062091900107987838477676274 694772326665706277578070796710021927707489881222 773772427967706259488070694710228959120219270010 774710227967808189797082192781312625725239483136 774770626665807079672324897910221907604279730001 774770627967807089791022262563647973604219270001 192723246665102279670001090860420858705177878070 694763641927100226256042090800010868013179877062 774770627967807026256364192772821715204289881022 774770627967808189797271192720421707711179752324 774770627967636426258070192710228988604288585041 694712321927232409191022796700106665706259487276 774770627967232489798070666510221907000117132214 262572427967706289796364192780706947102209084344 774770627967807089796364797310221927304109086254 774710222625725219277062273520421707807009191202 192723246665102279677276677570622947762689886042 774710227967808189797082192772521707001009191216 262512227747706279672324190724258979807079752221 774770627967807089796364797310222625204219273041 262512227747724279677062897910021737001019271016 774710227967725289797062797380707363707226251211 694772427967706289798070666570761927766679694344 694772527967636489797062262580701927102277732324 774772427967706289796364192710222625121627351666 774772427967808189797062192781312625102279750001 774770627967807026256364192710221715121189886042 774770627967807089791022262563647973121646452042 774770627967807089796364797310224645232445443041 775763647987724219277062897923247975807075354252 774770627967807089791022190763647973625409086465 774770627967807089791022666523241907727617272234 262560427967636477877062897980707973728273706270 774770627967807019272324897910220908204208387276 773770627967807066657282694710020605000119077074 694763642625604219271002090800010858706227151232 262512227747204219077062796780706665728289797079 694772321907706209088070083810227987232489797074 774770627967807089796364797310224645232419271213 774770627967807019272324170710220919001019136364 774770627967636489798070797310221737232419071213 774770627967807089791022262563647973728273706270 774710227967725266658081897970826755204226258131 262512227747204279678081173781111927103127357082 774770627967807089791022190763641727001026251216 262512221747724219277062091910027967807089797075 694772322625706219278070273520421737323777371002 262570626665122219077282774780707967222509191022 774772427967706266658081897981311927232479743132 774770627967807089796364797310221907728273637072 262512227747724279677062897910021927001009198081 262572427967706289798081778781311927102217074344 694710226665232479670001190760420908705108588060 294712421927102209192324666570827967808186857252 694720421927232417071022091900101913636477677062 774710227967725289797062262563641713204246453041 694770627967636426252042192710312735727517376465 774770627967807089796364797310224645304145442324 774772428988706288388070796770741927504109081022 773772427967706289791022192723247975807075706270 694720421907708217377252091980708685100279877074 262512227747204219077062796763648979807079757282 666560427747705119076364656480600908606408585163 774772428988706288388070796750411927707466651022".split(" ")

abc();