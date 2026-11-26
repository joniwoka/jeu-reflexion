/* Sprites v1.20.0 : paladin et mage redessines (surcharge de sprites.js et mage.js) */
var MG={ph:{'k':'#7c7490','m':'#fbf8fc','M':'#dcd4e8','N':'#b4a8cc','q':'#8a2c14','h':'#f88a4c','H':'#e05a2c','d':'#b03a1e','o':'#b8705c','s':'#fde2cc','S':'#f0c0a4','e':'#a04a52','i':'#e8505c','w':'#ffffff','r':'#e07a74','x':'#ff9ea4'},pb:{'k':'#7c7490','m':'#fbf8fc','M':'#dcd4e8','N':'#b4a8cc','G':'#f0a828','g':'#ffe070','y':'#8a5410','R':'#d83028','P':'#f45a48','D':'#b02028','W':'#6a1018'},head:['6.8k6.', '4.2k8mk5.', '3.k10mMk4.', '2.k11m2Mk3.', '2.k3m10NMk2.', '.k3mNhH3hH3hHNMk.', '.k3mNH3hHh5HNk.', 'k4mN3h3H2s2HsSo.', 'kN3mN3H8sSo.', 'qHN2mN3H5s2esSo.', 'qHN2mNh2H5siwsSo.', 'q2HNmNh2H5s2i3so', 'qHdNmNh2H3s2x3sSo.', 'qHdH2Nh2H8sSo.', 'qHd3Hh2H6s2rSo.', 'qHdh2Hh2H7sSo2.', 'qHdh2Hh2H7So3.', 'qHdh2Hh2H5S2ok3.', 'q2dh2Hh2H8Mk2.', 'q2dh2Hh2H8Mk2.', '.qdh2HhHdq7k3.', '.qdh2Hh2dq10.', '.q6dq11.', '2.q4dq12.', '3.4q13.', '20.'],torso:['5.k6m3Mk3.', '4.k7m3Mk3.', '4.k7m3Mk3.', '4.k7m3Mk3.', '3.k8mg3Mk2.', '3.k7mGmG2Mk2.', '2.k7mG3mGMk2.', '2.k8mGmG2Mk2.', '2.k5mM3mGm3Mk.', '.k5mM6m3Mk.', 'k5mM7m3Mk.', 'k5mM7m3Mk.', 'k5mM3mN3m3Mk.', 'k5mM3mN3m3Mk.', 'k5mM3mN3m3Mk.', 'k5mM3mN3m3Mk.', 'k5mM3mN3m3Mk.', 'km2W2mMm2WN3m2W2Mk', '2mPR4mPR4mPR2Mk', 'mWPRW2mWPRW2mWPRWMk', 'WP3R2WP3R2WP3R2W'],boot:['3.6W5.', '2.W5PRW4.', '2.W5PRW4.', '2.WP4WDW4.', '2.W2P2R2DW4.', '2.W2P2R2DW4.', '2.W2P2R3D2W2.', '2.W2P4R3PW.', '2.W10DW', '3.10W.']};

