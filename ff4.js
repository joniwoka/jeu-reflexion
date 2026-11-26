var FO='#10142c';
function fG(w,h){return{w:w,h:h,p:new Array(w*h).fill(null)}}
function fS(g,x,y,c){x=Math.floor(x);y=Math.floor(y);if(x>=0&&y>=0&&x<g.w&&y<g.h&&c)g.p[y*g.w+x]=c}
function fE(g,cx,cy,rx,ry,r,o){o=o||{};if(typeof r==='string')r=[r,r,r];for(var y=Math.floor(cy-ry);y<=Math.ceil(cy+ry);y++){if(o.y1!=null&&y>o.y1)continue;if(o.y0!=null&&y<o.y0)continue;for(var x=Math.floor(cx-rx);x<=Math.ceil(cx+rx);x++){var nx=(x+.5-cx)/rx,ny=(y+.5-cy)/ry;if(nx*nx+ny*ny>1)continue;var v=nx*.55+ny*.8;fS(g,x,y,v>.5?r[2]:v<-.62?r[0]:r[1])}}}
function fB(g,x,y,w,h,r,rad){rad=rad||0;if(typeof r==='string')r=[r,r,r];for(var j=0;j<h;j++)for(var i=0;i<w;i++){var cx=i<rad?rad-i-.5:i>=w-rad?i-(w-rad)+.5:0,cy=j<rad?rad-j-.5:j>=h-rad?j-(h-rad)+.5:0;if(rad&&cx*cx+cy*cy>rad*rad)continue;var c=r[1];if(j===0||i===0)c=r[0];if(j===h-1||i===w-1)c=r[2];if(h<=2||w<=2)c=r[1];fS(g,x+i,y+j,c)}}
function fP(g,pts,r,dir){dir=dir||[.5,.85];var x0=1e9,x1=-1e9,y0=1e9,y1=-1e9;pts.forEach(function(p){x0=Math.min(x0,p[0]);x1=Math.max(x1,p[0]);y0=Math.min(y0,p[1]);y1=Math.max(y1,p[1])});
var cx=(x0+x1)/2,cy=(y0+y1)/2,ext=Math.abs(dir[0])*(x1-x0)/2+Math.abs(dir[1])*(y1-y0)/2||1;
for(var y=Math.floor(y0);y<=Math.ceil(y1);y++){var xs=[];for(var i=0;i<pts.length;i++){var a=pts[i],b=pts[(i+1)%pts.length];if((a[1]<=y+.5&&b[1]>y+.5)||(b[1]<=y+.5&&a[1]>y+.5))xs.push(a[0]+(y+.5-a[1])*(b[0]-a[0])/(b[1]-a[1]))}
xs.sort(function(p,q){return p-q});for(var k=0;k+1<xs.length;k+=2)for(var x=Math.round(xs[k]);x<Math.round(xs[k+1]);x++){var t=((x+.5-cx)*dir[0]+(y+.5-cy)*dir[1])/ext;fS(g,x,y,typeof r==='string'?r:t>.55?r[2]:t<-.6?r[0]:r[1])}}}
function fL(g,x0,y0,x1,y1,w,col){var dx=x1-x0,dy=y1-y0,n=Math.max(Math.abs(dx),Math.abs(dy),1);for(var s=0;s<=n;s++){var px=x0+dx*s/n,py=y0+dy*s/n;for(var a=0;a<w;a++)for(var b=0;b<w;b++)fS(g,Math.round(px)+a-(w>>1),Math.round(py)+b-(w>>1),col)}}
function fT(g,cx,top,h,hw,r){fP(g,[[cx-hw,top+h],[cx,top],[cx+hw,top+h]],r,[.4,.9])}
function fOut(g){var o=fG(g.w+2,g.h+2),x,y;for(y=0;y<g.h;y++)for(x=0;x<g.w;x++)o.p[(y+1)*o.w+x+1]=g.p[y*g.w+x];var q=o.p.slice();for(y=0;y<o.h;y++)for(x=0;x<o.w;x++){if(q[y*o.w+x])continue;var n=(x>0&&q[y*o.w+x-1])||(x<o.w-1&&q[y*o.w+x+1])||(y>0&&q[(y-1)*o.w+x])||(y<o.h-1&&q[(y+1)*o.w+x]);if(n)o.p[y*o.w+x]=FO}return o}
var FXC={};
function fSprite(key,w,h,fn){if(FXC[key])return FXC[key];var g=fG(w,h);fn(g);var o=fOut(g),cv=null;
if(typeof document!=='undefined'){cv=document.createElement('canvas');cv.width=o.w;cv.height=o.h;var c=cv.getContext('2d');for(var y=0;y<o.h;y++)for(var x=0;x<o.w;x++){var col=o.p[y*o.w+x];if(col){c.fillStyle=col;c.fillRect(x,y,1,1)}}}
return FXC[key]={cv:cv,cw:w,ch:h,g:o}}
function fBlit(c,sp,x,y,sc,flip){c.save();if(flip){c.translate(Math.round(x+sp.cw*sc),Math.round(y));c.scale(-sc,sc)}else{c.translate(Math.round(x),Math.round(y));c.scale(sc,sc)}c.drawImage(sp.cv,-1,-1);c.restore()}
var FR={
steel:['#ffffff','#c4d0f0','#7e8cc0','#4a5688'],
blue:['#9ac0ff','#4a7cf0','#2a4cc0','#18288a'],
gold:['#fff4a0','#f8c830','#c08818','#805808'],
skin:['#fff0dc','#ffd0a8','#e09870','#a86848'],
hair:['#ffffff','#e4e8fa','#a8b0d8','#6870a0'],
red:['#ff9a8a','#e03a30','#a82020','#701010'],
leath:['#d8a068','#a8703c','#7a4a24','#4a2c14'],
green:['#d8ffc8','#6ee060','#34a838','#1a6a28'],
gray:['#eef2fa','#aeb8cc','#6e7c9a','#3e4862'],
violet:['#e8c8ff','#a460e0','#7034b0','#3e1a70'],
magenta:['#ffc0e8','#e070c0','#a03c90','#601a58'],
cream:['#fffae0','#f0e0a8','#c8a868','#887040'],
bone:['#ffffff','#f4ecd0','#c8b888','#8a7a50'],
crim:['#ffb0a0','#e04030','#a01c1c','#600c10'],
navy:['#5a68d8','#2c3aa0','#1c2470','#10144c']};
function fcol(h,i){return FR[h][i]}

