const $=s=>document.querySelector(s);
const SAVE_KEY='qsv_save_v1';
let S=Object.assign({gold:0,unlocked:[],best:0,music:true},JSON.parse(localStorage.getItem(SAVE_KEY)||'{}'));
const save=()=>localStorage.setItem(SAVE_KEY,JSON.stringify(S));
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
let T=0,mode='title',kind='slime',edead=false,edie=0,atk=0,eatk=0,hflash=0,eflash=0,shk=0,fl=[],ehp=1,playing=null;
const CL=[{x:20,y:14,s:3,v:.12},{x:150,y:30,s:2,v:.18},{x:260,y:8,s:3,v:.09},{x:90,y:50,s:2,v:.22}];
function lunge(a){return Math.round(Math.sin((1-a/22)*Math.PI)*120)}
function scene(){T++;const th=(mode==='shop'||mode==='gal')?'day':'night';
cx.save();if(shk>0){cx.translate(Math.round(Math.random()*6-3),Math.round(Math.random()*4-2));shk--}
cx.drawImage(BG[th],0,0);
CL.forEach(c=>cloud(cx,Math.floor((c.x+T*c.v)%(W+90))-45,c.y,c.s,th==='night'?'#6c7cc8':'#ffffff'));
if(th==='night')for(let i=0;i<40;i++)if(((T>>4)+i)%6)R(cx,Math.floor(rnd(i)*W),Math.floor(rnd(i+9)*70),1,1,'#fff');
const bob=Math.sin(T/14)>0?1:0;
if(mode==='quiz'||mode==='over'||mode==='win'){
const hx=36+(atk>0?lunge(atk):0)+(hflash>0?-4:0);
cx.globalAlpha=hflash>0&&T%4<2?.35:1;drawHero(cx,hx,44+bob,2,atk>0);cx.globalAlpha=1;
if(!edead||edie>0){const ex=(kind==='slime'?204:192)+(eatk>0?-lunge(eatk):0)+(eflash>0?Math.round(Math.random()*6-3):0),ey=(kind==='slime'?80:44)+(edead?-(30-edie):0)+(bob?0:1);
cx.globalAlpha=edead?edie/30:(eflash>0&&T%4<2?.4:1);
if(kind==='slime')drawSlime(cx,ex,ey,2,true);else drawDrake(cx,ex,ey,2,true);cx.globalAlpha=1;
if(!edead){R(cx,ex-1,ey-13,82,7,'#0c0c24');R(cx,ex,ey-12,80,5,'#601010');R(cx,ex,ey-12,Math.max(0,Math.round(80*ehp)),5,'#e83030')}}
if(atk>0&&atk<14&&atk>6)for(let k=0;k<9;k++)R(cx,196+k*5,66+k*6,4,4,'#fff');
if(atk>0)atk--;if(eatk>0)eatk--;if(hflash>0)hflash--;if(eflash>0)eflash--;if(edie>0)edie--;
}else{drawHero(cx,126,44+bob,2,true)}
fl=fl.filter(f=>f.life>0);fl.forEach(f=>{f.life--;f.y-=.6;cx.font='bold 20px sans-serif';cx.fillStyle='#000';cx.fillText(f.t,f.x+1,f.y+1);cx.fillStyle=f.c;cx.fillText(f.t,f.x,f.y)});
cx.restore();requestAnimationFrame(scene)}
const scr=$('#screen');
const esc=s=>String(s).replace(/[&<>]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;'}[c]));
function hud(extra){$('#hud').innerHTML=`<span class='gold'>★ ${S.gold} or</span><span>${extra||''}</span><span class='dim'>v${self.APP_VERSION}</span>`}
function btn(label,fn,cls){const b=document.createElement('button');b.className='win '+(cls||'');b.innerHTML=label;b.onclick=()=>{ensure();fn(b)};return b}
function box(html,cls){const d=document.createElement('div');d.className='win '+(cls||'');d.innerHTML=html;return d}
function set(...els){scr.innerHTML='';els.forEach(e=>scr.appendChild(e));window.scrollTo(0,0)}
function title(){mode='title';hud();play('title');
set(box(`<h2>⚔ Quête du Savoir ⚔</h2>Réponds aux questions pour vaincre les monstres et gagner de l'or. Dépense-le en musiques et en illustrations.<div class='dim'>Meilleur score : ${S.best} · ${QUESTIONS.length} questions</div>`),
btn('⚔ Nouvelle quête',startQuiz,'menu'),btn('♪ Salle de musique',()=>music(),'menu'),btn('🖼 Galerie',()=>gallery(),'menu'),btn('⚙ Options',options,'menu'))}
let run;
function startQuiz(){const order=QUESTIONS.map((_,i)=>i).sort(()=>Math.random()-.5).slice(0,15);run={order,i:0,hp:4,ok:0,streak:0,earned:0};mode='quiz';play('quiz');next()}
function hearts(){const h=Math.max(run.hp,0);return '♥'.repeat(h)+'♡'.repeat(4-h)}
function next(){if(run.hp<=0||run.i>=run.order.length)return end();
const q=QUESTIONS[run.order[run.i]];kind=Math.random()<.35?'drake':'slime';edead=false;edie=0;ehp=1;
const opts=q.a.map((t,i)=>({t,c:i===0})).sort(()=>Math.random()-.5);
hud(`${hearts()} · ${run.i+1}/${run.order.length}`);
const info=box(`<div class='dim'>${kind==='slime'?'Une gelée verte':'Un drake pourpre'} bloque la route !</div>${esc(q.q)}`);
const bs=opts.map((o,k)=>{const b=btn(`<b class='gold'>${'ABCD'[k]}</b>&nbsp; ${esc(o.t)}`,()=>answer(o,bs,info,q),'ans');b.dataset.c=o.c?'1':'';b.dataset.t=o.t;return b});
set(info,...bs)}
function answer(o,bs,info,q){bs.forEach(b=>{b.disabled=true;if(b.dataset.c)b.classList.add('ok')});
if(o.c){run.ok++;run.streak++;const g=10+Math.min(run.streak-1,5)*2;S.gold+=g;run.earned+=g;sfx('ok');setTimeout(()=>sfx('coin'),450);atk=22;setTimeout(()=>{eflash=16;shk=8;edead=true;edie=30;fl.push({t:'+'+g+' or',x:200,y:70,c:'#ffd830',life:50})},300);
info.innerHTML+=`<hr><span class='gold'>Bonne réponse ! +${g} or</span>${run.streak>1?' (série ×'+run.streak+')':''}<br><span class='dim'>${esc(q.e)}</span>`}
else{run.hp--;run.streak=0;sfx('ko');eatk=22;setTimeout(()=>{hflash=24;shk=10;fl.push({t:'-1 ♥',x:50,y:60,c:'#ff6060',life:50})},300);
bs.forEach(b=>{if(b.dataset.t===o.t)b.classList.add('ko')});
info.innerHTML+=`<hr>Raté ! Bonne réponse : <span class='gold'>${esc(q.a[0])}</span><br><span class='dim'>${esc(q.e)}</span>`}
save();hud(`${hearts()} · ${run.i+1}/${run.order.length}`);
scr.appendChild(btn('Suivant ▶',()=>{run.i++;next()},'menu'))}
function end(){const win=run.hp>0;mode=win?'win':'over';edead=win;edie=0;S.best=Math.max(S.best,run.ok);save();play(win?'victory':'defeat');hud();
set(box(`<h2>${win?'✦ Victoire ✦':'✝ Défaite ✝'}</h2>Score : ${run.ok}/${run.order.length}<br>Or gagné : <span class='gold'>${run.earned}</span><br>Total : <span class='gold'>${S.gold}</span>`),
btn('↻ Rejouer',startQuiz,'menu'),btn('♪ Salle de musique',()=>music(),'menu'),btn('🖼 Galerie',()=>gallery(),'menu'),btn('◀ Menu principal',title,'menu'))}
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
document.addEventListener('click',()=>{ensure();if(S.music&&!cur)play(mode==='quiz'?'quiz':mode==='shop'||mode==='gal'?'shop':'title')});
scene();title();
