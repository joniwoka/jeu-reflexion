function limb(c,x0,y0,x1,y1,w,col,ol){x0=Math.round(x0);y0=Math.round(y0);x1=Math.round(x1);y1=Math.round(y1);const n=Math.max(Math.abs(x1-x0),Math.abs(y1-y0),1);
if(ol)for(let s=0;s<=n;s++)R(c,Math.round(x0+(x1-x0)*s/n)-1,Math.round(y0+(y1-y0)*s/n)-1,w+2,w+2,'#0c0c24');
for(let s=0;s<=n;s++)R(c,Math.round(x0+(x1-x0)*s/n),Math.round(y0+(y1-y0)*s/n),w,w,col)}
function fillPoly(c,pts,col){let y0=1e9,y1=-1e9;pts.forEach(p=>{y0=Math.min(y0,p[1]);y1=Math.max(y1,p[1])});y0=Math.floor(y0);y1=Math.ceil(y1);
for(let y=y0;y<=y1;y++){const xs=[];for(let i=0;i<pts.length;i++){const a=pts[i],b=pts[(i+1)%pts.length];if((a[1]<=y&&b[1]>y)||(b[1]<=y&&a[1]>y))xs.push(a[0]+(y-a[1])*(b[0]-a[0])/(b[1]-a[1]))}
xs.sort((p,q)=>p-q);for(let k=0;k+1<xs.length;k+=2){const xa=Math.round(xs[k]),xb=Math.round(xs[k+1]);if(xb>xa)R(c,xa,y,xb-xa,1,col)}}}
function ell(c,cx,cy,rx,ry,col){for(let j=-ry;j<=ry;j++){const w=Math.floor(rx*Math.sqrt(1-(j*j)/(ry*ry)));R(c,cx-w,cy+j,2*w+1,1,col)}}
const DEG=Math.PI/180;
function drawHero(c,x,y,sc,st){
if(!st||typeof st!=='object')st={pose:st?'attack':'idle',t:Date.now()/16,p:.5,glow:!!st};
const pose=st.pose||'idle',t=st.t||0,p=st.p||0,S=Math.sin,C=Math.cos,swt=st.sw||0,bc=['#e8f0ff','#cfe6ff','#ffe0a0'][swt],gcl=['#a0e0ff','#80c0ff','#ff9a30'][swt];
const br=S(t/(pose==='weak'?6:pose==='tired'?10:16))>0?1:0;
let uy=br,lean=0,hdy=0,phi=40,th=-35,hand=null,bx=13,fx=25,kneel=false,mouth=0,eyes=0,glow=!!st.glow||swt===2,run=0,hop=0;
if(pose==='ready'){lean=1;phi=-10;th=-60;glow=true}
else if(pose==='tired'){uy=2+br;lean=2;hdy=2;phi=60;th=-20;bx=13;fx=23}
else if(pose==='weak'){kneel=true;uy=7+br;lean=2;hdy=3;hand=[31+lean,29];th=95}
else if(pose==='hurt'){uy=1;lean=-4;hdy=-1;phi=70;th=-10;eyes=1;mouth=2;bx=12;fx=22}
else if(pose==='walk'){run=1;uy=S(t/3)>.5?1:0;lean=2;phi=30;th=-25}
else if(pose==='cheer'){hop=Math.abs(S(t/6))*4;uy=-Math.round(hop);phi=-80;th=-80;mouth=3;bx=15;fx=24}
else if(pose==='win'){hop=Math.abs(S(t/9))*6;uy=-Math.round(hop);phi=-95;th=-90;mouth=3;bx=10;fx=27;glow=true}
else if(pose==='dead'){kneel=true;uy=9;lean=4;hdy=6;hand=[32+lean,31];th=98;eyes=1}
else if(pose==='attack'){glow=true;mouth=2;bx=8;fx=31;
if(p<.35){const k=p/.35;th=-60+(-75)*k;phi=-10+(-90)*k;lean=Math.round(-3*k)}
else{const k=Math.min(1,(p-.35)/.65);th=-135+185*k;phi=-100+130*k;lean=3}}
const gy=46;if(!kneel&&pose!=='attack')uy=Math.min(uy,2);
const L=lean,hipx=19+Math.round(L*.5),hipy=33+uy;
c.save();c.translate(x,y);c.scale(sc,sc);
R(c,6,gy-1,30,2,'rgba(0,0,0,.35)');
const fl=Math.round(S(t/5)*2)+(run?4:pose==='attack'?3:0);
const capeL=Math.min(22,gy-19-uy-(kneel?2:0)),sw=pose==='win'||pose==='cheer'?3:0;
for(let j=0;j<capeL;j++){const x0=13+L-3-Math.round(j*(run?.6:pose==='attack'?.4:.15))-Math.round(S(t/9+j/5)*(1+j/9))-sw,w=6+Math.round(j*.12),yy=19+uy+j;
R(c,x0-1,yy,w+2,1,'#0c0c24');R(c,x0,yy,w,1,j>capeL-3?'#f8d838':(j%7<3?'#b02020':'#9a1818'));R(c,x0+w-2,yy,2,1,j>capeL-3?'#f8d838':'#d83030')}
const hx0=16+L,hy0=6+uy+hdy,pw=Math.round(S(t/7)*1.5)+(run?4:pose==='attack'?3:pose==='hurt'?-2:0);
limb(c,hx0-1,hy0+2,hx0-8-pw,hy0+8,5,'#4a6ae8',true);limb(c,hx0-8-pw,hy0+8,hx0-11-pw*1.4,hy0+16,4,'#6a8af8',true);
if(kneel){limb(c,hipx,hipy,12,gy-3,5,'#203c98',true);P(c,6,gy-5,8,4,'#503018');R(c,6,gy-5,8,1,'#7a5028');
limb(c,hipx+1,hipy-1,hipx+9,hipy-6,5,'#2848b0',true);limb(c,hipx+9,hipy-6,hipx+10,gy-5,5,'#2848b0',true);P(c,hipx+6,gy-5,10,5,'#503018');R(c,hipx+6,gy-5,10,2,'#7a5028')}
else{let b1=bx,b2=fx,l1=0,l2=0;if(run){const s=S(t/3);b1=14-s*6;b2=24+s*6;l1=Math.max(0,-s)*4;l2=Math.max(0,s)*4}
if(pose==='cheer'||pose==='win'){l1=hop*.7;l2=hop*.7}
limb(c,hipx-1,hipy,b1+3,gy-6-l1,5,'#203c98',true);P(c,Math.round(b1-1),Math.round(gy-5-l1),9,5,'#503018');R(c,Math.round(b1-1),Math.round(gy-5-l1),9,2,'#7a5028');
limb(c,hipx+2,hipy,b2+2,gy-6-l2,5,'#2848b0',true);P(c,Math.round(b2-2),Math.round(gy-5-l2),10,5,'#5a3a1c');R(c,Math.round(b2-2),Math.round(gy-5-l2),10,2,'#8a6030');R(c,Math.round(b2+6),Math.round(gy-3-l2),3,3,'#6a4624')}
limb(c,14+L,17+uy,6+L-fl,20+uy,3,'#d03030',true);R(c,5+L-fl,20+uy,4,2,'#a82020');
P(c,15+L,20+uy,12,13,'#c8d0ec');R(c,15+L,20+uy,4,13,'#e8ecff');R(c,24+L,20+uy,3,13,'#98a0c8');R(c,15+L,26+uy,12,1,'#98a0c8');R(c,19+L,23+uy,3,3,'#f8d838');R(c,20+L,22+uy,1,5,'#f8d838');
P(c,15+L,31+uy,12,3,'#7a4a1a');R(c,20+L,31+uy,3,3,'#f8d838');
const sk=Math.max(2,Math.min(5,gy+1-(34+uy)));P(c,14+L,34+uy,13,sk,'#2848b0');R(c,14+L,33+uy+sk,13,1,'#f8d838');R(c,14+L,34+uy,3,sk,'#3a5cd0');
P(c,13+L,17+uy,14,4,'#d03030');R(c,14+L,17+uy,12,1,'#e85050');
P(c,hx0,hy0,12,12,'#f8c8a0');R(c,hx0,hy0+9,12,3,'#d8a078');R(c,hx0+1,hy0+6,2,3,'#e8b088');R(c,hx0+12,hy0+6,1,2,'#e8b088');
if(eyes){R(c,hx0+7,hy0+6,4,1,'#101030');R(c,hx0+6,hy0+4,5,1,'#4a3020')}
else{R(c,hx0+7,hy0+5,4,3,'#fff');R(c,hx0+9,hy0+5,2,3,'#2848b0');R(c,hx0+10,hy0+6,1,1,'#101030');R(c,hx0+6,hy0+(mouth===2?3:4),5,1,'#4a3020')}
if(mouth===2)R(c,hx0+8,hy0+9,3,2,'#601818');else if(mouth===3){R(c,hx0+8,hy0+9,4,1,'#c07060');R(c,hx0+11,hy0+8,1,1,'#c07060')}else R(c,hx0+8,hy0+9,3,1,'#c07060');
P(c,hx0-2,hy0-3,16,6,'#4a6ae8');R(c,hx0+1,hy0-2,8,1,'#8aa4ff');R(c,hx0-2,hy0+2,4,9,'#4a6ae8');R(c,hx0+10,hy0+2,4,3,'#4a6ae8');R(c,hx0+12,hy0+3,2,3,'#6a8af8');R(c,hx0+2,hy0-5,4,3,'#4a6ae8');R(c,hx0+7,hy0-5,5,3,'#6a8af8');
R(c,hx0-1,hy0+2,14,2,'#f8d838');R(c,hx0-5,hy0+2,4,1,'#f8d838');
if(pose==='tired'||pose==='weak'){R(c,hx0+11,hy0+2+((t>>1)%10),1,2,'#9ad8ff')}
P(c,13+L,18+uy,9,6,'#e8ecff');R(c,14+L,19+uy,4,2,'#fff');R(c,13+L,23+uy,9,1,'#f8d838');
if(st.shield){const bx0=19+L+(st.block?6:0),by0=25+uy;P(c,bx0,by0,8,11,'#7a5a30');R(c,bx0+1,by0+1,6,9,'#c8a050');R(c,bx0+3,by0+2,2,7,'#e8c070');R(c,bx0+1,by0+4,6,2,'#e8c070');R(c,bx0+2,by0+5,4,1,'#a02020');if(st.block){c.globalAlpha=.7;disc(c,bx0+9,by0+5,4,'#fff');c.globalAlpha=1}}
const sx=23+L,sy=22+uy;let ex,ey;
if(hand){ex=hand[0];ey=hand[1]}else{ex=sx+C(phi*DEG)*9;ey=sy+S(phi*DEG)*9}
limb(c,sx,sy,(sx+ex)/2+1,(sy+ey)/2,4,'#a8b0d0',true);limb(c,(sx+ex)/2+1,(sy+ey)/2,ex,ey,4,'#8a94b8',true);R(c,Math.round(ex)-1,Math.round(ey)-1,4,4,'#d8a060');
const tx=ex+C(th*DEG)*18,ty=ey+S(th*DEG)*18;
if(glow){c.globalAlpha=.3+.15*S(t/6);for(let i=2;i<=18;i+=4)disc(c,Math.round(ex+C(th*DEG)*i),Math.round(ey+S(th*DEG)*i),3,gcl);c.globalAlpha=1}
limb(c,ex,ey,tx,ty,3,bc,true);limb(c,ex+1,ey,tx+1,ty,1,'#fff');
limb(c,ex-S(th*DEG)*4,ey+C(th*DEG)*4,ex+S(th*DEG)*4,ey-C(th*DEG)*4,2,'#f8d838',true);
R(c,Math.round(ex-C(th*DEG)*4),Math.round(ey-S(th*DEG)*4),2,2,'#7a4a1a');
if(pose==='attack'&&p>.4&&p<.9){const a0=-135,a1=th;for(let a=a0;a<=a1;a+=7){const k=(a-a0)/(a1-a0||1);c.globalAlpha=.15+.6*k;R(c,Math.round(sx+C(a*DEG)*26),Math.round(sy+S(a*DEG)*26),3,3,swt===2?'#ffd060':'#fff')}c.globalAlpha=1}
if(pose==='cheer'||pose==='win')for(let i=0;i<6;i++)R(c,Math.round(20+C(t/20+i*1.05)*22),Math.round(16+S(t/17+i)*14),2,2,i%2?'#fff':'#ffe060');
if(run)for(let i=0;i<3;i++)R(c,Math.round(8-((t+i*5)%14)),gy-2-i,2,1,'#c8b890');
c.restore()}
function drawWolf(c,x,y,sc,flip){c.save();c.translate(flip?x+52*sc:x,y);c.scale(flip?-sc:sc,sc);
P(c,0,6,10,4,'#7a86a8');R(c,0,2,4,6,'#7a86a8');R(c,0,2,3,3,'#e8ecff');
P(c,8,12,28,13,'#8a96b8');R(c,8,12,28,4,'#6a76a0');R(c,10,21,24,4,'#c8d0e8');for(let k=0;k<6;k++)tri(c,10+k*4,8,5,2,'#6a76a0');
P(c,10,24,5,8,'#7a86a8');P(c,18,24,5,8,'#6a76a0');P(c,27,24,5,8,'#7a86a8');P(c,33,24,5,8,'#6a76a0');R(c,10,31,5,1,'#f8f0c0');R(c,27,31,5,1,'#f8f0c0');
P(c,34,5,13,11,'#9aa6c8');P(c,44,9,8,6,'#a8b4d4');R(c,50,9,2,2,'#101030');R(c,46,14,5,2,'#fff');R(c,44,14,1,3,'#fff');R(c,40,8,3,2,'#ff3030');
tri(c,37,-2,7,2,'#7a86a8');tri(c,43,-2,7,2,'#8a96b8');c.restore()}
function drawBehemoth(c,x,y,sc,flip){c.save();c.translate(flip?x+68*sc:x,y);c.scale(flip?-sc:sc,sc);
P(c,0,18,12,5,'#6a3aa0');R(c,0,13,4,7,'#c83c3c');
P(c,10,14,40,22,'#6a3aa0');R(c,10,14,40,4,'#4a2a80');R(c,12,29,36,7,'#9a7ac8');R(c,14,20,8,6,'#7a4ab0');R(c,30,22,8,6,'#7a4ab0');
for(let k=0;k<7;k++)tri(c,15+k*5,4,11,3,'#d84848','#8a2020');
P(c,10,34,7,13,'#4a2a80');P(c,19,34,7,13,'#5a3490');P(c,36,34,7,13,'#4a2a80');P(c,45,34,7,13,'#5a3490');R(c,10,46,7,1,'#f8f0c0');R(c,36,46,7,1,'#f8f0c0');R(c,19,46,7,1,'#f8f0c0');R(c,45,46,7,1,'#f8f0c0');
P(c,46,10,18,17,'#7a4ab0');P(c,58,17,9,11,'#8a5ac0');P(c,56,27,11,5,'#5a3a90');
R(c,58,26,2,5,'#fff');R(c,64,26,2,5,'#fff');R(c,52,15,6,4,'#fff');R(c,55,16,3,3,'#ff2020');R(c,64,20,2,2,'#201030');R(c,52,13,8,2,'#2a1050');
P(c,47,0,4,13,'#f8f0c0');R(c,45,-2,3,5,'#f8f0c0');P(c,56,3,4,10,'#f8f0c0');R(c,59,1,3,4,'#f8f0c0');
c.restore()}
function drawDragon(c,x,y,sc){c.save();c.translate(x,y);c.scale(sc,sc);
const t=(typeof T==='number'?T:0),fw=Math.sin(t/14)*4,br=(typeof eatk==='number'&&eatk>0),wy=Math.round(fw);
R(c,4,62,84,2,'rgba(0,0,0,.4)');
fillPoly(c,[[50,24],[70,6+wy*.6],[88,12+wy*.4],[90,26],[80,34],[64,32]],'#3a0c28');
limb(c,50,24,70,6+Math.round(wy*.6),3,'#5a1c3c',true);limb(c,70,6+Math.round(wy*.6),88,12,2,'#7a2c4c',true);limb(c,70,6+Math.round(wy*.6),90,26,2,'#7a2c4c',true);limb(c,70,6+Math.round(wy*.6),80,34,2,'#7a2c4c',true);
const tw=Math.round(Math.sin(t/16)*2);
limb(c,68,46,76,52,8,'#8a1c1c',true);limb(c,76,52,84,50+tw,6,'#8a1c1c',true);limb(c,84,50+tw,88,42+tw,5,'#8a1c1c',true);limb(c,88,42+tw,87,34+tw,4,'#8a1c1c',true);tri(c,87,24+tw,10,4,'#e8c070','#b89040');
ell(c,61,51,11,12,'#0c0c24');ell(c,60,50,10,11,'#8a1c1c');ell(c,57,47,6,6,'#a02424');
limb(c,62,56,62,61,5,'#7a1818',true);P(c,55,60,13,3,'#6a1414');R(c,53,61,3,2,'#f8f0c0');R(c,58,62,3,2,'#f8f0c0');R(c,63,62,3,2,'#f8f0c0');R(c,67,62,2,2,'#f8f0c0');
ell(c,47,43,26,17,'#0c0c24');ell(c,46,42,25,16,'#a02424');ell(c,46,47,24,11,'#8a1c1c');ell(c,42,35,17,6,'#c83c3c');
for(let yy=28;yy<58;yy++)for(let xx=22;xx<72;xx++){const dx=(xx-46)/25,dy=(yy-42)/16;if(dx*dx+dy*dy<.92&&(xx+yy*2)%5===0)R(c,xx,yy,1,1,'#7a1818')}
ell(c,38,49,16,8,'#e8c070');for(let j=0;j<5;j++)R(c,26+j,43+j*3,24-j*2,1,'#b88a40');
for(let k=0;k<8;k++){const xx=28+k*6,dx=(xx-46)/25,yb=42-Math.round(16*Math.sqrt(Math.max(0,1-dx*dx)));tri(c,xx,yb-6,7,2,'#e8c070','#b89040')}
ell(c,35,53,7,8,'#8a1c1c');limb(c,34,58,31,61,4,'#7a1818',true);P(c,26,60,10,3,'#6a1414');R(c,24,61,3,2,'#f8f0c0');R(c,28,62,3,2,'#f8f0c0');R(c,33,62,3,2,'#f8f0c0');
limb(c,29,38,22,31,12,'#a02424',true);limb(c,22,31,17,23,10,'#a02424',true);limb(c,17,23,14,16,9,'#a82828',true);
limb(c,25,38,19,30,3,'#e8c070');limb(c,19,30,15,22,3,'#e8c070');
[[24,27],[19,20],[16,14]].forEach(q=>tri(c,q[0]+5,q[1]-3,6,2,'#e8c070','#b89040'));
fillPoly(c,[[44,28],[60,wy],[82,6+Math.round(wy*.5)],[86,20],[74,28],[58,32]],'#8a2848');
fillPoly(c,[[52,29],[62,wy+6],[78,10+Math.round(wy*.5)],[80,20],[72,27],[60,30]],'#b04060');
limb(c,45,29,60,wy,3,'#c8605a',true);limb(c,60,wy,82,6+Math.round(wy*.5),2,'#e8c8a0',true);limb(c,60,wy,86,20,2,'#e8c8a0',true);limb(c,60,wy,74,28,2,'#e8c8a0',true);
ell(c,13,15,10,8,'#0c0c24');ell(c,13,14,9,7,'#b02828');
fillPoly(c,[[9,9],[-3,13],[-5,18],[10,19]],'#a82626');
const jd=br?5:0;
fillPoly(c,[[10,19],[-4,19],[-1,27+jd],[12,24+jd]],'#8a1c1c');
fillPoly(c,[[1,18],[10,19],[11,23+jd],[0,21+jd]],'#400808');
for(let k=0;k<4;k++){R(c,-3+k*3,18,1,2,'#fff');R(c,-1+k*3,21+jd,1,2,'#fff')}
R(c,9,10,5,3,'#ffe060');R(c,11,10,1,3,'#200000');R(c,6,8,9,2,'#6a1010');R(c,-3,12,2,2,'#300000');
limb(c,15,8,21,2,3,'#e8d8b0',true);limb(c,21,2,27,0,2,'#e8d8b0',true);limb(c,10,7,12,-1,2,'#e8d8b0',true);
if(br){const f=Math.round(Math.sin(t/2)*3);fillPoly(c,[[-3,18],[-34,10+f],[-42,20],[-34,31-f],[-3,24+jd]],'#ff5a10');fillPoly(c,[[-3,19],[-28,13+f],[-34,20],[-28,28-f],[-3,23+jd]],'#ffb030');fillPoly(c,[[-3,20],[-18,16],[-22,20],[-18,25],[-3,22+jd]],'#fff0a0')}
else for(let i=0;i<3;i++)R(c,-5-i*3-((t>>3)%3),12-(((t>>2)+i*3)%8),2,2,'rgba(200,200,210,.5)');
c.restore()}
const ENM={slime:{name:'Une gelée verte',w:42,h:27,f:(c,x,y,s)=>drawSlime(c,x,y,s,true)},wolf:{name:'Un loup spectral',w:52,h:32,f:(c,x,y,s)=>drawWolf(c,x,y,s,true)},drake:{name:'Un drake pourpre',w:52,h:45,f:(c,x,y,s)=>drawDrake(c,x,y,s,true)},behemoth:{name:'Le Béhémoth',w:68,h:47,f:(c,x,y,s)=>drawBehemoth(c,x,y,s,true)},dragon:{name:'Le Dragon ancestral',w:90,h:64,f:(c,x,y,s)=>drawDragon(c,x,y,s)}};
