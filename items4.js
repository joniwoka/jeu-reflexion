/* v1.24.0 : Arsenal plus lisible, icones pixel art, fond par etat */
(function(){var st=document.createElement('style');st.textContent=".win.it{display:flex;align-items:center;gap:12px;text-align:left}button.win.it{display:flex;width:100%}.win.it .ic{flex:none;width:58px;height:58px;border-radius:10px;background:#10142a;display:flex;align-items:center;justify-content:center}.win.it .ico{width:48px;height:48px;image-rendering:pixelated;display:block}.win.it .tx{flex:1;min-width:0}.win.it.own{background:#1b3330;border-color:#2f5c52}.win.it.eqd{background:#222c4a;border:2px solid #9fd0ff;box-shadow:0 0 0 2px rgba(159,208,255,.18)}.win.it.lk .ico{opacity:.5;filter:grayscale(.7)}.st{font-size:13px;color:#9aa6c4}.st.e{color:#bfe0ff;font-weight:700}.st.o{color:#8fd4bf}.low{color:#ff9a9a}.leg{display:flex;gap:8px;flex-wrap:wrap;margin-top:6px}.leg span{font-size:12px;padding:2px 8px;border-radius:10px;border:1px solid #2a3148;color:#cdd6ff}.leg .l1{border:2px solid #9fd0ff;background:#222c4a}.leg .l2{background:#1b3330;border-color:#2f5c52}";document.head.appendChild(st)})();
var ICF={},ICO={},DK='#20243c';
function mkIc(id){if(ICO[id])return ICO[id];var g=[],i,x,y,cv=document.createElement('canvas');cv.width=16;cv.height=16;for(i=0;i<256;i++)g.push(null);
var s=function(x,y,c){if(x>=0&&y>=0&&x<16&&y<16)g[y*16+x]=c};if(ICF[id])ICF[id](s);
var o=g.slice();for(y=0;y<16;y++)for(x=0;x<16;x++){if(g[y*16+x])continue;if((x>0&&g[y*16+x-1])||(x<15&&g[y*16+x+1])||(y>0&&g[(y-1)*16+x])||(y<15&&g[(y+1)*16+x]))o[y*16+x]=DK}
var c=cv.getContext('2d');for(i=0;i<256;i++)if(o[i]){c.fillStyle=o[i];c.fillRect(i%16,Math.floor(i/16),1,1)}
return ICO[id]=cv.toDataURL()}
function swordI(bl,ed,gu,gr,po,gs,gem,runes,spk){return function(s){var t,x,y;
for(t=0;t<=7;t++){x=13-t;y=2+t;s(x,y,bl);s(x+1,y,ed)}s(14,1,ed);
for(t=-gs;t<=gs;t++){s(5+t,10+t,gu);s(6+t,10+t,gu)}
s(4,11,gr);s(5,11,gr);s(3,12,gr);s(4,12,gr);s(2,13,po);s(3,13,po);s(2,14,po);s(3,14,po);
if(gem){s(5,10,gem);s(6,10,gem)}
if(runes){s(11,4,runes);s(9,6,runes)}
if(spk){s(10,1,spk);s(15,6,spk);s(2,5,spk);s(12,8,spk)}}}
function scepI(wd,bd,orb,hi,dk,pr,spk){return function(s){var t,x,y,d;
for(t=0;t<=8;t++){x=3+t;y=14-t;s(x,y,wd);s(x+1,y,wd)}s(7,10,bd);s(8,10,bd);s(6,11,bd);s(7,11,bd);
if(pr){[[9,6],[15,6],[10,7],[14,7],[11,8],[12,8],[13,8]].forEach(function(p){s(p[0],p[1],pr)})}
for(y=0;y<9;y++)for(x=8;x<16;x++){d=(x-12)*(x-12)+(y-4)*(y-4);if(d<=10)s(x,y,d>=7?dk:orb)}
s(11,3,hi);s(11,2,hi);s(10,4,hi);
if(spk){s(7,2,spk);s(15,1,spk);s(14,8,spk)}}}
function shieldI(bd,rm,hi,deco){return function(s){var y,x,hw,L=[6,6,6,6,6,6,6,5,5,4,3,2,1];
for(y=0;y<13;y++){hw=L[y];for(x=8-hw;x<8+hw;x++)s(x,y+1,(x===8-hw||x===7+hw||y===0||y===12)?rm:bd)}
for(y=3;y<=8;y++)s(4,y,hi);deco(s)}}
function tunI(bd,sh,tr,be,gem){return function(s){var x,y;
for(y=2;y<=14;y++)for(x=4;x<12;x++)s(x,y,x>=10?sh:bd);
for(x=6;x<=9;x++)s(x,2,null);s(5,2,tr);s(10,2,tr);s(5,3,tr);s(10,3,tr);
for(y=3;y<=8;y++){for(x=1;x<=3;x++)s(x,y,bd);for(x=12;x<=14;x++)s(x,y,sh)}
for(x=1;x<=3;x++)s(x,8,tr);for(x=12;x<=14;x++)s(x,8,tr);
for(x=4;x<12;x++){s(x,9,be);s(x,14,tr)}s(7,9,tr);s(8,9,tr);
if(gem){s(7,5,gem);s(8,5,gem);s(7,6,gem);s(8,6,gem);s(7,5,'#ffffff')}}}
ICF.sw1=swordI('#dfe6f7','#ffffff','#a0a8c0','#7a4a24','#a0a8c0',3);
ICF.sw2=swordI('#ffb04a','#fff0c0','#b02828','#6a3a1c','#f0c040',3,null,null,null);
ICF.sw3=swordI('#d8c4ff','#ffffff','#8a4ad0','#4a2c70','#8a4ad0',3,null,'#7a3ad0');
ICF.sw4=swordI('#fff4c0','#ffffff','#f0c040','#7a4a24','#f0c040',4,'#e04040');
ICF.sw5=swordI('#8ae8ff','#e8ffff','#4a78e0','#2a3c80','#4a78e0',3,'#ffffff',null,'#ffffff');
ICF.sc1=scepI('#8a5a2a','#cfd8ee','#cfd8ee','#ffffff','#8a98b8');
ICF.sc2=scepI('#8a5a2a','#c03030','#ff9a3c','#fff0c0','#c05a18');
ICF.sc3=scepI('#4a2c70','#8a4ad0','#b070ff','#f0e0ff','#6a30b0');
ICF.sc4=scepI('#d8a830','#f0c040','#ffd868','#ffffff','#c08818','#f0c040');
ICF.sc5=scepI('#2a3c80','#4a78e0','#70e8ff','#ffffff','#2a88b8',null,'#ffffff');
ICF.sh1=shieldI('#a8703c','#6a4020','#c8905a',function(s){var y;for(y=2;y<=11;y++)s(8,y,'#7a4a24');[[7,6],[8,6],[7,7],[8,7]].forEach(function(p){s(p[0],p[1],'#f0c850')})});
ICF.sh2=shieldI('#9aa6c0','#4a5678','#d8e0f4',function(s){var x,y;for(y=2;y<=11;y++){s(7,y,'#6e7c9a');s(8,y,'#6e7c9a')}for(x=3;x<=12;x++){s(x,5,'#6e7c9a');s(x,6,'#6e7c9a')}[[7,5],[8,5],[7,6],[8,6]].forEach(function(p){s(p[0],p[1],'#f0c850')})});
ICF.sh3=shieldI('#3a5ed0','#f0c040','#7a9aff',function(s){var x,y;for(y=2;y<=11;y++){s(7,y,'#f0c040');s(8,y,'#f0c040')}for(x=3;x<=12;x++){s(x,5,'#f0c040');s(x,6,'#f0c040')}[[7,5],[8,5],[7,6],[8,6]].forEach(function(p){s(p[0],p[1],'#ff4060')});s(7,5,'#ffffff')});
ICF.tu1=tunI('#eadfc0','#c8b894','#a8885a','#8a5a2a');
ICF.tu2=tunI('#7a6cd8','#5a4cb0','#f0c850','#f0c850');
ICF.tu3=tunI('#2c46b0','#1c2e80','#f0c850','#f0c850','#ff5070');
ICF.am1=function(s){var x,y;for(x=2;x<=13;x++){y=3+Math.round(6*Math.sin(Math.PI*(x-2)/11));s(x,y,'#f0c850')}
s(7,9,'#f0c850');s(8,9,'#f0c850');s(7,10,'#40e0ff');s(8,10,'#40e0ff');s(7,11,'#40e0ff');s(8,11,'#1aa8d0');s(7,10,'#ffffff')};
ICF.am2=function(s){var x,y,d;for(y=0;y<16;y++)for(x=0;x<16;x++){d=(x-7.5)*(x-7.5)+(y-8.5)*(y-8.5);if(d>=12&&d<=42)s(x,y,(x+y>15)?'#c08818':'#f0c850')}
s(7,3,'#4af08a');s(8,3,'#4af08a');s(7,4,'#2aa860');s(8,4,'#2aa860');s(7,3,'#d0ffe0')};
function icoImg(id){return '<span class="ic"><img class="ico" src="'+mkIc(id)+'" width="48" height="48" alt=""></span>'}
function itemRow(it,state,fn){var pr=S.gold>=it.cost?'gold':'low',tag=state==='eq'?'<span class="st e">✔ Équipé</span>':state==='own'?'<span class="st o">Acheté · toucher pour équiper</span>':state==='acc'?'<span class="st o">✔ Possédé</span>':state==='lock'?'<span class="st">🔒 Butin du dragon</span>':'<span class="'+pr+'">'+it.cost+' or</span>';
var h=icoImg(it.id)+'<div class="tx"><b>'+esc(it.t)+'</b> '+tag+'<div class="dim">'+esc(it.d)+'</div></div>',cl='it '+(state==='eq'?'eqd':state==='own'||state==='acc'?'own':state==='lock'?'lk':'new');
return fn?btn(h,fn,cl):box(h,cl)}
secEls=function(title,ids,slot){var els=[box('<b>'+title+'</b>')];
ids.forEach(function(id){var it=CAT[id];if(!it)return;
if(ownd(id)){if(S.eq[slot]===id)els.push(itemRow(it,'eq'));else els.push(itemRow(it,'own',function(){equip(id);save();sfx('coin');arsenal()}))}
else if(!it.cost)els.push(itemRow(it,'lock'));
else els.push(itemRow(it,'buy',function(){buyItem(it)}))});
return els};
arsenal=function(){mode='shop';ACT();hud();if(!playing)play('shop');
var mg=S.hero==='mage',els=[box('<h2>🛡 Arsenal</h2><div class="dim">Un seul objet équipé par catégorie. Le paladin utilise épées et boucliers, la mage sceptres et tuniques. Les accessoires servent aux deux héros.</div><div class="leg"><span class="l1">Contour clair : équipé</span><span class="l2">Fond vert : acheté</span><span>Fond sombre : à acheter</span></div>')];
var row=document.createElement('div');row.className='hrow';
[['paladin','⚔ Paladin'],['mage','🔮 Mage']].forEach(function(h){row.appendChild(btn('<b>'+h[1]+'</b>',function(){S.hero=h[0];save();arsenal()},'hsel'+(S.hero===h[0]?' sel':'')))});
var hb=box('<b>Équipement de :</b>');hb.appendChild(row);els.push(hb);
if(mg){els=els.concat(secEls('🪄 Sceptres',SCP,'sc'),secEls('👘 Tuniques',TUN,'tu'))}
else{els=els.concat(secEls('⚔ Épées',WPN,'sw'),secEls('🛡 Boucliers',ARM,'sh'))}
els.push(box('<b>💍 Accessoires</b>'));
['am1','am2'].forEach(function(id){var it=CAT[id];if(!it)return;els.push(ownd(id)?itemRow(it,'acc'):itemRow(it,'buy',function(){buyItem(it)}))});
els.push(btn('◀ Menu principal',function(){playing=null;title()},'menu'));set.apply(null,els)};
