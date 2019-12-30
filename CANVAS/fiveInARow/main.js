var cvs = document.getElementById("cvs");
    var ctx = cvs.getContext("2d");
    var ctxW = ctx.canvas.width;
    var ctxH = ctx.canvas.height;
    //分别为棋盘距离左上的距离、行与列内格子数、格子大小
    var topDist = 25;
    var leftDist = 30;
    var rowMount = 16;
    var colMount = 16;
    var baseSize = 30;

    //棋盘定位数组
    var boardCoord = [];
    //棋盘
    var board = new Pieceboard();
    //右侧描述
    writeInit(ctx,leftDist+baseSize*(rowMount+1));
    //绘制棋盘
    board.draw(ctx,leftDist,topDist,baseSize,rowMount,colMount);
    //得到定位坐标系
    board.getCoord(boardCoord,rowMount,colMount);

    //棋子颜色、棋盘中序号
    var pieceColor = "white";
    var numX = 0;
    var numY = 0;

    //是否胜利
    var winFlag = "";

    //为cvs添加点击事件
    document.getElementById("cvs").addEventListener("click",playing);