function hdk(h){var s=h.replace('#','');var n=[0,2,4].map(function(i){return parseInt(s.slice(i,i+2),16)});return '#'+[n[0]*.5+4,n[1]*.44+2,n[2]*.5+6].map(function(v){return Math.max(0,Math.min(255,Math.round(v))).toString(16).padStart(2,'0')}).join('')}
function HPD(c,x,y,w,h,col){R(c,x-1,y-1,w+2,h+2,hdk(col));R(c,x,y,w,h,col)}
function hlimb(c,x0,y0,x1,y1,w,col,ol){x0=Math.round(x0);y0=Math.round(y0);x1=Math.round(x1);y1=Math.round(y1);const n=Math.max(Math.abs(x1-x0),Math.abs(y1-y0),1);
if(ol)for(let s=0;s<=n;s++)R(c,Math.round(x0+(x1-x0)*s/n)-1,Math.round(y0+(y1-y0)*s/n)-1,w+2,w+2,hdk(col));
for(let s=0;s<=n;s++)R(c,Math.round(x0+(x1-x0)*s/n),Math.round(y0+(y1-y0)*s/n),w,w,col)}
function drawPaladin2(c,x,y,sc,st){
if(!st||typeof st!=='object')st={pose:st?'attack':'idle',t:Date.now()/16,p:.5,glow:!!st};
const pose=st.pose||'idle',t=st.t||0,p=st.p||0,S=Math.sin,C=Math.cos,swt=st.sw||0,bc=['#e8f0ff','#cfe6ff','#ffe0a0','#eadcff'][swt],gcl=['#a0e0ff','#80c0ff','#ff9a30','#c060ff'][swt];
const br=S(t/(pose==='weak'?6:pose==='tired'?10:16))>0?1:0;
let uy=br,lean=0,hdy=0,phi=40,th=-35,hand=null,bx=13,fx=25,kneel=false,mouth=0,eyes=0,glow=!!st.glow||swt>=2,run=0,hop=0;
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
c.save();c.translate(st.flip?x+40*sc:x,y);c.scale(st.flip?-sc:sc,sc);
R(c,6,gy-1,30,2,'rgba(0,0,0,.35)');
const fl=Math.round(S(t/5)*2)+(run?4:pose==='attack'?3:0);
const capeL=Math.min(22,gy-19-uy-(kneel?2:0)),sw=pose==='win'||pose==='cheer'?3:0;
for(let j=0;j<capeL;j++){const x0=13+L-3-Math.round(j*(run?.6:pose==='attack'?.4:.15))-Math.round(S(t/9+j/5)*(1+j/9))-sw,w=6+Math.round(j*.12),yy=19+uy+j;
R(c,x0-1,yy,w+2,1,j>capeL-3?'#8a6a10':'#6a2208');R(c,x0,yy,w,1,j>capeL-3?'#f8d838':(j%7<3?'#c04a14':'#a83c0e'));R(c,x0+w-2,yy,2,1,j>capeL-3?'#f8d838':'#f08a38')}
const hx0=16+L,hy0=6+uy+hdy,pw=Math.round(S(t/7)*1.5)+(run?4:pose==='attack'?3:pose==='hurt'?-2:0);
hlimb(c,hx0-1,hy0+2,hx0-8-pw,hy0+8,5,'#a4aec8',true);hlimb(c,hx0-8-pw,hy0+8,hx0-11-pw*1.4,hy0+16,4,'#c4cade',true);
if(kneel){hlimb(c,hipx,hipy,12,gy-3,5,'#7a86a8',true);HPD(c,6,gy-5,8,4,'#4a5478');R(c,6,gy-5,8,1,'#7a86a8');
hlimb(c,hipx+1,hipy-1,hipx+9,hipy-6,5,'#a4aec8',true);hlimb(c,hipx+9,hipy-6,hipx+10,gy-5,5,'#a4aec8',true);HPD(c,hipx+6,gy-5,10,5,'#4a5478');R(c,hipx+6,gy-5,10,2,'#7a86a8')}
else{let b1=bx,b2=fx,l1=0,l2=0;if(run){const s=S(t/3);b1=14-s*6;b2=24+s*6;l1=Math.max(0,-s)*4;l2=Math.max(0,s)*4}
if(pose==='cheer'||pose==='win'){l1=hop*.7;l2=hop*.7}
hlimb(c,hipx-1,hipy,b1+3,gy-6-l1,5,'#7a86a8',true);HPD(c,Math.round(b1-1),Math.round(gy-5-l1),9,5,'#4a5478');R(c,Math.round(b1-1),Math.round(gy-5-l1),9,2,'#7a86a8');
hlimb(c,hipx+2,hipy,b2+2,gy-6-l2,5,'#b4bcd4',true);R(c,Math.round(b2+1),Math.round(gy-12-l2),3,3,'#e8ecf4');HPD(c,Math.round(b2-2),Math.round(gy-5-l2),10,5,'#5a6488');R(c,Math.round(b2-2),Math.round(gy-5-l2),10,2,'#8e98b8');R(c,Math.round(b2+6),Math.round(gy-3-l2),3,3,'#434c70')}
hlimb(c,14+L,17+uy,6+L-fl,20+uy,3,'#e8ecf4',true);R(c,5+L-fl,20+uy,4,2,'#8e98b8');
HPD(c,15+L,20+uy,12,13,'#c4cade');R(c,15+L,20+uy,4,13,'#f0f2f8');R(c,24+L,20+uy,3,13,'#8e98b8');R(c,15+L,26+uy,12,1,'#8e98b8');
R(c,20+L,22+uy,2,6,'#e4641c');R(c,20+L,26+uy,5,2,'#e4641c');R(c,20+L,22+uy,1,6,'#f08a38');
R(c,17+L,21+uy,6,1,'#f0c850');
HPD(c,15+L,31+uy,12,3,'#7a5a2a');R(c,20+L,31+uy,3,3,'#f0c850');
const sk=Math.max(2,Math.min(5,gy+1-(34+uy)));HPD(c,14+L,34+uy,13,sk,'#232850');R(c,14+L,33+uy+sk,13,1,'#f0c850');R(c,14+L,34+uy,3,sk,'#2e3568');R(c,19+L,34+uy,2,sk,'#f4f4f4');
HPD(c,13+L,17+uy,14,4,'#a4aec8');R(c,14+L,17+uy,12,1,'#e8ecf4');
if(st.amu){R(c,25+L,20+uy,1,2,'#f8d838');HPD(c,24+L,22+uy,3,3,st.amu===2?'#707890':'#40e0ff');if(st.amu===1)R(c,25+L,23+uy,1,1,'#fff')}
HPD(c,hx0,hy0,12,12,'#fbd8bc');R(c,hx0+1,hy0+6,2,3,'#f0c0a0');
if(eyes){R(c,hx0+7,hy0+6,4,1,'#6a3a28');R(c,hx0+6,hy0+4,5,1,'#6a5040')}
else{R(c,hx0+7,hy0+5,4,3,'#fff');R(c,hx0+9,hy0+5,2,3,'#7a3a28');R(c,hx0+10,hy0+6,1,1,'#2a1410');R(c,hx0+6,hy0+(mouth===2?3:4),5,1,'#6a5040')}
if(mouth===2)R(c,hx0+8,hy0+9,3,2,'#a84840');else if(mouth===3){R(c,hx0+8,hy0+9,4,1,'#d88070');R(c,hx0+11,hy0+8,1,1,'#d88070')}else R(c,hx0+8,hy0+9,3,1,'#d88070');
HPD(c,hx0-2,hy0-3,16,6,'#c8b4a0');R(c,hx0+1,hy0-2,8,1,'#e0d0c0');R(c,hx0-2,hy0+2,4,9,'#9a8470');R(c,hx0+10,hy0+2,4,3,'#c8b4a0');R(c,hx0+12,hy0+3,2,3,'#e0d0c0');R(c,hx0+2,hy0-5,4,3,'#c8b4a0');R(c,hx0+7,hy0-5,5,3,'#e0d0c0');
R(c,hx0-1,hy0+1,14,2,'#c4cade');R(c,hx0-1,hy0+1,14,1,'#f0f2f8');R(c,hx0+11,hy0+1,2,2,'#c8402c');
tri(c,hx0+6,hy0-10,6,2,'#c4cade','#8e98b8');R(c,hx0-3,hy0-2,4,4,'#8e98b8');R(c,hx0-5,hy0-4,3,3,'#c4cade');
if(pose==='tired'||pose==='weak'){R(c,hx0+11,hy0+2+((t>>1)%10),1,2,'#9ad8ff')}
HPD(c,13+L,18+uy,9,6,'#f0f2f8');R(c,14+L,19+uy,4,2,'#fff');R(c,13+L,23+uy,9,1,'#f0c850');
if(st.shield){const bx0=19+L+(st.block?6:0),by0=25+uy;
if(st.shield===2){HPD(c,bx0,by0,9,12,'#2a3858');R(c,bx0+1,by0+1,7,10,'#8a9ac0');R(c,bx0+1,by0+1,7,2,'#c8d4f0');R(c,bx0+4,by0+2,1,8,'#e8ecff');R(c,bx0+1,by0+5,7,1,'#e8ecff');R(c,bx0+3,by0+4,3,3,'#40a0ff');[[1,1],[7,1],[1,9],[7,9]].forEach(q=>R(c,bx0+q[0],by0+q[1],1,1,'#fff'))}
else{HPD(c,bx0,by0,8,11,'#7a5a30');R(c,bx0+1,by0+1,6,9,'#c8a050');R(c,bx0+3,by0+2,2,7,'#e8c070');R(c,bx0+1,by0+4,6,2,'#e8c070');R(c,bx0+2,by0+5,4,1,'#a02020')}
if(st.block){c.globalAlpha=.7;disc(c,bx0+10,by0+5,4,'#fff');c.globalAlpha=1}}
const sx=23+L,sy=22+uy;let ex,ey;
if(hand){ex=hand[0];ey=hand[1]}else{ex=sx+C(phi*DEG)*9;ey=sy+S(phi*DEG)*9}
hlimb(c,sx,sy,(sx+ex)/2+1,(sy+ey)/2,4,'#c4cade',true);hlimb(c,(sx+ex)/2+1,(sy+ey)/2,ex,ey,4,'#8e98b8',true);R(c,Math.round(ex)-1,Math.round(ey)-1,4,4,'#a8aec4');
const tx=ex+C(th*DEG)*18,ty=ey+S(th*DEG)*18;
if(glow){c.globalAlpha=.3+.15*S(t/6);for(let i=2;i<=18;i+=4)disc(c,Math.round(ex+C(th*DEG)*i),Math.round(ey+S(th*DEG)*i),3,gcl);c.globalAlpha=1}
hlimb(c,ex,ey,tx,ty,3,bc,true);hlimb(c,ex+1,ey,tx+1,ty,1,'#fff');
if(swt===3)for(let i=3;i<=16;i+=4)R(c,Math.round(ex+C(th*DEG)*i),Math.round(ey+S(th*DEG)*i),1,1,'#8a3ad0');
hlimb(c,ex-S(th*DEG)*4,ey+C(th*DEG)*4,ex+S(th*DEG)*4,ey-C(th*DEG)*4,2,swt===3?'#c8a8ff':'#f0c850',true);
R(c,Math.round(ex-C(th*DEG)*4),Math.round(ey-S(th*DEG)*4),2,2,'#7a4a1a');
if(pose==='attack'&&p>.4&&p<.9){const a0=-135,a1=th;for(let a=a0;a<=a1;a+=7){const k=(a-a0)/(a1-a0||1);c.globalAlpha=.15+.6*k;R(c,Math.round(sx+C(a*DEG)*26),Math.round(sy+S(a*DEG)*26),3,3,swt===3?'#d8a0ff':swt===2?'#ffd060':'#fff')}c.globalAlpha=1}
if(pose==='cheer'||pose==='win')for(let i=0;i<6;i++)R(c,Math.round(20+C(t/20+i*1.05)*22),Math.round(16+S(t/17+i)*14),2,2,i%2?'#fff':'#ffe060');
if(run)for(let i=0;i<3;i++)R(c,Math.round(8-((t+i*5)%14)),gy-2-i,2,1,'#c8b890');
c.restore()}
drawPaladin=drawPaladin2;

