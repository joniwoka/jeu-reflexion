function pxT(r,s){if(typeof r==='string')return r;return r[s<.16?0:s<.38?1:s<.62?2:s<.84?3:4]}
var JP={
indigo:['#a8b8ff','#6a80e8','#3a50b8','#243488','#141c58'],
shu:['#ffb8a0','#ff6848','#e03020','#a01818','#600c0c'],
shiro:['#ffffff','#f4f6ff','#d8def0','#a8b0d0','#6a7298'],
hair:['#9aa8f8','#6070d8','#3c4cb0','#26307c','#141a48'],
kuro:['#7a7aa0','#4c4c70','#30304c','#1e1e32','#10101c'],
ao:['#e0ffff','#80e8ff','#38b8f0','#1878d0','#0c3c90'],
slime:['#e8f8ff','#9ad8ff','#48b0f4','#2080d0','#104898'],
jade:['#e0fff0','#80f0c8','#30c098','#108870','#084c40'],
pink:['#fff0f4','#ffc0d4','#f088a8','#b84870','#702040'],
oni:['#ffc8b0','#f86850','#d83024','#9c1812','#580c0a'],
straw:['#f8e8b0','#e0c878','#b89848','#806428','#4a3810'],
tora:['#fff4a8','#ffe060','#f8c820','#c89010','#8a6008'],
leaf:['#e8ffd0','#a0e878','#58c050','#2c8838','#144c20']};
var JD=['#2c2c44','#1c1c2c','#10101c','#10101c','#10101c'];
function pxHead(v){return pxSprite('jhead'+v,20,20,function(g){var R=PXR;
pxBall(g,7,10,5.5,8,JP.hair);
pxBox(g,9,16,5,4,R.skin,0);
pxBall(g,12,11.5,6,6,R.skin);
pxPoly(g,[[5,10],[4,5],[8,1],[14,2],[18,7],[18,9],[15,7],[13,10],[11,6],[9,10],[7,7]],JP.hair,[.4,.9]);
pxTri(g,10,0,4,1.6,JP.hair);pxTri(g,14,0,3,1.2,JP.hair);
pxBox(g,4,8,14,2,JP.shiro,0);pxBox(g,13,7,4,4,R.gold,0);pxS(g,15,8,JP.shu[2]);pxS(g,14,9,JP.shu[2]);
pxPoly(g,[[12,7],[9,0],[13,5]],R.gold,[.3,.9]);pxPoly(g,[[16,7],[19,0],[17,5]],R.gold,[.3,.9]);
if(v==='h'||v==='x'){pxBox(g,12,12,5,1,JD,0);pxS(g,13,11,JD[1]);pxS(g,15,11,JD[1]);pxS(g,13,13,JD[1]);pxS(g,15,13,JD[1]);if(v==='x'){pxBox(g,12,11,5,3,JP.shiro,0);pxS(g,12,11,JD[1]);pxS(g,13,12,JD[1]);pxS(g,14,13,JD[1]);pxS(g,14,11,JD[1]);pxS(g,12,13,JD[1])}pxBox(g,14,15,3,2,'#601818',0)}
else if(v==='s'){pxS(g,12,13,JD[1]);pxS(g,13,12,JD[1]);pxS(g,14,12,JD[1]);pxS(g,15,13,JD[1]);pxBox(g,13,15,4,2,'#601818',0);pxS(g,14,16,'#ff8090');pxS(g,15,16,'#ff8090')}
else{pxBox(g,12,11,5,4,JP.shiro,0);pxBox(g,13,11,3,4,['#fff0a0','#ffc040','#e08820','#a05010','#603008'],0);pxBox(g,14,12,2,2,JD,0);pxS(g,13,11,'#ffffff');pxS(g,15,14,'#fff4b0');pxBox(g,12,10,5,1,JD,0);pxS(g,17,11,JD[1]);
if(v==='o')pxBox(g,14,15,3,2,'#601818',0);else{pxS(g,14,16,'#a04030');pxS(g,15,16,'#a04030');pxS(g,16,15,'#a04030')}}
pxS(g,17,13,R.skin[3]);pxBox(g,11,14,2,1,'#ff9aaa',0);
if(v==='o'||v==='h'){pxBox(g,12,9,5,1,JD,0)}
})}
function pxTorso(){return pxSprite('jtorso',15,16,function(g){var R=PXR;
pxBox(g,2,3,11,13,JP.indigo,0);
pxBox(g,2,1,11,8,JP.shiro,2);pxBox(g,3,3,9,1,R.gold,0);pxBox(g,3,5,9,1,R.gold,0);pxBox(g,3,7,9,1,R.gold,0);
pxBox(g,5,0,5,3,JP.shu,0);pxBox(g,7,1,1,2,JP.shiro,0);
pxBox(g,1,9,13,3,JP.shu,0);pxBox(g,6,9,3,3,R.gold,0);pxBox(g,0,10,3,5,JP.shu,0);
pxBox(g,2,12,3,4,JP.indigo,0);pxBox(g,6,12,3,4,JP.shu,0);pxBox(g,10,12,3,4,JP.indigo,0);pxBox(g,2,15,11,1,R.gold,0);
pxBox(g,9,0,6,2,JP.indigo,1);pxBox(g,9,2,6,2,JP.shiro,0);pxBox(g,9,4,6,2,JP.indigo,1);pxBox(g,9,0,6,1,R.gold,0)})}
function pxBoot(){return pxSprite('jboot',11,7,function(g){pxBox(g,0,0,7,3,JP.indigo,0);pxBox(g,0,2,7,2,JP.shiro,0);pxBox(g,0,3,11,3,JP.shiro,1);pxBox(g,0,5,11,2,JP.straw,0);pxS(g,6,3,JP.shu[2]);pxS(g,7,4,JP.shu[2])})}
function pxShield(t){return pxSprite('jshield'+t,10,13,function(g){var R=PXR;
if(t===2){pxBall(g,5,6.5,5,6.4,R.iron);pxBall(g,5,6.5,3.6,3.8,R.gold);pxBall(g,5,6.5,2.2,2.3,JP.indigo);pxS(g,4,5,'#fff')}
else{pxBall(g,5,6.5,5,6.4,R.wood);pxBall(g,5,6.5,2.5,2.6,JP.shu);pxS(g,4,5,JP.shu[0])}})}
function pxSlime(v){return pxSprite('jslime'+v,44,30,function(g){var S=JP.slime;
pxBall(g,22,20,19,9,S,{ly:-.8});
pxBall(g,22,15,14,11,S);
pxPoly(g,[[17,10],[20,2],[27,-0.5],[28,2],[25,3],[26,6],[27,11]],S,[.3,.9]);
pxBall(g,14,12,4,2.5,['#ffffff','#ffffff','#e8f8ff','#e8f8ff','#e8f8ff']);pxS(g,10,14,'#fff');pxS(g,9,15,'#fff');
[[15,17],[29,17]].forEach(function(e){pxBall(g,e[0],e[1],3,4,JD);pxS(g,e[0]-1,e[1]-2,'#ffffff');pxS(g,e[0]-1,e[1]-1,'#ffffff');pxS(g,e[0]+1,e[1]+1,'#8ab8ff')});
pxBox(g,9,21,4,2,JP.pink,1);pxBox(g,32,21,4,2,JP.pink,1);
if(v==='a'){pxBox(g,16,22,12,6,'#401020',2);pxBox(g,18,25,8,3,JP.pink,1);pxBox(g,16,20,2,1,JD,0);pxBox(g,26,20,2,1,JD,0);pxPoly(g,[[12,12],[19,15],[19,13]],JD[1]);pxPoly(g,[[32,12],[25,15],[25,13]],JD[1])}
else{pxBox(g,18,23,9,1,JD,0);pxS(g,17,22,JD[1]);pxS(g,27,22,JD[1]);pxBox(g,20,24,5,1,'#e06080',0)}
})}
function pxWolf(v){return pxSprite('jwolf'+v,58,38,function(g){var W=JP.shiro,F=JP.ao;
pxPoly(g,[[12,18],[4,16],[0,9],[3,11],[1,3],[7,10],[12,13]],F,[.4,.9]);pxPoly(g,[[10,17],[5,14],[3,8],[6,11],[9,13]],['#ffffff','#e0ffff','#e0ffff','#80e8ff','#80e8ff'],[.4,.9]);
pxLine(g,14,25,12,36,5,W);pxLine(g,21,26,23,36,5,W);
pxBall(g,15,19,8,8,W);pxBall(g,28,18,13,8.5,W);pxBall(g,39,19,8,9,W);
pxBall(g,28,24,11,4,JP.shiro,{ly:-.9});
pxPoly(g,[[37,9],[44,5],[48,14],[44,22],[37,22]],W,[.5,.8]);
pxLine(g,34,26,33,36,5,W);pxLine(g,41,26,44,36,5,W);
[[11,36],[20,36],[32,36],[43,36]].forEach(function(f){pxBox(g,f[0]-1,f[1]-1,7,3,JP.shiro,1);pxBox(g,f[0],f[1]-5,3,1,JP.shu,0);pxBox(g,f[0],f[1]-3,3,1,JP.shu,0)});
pxBall(g,45,11,6.4,5.6,W);
pxPoly(g,[[48,8],[57,12],[57,15],[48,18]],W,[.4,.9]);
pxPoly(g,[[47,16],[55,15],[52,21],[46,20]],JP.shiro,[.3,.9]);
if(v==='a'){pxPoly(g,[[48,16],[56,17],[53,26],[47,22]],['#401020','#401020','#401020','#401020','#401020'],[.3,.9]);pxPoly(g,[[49,20],[53,20],[52,24]],JP.pink,[.3,.9])}
for(var i=0;i<4;i++)pxTri(g,49+i*2,v==='a'?14:15,3,1,JP.shiro);
pxS(g,57,12,JD[1]);pxS(g,56,12,JD[1]);
pxTri(g,41,-1,10,2.6,W);pxTri(g,47,0,9,2.4,W);pxTri(g,41,3,6,1.2,JP.pink);
pxBox(g,46,9,4,3,['#ff7040','#ff3020','#ff3020','#c01010','#c01010'],0);pxS(g,48,9,'#fff0a0');
pxLine(g,50,6,52,10,2,JP.shu);pxLine(g,52,13,55,14,1,JP.shu);pxLine(g,44,15,48,18,1,JP.shu);
[[30,6],[26,5],[22,6],[18,8],[34,7],[38,8]].forEach(function(m,i){pxTri(g,m[0],m[1]-1,8,2+(i%2),F)});
pxLine(g,34,17,45,20,2,JP.straw);pxBox(g,37,19,2,5,JP.shiro,0);pxBox(g,41,20,2,5,JP.shiro,0);pxS(g,37,22,JP.shiro[3]);pxS(g,41,23,JP.shiro[3]);
})}
function pxDrake(v){return pxSprite('jtengu'+v,58,52,function(g){var K=JP.kuro,RD=JP.oni;
pxPoly(g,[[22,28],[3,6],[9,18],[0,22],[8,31],[2,40],[20,36]],K,[.5,.8]);
pxLine(g,22,28,5,8,1,'#6070d8');pxLine(g,22,30,3,22,1,'#6070d8');pxLine(g,21,33,3,38,1,'#6070d8');
pxLine(g,22,46,19,51,4,K);pxLine(g,30,46,34,51,4,K);pxBox(g,15,50,8,2,JP.straw,0);pxBox(g,31,50,8,2,JP.straw,0);
pxBall(g,27,34,9,13,JP.indigo,{ly:-.4});pxBox(g,22,26,10,3,JP.shiro,0);
pxBall(g,31,28,2.2,2.2,JP.shiro);pxBall(g,31,34,2.2,2.2,JP.shiro);pxBox(g,18,42,18,3,JP.shu,0);
pxLine(g,32,32,43,36,4,JP.indigo);
pxPoly(g,[[44,40],[50,28],[57,34],[51,45]],JP.leaf,[.5,.8]);pxLine(g,44,40,52,34,1,JP.leaf[4]);pxLine(g,46,42,38,38,2,JP.wood||PXR.wood);
pxBall(g,36,16,7.2,7,RD);
pxPoly(g,[[40,14],[56,17],[56,20],[40,22]],RD,[.4,.9]);
pxBox(g,36,22,7,1,['#201010','#201010','#201010','#201010','#201010'],0);
pxPoly(g,[[35,9],[46,7],[47,11],[36,13]],JP.shiro,[.3,.9]);
pxBox(g,38,13,4,3,['#fff0a0','#ffe060','#ffe060','#ff9020','#ff9020'],0);pxS(g,40,14,'#201010');
pxBox(g,33,3,7,5,K,1);pxBox(g,33,6,7,1,JP.shu,0);
pxBall(g,31,22,4,3,JP.shiro);pxBall(g,34,25,3,3,JP.shiro);
if(v==='a'){pxBox(g,40,19,12,3,'#401020',0);pxPoly(g,[[44,18],[50,18],[47,22]],JP.shiro,[.3,.9]);pxLine(g,57,8,50,10,1,JP.ao[1]);pxLine(g,57,12,51,13,1,JP.ao[1]);pxLine(g,56,26,48,27,1,JP.ao[1])}
})}
function pxBehemoth(v){return pxSprite('joni'+v,76,56,function(g){var O=JP.oni,K=JP.kuro,T=JP.tora;
pxLine(g,18,32,6,6,7,JP.wood||PXR.wood);[[17,28],[14,22],[12,16],[9,11]].forEach(function(s){pxBall(g,s[0],s[1],3,3,PXR.iron)});pxBall(g,7,8,5,6,PXR.iron);pxS(g,5,5,'#fff');
pxBox(g,18,38,10,16,O,2);pxBox(g,50,38,10,16,O,2);pxBox(g,30,40,9,14,O,2);pxBox(g,41,40,9,14,O,2);
[[17,53],[29,53],[40,53],[49,53]].forEach(function(f){pxBox(g,f[0],f[1],11,3,O,1);for(var k=0;k<3;k++)pxS(g,f[0]+1+k*4,f[1]+3,PXR.bone[0])});
pxBall(g,38,27,20,16,O);
pxBall(g,38,34,13,7,JP.oni.map(function(c,i){return JP.oni[Math.max(0,i-1)]}),{ly:-.9});
pxBox(g,20,38,36,9,T,1);for(var i=0;i<9;i++)pxBox(g,22+i*4,38,2,9,K,0);
pxLine(g,22,22,18,31,8,O);pxBall(g,17,33,4.5,4.5,O);
pxLine(g,54,22,64,32,8,O);pxBall(g,66,34,5,5,O);
pxPoly(g,[[46,14],[44,3],[51,9],[52,1],[56,8]],K,[.4,.9]);
pxBall(g,59,17,11,10,O);
pxPoly(g,[[52,11],[50,1],[57,7]],PXR.bone,[.5,.8]);pxPoly(g,[[63,7],[67,0],[68,9]],PXR.bone,[.5,.8]);
pxPoly(g,[[53,12],[63,14],[63,16],[53,14]],K,[.4,.9]);
pxBox(g,55,15,6,3,['#fff0a0','#ffe060','#ffe060','#ff9020','#ff9020'],0);pxS(g,58,16,'#a00000');
pxBox(g,56,23,11,3,['#401020','#401020','#401020','#401020','#401020'],0);
if(v==='a'){pxBox(g,55,23,13,6,'#401020',1);pxBox(g,58,27,7,2,JP.pink,0)}
pxTri(g,57,v==='a'?19:20,4,1.4,PXR.bone);pxTri(g,66,v==='a'?19:20,4,1.4,PXR.bone);
pxS(g,64,19,JD[1]);pxS(g,65,19,JD[1]);
})}

