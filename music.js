const NB={C:0,D:2,E:4,F:5,G:7,A:9,B:11};
function mid(n){const m=/^([A-G])([#b]?)(\d)$/.exec(n);return 12*(+m[3]+1)+NB[m[1]]+(m[2]==='#'?1:m[2]==='b'?-1:0)}
function seq(s){let t=0;const o=[];s.trim().split(/\s+/).forEach(k=>{const p=k.split('/'),l=+p[1];if(p[0]!=='r')o.push({t,m:mid(p[0]),l});t+=l});return{o,total:t}}
function chordOf(nm){const m=/^([A-G][#b]?)(m?)$/.exec(nm);const r=mid(m[1]+'2');return{root:r,tones:[r+12,r+12+(m[2]?3:4),r+12+7]}}
const TRK={
title:{bpm:68,loop:1,arp:2,chords:['Am','F','C','G','Am','F','Dm','E'],parts:[['flute','E5/6 D5/2 C5/4 D5/2 E5/2 F5/6 E5/2 C5/4 A4/4 G5/6 E5/2 C5/4 E5/4 D5/8 B4/4 G4/4 E5/4 A5/4 G5/4 E5/4 F5/4 A5/4 C6/4 A5/4 D6/6 C6/2 A5/4 F5/4 E5/8 G#5/4 B5/4']]},
quiz:{bpm:132,loop:1,perc:1,bass:[0,2,4,6,8,10,12,14],bl:2,chords:['Em','Em','C','D','Em','Em','C','B'],parts:[['brass','E5/4 r/2 G5/2 B5/4 G5/4 E5/4 F#5/4 G5/4 B5/4 C6/4 B5/4 G5/4 E5/4 F#5/4 A5/4 D6/8 E5/4 r/2 G5/2 B5/4 E6/4 D6/4 B5/4 G5/4 B5/4 C6/4 E6/4 D6/4 C6/4 B5/8 D#6/4 F#6/4']]},
shop:{bpm:92,loop:1,arp:2,chords:['D','Bm','G','A','D','Bm','Em','A'],parts:[['flute','F#5/4 A5/4 D6/4 A5/4 D6/6 C#6/2 B5/4 F#5/4 B5/4 D6/4 G5/4 B5/4 A5/8 E5/4 A5/4 F#5/4 A5/4 D6/4 F#6/4 E6/6 D6/2 B5/4 D6/4 G5/4 B5/4 E6/4 B5/4 C#6/6 B5/2 A5/8']]},
victory:{bpm:124,loop:0,next:'title',arp:2,chords:['C','F','G','C'],parts:[['brass','C5/4 E5/4 G5/4 C6/4 A5/4 F5/4 A5/4 C6/4 B5/4 G5/4 B5/4 D6/4 C6/12 r/4']]},
defeat:{bpm:56,loop:0,next:'title',chords:['Am','Dm','E','Am'],parts:[['flute','A4/8 G4/4 E4/4 F4/8 E4/4 D4/4 E4/8 G#4/4 B4/4 A4/16']]},
bn1:{bpm:118,loop:1,arp:2,bass:[0,4,8,12],chords:['Am','Am','Em','Am'],parts:[['flute','E5/4 B4/2 C5/2 D5/4 C5/2 B4/2 A4/4 A4/2 C5/2 E5/4 D5/2 C5/2 B4/6 C5/2 D5/4 E5/4 C5/4 A4/4 A4/8']]},
bn2:{bpm:100,loop:1,arp:2,chords:['C','G','C','G'],parts:[['flute','E5/4 E5/4 F5/4 G5/4 G5/4 F5/4 E5/4 D5/4 C5/4 C5/4 D5/4 E5/4 E5/6 D5/2 D5/8']]},
bn3:{bpm:84,loop:1,arp:2,chords:['C','C','G','C'],parts:[['flute','C5/4 C5/4 C5/4 D5/4 E5/8 D5/8 C5/4 E5/4 D5/4 D5/4 C5/16']]},
bn4:{bpm:112,loop:1,arp:2,chords:['Am','Am','E','Am'],parts:[['flute','E5/2 D#5/2 E5/2 D#5/2 E5/2 B4/2 D5/2 C5/2 A4/4 r/2 C4/2 E4/2 A4/2 B4/4 r/2 E4/2 G#4/2 B4/2 C5/4 r/4 r/2 E4/2 C5/2 B4/2 A4/8']]},
bn5:{bpm:112,loop:1,arp:2,chords:['C','G','Am','F'],parts:[['flute','E5/4 G5/4 C6/4 G5/4 D5/4 G5/4 B5/4 G5/4 C5/4 E5/4 A5/4 E5/4 F5/4 A5/4 C6/8']]},
bn6:{bpm:76,loop:1,arp:2,chords:['Dm','Bb','Gm','A'],parts:[['flute','D5/6 F5/2 A5/8 Bb5/6 A5/2 F5/8 G5/6 Bb5/2 D6/8 C#6/8 E6/4 A5/4']]},
bn7:{bpm:84,loop:1,arp:2,chords:['Em','C','Am','B'],parts:[['flute','B4/8 E5/4 G5/4 G5/8 E5/4 C5/4 A4/6 C5/2 E5/8 D#5/8 F#5/4 B4/4']]},
bn8:{bpm:144,loop:1,perc:1,bass:[0,2,4,6,8,10,12,14],bl:2,chords:['Cm','Ab','Bb','G'],parts:[['brass','C5/4 Eb5/4 G5/4 C6/4 Ab5/4 C6/4 Eb6/8 Bb5/4 D6/4 F6/8 G5/4 B5/4 D6/8']]}
};
let AC,master,dry,rev,NOISE,cur=null,timer=null,step=0,nextT=0,evs=null,TL=0,DT=.1,once=false;
function ensure(){if(AC){if(AC.state==='suspended')AC.resume();return}
AC=new (window.AudioContext||window.webkitAudioContext)();
const comp=AC.createDynamicsCompressor();master=AC.createGain();master.gain.value=.55;master.connect(comp);comp.connect(AC.destination);
dry=AC.createGain();dry.connect(master);
rev=AC.createConvolver();const L=Math.floor(AC.sampleRate*2.4),ir=AC.createBuffer(2,L,AC.sampleRate);
for(let ch=0;ch<2;ch++){const d=ir.getChannelData(ch);for(let i=0;i<L;i++)d[i]=(Math.random()*2-1)*Math.pow(1-i/L,2.6)}
rev.buffer=ir;const wg=AC.createGain();wg.gain.value=.38;rev.connect(wg);wg.connect(master);
NOISE=AC.createBuffer(1,AC.sampleRate,AC.sampleRate);const nd=NOISE.getChannelData(0);for(let i=0;i<nd.length;i++)nd[i]=Math.random()*2-1}
const mf=n=>440*Math.pow(2,(n-69)/12);
function env(g,t,a,d,r,v){const h=Math.max(a,d);g.gain.setValueAtTime(.0001,t);g.gain.linearRampToValueAtTime(v,t+a);g.gain.setValueAtTime(v,t+h);g.gain.exponentialRampToValueAtTime(.0001,t+h+r)}
function osc(type,f,t,e,det){const o=AC.createOscillator();o.type=type;o.frequency.value=f;if(det)o.detune.value=det;o.start(t);o.stop(e);return o}
function wire(g,wet){g.connect(dry);if(wet!==0)g.connect(rev)}
const INST={
flute(m,t,d){const f=mf(m),g=AC.createGain(),e=t+d+.5;env(g,t,.07,d,.3,.24);
const o=osc('sine',f,t,e),o2=osc('triangle',f*2,t,e),g2=AC.createGain();g2.gain.value=.1;
const lfo=osc('sine',5.1,t,e),lg=AC.createGain();lg.gain.setValueAtTime(0,t);lg.gain.linearRampToValueAtTime(f*.008,t+.3);lfo.connect(lg);lg.connect(o.frequency);
o.connect(g);o2.connect(g2);g2.connect(g);wire(g)},
brass(m,t,d){const f=mf(m),g=AC.createGain(),lp=AC.createBiquadFilter(),e=t+d+.4;lp.type='lowpass';lp.Q.value=2;lp.frequency.setValueAtTime(500,t);lp.frequency.linearRampToValueAtTime(2800,t+.12);
env(g,t,.05,d,.25,.13);osc('sawtooth',f,t,e,-5).connect(lp);osc('sawtooth',f,t,e,6).connect(lp);lp.connect(g);wire(g)},
strings(m,t,d){const f=mf(m),g=AC.createGain(),lp=AC.createBiquadFilter(),e=t+d+1.4;lp.type='lowpass';lp.frequency.value=1500;
env(g,t,.5,d,.8,.045);osc('sawtooth',f,t,e,-9).connect(lp);osc('sawtooth',f,t,e,9).connect(lp);osc('triangle',f/2,t,e).connect(lp);lp.connect(g);wire(g)},
harp(m,t){const f=mf(m),g=AC.createGain(),e=t+1.3,g2=AC.createGain();g2.gain.value=.3;
g.gain.setValueAtTime(.0001,t);g.gain.linearRampToValueAtTime(.2,t+.006);g.gain.exponentialRampToValueAtTime(.0001,t+1.1);
osc('triangle',f,t,e).connect(g);osc('sine',f*2,t,e).connect(g2);g2.connect(g);wire(g)},
bass(m,t,d){const f=mf(m),g=AC.createGain();env(g,t,.01,d*.9,.12,.36);osc('triangle',f,t,t+d+.3).connect(g);wire(g,0)}};
function kick(t){const g=AC.createGain(),o=osc('sine',130,t,t+.4);o.frequency.exponentialRampToValueAtTime(42,t+.14);g.gain.setValueAtTime(.55,t);g.gain.exponentialRampToValueAtTime(.0001,t+.32);o.connect(g);wire(g,0)}
function noise(t,f,type,v,d){const s=AC.createBufferSource();s.buffer=NOISE;const fl=AC.createBiquadFilter();fl.type=type;fl.frequency.value=f;const g=AC.createGain();g.gain.setValueAtTime(v,t);g.gain.exponentialRampToValueAtTime(.0001,t+d);s.connect(fl);fl.connect(g);wire(g,type==='bandpass'?1:0);s.start(t);s.stop(t+d+.05)}
function fire(e,t){if(e.k==='n')INST[e.i](e.m,t,e.l*DT);else if(e.k==='p')e.ms.forEach(m=>INST.strings(m,t,e.l*DT));else if(e.k==='k')kick(t);else if(e.k==='s')noise(t,1800,'bandpass',.22,.17);else noise(t,7000,'highpass',.05,.05)}
function build(d){const len=d.chords.length*16,ev=Array.from({length:len},()=>[]);
d.parts.forEach(p=>seq(p[1]).o.forEach(n=>ev[n.t].push({k:'n',i:p[0],m:n.m,l:n.l})));
d.chords.forEach((nm,b)=>{const c=chordOf(nm),o=b*16;ev[o].push({k:'p',ms:c.tones,l:16});
(d.bass||[0,8]).forEach(s=>ev[o+s].push({k:'n',i:'bass',m:c.root,l:d.bl||4}));
if(d.arp)for(let s=0;s<16;s+=d.arp)ev[o+s].push({k:'n',i:'harp',m:c.tones[[0,1,2,1][(s/d.arp)%4]]+12,l:2});
if(d.perc){[0,8,10].forEach(s=>ev[o+s].push({k:'k'}));[4,12].forEach(s=>ev[o+s].push({k:'s'}));for(let s=0;s<16;s+=2)ev[o+s].push({k:'h'})}});
return{ev,len}}
function tick(){while(nextT<AC.currentTime+.4){if(step>=TL&&once){clearInterval(timer);timer=null;const nx=TRK[cur].next,nm=cur;setTimeout(()=>{if(cur===nm){cur=null;if(nx)play(nx)}},Math.max(0,(nextT-AC.currentTime+1.5)*1000));return}
evs[step%TL].forEach(e=>fire(e,nextT));nextT+=DT;step++}}
function stop(){clearInterval(timer);timer=null;cur=null}
function play(name){if(!S.music){stop();return}ensure();if(cur===name)return;stop();const d=TRK[name],b=build(d);evs=b.ev;TL=b.len;cur=name;once=!d.loop;step=0;DT=60/d.bpm/4;nextT=AC.currentTime+.12;timer=setInterval(tick,50)}
function sfx(k){if(!S.music)return;ensure();const t=AC.currentTime;
if(k==='ok')[76,80,83,88].forEach((n,i)=>INST.harp(n,t+i*.07));
if(k==='ko'){INST.brass(45,t,.3);INST.brass(40,t+.2,.5)}
if(k==='coin'){INST.harp(96,t);INST.harp(103,t+.08)}}