function pxHead(v){return fSprite('fhead'+v,20,20,function(g){var S=FR.steel,H=FR.hair,K=FR.skin,G=FR.gold,D='#10142c';
fP(g,[[7,8],[4,8],[2,13],[2,19],[6,17],[8,13]],H,[.5,.8]);
fB(g,9,15,5,5,K,0);
fE(g,13,12,5.5,5.5,K);
fB(g,6,10,4,8,S,1);
fE(g,10,9,8,7.5,S,{y1:10});
fB(g,5,9,13,2,S,0);fB(g,5,10,13,1,G,0);
fP(g,[[7,5],[3,0],[4,6]],G,[.4,.9]);fP(g,[[13,4],[18,0],[17,6]],G,[.4,.9]);fB(g,9,2,3,3,G,0);fS(g,10,2,'#fff4a0');
fB(g,8,5,1,4,FR.blue,0);
if(v==='h'||v==='x'){fL(g,13,12,15,13,1,D);fL(g,15,12,13,13,1,D);if(v==='x'){fL(g,13,11,15,14,1,D);fL(g,15,11,13,14,1,D)}fB(g,14,15,3,2,'#601818',0)}
else if(v==='s'){fS(g,13,13,D);fS(g,14,12,D);fS(g,15,12,D);fS(g,16,13,D);fB(g,13,15,4,2,'#601818',0);fS(g,14,16,'#ff8090');fS(g,15,16,'#ff8090')}
else{fB(g,13,11,3,3,'#ffffff',0);fB(g,14,11,2,3,'#3060e0',0);fS(g,15,12,D);fS(g,14,11,'#ffffff');
if(v==='o')fB(g,14,15,3,2,'#601818',0);else{fS(g,14,16,'#b05040');fS(g,15,16,'#b05040');fS(g,16,15,'#b05040')}}
fS(g,17,13,K[2]);fS(g,12,15,'#ff9a8a')
})}
function pxTorso(){return fSprite('ftorso',15,16,function(g){var S=FR.steel,B=FR.blue,G=FR.gold;
fB(g,3,6,9,10,B,0);
fB(g,2,0,11,9,S,2);fB(g,6,1,3,7,G,0);fB(g,4,3,7,2,G,0);fS(g,7,3,'#ffffff');
fB(g,2,9,11,2,G,0);fB(g,6,9,3,2,FR.red,0);
fB(g,2,11,4,5,S,0);fB(g,6,11,3,5,B,0);fB(g,9,11,4,5,S,0);fB(g,2,15,11,1,G,0);
fE(g,12,3,3.4,3.2,S);fB(g,9,0,6,1,G,0);fE(g,2,3,2.4,3,S)})}
function pxBoot(){return fSprite('fboot',11,7,function(g){var S=FR.steel,G=FR.gold;fB(g,0,0,6,4,S,0);fB(g,0,0,6,1,G,0);fB(g,0,3,11,4,S,1);fB(g,8,5,3,2,G,0)})}
function pxShield(t){return fSprite('fshield'+t,10,13,function(g){var G=FR.gold,B=t===2?FR.steel:FR.leath;
fP(g,[[0,0],[10,0],[10,6],[5,13],[0,6]],G,[.5,.85]);fP(g,[[1,1],[9,1],[9,6],[5,11],[1,6]],B,[.5,.85]);
fB(g,4,2,2,8,t===2?FR.blue:G,0);fB(g,2,4,6,2,t===2?FR.blue:G,0)})}

