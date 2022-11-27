
var play = play||{};

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


var AI = AI||{};

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

set(AI.init);

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
��	}
��	var moves = AI.getMoves(map , my ); //����ȫ���߷�; 
��	//���������Ժ������Ч��

	for (var i=0; i < moves.length; i++) {
		
		
����	//������߷�;
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
		
	����if (clearKey=="j0"||clearKey=="J0") {//�����Ͻ�,��������߷�; 
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
	����}else { 
	����	var val = -AI.getAlphaBeta(-B, -A, depth - 1, map , -my).value; 
			//val = val || val.value;
	
	����	//��������߷�;�� 
			play.mans[key]	.x = oldX;
			play.mans[key]	.y = oldY;
			map[ oldY ][ oldX ] = key;
			delete map[ newY ][ newX ];
			if (clearKey){
				 map[ newY ][ newX ] = clearKey;
				 //play.mans[ clearKey ].isShow = true;
			}
	����	if (val >= B) { 
				//������߷���¼����ʷ����; 
				//AI.setHistoryTable(txtMap,AI.treeDepth-depth+1,B,my);
				return {"key":key,"x":newX,"y":newY,"value":B}; 
			} 
			if (val > A) { 
	��������	A = val; //��������߷�; 
				if (AI.treeDepth == depth) var rootKey={"key":key,"x":newX,"y":newY,"value":A};
			} 
		} 
��	} 
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
��return {"key":key,"x":newX,"y":newY,"value":A}; 
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


