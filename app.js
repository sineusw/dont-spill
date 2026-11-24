// ===== DON'T SPILL · native bridge (haptics), settings, music =====
(()=>{
S.set=Object.assign({sfx:1,music:1,vib:1,notif:0},S.set||{});
const CAP=window.Capacitor,NAT=CAP&&CAP.isNativePlatform&&CAP.isNativePlatform(),HP=NAT&&CAP.Plugins&&CAP.Plugins.Haptics;
// ---- haptics: native on iPhone, vibrate API elsewhere
const _snd=window.snd,_noise=window.noise;
window.buzz=function(p){if(!S.set.vib)return;try{if(HP){if(Array.isArray(p)){const big=p[0]>=60;HP.notification({type:big?'ERROR':p.length>=5?'SUCCESS':'WARNING'}).catch(()=>{});}else HP.impact({style:p<12?'LIGHT':p<40?'MEDIUM':'HEAVY'}).catch(()=>{});}else if(navigator.vibrate)navigator.vibrate(p);}catch(e){}};
window.snd=function(){if(S.set.sfx)_snd.apply(null,arguments);};
window.noise=function(){if(S.set.sfx)_noise.apply(null,arguments);};
// ---- music: upbeat procedural diner loop
let mG=null,mT=null,step=0;const BPM=112,SPB=60/BPM/2;
const PROG=[[261.6,329.6,392],[220,261.6,329.6],[174.6,220,261.6],[196,246.9,293.7]],BASS=[130.8,110,87.3,98],MEL=[523,587,659,784,659,587,523,440];
function note(f,t,d,type,v){const o=AC.createOscillator(),g=AC.createGain();o.type=type;o.frequency.value=f;g.gain.setValueAtTime(0,t);g.gain.linearRampToValueAtTime(v,t+.01);g.gain.exponentialRampToValueAtTime(.0001,t+d);o.connect(g);g.connect(mG);o.start(t);o.stop(t+d+.05);}
function sched(){if(!AC||!mG)return;const now=AC.currentTime;while(nextT<now+.3){const bar=Math.floor(step/8)%4,b=step%8,ch=PROG[bar];
 if(b%2===0)note(BASS[bar]*(b%4?1.5:1),nextT,SPB*1.6,'triangle',.22);
 if(b===2||b===6)ch.forEach(f=>note(f,nextT,SPB*.9,'square',.035));
 if(Math.random()<.55)note(MEL[(step*3+bar)%8],nextT,SPB*.8,'sine',.07);
 if(b%2===1){const n=AC.createBufferSource(),bf=AC.createBuffer(1,AC.sampleRate*.03|0,AC.sampleRate),a=bf.getChannelData(0);for(let i=0;i<a.length;i++)a[i]=(Math.random()*2-1)*(1-i/a.length);n.buffer=bf;const g=AC.createGain();g.gain.value=.06;n.connect(g);g.connect(mG);n.start(nextT);}
 step++;nextT+=SPB;}}
let nextT=0;
function musicOn(){try{AC=AC||new(window.AudioContext||window.webkitAudioContext)();AC.resume&&AC.resume();}catch(e){return;}if(mG||!S.set.music)return;mG=AC.createGain();mG.gain.value=.55;mG.connect(AC.destination);nextT=AC.currentTime+.05;mT=setInterval(sched,100);}
function musicOff(){if(mT)clearInterval(mT);mT=null;if(mG){mG.disconnect();mG=null;}}
window.dsMusicOff=musicOff;
document.addEventListener('pointerdown',()=>{if(S.set.music&&!mG)musicOn();},{once:false,capture:true});
try{if(navigator.audioSession)navigator.audioSession.type='playback';}catch(e){}
// start music right away (the iPhone app allows audio without a tap; the web version starts on first tap)
setTimeout(()=>{if(S.set.music)musicOn();if(AC&&AC.state!=='running'&&!NAT){musicOff();}},300);
function audioWake(){try{if(!AC){if(S.set.music)musicOn();return;}if(AC.state==='closed'){AC=new(window.AudioContext||window.webkitAudioContext)();mG=null;}
 if(AC.state!=='running'){musicOff();AC.resume().then(()=>{if(S.set.music)musicOn();}).catch(()=>{});}else if(S.set.music&&!mG)musicOn();}catch(e){}}
window.audioWake=audioWake;
document.addEventListener('visibilitychange',()=>{if(!document.hidden)setTimeout(audioWake,150);else musicOff();});
window.addEventListener('focus',()=>setTimeout(audioWake,150));window.addEventListener('pageshow',()=>setTimeout(audioWake,150));
document.addEventListener('pointerdown',()=>{if(AC&&AC.state!=='running')audioWake();},true);
setInterval(()=>{if(!document.hidden&&AC&&AC.state!=='running')audioWake();},3000);
document.addEventListener('visibilitychange',()=>{if(document.hidden)musicOff();});
// ---- settings screen
const css=document.createElement('style');css.textContent=`#gear{position:fixed;top:max(10px,env(safe-area-inset-top));right:12px;z-index:8;width:44px;height:44px;border-radius:50%;padding:0!important;margin:0!important;font-size:22px!important;background:rgba(26,18,32,.8)!important;box-shadow:0 4px 0 #0c0810!important;border:2px solid #ffd23f}
.tg{display:flex;justify-content:space-between;align-items:center;width:100%;max-width:320px;background:rgba(255,255,255,.08);border-radius:14px;padding:10px 14px;box-sizing:border-box;font:800 17px system-ui;color:#fff}
.sw{width:54px;height:30px;border-radius:15px;background:#4a3a56;position:relative;border:2px solid #1a1220;transition:.2s}.sw.on{background:#2bb673}.sw::after{content:'';position:absolute;top:2px;left:2px;width:22px;height:22px;border-radius:50%;background:#fff;transition:.2s}.sw.on::after{left:26px}
body{padding-top:env(safe-area-inset-top)}`;document.head.appendChild(css);
const gear=document.createElement('button');gear.id='gear';gear.textContent='⚙️';document.body.appendChild(gear);
const syncGear=()=>gear.style.display=$('start').classList.contains('hidden')?'none':'block';setInterval(syncGear,300);
const ov=document.createElement('div');ov.className='ov scroll hidden';ov.style.zIndex=9;document.body.appendChild(ov);
function openSet(){const row=(k,l)=>`<div class="tg">${l}<div class="sw ${S.set[k]?'on':''}" data-k="${k}"></div></div>`;
 ov.innerHTML=`<div class="lbl">SETTINGS</div>${row('sfx','🔊 Sound effects')}${row('music','🎵 Music')}${row('vib','📳 Vibration')}${NAT?row('notif','🔔 Rush reminders'):''}
 <button class="ghost" id="stPriv" style="width:100%;max-width:320px;margin:0">Privacy Policy</button>
 <button class="ghost" id="stReset" style="width:100%;max-width:320px;margin:0;color:#ff8a7a">Reset progress</button>
 <div style="font-size:12px;opacity:.6">Don't Spill v1.0 · Petty Games Studio</div><button id="stDone">DONE</button>`;
 ov.classList.remove('hidden');
 ov.querySelectorAll('.sw').forEach(s=>s.onclick=()=>{const k=s.dataset.k;S.set[k]=S.set[k]?0:1;save();s.classList.toggle('on',!!S.set[k]);if(k==='music')S.set.music?audioWake():musicOff();if(k==='sfx'&&S.set.sfx)audioWake();if(k==='vib'&&S.set.vib)buzz(30);if(k==='notif'&&S.set.notif&&window.dsNotifAsk)dsNotifAsk().then(ok=>s.classList.toggle('on',ok));});
 $('stPriv').onclick=()=>{location.href='privacy.html';};
 $('stReset').onclick=()=>{const b=$('stReset');if(b.dataset.c){localStorage.clear();location.reload();}else{b.dataset.c=1;b.textContent='Tap again to erase everything';}};
 $('stDone').onclick=()=>ov.classList.add('hidden');}
gear.onclick=openSet;
})();
