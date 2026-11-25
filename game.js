const $=s=>document.querySelector(s);
const SAVE_KEY='qsv_save_v1';
let S=Object.assign({gold:0,unlocked:[],best:0,music:true},JSON.parse(localStorage.getItem(SAVE_KEY)||'{}'));
const save=()=>localStorage.setItem(SAVE_KEY,JSON.stringify(S));
const MUSIC=[
{id:'m1',title:'Overworld Theme',game:'Super Mario Bros.',by:'Koji Kondo',cost:30},
{id:'m2',title:'Overworld Theme',game:'The Legend of Zelda',by:'Koji Kondo',cost:30},
{id:'m3',title:'Terra\'s Theme',game:'Final Fantasy VI',by:'Nobuo Uematsu',cost:40},
{id:'m4',title:'Corridors of Time',game:'Chrono Trigger',by:'Yasunori Mitsuda',cost:40},
{id:'m5',title:'Green Hill Zone',game:'Sonic the Hedgehog',by:'Masato Nakamura',cost:50},
{id:'m6',title:'One-Winged Angel',game:'Final Fantasy VII',by:'Nobuo Uematsu',cost:60},
{id:'m7',title:'Megalovania',game:'Undertale',by:'Toby Fox',cost:60},
{id:'m8',title:'Dragonborn',game:'Skyrim',by:'Jeremy Soule',cost:70}];
const ART=[
{id:'a1',game:'Tetris',kind:'blocks',cost:40},
{id:'a2',game:'The Legend of Zelda',kind:'sword',cost:50},
{id:'a3',game:'Super Mario Bros.',kind:'shroom',cost:50},
{id:'a4',game:'Final Fantasy VI',kind:'esper',cost:60},
{id:'a5',game:'Skyrim',kind:'dragon',cost:60},
{id:'a6',game:'Pac-Man',kind:'pac',cost:40}];
const PAL={k:'#101030',h:'#3858e8',s:'#f8c8a0',a:'#c8d0ec',b:'#2848b0',r:'#c82828',g:'#f8d838',w:'#fff',l:'#58d848',d:'#208828',e:'#ff4040',p:'#a050e0',y:'#ffe060'};
const HERO=['....kkkkkk......','...khhhhhhk.....','..khhhhhhhhk....','..khhssssshk....','..kssksskssk....','..kssssssssk....','...kksssskk.....','..kraaaaaark....','..krraaggaarrk..','..krraaaaaarrk..','..kssbbbbbbssk..','...kkbbbbbbkk...','....kbbkkbbk....','....kbbk.kbbk...','....kkkk.kkkk...','................'];
const SLIME=['................','................','......kkkk......','....kkllllkk....','...klllllllk....','..kllwkllwklk...','..klllkllklllk..','..kllllllllllk..','..kldllllllldk..','...kdddddddk....','....kkkkkkkk....','................','................','................','................','................'];
const DRAKE=['................','.....kk..kk.....','....kppkkppk....','...kpppppppk....','..kpweppewpk....','..kpppkkpppk....','...kppppppk.....','..kkpppppppkk...','.kpkpppppppkpk..','.kp.kpppppk.pk..','....kppkkppk....','....kyyk.kyyk...','...kkkk..kkkk...','................','................','................'];
function spr(ctx,map,x,y,sc,flip){for(let j=0;j<16;j++){const row=(map[j]||'').padEnd(16,'.');for(let i=0;i<16;i++){const c=row[flip?15-i:i];if(c!=='.'){ctx.fillStyle=PAL[c];ctx.fillRect(x+i*sc,y+j*sc,sc,sc)}}}}
const cv=$('#cv'),cx=cv.getContext('2d');let T=0,shake=0,flash=0,mode='title',enemy=SLIME,enemyHP=1,heroHurt=0;
function rnd(i){const x=Math.sin(i*127.1)*43758.5;return x-Math.floor(x)}
function scene(){
T++;
['#0a0a38','#141860','#202888','#3040a8','#5060c0','#7080d0'].forEach((c,i)=>{cx.fillStyle=c;cx.fillRect(0,i*9,160,10)});
for(let i=0;i<40;i++){cx.fillStyle=((T>>4)+i)%7?'#fff':'#889';cx.fillRect(Math.floor(rnd(i)*160),Math.floor(rnd(i+99)*40),1,1)}
cx.fillStyle='#e8e8f8';cx.fillRect(130,8,8,8);cx.fillStyle='#bcc';cx.fillRect(133,10,3,3);
for(let x=0;x<160;x++){const h=46+Math.sin(x*.07)*8+Math.sin(x*.19+2)*4;cx.fillStyle='#202060';cx.fillRect(x,h,1,60)}
for(let x=0;x<160;x++){const h=56+Math.sin(x*.11+1)*5;cx.fillStyle='#183a58';cx.fillRect(x,h,1,40)}
cx.fillStyle='#10102c';cx.fillRect(70,34,6,22);cx.fillRect(66,38,4,18);cx.fillRect(76,38,4,18);cx.fillRect(69,30,2,4);cx.fillRect(75,30,2,4);
cx.fillStyle='#ffd838';cx.fillRect(72,42,2,3);
for(let y=64;y<90;y++){cx.fillStyle=y<66?'#58b038':(y<76?'#388028':'#285820');cx.fillRect(0,y,160,1)}
for(let x=0;x<160;x+=8){cx.fillStyle='#48a030';cx.fillRect(x+((T>>3)%2)*2,67,2,2);cx.fillStyle='#1c4818';cx.fillRect(x,80+(x%16?2:0),3,1)}
const bob=Math.sin(T/12)>0?1:0;const hx=14+(heroHurt>0?-3:0);
if(mode==='quiz'||mode==='over'||mode==='win'){
spr(cx,HERO,hx,40+bob,2);
if(enemyHP>0){const sx=shake>0?(Math.random()*4-2):0;cx.globalAlpha=flash>0&&(T%4<2)?.4:1;spr(cx,enemy,104+sx,38+(bob?0:1),3,true);cx.globalAlpha=1;
cx.fillStyle='#000';cx.fillRect(100,26,52,5);cx.fillStyle='#fff';cx.fillRect(101,27,50,3);cx.fillStyle='#e03030';cx.fillRect(101,27,Math.max(0,50*enemyHP),3)}
}else{spr(cx,HERO,hx+30,40+bob,3)}
if(shake>0)shake--;if(flash>0)flash--;if(heroHurt>0)heroHurt--;
requestAnimationFrame(scene)}
let AC,master,timer,track=null,step=0,nextT=0;
const mf=n=>440*Math.pow(2,(n-69)/12);
function audio(){if(!AC){AC=new (window.AudioContext||window.webkitAudioContext)();master=AC.createGain();master.gain.value=.22;master.connect(AC.destination)}if(AC.state==='suspended')AC.resume()}
function tone(f,t,d,type,v){const o=AC.createOscillator(),g=AC.createGain();o.type=type;o.frequency.value=f;g.gain.setValueAtTime(0.0001,t);g.gain.linearRampToValueAtTime(v,t+.02);g.gain.exponentialRampToValueAtTime(.0001,t+d);o.connect(g);g.connect(master);o.start(t);o.stop(t+d+.05)}
const TRACKS={
title:{bpm:64,chords:[[57,60,64],[53,57,60],[48,52,55],[55,59,62]],arp:[0,1,2,1,0,1,2,1],mel:[76,0,0,72,74,0,72,0,69,0,72,0,77,0,76,0,76,0,0,72,67,0,72,0,74,0,71,0,67,0,0,0]},
quiz:{bpm:104,chords:[[57,60,64],[53,57,60],[55,59,62],[52,56,59]],arp:[0,2,1,2,0,2,1,2],mel:[0,0,81,0,0,79,0,0,0,0,77,0,0,76,0,0,0,0,79,0,0,76,0,0,0,0,75,0,76,0,0,0]}};
function stop(){clearInterval(timer);track=null}
function play(name){if(!S.music){stop();return}audio();if(track===name)return;stop();track=name;step=0;nextT=AC.currentTime+.1;
timer=setInterval(()=>{const TR=TRACKS[track];if(!TR)return;const dt=60/TR.bpm/2;
while(nextT<AC.currentTime+.3){const bar=Math.floor(step/8)%4,ch=TR.chords[bar],i=step%8;
if(i===0){tone(mf(ch[0]-24),nextT,dt*7,'triangle',.5);tone(mf(ch[0]-12),nextT,dt*7,'sine',.15)}
tone(mf(ch[TR.arp[i]]),nextT,dt*1.5,'square',.06);
const m=TR.mel[step%32];if(m)tone(mf(m),nextT,dt*3,'triangle',.28);
nextT+=dt;step++}},80)}
function sfx(k){if(!S.music)return;audio();const t=AC.currentTime;
if(k==='ok'){[72,76,79,84].forEach((n,i)=>tone(mf(n),t+i*.08,.18,'square',.12))}
if(k==='ko'){tone(mf(48),t,.3,'sawtooth',.14);tone(mf(45),t+.15,.4,'sawtooth',.14)}
if(k==='coin'){tone(mf(88),t,.08,'square',.1);tone(mf(95),t+.07,.2,'square',.1)}}
const scr=$('#screen');
const esc=s=>String(s).replace(/[&<>]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;'}[c]));
function hud(extra){$('#hud').innerHTML=`<span class='gold'>★ ${S.gold} Or</span><span>${extra||''}</span><span class='dim'>v${self.APP_VERSION}</span>`}
function btn(label,fn,cls){const b=document.createElement('button');b.className='win '+(cls||'');b.innerHTML=label;b.onclick=()=>{audio();fn(b)};return b}
function box(html){const d=document.createElement('div');d.className='win';d.innerHTML=html;return d}
function set(...els){scr.innerHTML='';els.forEach(e=>scr.appendChild(e))}
function title(){mode='title';enemyHP=1;hud();play('title');
set(box(`<h2>⚔ Quête du Savoir ⚔</h2>Prouve ta culture vidéoludique. Chaque bonne réponse rapporte de l'or pour débloquer musiques et illustrations.<div class='dim'>Record : ${S.best}/${QUESTIONS.length}</div>`),
btn('▶ Nouvelle quête',startQuiz),btn('♪ Trésor (musiques & art)',()=>shop('music')),btn('⚙ Options',options))}
let run;
function startQuiz(){run={order:QUESTIONS.map((_,i)=>i).sort(()=>Math.random()-.5),i:0,hp:3,ok:0,streak:0,earned:0};mode='quiz';play('quiz');next()}
function hearts(){const h=Math.max(run.hp,0);return '♥ '+'♥'.repeat(h)+'♡'.repeat(3-h)}
function next(){
if(run.hp<=0||run.i>=run.order.length)return end();
const q=QUESTIONS[run.order[run.i]];enemy=run.i%3===2?DRAKE:SLIME;enemyHP=1;
const opts=q.a.map((t,i)=>({t,c:i===0})).sort(()=>Math.random()-.5);
hud(`${hearts()} · ${run.i+1}/${run.order.length}`);
const info=box(esc(q.q));const L='ABCD';
const bs=opts.map((o,k)=>{const b=btn(`${L[k]}. ${esc(o.t)}`,()=>answer(o,bs,info,q));b.dataset.c=o.c?'1':'';return b});
set(info,...bs)}
function answer(o,bs,info,q){
bs.forEach(b=>{b.disabled=true;if(b.dataset.c)b.classList.add('ok')});
if(o.c){run.ok++;run.streak++;const g=10+Math.min(run.streak-1,5)*2;S.gold+=g;run.earned+=g;sfx('ok');setTimeout(()=>sfx('coin'),400);shake=14;flash=14;enemyHP=.2;
info.innerHTML+=`<hr><span class='gold'>Bien joué ! +${g} or</span> ${run.streak>1?'(série ×'+run.streak+')':''}<br><span class='dim'>${esc(q.e)}</span>`}
else{run.hp--;run.streak=0;sfx('ko');heroHurt=14;
bs.forEach(b=>{if(b.innerHTML.slice(3)===esc(o.t))b.classList.add('ko')});
info.innerHTML+=`<hr>Raté ! Bonne réponse : <span class='gold'>${esc(q.a[0])}</span><br><span class='dim'>${esc(q.e)}</span>`}
save();hud(hearts());
scr.appendChild(btn('Suivant ▶',()=>{run.i++;next()}))}
function end(){const win=run.hp>0;mode=win?'win':'over';enemyHP=win?0:1;S.best=Math.max(S.best,run.ok);save();play('title');hud();
set(box(`<h2>${win?'✦ Victoire ✦':'✝ Défaite ✝'}</h2>Score : ${run.ok}/${run.order.length}<br>Or gagné : <span class='gold'>${run.earned}</span><br>Total : <span class='gold'>${S.gold}</span>`),
btn('↻ Rejouer',startQuiz),btn('♪ Dépenser mon or',()=>shop('music')),btn('Menu',title))}
function yt(q){return 'https://www.youtube.com/results?search_query='+encodeURIComponent(q)}
function shop(tab){mode='shop';hud();
const tabs=document.createElement('div');tabs.className='row';
tabs.append(btn('♪ Musiques',()=>shop('music'),tab==='music'?'sel':''),btn('🖼 Illustrations',()=>shop('art'),tab==='art'?'sel':''));
const els=[tabs];
if(tab==='music'){els.push(box(`<div class='dim'>Achat = déblocage de la fiche et du lien d'écoute officiel (extraits non intégrés : droits d'auteur).</div>`));
MUSIC.forEach(m=>{const own=S.unlocked.includes(m.id);
els.push(own?box(`<b>${esc(m.title)}</b><br>${esc(m.game)} · <span class='dim'>${esc(m.by)}</span><br><a class='lnk' target='_blank' rel='noopener' href='${yt(m.game+' '+m.title+' OST')}'>▶ Écouter sur YouTube</a>`):btn(`🔒 ${esc(m.game)} — <span class='gold'>${m.cost} or</span>`,()=>buy(m,tab)))})}
else{els.push(box(`<div class='dim'>Vignettes pixel art originales, inspirées de ces jeux. Le lien mène aux visuels officiels.</div>`));
ART.forEach(a=>{const own=S.unlocked.includes(a.id);
if(own)els.push(box(`<div class='row'><canvas class='art' width='32' height='32' id='${a.id}'></canvas><div><b>${esc(a.game)}</b><br><a class='lnk' target='_blank' rel='noopener' href='https://www.google.com/search?tbm=isch&q=${encodeURIComponent(a.game+' official art')}'>Voir l'art officiel</a></div></div>`));
else els.push(btn(`🔒 ${esc(a.game)} — <span class='gold'>${a.cost} or</span>`,()=>buy(a,tab)))})}
els.push(btn('◀ Menu',title));set(...els);ART.forEach(a=>{const c=document.getElementById(a.id);if(c)drawArt(c.getContext('2d'),a.kind)})}
function buy(it,tab){if(S.gold<it.cost){sfx('ko');alert('Pas assez d\'or ! Il te manque '+(it.cost-S.gold)+'.');return}S.gold-=it.cost;S.unlocked.push(it.id);save();sfx('coin');shop(tab)}
function drawArt(c,k){const R=(x,y,w,h,col)=>{c.fillStyle=col;c.fillRect(x,y,w,h)};
R(0,0,32,32,'#1a2a78');R(0,0,32,12,'#2840a0');R(0,24,32,8,'#2a6a30');
if(k==='blocks'){[['#e83030',4,16],['#30c0e8',12,16],['#f8d838',20,16],['#a040e0',8,8],['#58d848',16,8]].forEach(([col,x,y])=>{R(x,y,8,8,col);R(x,y,8,1,'#fff8');R(x,y+7,8,1,'#0006')})}
if(k==='sword'){R(15,4,3,17,'#dfe8ff');R(16,4,1,17,'#fff');R(11,20,11,3,'#f8d838');R(15,23,3,6,'#8a4a1a');R(12,26,9,2,'#6a3a14')}
if(k==='shroom'){R(9,10,14,8,'#e83030');R(7,13,18,5,'#e83030');R(11,11,4,4,'#fff');R(18,12,4,4,'#fff');R(12,18,8,8,'#f8d8a0');R(14,20,1,2,'#000');R(18,20,1,2,'#000')}
if(k==='esper'){R(13,6,6,6,'#60e0ff');R(10,12,12,8,'#a0f0ff');R(6,10,5,3,'#fff');R(21,10,5,3,'#fff');R(14,20,4,6,'#60e0ff');R(15,8,1,1,'#000');R(17,8,1,1,'#000')}
if(k==='dragon'){R(8,14,16,8,'#6a2a8a');R(20,10,6,6,'#8a3aaa');R(4,8,8,6,'#8a3aaa');R(22,12,1,1,'#ff0');R(14,10,4,4,'#8a3aaa');R(2,20,8,2,'#6a2a8a');R(10,22,3,5,'#4a1a68');R(18,22,3,5,'#4a1a68')}
if(k==='pac'){c.fillStyle='#ffe000';c.beginPath();c.arc(12,16,9,.5,Math.PI*2-.5);c.lineTo(12,16);c.fill();R(24,15,2,2,'#fff');R(28,15,2,2,'#fff')}}
function options(){hud();
set(box('<h2>Options</h2>Version installée : '+self.APP_VERSION),
btn(`♪ Musique : ${S.music?'ON':'OFF'}`,()=>{S.music=!S.music;save();S.music?play('title'):stop();options()}),
btn('⟳ Vérifier les mises à jour',checkUpdate),
btn('✖ Effacer la sauvegarde',()=>{if(confirm('Tout effacer ?')){localStorage.removeItem(SAVE_KEY);location.reload()}}),
btn('◀ Menu',title))}
let REG;
async function checkUpdate(){
const info=box('Recherche…');scr.insertBefore(info,scr.children[1]);
try{const t=await (await fetch('version.js?'+Date.now(),{cache:'no-store'})).text();const v=(t.match(/'([^']+)'/)||[])[1];
if(REG)await REG.update();
info.textContent=v&&v!==self.APP_VERSION?`Nouvelle version ${v} trouvée, installation…`:'Tu as la dernière version.'}
catch(e){info.textContent='Hors ligne ou erreur réseau.'}}
if('serviceWorker' in navigator){
navigator.serviceWorker.register('sw.js').then(r=>{REG=r;
r.addEventListener('updatefound',()=>{const w=r.installing;w&&w.addEventListener('statechange',()=>{
if(w.state==='installed'&&navigator.serviceWorker.controller){const d=box('Nouvelle version prête !');d.appendChild(btn('Recharger',()=>{w.postMessage('SKIP')}));scr.prepend(d)}})})});
let rl=false;navigator.serviceWorker.addEventListener('controllerchange',()=>{if(!rl){rl=true;location.reload()}})}
document.addEventListener('click',()=>{if(S.music&&!track)play(mode==='quiz'?'quiz':'title')});
scene();title();
