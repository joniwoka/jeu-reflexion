const _dh0=drawHero;
drawHero=function(c,x,y,sc,st){
if(st&&st.special){c.save();c.translate(x,y);c.scale(sc,sc);c.globalAlpha=.22+.1*Math.sin((st.t||0)/2);disc(c,22,28,26,'#ffe060');c.globalAlpha=.18;disc(c,22,28,17,'#fff');c.globalAlpha=1;c.restore()}
_dh0(c,x,y,sc,st);
if(st&&st.chg>=4){c.save();c.translate(x,y);c.scale(sc,sc);const t=st.t||0;
for(let i=0;i<7;i++){const a=t/10+i*.9;R(c,Math.round(22+Math.cos(a)*(18+i%3*3)),Math.round(26+Math.sin(a*1.3)*22),2,2,i%2?'#fff':'#ffe060')}
if(st.special&&st.pose==='attack'&&st.p>.3&&st.p<.9)for(let a=-130;a<=40;a+=6){const k=(a+130)/170;c.globalAlpha=.3+.6*k;R(c,Math.round(26+Math.cos(a*Math.PI/180)*36),Math.round(22+Math.sin(a*Math.PI/180)*36),4,4,'#fff6b0')}
c.restore()}};
const $=s=>document.querySelector(s);
const SAVE_KEY='qsv_save_v1';
let S=Object.assign({gold:0,unlocked:[],items:[],best:0,music:true},JSON.parse(localStorage.getItem(SAVE_KEY)||'{}'));
S.items=S.items||[];
const save=()=>localStorage.setItem(SAVE_KEY,JSON.stringify(S));
const hasI=id=>S.items.includes(id),swTier=()=>hasI('sw3')?3:hasI('sw2')?2:hasI('sw1')?1:0,shTier=()=>hasI('sh2')?2:hasI('sh1')?1:0,shP=()=>[0,.2,.3][shTier()];
const EHP={slime:1,wolf:2,drake:3,behemoth:3};
const ITEMS=[
{id:'sw1',t:`Épée d'acier`,cost:120,d:`Attaque supérieure contre les boss : le dragon tombe en 4 bonnes réponses au lieu de 5.`},
{id:'sw2',t:'Lame du dragon',cost:0,d:`Butin du Dragon ancestral. Le dragon tombe en 3 bonnes réponses.`},
{id:'sw3',t:'Épée runique',cost:350,d:`Lame enchantée : le dragon tombe en 2 bonnes réponses et chaque bonne réponse rapporte +3 or.`},
{id:'sh1',t:'Bouclier de chêne',cost:150,d:`Pare un coup sur 5 en moyenne (20 %) : une mauvaise réponse ne coûte alors aucun cœur.`},
{id:'sh2',t:'Bouclier de fer',cost:320,d:`Plus résistant : pare un coup sur 3 environ (30 %). Remplace le bouclier de chêne.`},
{id:'am1',t:'Collier de fuite',cost:220,d:`Permet de fuir un combat (une question) une fois par partie : aucune récompense, aucun cœur perdu.`}];
const BON=[
{id:'b1',t:'Korobeiniki',trk:'bn1',cost:40,d:`Chanson folklorique russe (domaine public), rendue célèbre par Tetris. Arrangement original du jeu.`},
{id:'b2',t:'Ode à la joie',trk:'bn2',cost:40,d:`Thème de Beethoven (domaine public), arrangé en style orchestral.`},
{id:'b3',t:'Au clair de la lune',trk:'bn3',cost:40,d:`Berceuse traditionnelle française (domaine public), version flûte et harpe.`},
{id:'b4',t:'Pour Élise',trk:'bn4',cost:50,d:`Pièce de Beethoven (domaine public), arrangée avec cordes et harpe.`},
{id:'b5',t:`Plaine de l'aventure`,trk:'bn5',cost:70,d:`Composition originale, dans l'esprit des grandes plaines de RPG.`},
{id:'b6',t:'Opéra de minuit',trk:'bn6',cost:80,d:`Composition originale, valse dramatique inspirée des scènes d'opéra de RPG.`},
{id:'b7',t:'Cité des brumes',trk:'bn7',cost:80,d:`Composition originale, thème mystérieux de ville industrielle.`},
{id:'b8',t:'Dernier donjon',trk:'bn8',cost:90,d:`Composition originale, combat final avec cuivres et percussions.`}];
const GAL=[
{id:'g1',t:`L'épée dans le roc`,k:'sword',cost:60},
{id:'g2',t:'Château céleste',k:'castle',cost:70},
{id:'g3',t:'Dragon pourpre',k:'dragon',cost:70},
{id:'g4',t:'Vaisseau volant',k:'airship',cost:80},
{id:'g5',t:'Grotte de cristal',k:'crystal',cost:80},
{id:'g6',t:'Village sous la lune',k:'village',cost:90}];
const BG={night:buildBG('night'),day:buildBG('day')};
const cv=$('#cv'),cx=cv.getContext('2d');
let T=0,goT=0,mode='home',kind='slime',edead=false,edie=0,edmax=30,atk=0,eatk=0,hflash=0,eflash=0,shk=0,walk=0,blkT=0,fleeT=0,spT=0,bossFl=0,fl=[],ehp=1,playing=null,run=null;
const CL=[{x:20,y:14,s:3,v:.12},{x:150,y:30,s:2,v:.18},{x:260,y:8,s:3,v:.09},{x:90,y:50,s:2,v:.22}];
function lunge(a){return Math.round(Math.sin((1-a/22)*Math.PI)*120)}
function sfxx(k){if(!S.music)return;if(k!=='heal'&&k!=='flee'){sfx(k);return}ensure();const t=AC.currentTime;
if(k==='heal')[72,76,79,84,88].forEach((n,i)=>INST.harp(n,t+i*.06));
else{[84,79,74,69,64].forEach((n,i)=>INST.harp(n,t+i*.05));noise(t,1200,'bandpass',.18,.35)}}
function heroState0(){const hp=run?run.hp:4;
if(mode==='win')return{pose:'win',t:T};if(mode==='over')return{pose:'dead',t:T};
if(mode==='quiz'){if(spT>40)return{pose:'ready',t:T,special:1,chg:4};if(spT>0)return{pose:'attack',p:1-spT/40,t:T,special:1,chg:4};if(fleeT>0)return{pose:'walk',t:T,flip:true};if(atk>0)return{pose:'attack',p:1-atk/22,t:T};if(blkT>0)return{pose:'ready',t:T,block:true};if(hflash>0)return{pose:'hurt',t:T};if(walk>0)return{pose:'walk',t:T};if(edead)return{pose:'cheer',t:T};if(hp<=1)return{pose:'weak',t:T};if(hp===2)return{pose:'tired',t:T};return{pose:'ready',t:T}}
return{pose:'idle',t:T,glow:true}}
function heroState(){const o=heroState0();o.shield=shTier();o.sw=swTier();o.amu=hasI('am1')?(run&&run.fled?2:1):0;if(run&&run.charge>=4)o.chg=4;return o}
function scene(){T++;
if(mode==='home'||mode==='gameover'){cx.save();if(mode==='home')drawHomeScene(cx,T);else{goT++;drawOverScene(cx,T,goT)}cx.restore();requestAnimationFrame(scene);return}
const th=(mode==='shop'||mode==='gal')?'day':'night';
cx.save();if(shk>0){cx.translate(Math.round(Math.random()*6-3),Math.round(Math.random()*4-2));shk--}
cx.drawImage(BG[th],0,0);
CL.forEach(c=>cloud(cx,Math.floor((c.x+T*c.v)%(W+90))-45,c.y,c.s,th==='night'?'#6c7cc8':'#ffffff'));
if(th==='night')for(let i=0;i<40;i++)if(((T>>4)+i)%6)R(cx,Math.floor(rnd(i)*W),Math.floor(rnd(i+9)*70),1,1,'#fff');
const bob=Math.sin(T/14)>0?1:0;
if(mode==='quiz'||mode==='over'||mode==='win'){
const hx=36-Math.round(walk*1.3)+(atk>0?lunge(atk):0)+(spT>0&&spT<=40?Math.round(Math.sin((1-spT/40)*Math.PI)*120):0)+(hflash>0?-4:0)-(fleeT>0?(45-fleeT)*5:0);
cx.globalAlpha=hflash>0&&T%4<2?.35:1;drawHero(cx,hx,42,2,heroState());cx.globalAlpha=1;
if(!edead||edie>0){const E=ENM[kind],D=kind==='dragon',ex=(D?132:312-E.w*2)+walk*2+(!D&&eatk>0?-lunge(eatk):0)+(eflash>0?Math.round(Math.random()*6-3):0),ey=134-E.h*2+(edead?-(edmax-edie):0)+(bob?0:1);
cx.globalAlpha=edead?edie/edmax:(eflash>0&&T%4<2?.4:1);E.f(cx,ex,ey,2);cx.globalAlpha=1;
if(D&&!edead){R(cx,86,2,148,10,'#0c0c24');R(cx,88,4,144,6,'#601010');R(cx,88,4,Math.max(0,Math.round(144*ehp)),6,'#e83030');cx.font='bold 9px sans-serif';cx.fillStyle='#ffd830';cx.fillText('DRAGON ANCESTRAL',90,19)}
else if(!edead){const mx=run&&run.en?run.en.max:1;R(cx,ex-1,ey-13,E.w*2+2,7,'#0c0c24');R(cx,ex,ey-12,E.w*2,5,'#601010');R(cx,ex,ey-12,Math.max(0,Math.round(E.w*2*ehp)),5,'#e83030');for(let k=1;k<mx;k++)R(cx,ex+Math.round(E.w*2*k/mx)-1,ey-12,2,5,'#0c0c24')}}
if(atk>0&&atk<14&&atk>6)for(let k=0;k<9;k++)R(cx,176+k*7,60+k*7,4,4,'#fff');
if(spT>0&&spT<=30&&spT>=12){cx.globalAlpha=.4;R(cx,96,90,224,30,'#ffd040');cx.globalAlpha=.9;R(cx,96,98,224,14,'#fff6b0');R(cx,96,102,224,6,'#fff');cx.globalAlpha=1}
if(spT===22)shk=14;
if(atk>0)atk--;if(eatk>0)eatk--;if(hflash>0)hflash--;if(eflash>0)eflash--;if(edie>0)edie--;if(walk>0)walk--;if(blkT>0)blkT--;if(fleeT>0)fleeT--;if(spT>0)spT--;
if(mode==='quiz'&&run){const c=run.charge||0,full=c>=4;for(let i=0;i<4;i++){R(cx,8+i*18,8,16,8,'#0c0c24');R(cx,9+i*18,9,14,6,i<c?(full?(T%10<5?'#fff060':'#ffb020'):'#40c0ff'):'#203060')}cx.font='bold 9px sans-serif';cx.fillStyle=full?'#ffe060':'#80c0ff';cx.fillText(full?'⚡ PRÊT !':'CHARGE',8,26)}
if(mode==='quiz'&&run&&run.hp===1){cx.fillStyle='rgba(200,0,0,'+(.07+.05*Math.sin(T/9)).toFixed(3)+')';cx.fillRect(0,0,W,H)}
if(bossFl>0){cx.fillStyle='rgba(255,40,0,'+(bossFl/80).toFixed(3)+')';cx.fillRect(0,0,W,H);bossFl--}
if(spT===21){cx.fillStyle='rgba(255,255,255,.85)';cx.fillRect(0,0,W,H)}
}else{drawHero(cx,126,42,2,heroState())}
fl=fl.filter(f=>f.life>0);fl.forEach(f=>{f.life--;f.y-=.6;cx.font='bold 20px sans-serif';cx.fillStyle='#000';cx.fillText(f.t,f.x+1,f.y+1);cx.fillStyle=f.c;cx.fillText(f.t,f.x,f.y)});
cx.restore();requestAnimationFrame(scene)}
const scr=$('#screen');
const esc=s=>String(s).replace(/[&<>]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;'}[c]));
function hud(extra){$('#hud').innerHTML=`<span class='gold'>★ ${S.gold} or ${shTier()?'🛡'+shTier():''}${swTier()?'⚔'+swTier():''}${hasI('am1')?(run&&run.fled?'📿✗':'📿'):''}</span><span>${extra||''}</span><span class='dim'>v${self.APP_VERSION}</span>`}
function btn(label,fn,cls){const b=document.createElement('button');b.className='win '+(cls||'');b.innerHTML=label;b.onclick=()=>{ensure();fn(b)};return b}
function box(html,cls){const d=document.createElement('div');d.className='win '+(cls||'');d.innerHTML=html;return d}
function set(...els){scr.innerHTML='';els.forEach(e=>scr.appendChild(e));window.scrollTo(0,0)}
function home(){mode='home';hud();play('home');
set(box(`<h2>Bienvenue, aventurier</h2>Le Béhémoth rôde sur la route du savoir, et un dragon ancestral dort quelque part. Réponds juste pour les vaincre et gagner de l'or.<div class='dim'>Meilleur score : ${S.best} · ${QUESTIONS.length} questions</div>`),
btn(`⚔ Commencer l'aventure`,title,'menu'))}
function title(){mode='title';hud();play('title');
set(box(`<h2>⚔ Quête du Savoir ⚔</h2>Réponds aux questions pour vaincre les monstres : gelée 1 réponse, loup 2, drake et Béhémoth 3. Enchaîne 4 bonnes réponses pour charger ton épée et lancer une attaque spéciale.<div class='dim'>Meilleur score : ${S.best} · ${QUESTIONS.length} questions</div>`),
btn('⚔ Nouvelle quête',startQuiz,'menu'),btn('🛡 Arsenal',()=>arsenal(),'menu'),btn('♪ Salle de musique',()=>music(),'menu'),btn('🖼 Galerie',()=>gallery(),'menu'),btn('⚙ Options',options,'menu'),btn('🏠 Accueil',home,'menu'))}
function startQuiz(){const order=QUESTIONS.map((_,i)=>i).sort(()=>Math.random()-.5).slice(0,40);const dmg=2+swTier();
run={order,i:0,reg:0,hp:4,ok:0,streak:0,charge:0,earned:0,boss:false,bossDone:false,bossAt:Math.random()<.6?10+Math.floor(Math.random()*4):-1,bossHP:10,bossDmg:dmg,bossNeed:Math.ceil(10/dmg),bossHits:0,blocks:0,potions:0,fled:false,specials:0,en:null};
mode='quiz';play('quiz');next()}
function hearts(){const h=Math.max(run.hp,0);return '♥'.repeat(h)+'♡'.repeat(4-h)}
function prog(){return run.boss?`${hearts()} · BOSS ${run.bossHits}/${run.bossNeed} · ⚡${run.charge}/4`:`${hearts()} · ${Math.min(run.reg+1,15)}/15 · ⚡${run.charge}/4`}
function spawn(){const r=run.reg,pick=a=>a[Math.floor(Math.random()*a.length)];
const k=r>=12?'behemoth':r<4?(Math.random()<.6?'slime':'wolf'):r<9?pick(['slime','wolf','wolf','drake']):pick(['wolf','drake','drake','behemoth']);
run.en={kind:k,hp:EHP[k],max:EHP[k]};walk=45}
function next(){if(run.hp<=0)return end();
if(!run.boss&&!run.bossDone&&run.bossAt>=0&&run.reg>=run.bossAt)return bossIntro();
if(!run.boss&&run.reg>=15&&(!run.en||run.en.hp<=0))return end();
ask()}
function bossIntro(){run.boss=true;run.bossHP=10;run.bossHits=0;kind='dragon';edead=false;edie=0;ehp=1;walk=45;bossFl=80;shk=24;play('boss');sfx('alert');hud(`${hearts()} · ⚠ BOSS`);
set(box(`<h2>⚠ SUPER BOSS ⚠</h2>Le <b>Dragon ancestral</b> surgit des cieux !<div class='dim'>Il tombe après ${run.bossNeed} bonnes réponses${swTier()?' (ton arme aiguise tes coups)':''}. Chaque bonne réponse rapporte <b class='gold'>3 fois plus d'or</b>. L'attaque spéciale lui retire la moitié de sa vie.</div>`),
btn('⚔ Affronter le dragon',ask,'menu'))}
function ask(){const q=QUESTIONS[run.order[run.i]];
if(run.boss){kind='dragon';ehp=Math.max(0,run.bossHP)/10;if(run.bossHits===0)walk=45}
else{if(!run.en||run.en.hp<=0)spawn();kind=run.en.kind;ehp=run.en.hp/run.en.max}
edead=false;edie=0;play(run.boss?'boss':'quiz');
const opts=q.a.map((t,i)=>({t,c:i===0})).sort(()=>Math.random()-.5);
hud(prog());
const info=box(`<div class='dim'>${run.boss?'⚠ '+ENM[kind].name+' — or ×3':ENM[kind].name+(run.en.max>1?` · encore ${run.en.hp} réponse${run.en.hp>1?'s':''} pour l'abattre`:' bloque la route !')}</div>${esc(q.q)}`);
let fb=null,sp=null;
const bs=opts.map((o,k)=>{const b=btn(`<b class='gold'>${'ABCD'[k]}</b>&nbsp; ${esc(o.t)}`,()=>answer(o,bs,info,q,fb,sp),'ans');b.dataset.c=o.c?'1':'';b.dataset.t=o.t;return b});
if(hasI('am1')&&!run.fled)fb=btn(`📿 Fuir ce combat <span class='dim'>(collier · 1 seule fois)</span>`,()=>flee(bs,info,fb,sp),'menu');
if(run.charge>=4)sp=btn(`⚡ <b>ATTAQUE SPÉCIALE</b> <span class='dim'>(${run.boss?'retire la moitié de la vie du dragon':"tue l'ennemi sans question"})</span>`,()=>special(bs,info,sp,fb),'sel');
set(info,...(sp?[sp]:[]),...bs,...(fb?[fb]:[]))}
function flee(bs,info,fb,sp){const wasBoss=run.boss;run.fled=true;bs.forEach(b=>b.disabled=true);fb.remove();if(sp)sp.remove();fleeT=45;sfxx('flee');if(!wasBoss)run.en=null;
info.innerHTML+=`<hr>📿 Le collier s'illumine : tu fuis le combat ! Aucune récompense, mais aucun cœur perdu.`;hud(prog());
scr.appendChild(btn('Suivant ▶',()=>{run.i++;if(!wasBoss)run.reg++;next()},'menu'))}
function bossKill(){run.boss=false;run.bossDone=true;let extra=`<br><b class='gold'>Le dragon s'effondre !</b>`;
if(!hasI('sw2')&&!hasI('sw3')){S.items.push('sw2');extra+=` Butin : <b>Lame du dragon</b> !`}else{S.gold+=60;run.earned+=60;extra+=` Trésor : +60 or.`}
if(!hasI('sh1')&&!hasI('sh2')&&Math.random()<.34){S.items.push('sh1');extra+=` Butin : <b>Bouclier de chêne</b> !`}
else if(!hasI('am1')&&Math.random()<.25){S.items.push('am1');extra+=` Butin : <b>Collier de fuite</b> !`}
return extra}
function killFx(boss){edmax=boss?60:30;edead=true;edie=edmax;eflash=boss?20:16;shk=boss?16:8;if(boss)fl.push({t:'DRAGON VAINCU !',x:70,y:60,c:'#ffd830',life:90})}
function special(bs,info,sp,fb){const wasBoss=run.boss;bs.forEach(b=>b.disabled=true);sp.remove();if(fb)fb.remove();run.charge=0;run.specials++;spT=70;sfxx('special');
const g=wasBoss?30:10;S.gold+=g;run.earned+=g;let extra='';
if(wasBoss){run.bossHP-=5;run.bossHits=Math.ceil((10-Math.max(run.bossHP,0))/run.bossDmg);ehp=Math.max(0,run.bossHP)/10;
if(run.bossHP<=0){extra=bossKill();setTimeout(()=>killFx(true),800)}else setTimeout(()=>{eflash=20;shk=14;fl.push({t:'-5 PV',x:200,y:70,c:'#ffe060',life:60})},800)}
else{run.en.hp=0;ehp=0;setTimeout(()=>killFx(false),800)}
fl.push({t:'ATTAQUE SPÉCIALE !',x:20,y:50,c:'#ffe060',life:80});
info.innerHTML+=`<hr><span class='gold'>⚡ ATTAQUE SPÉCIALE ! ${wasBoss?'Le dragon encaisse un coup colossal.':"L'ennemi est terrassé sans combat."} +${g} or</span>${extra}`;
save();hud(wasBoss&&!run.boss?`${hearts()} · BOSS vaincu`:prog());
scr.appendChild(btn('Suivant ▶',()=>{run.i++;if(!wasBoss)run.reg++;next()},'menu'))}
function answer(o,bs,info,q,fb,sp){const wasBoss=run.boss;bs.forEach(b=>{b.disabled=true;if(b.dataset.c)b.classList.add('ok')});if(fb)fb.remove();if(sp)sp.remove();
if(o.c){run.ok++;run.streak++;const prev=run.charge;run.charge=Math.min(4,run.charge+1);let g=10+Math.min(run.streak-1,5)*2;if(wasBoss)g*=3;if(swTier()===3)g+=3;atk=22;
let extra='',potion=false,kill=false;
if(!wasBoss){run.en.hp--;ehp=Math.max(0,run.en.hp)/run.en.max;kill=run.en.hp<=0;if(kill&&run.hp<4&&Math.random()<.35){potion=true;run.hp++;run.potions++;g=0;sfxx('heal')}}
if(!potion){S.gold+=g;run.earned+=g;sfx('ok');setTimeout(()=>sfx('coin'),450)}
if(wasBoss){run.bossHP-=run.bossDmg;run.bossHits++;ehp=Math.max(0,run.bossHP)/10;
if(run.bossHP<=0){extra=bossKill();setTimeout(()=>killFx(true),300)}
else setTimeout(()=>{eflash=16;shk=10;fl.push({t:'+'+g+' or',x:200,y:70,c:'#ffd830',life:50})},300)}
else if(kill)setTimeout(()=>{killFx(false);fl.push(potion?{t:'+1 ♥',x:50,y:60,c:'#60ff90',life:60}:{t:'+'+g+' or',x:200,y:70,c:'#ffd830',life:50})},300);
else{extra+=`<br><span class='dim'>Touché ! Encore ${run.en.hp} réponse${run.en.hp>1?'s':''} pour l'abattre.</span>`;setTimeout(()=>{eflash=12;shk=6;fl.push({t:'+'+g+' or',x:200,y:70,c:'#ffd830',life:50})},300)}
if(run.charge===4&&prev<4){extra+=`<br><b style='color:#ffe060'>⚡ Charge maximale ! Attaque spéciale prête.</b>`;setTimeout(()=>sfxx('charge'),700)}
const gain=potion?`<span style='color:#80ff9a'>🧪 L'ennemi laisse une potion : +1 ♥ (bue aussitôt, pas d'or)</span>`:`<span class='gold'>Bonne réponse ! +${g} or</span>${run.streak>1?' (série ×'+run.streak+')':''}`;
info.innerHTML+=`<hr>${gain}${extra}<br><span class='dim'>${esc(q.e)}</span>`}
else{const lost=run.charge>0;run.streak=0;run.charge=0;eatk=22;bs.forEach(b=>{if(b.dataset.t===o.t)b.classList.add('ko')});
const cl=lost?`<br><span class='dim'>La charge de l'épée retombe à zéro.</span>`:'';
if(shTier()&&Math.random()<shP()){run.blocks++;blkT=26;sfx('block');setTimeout(()=>{shk=4;fl.push({t:'PARÉ !',x:50,y:60,c:'#80d0ff',life:60})},300);
info.innerHTML+=`<hr><span style='color:#80d0ff'>🛡 Ton bouclier pare le coup : aucun cœur perdu !</span><br>Bonne réponse : <span class='gold'>${esc(q.a[0])}</span>${cl}<br><span class='dim'>${esc(q.e)}</span>`}
else{run.hp--;sfx('ko');setTimeout(()=>{hflash=24;shk=10;fl.push({t:'-1 ♥',x:50,y:60,c:'#ff6060',life:50});if(run.hp===1)fl.push({t:'DANGER',x:120,y:40,c:'#ff4040',life:70})},300);
info.innerHTML+=`<hr>Raté ! Bonne réponse : <span class='gold'>${esc(q.a[0])}</span>${cl}<br><span class='dim'>${esc(q.e)}</span>`}}
save();hud(wasBoss&&!run.boss?`${hearts()} · BOSS vaincu`:prog());
scr.appendChild(btn('Suivant ▶',()=>{run.i++;if(!wasBoss)run.reg++;next()},'menu'))}
function end(){const win=run.hp>0;S.best=Math.max(S.best,run.ok);save();hud();
const extra=(run.bossDone?`<br>🐉 Dragon ancestral vaincu !`:'')+(run.specials?`<br>⚡ Attaques spéciales : ${run.specials}`:'')+(run.blocks?`<br>🛡 Coups parés : ${run.blocks}`:'')+(run.potions?`<br>🧪 Potions bues : ${run.potions}`:'')+(run.fled?`<br>📿 Fuite utilisée`:'');
if(win){mode='win';edead=true;edie=0;play('victory');
set(box(`<h2>✦ Victoire ✦</h2>Score : ${run.ok} bonnes réponses${extra}<br>Or gagné : <span class='gold'>${run.earned}</span><br>Total : <span class='gold'>${S.gold}</span>`),
btn('↻ Rejouer',startQuiz,'menu'),btn('🛡 Arsenal',()=>arsenal(),'menu'),btn('♪ Salle de musique',()=>music(),'menu'),btn('◀ Menu principal',title,'menu'))}
else{mode='gameover';goT=0;play('gameover');
set(box(`<h2>✝ Game Over ✝</h2>Score : ${run.ok} bonnes réponses${extra}<br>Or gagné : <span class='gold'>${run.earned}</span><br>Total : <span class='gold'>${S.gold}</span><div class='dim'>Meilleur score : ${S.best}</div>`),
btn('↻ Réessayer',startQuiz,'menu'),btn('🛡 Arsenal',()=>arsenal(),'menu'),btn('◀ Menu principal',title,'menu'))}}
function arsenal(){mode='shop';hud();if(!playing)play('shop');const els=[box(`<h2>🛡 Arsenal</h2><div class='dim'>Les meilleures armes sont équipées automatiquement et visibles sur ton héros. L'épée n'agit que contre les boss.</div>`)];
ITEMS.forEach(it=>{const better=(it.id==='sw1'&&(hasI('sw2')||hasI('sw3')))||(it.id==='sw2'&&hasI('sw3'))||(it.id==='sh1'&&hasI('sh2'));
if(hasI(it.id))els.push(box(`<b>${esc(it.t)}</b> <span class='gold'>${better?'✔ possédé':'✔ équipé'}</span><div class='dim'>${esc(it.d)}</div>`));
else if(!it.cost)els.push(box(`🔒 <b>${esc(it.t)}</b><div class='dim'>${esc(it.d)}</div>`));
else els.push(btn(`🔒 <b>${esc(it.t)}</b> <span class='gold'>${it.cost} or</span><div class='dim'>${esc(it.d)}</div>`,()=>buyItem(it),'menu'))});
els.push(btn('◀ Menu principal',()=>{playing=null;title()},'menu'));set(...els)}
function buyItem(it){if(S.gold<it.cost){sfx('ko');alert('Il te manque '+(it.cost-S.gold)+' or.');return}S.gold-=it.cost;S.items.push(it.id);save();sfx('coin');arsenal()}
function music(){mode='shop';hud();if(!playing)play('shop');const els=[box(`<h2>♪ Salle de musique</h2><div class='dim'>Achète un morceau avec ton or, puis écoute-le ici. Les œuvres de Beethoven et la chanson traditionnelle sont du domaine public. Les autres sont des compositions originales.</div>`)];
BON.forEach(m=>{const own=S.unlocked.includes(m.id);
if(own){const on=playing===m.id;const d=box(`<b>${esc(m.t)}</b><div class='dim'>${esc(m.d)}</div>`);d.appendChild(btn(on?'■ Arrêter':'▶ Écouter',()=>{if(on){playing=null;play('shop')}else{playing=m.id;play(m.trk)}music()},on?'sel':'menu'));els.push(d)}
else els.push(btn(`🔒 <b>${esc(m.t)}</b> <span class='gold'>${m.cost} or</span>`,()=>buy(m,music),'menu'))});
els.push(btn('◀ Menu principal',()=>{playing=null;title()},'menu'));set(...els)}
function gallery(){mode='gal';hud();if(!playing)play('shop');const els=[box(`<h2>🖼 Galerie</h2><div class='dim'>Illustrations pixel art originales, dessinées pour ce jeu.</div>`)];
GAL.forEach(a=>{if(S.unlocked.includes(a.id)){const d=box(`<b>${esc(a.t)}</b><canvas class='art' id='${a.id}' width='160' height='90'></canvas>`);els.push(d)}
else els.push(btn(`🔒 <b>${esc(a.t)}</b> <span class='gold'>${a.cost} or</span>`,()=>buy(a,gallery),'menu'))});
els.push(btn('◀ Menu principal',()=>{playing=null;title()},'menu'));set(...els);GAL.forEach(a=>{const c=document.getElementById(a.id);if(c)artScene(c.getContext('2d'),a.k)})}
function buy(it,back){if(S.gold<it.cost){sfx('ko');alert('Il te manque '+(it.cost-S.gold)+' or.');return}S.gold-=it.cost;S.unlocked.push(it.id);save();sfx('coin');back()}
function options(){mode='title';hud();
set(box(`<h2>⚙ Options</h2>Version installée : ${self.APP_VERSION}`),
btn(`♪ Musique : ${S.music?'activée':'coupée'}`,()=>{S.music=!S.music;save();S.music?play('title'):stop();options()},'menu'),
btn('⟳ Vérifier les mises à jour',checkUpdate,'menu'),
btn('✖ Effacer la sauvegarde',()=>{if(confirm('Tout effacer ?')){localStorage.removeItem(SAVE_KEY);location.reload()}},'menu'),
btn('◀ Menu principal',title,'menu'))}
let REG;
async function checkUpdate(){const info=box('Recherche…');scr.insertBefore(info,scr.children[1]);
try{const t=await (await fetch('version.js?'+Date.now(),{cache:'no-store'})).text();const v=(t.match(/'([^']+)'/)||[])[1];
if(REG)await REG.update();
info.textContent=v&&v!==self.APP_VERSION?`Nouvelle version ${v} trouvée, installation…`:'Tu as la dernière version.'}
catch(e){info.textContent='Hors ligne ou erreur réseau.'}}
if('serviceWorker' in navigator){
navigator.serviceWorker.register('sw.js').then(r=>{REG=r;
r.addEventListener('updatefound',()=>{const w=r.installing;w&&w.addEventListener('statechange',()=>{
if(w.state==='installed'&&navigator.serviceWorker.controller){const d=box('Nouvelle version prête !');d.appendChild(btn('Recharger',()=>{w.postMessage('SKIP')},'menu'));scr.prepend(d)}})})});
let rl=false;navigator.serviceWorker.addEventListener('controllerchange',()=>{if(!rl){rl=true;location.reload()}})}
document.addEventListener('click',()=>{ensure();if(S.music&&!cur)play(mode==='home'?'home':mode==='gameover'?'gameover':mode==='quiz'?(run&&run.boss?'boss':'quiz'):mode==='shop'||mode==='gal'?'shop':'title')});
scene();home();