function pxSlime(v){return fSprite('fslime'+v,44,30,function(g){var Gr=FR.green,D='#10142c';
fE(g,22,22,20,7,Gr);fE(g,22,15,16,12,Gr,{y1:24});
fE(g,13,8,5,3,['#ffffff','#ffffff','#ffffff']);fS(g,9,11,'#ffffff');fS(g,8,12,'#ffffff');
[[15,16],[29,16]].forEach(function(e){fE(g,e[0],e[1],3.6,4.4,['#ffffff','#ffffff','#e8f0ff']);fB(g,e[0]+(e[0]<20?0:0),e[1]-1,3,4,D,0);fS(g,e[0],e[1]-1,'#ffffff')});
if(v==='a'){fB(g,17,22,10,5,'#401020',1);fB(g,19,25,6,2,'#ff7090',0);fL(g,11,10,19,14,2,D);fL(g,33,10,25,14,2,D)}
else{fL(g,18,23,26,23,1,D);fS(g,17,22,D);fS(g,27,22,D)}
fS(g,6,28,Gr[2]);fS(g,6,29,Gr[2]);fS(g,37,28,Gr[2]);fB(g,9,21,3,2,'#ffb0b8',1);fB(g,33,21,3,2,'#ffb0b8',1)})}
function pxWolf(v){return fSprite('fwolf'+v,58,38,function(g){var W=FR.gray,D='#10142c',R=FR.red;
fP(g,[[12,18],[3,16],[0,8],[4,11],[2,3],[8,10],[12,13]],W,[.4,.9]);fP(g,[[10,17],[5,14],[3,9],[8,13]],['#ffffff','#eef2fa','#cfd8ea'],[.4,.9]);
fL(g,14,26,12,36,5,W[1]);fL(g,21,27,23,36,5,W[2]);
fE(g,14,20,8,8,W);fE(g,28,19,14,8.5,W);fE(g,39,19,8,9,W);fE(g,28,24,11,4,['#eef2fa','#eef2fa','#cfd8ea']);
fL(g,34,27,33,36,5,W[1]);fL(g,41,27,44,36,5,W[2]);
[[11,36],[20,36],[32,36],[43,36]].forEach(function(f){fB(g,f[0]-1,f[1]-1,7,3,['#ffffff','#e4ecf8','#9aa8c0'],1)});
fE(g,45,12,6.5,6,W);fP(g,[[48,9],[57,13],[57,16],[48,18]],W,[.4,.9]);
if(v==='a'){fP(g,[[48,17],[56,18],[53,26],[47,22]],'#401020');fP(g,[[49,21],[53,21],[52,24]],'#ff7090')}
else fP(g,[[47,16],[55,16],[52,20],[46,19]],['#cfd8ea','#cfd8ea','#8a98b4'],[.3,.9]);
for(var i=0;i<4;i++)fT(g,49+i*2,v==='a'?15:16,3,1,['#ffffff','#ffffff','#e4ecf8']);
fS(g,57,13,D);fS(g,56,13,D);
fT(g,41,0,9,2.6,W);fT(g,47,1,8,2.4,W);fT(g,41,3,5,1.1,['#ffb0c0','#ff90a8','#d86080']);
fB(g,46,10,4,3,['#fff0a0','#ff4030','#a01010'],0);fS(g,48,10,'#fff0a0');
[[31,7],[27,6],[23,7],[19,9],[35,8],[38,9]].forEach(function(m,i){fT(g,m[0],m[1]-2,8,2+(i%2),W)});
fL(g,17,27,12,30,1,W[3]);fL(g,30,28,27,31,1,W[3])})}
function pxDrake(v){return fSprite('fdrake'+v,58,52,function(g){var P=FR.violet,M=FR.magenta,C=FR.cream,D='#10142c';
fP(g,[[26,26],[6,3],[14,13],[1,14],[10,24],[3,34],[22,34]],M,[.5,.8]);
fL(g,26,26,6,3,2,P[2]);fL(g,26,26,1,14,1,P[2]);fL(g,26,26,3,34,1,P[2]);fL(g,26,28,10,24,1,P[2]);
fL(g,16,42,8,47,5,P[1]);fL(g,8,47,3,50,3,P[2]);fT(g,2,46,6,3,FR.gold);
fE(g,22,40,7,8,P);fL(g,24,46,22,51,5,P[1]);fL(g,31,46,33,51,5,P[2]);
fB(g,19,48,6,3,C,1);fB(g,30,48,7,3,C,1);
fE(g,27,29,11,13,P);fE(g,31,31,7,10,C);
for(var k=0;k<5;k++)fB(g,26,23+k*4,10,1,C[2],0);
for(var s=0;s<5;s++)fT(g,18+s*2,16+s*2,5,1.6,FR.gold);
fL(g,34,26,40,32,3,P[1]);fT(g,41,31,4,1.5,C);fT(g,43,30,4,1.5,C);
fL(g,30,18,36,12,6,P[1]);fE(g,39,10,7.2,6.4,P);fP(g,[[43,8],[55,12],[55,16],[43,17]],P,[.4,.9]);
if(v==='a'){fP(g,[[44,15],[55,17],[53,24],[43,19]],'#401020');fP(g,[[46,18],[52,18],[50,23]],'#ff8a30')}
else fP(g,[[43,16],[54,16],[52,20],[43,19]],[P[0],P[1],P[2]],[.3,.9]);
for(var i=0;i<4;i++)fT(g,45+i*2.5,v==='a'?14:15,3,1,['#ffffff','#ffffff','#e0d8c0']);
fS(g,54,12,D);fS(g,53,12,D);fB(g,40,7,5,4,['#fff0a0','#ffe060','#e08820'],0);fB(g,43,7,2,4,D,0);
fP(g,[[36,5],[31,0],[40,3]],C,[.5,.8]);fP(g,[[40,4],[37,0],[44,3]],C,[.5,.8])})}
function pxBehemoth(v){return fSprite('fbehe'+v,76,56,function(g){var P=FR.violet,R=FR.crim,B=FR.bone,D='#10142c';
fL(g,10,22,2,26,6,P[1]);fE(g,3,29,6,6,FR.gray);for(var q=0;q<6;q++){var a=q*1.05;fT(g,3+Math.round(Math.cos(a)*6),29+Math.round(Math.sin(a)*6),3,1,B)}
fB(g,10,38,9,16,P,2);fB(g,22,40,8,14,P,2);fB(g,47,38,9,16,P,2);fB(g,58,40,8,14,P,2);
[[10,52],[22,52],[47,52],[58,52]].forEach(function(f){fB(g,f[0]-1,f[1],11,4,B,1)});
fE(g,38,28,27,16,P);fE(g,38,38,22,7,['#e8c8ff','#c8a0e8','#8a5cc0']);
fE(g,22,22,8,7,B);fB(g,17,18,10,2,FR.gold,0);
for(var s=0;s<9;s++){var sx=14+s*5.5,sy=14-Math.round(5*Math.sin(s/8*3.14));fT(g,sx,sy-8+(s<2||s>6?3:0),11-(s<2||s>6?3:0),3,R)}
fE(g,62,24,12,11,P);fP(g,[[56,28],[74,31],[72,40],[58,40]],P,[.4,.9]);
if(v==='a'){fP(g,[[58,33],[74,34],[71,45],[57,41]],'#401020');fP(g,[[61,37],[69,37],[67,43],[62,42]],'#ff7090')}
fT(g,60,v==='a'?33:35,6,1.8,B);fT(g,67,v==='a'?33:35,6,1.8,B);fP(g,[[57,40],[60,48],[62,40]],B,[.5,.8]);fP(g,[[68,39],[71,46],[72,38]],B,[.5,.8]);
fP(g,[[55,16],[50,2],[56,0],[60,10]],B,[.5,.8]);fP(g,[[64,12],[66,0],[72,2],[69,14]],B,[.5,.8]);
fB(g,56,18,8,4,['#fff0a0','#ff3020','#a01010'],0);fS(g,59,19,'#fff');fB(g,55,16,9,2,D,0);fS(g,73,31,D);fS(g,72,31,D);
for(var m=0;m<5;m++)fT(g,50+m*3,10+m*1.5,7,2,R)})}
function pxRed(v){return fSprite('fred'+v,92,64,function(g){var Rd=FR.crim,Go=FR.gold,D='#10142c',B=FR.bone;
fP(g,[[62,34],[70,12],[66,4],[78,10],[86,6],[90,18],[88,30],[80,38]],FR.magenta,[.5,.8]);fL(g,62,34,68,5,2,Rd[2]);fL(g,64,34,86,7,2,Rd[2]);fL(g,64,36,90,20,1,Rd[2]);fL(g,64,36,88,30,1,Rd[2]);
fP(g,[[70,42],[84,44],[91,36],[86,52],[76,50]],Rd,[.5,.8]);fT(g,90,32,8,3,Go);
fL(g,66,48,66,60,8,Rd[2]);fB(g,60,59,14,4,B,1);
fE(g,47,41,26,16,Rd);fE(g,40,48,18,8,Go);for(var j=0;j<4;j++)fB(g,28+j,42+j*3,22-j*2,1,Go[2],0);
fL(g,36,50,32,60,8,Rd[1]);fB(g,26,59,14,4,B,1);
fL(g,30,34,22,28,12,Rd[1]);fL(g,22,28,18,20,10,Rd[1]);fE(g,15,15,10,8,Rd);
fP(g,[[8,10],[-1,13],[0,20],[10,19]],Rd,[.4,.9]);
var jd=v==='a'?5:0;fP(g,[[10,19],[0,19],[3,26+jd],[12,24+jd]],Rd[2]);
if(v==='a'){fP(g,[[2,19],[10,19],[11,24+jd],[3,22+jd]],'#401020')}
for(var k=0;k<4;k++){fS(g,2+k*3,18,'#fff');fS(g,4+k*3,21+jd,'#fff')}
fB(g,9,10,5,3,['#fff0a0','#ffe060','#e08820'],0);fS(g,11,11,D);fB(g,6,8,9,2,Rd[3],0);
fL(g,16,8,22,3,3,B[1]);fL(g,22,3,28,1,2,B[1]);fL(g,10,7,12,0,2,B[1]);
for(var m=0;m<5;m++)fT(g,26+m*6,36-Math.round(Math.sin(m/4*2)*3)-6,8,2,Go)})}

