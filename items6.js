/* v1.25.1 : notifications achat / equipement, correctif de la boucle d'animation */
(function(){var st=document.createElement('style');st.textContent=".ntf{position:fixed;left:0;top:0;right:0;bottom:0;background:rgba(5,8,20,.62);display:flex;align-items:center;justify-content:center;z-index:120;padding:16px}.ntfb{background:#1b2030;border:2px solid #9fd0ff;border-radius:14px;padding:16px;max-width:380px;width:100%;box-shadow:0 8px 30px rgba(0,0,0,.6);color:#e8ecf6}.ntfb.err{border-color:#ff9a9a}.ntfh{font-weight:700;font-size:18px;color:#ffd24a;margin-bottom:10px}.ntfb.err .ntfh{color:#ff9a9a}.ntfr{display:flex;gap:12px;align-items:center}.ntfr .ic{flex:none;width:58px;height:58px;border-radius:10px;background:#10142a;display:flex;align-items:center;justify-content:center}.ntfr .ico{width:48px;height:48px;image-rendering:pixelated;display:block}.ntfi{margin-top:10px;font-size:14px;color:#9fe0c8}.ntfb.err .ntfi{color:#ffb0b0}";document.head.appendChild(st)})();
var NTFT=null,inBuy=false;
function ntf(kind,head,id,info){var old=document.getElementById('ntf');if(old)old.remove();clearTimeout(NTFT);
var it=CAT[id]||{t:'',d:''},d=document.createElement('div'),ic='';d.id='ntf';d.className='ntf';
if(typeof mkIc==='function'&&ICF[id])ic='<span class="ic"><img class="ico" src="'+mkIc(id)+'" width="48" height="48" alt=""></span>';
d.innerHTML='<div class="ntfb '+kind+'"><div class="ntfh">'+head+'</div><div class="ntfr">'+ic+'<div><b>'+esc(it.t)+'</b><div class="dim">'+esc(it.d||'')+'</div></div></div><div class="ntfi">'+info+'</div><button class="win cta" id="ntfok">OK</button></div>';
var close=function(){clearTimeout(NTFT);if(d.parentNode)d.parentNode.removeChild(d)};
d.onclick=function(e){if(e.target===d)close()};document.body.appendChild(d);
document.getElementById('ntfok').onclick=close;NTFT=setTimeout(close,4500)}
function nm(id){return id&&CAT[id]?'<b>'+esc(CAT[id].t)+'</b>':''}
var oeq6=equip;
equip=function(id){var s=slotOf(id),prev=s?S.eq[s]:null;oeq6(id);if(!inBuy&&prev!==id)ntf('ok','✔ Objet équipé',id,prev?'Équipé à la place de : '+nm(prev)+'.':'Équipé.')};
var obi6=buyItem;
buyItem=function(it){var s=slotOf(it.id),prev=s?S.eq[s]:null;
if(S.gold<it.cost){sfx('ko');ntf('err','🪙 Pas assez d’or',it.id,'Il te manque <b>'+(it.cost-S.gold)+' or</b> ('+it.cost+' or demandés, tu as '+S.gold+' or).');return}
var g=S.gold;inBuy=true;try{obi6(it)}finally{inBuy=false}
if(S.gold<g)ntf('ok','🛒 Objet acheté',it.id,'−'+it.cost+' or · il te reste <b>'+S.gold+' or</b>.<br>'+(s?(prev&&prev!==it.id?'Équipé à la place de : '+nm(prev)+'.':'Équipé automatiquement.'):'Accessoire actif pour les deux héros.'))};
var oif6=introFrame;
introFrame=function(){if(!IN||IN.broken)return;try{oif6()}catch(e){IN.broken=1;showErr('intro: '+e.message)}};
(function(){var ns,inNew=false,armed=true,oSE=showErr;
try{var s=scene.toString();s='function'+s.slice(s.indexOf('('));ns=(0,eval)('('+s+')')}catch(e){showErr('scene: '+e.message);return}
window.showErr=function(m){if(String(m).indexOf('SCENE_RESTART')>=0)return;oSE(m)};
window.scene=function(){inNew=true;try{return ns()}finally{inNew=false}};
cx.save=function(){if(armed&&!inNew){armed=false;delete cx.save;throw new Error('SCENE_RESTART')}return CanvasRenderingContext2D.prototype.save.call(cx)};
setTimeout(function(){armed=false;if(Object.prototype.hasOwnProperty.call(cx,'save'))delete cx.save},2500);
requestAnimationFrame(window.scene)})();
