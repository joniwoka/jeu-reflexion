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
/* ---------- Piano : synthese additive avec cordes multiples, inharmonicite et marteau ---------- */
var PNC={},PQ=[],PQB=false;
function pianoRender(k){var sr=Math.min(AC.sampleRate,28000),f=mf(k),sec=Math.max(1.6,Math.min(3.6,4.4-(k-30)*.04)),len=Math.floor(sr*sec),b=AC.createBuffer(2,len,sr),L=b.getChannelData(0),Rr=b.getChannelData(1),rs=rng(k*977+13),i,pk=0;
var B=.00009*Math.pow(f/110,1.5),np=Math.max(4,Math.min(10,Math.floor(7000/f))),tau0=Math.max(.9,5.2-(k-28)*.06);
for(var n=1;n<=np;n++){var fn=n*f*Math.sqrt(1+B*n*n);if(fn>sr*.42)break;
var amp=Math.pow(n,-1.05)*(.35+.65*Math.abs(Math.sin(Math.PI*n*.12)));if(n===2)amp*=1.1;
var tau=tau0/(1+.45*(n-1)),ns=n<=2?3:2;
for(var s=0;s<ns;s++){var det=1+(s-1)*.0005*(1+.12*n),ph=rs()*6.2832,w=6.2832*fn*det/sr,tt=tau*(s===1?1.15:.92),a=amp*(3/ns)*.33,gl=s===0?1:s===1?.78:.55,gr=s===0?.55:s===1?.78:1;
var lim=Math.min(len,Math.floor(tt*sr*6.9)),env=a,dec=Math.exp(-1/(sr*tt)),cc=2*Math.cos(w),y0=Math.sin(ph-w),y1=Math.sin(ph),y2;
for(i=0;i<lim;i++){var v=env*y1;L[i]+=v*gl;Rr[i]+=v*gr;env*=dec;y2=cc*y1-y0;y0=y1;y1=y2}}}
var hl=Math.floor(sr*.02),x=0;for(i=0;i<hl;i++){var e=1-i/hl;x=x*.72+(rs()*2-1)*.28;L[i]+=x*e*e*.55;Rr[i]+=x*e*e*.55}
for(i=0;i<len;i++){var z=Math.max(Math.abs(L[i]),Math.abs(Rr[i]));if(z>pk)pk=z}
var sc=.62/(pk||1),fi=Math.floor(sr*.0015);for(i=0;i<len;i++){var q=i<fi?i/fi:1;L[i]*=sc*q;Rr[i]*=sc*q}
return b}
function pianoQueue(k){if(PNC[k]||PQ.indexOf(k)>=0)return;PQ.push(k);if(!PQB){PQB=true;pqRun()}}
function pqRun(){setTimeout(function(){var k=PQ.shift();if(k!=null&&!PNC[k]&&AC){try{PNC[k]=pianoRender(k)}catch(e){}}if(PQ.length)pqRun();else PQB=false},6)}
function pianoLite(m,t,d,v){var f=mf(m),g=AC.createGain(),e=t+Math.min(d+.5,1.6)+.1;g.gain.setValueAtTime(.0001,t);g.gain.linearRampToValueAtTime(.2*v,t+.004);g.gain.exponentialRampToValueAtTime(.0001,e);
var o=AC.createOscillator(),o2=AC.createOscillator(),g2=AC.createGain();o.type='triangle';o2.type='sine';o.frequency.value=f;o2.frequency.value=f*2;g2.gain.value=.3;o.connect(g);o2.connect(g2);g2.connect(g);o.start(t);o.stop(e);o2.start(t);o2.stop(e);wire(g)}
INST.piano=function(m,t,d,v){v=v||1;var k=Math.max(28,Math.min(100,Math.round(m))),b=PNC[k];if(!b){pianoQueue(k);pianoLite(m,t,d,v);return}
var s=AC.createBufferSource(),g=AC.createGain(),lp=AC.createBiquadFilter(),hold=Math.min(d+.45,2.2);lp.type='lowpass';lp.frequency.value=2200+Math.min(1.2,v)*5200;
g.gain.setValueAtTime(.0001,t);g.gain.linearRampToValueAtTime(.62*v,t+.002);g.gain.setValueAtTime(.62*v,t+hold);g.gain.exponentialRampToValueAtTime(.0001,t+hold+.7);
s.buffer=b;s.connect(lp);lp.connect(g);wire(g);s.start(t);s.stop(t+hold+.75)};
/* ---------- Harpe : corde pincee (Karplus-Strong) ---------- */
var PLC={};
function pluckBuf(k){if(PLC[k])return PLC[k];var sr=AC.sampleRate,f=mf(k),N=Math.max(2,Math.round(sr/f)),len=Math.floor(sr*1.9),b=AC.createBuffer(1,len,sr),d=b.getChannelData(0),rs=rng(k*31+7),buf=new Float32Array(N),i,x=0,p=0;
for(i=0;i<N;i++){x=x*.45+(rs()*2-1)*.55;buf[i]=x}
for(i=0;i<len;i++){var a=buf[p],c=buf[(p+1)%N];buf[p]=(a+c)*.5*.9992;d[i]=a*.55;p=(p+1)%N}
return PLC[k]=b}
INST.harp=function(m,t,d,v){v=v||1;var k=Math.max(30,Math.min(110,Math.round(m))),s=AC.createBufferSource(),g=AC.createGain();s.buffer=pluckBuf(k);g.gain.setValueAtTime(.0001,t);g.gain.linearRampToValueAtTime(.7*v,t+.003);g.gain.setValueAtTime(.7*v,t+.9);g.gain.exponentialRampToValueAtTime(.0001,t+1.8);s.connect(g);wire(g);s.start(t);s.stop(t+1.85)};
/* ---------- Souffleurs et basse ---------- */
function breath(t,f,v,dur){var s=AC.createBufferSource(),bp=AC.createBiquadFilter(),g=AC.createGain();s.buffer=NOISE;bp.type='bandpass';bp.frequency.value=Math.min(f*2.5,6000);bp.Q.value=3;g.gain.setValueAtTime(.0001,t);g.gain.linearRampToValueAtTime(v,t+.04);g.gain.exponentialRampToValueAtTime(.0001,t+dur);s.connect(bp);bp.connect(g);wire(g);s.start(t);s.stop(t+Math.min(dur,.95))}
INST.flute=function(m,t,d,v){v=v||1;var f=mf(m),g=AC.createGain(),e=t+d+.5,o=osc('sine',f,t,e),o2=osc('triangle',f*2,t,e),g2=AC.createGain(),lfo=osc('sine',5.2,t,e),lg=AC.createGain();
env(g,t,.07,d,.28,.22*v);g2.gain.value=.12;lg.gain.setValueAtTime(0,t);lg.gain.linearRampToValueAtTime(f*.007,t+.35);lfo.connect(lg);lg.connect(o.frequency);lg.connect(o2.frequency);o.connect(g);o2.connect(g2);g2.connect(g);wire(g);breath(t,f,.05*v,Math.min(.3,d+.1))};
INST.brass=function(m,t,d,v){v=v||1;var f=mf(m),g=AC.createGain(),lp=AC.createBiquadFilter(),e=t+d+.4;lp.type='lowpass';lp.Q.value=1.6;lp.frequency.setValueAtTime(f*1.5,t);lp.frequency.linearRampToValueAtTime(Math.min(f*7,5200),t+.09);lp.frequency.linearRampToValueAtTime(Math.min(f*4,3000),t+.4);
env(g,t,.04,d,.22,.12*v);var lfo=osc('sine',5.6,t,e),lg=AC.createGain();lg.gain.setValueAtTime(0,t);lg.gain.linearRampToValueAtTime(f*.004,t+.3);lfo.connect(lg);
var a=osc('sawtooth',f,t,e,-7),b=osc('sawtooth',f,t,e,6),c=osc('square',f/2,t,e);lg.connect(a.frequency);lg.connect(b.frequency);var gc=AC.createGain();gc.gain.value=.25;a.connect(lp);b.connect(lp);c.connect(gc);gc.connect(lp);lp.connect(g);wire(g);noise(t,Math.min(f*3,4000),'bandpass',.06*v,.05)};
INST.horn=function(m,t,d,v){v=v||1;var f=mf(m),g=AC.createGain(),lp=AC.createBiquadFilter(),e=t+d+.8;lp.type='lowpass';lp.Q.value=.9;lp.frequency.setValueAtTime(f*1.2,t);lp.frequency.linearRampToValueAtTime(Math.min(f*5,2000),t+.3);
env(g,t,.14,d,.5,.14*v);var a=osc('sawtooth',f,t,e,-6),b=osc('sawtooth',f,t,e,6),c=osc('triangle',f,t,e);a.connect(lp);b.connect(lp);c.connect(lp);lp.connect(g);wire(g)};
INST.bass=function(m,t,d,v){v=v||1;var f=mf(m),g=AC.createGain(),lp=AC.createBiquadFilter(),e=t+d+.3;lp.type='lowpass';lp.frequency.setValueAtTime(900,t);lp.frequency.exponentialRampToValueAtTime(260,t+.18);
g.gain.setValueAtTime(.0001,t);g.gain.linearRampToValueAtTime(.34*v,t+.006);g.gain.exponentialRampToValueAtTime(.2*v,t+.16);g.gain.setValueAtTime(.2*v,t+Math.max(.17,d*.8));g.gain.exponentialRampToValueAtTime(.0001,t+d+.12);
var a=osc('sine',f,t,e),b=osc('sawtooth',f,t,e,4),gb=AC.createGain();gb.gain.value=.35;a.connect(g);b.connect(gb);gb.connect(lp);lp.connect(g);wire(g,0);noise(t,1400,'bandpass',.05*v,.025)};
/* ---------- Percussions plus realistes ---------- */
kick=function(t){var o=AC.createOscillator(),g=AC.createGain();o.type='sine';o.frequency.setValueAtTime(165,t);o.frequency.exponentialRampToValueAtTime(46,t+.11);g.gain.setValueAtTime(.85,t);g.gain.exponentialRampToValueAtTime(.001,t+.4);o.connect(g);wire(g,0);o.start(t);o.stop(t+.42);noise(t,2600,'bandpass',.1,.02)};
function snare2(t){noise(t,1900,'bandpass',.24,.17);noise(t,6500,'highpass',.09,.13);var o=AC.createOscillator(),g=AC.createGain();o.type='triangle';o.frequency.setValueAtTime(205,t);o.frequency.exponentialRampToValueAtTime(150,t+.08);g.gain.setValueAtTime(.3,t);g.gain.exponentialRampToValueAtTime(.001,t+.11);o.connect(g);wire(g,0);o.start(t);o.stop(t+.13)}
function hat2(t,open){noise(t,open?7000:9500,'highpass',open?.08:.06,open?.24:.045)}
function tamb(t){for(var i=0;i<3;i++)noise(t+i*.012,9800,'bandpass',.05,.03)}
function crash2(t){noise(t,4500,'highpass',.12,1.3);noise(t,3000,'bandpass',.06,.8)}
function tom(t,f){f=f||160;var g=AC.createGain(),o=AC.createOscillator();o.type='sine';o.frequency.setValueAtTime(f*1.25,t);o.frequency.exponentialRampToValueAtTime(f*.5,t+.22);g.gain.setValueAtTime(.45,t);g.gain.exponentialRampToValueAtTime(.001,t+.32);o.connect(g);wire(g,0);o.start(t);o.stop(t+.35);noise(t,900,'lowpass',.1,.05)}
function fire(e,t){var j=(Math.random()-.5)*.012,k=e.k,vr=1+(Math.random()-.5)*.14;
if(k==='n')INST[e.i](e.m,t+((e.i==='bass'||e.i==='piano'||e.i==='harp')?j:0),e.l*DT,(e.v||1)*vr);
else if(k==='p')e.ms.forEach(function(m,i){INST.piano(m,t+j+i*.011,e.l*DT,(e.v||1)*vr)});
else if(k==='k')kick(t);else if(k==='s')snare2(t+j*.3);else if(k==='c')crash2(t);else if(k==='t')tom(t,e.f);else if(k==='b')tamb(t);else if(k==='o')hat2(t,true);else hat2(t,false)}
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
/* ---------- Reverberation plus naturelle et prechauffage du piano ---------- */
function betterIR(){var sr=AC.sampleRate,L=Math.floor(sr*2.4),ir=AC.createBuffer(2,L,sr),rs=rng(4242);
for(var ch=0;ch<2;ch++){var d=ir.getChannelData(ch),lp=0;for(var i=0;i<L;i++){var t=i/sr,env=Math.exp(-t*3.1),a=.12+.88*Math.exp(-t*2.2);lp=lp*(1-a)+(rs()*2-1)*a;d[i]=lp*env*(i<sr*.004?i/(sr*.004):1)}
[[.011,.55],[.019,.42],[.031,.35],[.047,.28],[.067,.2]].forEach(function(r,j){var idx=Math.floor((r[0]+(ch?.0027:0))*sr);d[idx]+=r[1]*(j%2?-1:1)})}
rev.buffer=ir}
var _ens0=ensure;ensure=function(){var first=!AC;_ens0();if(first&&AC&&rev){try{betterIR()}catch(e){}}};
function prewarm(){if(!evs)return;var seen={},i,n=Math.min(evs.length,640);for(i=0;i<n;i++)evs[i].forEach(function(e){if(e.k==='p')e.ms.forEach(function(m){seen[m]=1});else if(e.k==='n'&&e.i==='piano')seen[e.m]=1});Object.keys(seen).forEach(function(m){pianoQueue(Math.max(28,Math.min(100,Math.round(+m))))})}
var _play0=play;play=function(name){_play0(name);try{prewarm();if(PQ.length>4&&AC&&typeof nextT==='number')nextT=AC.currentTime+Math.min(1.6,.6+PQ.length*.03)}catch(e){}};
sfx=function(k){if(!S.music)return;ensure();const t=AC.currentTime;
if(k==='ok')[76,80,83,88].forEach((n,i)=>INST.harp(n,t+i*.07,.3,.8));
if(k==='ko'){INST.brass(45,t,.3);INST.brass(40,t+.2,.5)}
if(k==='coin'){INST.harp(96,t,.2,.8);INST.harp(103,t+.08,.2,.8)}
if(k==='block'){noise(t,3200,'bandpass',.28,.14);INST.harp(100,t,.2,.9);INST.harp(107,t+.05,.2,.9)}
if(k==='alert'){INST.brass(33,t,.6);INST.brass(34,t+.45,.9);kick(t);kick(t+.45)}
if(k==='charge'){[64,67,71,76,83,88].forEach((n,i)=>INST.piano(n,t+i*.07,.4,.9));noise(t+.4,6000,'highpass',.1,.5)}
if(k==='special'){[60,64,67,72,76,79,84,88,91,96].forEach((n,i)=>INST.piano(n,t+i*.05,.5,.9));INST.brass(48,t+.5,.9);INST.brass(55,t+.5,.9);INST.horn(60,t+.5,1);kick(t+.5);crash2(t+.5)}}
