/**
 * Created by Administrator on 2016/8/8.
 */

var can;
var ctx;
var w;
var h;
var starPic = new Image();

var padLeft = 0;
var padTop = 0;

var starWidth = 1000;
var starHeight = 380;

var starNum=60; //星星的数量
var stars=[];   //定义的星星类

var lastTime;//上一帧刷新的时间；
var delataTime;//两帧之间的时间间隔

var life=0;

var switchy = false;

function init(){
    can = document.getElementById("canvas");
    ctx = can.getContext("2d");

    w = can.width;
    h = can.height;

    document.addEventListener("mousemove",mousemove,false);

  //  girlPic.src = "images/girl.jpg";
    starPic.src = "data:image/png;base64,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";

    for(var i=0;i<starNum;i++){
        var obj=new starObj();
        stars.push(obj);
        stars[i].init();
    }

    lastTime=Date.now();    //获得当前时间

    gameloop();
}
document.body.onload=init;

function gameloop(){
    window.requestAnimFrame(gameloop);  //两帧之间刷新的时间间隔是动态变化的

    var now = Date.now(); //当前时间
    delataTime = now - lastTime;
    lastTime = now;

    fillCanvas();
    aliveupDate();
    drawStars();
}


function fillCanvas(){
    ctx.clearRect(0,0,1000,380);
    ctx.beginPath();
     ctx.fillStyle="rgba(0,0,0,0)";
    ctx.fillRect(0, 0, w, h);
    ctx.closePath();

}

function mousemove(e){
    if(e.offsetX || e.layerX){
        var px = e.offsetX == undefined ? e.layerX : e.offsetX;
        var py = e.offsetY == undefined ? e.layerY : e.offsetY;


        if (px > padLeft && px < (padLeft + starWidth) && py > padTop && py < (padTop + starHeight)) {
            switchy = true;
        } else {
            switchy = false;
        }
    }
}

var starObj=function(){
    this.x;
    this.y;

    this.picNo;
    this.timer;

    this.xSpeed;
    this.ySpeed;
}

starObj.prototype.upDate=function(){
    this.x+=this.xSpeed*delataTime*0.004;
    this.y+=this.ySpeed*delataTime*0.004;
    this.timer+=delataTime;
    if(this.timer>50){this.picNo+=1;this.picNo%=7;this.timer=0;}
    if(this.x<0||this.x>1000){
        this.init();
        return;
    }
    if(this.y<0||this.y>380){
        this.init();
        return;
    }

}

starObj.prototype.init=function(){
    this.x=Math.random()*1000; //返回[0,1]
    this.y=Math.random()*380;

    this.picNo=Math.floor(Math.random()*7);
    this.timer=0;

    this.xSpeed=Math.random()*3-1.5;
    this.ySpeed=Math.random()*4-2;
}

starObj.prototype.draw=function(){
    ctx.save();

    ctx.globalAlpha=life;
    ctx.drawImage(starPic,this.picNo * 7,0,7,7,this.x,this.y,7,7);
//globalAlpha全局透明度
//save() 使两者之间的内容仅作用于两者之间
// restore（）
    ctx.restore();

}

function drawStars(){
    for(var i=0;i<starNum;i++){
        stars[i].upDate();
        stars[i].draw();
    }
}

function aliveupDate(){
    if (switchy) {
        life += 0.03 * delataTime * 0.05;
        if (life > 1) {
            life = 1;
        }
    } else {
        life -= 0.03 * delataTime * 0.05;
        if (life < 0) {
            life = 0;
        }
    }
}
