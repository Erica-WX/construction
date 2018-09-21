var canvas = document.getElementById("canvas");
canvas.width = 500;
canvas.height = 400;
var cxt = canvas.getContext("2d");

var flag  =  false;
var x_curl  =  0; // 鼠标开始移动的位置X
var y_curl  =  0; // 鼠标开始移动的位置Y
var i  =  2;
var pointList  =  [];
var curlArray=[];

function draw(){

    canvas.style.cursor = "crosshair";

    //为画布增加监听事件
    canvas.addEventListener("mousedown",mouseDownCurl);
    canvas.addEventListener("mousemove",mouseMoveCurl);
    canvas.addEventListener("mouseup",mouseUpCurl);

}

function drawCurls(){
    for(var i=0;i<curlArray.length;i++){
        cxt.moveTo(curlArray[i][0],curlArray[i][1]);
        for(var j=2;j<curlArray[i].length-1;j=j+2){
            cxt.lineTo(curlArray[i][j],curlArray[i][j+1]);
        }

        console.log(curlArray);
        cxt.stroke();
        cxt.beginPath();
    }
}

function deleteCurl(){
    cxt.clearRect(0,0,canvas.width,canvas.height);//清空
    curlArray = [];
    /*cxt.drawImage(image,Pic_x,Pic_y,Pic_width,Pic_height);*/
}

function drawPencil(e){
    if(flag){
        cxt.lineTo(e.offsetX,e.offsetY);
        /* cxt.strokeStyle=colorArray[index2];*/
        cxt.stroke(); // 调用绘制方法
        if(Math.abs(e.offsetX-pointList[i-2])>2&&Math.abs(e.offsetY-pointList[i-1])>2){
            pointList[i]  =  e.offsetX;
            pointList[i+1]  =  e.offsetY;
            i  =  i + 2;
        }
        console.log("pointList:"+pointList);
    }else{
        cxt.beginPath();
    }
}

function mouseDownCurl(e) {
    x_curl  =  e.offsetX; // 鼠标落下时的X
    y_curl  =  e.offsetY; // 鼠标落下时的Y
    pointList[0]=x_curl;
    pointList[1]=y_curl;
    flag  =  true;
}

function mouseMoveCurl(e) {
    drawPencil(e);
}

function mouseUpCurl() {
    flag  =  false;

    //Store the curl to Array
    var tmp = pointList;
    // curlArray[index2]=tmp;
    curlArray.push(tmp);
    pointList=[];
    i=2;

}
