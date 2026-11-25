TRK.home={bpm:72,loop:1,sp:{tonic:2,minor:true,seed:77,sec:[{id:'I',bars:4,int:.7,mel:false},{id:'A',bars:8,int:.6,inst:['brass'],lo:62,hi:84},{ref:'A',bars:8,int:.8,inst:['brass','flute','horn'],lo:62,hi:84},{id:'B',bars:8,int:.7,inst:['flute'],lo:65,hi:86},{id:'C',bars:4,int:.4,mel:false},{ref:'A',tr:3,bars:8,int:1,inst:['brass','flute','horn'],lo:62,hi:84},{ref:'A',bars:4,int:.5,inst:['flute'],lo:62,hi:84}]}};
TRK.gameover={bpm:50,loop:1,sp:{tonic:9,minor:true,seed:91,sec:[{id:'I',bars:4,int:.15,mel:false},{id:'A',bars:8,int:.25,inst:['flute'],lo:57,hi:76},{ref:'A',bars:8,int:.35,inst:['flute','horn'],lo:57,hi:76},{id:'B',bars:8,int:.5,inst:['horn','flute'],lo:55,hi:74},{ref:'A',bars:4,int:.15,inst:['flute'],lo:57,hi:76}]}};
TRK.quiz={bpm:150,loop:1,hc:{secs:{
I:{chords:['Em','Em','C','D'],mel:''},
A:{chords:['Em','C','G','D','Em','C','D','B'],mel:'E5/4 E5/2 G5/2 B5/4 A5/2 G5/2 G5/4 G5/2 E5/2 C5/4 E5/4 D5/4 D5/2 G5/2 B5/4 D6/4 A5/4 F#5/2 A5/2 D6/8 E5/4 E5/2 G5/2 B5/4 A5/2 G5/2 G5/4 G5/2 E5/2 C6/4 B5/2 A5/2 F#5/4 A5/4 D6/4 F#6/4 D#6/6 B5/2 F#5/4 B5/4'},
B:{chords:['C','D','Em','Em','C','D','B','B'],mel:'C6/6 B5/2 G5/4 C6/4 D6/6 A5/2 F#5/4 A5/4 E6/4 D6/4 B5/4 G5/4 G5/2 B5/2 E6/12 E6/4 G6/4 E6/4 C6/4 F#6/4 A6/4 F#6/4 D6/4 D#6/8 B5/4 F#5/4 B5/12 r/4'},
C:{chords:['Am','C','D','Em','Am','C','B','B'],mel:'A5/8 C6/4 B5/4 G5/8 E5/4 G5/4 F#5/8 A5/4 D6/4 E5/12 G5/2 B5/2 A5/6 C6/2 E6/8 D6/4 C6/4 G5/4 E5/4 D#5/4 F#5/4 B5/4 D#6/4 B5/12 r/4'}},
order:[{s:'I',int:.6,inst:[]},{s:'A',int:.7,inst:['brass']},{s:'A',int:.85,inst:['brass','flute','horn']},{s:'B',int:.9,inst:['brass','flute']},{s:'C',int:.4,inst:['flute']},{s:'A',tr:2,int:1,inst:['brass','flute','horn']},{s:'B',tr:2,int:1,inst:['brass','flute','horn']},{s:'A',int:.8,inst:['brass','flute']}]}};
TRK.boss={bpm:160,loop:1,hc:{secs:{
I:{chords:['Am','Am','F','E'],mel:''},
A:{chords:['Am','Am','F','E','Am','Am','F','E'],mel:'A5/2 A5/2 C6/4 A5/2 G#5/2 A5/4 A5/2 A5/2 E6/4 D6/2 C6/2 B5/4 F5/2 F5/2 A5/4 C6/2 B5/2 A5/4 G#5/4 B5/4 E6/4 D#6/2 E6/2 A5/2 A5/2 C6/4 E6/4 A5/4 G#5/2 A5/2 B5/2 C6/2 D6/4 E6/4 F6/4 E6/4 D6/4 C6/4 B5/8 G#5/4 E5/4'},
B:{chords:['Dm','E','Am','Am','F','G','E','E'],mel:'D6/4 D6/2 F6/2 A5/4 D6/4 E6/4 E6/2 G#5/2 B5/4 E6/4 C6/6 B5/2 A5/4 E5/4 A5/8 C6/4 E6/4 F6/4 A5/4 C6/4 F6/4 G6/4 B5/4 D6/4 G6/4 E6/4 G#5/4 B5/4 E6/4 E6/12 r/4'}},
order:[{s:'I',int:.8,inst:[]},{s:'A',int:.9,inst:['brass']},{s:'A',int:1,inst:['brass','flute','horn']},{s:'B',int:1,inst:['brass','flute']},{s:'A',int:.45,inst:['flute']},{s:'A',tr:2,int:1,inst:['brass','flute','horn']},{s:'B',tr:2,int:1,inst:['brass','flute','horn']}]}};
function tName(nm,tr){const m=/^([A-G][#b]?)(m?)$/.exec(nm);return PCN[(mid(m[1]+'2')+tr)%12]+m[2]}
function hcBars(h){const bars=[];h.order.forEach(o=>{const s=h.secs[o.s],tr=o.tr||0,n=s.chords.length,mel=s.mel?seq(s.mel).o:[];
s.chords.forEach((ch,b)=>bars.push({chord:tName(ch,tr),int:o.int,mel:mel.filter(x=>x.t>=b*16&&x.t<b*16+16).map(x=>({t:x.t-b*16,m:x.m+tr,l:x.l})),inst:o.inst,first:b===0,last:b===n-1}))});return bars}
function build(d){return evFromBars(d.hc?hcBars(d.hc):d.sp?composeBars(d.sp):fixedBars(d))}
INST.piano=function(m,t,d,v){v=v||1;const f=mf(m),g=AC.createGain(),lp=AC.createBiquadFilter(),dur=Math.min(d+.5,1.8),e=t+dur+.1,g2=AC.createGain(),g3=AC.createGain();
lp.type='lowpass';lp.frequency.setValueAtTime(Math.min(7000,f*9),t);lp.frequency.exponentialRampToValueAtTime(Math.max(900,f*2.2),t+.5);
g.gain.setValueAtTime(.0001,t);g.gain.linearRampToValueAtTime(.27*v,t+.004);g.gain.exponentialRampToValueAtTime(.1*v,t+.22);g.gain.exponentialRampToValueAtTime(.0001,t+dur);
g2.gain.value=.35;g3.gain.value=.1;
osc('triangle',f,t,e).connect(lp);osc('sine',f,t,e,5).connect(lp);osc('sine',f*2,t,e).connect(g2);g2.connect(lp);osc('square',f*3,t,e).connect(g3);g3.connect(lp);
lp.connect(g);noise(t,Math.min(f*4,6000),'bandpass',.03*v,.03);wire(g)};
function tom(t,f){f=f||160;const g=AC.createGain(),o=osc('sine',f,t,t+.4);o.frequency.exponentialRampToValueAtTime(f*.5,t+.25);g.gain.setValueAtTime(.42,t);g.gain.exponentialRampToValueAtTime(.0001,t+.3);o.connect(g);wire(g,0)}
function fire(e,t){const k=e.k;if(k==='n')INST[e.i](e.m,t,e.l*DT,e.v);else if(k==='p')e.ms.forEach((m,i)=>INST.piano(m,t+i*.012,e.l*DT,e.v));else if(k==='k')kick(t);else if(k==='s')noise(t,1800,'bandpass',.2,.17);else if(k==='c')noise(t,5000,'highpass',.1,.9);else if(k==='t')tom(t,e.f);else if(k==='b')noise(t,9500,'bandpass',.07,.06);else if(k==='o')noise(t,6500,'highpass',.07,.22);else noise(t,7000,'highpass',.05,.05)}
function evFromBars(bars){const len=bars.length*16,ev=Array.from({length:len},()=>[]);
bars.forEach((b,i)=>{const o=i*16,c=chordOf(b.chord),I=b.int,v=.5+.5*I;
ev[o].push({k:'p',ms:c.tones,l:8,v:.55+.45*I});
if(I>=.45)ev[o+8].push({k:'p',ms:c.tones,l:8,v:.5+.4*I});
if(I>=.75)[6,14].forEach(s=>ev[o+s].push({k:'p',ms:c.tones.map(m=>m+12),l:2,v:.42}));
if(I>=.85){ev[o].push({k:'n',i:'horn',m:c.root+12,l:16,v:.8});ev[o].push({k:'n',i:'horn',m:c.root+19,l:16,v:.6})}
if(I>=.8)[0,8].forEach(s=>c.tones.forEach(m=>ev[o+s].push({k:'n',i:'brass',m:m+12,l:2,v:.4})));
const bs=I<.3?[0]:I<.6?[0,8]:I<.85?[0,4,8,12]:[0,2,4,6,8,10,12,14];
bs.forEach((s,k)=>ev[o+s].push({k:'n',i:'bass',m:c.root+(I>=.85&&k%2?12:0),l:bs.length>4?2:4,v}));
const as=I<.3?4:2;for(let s=0;s<16;s+=as)ev[o+s].push({k:'n',i:'piano',m:c.tones[[0,1,2,1][(s/as)%4]]+12+(I>.8&&s>=8?12:0),l:2,v:.5+.3*I});
if(I>=.25){ev[o].push({k:'k'});if(I>=.4)ev[o+8].push({k:'k'})}
if(I>=.35)for(let s=0;s<16;s+=4)ev[o+s].push({k:'h'});
if(I>=.45)[4,12].forEach(s=>ev[o+s].push({k:'s'}));
if(I>=.5)[2,6,10,14].forEach(s=>ev[o+s].push({k:'b'}));
if(I>=.6)[6,14].forEach(s=>ev[o+s].push({k:'o'}));
if(I>=.7)ev[o+10].push({k:'k'});
if(I>=.8)for(let s=0;s<16;s+=2)ev[o+s].push({k:'h'});
if(I>=.9){ev[o+3].push({k:'k'});ev[o+7].push({k:'s'});ev[o+15].push({k:'s'})}
if(I>=.95)ev[o].push({k:'t',f:90});
if(I>=.7&&b.first)ev[o].push({k:'c'});
if(b.last&&I>=.55){[8,9,10,11].forEach((s,k)=>ev[o+s].push({k:'t',f:[230,195,160,130][k]}));[12,13,14,15].forEach(s=>ev[o+s].push({k:'s'}))}
b.mel.forEach(n=>b.inst.forEach(ins=>ev[o+n.t].push({k:'n',i:ins,m:ins==='horn'?n.m-12:n.m,l:n.l,v:(ins==='horn'?.6:1)*(.6+.4*I)})))});
return{ev,len}}
function sfx(k){if(!S.music)return;ensure();const t=AC.currentTime;
if(k==='ok')[76,80,83,88].forEach((n,i)=>INST.harp(n,t+i*.07));
if(k==='ko'){INST.brass(45,t,.3);INST.brass(40,t+.2,.5)}
if(k==='coin'){INST.harp(96,t);INST.harp(103,t+.08)}
if(k==='block'){noise(t,3200,'bandpass',.28,.14);INST.harp(100,t);INST.harp(107,t+.05)}
if(k==='alert'){INST.brass(33,t,.6);INST.brass(34,t+.45,.9);kick(t);kick(t+.45)}
if(k==='charge'){[64,67,71,76,83,88].forEach((n,i)=>INST.piano(n,t+i*.07,.4,.9));noise(t+.4,6000,'highpass',.1,.5)}
if(k==='special'){[60,64,67,72,76,79,84,88,91,96].forEach((n,i)=>INST.piano(n,t+i*.05,.5,.9));INST.brass(48,t+.5,.9);INST.brass(55,t+.5,.9);INST.horn(60,t+.5,1);kick(t+.5);noise(t+.5,5000,'highpass',.2,1)}}
