//棋盘、棋子、提示信息

    //棋盘类
    function Pieceboard(){
        this.backColor = "pink";
    };
    Pieceboard.prototype.draw = function(ctx,leftDist,topDist,baseSize,rowMount,coluMount,lineWidth = 1){
        ctx.lineWidth = lineWidth;
        ctx.beginPath();
        //画横线
        for(var i = 0;i < coluMount;i++){
            ctx.moveTo(leftDist, topDist + baseSize*i);
            ctx.lineTo(leftDist + baseSize*(rowMount-1),topDist + baseSize*i);
        };
        //画纵线
        for(var j = 0;j < rowMount;j++){
            ctx.moveTo(leftDist + baseSize*j,topDist);
            ctx.lineTo(leftDist + baseSize*j,topDist + baseSize*(coluMount-1) );
        };
        ctx.stroke();
    };
    Pieceboard.prototype.getCoord = function(arr,rowMount,coluMount){
        for(var i = 0;i < rowMount;i++){
            var tempArr = [];
            for(var j = 0; j < coluMount;j++){
                tempArr[j] = 0
            };
            arr[i] = tempArr;
        }
    }


    //棋子类:
    function Piece(){
        this.radius = 12;
    };
    //根据圆心和半径，判断颜色进行画棋子
    Piece.prototype.draw = function(ctx,x,y,radius,color){
        ctx.beginPath();
        ctx.fillStyle = color;
        ctx.arc(x, y, radius, 0, Math.PI*2, false);
        ctx.fill();
    };
    //根据点击坐标换算落子的中心,会返回圆心数组[x,y,coumtX,countY]！
    Piece.prototype.calc = function(baseSize,x,y,leftDist,topDist){
        var lessX = Math.floor( (x - leftDist)/baseSize ) * baseSize + leftDist;
        var lessY = Math.floor( (y - topDist)/baseSize ) * baseSize + topDist;
        if( (x - lessX)/baseSize >= 0.5){
            var posX = Math.ceil( (x - leftDist)/baseSize ) * baseSize + leftDist;
        }else{
            var posX = Math.floor( (x - leftDist)/baseSize ) * baseSize + leftDist;
        };
        if( (y - lessY)/baseSize >= 0.5){
            var posY = Math.ceil( (y - topDist)/baseSize ) * baseSize + topDist;
        }else{topDist
            var posY = Math.floor( (y - topDist)/baseSize ) * baseSize +topDist;
        };
        return [posX,posY,(posX - leftDist)/baseSize,(posY - topDist)/baseSize];
    };
    //棋子的颜色转换
    Piece.prototype.changeColor = function(c,c1,c2){
        c === c1 ? c = c2 : c = c1;
        return c;
    };
    //判断victory
    Piece.prototype.checkWin = function(boardCoord,numX,numY,color){
            var winCount = 1;
            var c =0;
            color === "black"? c = 1:c = 2;

            //横正向对比
            for(var i = 1; i < 5;i++){
                if(!boardCoord[numX + i]){break};
                if(boardCoord[numX + i][numY] === c){
                    winCount++;
                }else{
                    break;
                }
            };
            //横负向对比
            for(var j = 1; j < 5;j++){
                if(!boardCoord[numX - j]){break};
                if(boardCoord[numX - j][numY] === c){
                    winCount++;
                }else{
                    break;
                };
            };
            //横向求和
            if(winCount >= 5){
                return "victory";
            }else{
                winCount = 1;
            };
            //纵正向对比
            for(var k = 1; k < 5;k++){
                if(!boardCoord[numX]){break};
                if(boardCoord[numX][numY + k] === c){
                    winCount++;
                }else{
                    break;
                };
            };
            //纵负向对比
            for(var l = 1; l < 5;l++){
                if(!boardCoord[numX]){break};
                if(boardCoord[numX][numY - l] === c){
                    winCount++;
                }else{
                    break;
                };
            };
            //纵向求和
            if(winCount >= 5){
                return "victory";
            }else{
                winCount = 1;
            };
            //左上右下对比
            for(var i = 1; i < 5;i++){
                if(!boardCoord[numX + i]){break};
                if(boardCoord[numX + i][numY + i] === c){
                    winCount++;
                }else{
                    break;
                };
            };
            //左上右下对比
            for(var j = 1; j < 5;j++){
                if(!boardCoord[numX - j]){break};
                if(boardCoord[numX - j][numY - j] === c){
                    winCount++;
                }else{
                    break;
                };
            };
            //左上右下求和
            if(winCount >= 5){
                return "victory";
            }else{
                winCount = 1;
            };
            //右上左下对比
            for(var k = 1; k < 5;k++){
                if(!boardCoord[numX + k]){break};
                if(boardCoord[numX + k][numY - k] === c){
                    winCount++;
                }else{
                    break;
                };
            };
            //右上左下对比
            for(var l = 1; l < 5;l++){
                if(!boardCoord[numX - l]){break};
                if(boardCoord[numX - l][numY + l] === c){
                    winCount++;
                }else{
                    break;
                };
            };
            //右上左下求和
            if(winCount >= 5){
                return "victory";
            }else{
                winCount = 1;
            };
    }
    //提示类
    function WinMessage(){

    };
    WinMessage.prototype.writeMsg = function(ctx,left){
        ctx.clearRect(left, 0, 500, 500)
        ctx.font = "60px Microsoft yahei";
        ctx.fillText("Victory", left ,130);
        ctx.font = "25px Microsoft yahei";
        //第一行
        setTimeout('writeWord("你",'+left+'+30,210)',300);
        setTimeout('writeWord("真",'+left+'+60,210)',400);
        setTimeout('writeWord("的",'+left+'+90,210)',500);
        setTimeout('writeWord("是",'+left+'+120,210)',600);
        setTimeout('writeWord(":",'+left+'+150,210)',700);
        //第二行
        setTimeout('writeWord("智",'+left+'+50,250)',900);
        setTimeout('writeWord("勇",'+left+'+80,250)',1000);
        setTimeout('writeWord("双",'+left+'+110,250)',1100);
        setTimeout('writeWord("全",'+left+'+140,250)',1200);
        //第三行 
        setTimeout('writeWord("才",'+left+'+50,280)',1400);
        setTimeout('writeWord("高",'+left+'+80,280)',1500);
        setTimeout('writeWord("八",'+left+'+110,280)',1600);
        setTimeout('writeWord("斗",'+left+'+140,280)',1700);
        //第四行 
        setTimeout('writeWord("运",'+left+'+50,310)',1900);
        setTimeout('writeWord("筹",'+left+'+80,310)',2000);
        setTimeout('writeWord("帷",'+left+'+110,310)',2100);
        setTimeout('writeWord("幄",'+left+'+140,310)',2200);
        //第五行 
        setTimeout('writeWord("出",'+left+'+50,340)',2400);
        setTimeout('writeWord("类",'+left+'+80,340)',2500);
        setTimeout('writeWord("拔",'+left+'+110,340)',2600);
        setTimeout('writeWord("萃",'+left+'+140,340)',2700);
        //第六行 
        setTimeout('writeWord("文",'+left+'+50,370)',2900);
        setTimeout('writeWord("韬",'+left+'+80,370)',3000);
        setTimeout('writeWord("武",'+left+'+110,370)',3100);
        setTimeout('writeWord("略",'+left+'+140,370)',3200);
        //第六行 
        setTimeout('writeWord("学",'+left+'+50,400)',3300);
        setTimeout('writeWord("富",'+left+'+80,400)',3400);
        setTimeout('writeWord("五",'+left+'+110,400)',3500);
        setTimeout('writeWord("车",'+left+'+140,400)',3600);
        //第六行 
        setTimeout('writeWord("才",'+left+'+130,440)',3800);
        setTimeout('writeWord("怪",'+left+'+160,440)',3900);
    };