function drawHero(c,x,y,sc,st){
if(!st||typeof st!=='object')st={pose:st?'attack':'idle',t:Date.now()/16,p:.5,glow:!!st};
var pose=st.pose||'idle',t=st.t||0,p=st.p||0,S=Math.sin,C=Math.cos,swt=st.sw||0,el=st.el?PXEL[st.el]:null;
var bc=el?el[1]:['#e8f0ff','#cfe6ff','#ffe0a0','#eadcff'][swt],gcl=el?el[0]:['#a0e0ff','#80c0ff','#ff9a30','#c060ff'][swt];
var br=S(t/(pose==='weak'?6:pose==='tired'?10:16))>0?1:0;
var uy=br,lean=0,hdy=0,phi=40,th=-35,hand=null,bx=13,fx=25,kneel=false,hv='n',glow=!!st.glow||swt>=2||!!el,run=0,hop=0;
if(pose==='ready'){lean=1;phi=-10;th=-60;glow=true}
else if(pose==='tired'){uy=2+br;lean=2;hdy=2;phi=60;th=-20;bx=13;fx=23}
else if(pose==='weak'){kneel=true;uy=7+br;lean=2;hdy=3;hand=[31+lean,29];th=95}
else if(pose==='hurt'){uy=1;lean=-4;hdy=-1;phi=70;th=-10;hv='h';bx=12;fx=22}
else if(pose==='walk'){run=1;uy=S(t/3)>.5?1:0;lean=2;phi=30;th=-25}
else if(pose==='cheer'){hop=Math.abs(S(t/6))*4;uy=-Math.round(hop);phi=-80;th=-80;hv='s';bx=15;fx=24}
else if(pose==='win'){hop=Math.abs(S(t/9))*6;uy=-Math.round(hop);phi=-95;th=-90;hv='s';bx=10;fx=27;glow=true}
else if(pose==='dead'){kneel=true;uy=9;lean=4;hdy=6;hand=[32+lean,31];th=98;hv='x'}
else if(pose==='attack'){glow=true;hv='o';bx=8;fx=31;
if(p<.35){var k=p/.35;th=-60+(-75)*k;phi=-10+(-90)*k;lean=Math.round(-3*k)}
else{var k2=Math.min(1,(p-.35)/.65);th=-135+185*k2;phi=-100+130*k2;lean=3}}
var gy=46;if(!kneel&&pose!=='attack')uy=Math.min(uy,2);
var L=lean,hipx=19+Math.round(L*.5),hipy=33+uy;
c.save();c.translate(st.flip?x+40*sc:x,y);c.scale(st.flip?-sc:sc,sc);
if(st.special){c.globalAlpha=.22+.1*S(t/2);disc(c,22,28,27,gcl);c.globalAlpha=.18;disc(c,22,28,18,'#fff');c.globalAlpha=1}
R(c,6,gy-1,30,2,'rgba(0,0,0,.35)');
var capeL=Math.min(23,gy-19-uy-(kneel?2:0)),sw=pose==='win'||pose==='cheer'?3:0;
for(var j=0;j<capeL;j++){var x0=13+L-3-Math.round(j*(run?.6:pose==='attack'?.4:.15))-Math.round(S(t/9+j/5)*(1+j/9))-sw,w=6+Math.round(j*.12),yy=19+uy+j,hem=j>capeL-3;
R(c,x0-1,yy,w+2,1,FO);R(c,x0,yy,w,1,hem?'#f8c830':(j%7<3?'#2a4cc0':'#1c3aa0'));R(c,x0,yy,2,1,hem?'#fff4a0':'#4a7cf0');R(c,x0+w-2,yy,2,1,hem?'#c08818':'#18288a')}
var hx0=16+L,hy0=6+uy+hdy;
if(kneel){pxLimb(c,hipx,hipy,12,gy-3,5,'#7e8cc0','#c4d0f0','#4a5688');fBlit(c,pxBoot(),6,gy-6,1,false);
pxLimb(c,hipx+1,hipy-1,hipx+9,hipy-6,5,'#9aa8d8','#e4ecff','#5a6698');pxLimb(c,hipx+9,hipy-6,hipx+10,gy-5,5,'#9aa8d8','#e4ecff','#5a6698');fBlit(c,pxBoot(),hipx+6,gy-6,1,false)}
else{var b1=bx,b2=fx,l1=0,l2=0;if(run){var s=S(t/3);b1=14-s*6;b2=24+s*6;l1=Math.max(0,-s)*4;l2=Math.max(0,s)*4}
if(pose==='cheer'||pose==='win'){l1=hop*.7;l2=hop*.7}
pxLimb(c,hipx-1,hipy,b1+3,gy-7-l1,5,'#7e8cc0','#c4d0f0','#4a5688');fBlit(c,pxBoot(),Math.round(b1-1),Math.round(gy-7-l1),1,false);
pxLimb(c,hipx+2,hipy,b2+2,gy-7-l2,5,'#9aa8d8','#e4ecff','#5a6698');fBlit(c,pxBoot(),Math.round(b2-2),Math.round(gy-7-l2),1,false)}
fBlit(c,pxTorso(),14+L,17+uy,1,false);
if(st.amu){R(c,25+L,20+uy,1,2,'#f8d838');P(c,24+L,22+uy,3,3,st.amu===2?'#707890':'#40e0ff');if(st.amu===1)R(c,25+L,23+uy,1,1,'#fff')}
fBlit(c,pxHead(hv),hx0-2,hy0-7,1,false);
if(pose==='tired'||pose==='weak'){R(c,hx0+11,hy0+4+((t>>1)%10),1,2,'#9ad8ff')}
if(st.shield){var bx0=19+L+(st.block?6:0),by0=24+uy;fBlit(c,pxShield(st.shield===2?2:1),bx0,by0,1,false);if(st.block){c.globalAlpha=.7;disc(c,bx0+11,by0+5,4,'#fff');c.globalAlpha=1}}
var sx=23+L,sy=22+uy,ex,ey;
if(hand){ex=hand[0];ey=hand[1]}else{ex=sx+C(phi*DEG)*9;ey=sy+S(phi*DEG)*9}
pxLimb(c,sx,sy,(sx+ex)/2+1,(sy+ey)/2,4,'#aab6dc','#e8f0ff','#6a78a8');pxLimb(c,(sx+ex)/2+1,(sy+ey)/2,ex,ey,4,'#8e9cc8','#d0dcf8','#566494');R(c,Math.round(ex)-1,Math.round(ey)-1,4,4,'#f8c830');
var tx=ex+C(th*DEG)*20,ty=ey+S(th*DEG)*20;
if(glow){c.globalAlpha=.3+.15*S(t/6);for(var i=2;i<=20;i+=4)disc(c,Math.round(ex+C(th*DEG)*i),Math.round(ey+S(th*DEG)*i),3,gcl);c.globalAlpha=1}
limb(c,ex-C(th*DEG)*5,ey-S(th*DEG)*5,ex,ey,2,'#7a4a24',true);
limb(c,ex,ey,tx,ty,3,bc,true);limb(c,ex+1,ey,tx+1,ty,1,'#fff');
if(swt===3||el)for(var i2=3;i2<=18;i2+=4)R(c,Math.round(ex+C(th*DEG)*i2),Math.round(ey+S(th*DEG)*i2),1,1,el?el[0]:'#8a3ad0');
limb(c,ex-S(th*DEG)*4+C(th*DEG)*2,ey+C(th*DEG)*4+S(th*DEG)*2,ex+S(th*DEG)*4+C(th*DEG)*2,ey-C(th*DEG)*4+S(th*DEG)*2,2,swt===3?'#c8a8ff':'#f8c830',true);
if(pose==='attack'&&p>.4&&p<.9){var a0=-135,a1=th;for(var a=a0;a<=a1;a+=7){var kk=(a-a0)/(a1-a0||1);c.globalAlpha=.15+.6*kk;R(c,Math.round(sx+C(a*DEG)*28),Math.round(sy+S(a*DEG)*28),3,3,el?el[1]:swt===3?'#d8a0ff':swt===2?'#ffd060':'#fff')}c.globalAlpha=1}
if(st.special)for(var q=0;q<7;q++){var aa=t/10+q*.9;R(c,Math.round(22+C(aa)*(18+q%3*3)),Math.round(26+S(aa*1.3)*22),2,2,q%2?'#fff':gcl)}
if(pose==='cheer'||pose==='win')for(var i3=0;i3<6;i3++)R(c,Math.round(20+C(t/20+i3*1.05)*22),Math.round(16+S(t/17+i3)*14),2,2,i3%2?'#fff':'#ffe060');
if(run)for(var i4=0;i4<3;i4++)R(c,Math.round(8-((t+i4*5)%14)),gy-2-i4,2,1,'#c8b890');
c.restore()}
function drawDragon(c,x,y,sc){var t=(typeof T==='number'?T:0),br=(typeof eatk==='number'&&eatk>0),bob=Math.round(Math.sin(t/14)*2),sp=pxRed(br?'a':'i');
R(c,x+8*sc,y+62*sc,76*sc,2*sc,'rgba(0,0,0,.4)');
fBlit(c,sp,x,y+bob*sc,sc,false);
if(br){var f=Math.round(Math.sin(t/2)*3);c.save();c.translate(x,y+bob*sc);c.scale(sc,sc);
fillPoly(c,[[8,24],[-26,14+f],[-34,24],[-26,36-f],[8,28]],'#ff5a10');fillPoly(c,[[8,25],[-20,17+f],[-26,24],[-20,33-f],[8,27]],'#ffb030');fillPoly(c,[[8,26],[-10,21],[-14,24],[-10,29],[8,27]],'#fff0a0');c.restore()}}

