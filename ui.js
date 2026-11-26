(function(){
var st=document.createElement('style');
st.textContent="html,body{background:#0f1218;font-size:15px;line-height:1.4}\n"+
"canvas#cv{border:0;border-radius:12px;box-shadow:0 2px 8px rgba(0,0,0,.5)}\n"+
"canvas.art{border:0;border-radius:8px}\n"+
".win{background:#1b2030;border:1px solid #2a3148;border-radius:12px;box-shadow:0 1px 3px rgba(0,0,0,.45);padding:12px 14px;margin-top:8px;text-shadow:none;color:#e8ecf6}\n"+
"#hud{font-size:14px;padding:8px 12px;gap:6px;align-items:center}\n"+
"button.win{font-size:15px;min-height:46px;padding:10px 14px;background:#1b2030}\n"+
"button.win.menu::before{color:#7fa8ff}\n"+
"button.win:active,button.win.sel{background:#2b3552}\n"+
"button.win.ok{background:#1f6b3a;border-color:#2e8f50}\n"+
"button.win.ko{background:#8a2a2a;border-color:#b84040}\n"+
"button.win.ans:disabled:not(.ok):not(.ko){opacity:.5}\n"+
".gold{color:#ffd24a}.dim{color:#9aa6c4;font-size:13px}\n"+
"h2{font-size:18px;color:#ffd24a;margin:0 0 6px}\n"+
"hr{border-top:1px solid #2a3148}\n"+
"button.win.cta{background:#4f8cff;border-color:#4f8cff;color:#fff;text-align:center;font-size:17px;font-weight:700;min-height:56px;box-shadow:0 2px 6px rgba(79,140,255,.35)}\n"+
"button.win.cta:active{background:#3a74e6}\n"+
"button.win.cta::before{content:''}\n"+
".tiles{display:grid;grid-template-columns:repeat(5,1fr);gap:8px;margin-top:8px}\n"+
"button.win.tile{min-height:62px;padding:8px 2px;text-align:center;font-size:11px;line-height:1.2;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:2px;margin:0}\n"+
"button.win.tile b{font-size:20px;font-weight:400}\n"+
".chips{display:flex;flex-wrap:wrap;gap:6px;margin:0 0 8px}\n"+
".chip{background:#252c42;border-radius:14px;padding:3px 10px;font-size:13px;color:#dfe6fa}\n"+
"button.fleeb{background:#c62828;border:0;border-radius:14px;font-size:13px;padding:3px 10px}";
document.head.appendChild(st);
title=function(){mode='title';hud();play('title');
var eq=(shTier()?'🛡'+shTier()+' ':'')+(swTier()?'⚔'+swTier()+' ':'')+(hasI('am1')?'📿':'');
var chips="<div class='chips'><span class='chip'>★ "+S.gold+" or</span><span class='chip'>🏆 Meilleur : "+S.best+"</span>"+(eq?"<span class='chip'>"+eq+"</span>":'')+(S.music?'':"<span class='chip'>🔇</span>")+"</div>";
var tiles=document.createElement('div');tiles.className='tiles';
[['🛡','Arsenal',function(){arsenal()}],['♪','Musique',function(){music()}],['🖼','Galerie',function(){gallery()}],['⚙','Options',options],['🏠','Accueil',home]].forEach(function(t){tiles.appendChild(btn('<b>'+t[0]+'</b>'+t[1],t[2],'tile'))});
set(box(chips+'<h2>⚔ Quête du Savoir</h2>Choisis un thème et réponds aux questions pour vaincre les monstres. Enchaîne 4 bonnes réponses pour lancer un sort élémentaire.'),btn('⚔ Commencer la partie',themePick,'cta'),tiles)};
})();
