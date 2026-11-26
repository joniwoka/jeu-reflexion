importScripts('version.js');
const CACHE='quete-savoir-'+self.APP_VERSION;
const FILES=['./','index.html','game.js','ff4.js','menu.js','flee.js','ui.js','tac.js','mage.js','cm1.js','qbanks.js','q_more.js','gfx.js','sprites.js','pix.js','scenes.js','music.js','music2.js','questions.js','questions2.js','q_video3.js','q_geo.js','q_geo2.js','q_hist.js','q_hist2.js','q_eng.js','version.js','manifest.json','icon.svg'];
self.addEventListener('install',e=>{self.skipWaiting();e.waitUntil(caches.open(CACHE).then(c=>Promise.all(FILES.map(f=>fetch(new Request(f,{cache:'reload'})).then(r=>r.ok?c.put(f,r):null).catch(()=>null)))))});
self.addEventListener('message',e=>{if(e.data==='SKIP')self.skipWaiting()});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim()))});
self.addEventListener('fetch',e=>{const r=e.request;if(r.method!=='GET'||new URL(r.url).origin!==location.origin)return;
e.respondWith(fetch(r,{cache:'no-cache'}).then(res=>{if(res.ok){const cp=res.clone();caches.open(CACHE).then(c=>c.put(r,cp))}return res}).catch(()=>caches.match(r,{ignoreSearch:true})))});