function mdk(h){var s=h.replace('#','');var n=[0,2,4].map(function(i){return parseInt(s.slice(i,i+2),16)});return '#'+[n[0]*.5+4,n[1]*.44+2,n[2]*.5+6].map(function(v){return Math.max(0,Math.min(255,Math.round(v))).toString(16).padStart(2,'0')}).join('')}
function mlimb(c,x0,y0,x1,y1,w,col,ol){x0=Math.round(x0);y0=Math.round(y0);x1=Math.round(x1);y1=Math.round(y1);var n=Math.max(Math.abs(x1-x0),Math.abs(y1-y0),1);
if(ol)for(var s=0;s<=n;s++)R(c,Math.round(x0+(x1-x0)*s/n)-1,Math.round(y0+(y1-y0)*s/n)-1,w+2,w+2,mdk(col));
for(var s2=0;s2<=n;s2++)R(c,Math.round(x0+(x1-x0)*s2/n),Math.round(y0+(y1-y0)*s2/n),w,w,col)}
function mpx(c,x0,y0,x1,y1,w,col,hi,sh){x0=Math.round(x0);y0=Math.round(y0);x1=Math.round(x1);y1=Math.round(y1);var n=Math.max(Math.abs(x1-x0),Math.abs(y1-y0),1),s;
for(s=0;s<=n;s++)R(c,Math.round(x0+(x1-x0)*s/n)-1,Math.round(y0+(y1-y0)*s/n)-1,w+2,w+2,mdk(sh));
for(s=0;s<=n;s++){var X=Math.round(x0+(x1-x0)*s/n),Y=Math.round(y0+(y1-y0)*s/n);R(c,X,Y,w,w,col);R(c,X,Y,1,w,hi);R(c,X+w-1,Y,1,w,sh)}}
function mHead(v){var k='m2head'+v;if(TXC[k])return TXC[k];var r=tDec(MG.head).map(function(s){return s.split('')});function P(x,y,c){r[y][x]=c}
if(v==='o'){P(15,14,'e');P(16,14,'e');P(15,15,'r')}
else if(v==='h'){P(14,9,'e');P(15,9,'e');P(14,10,'s');P(15,10,'s');P(14,11,'s');P(15,11,'s');P(15,14,'e');P(16,14,'e');P(15,15,'r')}
else if(v==='s'){P(14,9,'s');P(15,9,'s');P(14,10,'s');P(15,10,'s');P(14,11,'s');P(15,11,'s');P(14,10,'e');P(15,9,'e');P(16,10,'e');P(15,14,'r');P(16,14,'r');P(14,13,'r');P(17,13,'r')}
else if(v==='x'){P(14,9,'e');P(15,9,'s');P(15,10,'e');P(14,10,'s');P(14,11,'e');P(15,11,'s');P(15,14,'r');P(16,14,'r');P(16,15,'r')}
return tMake(k,r.map(function(a){return a.join('')}),MG.ph,false)}
function mTorso(){return tMake('m2torso',MG.torso,MG.pb,false)}
function mBoot(){return tMake('m2boot',MG.boot,MG.pb,false)}
function drawMage(c,x,y,sc,st){
if(!st||typeof st!=='object')st={pose:st?'attack':'idle',t:Date.now()/16,p:.5,glow:!!st};
var pose=st.pose||'idle',t=st.t||0,p=st.p||0,S=Math.sin,C=Math.cos,swt=st.sw||0,el=st.el?PXEL[st.el]:null;
var orb=el?el[0]:['#7ad8ff','#80c0ff','#ffb050','#d890ff'][swt],gcl=el?el[0]:['#a0e0ff','#80c0ff','#ff9a30','#c060ff'][swt];
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
if(st.special){c.globalAlpha=.25+.1*S(t/2);disc(c,22,28,29,gcl);c.globalAlpha=.2;disc(c,22,28,19,'#fff');c.globalAlpha=1}
R(c,6,gy-1,30,2,'rgba(0,0,0,.35)');
var hx0=16+L,hy0=6+uy+hdy;
if(kneel){mpx(c,hipx,hipy,12,gy-3,5,'#ece6f4','#fbf8fc','#b4a8cc');fBlit(c,mBoot(),4,gy-10,1,false);
mpx(c,hipx+1,hipy-1,hipx+9,hipy-6,5,'#dcd4e8','#f4f0f8','#a89cc0');mpx(c,hipx+9,hipy-6,hipx+10,gy-5,5,'#dcd4e8','#f4f0f8','#a89cc0');fBlit(c,mBoot(),hipx+4,gy-10,1,false)}
else{var b1=bx,b2=fx,l1=0,l2=0;if(run){var s=S(t/3);b1=14-s*6;b2=24+s*6;l1=Math.max(0,-s)*4;l2=Math.max(0,s)*4}
if(pose==='cheer'||pose==='win'){l1=hop*.7;l2=hop*.7}
mpx(c,hipx-1,hipy,b1+3,gy-7-l1,5,'#ece6f4','#fbf8fc','#b4a8cc');fBlit(c,mBoot(),Math.round(b1-2),Math.round(gy-10-l1),1,false);
mpx(c,hipx+2,hipy,b2+2,gy-7-l2,5,'#dcd4e8','#f4f0f8','#a89cc0');fBlit(c,mBoot(),Math.round(b2-2),Math.round(gy-10-l2),1,false)}
fBlit(c,mTorso(),12+L,17+uy,1,false);
if(st.amu){R(c,25+L,20+uy,1,2,'#f8d838');P(c,24+L,22+uy,3,3,st.amu===2?'#707890':'#40e0ff');if(st.amu===1)R(c,25+L,23+uy,1,1,'#fff')}
fBlit(c,mHead(hv),hx0-2,hy0-7,1,false);
if(pose==='tired'||pose==='weak'){R(c,hx0+11,hy0+4+((t>>1)%10),1,2,'#9ad8ff')}
if(st.block){c.globalAlpha=.7;disc(c,31+L,29+uy,5,'#fff');c.globalAlpha=1}
var sx=23+L,sy=22+uy,ex,ey;
if(hand){ex=hand[0];ey=hand[1]}else{ex=sx+C(phi*DEG)*9;ey=sy+S(phi*DEG)*9}
mpx(c,sx,sy,(sx+ex)/2+1,(sy+ey)/2,4,'#fbf8fc','#ffffff','#c8bedc');mpx(c,(sx+ex)/2+1,(sy+ey)/2,ex,ey,4,'#f0ecf6','#ffffff','#b4a8cc');R(c,Math.round(ex)-2,Math.round(ey)-2,6,6,'#6a1018');R(c,Math.round(ex)-1,Math.round(ey)-1,4,4,'#d83a40');R(c,Math.round(ex)-1,Math.round(ey)-1,2,2,'#f45a48');
var tx=ex+C(th*DEG)*19,ty=ey+S(th*DEG)*19;
mlimb(c,ex-C(th*DEG)*5,ey-S(th*DEG)*5,tx,ty,2,'#e0b860',true);
if(glow){c.globalAlpha=.3+.15*S(t/6);disc(c,Math.round(tx),Math.round(ty),9,gcl);c.globalAlpha=1}
disc(c,Math.round(tx),Math.round(ty),5,mdk(orb));disc(c,Math.round(tx),Math.round(ty),4,orb);disc(c,Math.round(tx-1),Math.round(ty-1),1,'#ffffff');
mlimb(c,Math.round(tx-S(th*DEG)*5)-1,Math.round(ty+C(th*DEG)*5)-1,Math.round(tx+S(th*DEG)*5)-1,Math.round(ty-C(th*DEG)*5)-1,2,'#f4d048',true);
if(pose==='attack'&&p>.4&&p<.9){var a0=-135,a1=th;for(var a=a0;a<=a1;a+=7){var kk=(a-a0)/(a1-a0||1);c.globalAlpha=.15+.6*kk;R(c,Math.round(sx+C(a*DEG)*28),Math.round(sy+S(a*DEG)*28),3,3,el?el[1]:orb)}c.globalAlpha=1}
if(st.special)for(var q=0;q<9;q++){var aa=t/10+q*.9;R(c,Math.round(22+C(aa)*(18+q%3*3)),Math.round(26+S(aa*1.3)*22),2,2,q%2?'#fff':gcl)}
if(pose==='cheer'||pose==='win')for(var i3=0;i3<6;i3++)R(c,Math.round(20+C(t/20+i3*1.05)*22),Math.round(16+S(t/17+i3)*14),2,2,i3%2?'#fff':'#ffe060');
if(run)for(var i4=0;i4<3;i4++)R(c,Math.round(8-((t+i4*5)%14)),gy-2-i4,2,1,'#c8b890');
c.restore()}
