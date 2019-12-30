 function writeInit(ctx,left){
        ctx.font = "60px Microsoft yahei";
        ctx.fillText("Combat", left ,130);
        ctx.fillText("With", left ,230);
        ctx.fillText("Yourself", left ,330);
};
function writeWord(str,leftD,topD){
    ctx.fillText(str, leftD ,topD);
};
function playing(e){
    //判断是否点击棋盘
        if(e.offsetX < leftDist || e.offsetX > (leftDist + baseSize*(rowMount-1) ) || e.offsetY < topDist || e.offsetY > (topDist + baseSize*(colMount-1) )){
            return false;
        };

        //得到相对于canvas的坐标
        var posX = e.offsetX;
        var posY = e.offsetY;
        //得到一个棋子
        var piece = new Piece();
        //相对于棋盘的坐标向十字处的吸附
        var coord = piece.calc(baseSize,posX,posY,leftDist,topDist);
        posX = coord[0];
        posY = coord[1];
        numX = coord[2];
        numY = coord[3];
        //查询该位置是否有棋子
        if(boardCoord[numX][numY]){
            //存在棋子，直接放弃该棋子
            return false;
        }else{
            //棋子不存在、开始继续操作
            //绘制棋子
            piece.draw(ctx,posX,posY,piece.radius,pieceColor);
            //绘制后添加棋子到数组中、黑色为1、白色为2
            if(pieceColor === "black"){
                boardCoord[numX][numY] = 1;
            }else{
                boardCoord[numX][numY] = 2;
            };
            //判断是否胜利
            winFlag = piece.checkWin(boardCoord,numX,numY,pieceColor);
            if(winFlag === "victory"){
                var msg = new WinMessage();
                msg.writeMsg(ctx,leftDist+baseSize*(rowMount+1));
                document.getElementById("cvs").removeEventListener("click", playing);
            }
            //绘制完成后改变颜色
            pieceColor = piece.changeColor(pieceColor,"white","black");
        };
}