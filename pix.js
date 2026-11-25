var PXO='#0c0c24';
var PXR={
silver:['#ffffff','#e8ecff','#b8c4e8','#7c88b8','#464e84'],
gold:['#fff8b0','#ffe060','#e8b820','#a87810','#6a4808'],
blue:['#a8c4ff','#6a8aff','#3a62e0','#2444a8','#142870'],
red:['#ffa090','#e84848','#c02828','#881818','#500c0c'],
skin:['#fff0dc','#ffd8b0','#f0b088','#c88060','#8a5038'],
hair:['#fff0a0','#ffd860','#e8a830','#b07818','#704808'],
brown:['#d09860','#a87040','#7a4a28','#583018','#382010'],
wood:['#e8c078','#c89850','#a07038','#785020','#4a3010'],
iron:['#e8f0ff','#b8c8e8','#8a9cc8','#5a6a98','#344068'],
green:['#e8ffd0','#a8f078','#58d848','#2fa030','#146018'],
ghost:['#f6fcff','#cfe2f8','#92aada','#5c6eac','#363f70'],
purple:['#e2c8ff','#b888e8','#8a50c0','#5e3090','#3a1c60'],
violet:['#f0d8ff','#c898f0','#9860d0','#6a38a0','#401e68'],
bone:['#ffffff','#f8f0d8','#e0d0a0','#b09868','#705c38'],
flame:['#fff8c0','#ffd040','#ff9020','#e04810','#901808'],
rock:['#e8e0d0','#b8b0a0','#8a8274','#5a5448','#38342c']};
function pxG(w,h){return{w:w,h:h,p:new Array(w*h).fill(null)}}
function pxS(g,x,y,c){x=Math.floor(x);y=Math.floor(y);if(x>=0&&y>=0&&x<g.w&&y<g.h)g.p[y*g.w+x]=c}
function pxC(v,a,b){return v<a?a:v>b?b:v}
function pxT(r,s){return r[s<.16?0:s<.38?1:s<.62?2:s<.84?3:4]}
function pxBall(g,cx,cy,rx,ry,r,o){o=o||{};var lx=o.lx==null?-.5:o.lx,ly=o.ly==null?-.6:o.ly,lz=.62;
for(var y=Math.floor(cy-ry);y<=Math.ceil(cy+ry);y++){if(o.ymax!=null&&y>o.ymax)continue;if(o.ymin!=null&&y<o.ymin)continue;for(var x=Math.floor(cx-rx);x<=Math.ceil(cx+rx);x++){var nx=(x+.5-cx)/rx,ny=(y+.5-cy)/ry,d=nx*nx+ny*ny;if(d>1)continue;var z=Math.sqrt(1-d),v=nx*lx+ny*ly+z*lz;pxS(g,x,y,pxT(r,1-pxC((v+.1)/1.05,0,1)))}}}
function pxBox(g,x,y,w,h,r,rad){rad=rad||0;for(var j=0;j<h;j++)for(var i=0;i<w;i++){var cx=i<rad?rad-i-.5:i>=w-rad?i-(w-rad)+.5:0,cy=j<rad?rad-j-.5:j>=h-rad?j-(h-rad)+.5:0;if(rad&&cx*cx+cy*cy>rad*rad)continue;var fx=w>1?i/(w-1):0,fy=h>1?j/(h-1):0;pxS(g,x+i,y+j,pxT(r,pxC(.06+.55*fx+.3*fy,0,1)))}}
function pxPoly(g,pts,r,dir){dir=dir||[.55,.83];var x0=1e9,x1=-1e9,y0=1e9,y1=-1e9;pts.forEach(function(p){x0=Math.min(x0,p[0]);x1=Math.max(x1,p[0]);y0=Math.min(y0,p[1]);y1=Math.max(y1,p[1])});
var cx=(x0+x1)/2,cy=(y0+y1)/2,ext=Math.abs(dir[0])*(x1-x0)/2+Math.abs(dir[1])*(y1-y0)/2||1;
for(var y=Math.floor(y0);y<=Math.ceil(y1);y++){var xs=[];for(var i=0;i<pts.length;i++){var a=pts[i],b=pts[(i+1)%pts.length];if((a[1]<=y+.5&&b[1]>y+.5)||(b[1]<=y+.5&&a[1]>y+.5))xs.push(a[0]+(y+.5-a[1])*(b[0]-a[0])/(b[1]-a[1]))}
xs.sort(function(p,q){return p-q});for(var k=0;k+1<xs.length;k+=2){for(var x=Math.round(xs[k]);x<Math.round(xs[k+1]);x++){var s=pxC(.5+((x+.5-cx)*dir[0]+(y+.5-cy)*dir[1])/ext*.5,0,1);pxS(g,x,y,pxT(r,s*.9+.05))}}}}
function pxLine(g,x0,y0,x1,y1,w,r){var dx=x1-x0,dy=y1-y0,n=Math.max(Math.abs(dx),Math.abs(dy),1),L=Math.sqrt(dx*dx+dy*dy)||1,nx=-dy/L,ny=dx/L;if(nx+ny>0){nx=-nx;ny=-ny}
for(var s=0;s<=n;s++){var px=x0+dx*s/n,py=y0+dy*s/n;for(var o=0;o<w;o++){var t=w>1?o/(w-1):.5,off=(t-.5)*(w-1);var sh=pxC(.5+(off/(w/2))*.5,0,1);pxS(g,px+nx*off+.5-.5*(w%2?0:0),py+ny*off,typeof r==='string'?r:pxT(r,sh*.8+.1))}}}
function pxTri(g,cx,top,h,hw,r){pxPoly(g,[[cx-hw,top+h],[cx,top],[cx+hw,top+h]],r,[.4,.9])}
function pxOutline(g){var o=pxG(g.w+2,g.h+2);for(var y=0;y<g.h;y++)for(var x=0;x<g.w;x++)o.p[(y+1)*o.w+x+1]=g.p[y*g.w+x];
var q=o.p.slice();for(var y=0;y<o.h;y++)for(var x=0;x<o.w;x++){if(q[y*o.w+x])continue;var n=(x>0&&q[y*o.w+x-1])||(x<o.w-1&&q[y*o.w+x+1])||(y>0&&q[(y-1)*o.w+x])||(y<o.h-1&&q[(y+1)*o.w+x]);if(n)o.p[y*o.w+x]=PXO}return o}
var PXC={};
function pxSprite(key,w,h,fn,noOut){if(PXC[key])return PXC[key];var g=pxG(w,h);fn(g);var o=noOut?(function(){var z=pxG(w+2,h+2);for(var y=0;y<h;y++)for(var x=0;x<w;x++)z.p[(y+1)*z.w+x+1]=g.p[y*w+x];return z})():pxOutline(g);
var cv=null;if(typeof document!=='undefined'){cv=document.createElement('canvas');cv.width=o.w;cv.height=o.h;var c=cv.getContext('2d');for(var y=0;y<o.h;y++)for(var x=0;x<o.w;x++){var col=o.p[y*o.w+x];if(col){c.fillStyle=col;c.fillRect(x,y,1,1)}}}
return PXC[key]={cv:cv,cw:w,ch:h,g:o}}
function pxBlit(c,sp,x,y,sc,flip){c.save();c.imageSmoothingEnabled=false;if(flip){c.translate(Math.round(x+sp.cw*sc),Math.round(y));c.scale(-sc,sc)}else{c.translate(Math.round(x),Math.round(y));c.scale(sc,sc)}c.drawImage(sp.cv,-1,-1);c.restore()}
function pxShadow(c,x,y,w,sc){c.fillStyle='rgba(0,0,0,.32)';var cx=x+w*sc/2,rx=w*sc*.46;for(var j=-3;j<=3;j++){var hw=Math.round(rx*Math.sqrt(1-j*j/16));c.fillRect(Math.round(cx-hw),Math.round(y+j*sc*.5),hw*2,Math.max(1,Math.round(sc*.5)))}}
/* ---------- HERO PARTS ---------- */
function pxHead(v){return pxSprite('head'+v,20,20,function(g){var R=PXR;
pxBall(g,5,15,3.8,4.2,R.hair);
pxBall(g,12.5,13,4.8,5.2,R.skin);
pxBox(g,9,17,5,3,R.skin,0);
pxBox(g,2,9,6,7,R.silver,2);pxBox(g,3,12,3,1,R.gold,0);
pxPoly(g,[[6,5],[2,3],[0,7],[1,12],[3,15],[3,9],[6,8]],R.red,[.3,.95]);
pxBall(g,9,8.5,7.3,6.4,R.silver,{ymax:11});
pxBox(g,3,10,14,2,R.gold,0);
pxPoly(g,[[6,4],[10,0],[15,3],[14,5],[10,3]],R.gold,[.3,.95]);
pxPoly(g,[[8,6],[13,5],[15,9],[9,9]],R.gold,[.5,.8]);pxBox(g,10,7,3,1,R.bone,0);
if(v==='h'||v==='x'){pxS(g,12,13,'#101030');pxS(g,13,13,'#101030');pxS(g,14,13,'#101030');pxS(g,13,12,'#101030');if(v==='x'){pxS(g,12,12,'#101030');pxS(g,14,12,'#101030');pxS(g,12,14,'#101030');pxS(g,14,14,'#101030')}pxBox(g,13,16,3,2,['#601818','#601818','#601818','#601818','#601818'],0)}
else{pxBox(g,12,12,3,3,['#ffffff','#ffffff','#f4f4ff','#e0e0f0','#c8c8e0'],0);pxBox(g,13,12,2,3,['#6a8aff','#3a62e0','#3a62e0','#2444a8','#2444a8'],0);pxS(g,14,13,'#101030');pxS(g,14,12,'#ffffff');pxS(g,12,11,'#583018');pxS(g,13,11,'#583018');pxS(g,14,11,'#583018')}
pxS(g,17,14,'#c88060');pxS(g,17,15,'#c88060');
if(v==='o')pxBox(g,14,16,3,2,['#601818','#601818','#601818','#601818','#601818'],0);
else if(v==='s'){pxS(g,13,16,'#a04030');pxS(g,14,17,'#a04030');pxS(g,15,17,'#a04030');pxS(g,16,16,'#a04030')}
else if(v!=='h'&&v!=='x'){pxS(g,14,16,'#a04030');pxS(g,15,16,'#a04030')}
pxS(g,12,15,'#f08080')})}
function pxTorso(){return pxSprite('torso',15,16,function(g){var R=PXR;
pxBox(g,3,7,9,9,R.blue,0);pxBox(g,3,15,9,1,R.gold,0);
pxBox(g,1,0,13,10,R.silver,3);pxBox(g,4,0,7,1,R.gold,0);pxBox(g,7,1,1,8,R.silver.slice().reverse(),0);
pxBox(g,6,10,3,6,R.gold,0);pxBox(g,5,12,5,2,R.gold,0);
pxBox(g,1,9,13,2,R.brown,0);pxBox(g,6,9,3,2,R.gold,0);
pxBall(g,12,2.6,3.4,3,R.silver);pxBox(g,9,4,5,1,R.gold,0)})}
function pxBoot(){return pxSprite('boot',11,7,function(g){var R=PXR;pxBox(g,0,0,7,5,R.brown,1);pxBox(g,0,0,7,2,R.gold,0);pxBox(g,0,4,11,3,R.brown,1);pxS(g,10,5,R.brown[3])})}
function pxShield(t){return pxSprite('shield'+t,10,13,function(g){var R=PXR,r=t===2?R.iron:R.wood;
pxPoly(g,[[0,0],[10,0],[10,6],[5,13],[0,6]],r,[.5,.85]);
pxBox(g,0,0,10,1,t===2?R.silver:R.gold,0);pxBox(g,4,1,2,9,t===2?R.silver:R.gold,0);pxBox(g,1,4,8,2,t===2?R.silver:R.gold,0);
if(t===2){pxBall(g,5,5,1.6,1.6,R.blue);pxS(g,1,1,'#fff');pxS(g,8,1,'#fff')}else pxBox(g,4,4,2,2,R.red,0)})}
var PXEL={fire:['#ff8a28','#ffd040'],ice:['#8ae8ff','#e8ffff'],earth:['#c8a060','#8a6a38'],bolt:['#ffee60','#ffffff']};
function pxLimb(c,x0,y0,x1,y1,w,mid,hi,lo){limb(c,x0,y0,x1,y1,w,mid,true);if(w>=3){limb(c,x0,y0,x1,y1,1,hi);limb(c,x0+w-1,y0+w-1,x1+w-1,y1+w-1,1,lo)}}
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
var fl=Math.round(S(t/5)*2)+(run?4:pose==='attack'?3:0);
var capeL=Math.min(23,gy-19-uy-(kneel?2:0)),sw=pose==='win'||pose==='cheer'?3:0;
for(var j=0;j<capeL;j++){var x0=13+L-3-Math.round(j*(run?.6:pose==='attack'?.4:.15))-Math.round(S(t/9+j/5)*(1+j/9))-sw,w=6+Math.round(j*.12),yy=19+uy+j;
R(c,x0-1,yy,w+2,1,PXO);R(c,x0,yy,w,1,j>capeL-3?'#f8d838':(j%7<3?'#b02020':'#9a1818'));R(c,x0,yy,2,1,j>capeL-3?'#fff0a0':'#e84848');R(c,x0+w-2,yy,2,1,j>capeL-3?'#b88a20':'#701010')}
var hx0=16+L,hy0=6+uy+hdy,pw=Math.round(S(t/7)*1.5)+(run?4:pose==='attack'?3:pose==='hurt'?-2:0);
pxLimb(c,hx0+1,hy0+9,hx0-6-pw,hy0+14,5,'#8a96c0','#c8d0f0','#566090');
if(kneel){pxLimb(c,hipx,hipy,12,gy-3,5,'#98a4d0','#d8e0ff','#5a6898');pxBlit(c,pxBoot(),6,gy-6,1,false);
pxLimb(c,hipx+1,hipy-1,hipx+9,hipy-6,5,'#aab6e0','#e8f0ff','#6a78a8');pxLimb(c,hipx+9,hipy-6,hipx+10,gy-5,5,'#aab6e0','#e8f0ff','#6a78a8');pxBlit(c,pxBoot(),hipx+6,gy-6,1,false)}
else{var b1=bx,b2=fx,l1=0,l2=0;if(run){var s=S(t/3);b1=14-s*6;b2=24+s*6;l1=Math.max(0,-s)*4;l2=Math.max(0,s)*4}
if(pose==='cheer'||pose==='win'){l1=hop*.7;l2=hop*.7}
pxLimb(c,hipx-1,hipy,b1+3,gy-7-l1,5,'#8a96c0','#c8d0f0','#566090');pxBlit(c,pxBoot(),Math.round(b1-1),Math.round(gy-7-l1),1,false);
pxLimb(c,hipx+2,hipy,b2+2,gy-7-l2,5,'#b4c0e8','#f0f4ff','#6a78a8');pxBlit(c,pxBoot(),Math.round(b2-2),Math.round(gy-7-l2),1,false)}
limb(c,14+L,17+uy,6+L-fl,20+uy,3,'#d03030',true);R(c,5+L-fl,20+uy,4,2,'#a82020');
pxBlit(c,pxTorso(),14+L,17+uy,1,false);
if(st.amu){R(c,25+L,20+uy,1,2,'#f8d838');P(c,24+L,22+uy,3,3,st.amu===2?'#707890':'#40e0ff');if(st.amu===1)R(c,25+L,23+uy,1,1,'#fff')}
pxBlit(c,pxHead(hv),hx0-2,hy0-7,1,false);
if(pose==='tired'||pose==='weak'){R(c,hx0+11,hy0+4+((t>>1)%10),1,2,'#9ad8ff')}
if(st.shield){var bx0=19+L+(st.block?6:0),by0=24+uy;pxBlit(c,pxShield(st.shield===2?2:1),bx0,by0,1,false);if(st.block){c.globalAlpha=.7;disc(c,bx0+11,by0+5,4,'#fff');c.globalAlpha=1}}
var sx=23+L,sy=22+uy,ex,ey;
if(hand){ex=hand[0];ey=hand[1]}else{ex=sx+C(phi*DEG)*9;ey=sy+S(phi*DEG)*9}
pxLimb(c,sx,sy,(sx+ex)/2+1,(sy+ey)/2,4,'#b4c0e8','#f0f4ff','#6a78a8');pxLimb(c,(sx+ex)/2+1,(sy+ey)/2,ex,ey,4,'#98a4d0','#d8e0ff','#5a6898');R(c,Math.round(ex)-1,Math.round(ey)-1,4,4,'#e8c070');
var tx=ex+C(th*DEG)*18,ty=ey+S(th*DEG)*18;
if(glow){c.globalAlpha=.3+.15*S(t/6);for(var i=2;i<=18;i+=4)disc(c,Math.round(ex+C(th*DEG)*i),Math.round(ey+S(th*DEG)*i),3,gcl);c.globalAlpha=1}
limb(c,ex,ey,tx,ty,3,bc,true);limb(c,ex+1,ey,tx+1,ty,1,'#fff');
if(swt===3||el)for(var i2=3;i2<=16;i2+=4)R(c,Math.round(ex+C(th*DEG)*i2),Math.round(ey+S(th*DEG)*i2),1,1,el?el[0]:'#8a3ad0');
limb(c,ex-S(th*DEG)*4,ey+C(th*DEG)*4,ex+S(th*DEG)*4,ey-C(th*DEG)*4,2,swt===3?'#c8a8ff':'#f8d838',true);
R(c,Math.round(ex-C(th*DEG)*4),Math.round(ey-S(th*DEG)*4),2,2,'#7a4a1a');
if(pose==='attack'&&p>.4&&p<.9){var a0=-135,a1=th;for(var a=a0;a<=a1;a+=7){var kk=(a-a0)/(a1-a0||1);c.globalAlpha=.15+.6*kk;R(c,Math.round(sx+C(a*DEG)*26),Math.round(sy+S(a*DEG)*26),3,3,el?el[1]:swt===3?'#d8a0ff':swt===2?'#ffd060':'#fff')}c.globalAlpha=1}
if(st.special)for(var q=0;q<7;q++){var aa=t/10+q*.9;R(c,Math.round(22+C(aa)*(18+q%3*3)),Math.round(26+S(aa*1.3)*22),2,2,q%2?'#fff':gcl)}
if(pose==='cheer'||pose==='win')for(var i3=0;i3<6;i3++)R(c,Math.round(20+C(t/20+i3*1.05)*22),Math.round(16+S(t/17+i3)*14),2,2,i3%2?'#fff':'#ffe060');
if(run)for(var i4=0;i4<3;i4++)R(c,Math.round(8-((t+i4*5)%14)),gy-2-i4,2,1,'#c8b890');
c.restore()}

