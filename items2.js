/* v1.22.0 : 4 nouveaux objets, dragon a 20 PV, code du savoir (+2 vies) */
S.dragonCodes=S.dragonCodes||[];S.bonusLives=S.bonusLives||0;S.usedCodes=S.usedCodes||[];
function chMax(){return hasI('sw5')?3:4}
function shP3(){return hasI('sh3')?.25:shP()}
function QP(name,pairs){var f=window[name];if(typeof f!=='function'){showErr('maj: '+name+' introuvable');return}
var s=f.toString();for(var i=0;i<pairs.length;i++){if(s.indexOf(pairs[i][0])<0){showErr('maj: '+name+' motif '+(i+1)+' absent');return}s=s.split(pairs[i][0]).join(pairs[i][1])}
window[name]=(0,eval)('('+s+')')}
var DODGE=`if(hasI('am2')&&Math.random()<.25){run.dodges=(run.dodges||0)+1;blkT=26;sfx('block');setTimeout(()=>{shk=4;fl.push({t:'ESQUIVE !',x:50,y:60,c:'#a0ffb0',life:60})},300);info.innerHTML+="<hr><span style='color:#a0ffb0'>🌀 Ton bracelet d'agilité t'aide à esquiver : aucun cœur perdu !</span><br>Bonne réponse : <span class='gold'>"+esc(q.a[0])+"</span>"+cl+"<br><span class='dim'>"+esc(q.e)+"</span>"}else if((shTier()||hasI('sh3'))&&Math.random()<shP3()){run.blocks++;`;
QP('scene',[["const c=run.charge||0,full=c>=4;for(let i=0;i<4;i++){","const c=run.charge||0,full=c>=chMax();for(let i=0;i<chMax();i++){"]]);
QP('ask',[["if(run.charge>=4)sp=btn(","if(run.charge>=chMax())sp=btn("],["Math.max(0,run.bossHP)/10","Math.max(0,run.bossHP)/(run.bossMax||10)"]]);
QP('answer',[["Math.min(4,run.charge+1)","Math.min(chMax(),run.charge+1)"],["run.hp<4&&Math.random()<.35","run.hp<(run.hpMax||4)&&Math.random()<.35"],["Math.max(0,run.bossHP)/10","Math.max(0,run.bossHP)/(run.bossMax||10)"],["run.charge===4&&prev<4","run.charge===chMax()&&prev<chMax()"],["if(shTier()&&Math.random()<shP()){run.blocks++;",DODGE]]);
QP('ocs',[["run.bossHP-=5;","run.bossHP-=(run.bossMax||10)/2;"],["Math.ceil((10-Math.max(run.bossHP,0))/run.bossDmg)","Math.ceil(((run.bossMax||10)-Math.max(run.bossHP,0))/run.bossDmg)"],["Math.max(0,run.bossHP)/10","Math.max(0,run.bossHP)/(run.bossMax||10)"],["t:'-5 PV'","t:'-'+(((run&&run.bossMax)||10)/2)+' PV'"]]);
QP('bossIntro',[["run.bossHP=10;","run.bossHP=run.bossMax||10;"]]);
QP('bossKill',[["return extra}","extra+=bossCodeMsg();return extra}"]]);
var CODEBANK=[['PYTHAGORE-A2B2C2','Pythagore : dans un triangle rectangle, a² + b² = c².'],['THALES-PARALLELES','Thalès : des droites parallèles découpent des segments proportionnels.'],['ARCHIMEDE-EUREKA','Archimède : un corps plongé dans un liquide reçoit une poussée vers le haut.'],['PI-314159','π vaut environ 3,14159 : c’est le rapport entre la circonférence d’un cercle et son diamètre.'],['AIRE-RECTANGLE','L’aire d’un rectangle = longueur × largeur.'],['H2O-EAU','H₂O : l’eau est faite de 2 atomes d’hydrogène et 1 d’oxygène.'],['CO2-CARBONE','CO₂ : le dioxyde de carbone, que les plantes absorbent.'],['PHOTOSYNTHESE','La photosynthèse : les plantes fabriquent leur nourriture avec la lumière, l’eau et le CO₂.'],['NEWTON-GRAVITE','Newton : la gravité attire les objets vers la Terre.'],['VERCINGETORIX-52','Vercingétorix est vaincu à Alésia en 52 avant J.-C.'],['CHARLEMAGNE-800','Charlemagne est couronné empereur en l’an 800.'],['MARIGNAN-1515','François Ier gagne la bataille de Marignan en 1515.'],['BASTILLE-1789','La prise de la Bastille a lieu le 14 juillet 1789.'],['ARMISTICE-1918','L’armistice du 11 novembre 1918 met fin à la Première Guerre mondiale.'],['GUTENBERG-1450','Gutenberg met au point l’imprimerie vers 1450.'],['COLOMB-1492','Christophe Colomb atteint l’Amérique en 1492.'],['MONT-BLANC-4806','Le mont Blanc culmine à environ 4 800 mètres.'],['EQUATEUR-0','L’équateur est la latitude 0° : il partage la Terre en deux hémisphères.'],['MOLIERE-AVARE','Molière a écrit L’Avare et Le Malade imaginaire.'],['VICTOR-HUGO-1862','Victor Hugo publie Les Misérables en 1862.'],['HELLO-BONJOUR','Hello veut dire bonjour en anglais.'],['SEVEN-SEPT','Seven veut dire sept en anglais.'],['FRACTION-3-4','La fraction 3/4 représente trois parts sur quatre.'],['SOLEIL-ETOILE','Le Soleil est une étoile au centre du système solaire.'],['LOIRE-1006','La Loire mesure environ 1 000 km : c’est le plus long fleuve de France.'],['DARWIN-EVOLUTION','Darwin propose la théorie de l’évolution par sélection naturelle.'],['PASTEUR-1885','Pasteur teste le vaccin contre la rage en 1885.'],['LUMIERE-300000','La lumière va à environ 300 000 km par seconde.']];
function rs3(){var a='ABCDEFGHJKLMNPQRSTUVWXYZ23456789',o='',i;for(i=0;i<3;i++)o+=a[Math.floor(Math.random()*a.length)];return o}
function bossCodeMsg(){var e=CODEBANK[Math.floor(Math.random()*CODEBANK.length)],c,k=0;
do{c=e[0]+'-'+rs3();k++}while((S.dragonCodes.indexOf(c)>=0||S.usedCodes.indexOf(c)>=0)&&k<30);
S.dragonCodes.push(c);save();
return "<br>🔑 <b class='gold'>Code du savoir : "+c+"</b><div class='dim'>"+e[1]+" À saisir dans « Nouvelle quête » → Code bonus : +2 vies pour ta prochaine quête, utilisable une seule fois.</div>"}
var orc=redeemCode;
redeemCode=function(raw){var c=String(raw||'').trim().toUpperCase().split(' ').join(''),i=S.dragonCodes.indexOf(c);
if(c&&i>=0){S.dragonCodes.splice(i,1);S.usedCodes.push(c);S.bonusLives=(S.bonusLives||0)+2;save();return{ok:true,m:'✨ Code du savoir accepté : +2 vies pour ta prochaine quête !'}}
return orc(raw)};
var ocb=codeBox;
codeBox=function(){var d=ocb(),l=S.dragonCodes||[];if(l.length){var n=document.createElement('div');n.className='dim';n.textContent='🔑 Codes du dragon en attente : '+l.join(' · ');d.insertBefore(n,d.children[2]||null)}return d};
ITEMS.push({id:'sw4',t:'Épée de vaillance',cost:380,d:'Plus puissante : contre les ennemis coriaces (2 réponses ou plus), il faut 1 bonne réponse de moins pour les abattre. Le dragon encaisse aussi un coup de plus.'},
{id:'sw5',t:'Épée magique',cost:450,d:'Lame enchantée : il faut 1 bonne réponse de moins pour charger le sort élémentaire (3 au lieu de 4).'},
{id:'sh3',t:'Bouclier du gardien',cost:420,d:'Plus résistant : ajoute 1 cœur (5 au lieu de 4) et pare un coup sur 4 au hasard (25 %). Remplace les autres boucliers.'},
{id:'am2',t:'Bracelet d’agilité',cost:360,d:'Esquive un coup sur 4 au hasard (25 %) : une mauvaise réponse ne coûte alors aucun cœur. Se cumule avec le bouclier.'});
var obi=buyItem;
buyItem=function(it){obi(it);if(it.id==='sh3'&&hasI('sh3')&&!hasI('sh2')){S.items.push('sh2');save();arsenal()}};
var sqPrev=startQuiz;
startQuiz=function(){sqPrev();if(!run)return;run.bossMax=20;run.bossHP=20;if(hasI('sw4'))run.bossDmg+=1;run.bossNeed=Math.ceil(run.bossMax/run.bossDmg);
var b=S.bonusLives||0;run.hpMax=4+(hasI('sh3')?1:0)+b;run.hp=run.hpMax;run.c0=(S.dragonCodes||[]).slice();if(b){S.bonusLives=0;run.bonusUsed=b;save()}hud(prog())};
var spPrev=spawn;
spawn=function(){spPrev();if(hasI('sw4')&&run&&run.en&&run.en.hp>=2){run.en.hp--;run.en.max=run.en.hp}};
hearts=function(){var m=run.hpMax||4,h=Math.max(run.hp,0);return '♥'.repeat(h)+'♡'.repeat(Math.max(0,m-h))};
prog=function(){return run.boss?hearts()+' · BOSS '+run.bossHits+'/'+run.bossNeed+' · ✨'+run.charge+'/'+chMax():hearts()+' · '+Math.min(run.reg+1,15)+'/15 · ✨'+run.charge+'/'+chMax()};
var ohs=heroState;
heroState=function(){var o=ohs(),m=hasI('sw5')?3:hasI('sw4')?2:0;if(m>(o.sw||0))o.sw=m;if(run&&run.charge>=chMax()&&!o.el)o.glow=true;return o};
var ohud=hud;
hud=function(extra){ohud(extra);var g=document.querySelector('#hud .gold');if(g)g.textContent+=(hasI('sw4')?' 🗡':'')+(hasI('sw5')?' 🔮':'')+(hasI('sh3')?' 🏰':'')+(hasI('am2')?' 💍':'')+(S.bonusLives?' 🔑+'+S.bonusLives:'')};
var oab=abandonRun;
abandonRun=function(){var r=run;oab();if(r&&r.over&&r.c0){S.dragonCodes=r.c0;if(r.bonusUsed)S.bonusLives=(S.bonusLives||0)+r.bonusUsed;save()}};
