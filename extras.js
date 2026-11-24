// ===== DON'T SPILL · shop + leaderboard redesign, haptics =====
(()=>{
const css=document.createElement('style');css.textContent=`
#shop{background:radial-gradient(circle at 50% 18%,#6a2d96,#24113a 55%,#140a1c)!important;gap:clamp(6px,1.2vh,10px)!important}
.shHead{display:flex;justify-content:space-between;align-items:center;width:100%;max-width:360px}.shHead b{font:900 22px system-ui;color:#ffd23f;letter-spacing:1px}
.chipW{background:#1a1220;border:2px solid #ffd23f;color:#7cff6b;font:900 16px system-ui;padding:5px 12px;border-radius:999px}
.stage{position:relative;width:100%;max-width:360px;height:clamp(140px,26vh,210px);border-radius:22px;border:3px solid #1a1220;background:radial-gradient(ellipse at 50% 85%,#ffe7a8 0,#ffb84d 30%,#e8663a 70%);box-shadow:0 6px 0 rgba(0,0,0,.35);overflow:hidden}
.stage canvas{position:absolute;left:50%;bottom:4px;transform:translateX(-50%)}.stage .nm{position:absolute;left:10px;top:8px;font:900 15px system-ui;color:#1a1220;text-align:left}.stage .nm small{display:block;font-weight:700;font-size:11px;opacity:.75}
.seg{display:flex;background:#1a1220;border-radius:999px;padding:3px;gap:3px}.seg button{margin:0!important;padding:8px 18px!important;font-size:14px!important;box-shadow:none!important;background:transparent;color:#fff}.seg button.on{background:#ffd23f;color:#1a1220}
.sgrid{display:grid;grid-template-columns:repeat(3,1fr);gap:8px;width:100%;max-width:360px}
.scard2{all:unset;cursor:pointer;box-sizing:border-box;background:linear-gradient(180deg,#fff8e6,#ffe2b0);border:3px solid #1a1220;border-radius:14px;padding:3px 3px 5px;display:flex;flex-direction:column;align-items:center;box-shadow:0 4px 0 #1a1220;position:relative;color:#1a1220}
.scard2.sel{outline:3px solid #ffd23f;outline-offset:2px}.scard2 canvas{display:block}.scard2 b{font:900 11.5px system-ui;line-height:1.1;text-align:center}.scard2 i{font:800 10.5px system-ui;font-style:normal;margin-top:2px;padding:1px 7px;border-radius:999px;background:#2bb673;color:#fff}.scard2 i.own{background:#6a5a76}.scard2 i.on{background:#ffd23f;color:#1a1220}.scard2 i.lock{background:#b3361f}
#shAct{width:100%;max-width:360px;margin:0!important}
#lbx{background:radial-gradient(circle at 50% 15%,#2d4a96,#141a3a 55%,#0c0f1e)!important;gap:clamp(6px,1.2vh,10px)!important;justify-content:flex-start!important;padding-top:clamp(14px,3vh,30px)!important}
.pod{display:flex;align-items:flex-end;justify-content:center;gap:8px;width:100%;max-width:360px;height:clamp(150px,25vh,200px)}
.pcol{flex:1;display:flex;flex-direction:column;align-items:center;gap:3px}.pav{width:46px;height:46px;border-radius:50%;border:3px solid #1a1220;display:flex;align-items:center;justify-content:center;font:900 20px system-ui;color:#fff;box-shadow:0 3px 0 rgba(0,0,0,.4)}
.pnm{font:900 12px system-ui;color:#fff;max-width:100px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.psc{font:900 13px system-ui;color:#ffd23f}
.pblk{width:100%;border:3px solid #1a1220;border-radius:12px 12px 0 0;display:flex;align-items:flex-start;justify-content:center;font:900 26px system-ui;padding-top:4px}
.lrow{display:flex;align-items:center;gap:10px;background:rgba(255,255,255,.08);border:2px solid rgba(255,255,255,.12);border-radius:12px;padding:5px 10px;width:100%;max-width:360px;box-sizing:border-box;color:#fff;font:800 14px system-ui}
.lrow .rk{width:26px;height:26px;border-radius:50%;background:#1a1220;color:#ffd23f;display:flex;align-items:center;justify-content:center;font-size:12px}.lrow .av{width:26px;height:26px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:12px;border:2px solid #1a1220}.lrow .n{flex:1;text-align:left}.lrow.me{background:rgba(255,210,63,.18);border-color:#ffd23f}
@media (max-height:720px){.lrow:nth-of-type(n+7){display:none}}`;document.head.appendChild(css);
// ---- haptics on every button
document.addEventListener('pointerdown',e=>{if(e.target.closest('button,.ucard,.scard2,.rest'))buzz(8);},true);
// ---- SHOP
let tab='o',sel=null;const shop=$('shop');
const key=(k,id)=>(k==='g'?'g_':'')+id;
function renderShop2(){const list=tab==='o'?OUTFITS:GLASSES,cur=tab==='o'?S.outfit:S.glass;if(!sel||!list.find(i=>i.id===sel))sel=cur;const it=list.find(i=>i.id===sel),own=S.own.includes(key(tab,sel)),on=sel===cur;
 shop.innerHTML=`<div class="shHead"><b>👔 STAFF SHOP</b><span class="chipW">$${S.coins}</span></div>
 <div class="stage"><div class="nm">${it.name}<small>${tab==='o'?'Outfit':'Glasses'} · ${on?'equipped':own?'owned':'$'+it.cost}</small></div><canvas id="shPv"></canvas></div>
 <div class="seg"><button id="shO" class="${tab==='o'?'on':''}">OUTFITS</button><button id="shG" class="${tab==='g'?'on':''}">GLASSES</button></div>
 <div class="sgrid">${list.map(i=>{const o=S.own.includes(key(tab,i.id)),e=i.id===cur;return `<button class="scard2 ${i.id===sel?'sel':''}" data-id="${i.id}"><canvas data-pv="${i.id}"></canvas><b>${i.name}</b><i class="${e?'on':o?'own':S.coins>=i.cost?'':'lock'}">${e?'WEARING':o?'OWNED':'$'+i.cost}</i></button>`}).join('')}</div>
 <button id="shAct" style="${on?'background:#6a5a76;box-shadow:0 6px 0 #3a2a48':!own&&S.coins<it.cost?'background:#8a7a86;box-shadow:0 6px 0 #4a3a46':'background:#2bb673;box-shadow:0 6px 0 #1a7a4c'}">${on?'✓ EQUIPPED':own?'EQUIP':S.coins>=it.cost?'BUY $'+it.cost:'NEED $'+(it.cost-S.coins)+' MORE'}</button>
 <button class="ghost" id="shBack" style="margin:0">BACK</button>`;
 const h=Math.max(140,Math.min(210,innerHeight*.26))-8;dsPreview($('shPv'),tab==='o'?sel:S.outfit,tab==='g'?sel:S.glass,h*1.1,h);
 const cs=Math.min(86,(Math.min(innerWidth,360)-16)/3-10);shop.querySelectorAll('[data-pv]').forEach(c=>dsPreview(c,tab==='o'?c.dataset.pv:S.outfit,tab==='g'?c.dataset.pv:S.glass,cs,cs*.9));
 $('shO').onclick=()=>{tab='o';sel=null;renderShop2();};$('shG').onclick=()=>{tab='g';sel=null;renderShop2();};
 shop.querySelectorAll('.scard2').forEach(b=>b.onclick=()=>{sel=b.dataset.id;renderShop2();});
 $('shAct').onclick=()=>{if(on)return;if(!own){if(S.coins<it.cost){buzz([40,30,40]);return;}S.coins-=it.cost;S.own.push(key(tab,sel));snd(880,.1,'triangle',.15);setTimeout(()=>snd(1320,.15,'triangle',.12),80);buzz([20,30,60]);}if(tab==='o')S.outfit=sel;else S.glass=sel;save();renderShop2();};
 $('shBack').onclick=()=>{shop.classList.add('hidden');renderMenu();$('start').classList.remove('hidden');};}
window.renderShop=renderShop2;
// ---- LEADERBOARD
const AVC=['#ff5a3c','#2fd3ff','#7cff6b','#ffd23f','#b07cff','#ff7ab8','#2bb673'];const avc=n=>AVC[[...n].reduce((a,c)=>a+c.charCodeAt(0),0)%AVC.length];
const esc=s=>String(s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
async function openLB2(board='all'){const ov=$('sOv');dsShow('<div style="color:#fff">Loading…</div>');
 const {list,online}=await dsFetchLB(board),me=S.lbName,top=list.slice(0,3),rest=list.slice(3,10);
 const pc=(e,pl,hgt,col)=>e?`<div class="pcol"><div style="font-size:20px">${['🥇','🥈','🥉'][pl]}</div><div class="pav" style="background:${avc(e.name)}">${esc(e.name[0].toUpperCase())}</div><div class="pnm">${esc(e.name)}</div><div class="psc">${e.score}</div><div class="pblk" style="height:${hgt}px;background:${col}">${pl+1}</div></div>`:`<div class="pcol"><div class="pav" style="background:#3a2a48">?</div><div class="pnm">—</div><div class="psc">&nbsp;</div><div class="pblk" style="height:${hgt}px;background:#3a2a48;opacity:.5">${pl+1}</div></div>`;
 const myBest=board==='daily'?S.dailyBest||0:S.smBest||0,myRank=me?list.findIndex(e=>e.name===me)+1:0;
 dsShow(`<div style="font:900 clamp(26px,4.5vh,36px) system-ui;color:#ffd23f;text-shadow:0 4px 0 #b3361f">🏆 LEADERBOARD</div>
 <div class="seg"><button id="lbA" class="${board==='all'?'on':''}">ALL-TIME</button><button id="lbD" class="${board==='daily'?'on':''}">TODAY</button></div>
 <div class="pod">${pc(top[1],1,60,'#c9d3dc')}${pc(top[0],0,90,'#ffd23f')}${pc(top[2],2,42,'#e0985a')}</div>
 ${rest.map((e,i)=>`<div class="lrow ${e.name===me?'me':''}"><span class="rk">${i+4}</span><span class="av" style="background:${avc(e.name)}">${esc(e.name[0].toUpperCase())}</span><span class="n">${esc(e.name)}</span><span style="color:#ffd23f">${e.score}</span></div>`).join('')||(list.length?'':'<div style="color:#fff;opacity:.8">No scores yet. Be the first!</div>')}
 <div class="lrow me"><span class="rk">${myRank||'—'}</span><span class="av" style="background:${me?avc(me):'#3a2a48'}">${me?esc(me[0].toUpperCase()):'?'}</span><span class="n">${me?esc(me)+' (you)':'You'}</span><span style="color:#ffd23f">${myBest}</span></div>
 ${online?'':'<div style="font-size:11px;color:#fff;opacity:.6">Showing scores on this phone until the online board is connected.</div>'}
 <button class="ghost" id="lbBk" style="margin:0">BACK</button>`);
 ov.style.background='radial-gradient(circle at 50% 15%,#2d4a96,#141a3a 55%,#0c0f1e)';ov.style.justifyContent='flex-start';ov.style.paddingTop='clamp(14px,3vh,30px)';
 $('lbA').onclick=()=>openLB2('all');$('lbD').onclick=()=>openLB2('daily');$('lbBk').onclick=()=>{ov.style.background='rgba(20,10,25,.985)';ov.style.justifyContent='center';ov.style.paddingTop='';dsHide();};}
$('lbBtn').onclick=()=>openLB2('all');
})();
