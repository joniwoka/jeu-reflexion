/* v1.23.0 : equipement selectionnable (paladin / mage), decor qui evolue */
var WPN=['sw1','sw2','sw3','sw4','sw5'],ARM=['sh1','sh2','sh3'],SCP=['sc1','sc2','sc3','sc4','sc5'],TUN=['tu1','tu2','tu3'];
function hasAny(a,id){return a.indexOf(id)>=0}
function ownd(id){return S.owned.indexOf(id)>=0}
function slotOf(id){return hasAny(WPN,id)?'sw':hasAny(ARM,id)?'sh':hasAny(SCP,id)?'sc':hasAny(TUN,id)?'tu':null}
function lastOwned(l){var b=null;l.forEach(function(id){if(ownd(id))b=id});return b}
S.owned=S.owned||S.items.slice();S.eq=S.eq||{};
[['sw',WPN],['sh',ARM],['sc',SCP],['tu',TUN]].forEach(function(p){if(!S.eq[p[0]]||!ownd(S.eq[p[0]]))S.eq[p[0]]=lastOwned(p[1])});
function ACT(){var act=[],mg=S.hero==='mage',sw=mg?S.eq.sc:S.eq.sw,sh=mg?S.eq.tu:S.eq.sh;
S.owned.forEach(function(id){if(!slotOf(id)&&act.indexOf(id)<0)act.push(id)});
if(sw&&ownd(sw))act.push(mg?'sw'+sw.slice(2):sw);
if(sh&&ownd(sh))act.push(mg?'sh'+sh.slice(2):sh);
S.items=act}
function equip(id){var s=slotOf(id);if(s)S.eq[s]=id;ACT()}
function autoEq(id){var s=slotOf(id);if(s&&!S.eq[s])S.eq[s]=id}
var MI=[{id:'sc1',t:'Sceptre d’argent',cost:120},{id:'sc2',t:'Sceptre du dragon',cost:0},{id:'sc3',t:'Sceptre runique',cost:350},{id:'sc4',t:'Sceptre de vaillance',cost:380},{id:'sc5',t:'Sceptre magique',cost:450},{id:'tu1',t:'Tunique de lin',cost:150},{id:'tu2',t:'Tunique de soie',cost:320},{id:'tu3',t:'Tunique du gardien',cost:420}];
var CAT={};ITEMS.concat(MI).forEach(function(it){CAT[it.id]=it});
var DW={1:'+1 dégât contre le dragon.',2:'+2 dégâts contre le dragon. Butin du Dragon ancestral.',3:'+3 dégâts contre le dragon et +3 or par bonne réponse.',4:'+4 dégâts contre le dragon et 1 bonne réponse de moins contre les ennemis coriaces (2 réponses ou plus).',5:'+3 dégâts contre le dragon, et le sort élémentaire se charge en 3 bonnes réponses au lieu de 4.'};
var DS={1:'Pare un coup sur 5 en moyenne (20 %) : aucun cœur perdu.',2:'Pare un coup sur 3 environ (30 %).',3:'Ajoute 1 cœur (5 au lieu de 4) et pare un coup sur 4 au hasard (25 %).'};
[1,2,3,4,5].forEach(function(n){CAT['sw'+n].d=DW[n];CAT['sc'+n].d=DW[n]});
[1,2,3].forEach(function(n){CAT['sh'+n].d=DS[n];CAT['tu'+n].d=DS[n]});
function secEls(title,ids,slot){var els=[box('<b>'+title+'</b>')];
ids.forEach(function(id){var it=CAT[id];if(!it)return;
if(ownd(id)){if(S.eq[slot]===id)els.push(box('<b>'+esc(it.t)+'</b> <span class="gold">✔ équipé</span><div class="dim">'+esc(it.d)+'</div>'));
else els.push(btn('<b>'+esc(it.t)+'</b> <span class="gold">▶ Équiper</span><div class="dim">'+esc(it.d)+'</div>',function(){equip(id);save();sfx('coin');arsenal()},'menu'))}
else if(!it.cost)els.push(box('🔒 <b>'+esc(it.t)+'</b><div class="dim">'+esc(it.d)+'</div>'));
else els.push(btn('🔒 <b>'+esc(it.t)+'</b> <span class="gold">'+it.cost+' or</span><div class="dim">'+esc(it.d)+'</div>',function(){buyItem(it)},'menu'))});
return els}
buyItem=function(it){if(S.gold<it.cost){sfx('ko');alert('Il te manque '+(it.cost-S.gold)+' or.');return}
S.gold-=it.cost;S.owned.push(it.id);equip(it.id);save();sfx('coin');arsenal()};
arsenal=function(){mode='shop';ACT();hud();if(!playing)play('shop');
var mg=S.hero==='mage',els=[box('<h2>🛡 Arsenal</h2><div class="dim">Un seul objet équipé par catégorie. Le paladin utilise épées et boucliers, la mage sceptres et tuniques. Les accessoires servent aux deux héros.</div>')];
var row=document.createElement('div');row.className='hrow';
[['paladin','⚔ Paladin'],['mage','🔮 Mage']].forEach(function(h){row.appendChild(btn('<b>'+h[1]+'</b>',function(){S.hero=h[0];save();arsenal()},'hsel'+(S.hero===h[0]?' sel':'')))});
var hb=box('<b>Équipement de :</b>');hb.appendChild(row);els.push(hb);
if(mg){els=els.concat(secEls('🪄 Sceptres',SCP,'sc'),secEls('👘 Tuniques',TUN,'tu'))}
else{els=els.concat(secEls('⚔ Épées',WPN,'sw'),secEls('🛡 Boucliers',ARM,'sh'))}
els.push(box('<b>💍 Accessoires</b>'));
['am1','am2'].forEach(function(id){var it=CAT[id];if(!it)return;
if(ownd(id))els.push(box('<b>'+esc(it.t)+'</b> <span class="gold">✔ possédé</span><div class="dim">'+esc(it.d)+'</div>'));
else els.push(btn('🔒 <b>'+esc(it.t)+'</b> <span class="gold">'+it.cost+' or</span><div class="dim">'+esc(it.d)+'</div>',function(){buyItem(it)},'menu'))});
els.push(btn('◀ Menu principal',function(){playing=null;title()},'menu'));set.apply(null,els)};
bossKill=function(){run.boss=false;run.bossDone=true;var mg=S.hero==='mage',extra='<br><b class="gold">Le dragon s’effondre !</b>';
var w=mg?['sc2','sc3','Sceptre du dragon']:['sw2','sw3','Lame du dragon'],s1=mg?['tu1','tu2','Tunique de lin']:['sh1','sh2','Bouclier de chêne'];
if(!ownd(w[0])&&!ownd(w[1])){S.owned.push(w[0]);autoEq(w[0]);extra+=' Butin : <b>'+w[2]+'</b> !'}else{S.gold+=60;run.earned+=60;extra+=' Trésor : +60 or.'}
if(!ownd(s1[0])&&!ownd(s1[1])&&Math.random()<.34){S.owned.push(s1[0]);autoEq(s1[0]);extra+=' Butin : <b>'+s1[2]+'</b> !'}
else if(!ownd('am1')&&Math.random()<.25){S.owned.push('am1');extra+=' Butin : <b>Collier de fuite</b> !'}
ACT();return extra+bossCodeMsg()};
var oh6=hud;hud=function(e){ACT();oh6(e)};
var otp6=themePick;themePick=function(){ACT();otp6()};
var sq3=startQuiz;
startQuiz=function(){ACT();sq3();if(!run)return;if(hasI('sw4'))run.bossDmg+=3;if(hasI('sw5'))run.bossDmg+=3;run.bossNeed=Math.ceil((run.bossMax||10)/run.bossDmg);
run.o0=S.owned.slice();run.e0=JSON.parse(JSON.stringify(S.eq));hud(prog())};
var oab3=abandonRun;
abandonRun=function(){var r=run;oab3();if(r&&r.over&&r.o0){S.owned=r.o0;S.eq=r.e0;ACT();save()}};
var ohs3=heroState;
heroState=function(){var o=ohs3();if(hasI('sh3')&&!o.shield)o.shield=2;return o};
var BGP={},bgCur=null,bgPrev=null,bgFade=0,CLC={night:'#6c7cc8',morning:'#ffe8e0',noon:'#ffffff',evening:'#ffbf9a',day:'#ffffff'};
function phaseKey(){if(typeof run==='undefined'||!run)return 'night';if(mode==='win')return 'morning';var r=run.reg||0;return r<4?'morning':r<8?'noon':r<12?'evening':'night'}
function drawBG(th){var im=BG[th]||BG.night;if(bgCur!==th){bgPrev=bgCur&&BG[bgCur]?BG[bgCur]:null;bgCur=th;bgFade=bgPrev?36:0}
if(bgFade>0){cx.drawImage(bgPrev,0,0);cx.globalAlpha=1-bgFade/36;cx.drawImage(im,0,0);cx.globalAlpha=1;bgFade--}else cx.drawImage(im,0,0)}
function bgGrade(b,top,mid,low,glow){var c=b.getContext('2d');c.save();c.globalCompositeOperation='multiply';var g=c.createLinearGradient(0,0,0,H);g.addColorStop(0,top);g.addColorStop(.62,mid);g.addColorStop(1,low);c.fillStyle=g;c.fillRect(0,0,W,H);
c.globalCompositeOperation='source-over';var h=c.createLinearGradient(0,50,0,140);h.addColorStop(0,'rgba(255,160,100,0)');h.addColorStop(.7,glow);h.addColorStop(1,'rgba(255,160,100,0)');c.fillStyle=h;c.fillRect(0,50,W,90);c.restore();return b}
function bgCopy(b){var n=document.createElement('canvas');n.width=W;n.height=H;n.getContext('2d').drawImage(b,0,0);return n}
(function(){var mk=null;
try{var src=buildBG.toString().replace('function buildBG(theme)','function(theme,SX,SY)').split('252+Math.cos(a1)*300,34+Math.sin(a1)*300').join('SX+Math.cos(a1)*300,SY+Math.sin(a1)*300').split('252+Math.cos(a2)*300,34+Math.sin(a2)*300').join('SX+Math.cos(a2)*300,SY+Math.sin(a2)*300').split('252,34').join('SX,SY');
if(src.indexOf('SX,SY')>=0&&src.indexOf('252,34')<0)mk=(0,eval)('('+src+')')}catch(e){mk=null}
var day=function(x,y){return mk?mk('day',x,y):bgCopy(BG.day)};
BGP.morning=bgGrade(day(64,86),'#c8bcf4','#ffe2cc','#d8c8a8','rgba(255,170,120,.35)');
BGP.noon=day(230,22);
BGP.evening=bgGrade(day(248,90),'#8a6cc4','#ffae70','#b07850','rgba(255,110,60,.4)');
BG.morning=BGP.morning;BG.noon=BGP.noon;BG.evening=BGP.evening})();
QP('scene',[["const th=(mode==='shop'||mode==='gal')?'day':'night';","const th=(mode==='shop'||mode==='gal')?'day':phaseKey();"],["cx.drawImage(BG[th],0,0);","drawBG(th);"],["th==='night'?'#6c7cc8':'#ffffff'","(CLC[th]||'#ffffff')"]]);
ACT();