function pxRyu(v){return pxSprite('jryu'+v,92,64,function(g){var J=JP.jade,sh=JP.shu,go=PXR.gold;
var P=[[26,22],[36,25],[48,21],[62,15],[76,19],[84,29],[80,41],[68,47],[54,51],[42,57],[30,59],[20,55]],pts=[],i,n=P.length-1,k;
for(i=0;i<n;i++)for(k=0;k<6;k++)pts.push([P[i][0]+(P[i+1][0]-P[i][0])*k/6,P[i][1]+(P[i+1][1]-P[i][1])*k/6]);
var N=pts.length;
for(i=N-1;i>=0;i--){var t=i/N,r=2+5.2*Math.sin(Math.min(1,(1-t)*1.25)*1.45);if(i%3===0&&i>2)pxTri(g,pts[i][0]+1,pts[i][1]-r-3,5,1.6,sh)}
for(i=N-1;i>=0;i--){var t2=i/N,r2=2+5.2*Math.sin(Math.min(1,(1-t2)*1.25)*1.45);pxBall(g,pts[i][0],pts[i][1],r2,r2,J,{ly:-.9})}
for(i=0;i<N;i+=2){var t3=i/N,r3=2+5.2*Math.sin(Math.min(1,(1-t3)*1.25)*1.45);pxBall(g,pts[i][0]-1,pts[i][1]+r3*.55,r3*.55,r3*.4,go,{ly:-.5})}
for(i=2;i<N;i+=3){pxS(g,pts[i][0]-2,pts[i][1]-1,J[3]);pxS(g,pts[i][0]+1,pts[i][1]+1,J[3])}
pxPoly(g,[[20,56],[10,52],[4,56],[8,60],[16,62]],sh,[.4,.9]);pxPoly(g,[[16,56],[9,55],[6,57],[11,59]],go,[.4,.9]);
pxLine(g,40,29,32,40,5,J);pxLine(g,32,40,30,45,4,J);[[27,46],[31,47],[35,46]].forEach(function(c){pxTri(g,c[0],43,5,1.4,PXR.bone)});
pxBall(g,24,41,3.6,3.6,['#ffffff','#e8ffff','#a8e8ff','#60b0e8','#3878b8']);
pxLine(g,64,45,60,54,5,J);pxLine(g,60,54,58,58,4,J);[[55,59],[59,60],[63,59]].forEach(function(c){pxTri(g,c[0],56,5,1.4,PXR.bone)});
pxPoly(g,[[36,17],[48,6],[44,18]],sh,[.4,.9]);pxPoly(g,[[38,21],[52,12],[46,24]],sh,[.4,.9]);pxPoly(g,[[38,26],[52,24],[44,32]],sh,[.4,.9]);
pxLine(g,31,15,36,4,2,PXR.bone);pxLine(g,34,10,40,8,1,PXR.bone);pxLine(g,36,5,41,3,1,PXR.bone);
pxLine(g,24,13,26,3,2,PXR.bone);pxLine(g,26,7,31,5,1,PXR.bone);
pxBall(g,24,21,9,7.5,J);
pxPoly(g,[[3,18],[10,14],[20,15],[20,25],[8,25],[2,22]],J,[.4,.9]);
if(v==='a'){pxPoly(g,[[4,24],[20,24],[18,31],[6,32]],['#401020','#401020','#401020','#401020','#401020'],[.3,.9]);pxPoly(g,[[7,28],[17,28],[15,31]],JP.pink,[.3,.9])}
else{pxPoly(g,[[3,23],[20,24],[16,28],[6,27]],J,[.3,.9]);pxBox(g,4,24,12,1,['#401020','#401020','#401020','#401020','#401020'],0)}
for(i=0;i<5;i++)pxTri(g,5+i*3,v==='a'?24:23,3,1,PXR.bone);
pxS(g,5,19,J[4]);pxS(g,7,19,J[4]);
pxBox(g,18,17,5,3,['#fff0a0','#ffe060','#ffe060','#ff9020','#ff9020'],0);pxS(g,20,18,'#201010');pxPoly(g,[[16,15],[25,15],[25,17],[16,17]],sh,[.4,.9]);
pxLine(g,4,21,0,30,1,go);pxLine(g,0,30,3,38,1,go);pxLine(g,6,26,2,36,1,go);pxLine(g,2,36,6,44,1,go);
pxLine(g,12,14,6,6,1,go);
})}
function drawDragon(c,x,y,sc){var t=(typeof T==='number'?T:0),br=(typeof eatk==='number'&&eatk>0),bob=Math.round(Math.sin(t/14)*2),sp=pxRyu(br?'a':'i');
R(c,x+8*sc,y+62*sc,76*sc,2*sc,'rgba(0,0,0,.4)');
pxBlit(c,sp,x,y+bob*sc,sc,false);
if(br){var f=Math.round(Math.sin(t/2)*3),ox=x,oy=y+bob*sc;c.save();c.translate(ox,oy);c.scale(sc,sc);
fillPoly(c,[[8,28],[-26,18+f],[-34,28],[-26,40-f],[8,32]],'#ff5a10');fillPoly(c,[[8,29],[-20,21+f],[-26,28],[-20,37-f],[8,31]],'#ffb030');fillPoly(c,[[8,30],[-10,25],[-14,28],[-10,33],[8,31]],'#fff0a0');c.restore()}}

