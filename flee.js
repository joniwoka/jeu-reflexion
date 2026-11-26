(function(){
var st=document.createElement('style');st.textContent='#hud{flex-wrap:wrap}button.fleeb{font:inherit;font-size:15px;font-weight:700;color:#fff;background:linear-gradient(#d83030,#781414);border:2px solid #e8e8f4;border-radius:8px;padding:4px 10px;cursor:pointer}';document.head.appendChild(st);
var oh=hud,oe=end,os=startQuiz;
hud=function(extra){oh(extra);if(mode==='quiz'&&run&&!run.over){var b=document.createElement('button');b.className='fleeb';b.textContent='🏃 Fuir';b.onclick=function(){ensure();abandonRun()};$('#hud').appendChild(b)}};
startQuiz=function(){os();if(run){run.g0=S.gold;run.i0=S.items.slice()}};
end=function(){if(run)run.over=true;oe()};
abandonRun=function(){if(!run||run.over||mode!=='quiz')return;
var lost=S.gold-run.g0,newItems=S.items.length-run.i0.length;
if(!confirm('Fuir le combat et abandonner la quête ?\n\nTu retournes au menu principal et tu perds tout ce que tu as gagné pendant cette partie ('+lost+' or'+(newItems>0?' et '+newItems+' butin'+(newItems>1?'s':''):'')+').'))return;
S.gold=run.g0;S.items=run.i0;save();run.over=true;
spT=0;spEl=null;atk=0;eatk=0;hflash=0;eflash=0;edead=false;edie=0;blkT=0;fleeT=0;bossFl=0;walk=0;shk=0;fl=[];
sfxx('flee');title();scr.prepend(box('🏃 Tu as fui le combat : la quête est abandonnée et les gains de la partie sont perdus.'))};
})();
var abandonRun;
