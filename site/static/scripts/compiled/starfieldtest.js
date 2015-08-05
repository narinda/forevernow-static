function $i(id) { return document.getElementById(id); }

var url=document.location.href;

var flag=true;
var test=false;
var n=512;
var w=0;
var h=0;
var x=0;
var y=0;
var z=0;
var star_color_ratio=0;
var star_x_save,star_y_save;
var star_ratio=180;
var star_speed=0.15;
var star_speed_save=0;
var star=new Array(n);
var color;
var opacity=1;

var cursor_x=0;
var cursor_y=0;
var mouse_x=0;
var mouse_y=0;

var canvas_x=0;
var canvas_y=0;
var canvas_w=0;
var canvas_h=0;
var context;

var key;
var ctrl;

var timeout;
var fps=0;

function init()
  {
  var a=0;
  for(var i=0;i<n;i++)
    {
    star[i]=new Array(5);
    star[i][0]=Math.random()*w*2-x*2;
    star[i][1]=Math.random()*h*2-y*2;
    star[i][2]=Math.round(Math.random()*z);
    star[i][3]=0;
    star[i][4]=0;
    }
  var starfield=$i('starfield');
  starfield.style.position='absolute';
  starfield.style.display='block';
  starfield.width=w;
  starfield.height=h;
  context=starfield.getContext('2d');
  context.fillStyle='rgb(18,18,18)';
  context.strokeStyle='rgb(180,190,180)';
  }

function anim()
  {
  mouse_x=cursor_x-x;
  mouse_y=cursor_y-y;
  context.fillRect(0,0,w,h);
  for(var i=0;i<n;i++)
    {
    test=true;
    star_x_save=star[i][3];
    star_y_save=star[i][4];
    star[i][0]+=mouse_x>>4; if(star[i][0]>x<<1) { star[i][0]-=w<<1; test=false; } if(star[i][0]<-x<<1) { star[i][0]+=w<<1; test=false; }
    star[i][1]+=mouse_y>>4; if(star[i][1]>y<<1) { star[i][1]-=h<<1; test=false; } if(star[i][1]<-y<<1) { star[i][1]+=h<<1; test=false; }
    star[i][2]-=star_speed; if(star[i][2]>z) { star[i][2]-=z; test=false; } if(star[i][2]<0) { star[i][2]+=z; test=false; }
    star[i][3]=x+(star[i][0]/star[i][2])*star_ratio;
    star[i][4]=y+(star[i][1]/star[i][2])*star_ratio;
    if(star_x_save>0&&star_x_save<w&&star_y_save>0&&star_y_save<h&&test)
      {
      context.lineWidth=(1-star_color_ratio*star[i][2])*2;
      context.beginPath();
      context.moveTo(star_x_save,star_y_save);
      context.lineTo(star[i][3],star[i][4]);
      context.stroke();
      context.closePath();
      }
    }
  timeout=setTimeout('anim()',fps);
  }


function start()
  {
  resize();
  anim();
  }

function resize()
  {
  var bh = $('body').height();
  var bw = $('body').width();
  w = (bw > document.documentElement.clientWidth) ? bw : document.documentElement.clientWidth;
  h = (bh > document.documentElement.clientHeight) ? bh : document.documentElement.clientHeight;
  x=Math.round(w/2);
  y=Math.round(h/2);
  z=(w+h)/2;
  star_color_ratio=1/z;
  cursor_x=x-0;
  cursor_y=y+0;
  init();
}

$(document).ready(function() {
  start();
  $(window).on('resize', resize);
})