function fcl(c,x,y,s,tone){tone=tone||['#ffffff','#e6f0ff','#b8cdf0'];
var P=[[2,7,5],[8,3,7],[15,5,8],[22,3,7],[28,7,5],[11,8,7],[19,8,7]];
P.forEach(function(p){disc(c,Math.round(x+p[0]*s),Math.round(y+p[1]*s),Math.round(p[2]*s),tone[2])});
P.forEach(function(p){disc(c,Math.round(x+p[0]*s),Math.round(y+p[1]*s-s),Math.round(p[2]*s-s),tone[1])});
P.slice(0,5).forEach(function(p){disc(c,Math.round(x+p[0]*s-s),Math.round(y+p[1]*s-2*s),Math.max(1,Math.round(p[2]*s*.55)),tone[0])});
R(c,Math.round(x-5*s),Math.round(y+13*s),Math.round(40*s),Math.round(3*s),'rgba(0,0,0,0)')}
function cloud(c,x,y,s,col){var P=[[2,7,5],[8,3,7],[15,5,8],[22,3,7],[28,7,5],[11,8,7],[19,8,7]],k=s*.55;
P.forEach(function(p){disc(c,Math.round(x+p[0]*k),Math.round(y+p[1]*k),Math.max(2,Math.round(p[2]*k)),col)});
c.globalAlpha=.28;P.forEach(function(p){disc(c,Math.round(x+p[0]*k),Math.round(y+p[1]*k+k*1.5),Math.max(1,Math.round(p[2]*k*.8)),'#0a1460')});c.globalAlpha=1;
c.globalAlpha=.55;P.slice(0,5).forEach(function(p){disc(c,Math.round(x+p[0]*k-k),Math.round(y+p[1]*k-k*1.6),Math.max(1,Math.round(p[2]*k*.5)),'#ffffff')});c.globalAlpha=1}
function pine(c,x,base,h,cols){R(c,x-1,base-3,3,4,'#2a1a10');for(var k=0;k<4;k++){var w=Math.round((h/4)*(.55+k*.28)),y=base-3-h+k*Math.round(h/4.4);for(var j=0;j<Math.round(h/3.2);j++){var ww=Math.max(1,Math.round(w*(j+1)/(h/3.2)));R(c,x-ww,y+j,ww*2+1,1,cols[1]);R(c,x-ww,y+j,Math.max(1,Math.round(ww*.5)),1,cols[0]);R(c,x+Math.round(ww*.55),y+j,Math.max(1,Math.round(ww*.45))+1,1,cols[2])}}}
function oak(c,x,base,r,cols){R(c,x-1,base-r,3,r+1,'#3a2414');R(c,x,base-r,1,r+1,'#5a3a20');disc(c,x,base-r-r+2,r,cols[2]);disc(c,x-1,base-r-r+1,r-1,cols[1]);disc(c,x-2,base-r-r,Math.max(2,r-4),cols[0])}
function bush(c,x,y,r,cols){disc(c,x,y,r,cols[2]);disc(c,x-1,y-1,r-1,cols[1]);disc(c,x-r/2|0,y-(r/2|0),Math.max(1,r>>1),cols[0])}
function buildBG(theme){var b=document.createElement('canvas');b.width=W;b.height=H;var c=b.getContext('2d');var n=theme==='night',i,x,y;
if(!n){
grad(c,W,122,['#1a48c4','#2862d8','#3a7ae6','#5090f0','#68a6f6','#84baf9','#a0ccfb','#bcdcfd','#d4ecff','#e8f6ff','#f6fbff','#fff6dc']);
c.globalAlpha=.16;disc(c,252,34,58,'#fff8c8');c.globalAlpha=.22;disc(c,252,34,42,'#fff8c8');c.globalAlpha=1;disc(c,252,34,26,'#fff2a0');disc(c,252,34,21,'#ffe45c');disc(c,252,34,15,'#fff6b8');
for(i=0;i<9;i++){var a1=i*.7,a2=a1+.08;c.globalAlpha=.07;c.fillStyle='#ffffff';c.beginPath();c.moveTo(252,34);c.lineTo(252+Math.cos(a1)*300,34+Math.sin(a1)*300);c.lineTo(252+Math.cos(a2)*300,34+Math.sin(a2)*300);c.fill();c.globalAlpha=1}
for(i=0;i<6;i++){c.globalAlpha=.5;R(c,10+i*47+(i%2)*14,18+((i*13)%34),30+(i%3)*18,1,'#ffffff');R(c,20+i*51,24+((i*17)%30),18+(i%2)*12,1,'#e8f4ff');c.globalAlpha=1}
fcl(c,18,14,1.3);fcl(c,120,6,1.8);fcl(c,196,30,1.1,['#fffaf0','#ffeed8','#f0c8c0']);fcl(c,60,50,.9);fcl(c,238,66,.8);fcl(c,150,64,.7,['#f4f8ff','#dce8fa','#b0c4e8']);fcl(c,12,76,.6,['#f4f8ff','#dce8fa','#b0c4e8']);fcl(c,290,52,.7);
ridge(c,98,56,.021,.047,1,['#b4c8f4','#9cb4e8','#8aa2dc'],74);
ridge(c,108,40,.03,.07,3,['#88a4dc','#6e8ccc','#5a78b8'],0);
c.globalAlpha=.4;R(c,0,96,W,24,'#e8f0ff');c.globalAlpha=1;
grad(c,W,10,['#9cc8f4','#7ab4ee','#5a9ae4'],112);for(i=0;i<40;i++){R(c,(i*37)%W,113+(i%7),6+(i%4)*3,1,i%3?'#d8ecff':'#ffffff')}
castle(c,150,66);
ridge(c,128,24,.05,.11,7,['#66b858','#44963c','#2f7430'],0);
for(x=-4;x<W;x+=9){var hh=14+Math.floor(rnd(x)*10);pine(c,x+4,126,hh,['#5ab05a','#2e8a42','#1c6232'])}
}else{
grad(c,W,122,['#04061a','#080c30','#0e1448','#161c60','#202878','#2c3490','#3c46a6','#5460bc','#6c78cc','#8a90d8','#a8a8dc','#c4b4d8']);
for(i=0;i<190;i++){var sx=Math.floor(rnd(i*3+1)*W),sy=Math.floor(Math.pow(rnd(i*3+2),1.6)*104),br=rnd(i*3+3);R(c,sx,sy,1,1,br>.85?'#ffffff':br>.5?'#d8e0ff':'#8a96d8');if(br>.96){R(c,sx-1,sy,3,1,'#c8d4ff');R(c,sx,sy-1,1,3,'#c8d4ff')}}
for(i=0;i<420;i++){var t=rnd(i+900),off=(rnd(i+1700)-.5)*(rnd(i+2500)-.5)*70,px=Math.round(t*W+off*.7),py=Math.round(8+t*72+off);if(py>=0&&py<110)R(c,px,py,1,1,rnd(i+33)>.5?'#aeb8f4':'#d8dcff')}
c.globalAlpha=.1;for(i=0;i<3;i++){for(x=0;x<W;x+=2){var ay=30+i*7+Math.sin(x*.03+i)*10;R(c,x,Math.round(ay),2,22-i*4,i?'#40e0b0':'#60f0c0')}}c.globalAlpha=1;
c.globalAlpha=.18;disc(c,262,36,52,'#a8b8ff');c.globalAlpha=.22;disc(c,262,36,38,'#c8d4ff');c.globalAlpha=1;
disc(c,262,36,25,'#dce4ff');disc(c,262,36,23,'#f2f4ff');disc(c,255,30,6,'#d0d6f4');disc(c,270,42,4,'#d0d6f4');disc(c,267,28,3,'#dadef8');disc(c,257,44,2,'#d0d6f4');
fcl(c,30,24,1.2,['#8a9ae0','#6a7acc','#4a5aa8']);fcl(c,140,12,1.5,['#8090d8','#6070c4','#44549c']);fcl(c,210,58,.9,['#98a6e8','#7886d4','#5a68b0']);fcl(c,70,64,.8,['#98a6e8','#7886d4','#5a68b0']);
ridge(c,98,56,.021,.047,1,['#7a88d0','#5a68b0','#444f96'],72);
ridge(c,110,40,.03,.07,3,['#44509a','#323c7c','#242c62'],0);
grad(c,W,10,['#2c3680','#242c6c','#1c2458'],112);for(i=0;i<22;i++){R(c,255+(i%5)*2-4,112+i%9,3+(i%3)*2,1,'#e8ecff')}
castle(c,150,66);
ridge(c,128,24,.05,.11,7,['#2a5a58','#1c4440','#12302e'],0);
for(x=-4;x<W;x+=9){var h2=14+Math.floor(rnd(x)*10);pine(c,x+4,126,h2,['#2a6458','#16423e','#0e2c2c'])}
}
grad(c,W,H-126,n?['#1e4a44','#16403a','#10322e','#0a2220']:['#58b848','#48a03c','#388830','#2a6c26'],126);
for(y=126;y<H;y++){var bw=2+Math.floor((y-126)/9);if(Math.floor((y-126)/bw)%2===0){c.globalAlpha=.12;R(c,0,y,W,1,n?'#000030':'#ffffff');c.globalAlpha=1}}
for(i=0;i<130;i++){x=Math.floor(rnd(i+3)*W);y=130+Math.floor(rnd(i+77)*48);var gc=n?['#3a8470','#1c5a50']:['#7ed066','#2e7a2c'];R(c,x,y,1,3,gc[0]);R(c,x+2,y+1,1,2,gc[1]);if(i%7===0){R(c,x,y-1,2,2,['#fff6b0','#ffffff','#f890c0','#ffd040'][i%4])}}
for(i=0;i<9;i++){x=Math.floor(rnd(i+200)*W);y=160+Math.floor(rnd(i+250)*18);R(c,x,y,5,2,n?'#3a4660':'#a8a090');R(c,x,y,3,1,n?'#5a6684':'#d0c8b8');R(c,x+1,y+2,4,1,n?'#222a40':'#706858')}
if(n){for(i=0;i<22;i++){x=Math.floor(rnd(i+400)*W);y=132+Math.floor(rnd(i+450)*44);R(c,x,y,1,1,'#fff8a0');c.globalAlpha=.25;R(c,x-1,y-1,3,3,'#f8f0a0');c.globalAlpha=1}}
bush(c,10,150,12,n?['#3a8068','#245a4c','#163a34']:['#88d870','#48a43c','#2c7228']);oak(c,22,170,10,n?['#3a8068','#245a4c','#163a34']:['#88d870','#48a43c','#2c7228']);
bush(c,308,152,11,n?['#3a8068','#245a4c','#163a34']:['#88d870','#48a43c','#2c7228']);pine(c,300,178,40,n?['#2a6458','#16423e','#0e2c2c']:['#5ab05a','#2e8a42','#1c6232']);
return b}
function buildHome(){var b=mkc(W,H),c=b.getContext('2d'),i,x,y;
grad(c,W,128,['#120c44','#241862','#3c2478','#5e3088','#8a3c92','#b84a94','#dc6486','#f08a78','#fcae72','#ffcc78','#ffe29c','#fff0c0']);
for(i=0;i<60;i++){var sx=Math.floor(rnd(i+1)*W),sy=Math.floor(rnd(i+2)*46);R(c,sx,sy,1,1,rnd(i+3)>.7?'#ffffff':'#c8b8e8')}
c.globalAlpha=.2;disc(c,236,104,70,'#ffd890');c.globalAlpha=.32;disc(c,236,104,52,'#ffd890');c.globalAlpha=1;disc(c,236,104,34,'#ffe0a0');disc(c,236,104,27,'#fff0c0');disc(c,236,104,20,'#fffae0');
c.globalAlpha=.08;c.fillStyle='#fff0c0';for(var k=0;k<9;k++){var a1=(-178+k*20)*Math.PI/180,a2=a1+.14;c.beginPath();c.moveTo(236,104);c.lineTo(236+Math.cos(a1)*340,104+Math.sin(a1)*340);c.lineTo(236+Math.cos(a2)*340,104+Math.sin(a2)*340);c.fill()}c.globalAlpha=1;
fcl(c,14,26,1.5,['#ffd8c8','#f4a8a8','#c0689c']);fcl(c,118,14,1.9,['#ffe4c8','#f8b4a0','#c8708e']);fcl(c,196,44,1.2,['#ffe8c0','#fcb890','#d4748c']);fcl(c,40,72,1,['#ffe4c0','#fcb08c','#d0708a']);fcl(c,290,34,1.1,['#ffd0c0','#f098a4','#b85c94']);fcl(c,150,82,.8,['#ffe8b8','#ffc080','#e0888a']);
for(i=0;i<7;i++){c.globalAlpha=.45;R(c,8+i*45+(i%2)*20,52+((i*9)%30),34+(i%3)*14,1,'#ffd8c0');c.globalAlpha=1}
ridge(c,100,46,.02,.05,3,['#e08ca0','#b86090','#8c4682'],0);
ridge(c,114,34,.035,.08,6,['#a05088','#7a3a78','#5c2c64'],0);
c.globalAlpha=.4;R(c,0,100,W,24,'#f8b08c');c.globalAlpha=1;
castle(c,176,64);c.globalAlpha=.3;R(c,120,20,150,100,'#d0608a');c.globalAlpha=1;
ridge(c,120,28,.04,.09,9,['#6a3a7c','#4c2c62','#38204e'],0);
for(x=-4;x<W;x+=10){pine(c,x+4,128,16+Math.floor(rnd(x)*12),['#6a3e7c','#4a2c62','#341e4a'])}
for(x=0;x<150;x++){y=136+(x>126?Math.round((x-126)*1.2):0);R(c,x,y,1,H-y,'#2a1a40');R(c,x,y,1,2,'#6a9a4a');R(c,x,y+2,1,2,'#4a7a38');R(c,x,y+4,1,1,'#3a5a2c')}
for(i=0;i<22;i++)R(c,Math.floor(rnd(i+5)*146),142+Math.floor(rnd(i+40)*36),3+Math.floor(rnd(i+9)*8),1,'#160c28');
for(i=0;i<12;i++){x=4+i*12;R(c,x,134,1,3,'#78b04c');R(c,x+3,135,1,2,'#4a8a38');if(i%2)R(c,x+1,132,2,2,i%4===1?'#ffe880':'#ff90c8')}
bush(c,12,146,10,['#6aa04c','#3e7436','#264c2c']);oak(c,28,152,9,['#6aa04c','#3e7436','#264c2c']);
for(x=150;x<W;x++)R(c,x,152+((x*7)%3),1,H,'#1c1030');
for(x=152;x<W;x+=12){var hh=28+Math.floor(rnd(x)*16);pine(c,x+5,154,hh,['#2c1a48','#1e1236','#140a28'])}
return b}
function buildOver(){var b=mkc(W,H),c=b.getContext('2d'),i,x,y;
grad(c,W,134,['#04040c','#08081c','#0e0e2c','#161640','#202054','#2c2c68','#3a3a7c']);
for(i=0;i<90;i++){R(c,Math.floor(rnd(i+7)*W),Math.floor(rnd(i+9)*90),1,1,rnd(i+11)>.8?'#a8b0e0':'#5a6098')}
c.globalAlpha=.2;disc(c,40,88,36,'#6a70a8');c.globalAlpha=1;disc(c,40,88,19,'#2a2a54');disc(c,40,88,15,'#9aa0c4');disc(c,35,85,4,'#7a80a4');disc(c,45,92,3,'#7a80a4');disc(c,42,82,2,'#7a80a4');
fcl(c,150,18,1.4,['#3a3a66','#2a2a50','#1c1c3a']);fcl(c,230,50,1,['#34345c','#26264a','#181834']);fcl(c,70,56,.9,['#34345c','#26264a','#181834']);
ridge(c,106,34,.03,.06,2,['#34345c','#262648','#1a1a34'],0);
[[236,112,7,24],[250,102,6,34],[266,116,6,20],[280,108,5,28]].forEach(function(q){R(c,q[0],q[1],q[2],q[3]+22,'#1a1a30');R(c,q[0],q[1],2,q[3]+22,'#2a2a48');R(c,q[0]+q[2]-1,q[1]-2,1,3,'#1a1a30')});
for(i=0;i<5;i++){c.globalAlpha=.3;R(c,0,110+i*5,W,3,'#8a90c0');c.globalAlpha=1}
grad(c,W,H-134,['#1a2016','#10140e','#080a06'],134);R(c,0,134,W,2,'#3a4a34');
for(i=0;i<80;i++){x=Math.floor(rnd(i+300)*W);y=138+Math.floor(rnd(i+350)*40);R(c,x,y,1,3,'#2a3a24')}
[[130,150,22],[200,160,30],[60,166,26],[270,156,24]].forEach(function(q){R(c,q[0],q[1],q[2],2,'#3a4a78');R(c,q[0]+3,q[1]+2,q[2]-6,1,'#2a3a60')});
P(c,10,118,12,16,'#4a4a62');R(c,12,116,8,2,'#4a4a62');R(c,14,121,4,1,'#2a2a40');R(c,14,124,4,1,'#2a2a40');R(c,11,119,2,14,'#6a6a84');
P(c,40,126,10,8,'#4a4a62');R(c,42,124,6,2,'#4a4a62');P(c,60,128,8,6,'#3a3a52');
limb(c,304,136,300,98,5,'#0e0a14',false);limb(c,300,112,282,96,3,'#0e0a14',false);limb(c,301,102,314,86,3,'#0e0a14',false);limb(c,291,104,286,90,2,'#0e0a14',false);limb(c,282,96,274,92,2,'#0e0a14',false);
return b}

BG.night=buildBG('night');BG.day=buildBG('day');BGH=null;BGO=null;
