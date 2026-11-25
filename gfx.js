const W=320,H=180;
const BAY=[[0,8,2,10],[12,4,14,6],[3,11,1,9],[15,7,13,5]];
function R(c,x,y,w,h,col){c.fillStyle=col;c.fillRect(x,y,w,h)}
function P(c,x,y,w,h,col){R(c,x-1,y-1,w+2,h+2,'#0c0c24');R(c,x,y,w,h,col)}
function rnd(i){const x=Math.sin(i*127.1+311.7)*43758.5453;return x-Math.floor(x)}
function disc(c,cx,cy,r,col){for(let j=-r;j<=r;j++){const w=Math.floor(Math.sqrt(r*r-j*j));R(c,cx-w,cy+j,2*w+1,1,col)}}
function tri(c,cx,top,h,hw,col,col2){for(let j=0;j<h;j++){const w=Math.round(hw*(j+1)/h);R(c,cx-w,top+j,w,1,col2||col);R(c,cx,top+j,w+1,1,col)}}
function grad(c,w,h,cols,y0){y0=y0||0;for(let y=0;y<h;y++){const f=y/h*(cols.length-1),i=Math.floor(f),fr=f-i;for(let x=0;x<w;x++){const th=(BAY[y&3][x&3]+.5)/16;R(c,x,y0+y,1,1,fr>th?cols[Math.min(i+1,cols.length-1)]:cols[i])}}}
function ridge(c,base,amp,f1,f2,seed,cols,snow){const hs=[];for(let x=0;x<W+4;x++)hs[x]=Math.round(base-amp*((Math.sin(x*f1+seed)+Math.sin(x*f2+seed*2.3)*.6+1.6)/3.2));
for(let x=0;x<W;x++){const y=hs[x],lit=hs[x+2]>=hs[Math.max(0,x-2)];R(c,x,y,1,H-y,cols[lit?1:2]);R(c,x,y,1,2,cols[0]);if(snow&&y<snow)R(c,x,y,1,Math.min(8,snow-y+3),'#eef4ff')}}
function castle(c,x,y){P(c,x,y+12,44,26,'#5a5a88');R(c,x+2,y+14,8,22,'#6e6e9c');
[[x-8,y+2,12,36],[x+40,y+4,12,34],[x+16,y-10,12,48]].forEach(t=>{P(c,t[0],t[1],t[2],t[3],'#6a6a98');R(c,t[0]+1,t[1]+1,3,t[3]-2,'#8a8ab8');for(let k=0;k<t[2];k+=4)R(c,t[0]+k,t[1]-3,2,3,'#6a6a98');R(c,t[0]+4,t[1]+8,3,6,'#ffd860');R(c,t[0]+4,t[1]+20,3,6,'#ffd860');tri(c,t[0]+t[2]/2,t[1]-16,13,8,'#b02838','#7a1828')});
R(c,x+19,y-28,1,10,'#d8d8e8');R(c,x+20,y-28,7,4,'#f8d838');R(c,x+16,y+24,12,14,'#2a2040');R(c,x+18,y+22,8,2,'#2a2040')}
function buildBG(theme){const b=document.createElement('canvas');b.width=W;b.height=H;const c=b.getContext('2d');const n=theme==='night';
grad(c,W,118,n?['#060620','#0c1040','#162068','#223088','#3a4cb0','#5a6cc8','#8490e0','#b0b8f0']:['#2864d0','#3c7ce0','#5496ec','#70aef4','#90c6f8','#b0daff','#d0eaff','#eaf6ff']);
if(n){disc(c,262,34,22,'#1c2a78');disc(c,262,34,16,'#e8ecff');disc(c,257,31,5,'#c4c8e8');disc(c,267,40,3,'#c4c8e8')}else{disc(c,252,32,20,'#fff4b0');disc(c,252,32,14,'#ffe060')}
ridge(c,100,58,.021,.047,1,['#5a6ab8','#3a4888','#2a3470'],n?62:70);
ridge(c,116,38,.034,.081,4,['#3a6a58','#2a5040','#1e3c30'],0);
castle(c,148,70);
ridge(c,134,22,.05,.11,7,['#4a9a40','#2c7228','#1e5420'],0);
for(let x=-4;x<W;x+=11){const h=20+Math.floor(rnd(x)*12);tri(c,x+5,128-h,h,6,'#1e6a34','#134a24');R(c,x+4,128,2,4,'#3a2414')}
grad(c,W,H-128,['#3c8c30','#2e7428','#225c20','#183e18'],128);
for(let i=0;i<110;i++){const x=Math.floor(rnd(i+3)*W),y=134+Math.floor(rnd(i+77)*44);R(c,x,y,1,2,'#62b848');if(i%9===0)R(c,x,y-1,2,2,i%2?'#f8e060':'#f080c0')}
return b}
function drawHero(c,x,y,sc,glow){c.save();c.translate(x,y);c.scale(sc,sc);
P(c,5,15,22,24,'#a01820');R(c,6,16,4,22,'#d03030');
P(c,11,34,5,8,'#2848b0');P(c,17,34,5,8,'#203c98');P(c,10,41,7,3,'#503018');P(c,17,41,7,3,'#503018');
P(c,9,18,15,16,'#c8d0ec');R(c,9,18,5,16,'#e8ecff');R(c,9,29,15,3,'#f8d838');R(c,15,22,3,3,'#f8d838');
P(c,5,19,4,12,'#a8b0d0');P(c,24,19,4,12,'#a8b0d0');R(c,5,30,4,3,'#d8a060');R(c,24,30,4,3,'#d8a060');
P(c,11,6,11,11,'#f8c8a0');R(c,11,14,11,3,'#d8a078');R(c,13,11,2,2,'#101030');R(c,18,11,2,2,'#101030');
P(c,9,3,15,6,'#3858e8');P(c,8,1,4,4,'#3858e8');P(c,14,0,5,4,'#4a6af8');P(c,20,1,4,4,'#3858e8');R(c,9,8,3,6,'#3858e8');R(c,21,8,3,5,'#3858e8');R(c,10,8,13,2,'#f8d838');
if(glow){c.globalAlpha=.4+.2*Math.sin(Date.now()/200);disc(c,31,18,10,'#a0e0ff');c.globalAlpha=1}
P(c,30,6,3,26,'#e8f0ff');R(c,31,6,1,26,'#fff');P(c,28,30,7,3,'#f8d838');P(c,30,33,3,6,'#7a4a1a');c.restore()}
function drawSlime(c,x,y,sc,flip){c.save();c.translate(flip?x+42*sc:x,y);c.scale(flip?-sc:sc,sc);
for(let j=0;j<26;j++){const hw=Math.round(19*Math.sqrt(1-Math.pow((25-j)/26,2)));R(c,21-hw-1,j,2*hw+2,1,'#0c2410');R(c,21-hw,j,2*hw,1,j<7?'#a8f078':j<15?'#58d848':j<22?'#38b030':'#208820')}
R(c,12,5,7,3,'#e8ffd0');R(c,11,13,6,8,'#fff');R(c,25,13,6,8,'#fff');R(c,13,15,3,5,'#101030');R(c,27,15,3,5,'#101030');R(c,17,23,8,2,'#103010');R(c,8,20,3,2,'#f8a0a0');R(c,32,20,3,2,'#f8a0a0');c.restore()}
function drawDrake(c,x,y,sc,flip){c.save();c.translate(flip?x+52*sc:x,y);c.scale(flip?-sc:sc,sc);
for(let j=0;j<22;j++){const w=Math.round(18*(1-j/22))+2;R(c,16-w-1,1+j,w+1,1,'#0c0c24');R(c,16-w,2+j,w,1,j%5?'#6a2a9a':'#8a44bc')}
P(c,4,34,12,5,'#7a30a0');P(c,0,37,8,4,'#6a2a8a');
P(c,14,16,22,20,'#8a3aaa');R(c,18,22,14,14,'#e0b8f4');R(c,18,26,14,1,'#c898e0');R(c,18,30,14,1,'#c898e0');
for(let k=0;k<4;k++)tri(c,19+k*5,10,6,2,'#f8d838');
P(c,16,35,7,9,'#6a2a8a');P(c,28,35,7,9,'#6a2a8a');R(c,16,43,2,2,'#f8f0c0');R(c,20,43,2,2,'#f8f0c0');R(c,28,43,2,2,'#f8f0c0');R(c,32,43,2,2,'#f8f0c0');
P(c,32,7,14,13,'#9a4aba');P(c,42,12,10,8,'#a456c4');R(c,49,14,2,2,'#301040');R(c,38,10,4,4,'#fff');R(c,40,11,2,3,'#ff2020');R(c,44,18,6,1,'#301040');
tri(c,34,0,8,2,'#f8e8a0');tri(c,42,0,8,2,'#f8e8a0');c.restore()}
function cloud(c,x,y,s,col){[[2,8],[0,12],[-2,16],[0,12]].forEach((r,i)=>R(c,x+r[0]*s,y+i*2*s,r[1]*s,2*s,col))}
function artScene(c,k){const w=160,h=90;
if(k==='sword'){grad(c,w,90,['#2a1850','#6a2860','#c05068','#f09858','#ffd890']);disc(c,80,56,18,'#fff0b0');ridge2(c,70,'#3a2a50');ridge2(c,78,'#241830');
tri(c,80,58,22,16,'#78788a','#505064');R(c,78,28,4,34,'#e8f0ff');R(c,80,28,1,34,'#fff');P(c,72,44,16,4,'#f8d838');P(c,78,48,4,9,'#7a4a1a');for(let i=0;i<12;i++)R(c,80+Math.round(Math.cos(i/12*6.283)*(22+i%3*4)),38+Math.round(Math.sin(i/12*6.283)*(16+i%3*3)),2,2,'#fff8c0')}
if(k==='castle'){grad(c,w,90,['#2864d0','#5496ec','#90c6f8','#d0eaff']);cloud(c,10,60,2,'#fff');cloud(c,100,70,2,'#e8f4ff');cloud(c,30,16,1,'#fff');
for(let j=0;j<24;j++){const hw=Math.round(44*(1-j/24));R(c,80-hw,64+j,2*hw,1,j%4?'#6a4a30':'#8a6a44')}R(c,40,62,80,3,'#58b040');
R(c,72,70,2,20,'#a0d8ff');R(c,90,70,2,18,'#a0d8ff');castle(c,58,26)}
if(k==='dragon'){grad(c,w,90,['#080820','#181a58','#342e88','#6a5ab0']);disc(c,124,22,12,'#e8ecff');ridge2(c,70,'#241c50');ridge2(c,80,'#140e30');drawDrake(c,36,18,2,false)}
if(k==='airship'){grad(c,w,90,['#2864d0','#5496ec','#90c6f8','#d0eaff']);cloud(c,8,64,2,'#fff');cloud(c,112,56,2,'#fff');
for(let j=0;j<30;j++){const hw=Math.round(30*Math.sqrt(1-Math.pow((15-j)/15,2)));for(let x=-hw;x<hw;x+=6)R(c,80+x,8+j,6,1,((x+hw)/6|0)%2?'#f8f0e0':'#d82828')}
P(c,52,48,56,10,'#8a5a30');R(c,52,52,56,2,'#6a4020');P(c,106,48,8,6,'#9a6a38');R(c,76,38,1,10,'#503018');R(c,84,38,1,10,'#503018');for(let k2=0;k2<5;k2++)R(c,56+k2*10,50,3,3,'#ffd860');P(c,48,50,3,8,'#c8c8d8')}
if(k==='crystal'){grad(c,w,90,['#04040e','#0c0c28','#141440']);[[30,50,18,'#40e0ff','#1890b0'],[56,36,26,'#ff60d0','#b02890'],[84,26,34,'#60ffa0','#20a860'],[112,40,24,'#ffe060','#b09020'],[136,54,16,'#a080ff','#5038b0']].forEach(q=>{disc(c,q[0],88-q[2],q[2]+6,'#101030');tri(c,q[0],90-q[2]*2,q[2]*2,q[2]/3+3,q[3],q[4]);R(c,q[0]-1,90-q[2]*2+4,1,q[2],'#fff')});R(c,0,84,w,6,'#1a1a30')}
if(k==='village'){grad(c,w,90,['#060620','#162068','#3a4cb0','#8490e0']);disc(c,120,20,12,'#e8ecff');for(let i=0;i<24;i++)R(c,Math.floor(rnd(i)*w),Math.floor(rnd(i+5)*40),1,1,'#fff');R(c,0,70,w,20,'#183a20');
[[14,54,30],[52,50,36],[96,56,28],[128,52,26]].forEach(q=>{P(c,q[0],q[1],q[2],70-q[1]+4,'#6a5038');tri(c,q[0]+q[2]/2,q[1]-12,13,q[2]/2+4,'#a03030','#702020');R(c,q[0]+5,q[1]+8,6,7,'#ffd860');R(c,q[0]+q[2]-11,q[1]+8,6,7,'#ffd860')});for(let x=0;x<w;x+=14)tri(c,x+6,60,16,5,'#1c5a30','#143c24')}}
function ridge2(c,base,col){for(let x=0;x<160;x++){const y=Math.round(base-14*(Math.sin(x*.05+base)+Math.sin(x*.13)*.5));R(c,x,y,1,90-y,col)}}