function drawHero(c,x,y,sc,st){
if(!st||typeof st!=='object')st={pose:st?'attack':'idle',t:Date.now()/16,p:.5,glow:!!st};
var pose=st.pose||'idle',t=st.t||0,p=st.p||0,S=Math.sin,C=Math.cos,swt=st.sw||0,el=st.el?PXEL[st.el]:null;
var bc=el?el[1]:['#f4f8ff','#cfe6ff','#ffe0a0','#eadcff'][swt],gcl=el?el[0]:['#a0e0ff','#80c0ff','#ff9a30','#c060ff'][swt];
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
for(var j=0;j<capeL;j++){var x0=13+L-3-Math.round(j*(run?.6:pose==='attack'?.4:.15))-Math.round(S(t/9+j/5)*(1+j/9))-sw,w=6+Math.round(j*.12),yy=19+uy+j,hem=j>capeL-3;
R(c,x0-1,yy,w+2,1,PXO);R(c,x0,yy,w,1,hem?'#f4f6ff':(j%7<3?'#2c3c9c':'#222e84'));R(c,x0,yy,2,1,hem?'#ffffff':'#5a70e8');R(c,x0+w-2,yy,2,1,hem?'#a8b0d0':'#161e5c');if(j===7)R(c,x0+2,yy,3,2,'#f4f6ff')}
var hx0=16+L,hy0=6+uy+hdy,pw=Math.round(S(t/7)*1.5)+(run?4:pose==='attack'?3:pose==='hurt'?-2:0);
pxLimb(c,hx0+1,hy0+2,hx0-5-pw,hy0+4,3,'#e03020','#ff6848','#a01818');pxLimb(c,hx0-5-pw,hy0+4,hx0-10-pw*1.4,hy0+9,2,'#e03020','#ff6848','#a01818');
if(kneel){pxLimb(c,hipx,hipy,12,gy-3,5,'#34429e','#6a80f0','#1c2878');pxBlit(c,pxBoot(),6,gy-6,1,false);
pxLimb(c,hipx+1,hipy-1,hipx+9,hipy-6,5,'#4658c8','#7a90ff','#243488');pxLimb(c,hipx+9,hipy-6,hipx+10,gy-5,5,'#4658c8','#7a90ff','#243488');pxBlit(c,pxBoot(),hipx+6,gy-6,1,false)}
else{var b1=bx,b2=fx,l1=0,l2=0;if(run){var s=S(t/3);b1=14-s*6;b2=24+s*6;l1=Math.max(0,-s)*4;l2=Math.max(0,s)*4}
if(pose==='cheer'||pose==='win'){l1=hop*.7;l2=hop*.7}
pxLimb(c,hipx-1,hipy,b1+3,gy-7-l1,5,'#34429e','#6a80f0','#1c2878');pxBlit(c,pxBoot(),Math.round(b1-1),Math.round(gy-7-l1),1,false);
pxLimb(c,hipx+2,hipy,b2+2,gy-7-l2,5,'#4658c8','#7a90ff','#243488');pxBlit(c,pxBoot(),Math.round(b2-2),Math.round(gy-7-l2),1,false)}
pxBlit(c,pxTorso(),14+L,17+uy,1,false);
if(st.amu){R(c,25+L,20+uy,1,2,'#f8d838');P(c,24+L,22+uy,3,3,st.amu===2?'#707890':'#40e0ff');if(st.amu===1)R(c,25+L,23+uy,1,1,'#fff')}
pxBlit(c,pxHead(hv),hx0-2,hy0-7,1,false);
if(pose==='tired'||pose==='weak'){R(c,hx0+11,hy0+4+((t>>1)%10),1,2,'#9ad8ff')}
if(st.shield){var bx0=19+L+(st.block?6:0),by0=24+uy;pxBlit(c,pxShield(st.shield===2?2:1),bx0,by0,1,false);if(st.block){c.globalAlpha=.7;disc(c,bx0+11,by0+5,4,'#fff');c.globalAlpha=1}}
var sx=23+L,sy=22+uy,ex,ey;
if(hand){ex=hand[0];ey=hand[1]}else{ex=sx+C(phi*DEG)*9;ey=sy+S(phi*DEG)*9}
pxLimb(c,sx,sy,(sx+ex)/2+1,(sy+ey)/2,4,'#e4e9fb','#ffffff','#a8b0d0');pxLimb(c,(sx+ex)/2+1,(sy+ey)/2,ex,ey,4,'#c8d0ee','#f4f6ff','#8a94c0');R(c,Math.round(ex)-1,Math.round(ey)-1,4,4,'#f0b088');
var tx=ex+C(th*DEG)*20,ty=ey+S(th*DEG)*20;
if(glow){c.globalAlpha=.3+.15*S(t/6);for(var i=2;i<=20;i+=4)disc(c,Math.round(ex+C(th*DEG)*i),Math.round(ey+S(th*DEG)*i),3,gcl);c.globalAlpha=1}
limb(c,ex-C(th*DEG)*5,ey-S(th*DEG)*5,ex,ey,2,'#26307c',true);
limb(c,ex,ey,tx,ty,2,bc,true);limb(c,ex+1,ey,tx+1,ty,1,'#fff');
if(swt===3||el)for(var i2=3;i2<=18;i2+=4)R(c,Math.round(ex+C(th*DEG)*i2),Math.round(ey+S(th*DEG)*i2),1,1,el?el[0]:'#8a3ad0');
disc(c,Math.round(ex+C(th*DEG)*1),Math.round(ey+S(th*DEG)*1),2,swt===3?'#c8a8ff':'#f0c030');
if(pose==='attack'&&p>.4&&p<.9){var a0=-135,a1=th;for(var a=a0;a<=a1;a+=7){var kk=(a-a0)/(a1-a0||1);c.globalAlpha=.15+.6*kk;R(c,Math.round(sx+C(a*DEG)*28),Math.round(sy+S(a*DEG)*28),3,3,el?el[1]:swt===3?'#d8a0ff':swt===2?'#ffd060':'#fff')}c.globalAlpha=1}
if(st.special)for(var q=0;q<7;q++){var aa=t/10+q*.9;R(c,Math.round(22+C(aa)*(18+q%3*3)),Math.round(26+S(aa*1.3)*22),2,2,q%2?'#fff':gcl)}
if(pose==='cheer'||pose==='win')for(var i3=0;i3<6;i3++)R(c,Math.round(20+C(t/20+i3*1.05)*22),Math.round(16+S(t/17+i3)*14),2,2,i3%2?'#fff':'#ffe060');
if(run)for(var i4=0;i4<3;i4++)R(c,Math.round(8-((t+i4*5)%14)),gy-2-i4,2,1,'#c8b890');
c.restore()}
function home(){mode='home';hud();play('home');
set(box(`<h2>Bienvenue, paladin</h2>Un oni rôde sur la route du savoir, et un dragon ancestral dort quelque part. Réponds juste pour les vaincre et gagner de l'or.<div class='dim'>Meilleur score : ${S.best}</div>`),
btn(`⚔ Commencer l'aventure`,title,'menu'))}
ENM.slime.name='Un slime azuré';ENM.wolf.name='Un okami spectral';ENM.drake.name='Un tengu corbeau';ENM.behemoth.name='Un oni cramoisi';ENM.dragon.name='Le Dragon ancestral';
