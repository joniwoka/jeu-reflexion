(function(){var K='qsv_reset_1_10';if(!localStorage.getItem(K)){S.gold=0;S.items=[];S.unlocked=[];S.best=0;S.codes=[];S.usedCodes=[];save();localStorage.setItem(K,'1')}})();
S.codes=S.codes||[];S.usedCodes=S.usedCodes||[];
var BONUS_CODES={};
var curBank='video';
function cycOrder(n,len){var o=[],p,i;while(o.length<len){p=[];for(i=0;i<n;i++)p.push(i);p.sort(function(){return Math.random()-.5});if(o.length&&p[0]===o[o.length-1])p.push(p.shift());o=o.concat(p)}return o.slice(0,len)}
startQuiz=function(){var order=cycOrder(QUESTIONS.length,45),dmg=2+swTier();
run={order:order,i:0,reg:0,hp:4,ok:0,streak:0,charge:0,earned:0,boss:false,bossDone:false,bossAt:Math.random()<.6?10+Math.floor(Math.random()*4):-1,bossHP:10,bossDmg:dmg,bossNeed:Math.ceil(10/dmg),bossHits:0,blocks:0,potions:0,fled:false,specials:0,en:null};
spT=0;spEl=null;mode='quiz';play('quiz');next()};
function redeemCode(raw){var c=String(raw||'').trim().toUpperCase().replace(/\s+/g,'');
if(!c)return{ok:false,m:'Saisis un code.'};
if(!/^[A-Z0-9-]{4,24}$/.test(c))return{ok:false,m:'Code invalide : 4 à 24 lettres, chiffres ou tirets.'};
if(S.usedCodes.indexOf(c)>=0)return{ok:false,m:'Ce code a déjà été utilisé.'};
if(BONUS_CODES[c]){S.usedCodes.push(c);save();return{ok:true,m:BONUS_CODES[c].msg||'Bonus activé !'}}
if(S.codes.indexOf(c)>=0)return{ok:true,m:'Code déjà enregistré : ses bonus seront activés dans une prochaine mise à jour.'};
S.codes.push(c);save();return{ok:true,m:'Code enregistré. Ses bonus à usage unique seront activés dans une prochaine mise à jour.'}}
function codeBox(){var d=box(`<b>🔑 Code bonus</b><div class='dim'>Saisis un code pour obtenir un bonus à usage unique.</div><input id='codeIn' type='text' maxlength='24' autocomplete='off' autocapitalize='characters' spellcheck='false' placeholder='Ton code' style='width:100%;font:inherit;font-size:19px;padding:10px;margin-top:6px;border-radius:8px;border:2px solid #e8e8f4;background:#0a1658;color:#fff;text-transform:uppercase'><div id='codeMsg' class='dim'></div>`);
d.appendChild(btn('✔ Valider le code',function(){var el=document.getElementById('codeIn'),r=redeemCode(el?el.value:'');var m=document.getElementById('codeMsg');if(m){m.style.color=r.ok?'#80ff9a':'#ff9090';m.textContent=r.m}if(r.ok){sfx('coin');hud()}else sfx('ko')},'menu'));return d}
function pickBank(k){if(!QB[k]||QB[k].length<4){alert('Ce thème n\'est pas encore disponible.');return}
QUESTIONS.splice.apply(QUESTIONS,[0,QUESTIONS.length].concat(QB[k]));curBank=k;startQuiz()}
function levelPick(t){var g=t==='geo',ks=g?['geo4','geo3','geo2']:['his4','his3','his2'],ls=['4e','3e','Seconde'];
set(box(`<h2>${g?'🌍 Géographie':'📜 Histoire'}</h2>Choisis ton niveau.`),
...ks.map(function(k,i){return btn(`${ls[i]} <span class='dim'>(${QB[k].length} questions)</span>`,function(){pickBank(k)},'menu')}),
btn('◀ Retour',themePick,'menu'))}
function themePick(){mode='title';hud();play('title');
set(box(`<h2>⚔ Choisis ta quête</h2>Même jeu, nouveau thème : les règles ne changent pas.<div class='dim'>Meilleur score : ${S.best}</div>`),
btn(`🎮 Jeux vidéo <span class='dim'>(${QB.video.length} questions)</span>`,function(){pickBank('video')},'menu'),
btn(`🌍 Géographie <span class='dim'>(4e · 3e · Seconde)</span>`,function(){levelPick('geo')},'menu'),
btn(`📜 Histoire <span class='dim'>(4e · 3e · Seconde)</span>`,function(){levelPick('his')},'menu'),
btn(`🇬🇧 Anglais · 3e <span class='dim'>(${QB.eng3.length} questions)</span>`,function(){pickBank('eng3')},'menu'),
codeBox(),
btn('◀ Menu principal',title,'menu'))}
function title(){mode='title';hud();play('title');
set(box(`<h2>⚔ Quête du Savoir ⚔</h2>Choisis un thème (jeux vidéo, géographie, histoire ou anglais) et réponds aux questions pour vaincre les monstres. Enchaîne 4 bonnes réponses pour lancer un sort élémentaire.<div class='dim'>Meilleur score : ${S.best}</div>`),
btn('⚔ Nouvelle quête',themePick,'menu'),btn('🛡 Arsenal',function(){arsenal()},'menu'),btn('♪ Salle de musique',function(){music()},'menu'),btn('🖼 Galerie',function(){gallery()},'menu'),btn('⚙ Options',options,'menu'),btn('🏠 Accueil',home,'menu'))}
home();
