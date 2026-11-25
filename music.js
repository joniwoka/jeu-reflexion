const NB={C:0,D:2,E:4,F:5,G:7,A:9,B:11};
function mid(n){const m=/^([A-G])([#b]?)(\d)$/.exec(n);return 12*(+m[3]+1)+NB[m[1]]+(m[2]==='#'?1:m[2]==='b'?-1:0)}
function seq(s){let t=0;const o=[];s.trim().split(/\s+/).forEach(k=>{const p=k.split('/'),l=+p[1];if(p[0]!=='r')o.push({t,m:mid(p[0]),l});t+=l});return{o,total:t}}
function chordOf(nm){const m=/^([A-G][#b]?)(m?)$/.exec(nm);const r=mid(m[1]+'2');return{root:r,tones:[r+12,r+12+(m[2]?3:4),r+12+7]}}
function rng(s){return()=>{s|=0;s=s+0x6D2B79F5|0;let t=Math.imul(s^s>>>15,1|s);t=t+Math.imul(t^t>>>7,61|t)^t;return((t^t>>>14)>>>0)/4294967296}}
const MIN=[0,2,3,5,7,8,10],MAJ=[0,2,4,5,7,9,11],PCN=['C','Db','D','Eb','E','F','F#','G','Ab','A','Bb','B'];
const RH=[[4,4,4,4],[6,2,4,4],[8,4,4],[4,2,2,4,4],[2,2,4,4,4],[6,2,8],[4,4,8],[12,4],[2,2,2,2,8],[4,4,2,2,4],[2,2,2,2,2,2,4]];
const PM=[['i','VI','III','VII'],['i','iv','VI','V'],['i','VII','VI','V'],['VI','VII','i','i'],['i','III','iv','V'],['i','VI','iv','V']];
const PJ=[['I','V','vi','IV'],['I','vi','IV','V'],['I','iii','IV','V'],['vi','IV','I','V'],['I','IV','V','I'],['I','V','IV','V']];
function romanChord(tonic,minor,rn){const sc=minor?MIN:MAJ,idx={I:0,II:1,III:2,IV:3,V:4,VI:5,VII:6}[rn.toUpperCase()];return PCN[(tonic+sc[idx])%12]+(rn===rn.toLowerCase()?'m':'')}
function scaleNotes(tonic,minor,lo,hi){const sc=minor?MIN:MAJ,o=[];for(let m=lo;m<=hi;m++)if(sc.includes(((m-tonic)%12+12)%12))o.push(m);return o}
function genMelody(o){const r=rng(o.seed),S=scaleNotes(o.tonic,o.minor,o.lo,o.hi),N=S.length,out=[];
const motif=[0,1,2,3].map(()=>RH[Math.floor(r()*RH.length)]);motif[3]=[4,4,8];
let cur=Math.floor(N*.45);const H=[.35,.55,.8,.4];
o.bars.forEach((nm,b)=>{const p=b%4,c=chordOf(nm),pcs=c.tones.map(x=>x%12),ph=Math.floor(b/4)%2,ti=Math.round(Math.min(.95,H[p]+(ph?.1:0))*(N-1));let t=0;const pat=motif[p];
pat.forEach((len,k)=>{let idx;
if(k===0){let best=cur,bd=1e9;S.forEach((m,i)=>{if(pcs.includes(m%12)){const d=Math.abs(i-(cur+Math.max(-3,Math.min(3,ti-cur))))+r()*.8;if(d<bd){bd=d;best=i}}});idx=best}
else{const dir=Math.sign(ti-cur)||1;idx=Math.max(0,Math.min(N-1,cur+(r()<.6?dir:-dir)*(r()<.7?1:2)));
if(t%8===0&&!pcs.includes(S[idx]%12)){const c2=[idx-1,idx+1,idx-2,idx+2].find(i=>i>=0&&i<N&&pcs.includes(S[i]%12));if(c2!=null)idx=c2}}
if(k===pat.length-1&&p===3){let bi=idx,bd=1e9;S.forEach((m,i)=>{const d=((m-c.root)%12+12)%12;if(d===0||d===7){const dd=Math.abs(i-idx);if(dd<bd){bd=dd;bi=i}}});idx=bi}
if(!(len<=2&&r()<.12&&k>0))out.push({bar:b,t,m:S[idx],l:len});cur=idx;t+=len})});return out}
function composeBars(sp){const bars=[],cache={};
sp.sec.forEach((s,si)=>{const tonic=(sp.tonic+(s.tr||0))%12,minor=sp.minor;
let cfg=s.ref?cache[s.ref]:null;
if(!cfg){const r=rng(sp.seed*13+si*7),pr=minor?PM:PJ;let prog=[];for(let i=0;i<s.bars/4;i++)prog=prog.concat(pr[Math.floor(r()*pr.length)]);cfg={prog,seed:sp.seed*31+si*17};if(s.id)cache[s.id]=cfg}
const chords=cfg.prog.slice(0,s.bars).map(rn=>romanChord(tonic,minor,rn));
const mel=s.mel===false?[]:genMelody({bars:chords,tonic,minor,lo:s.lo||64,hi:s.hi||82,seed:cfg.seed});
chords.forEach((ch,b)=>bars.push({chord:ch,int:Math.min(1,s.int+(s.ramp||0)*b),mel:mel.filter(n=>n.bar===b),inst:s.inst||['flute'],first:b===0,last:b===s.bars-1}))});
return bars}
function fixedBars(d){const n=seq(d.parts[0][1]).o,ps=d.passes||[{int:.5,inst:['flute']}],bars=[];
ps.forEach(p=>d.chords.forEach((ch,b)=>bars.push({chord:ch,int:p.int,mel:n.filter(x=>x.t>=b*16&&x.t<b*16+16).map(x=>({t:x.t-b*16,m:x.m,l:x.l})),inst:p.inst,first:b===0,last:b===d.chords.length-1})));return bars}
function evFromBars(bars){const len=bars.length*16,ev=Array.from({length:len},()=>[]);
bars.forEach((b,i)=>{const o=i*16,c=chordOf(b.chord),I=b.int,v=.5+.5*I;
ev[o].push({k:'p',ms:c.tones,l:16,v:.6+.5*I});
if(I>=.85){ev[o].push({k:'n',i:'horn',m:c.root+12,l:16,v:.8});ev[o].push({k:'n',i:'horn',m:c.root+19,l:16,v:.6})}
const bs=I<.3?[0]:I<.6?[0,8]:I<.85?[0,4,8,12]:[0,2,4,6,8,10,12,14];
bs.forEach(s=>ev[o+s].push({k:'n',i:'bass',m:c.root,l:bs.length>4?2:4,v}));
const as=I<.3?4:2;for(let s=0;s<16;s+=as)ev[o+s].push({k:'n',i:'harp',m:c.tones[[0,1,2,1][(s/as)%4]]+12+(I>.8&&s>=8?12:0),l:2,v:.7+.3*I});
if(I>=.55){[0,8].forEach(s=>ev[o+s].push({k:'k'}));[4,12].forEach(s=>ev[o+s].push({k:'s'}));if(I>=.8){ev[o+10].push({k:'k'});for(let s=0;s<16;s+=2)ev[o+s].push({k:'h'})}}
if(I>=.7&&b.first)ev[o].push({k:'c'});
if(b.last&&I>=.55)[12,13,14,15].forEach(s=>ev[o+s].push({k:'s'}));
b.mel.forEach(n=>b.inst.forEach(ins=>ev[o+n.t].push({k:'n',i:ins,m:ins==='horn'?n.m-12:n.m,l:n.l,v:(ins==='horn'?.6:1)*(.6+.4*I)})))});
return{ev,len}}
const PD=[{int:.3,inst:['flute']},{int:.45,inst:['flute','horn']},{int:.6,inst:['brass']},{int:.85,inst:['brass','flute']},{int:.5,inst:['flute','horn']},{int:.3,inst:['flute']}];
const TRK={
title:{bpm:66,loop:1,sp:{tonic:9,minor:true,seed:11,sec:[{id:'I',bars:4,int:.2,mel:false},{id:'A',bars:8,int:.35,inst:['flute'],lo:64,hi:81},{ref:'A',bars:8,int:.5,inst:['flute','horn'],lo:64,hi:81},{id:'B',bars:8,int:.65,inst:['brass'],lo:67,hi:86},{id:'C',bars:8,int:.3,inst:['flute'],lo:57,hi:74},{ref:'B',tr:3,bars:8,int:.95,inst:['brass','flute'],lo:67,hi:88},{ref:'A',bars:4,int:.25,inst:['flute'],lo:64,hi:81}]}},
quiz:{bpm:138,loop:1,sp:{tonic:4,minor:true,seed:23,sec:[{id:'I',bars:4,int:.55,mel:false},{id:'A',bars:8,int:.6,inst:['brass'],lo:64,hi:83},{ref:'A',bars:8,int:.7,inst:['brass','flute'],lo:64,hi:83},{id:'B',bars:8,int:.75,inst:['brass'],lo:67,hi:88},{id:'C',bars:8,int:.35,inst:['flute'],lo:60,hi:78},{ref:'B',bars:8,int:.9,inst:['brass','flute','horn'],lo:67,hi:88},{ref:'A',tr:2,bars:8,int:1,inst:['brass','flute','horn'],lo:64,hi:83},{ref:'B',bars:8,int:.85,inst:['brass','flute'],lo:67,hi:88}]}},
shop:{bpm:88,loop:1,sp:{tonic:2,minor:false,seed:5,sec:[{id:'I',bars:4,int:.2,mel:false},{id:'A',bars:8,int:.3,inst:['flute'],lo:64,hi:83},{ref:'A',bars:8,int:.4,inst:['flute','horn'],lo:64,hi:83},{id:'B',bars:8,int:.45,inst:['flute'],lo:62,hi:81},{id:'C',bars:8,int:.25,inst:['flute'],lo:60,hi:78},{ref:'A',tr:5,bars:8,int:.5,inst:['flute','horn'],lo:64,hi:83},{ref:'A',bars:4,int:.2,inst:['flute'],lo:64,hi:83}]}},
victory:{bpm:124,loop:0,next:'title',chords:['C','F','G','C'],passes:[{int:.9,inst:['brass','flute']}],parts:[['x','C5/4 E5/4 G5/4 C6/4 A5/4 F5/4 A5/4 C6/4 B5/4 G5/4 B5/4 D6/4 C6/12 r/4']]},
defeat:{bpm:56,loop:0,next:'title',chords:['Am','Dm','E','Am'],passes:[{int:.15,inst:['flute']}],parts:[['x','A4/8 G4/4 E4/4 F4/8 E4/4 D4/4 E4/8 G#4/4 B4/4 A4/16']]},
bn1:{bpm:118,loop:1,chords:['Am','Am','Em','Am'],passes:PD,parts:[['x','E5/4 B4/2 C5/2 D5/4 C5/2 B4/2 A4/4 A4/2 C5/2 E5/4 D5/2 C5/2 B4/6 C5/2 D5/4 E5/4 C5/4 A4/4 A4/8']]},
bn2:{bpm:100,loop:1,chords:['C','G','C','G'],passes:PD,parts:[['x','E5/4 E5/4 F5/4 G5/4 G5/4 F5/4 E5/4 D5/4 C5/4 C5/4 D5/4 E5/4 E5/6 D5/2 D5/8']]},
bn3:{bpm:84,loop:1,chords:['C','C','G','C'],passes:PD,parts:[['x','C5/4 C5/4 C5/4 D5/4 E5/8 D5/8 C5/4 E5/4 D5/4 D5/4 C5/16']]},
bn4:{bpm:112,loop:1,chords:['Am','Am','E','Am'],passes:PD,parts:[['x','E5/2 D#5/2 E5/2 D#5/2 E5/2 B4/2 D5/2 C5/2 A4/4 r/2 C4/2 E4/2 A4/2 B4/4 r/2 E4/2 G#4/2 B4/2 C5/4 r/4 r/2 E4/2 C5/2 B4/2 A4/8']]},
bn5:{bpm:112,loop:1,sp:{tonic:0,minor:false,seed:31,sec:[{id:'A',bars:8,int:.4,inst:['flute'],lo:64,hi:84},{ref:'A',bars:8,int:.6,inst:['flute','horn'],lo:64,hi:84},{id:'B',bars:8,int:.75,inst:['brass'],lo:67,hi:88},{id:'C',bars:8,int:.3,inst:['flute'],lo:60,hi:79},{ref:'B',tr:2,bars:8,int:.95,inst:['brass','flute'],lo:67,hi:88}]}},
bn6:{bpm:76,loop:1,sp:{tonic:2,minor:true,seed:41,sec:[{id:'A',bars:8,int:.3,inst:['flute'],lo:62,hi:81},{ref:'A',bars:8,int:.5,inst:['flute','horn'],lo:62,hi:81},{id:'B',bars:8,int:.7,inst:['brass'],lo:65,hi:86},{id:'C',bars:8,int:.25,inst:['flute'],lo:57,hi:76},{ref:'B',tr:3,bars:8,int:.95,inst:['brass','flute'],lo:65,hi:88}]}},
bn7:{bpm:84,loop:1,sp:{tonic:4,minor:true,seed:53,sec:[{id:'A',bars:8,int:.3,inst:['flute'],lo:62,hi:81},{ref:'A',bars:8,int:.5,inst:['flute','horn'],lo:62,hi:81},{id:'B',bars:8,int:.65,inst:['brass'],lo:65,hi:86},{ref:'A',tr:2,bars:8,int:.9,inst:['brass','flute'],lo:64,hi:84}]}},
bn8:{bpm:144,loop:1,sp:{tonic:0,minor:true,seed:67,sec:[{id:'A',bars:8,int:.65,inst:['brass'],lo:62,hi:84},{ref:'A',bars:8,int:.8,inst:['brass','flute'],lo:62,hi:84},{id:'B',bars:8,int:.9,inst:['brass','flute','horn'],lo:65,hi:88},{ref:'B',tr:3,bars:8,int:1,inst:['brass','flute','horn'],lo:65,hi:88}]}}
};
let AC,master,dry,rev,NOISE,cur=null,timer=null,step=0,nextT=0,evs=null,TL=0,DT=.1,once=false;
function ensure(){if(AC){if(AC.state==='suspended')AC.resume();return}
AC=new (window.AudioContext||window.webkitAudioContext)();
const comp=AC.createDynamicsCompressor();master=AC.createGain();master.gain.value=.55;master.connect(comp);comp.connect(AC.destination);
dry=AC.createGain();dry.connect(master);
rev=AC.createConvolver();const L=Math.floor(AC.sampleRate*2.6),ir=AC.createBuffer(2,L,AC.sampleRate);
for(let ch=0;ch<2;ch++){const d=ir.getChannelData(ch);for(let i=0;i<L;i++)d[i]=(Math.random()*2-1)*Math.pow(1-i/L,2.6)}
rev.buffer=ir;const wg=AC.createGain();wg.gain.value=.4;rev.connect(wg);wg.connect(master);
NOISE=AC.createBuffer(1,AC.sampleRate,AC.sampleRate);const nd=NOISE.getChannelData(0);for(let i=0;i<nd.length;i++)nd[i]=Math.random()*2-1}
const mf=n=>440*Math.pow(2,(n-69)/12);
function env(g,t,a,d,r,v){const h=Math.max(a,d);g.gain.setValueAtTime(.0001,t);g.gain.linearRampToValueAtTime(v,t+a);g.gain.setValueAtTime(v,t+h);g.gain.exponentialRampToValueAtTime(.0001,t+h+r)}
function osc(type,f,t,e,det){const o=AC.createOscillator();o.type=type;o.frequency.value=f;if(det)o.detune.value=det;o.start(t);o.stop(e);return o}
function wire(g,wet){g.connect(dry);if(wet!==0)g.connect(rev)}
const INST={
flute(m,t,d,v){v=v||1;const f=mf(m),g=AC.createGain(),e=t+d+.5;env(g,t,.07,d,.3,.24*v);
const o=osc('sine',f,t,e),o2=osc('triangle',f*2,t,e),g2=AC.createGain();g2.gain.value=.1;
const lfo=osc('sine',5.1,t,e),lg=AC.createGain();lg.gain.setValueAtTime(0,t);lg.gain.linearRampToValueAtTime(f*.008,t+.3);lfo.connect(lg);lg.connect(o.frequency);
o.connect(g);o2.connect(g2);g2.connect(g);wire(g)},
brass(m,t,d,v){v=v||1;const f=mf(m),g=AC.createGain(),lp=AC.createBiquadFilter(),e=t+d+.4;lp.type='lowpass';lp.Q.value=2;lp.frequency.setValueAtTime(500,t);lp.frequency.linearRampToValueAtTime(2800,t+.12);
env(g,t,.05,d,.25,.13*v);osc('sawtooth',f,t,e,-5).connect(lp);osc('sawtooth',f,t,e,6).connect(lp);lp.connect(g);wire(g)},
horn(m,t,d,v){v=v||1;const f=mf(m),g=AC.createGain(),lp=AC.createBiquadFilter(),e=t+d+.8;lp.type='lowpass';lp.Q.value=1;lp.frequency.setValueAtTime(400,t);lp.frequency.linearRampToValueAtTime(1500,t+.3);
env(g,t,.15,d,.5,.14*v);osc('sawtooth',f,t,e,-7).connect(lp);osc('sawtooth',f,t,e,7).connect(lp);lp.connect(g);wire(g)},
strings(m,t,d,v){v=v||1;const f=mf(m),g=AC.createGain(),lp=AC.createBiquadFilter(),e=t+d+1.4;lp.type='lowpass';lp.frequency.value=1500;
env(g,t,.5,d,.8,.045*v);osc('sawtooth',f,t,e,-9).connect(lp);osc('sawtooth',f,t,e,9).connect(lp);osc('triangle',f/2,t,e).connect(lp);lp.connect(g);wire(g)},
harp(m,t,d,v){v=v||1;const f=mf(m),g=AC.createGain(),e=t+1.3,g2=AC.createGain();g2.gain.value=.3;
g.gain.setValueAtTime(.0001,t);g.gain.linearRampToValueAtTime(.2*v,t+.006);g.gain.exponentialRampToValueAtTime(.0001,t+1.1);
osc('triangle',f,t,e).connect(g);osc('sine',f*2,t,e).connect(g2);g2.connect(g);wire(g)},
bass(m,t,d,v){v=v||1;const f=mf(m),g=AC.createGain();env(g,t,.01,d*.9,.12,.36*v);osc('triangle',f,t,t+d+.3).connect(g);wire(g,0)}};
function kick(t){const g=AC.createGain(),o=osc('sine',130,t,t+.4);o.frequency.exponentialRampToValueAtTime(42,t+.14);g.gain.setValueAtTime(.55,t);g.gain.exponentialRampToValueAtTime(.0001,t+.32);o.connect(g);wire(g,0)}
function noise(t,f,type,v,d){const s=AC.createBufferSource();s.buffer=NOISE;const fl=AC.createBiquadFilter();fl.type=type;fl.frequency.value=f;const g=AC.createGain();g.gain.setValueAtTime(v,t);g.gain.exponentialRampToValueAtTime(.0001,t+d);s.connect(fl);fl.connect(g);wire(g,type==='bandpass'?1:0);s.start(t);s.stop(t+Math.min(d,.95)+.05)}
function fire(e,t){const k=e.k;if(k==='n')INST[e.i](e.m,t,e.l*DT,e.v);else if(k==='p')e.ms.forEach(m=>INST.strings(m,t,e.l*DT,e.v));else if(k==='k')kick(t);else if(k==='s')noise(t,1800,'bandpass',.2,.17);else if(k==='c')noise(t,5000,'highpass',.1,.9);else noise(t,7000,'highpass',.05,.05)}
function build(d){return evFromBars(d.sp?composeBars(d.sp):fixedBars(d))}
function tick(){while(nextT<AC.currentTime+.4){if(step>=TL&&once){clearInterval(timer);timer=null;const nx=TRK[cur].next,nm=cur;setTimeout(()=>{if(cur===nm){cur=null;if(nx)play(nx)}},Math.max(0,(nextT-AC.currentTime+1.5)*1000));return}
evs[step%TL].forEach(e=>fire(e,nextT));nextT+=DT;step++}}
function stop(){clearInterval(timer);timer=null;cur=null}
function play(name){if(!S.music){stop();return}ensure();if(cur===name)return;stop();const d=TRK[name],b=build(d);evs=b.ev;TL=b.len;cur=name;once=!d.loop;step=0;DT=60/d.bpm/4;nextT=AC.currentTime+.12;timer=setInterval(tick,50)}
function sfx(k){if(!S.music)return;ensure();const t=AC.currentTime;
if(k==='ok')[76,80,83,88].forEach((n,i)=>INST.harp(n,t+i*.07));
if(k==='ko'){INST.brass(45,t,.3);INST.brass(40,t+.2,.5)}
if(k==='coin'){INST.harp(96,t);INST.harp(103,t+.08)}}
