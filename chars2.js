/* Sprites v1.21.0 : paladin et mage sur un meme squelette (memes proportions) */

var U_R=R,U_disc=disc,U_tri=tri;
function hdk(h){var s=h.replace('#','');var n=[0,2,4].map(function(i){return parseInt(s.slice(i,i+2),16)});return '#'+[n[0]*.5+4,n[1]*.44+2,n[2]*.5+6].map(function(v){return Math.max(0,Math.min(255,Math.round(v))).toString(16).padStart(2,'0')}).join('')}
function drawHeroU(c,x,y,sc,st,mg){
if(!st||typeof st!=='object')st={pose:st?'attack':'idle',t:Date.now()/16,p:.5,glow:!!st};
const K=.86,AX=21,AY=46;
const X=v=>Math.round(AX+(v-AX)*K),Y=v=>Math.round(AY+(v-AY)*K),D=v=>Math.max(1,Math.round(v*K));
const R=(c,x,y,w,h,col)=>{const x0=X(x),y0=Y(y),x1=X(x+w),y1=Y(y+h);U_R(c,x0,y0,Math.max(1,x1-x0),Math.max(1,y1-y0),col)};
const HPD=(c,x,y,w,h,col)=>{const x0=X(x),y0=Y(y),x1=X(x+w),y1=Y(y+h),w2=Math.max(1,x1-x0),h2=Math.max(1,y1-y0);U_R(c,x0-1,y0-1,w2+2,h2+2,hdk(col));U_R(c,x0,y0,w2,h2,col)};
const limb=(c,x0,y0,x1,y1,w,col,ol)=>{const a=X(x0),b=Y(y0),a1=X(x1),b1=Y(y1),ww=D(w),n=Math.max(Math.abs(a1-a),Math.abs(b1-b),1);
if(ol)for(let s=0;s<=n;s++)U_R(c,Math.round(a+(a1-a)*s/n)-1,Math.round(b+(b1-b)*s/n)-1,ww+2,ww+2,hdk(col));
for(let s=0;s<=n;s++)U_R(c,Math.round(a+(a1-a)*s/n),Math.round(b+(b1-b)*s/n),ww,ww,col)};
const disc=(c,cx,cy,r,col)=>U_disc(c,X(cx),Y(cy),Math.max(1,Math.round(r*K)),col);
const tri=(c,cx,top,h,hw,col,col2)=>U_tri(c,X(cx),Y(top),D(h),D(hw),col,col2);
const pose=st.pose||'idle',t=st.t||0,p=st.p||0,S=Math.sin,C=Math.cos,swt=st.sw||0,el=mg&&st.el?PXEL[st.el]:null;
const bc=['#e8f0ff','#cfe6ff','#ffe0a0','#eadcff'][swt],gcl=el?el[0]:['#a0e0ff','#80c0ff','#ff9a30','#c060ff'][swt],orb=el?el[0]:['#7ad8ff','#80c0ff','#ffb050','#d890ff'][swt];
const rb='#fbf8fc',rs='#dcd4e8',rd='#b4a8cc',h1='#e05a2c',h2='#f88a4c',h3='#b03a1e',red='#d83028',redl='#f45a48',redd='#a02028';
const br=S(t/(pose==='weak'?6:pose==='tired'?10:16))>0?1:0;
let uy=br,lean=0,hdy=0,phi=40,th=-35,hand=null,bx=13,fx=25,kneel=false,mouth=0,eyes=0,glow=!!st.glow||swt>=2||!!el,run=0,hop=0;
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
if(st.special&&mg){c.globalAlpha=.25+.1*S(t/2);disc(c,22,28,29,gcl);c.globalAlpha=.2;disc(c,22,28,19,'#fff');c.globalAlpha=1}
R(c,8,gy-1,26,2,'rgba(0,0,0,.35)');
const fl=Math.round(S(t/5)*2)+(run?4:pose==='attack'?3:0);
const hx0=16+L,hy0=6+uy+hdy,pw=Math.round(S(t/7)*1.5)+(run?4:pose==='attack'?3:pose==='hurt'?-2:0);
if(!mg){const capeL=Math.min(22,gy-19-uy-(kneel?2:0)),sw=pose==='win'||pose==='cheer'?3:0;
for(let j=0;j<capeL;j++){const x0=13+L-3-Math.round(j*(run?.6:pose==='attack'?.4:.15))-Math.round(S(t/9+j/5)*(1+j/9))-sw,w=6+Math.round(j*.12),yy=19+uy+j;
R(c,x0-1,yy,w+2,1,j>capeL-3?'#8a6a10':'#6a2208');R(c,x0,yy,w,1,j>capeL-3?'#f8d838':(j%7<3?'#c04a14':'#a83c0e'));R(c,x0+w-2,yy,2,1,j>capeL-3?'#f8d838':'#f08a38')}}
else{const hl=kneel?10:15;HPD(c,hx0-5,hy0+5,7,hl,h1);R(c,hx0-4,hy0+6,2,hl-3,h2);R(c,hx0-5,hy0+3+hl,7,2,h3)}
limb(c,hx0-1,hy0+2,hx0-8-pw,hy0+8,5,mg?rs:'#a4aec8',true);limb(c,hx0-8-pw,hy0+8,hx0-11-pw*1.4,hy0+16,4,mg?rb:'#c4cade',true);
if(mg)HPD(c,Math.round(hx0-11-pw*1.4)-1,hy0+15,4,4,'#d83a40');
if(kneel){if(!mg){limb(c,hipx,hipy,12,gy-3,5,'#7a86a8',true);HPD(c,6,gy-5,8,4,'#4a5478');R(c,6,gy-5,8,1,'#7a86a8');
limb(c,hipx+1,hipy-1,hipx+9,hipy-6,5,'#a4aec8',true);limb(c,hipx+9,hipy-6,hipx+10,gy-5,5,'#a4aec8',true);HPD(c,hipx+6,gy-5,10,5,'#4a5478');R(c,hipx+6,gy-5,10,2,'#7a86a8')}}
else if(!mg){let b1=bx,b2=fx,l1=0,l2=0;if(run){const s=S(t/3);b1=14-s*6;b2=24+s*6;l1=Math.max(0,-s)*4;l2=Math.max(0,s)*4}
if(pose==='cheer'||pose==='win'){l1=hop*.7;l2=hop*.7}
limb(c,hipx-1,hipy,b1+3,gy-6-l1,5,'#7a86a8',true);HPD(c,Math.round(b1-1),Math.round(gy-5-l1),9,5,'#4a5478');R(c,Math.round(b1-1),Math.round(gy-5-l1),9,2,'#7a86a8');
limb(c,hipx+2,hipy,b2+2,gy-6-l2,5,'#b4bcd4',true);R(c,Math.round(b2+1),Math.round(gy-12-l2),3,3,'#e8ecf4');HPD(c,Math.round(b2-2),Math.round(gy-5-l2),10,5,'#5a6488');R(c,Math.round(b2-2),Math.round(gy-5-l2),10,2,'#8e98b8');R(c,Math.round(b2+6),Math.round(gy-3-l2),3,3,'#434c70')}
if(!mg){limb(c,14+L,17+uy,6+L-fl,20+uy,3,'#e8ecf4',true);R(c,5+L-fl,20+uy,4,2,'#8e98b8');
HPD(c,15+L,20+uy,12,13,'#c4cade');R(c,15+L,20+uy,4,13,'#f0f2f8');R(c,24+L,20+uy,3,13,'#8e98b8');R(c,15+L,26+uy,12,1,'#8e98b8');
R(c,20+L,22+uy,2,6,'#e4641c');R(c,20+L,26+uy,5,2,'#e4641c');R(c,20+L,22+uy,1,6,'#f08a38');R(c,17+L,21+uy,6,1,'#f0c850');
HPD(c,15+L,31+uy,12,3,'#7a5a2a');R(c,20+L,31+uy,3,3,'#f0c850');
const sk=Math.max(2,Math.min(5,gy+1-(34+uy)));HPD(c,14+L,34+uy,13,sk,'#232850');R(c,14+L,33+uy+sk,13,1,'#f0c850');R(c,14+L,34+uy,3,sk,'#2e3568');R(c,19+L,34+uy,2,sk,'#f4f4f4');
HPD(c,13+L,17+uy,14,4,'#a4aec8');R(c,14+L,17+uy,12,1,'#e8ecf4')}
else{const hemY=kneel?gy-3:gy-6-Math.round(hop*.7),top=19+uy;
for(let yy=top;yy<=hemY;yy++){const j=Math.max(0,yy-(31+uy)),l=14+L-(j/3|0),r=28+L+(j/3|0),w=r-l;
U_R(c,X(l)-1,Y(yy),1,Math.max(1,Y(yy+1)-Y(yy)),hdk(rd));U_R(c,X(r),Y(yy),1,Math.max(1,Y(yy+1)-Y(yy)),hdk(rd));
R(c,l,yy,w,1,rb);R(c,r-3,yy,3,1,rs);if(j>1)R(c,l+5,yy,1,1,rs);if(j>3)R(c,l+9,yy,1,1,rs);R(c,l,yy,1,1,'#fff');
if(yy>hemY-3){for(let xx=l;xx<r;xx++){const dep=[1,2,3,2][xx&3];if(yy>hemY-dep)R(c,xx,yy,1,1,(xx-l)<3?redl:red)}}}
{const l=14+L-(Math.max(0,hemY-(31+uy))/3|0),r=28+L+(Math.max(0,hemY-(31+uy))/3|0);U_R(c,X(l)-1,Y(hemY+1),X(r)-X(l)+2,1,'#6a1018')}
R(c,22+L,23+uy,1,1,'#f0c850');R(c,21+L,24+uy,3,1,'#f0c850');R(c,20+L,25+uy,5,1,'#f0c850');R(c,21+L,26+uy,3,1,'#f0c850');R(c,22+L,27+uy,1,1,'#f0c850');R(c,22+L,24+uy,1,3,rb);R(c,21+L,25+uy,3,1,rb);
HPD(c,13+L,18+uy,14,3,rb);R(c,14+L,18+uy,12,1,'#fff');
let b1=bx,b2=fx,l1=0,l2=0;if(kneel){b1=6;b2=hipx+6}else{if(run){const s=S(t/3);b1=14-s*6;b2=24+s*6;l1=Math.max(0,-s)*4;l2=Math.max(0,s)*4}
if(pose==='cheer'||pose==='win'){l1=hop*.7;l2=hop*.7}}
const by=gy-6;
HPD(c,Math.round(b1-1),Math.round(by-l1),10,6,redd);R(c,Math.round(b1-1),Math.round(by-l1),10,2,red);HPD(c,Math.round(b1+8),Math.round(by+3-l1),3,3,redd);
HPD(c,Math.round(b2-2),Math.round(by-l2),11,6,red);R(c,Math.round(b2-2),Math.round(by-l2),11,2,redl);R(c,Math.round(b2-2),Math.round(by-l2),2,6,redl);HPD(c,Math.round(b2+8),Math.round(by+3-l2),3,3,red)}
if(st.amu){R(c,25+L,20+uy,1,2,'#f8d838');HPD(c,24+L,22+uy,3,3,st.amu===2?'#707890':'#40e0ff');if(st.amu===1)R(c,25+L,23+uy,1,1,'#fff')}
if(mg){HPD(c,hx0-4,hy0-5,18,9,rb);R(c,hx0-3,hy0-4,9,1,'#fff');R(c,hx0+10,hy0-4,4,6,rs);HPD(c,hx0-4,hy0+3,6,7,rb);R(c,hx0-4,hy0+4,2,6,rs)}
HPD(c,hx0,hy0,12,12,'#fbd8bc');R(c,hx0+1,hy0+6,2,3,'#f0c0a0');
if(eyes){R(c,hx0+7,hy0+6,4,1,mg?'#8a3040':'#6a3a28');R(c,hx0+6,hy0+4,5,1,mg?'#b8603c':'#6a5040')}
else{R(c,hx0+7,hy0+5,4,3,'#fff');R(c,hx0+9,hy0+5,2,3,mg?'#e8505c':'#7a3a28');R(c,hx0+10,hy0+6,1,1,'#2a1410');R(c,hx0+6,hy0+(mouth===2?3:4),5,1,mg?'#b8603c':'#6a5040')}
if(mouth===2)R(c,hx0+8,hy0+9,3,2,'#a84840');else if(mouth===3){R(c,hx0+8,hy0+9,4,1,'#d88070');R(c,hx0+11,hy0+8,1,1,'#d88070')}else R(c,hx0+8,hy0+9,3,1,'#d88070');
if(!mg){HPD(c,hx0-2,hy0-3,16,6,'#c8b4a0');R(c,hx0+1,hy0-2,8,1,'#e0d0c0');R(c,hx0-2,hy0+2,4,9,'#9a8470');R(c,hx0+10,hy0+2,4,3,'#c8b4a0');R(c,hx0+12,hy0+3,2,3,'#e0d0c0');R(c,hx0+2,hy0-5,4,3,'#c8b4a0');R(c,hx0+7,hy0-5,5,3,'#e0d0c0');
R(c,hx0-1,hy0+1,14,2,'#c4cade');R(c,hx0-1,hy0+1,14,1,'#f0f2f8');R(c,hx0+11,hy0+1,2,2,'#c8402c');
tri(c,hx0+6,hy0-8,4,2,'#c4cade','#8e98b8');R(c,hx0-3,hy0-2,4,4,'#8e98b8');R(c,hx0-5,hy0-4,3,3,'#c4cade')}
else{R(c,hx0,hy0,12,3,h1);R(c,hx0+1,hy0,6,1,h2);R(c,hx0+9,hy0+3,3,1,h1);R(c,hx0,hy0+3,3,7,h1);R(c,hx0,hy0+3,1,6,h2);R(c,hx0+1,hy0+9,2,2,h3);R(c,hx0-1,hy0-1,13,1,rd)}
if(pose==='tired'||pose==='weak'){R(c,hx0+11,hy0+2+((t>>1)%10),1,2,'#9ad8ff')}
if(!mg){HPD(c,13+L,18+uy,9,6,'#f0f2f8');R(c,14+L,19+uy,4,2,'#fff');R(c,13+L,23+uy,9,1,'#f0c850');
if(st.shield){const bx0=19+L+(st.block?6:0),by0=25+uy;
if(st.shield===2){HPD(c,bx0,by0,9,12,'#2a3858');R(c,bx0+1,by0+1,7,10,'#8a9ac0');R(c,bx0+1,by0+1,7,2,'#c8d4f0');R(c,bx0+4,by0+2,1,8,'#e8ecff');R(c,bx0+1,by0+5,7,1,'#e8ecff');R(c,bx0+3,by0+4,3,3,'#40a0ff');[[1,1],[7,1],[1,9],[7,9]].forEach(q=>R(c,bx0+q[0],by0+q[1],1,1,'#fff'))}
else{HPD(c,bx0,by0,8,11,'#7a5a30');R(c,bx0+1,by0+1,6,9,'#c8a050');R(c,bx0+3,by0+2,2,7,'#e8c070');R(c,bx0+1,by0+4,6,2,'#e8c070');R(c,bx0+2,by0+5,4,1,'#a02020')}
if(st.block){c.globalAlpha=.7;disc(c,bx0+10,by0+5,4,'#fff');c.globalAlpha=1}}}
else if(st.block){c.globalAlpha=.7;disc(c,31+L,29+uy,5,'#fff');c.globalAlpha=1}
const sx=23+L,sy=22+uy;let ex,ey;
if(hand){ex=hand[0];ey=hand[1]}else{ex=sx+C(phi*DEG)*9;ey=sy+S(phi*DEG)*9}
limb(c,sx,sy,(sx+ex)/2+1,(sy+ey)/2,4,mg?rb:'#c4cade',true);limb(c,(sx+ex)/2+1,(sy+ey)/2,ex,ey,4,mg?rs:'#8e98b8',true);
if(mg){R(c,Math.round(ex)-2,Math.round(ey)-2,6,6,'#6a1018');R(c,Math.round(ex)-1,Math.round(ey)-1,4,4,'#d83a40');R(c,Math.round(ex)-1,Math.round(ey)-1,2,2,redl)}else R(c,Math.round(ex)-1,Math.round(ey)-1,4,4,'#a8aec4');
const len=mg?19:18,tx=ex+C(th*DEG)*len,ty=ey+S(th*DEG)*len;
if(mg){limb(c,ex-C(th*DEG)*5,ey-S(th*DEG)*5,tx,ty,2,'#e0b860',true);
if(glow){c.globalAlpha=.3+.15*S(t/6);disc(c,Math.round(tx),Math.round(ty),9,gcl);c.globalAlpha=1}
disc(c,Math.round(tx),Math.round(ty),5,hdk(orb));disc(c,Math.round(tx),Math.round(ty),4,orb);disc(c,Math.round(tx-1),Math.round(ty-1),1,'#ffffff');
limb(c,Math.round(tx-S(th*DEG)*5)-1,Math.round(ty+C(th*DEG)*5)-1,Math.round(tx+S(th*DEG)*5)-1,Math.round(ty-C(th*DEG)*5)-1,2,'#f4d048',true)}
else{if(glow){c.globalAlpha=.3+.15*S(t/6);for(let i=2;i<=18;i+=4)disc(c,Math.round(ex+C(th*DEG)*i),Math.round(ey+S(th*DEG)*i),3,gcl);c.globalAlpha=1}
limb(c,ex,ey,tx,ty,3,bc,true);limb(c,ex+1,ey,tx+1,ty,1,'#fff');
if(swt===3)for(let i=3;i<=16;i+=4)R(c,Math.round(ex+C(th*DEG)*i),Math.round(ey+S(th*DEG)*i),1,1,'#8a3ad0');
limb(c,ex-S(th*DEG)*4,ey+C(th*DEG)*4,ex+S(th*DEG)*4,ey-C(th*DEG)*4,2,swt===3?'#c8a8ff':'#f0c850',true);
R(c,Math.round(ex-C(th*DEG)*4),Math.round(ey-S(th*DEG)*4),2,2,'#7a4a1a')}
if(pose==='attack'&&p>.4&&p<.9){const a0=-135,a1=th,rr=mg?28:26;for(let a=a0;a<=a1;a+=7){const k=(a-a0)/(a1-a0||1);c.globalAlpha=.15+.6*k;R(c,Math.round(sx+C(a*DEG)*rr),Math.round(sy+S(a*DEG)*rr),3,3,mg?(el?el[1]:orb):(swt===3?'#d8a0ff':swt===2?'#ffd060':'#fff'))}c.globalAlpha=1}
if(st.special&&mg)for(let q=0;q<9;q++){const aa=t/10+q*.9;R(c,Math.round(22+C(aa)*(18+q%3*3)),Math.round(26+S(aa*1.3)*22),2,2,q%2?'#fff':gcl)}
if(pose==='cheer'||pose==='win')for(let i=0;i<6;i++)R(c,Math.round(20+C(t/20+i*1.05)*22),Math.round(16+S(t/17+i)*14),2,2,i%2?'#fff':'#ffe060');
if(run)for(let i=0;i<3;i++)R(c,Math.round(8-((t+i*5)%14)),gy-2-i,2,1,'#c8b890');
c.restore()}
drawPaladin=function(c,x,y,sc,st){drawHeroU(c,x,y,sc,st,false)};
drawMage=function(c,x,y,sc,st){drawHeroU(c,x,y,sc,st,true)};
