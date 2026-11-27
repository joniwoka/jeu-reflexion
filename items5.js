/* v1.25.0 : introduction animee de 10 secondes avant la quete */
(function(){var st=document.createElement('style');st.textContent=".pbar{height:6px;background:#10142a;border-radius:3px;margin-top:8px;overflow:hidden}.pbar i{display:block;height:100%;width:0;background:#4f8cff}";document.head.appendChild(st)})();
var IN=null,introNext=false,IEN=[{k:'slime',x:140,sc:1.5},{k:'wolf',x:190,sc:1.5},{k:'drake',x:255,sc:1.3}];
var ICAP={paladin:['🌄 Au royaume du Savoir, trois monstres de l’ignorance barrent la route…','⚔ Le paladin les affronte tous à la fois !','✨ Chaque bonne réponse affûte ton épée… et charge un sort élémentaire.','<b class="gold">Réponds juste, paladin : le savoir est ta plus belle arme !</b>'],
mage:['🌄 Au royaume du Savoir, trois monstres de l’ignorance barrent la route…','🔮 La mage tient tête aux trois créatures !','✨ Chaque bonne réponse nourrit ton sceptre… et charge un sort élémentaire.','<b class="gold">Réponds juste, mage : le savoir est ta plus belle magie !</b>']};
function iEase(v){v=Math.max(0,Math.min(1,v));return v*v*(3-2*v)}
function playIntro(cb){mode='intro';spT=0;spEl=null;atk=0;eatk=0;hflash=0;eflash=0;edead=false;shk=0;fl=[];bossFl=0;walk=0;
IN={t0:Date.now(),cb:cb,ph:-1,hit:-1,eh:[-1,-1,-1],sp:false,shk:0,el:['fire','ice','earth','bolt'][Math.floor(Math.random()*4)]};
hud('Introduction');play('quiz');
set(box('<div id="introCap" style="min-height:52px"></div><div class="pbar"><i id="introBar"></i></div>'),btn('Suivant ▶',introEnd,'cta'))}
function introEnd(){if(!IN)return;var cb=IN.cb;IN=null;mode='title';if(cb)cb()}
function introFrame(){if(!IN)return;var t=(Date.now()-IN.t0)/1000,i,e,E,el=PXEL[IN.el],mg=S.hero==='mage',hurt=false,hitIdx=-1,hp=0,lun=[0,0,0],k,q,n,off;
if(t>=2.4&&t<6){k=Math.floor((t-2.4)/.8);hp=((t-2.4)%.8)/.8;hitIdx=k%3;if(hp>.45&&IN.hit!==k){IN.hit=k;sfx('ok')}}
for(i=0;i<3;i++){off=2.7+i*.9;if(t>=off&&t<6){q=((t-off)%2.7)/.5;if(q<1){lun[i]=Math.round(Math.sin(q*Math.PI)*26);if(q>.4&&q<.7)hurt=true;n=Math.floor((t-off)/2.7);if(q>.45&&IN.eh[i]!==n){IN.eh[i]=n;sfx('block');IN.shk=8}}}}
cx.save();if(IN.shk>0){cx.translate(Math.round(Math.random()*4-2),Math.round(Math.random()*3-1));IN.shk--}
cx.drawImage(BG.night,0,0);if(t>7.4){cx.globalAlpha=Math.min(1,(t-7.4)/1.2);cx.drawImage(BG.morning,0,0);cx.globalAlpha=1}
var en=iEase(t/1.6),dead=t>=7.7,fade=dead?Math.max(0,1-(t-7.7)/.6):1;
if(fade>0)for(i=0;i<3;i++){e=IEN[i];E=ENM[e.k];var ex=Math.round(e.x+(1-en)*(230+i*30)-lun[i]),ey=Math.round(134-E.h*e.sc+Math.sin(t*5+i)*1.2-(dead?(t-7.7)*30:0)),hit=hitIdx===i&&hp>.45&&hp<.8;
cx.globalAlpha=fade*(hit&&T%4<2?.4:1);E.f(cx,ex,ey,e.sc);cx.globalAlpha=1;
if(hitIdx===i&&hp>.45&&hp<.7)for(k=0;k<5;k++)R(cx,ex+8+k*6,ey+8+k*6,4,4,'#fff')}
var hs=heroState(),hx=Math.round(-60+100*iEase(t/1.5));hs.t=T;hs.flip=false;
if(t<1.5)hs.pose='walk';else if(t<2.4)hs.pose='ready';
else if(t<6){hs.pose='attack';hs.p=hp;hx+=Math.round(Math.sin(hp*Math.PI)*45)}
else if(t<7.4){hs.pose='ready';hs.special=1;hs.el=IN.el}
else if(t<8){hs.pose='attack';hs.p=(t-7.4)/.6;hs.special=1;hs.el=IN.el;hx+=Math.round(Math.sin(hs.p*Math.PI)*70)}
else hs.pose='win';
cx.globalAlpha=hurt&&T%4<2?.4:1;drawHero(cx,hx,42,2,hs);cx.globalAlpha=1;
if(t>=6&&t<7.4){var cr=40*(1-(t-6)/1.4)+8;for(k=0;k<8;k++)R(cx,Math.round(hx+44+Math.cos(t*4+k*.8)*cr),Math.round(98+Math.sin(t*4+k*.8)*cr),3,3,k%2?'#fff':el[0])}
if(t>=7.6&&!IN.sp){IN.sp=true;sfxx('special')}
if(t>=7.7&&t<8.6){k=(t-7.7)/.9;cx.globalAlpha=Math.max(0,.7*(1-k));cx.fillStyle=el[0];cx.fillRect(0,0,W,H);cx.globalAlpha=Math.max(0,.6*(1-k));for(i=0;i<3;i++){e=IEN[i];disc(cx,e.x+30,100,Math.round(10+k*55),el[1])}cx.globalAlpha=1}
if(t>=8.2){cx.globalAlpha=Math.min(1,(t-8.2)/.8);cx.font='bold 18px sans-serif';cx.textAlign='center';cx.fillStyle='#000';cx.fillText('✦ QUÊTE DU SAVOIR ✦',161,41);cx.fillStyle='#ffd24a';cx.fillText('✦ QUÊTE DU SAVOIR ✦',160,40);cx.textAlign='left';cx.globalAlpha=1}
cx.restore();
var ph=t<2.4?0:t<6?1:t<8?2:3;
if(ph!==IN.ph){IN.ph=ph;var c=document.getElementById('introCap');if(c)c.innerHTML=ICAP[mg?'mage':'paladin'][ph];if(ph===2)sfx('charge')}
var b=document.getElementById('introBar');if(b)b.style.width=Math.min(100,t*10)+'%'}
var opb7=pickBank;pickBank=function(k){introNext=true;opb7(k);introNext=false};
var sq7=startQuiz;
startQuiz=function(){if(introNext){introNext=false;playIntro(function(){sq7()});return}sq7()};
QP('scene',[["function scene(){T++;","function scene(){T++;if(mode==='intro'&&IN){introFrame();requestAnimationFrame(scene);return}"]]);
