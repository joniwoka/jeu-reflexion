function mkc(w,h){const b=document.createElement('canvas');b.width=w;b.height=h;return b}
function pixText(txt,px,fill,line){const m=mkc(4,4).getContext('2d');m.font='bold '+px+'px sans-serif';const w=Math.ceil(m.measureText(txt).width)+6,b=mkc(w,px+8),c=b.getContext('2d');c.font='bold '+px+'px sans-serif';c.textBaseline='top';c.fillStyle=line;
for(let dx=-1;dx<=1;dx++)for(let dy=-1;dy<=1;dy++)if(dx||dy)c.fillText(txt,3+dx,3+dy);c.fillStyle=fill;c.fillText(txt,3,3);return b}
function drawPix(c,img,mx,y,s,a){c.save();c.imageSmoothingEnabled=false;c.globalAlpha=a==null?1:a;c.drawImage(img,Math.round(mx-img.width*s/2),y,img.width*s,img.height*s);c.restore()}
let BGH=null,BGO=null,TXH=null,TXO=null;
function buildHome(){const b=mkc(W,H),c=b.getContext('2d');
grad(c,W,126,['#1a1450','#34226c','#6a3a8c','#b8508a','#ee8a74','#ffb86c','#ffe2a2']);
c.globalAlpha=.3;disc(c,236,104,54,'#ffd890');c.globalAlpha=.5;disc(c,236,104,42,'#ffd890');c.globalAlpha=1;
disc(c,236,104,31,'#ffe6a8');disc(c,236,104,23,'#fff6d0');
c.globalAlpha=.07;c.fillStyle='#fff0c0';for(let k=0;k<7;k++){const a1=(-175+k*24)*Math.PI/180,a2=a1+.17;c.beginPath();c.moveTo(236,104);c.lineTo(236+Math.cos(a1)*320,104+Math.sin(a1)*320);c.lineTo(236+Math.cos(a2)*320,104+Math.sin(a2)*320);c.fill()}c.globalAlpha=1;
ridge(c,100,42,.02,.05,3,['#d0609a','#9a4088','#6a2a70'],0);
castle(c,176,66);c.globalAlpha=.4;R(c,120,20,150,100,'#c8508a');c.globalAlpha=1;
ridge(c,118,32,.04,.09,6,['#7a4088','#58306a','#442458'],0);
c.globalAlpha=.3;R(c,0,112,W,22,'#f0a080');c.globalAlpha=1;
for(let x=0;x<150;x++){const y=134+(x>128?Math.round((x-128)*1.3):0);R(c,x,y,1,H-y,'#241638');R(c,x,y,1,2,'#4a7a3a');R(c,x,y+2,1,2,'#3a5a2c')}
for(let i=0;i<16;i++)R(c,Math.floor(rnd(i+5)*140),140+Math.floor(rnd(i+40)*38),3+Math.floor(rnd(i+9)*8),1,'#120a20');
for(let i=0;i<9;i++)R(c,6+i*14,132,1,2,i%2?'#f8e060':'#f080c0');
for(let x=150;x<W;x++)R(c,x,148+((x*7)%3),1,H,'#1a1028');
for(let x=152;x<W;x+=13){const h=26+Math.floor(rnd(x)*14);tri(c,x+5,148-h,h,7,'#1c1034','#140a28');R(c,x+4,148,2,4,'#0c0618')}
return b}
function buildOver(){const b=mkc(W,H),c=b.getContext('2d');
grad(c,W,134,['#04040c','#0a0a1e','#12122c','#1e1e40','#2a2a56']);
disc(c,40,88,17,'#222244');disc(c,40,88,13,'#8a90b0');disc(c,36,85,4,'#6a708e');disc(c,45,92,3,'#6a708e');
ridge(c,106,34,.03,.06,2,['#2a2a4c','#1c1c38','#121226'],0);
[[236,112,7,24],[250,102,6,34],[266,116,6,20],[280,108,5,28]].forEach(q=>{R(c,q[0],q[1],q[2],q[3]+22,'#1a1a30');R(c,q[0],q[1],2,q[3]+22,'#262642');R(c,q[0]+q[2]-1,q[1]-2,1,3,'#1a1a30')});
grad(c,W,H-134,['#1a2016','#10140e','#080a06'],134);R(c,0,134,W,2,'#2a3a24');
[[130,150,22],[200,160,30],[60,166,26],[270,156,24]].forEach(q=>{R(c,q[0],q[1],q[2],2,'#3a4a78');R(c,q[0]+3,q[1]+2,q[2]-6,1,'#2a3a60')});
P(c,10,118,12,16,'#4a4a62');R(c,12,116,8,2,'#4a4a62');R(c,14,121,4,1,'#2a2a40');R(c,14,124,4,1,'#2a2a40');
limb(c,304,136,300,98,5,'#0e0a14',false);limb(c,300,112,282,96,3,'#0e0a14',false);limb(c,301,102,314,86,3,'#0e0a14',false);limb(c,291,104,286,90,2,'#0e0a14',false);limb(c,282,96,274,92,2,'#0e0a14',false);
return b}
function drawHomeScene(c,T){BGH=BGH||buildHome();c.drawImage(BGH,0,0);
c.globalAlpha=.1+.06*Math.sin(T/30);disc(c,236,104,64,'#ffe0a0');c.globalAlpha=1;
[[10,20,3,.10],[120,44,2,.16],[250,12,3,.08],[60,70,2,.2]].forEach(a=>cloud(c,Math.floor((a[0]+T*a[3])%(W+90))-45,a[1],a[2],'rgba(255,190,180,.5)'));
for(let i=0;i<4;i++){const x=Math.floor((i*90+T*.7)%(W+40))-20,y=50+i*9+Math.round(Math.sin(T/10+i)*3),f=((T>>3)+i)%2;c.fillStyle='#201030';c.fillRect(x,y,3,1);c.fillRect(x+3,y-(f?1:0),3,1);c.fillRect(x+6,y,3,1)}
for(let i=0;i<28;i++){const x=Math.floor(rnd(i)*W),y=H-((T*.35+rnd(i+7)*H)%H);if(((T>>3)+i)%4)R(c,x,Math.floor(y),1,1,'#ffe0a0')}
drawHero(c,64,42,2,{pose:'idle',t:T,glow:true});
TXH=TXH||{t:pixText('QUÊTE DU SAVOIR',14,'#ffd830','#4a1800'),s:pixText('Culture générale vidéoludique',8,'#ffffff','#201040')};
drawPix(c,TXH.t,W/2,8,2,Math.min(1,T/40));drawPix(c,TXH.s,W/2,56,2,Math.min(1,Math.max(0,(T-30)/40)))}
function drawOverScene(c,T,g){BGO=BGO||buildOver();c.drawImage(BGO,0,0);
c.globalAlpha=.25;drawBehemoth(c,172,40,2,true);c.globalAlpha=1;
c.globalAlpha=.5+.4*Math.sin(T/20);R(c,192,72,6,6,'#ff2020');c.globalAlpha=1;
c.globalAlpha=.22;R(c,0,122,W,16,'#6a7a9a');c.globalAlpha=1;
[[10,8,3,.07],[140,22,3,.1],[240,6,2,.13]].forEach(a=>cloud(c,Math.floor((a[0]+T*a[3])%(W+90))-45,a[1],a[2],'rgba(8,8,20,.8)'));
drawHero(c,100,42,2,{pose:'dead',t:T});
for(let i=0;i<70;i++){const x=(rnd(i)*W*1.3+T*2.2)%(W+40)-20,y=(rnd(i+90)*H+T*7)%H;R(c,Math.floor(x),Math.floor(y),1,5,'rgba(150,170,220,.55)');R(c,Math.floor(x)-1,Math.floor(y)+5,1,2,'rgba(150,170,220,.3)')}
const ph=(T+60)%320;if(ph<8){c.fillStyle='rgba(210,220,255,'+(ph<3?.3:.12)+')';c.fillRect(0,0,W,H);if(ph<5){[[210,0,200,28],[200,28,212,30],[212,30,196,62],[196,62,206,64],[206,64,190,100]].forEach(s=>limb(c,s[0],s[1],s[2],s[3],2,'#ffffff',false))}}
TXO=TXO||{t:pixText('GAME OVER',22,'#ff4040','#200000'),s:pixText('Le savoir t\'a échappé…',8,'#c8d0ff','#080818')};
drawPix(c,TXO.t,W/2,4,2,Math.min(1,g/50));drawPix(c,TXO.s,W/2,62,2,Math.min(1,Math.max(0,(g-40)/40)))}
