// ===== DON'T SPILL · first-time tutorial =====
(()=>{
if(S.tour)return;
if(S.xp>0||S.coins>0||(S.seen&&Object.keys(S.seen).length)||S.smTut){S.tour=1;save();return;}
const NAT=window.Capacitor&&Capacitor.isNativePlatform&&Capacitor.isNativePlatform();
const STEPS=[
 {ic:'🍸',t:"WELCOME TO<br>DON'T SPILL",b:"You're the new server at a run-down diner. Your manager is petty, the customers are chaos, and every drink is a lawsuit waiting to happen."},
 {ic:'⚡',t:'SHIFT MODE',b:'Quick mini-games, one after another. Each one shows you what to do first. Win to earn points, miss and you lose a ❤. Points become tips.'},
 {ic:'🏠',t:'BUILD YOUR DINER',b:'Spend tips on tables, staff, decor and new rooms. Your diner keeps earning while you\'re away. Come back and tap COLLECT.'},
 {ic:'🔥',t:'DINNER RUSH',b:'Every day at 12pm, 5pm and 6pm, tips are x2 and Rush Shifts pay 3×. Plus a daily reward that grows each day in a row.'},
 {ic:'💵',t:'FIRST DAY BONUS',b:'Here\'s $100 to get started. Buy your first table, then clock in.'}];
const css=document.createElement('style');css.textContent=`#tour{z-index:20;background:rgba(20,10,25,.94)}
#tour .tic{font-size:72px;line-height:1;filter:drop-shadow(0 6px 0 rgba(0,0,0,.35))}
#tour h1{font-size:clamp(30px,6vh,44px);margin:0}#tour p{font:700 17px/1.45 system-ui;max-width:330px;margin:0;opacity:.95}
#tour .dots{display:flex;gap:7px}#tour .dots i{width:9px;height:9px;border-radius:50%;background:#4a3a56}#tour .dots i.on{background:#ffd23f}
#tour button{width:100%;max-width:320px;margin:0}
.tourPulse{animation:tP 1.1s ease-in-out infinite;position:relative}
@keyframes tP{0%,100%{box-shadow:0 0 0 0 rgba(255,210,63,.9),0 6px 0 #1a1220}50%{box-shadow:0 0 0 12px rgba(255,210,63,0),0 6px 0 #1a1220}}
#tourTip{position:fixed;z-index:19;transform:translateX(-50%);background:#ffd23f;color:#1a1220;font:900 14px system-ui;padding:7px 14px;border-radius:999px;border:3px solid #1a1220;pointer-events:none;white-space:nowrap}`;
document.head.appendChild(css);
let i=0;const o=document.createElement('div');o.id='tour';o.className='ov';document.body.appendChild(o);
function draw(){const s=STEPS[i],last=i===STEPS.length-1;
 o.innerHTML=`<div class="tic">${s.ic}</div><h1>${s.t}</h1><p>${s.b}</p><div class="dots">${STEPS.map((_,k)=>`<i class="${k===i?'on':''}"></i>`).join('')}</div>
 ${last&&NAT?'<button class="ghost" id="tNot">🔔 REMIND ME WHEN THE RUSH STARTS</button>':''}
 <button id="tNext">${last?'CLAIM $100 & START':'NEXT'}</button>${last?'':'<button class="ghost" id="tSkip">SKIP</button>'}`;
 $('tNext').onclick=()=>{if(last)finish();else{i++;draw();}};
 if($('tSkip'))$('tSkip').onclick=()=>{i=STEPS.length-1;draw();};
 if($('tNot'))$('tNot').onclick=async()=>{const b=$('tNot');b.disabled=true;const ok=window.dsNotifAsk?await dsNotifAsk():false;b.textContent=ok?'✓ RUSH REMINDERS ON':'Reminders off · change in Settings';};}
function finish(){S.tour=1;S.coins+=100;save();o.remove();if(window.renderMenu)renderMenu();[523,659,784,1047].forEach((f,k)=>setTimeout(()=>window.snd&&snd(f,.18,'triangle',.14),k*90));buzz&&buzz([20,30,60]);
 const b=$('buildBtn');if(!b)return;b.classList.add('tourPulse');const tip=document.createElement('div');tip.id='tourTip';tip.textContent='👆 Buy your first table';document.body.appendChild(tip);
 const place=()=>{const r=b.getBoundingClientRect();tip.style.top=(r.bottom+10)+'px';tip.style.left=Math.min(innerWidth-tip.offsetWidth/2-8,r.left+r.width/2)+'px';tip.style.display=$('start').classList.contains('hidden')?'none':'block';};place();const iv=setInterval(place,300);
 b.addEventListener('click',()=>{b.classList.remove('tourPulse');clearInterval(iv);tip.remove();const sm=$('smBtn');if(sm){sm.classList.add('tourPulse');sm.addEventListener('click',()=>sm.classList.remove('tourPulse'),{once:true});}},{once:true});}
draw();
})();
