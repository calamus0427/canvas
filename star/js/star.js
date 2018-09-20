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
    starPic.src = "images/star.png";

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