/* ---------- ENEMIES ---------- */
function pxSlime(v){return pxSprite('slime'+v,44,30,function(g){var R=PXR;
pxBall(g,22,24,20,5,R.green,{ly:-.9});
pxBall(g,22,15,19,13,R.green,{ymax:26});
pxBall(g,22,19,12,7,['#c8f8a0','#8ae860','#58d848','#3cb838','#2fa030']);
pxBall(g,13,7,5,2.6,R.green.slice(0,1).concat(['#ffffff','#e8ffd0','#e8ffd0','#e8ffd0']));pxS(g,9,10,'#ffffff');pxS(g,8,11,'#ffffff');
[[30,21,2],[34,17,1.5],[10,22,1.5]].forEach(function(b){pxBall(g,b[0],b[1],b[2],b[2],['#f0ffe0','#d0ffa8','#a8f078','#a8f078','#a8f078'])});
[[15,14.5],[28,14.5]].forEach(function(e){pxBall(g,e[0],e[1],3.6,4.6,['#ffffff','#ffffff','#f4f4ff','#dcdcf0','#b8b8d8']);pxBall(g,e[0]+1,e[1]+.6,2,3,['#6a8aff','#2444a8','#142870','#101030','#101030']);pxS(g,e[0]+1,e[1]-1,'#ffffff');pxS(g,e[0]+2,e[1]-1,'#ffffff')});
pxBox(g,11,20,3,2,['#ffb0b8','#ffb0b8','#f88898','#f88898','#f88898'],0);pxBox(g,30,20,3,2,['#ffb0b8','#ffb0b8','#f88898','#f88898','#f88898'],0);
if(v==='a'){pxBox(g,18,21,9,5,['#401020','#401020','#401020','#401020','#401020'],2);pxBox(g,20,24,5,2,['#ff6080','#ff6080','#ff6080','#d83860','#d83860'],0);pxS(g,19,21,'#fff');pxS(g,25,21,'#fff')}
else{pxBox(g,19,22,7,1,['#143c18','#143c18','#143c18','#143c18','#143c18'],0);pxS(g,18,21,'#143c18');pxS(g,26,21,'#143c18')}
pxS(g,6,28,R.green[3]);pxS(g,6,29,R.green[3]);pxS(g,37,28,R.green[3])})}
function pxWolf(v){return pxSprite('wolf'+v,58,38,function(g){var R=PXR,Gh=R.ghost;
pxPoly(g,[[10,16],[4,14],[0,7],[3,9],[2,3],[7,9],[12,12]],R.ghost,[.4,.9]);
pxLimb2(g,14,24,12,36,5,Gh);pxLimb2(g,21,25,23,36,5,Gh);
pxBall(g,15,19,8,8,Gh);pxBall(g,28,18,13,8.5,Gh);pxBall(g,39,19,8,9,Gh);
pxBall(g,28,24,11,4,['#ffffff','#f6fcff','#e4f0ff','#cfe2f8','#b0c8ee'],{ly:-.9});
pxPoly(g,[[37,9],[44,5],[48,14],[44,22],[37,22]],Gh,[.5,.8]);
pxLimb2(g,34,26,33,36,5,Gh);pxLimb2(g,41,26,44,36,5,Gh);
[[11,36],[20,36],[32,36],[43,36]].forEach(function(f){pxBox(g,f[0]-1,f[1]-1,7,3,['#ffffff','#f6fcff','#dcecff','#b0c8ee','#8aa4d4'],1)});
pxBall(g,45,11,6.4,5.6,Gh);
pxPoly(g,[[48,8],[57,12],[57,15],[48,18]],Gh,[.4,.9]);
pxPoly(g,[[47,16],[55,15],[52,21],[46,20]],['#e0ecff','#c8dcf4','#92aada','#6a7cb4','#5c6eac'],[.3,.9]);
if(v==='a'){pxPoly(g,[[48,16],[56,17],[53,25],[47,21]],['#401020','#401020','#401020','#401020','#401020'],[.3,.9]);pxPoly(g,[[49,19],[53,19],[52,23]],['#ff6080','#ff6080','#d83860','#d83860','#d83860'],[.3,.9])}
for(var i=0;i<4;i++)pxTri(g,49+i*2,v==='a'?14:15,3,1,['#ffffff','#ffffff','#f4f4ff','#e0e0f0','#c8c8e0']);
pxS(g,57,12,'#101030');pxS(g,56,12,'#101030');pxS(g,57,13,'#202048');
pxTri(g,41,0,8,2.5,Gh);pxTri(g,47,1,7,2.2,R.ghost);
[[30,6],[26,5],[22,6],[18,8],[34,7],[38,8]].forEach(function(m,i){pxTri(g,m[0],m[1],7,2+(i%2),['#ffffff','#f6fcff','#cfe2f8','#92aada','#5c6eac'])});
pxBox(g,46,9,4,3,['#ff7040','#ff3020','#ff3020','#c01010','#c01010'],0);pxS(g,48,9,'#fff0a0');pxS(g,47,10,'#fff0a0');
pxS(g,3,2,'#a0e0ff');pxS(g,8,5,'#a0e0ff');pxS(g,30,1,'#a0e0ff');pxS(g,16,3,'#e8ffff');pxS(g,52,3,'#a0e0ff')})}
function pxLimb2(g,x0,y0,x1,y1,w,r){pxLine(g,x0,y0,x1,y1,w,r)}
function pxDrake(v){return pxSprite('drake'+v,58,52,function(g){var R=PXR,P2=R.purple;
pxPoly(g,[[24,24],[10,2],[15,12],[3,14],[11,23],[4,31],[18,30]],['#ffd8f0','#f0a0d0','#d070b0','#a04888','#702860'],[.5,.8]);
pxLine(g,24,24,10,2,2,R.bone);pxLine(g,24,24,3,14,1,R.bone);pxLine(g,24,24,4,31,1,R.bone);pxLine(g,24,24,11,23,1,R.bone);
pxLine(g,16,42,8,47,5,P2);pxLine(g,8,47,3,50,3,P2);pxTri(g,2,46,6,3,R.gold);
pxBall(g,22,40,7,8,P2);pxLine(g,24,46,22,54-3,5,P2);pxLine(g,31,46,33,51,5,P2);
pxBox(g,19,48,6,3,R.bone,1);pxBox(g,30,48,7,3,R.bone,1);
pxBall(g,27,29,11,13,P2);
pxBall(g,31,31,7,10,['#fff0e0','#f8e0c8','#e8c8a0','#c8a078','#8a6848']);
for(var k=0;k<5;k++)pxBox(g,26,23+k*4,10,1,['#a07850','#a07850','#a07850','#a07850','#a07850'],0);
for(var s=0;s<5;s++)pxTri(g,18+s*2,16+s*2,5,1.6,R.gold);
pxLine(g,34,26,40,32,3,P2);pxTri(g,41,31,4,1.5,R.bone);pxTri(g,43,30,4,1.5,R.bone);
pxLine(g,30,18,36,12,6,P2);
pxBall(g,39,10,7.2,6.4,P2);
pxPoly(g,[[43,8],[55,12],[55,16],[43,17]],P2,[.4,.9]);
if(v==='a'){pxPoly(g,[[44,15],[55,17],[53,24],[43,19]],['#401020','#401020','#401020','#401020','#401020'],[.3,.9]);pxPoly(g,[[46,18],[52,18],[50,23]],['#ff7040','#ff7040','#e04810','#e04810','#e04810'],[.3,.9])}
else pxPoly(g,[[43,16],[54,16],[52,20],[43,19]],['#d8a0f0','#b888e8','#8a50c0','#5e3090','#3a1c60'],[.3,.9]);
for(var i=0;i<4;i++)pxTri(g,45+i*2.5,v==='a'?14:15,3,1,R.bone);
pxS(g,54,12,'#101030');pxS(g,53,12,'#101030');
pxBox(g,40,7,5,4,['#fff0a0','#ffe060','#ffe060','#ff9020','#ff9020'],0);pxBox(g,43,7,2,4,['#201010','#201010','#201010','#201010','#201010'],0);
pxPoly(g,[[36,5],[31,-0.5],[40,3]],R.bone,[.5,.8]);pxPoly(g,[[40,4],[37,-1],[44,3]],R.bone,[.5,.8]);
pxBox(g,33,11,2,1,P2.slice().reverse(),0)})}
function pxBehemoth(v){return pxSprite('behe'+v,76,56,function(g){var R=PXR,P2=R.violet;
pxLine(g,10,22,2,26,6,P2);pxBall(g,3,29,6,6,R.rock);for(var q=0;q<6;q++){var a=q*1.05;pxTri(g,3+Math.round(Math.cos(a)*6),29+Math.round(Math.sin(a)*6),3,1,R.bone)}
pxBox(g,10,38,9,16,P2,2);pxBox(g,22,40,8,14,P2,2);pxBox(g,47,38,9,16,P2,2);pxBox(g,58,40,8,14,P2,2);
[[10,52],[22,52],[47,52],[58,52]].forEach(function(f){pxBox(g,f[0]-1,f[1],11,4,R.bone,1);pxS(g,f[0]+2,f[1]+3,R.bone[4]);pxS(g,f[0]+6,f[1]+3,R.bone[4])});
pxBall(g,38,28,27,16,P2);
pxBall(g,38,38,22,7,['#f8e8ff','#e0c8f8','#c8a0e8','#a078c8','#7a50a0'],{ly:-.9});
pxBall(g,22,22,8,7,R.bone,{});pxBox(g,17,18,10,2,R.gold,0);
for(var s=0;s<9;s++){var sx=14+s*5.5,sy=14-Math.round(5*Math.sin(s/8*3.14));pxTri(g,sx,sy-8+ (s<2||s>6?3:0),11-(s<2||s>6?3:0),3,['#ffb090','#ff6040','#e03020','#a01810','#600c08'])}
pxBall(g,62,24,12,11,P2);
pxPoly(g,[[56,28],[74,31],[72,40],[58,40]],P2,[.4,.9]);
if(v==='a'){pxPoly(g,[[58,33],[74,34],[71,45],[57,41]],['#401020','#401020','#401020','#401020','#401020'],[.3,.9]);pxPoly(g,[[61,37],[69,37],[67,43],[62,42]],['#ff7090','#ff7090','#d83860','#d83860','#d83860'],[.3,.9])}
pxTri(g,60,v==='a'?33:35,6,1.8,R.bone);pxTri(g,67,v==='a'?33:35,6,1.8,R.bone);pxPoly(g,[[57,40],[60,48],[62,40]],R.bone,[.5,.8]);pxPoly(g,[[68,39],[71,46],[72,38]],R.bone,[.5,.8]);
pxPoly(g,[[55,16],[50,2],[56,0],[60,10]],R.bone,[.5,.8]);pxPoly(g,[[64,12],[66,0],[72,2],[69,14]],R.bone,[.5,.8]);
pxBox(g,56,18,8,4,['#fff0a0','#ff6040','#ff2020','#c01010','#c01010'],0);pxS(g,59,19,'#fff');pxS(g,60,19,'#fff');pxBox(g,55,16,9,2,['#401020','#401020','#401020','#401020','#401020'],0);
pxS(g,73,31,'#201030');pxS(g,72,31,'#201030');
for(var m=0;m<5;m++)pxTri(g,50+m*3,10+m*1.5,7,2,['#ffb090','#ff6040','#e03020','#a01810','#600c08'])})}
function pxA(){return typeof eatk==='number'&&eatk>0?'a':'i'}
function drawSlime(c,x,y,sc,flip){pxShadow(c,x,y+28*sc,42,sc);pxBlit(c,pxSlime(pxA()),x,y,sc,flip)}
function drawWolf(c,x,y,sc,flip){pxShadow(c,x,y+36*sc,56,sc);pxBlit(c,pxWolf(pxA()),x,y,sc,flip)}
function drawDrake(c,x,y,sc,flip){pxShadow(c,x,y+50*sc,50,sc);pxBlit(c,pxDrake(pxA()),x,y,sc,flip)}
function drawBehemoth(c,x,y,sc,flip){pxShadow(c,x,y+54*sc,70,sc);pxBlit(c,pxBehemoth(pxA()),x,y,sc,flip)}
ENM.slime.w=44;ENM.slime.h=30;ENM.wolf.w=58;ENM.wolf.h=38;ENM.drake.w=58;ENM.drake.h=52;ENM.behemoth.w=76;ENM.behemoth.h=56;
