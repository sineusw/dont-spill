// ===== DON'T SPILL · MY RESTAURANT (polished scene, tap-to-collect, star rating) =====
(()=>{
const TAU=Math.PI*2,OL='#2a1a2e';let BT=0,lt=performance.now(),bot=0,wallH=0;
const THEMES={diner:{name:'Classic Diner',cost:0,ic:'🍔',wall:['#ffe0b8','#f6b97f'],trim:['#8f2c38','#b8434f'],floor:['#e8d3b0','#f7ead2'],tile:'rgba(122,42,50,.16)',cloth:'rgba(214,48,58,.75)',sign:"DON'T SPILL DINER",signC:'#d6303a',lamp:'#2bb673'},
 sushi:{name:'Sushi Bar',cost:1500,ic:'🍣',wall:['#f6ead5','#e2cfa8'],trim:['#2a2a38','#4a4a5a'],floor:['#c9a46a','#e0c08a'],tile:'rgba(90,50,20,.16)',cloth:'rgba(40,40,60,.75)',sign:"DON'T SPILL SUSHI",signC:'#2a2a38',lamp:'#d6303a',lantern:1},
 steak:{name:'Steakhouse',cost:3000,ic:'🥩',wall:['#7a4a2a','#4a2a18'],trim:['#1f4a32','#2c6346'],floor:['#3a2418','#5a3a24'],tile:'rgba(0,0,0,.22)',cloth:'rgba(255,255,255,.0)',sign:"DON'T SPILL STEAKHOUSE",signC:'#1f4a32',lamp:'#b8860b'}};
const ROOMS={patio:{name:'Patio',ic:'🌴',cost:750,per:4,tb:200,g:1.4,mult:1.5,wall:null,floor:['#cfc6b8','#ece5d8'],tile:'rgba(80,70,60,.16)',cloth:'rgba(47,184,163,.75)',sign:'THE PATIO',signC:'#2fb8a3',lamp:'#ffd23f'},
 vip:{name:'VIP Lounge',ic:'💎',cost:2500,per:10,tb:500,g:1.45,mult:3,wall:['#4a2470','#2a1440'],trim:['#b8860b','#e0a91a'],floor:['#4a1f3a','#6a2d56'],tile:'rgba(255,215,0,.08)',cloth:'rgba(184,134,11,.8)',sign:'VIP LOUNGE',signC:'#b8860b',lamp:'#e0a91a'}};
S.tab.runner=S.tab.runner||0;
// collapsible upgrade sheet so the restaurant isn't covered
(()=>{const sh=$('build');if(!sh||$('shTog'))return;const st=document.createElement('style');st.textContent='#build.mini>*:not(#shTog):not(.row){display:none!important}#shTog{margin:-4px auto 6px!important;padding:6px 18px!important;font-size:13px!important;border-radius:999px!important;background:#3a2a48!important;color:#ffd23f!important;box-shadow:0 3px 0 #120c18!important;display:block}#build.mini #shTog{animation:shP 1.4s ease-in-out infinite}@keyframes shP{50%{transform:scale(1.06)}}';document.head.appendChild(st);
 const b=document.createElement('button');b.id='shTog';sh.prepend(b);const upd=()=>{const m=S.sheetMini!==0;sh.classList.toggle('mini',m);b.textContent=m?'▲ UPGRADE YOUR RESTAURANT':'▼ HIDE MENU · SEE RESTAURANT';};b.onclick=()=>{S.sheetMini=S.sheetMini!==0?0:1;save();upd();};upd();})();S.rooms=S.rooms||{patio:{own:0,tables:0},vip:{own:0,tables:0}};S.theme=S.theme||'diner';S.themes=S.themes||['diner'];S.view=S.view||'main';
window.roomRate=()=>S.rooms.patio.tables*ROOMS.patio.per+S.rooms.vip.tables*ROOMS.vip.per;
const TH=()=>S.view==='main'?THEMES[S.theme]:Object.assign({},THEMES.diner,ROOMS[S.view],{wall:ROOMS[S.view].wall||THEMES.diner.wall,trim:ROOMS[S.view].trim||THEMES.diner.trim});
const nTables=()=>S.view==='main'?S.tab.tables:S.rooms[S.view].tables;
const rtCost=r=>Math.round(ROOMS[r].tb*Math.pow(ROOMS[r].g,S.rooms[r].tables));
const hr=()=>new Date().getHours(),isRush=()=>hr()===12||hr()===17||hr()===18;
const rushLeft=()=>{const d=new Date(),end=new Date(d);end.setHours(hr()===12?13:19,0,0,0);return Math.max(0,end-d);};
const lerp=(a,b,k)=>a+(b-a)*k,cl=(v,a,b)=>Math.max(a,Math.min(b,v));
function ink(w=3){cx.strokeStyle=OL;cx.lineWidth=w;cx.lineJoin='round';cx.lineCap='round';cx.stroke();}
function el(x,y,rx,ry,c,w=3){cx.fillStyle=c;cx.beginPath();cx.ellipse(x,y,Math.max(.1,rx),Math.max(.1,ry),0,0,TAU);cx.fill();if(w)ink(w);}
function shadow(x,y,rx,ry,a=.22){cx.fillStyle=`rgba(40,20,30,${a})`;cx.beginPath();cx.ellipse(x,y,rx,ry,0,0,TAU);cx.fill();}
const P=(u,v)=>({x:W/2+u*(W*.30+W*.16*v),y:wallH+(bot-wallH)*(.05+.82*v),s:(.62+.5*v)*Math.min(1.25,Math.max(.8,W/390))});
const SKIN=['#8d5524','#c68642','#f1c27d','#5c3a1e','#e0ac69'],HAIR=['#2a1a2e','#5a3a1e','#b8860b','#7a2a32','#1d1d26','#d9d9d9'],SHIRT=['#ff5a3c','#2fd3ff','#7cff6b','#ffd23f','#b07cff','#ff7ab8','#2bb673'];
// ---------- stars ----------
const prog=()=>Object.values(S.tab).reduce((a,b)=>a+b,0)-1+S.decor.length;
const STAR=[2,6,11,17,24];const stars=()=>STAR.filter(n=>prog()>=n).length;
window.dsStars=()=>stars();const NEWG=[3,3,2,2,2];
const starStr=n=>'★'.repeat(n)+'☆'.repeat(5-n);
// ---------- runtime ----------
let bubs={},fly=[],fx=[],pops=[],celeb=null,sig='',constr=null;
function rundown(){const pr=prog();if(pr<3){cx.strokeStyle='rgba(60,30,30,.55)';cx.lineWidth=2;for(const [x0,y0] of[[.12,.35],[.62,.15],[.9,.55]]){let x=W*x0,y=wallH*y0;cx.beginPath();cx.moveTo(x,y);for(let i=0;i<5;i++){x+=(i%2?8:-5);y+=10;cx.lineTo(x,y);}cx.stroke();}}
 if(pr<4){cx.strokeStyle='rgba(255,255,255,.5)';cx.lineWidth=1;for(let i=0;i<5;i++){cx.beginPath();cx.moveTo(0,i*9);cx.quadraticCurveTo(14,14,i*9,0);cx.stroke();}}
 if(pr<6){for(const [u,v,r] of[[-.6,.55,26],[.5,.2,20],[.2,.9,30],[-1,.15,18]]){const p=P(u,v);cx.fillStyle='rgba(110,80,50,.28)';cx.beginPath();cx.ellipse(p.x,p.y,r*p.s,r*.4*p.s,0,0,TAU);cx.fill();}}
 if(pr<2&&Math.sin(BT*13)>.7){cx.fillStyle='rgba(0,0,0,.18)';cx.fillRect(0,0,W,bot);}}
const tables=()=>{const a=[];const cols=[-.85,-.3,.3,.85];for(let r=0;r<2;r++)for(let c=0;c<4;c++)a.push({u:cols[c],v:r?.8:.3,i:r*4+c});return a;};
function coinVal(){return Math.max(5,Math.round(rateMin()*1.2*boost()/Math.max(1,nTables()/2)+3));}
// ---------- characters ----------
function person(x,y,s,k,mood,bob=0,seated=0){const sk=SKIN[k%5],hc=HAIR[k%6],sh=SHIRT[k%7];y+=bob;
 if(!seated){cx.fillStyle='#2a2a38';cx.beginPath();cx.roundRect(x-7*s,y-2*s,6*s,16*s,3*s);cx.roundRect(x+1*s,y-2*s,6*s,16*s,3*s);cx.fill();}
 cx.fillStyle=sh;cx.beginPath();cx.roundRect(x-12*s,y-24*s,24*s,26*s,10*s);cx.fill();ink(2.5);
 el(x,y-34*s,11*s,11*s,sk,2.5);cx.fillStyle=hc;cx.beginPath();cx.arc(x,y-37*s,11.5*s,Math.PI*1.05,-.05);cx.fill();
 cx.fillStyle=OL;const bl=(BT*1.3+k)%4<.12;if(bl){cx.fillRect(x-6*s,y-34*s,4*s,1.6*s);cx.fillRect(x+2*s,y-34*s,4*s,1.6*s);}else{cx.beginPath();cx.arc(x-4*s,y-33.5*s,1.8*s,0,TAU);cx.arc(x+4*s,y-33.5*s,1.8*s,0,TAU);cx.fill();}
 cx.strokeStyle=OL;cx.lineWidth=1.8*s;cx.beginPath();if(mood==='eat'){cx.arc(x,y-28*s,2.6*s,0,TAU);}else cx.arc(x,y-30*s,3.5*s,.2*Math.PI,.8*Math.PI);cx.stroke();
 cx.fillStyle='rgba(255,120,120,.45)';cx.beginPath();cx.arc(x-7*s,y-30*s,2.2*s,0,TAU);cx.arc(x+7*s,y-30*s,2.2*s,0,TAU);cx.fill();}
function staff(x,y,s,k,role,ph,still,O){const walk=still?0:Math.sin(ph*9),sk=SKIN[k%5];shadow(x,y+15*s,15*s,5*s);
 const pants=O&&O.pants||(role==='run'?'#2a3a2a':'#1d1d26');
 cx.strokeStyle=pants;cx.lineWidth=6.5*s;cx.lineCap='round';cx.beginPath();cx.moveTo(x-5*s,y);cx.lineTo(x-5*s+walk*3*s,y+12*s);cx.moveTo(x+5*s,y);cx.lineTo(x+5*s-walk*3*s,y+12*s);cx.stroke();
 for(const d of[-1,1]){el(x+d*5*s+(d<0?walk:-walk)*3*s+d*1.5*s,y+14*s,4.5*s,2.5*s,O&&O.shoe||'#1a1018',1.5);}
 const shirt=O?O.shirt:({bus:'#2fb8d3',bus2:'#2fb8d3',host:'#ff5a3c',run:'#2bb673'}[role]||'#fff');
 // back arm
 const sw=still?0:walk*4*s;cx.strokeStyle=shirt;cx.lineWidth=6*s;cx.beginPath();cx.moveTo(x-11*s,y-18*s);cx.lineTo(x-14*s-sw,y-4*s);cx.stroke();cx.strokeStyle=OL;cx.lineWidth=1.5;cx.stroke();el(x-14*s-sw,y-3*s,3*s,3*s,sk,1.5);
 cx.fillStyle=shirt;cx.beginPath();cx.roundRect(x-12*s,y-24*s,24*s,27*s,9*s);cx.fill();ink(2.5);
 if(O&&O.pattern==='flowers'){cx.fillStyle='#ffd23f';for(const [ox,oy] of[[-7,-18],[5,-12],[-3,-6],[7,-20]]){cx.beginPath();cx.arc(x+ox*s,y+oy*s,2*s,0,TAU);cx.fill();}}
 if(O&&O.shine){cx.fillStyle='rgba(255,255,255,.45)';cx.beginPath();cx.roundRect(x-9*s,y-22*s,4*s,18*s,2*s);cx.fill();}
 const vest=O?O.vest:'#1d1d26';
 if(role==='wait'||role==='srv'||O){if(O&&O.id==='chef'){cx.fillStyle='#1d1d26';for(let i=0;i<3;i++){cx.beginPath();cx.arc(x-4*s,y-18*s+i*6*s,1.3*s,0,TAU);cx.arc(x+4*s,y-18*s+i*6*s,1.3*s,0,TAU);cx.fill();}}
  else{cx.fillStyle=vest;cx.beginPath();cx.roundRect(x-12*s,y-21*s,7.5*s,23*s,3*s);cx.fill();cx.beginPath();cx.roundRect(x+4.5*s,y-21*s,7.5*s,23*s,3*s);cx.fill();}
  if(!O||O.bow!==0){cx.fillStyle=O&&O.tie||'#d6303a';cx.beginPath();cx.moveTo(x-5*s,y-24*s);cx.lineTo(x,y-21.5*s);cx.lineTo(x-5*s,y-19*s);cx.closePath();cx.moveTo(x+5*s,y-24*s);cx.lineTo(x,y-21.5*s);cx.lineTo(x+5*s,y-19*s);cx.closePath();cx.fill();ink(1);}
  if(!O||O.apron){cx.fillStyle='rgba(255,255,255,.95)';cx.beginPath();cx.roundRect(x-8*s,y-4*s,16*s,10*s,2*s);cx.fill();ink(1.5);}}
 if(role==='host'){cx.fillStyle='#fff';cx.fillRect(x-1.5*s,y-23*s,3*s,10*s);cx.fillStyle='#ffd23f';cx.beginPath();cx.roundRect(x+4*s,y-18*s,7*s,4*s,1*s);cx.fill();}
 if(role==='bus'||role==='bus2'){cx.fillStyle='#1d6f86';cx.beginPath();cx.roundRect(x-12*s,y-6*s,24*s,9*s,3*s);cx.fill();ink(1.5);}
 if(role==='run'){cx.fillStyle='#fff';cx.font=`900 ${7*s}px system-ui`;cx.textAlign='center';cx.fillText('RUN',x,y-10*s);}
 // name tag
 if(!O||O.id!=='astro'){cx.fillStyle='#fff';cx.fillRect(x+5*s,y-15*s,5*s,3*s);}
 el(x,y-34*s,11*s,11*s,sk,2.5);
 const hc=HAIR[k%6];cx.fillStyle=hc;cx.beginPath();cx.arc(x,y-37*s,11.5*s,Math.PI*1.05,-.05);cx.fill();if(k%3===1){cx.beginPath();cx.arc(x+9*s,y-31*s,4*s,0,TAU);cx.fill();}
 cx.fillStyle=OL;cx.beginPath();cx.arc(x-4*s,y-33.5*s,1.9*s,0,TAU);cx.arc(x+4*s,y-33.5*s,1.9*s,0,TAU);cx.fill();cx.fillStyle='#fff';cx.beginPath();cx.arc(x-3.4*s,y-34.2*s,.7*s,0,TAU);cx.arc(x+4.6*s,y-34.2*s,.7*s,0,TAU);cx.fill();
 cx.fillStyle='rgba(255,120,120,.35)';cx.beginPath();cx.arc(x-7*s,y-30*s,2*s,0,TAU);cx.arc(x+7*s,y-30*s,2*s,0,TAU);cx.fill();
 cx.strokeStyle=OL;cx.lineWidth=1.8*s;cx.beginPath();cx.arc(x,y-30*s,3.5*s,.2*Math.PI,.8*Math.PI);cx.stroke();
 if(O&&O.hat==='chef'){cx.fillStyle='#fff';cx.beginPath();cx.roundRect(x-9*s,y-50*s,18*s,8*s,2*s);cx.fill();ink(1.5);for(const ox of[-6,0,6]){el(x+ox*s,y-52*s,5*s,5*s,'#fff',1.5);}}
 if(O&&O.hat==='crown'){cx.fillStyle='#ffd23f';cx.beginPath();cx.moveTo(x-8*s,y-45*s);cx.lineTo(x-8*s,y-53*s);cx.lineTo(x-4*s,y-48*s);cx.lineTo(x,y-55*s);cx.lineTo(x+4*s,y-48*s);cx.lineTo(x+8*s,y-53*s);cx.lineTo(x+8*s,y-45*s);cx.closePath();cx.fill();ink(1.5);}
 if(O&&O.hat==='cowboy'){el(x,y-44*s,16*s,3.5*s,'#8a5a2b',1.5);cx.fillStyle='#8a5a2b';cx.beginPath();cx.roundRect(x-8*s,y-53*s,16*s,10*s,4*s);cx.fill();ink(1.5);}
 if(O&&O.hat==='helmet'){cx.strokeStyle='rgba(180,230,255,.9)';cx.lineWidth=2.5*s;cx.beginPath();cx.arc(x,y-34*s,15*s,0,TAU);cx.stroke();cx.fillStyle='rgba(180,230,255,.18)';cx.fill();}
 if(O&&O.shades){cx.fillStyle='#111';cx.beginPath();cx.roundRect(x-9*s,y-36*s,7.5*s,4*s,2*s);cx.roundRect(x+1.5*s,y-36*s,7.5*s,4*s,2*s);cx.fill();}
 if(O&&O.lei){for(let i=0;i<7;i++){cx.fillStyle=['#ff4fa3','#ffd23f','#ff7a3c'][i%3];cx.beginPath();cx.arc(x-9*s+i*3*s,y-23*s+Math.sin(i/6*Math.PI)*4*s,2*s,0,TAU);cx.fill();}}
 if(role==='wait'){cx.strokeStyle=sk;cx.lineWidth=5*s;cx.beginPath();cx.moveTo(x+10*s,y-18*s);cx.lineTo(x+18*s,y-30*s);cx.stroke();el(x+18*s,y-33*s,13*s,3.5*s,'#dfe6ee',2);
  cx.fillStyle=GC[k%GC.length];cx.beginPath();cx.moveTo(x+13*s,y-48*s);cx.lineTo(x+21*s,y-48*s);cx.lineTo(x+20*s,y-36*s);cx.lineTo(x+14*s,y-36*s);cx.closePath();cx.fill();ink(1.5);}
 if(role==='bus'){cx.strokeStyle='#8a6a3a';cx.lineWidth=3*s;cx.beginPath();cx.moveTo(x+12*s,y-20*s);cx.lineTo(x+20*s+Math.sin(ph*6)*4*s,y+12*s);cx.stroke();el(x+20*s+Math.sin(ph*6)*4*s,y+14*s,9*s,4*s,'#e8e8e8',2);}}
function youOutfit(){const o=OUTFITS.find(o=>o.id===S.outfit)||OUTFITS[0];return o;}
// ---------- construction scene ----------
function drawConstr(f){const cx0=W/2,base=bot*.6,s=Math.min(1.15,Math.max(.8,W/390)),fw=190*s,fh=120*s,L=cx0-fw/2,top=base-fh;
 cx.fillStyle='rgba(20,10,25,.5)';cx.fillRect(0,0,W,bot);
 // dirt pad
 el(cx0,base+6*s,fw*.72,22*s,'#a8743f',3);el(cx0,base+2*s,fw*.62,15*s,'#c48a4e',0);
 // crane on the left lowering a plank
 const cr=L-34*s;cx.fillStyle='#ffb21f';cx.fillRect(cr-5*s,top-70*s,10*s,fh+76*s);cx.strokeStyle=OL;cx.lineWidth=2.5;cx.strokeRect(cr-5*s,top-70*s,10*s,fh+76*s);
 cx.strokeStyle='#8a5a12';cx.lineWidth=1.5;for(let y=top-66*s;y<base;y+=12*s){cx.beginPath();cx.moveTo(cr-5*s,y);cx.lineTo(cr+5*s,y+12*s);cx.stroke();}
 cx.fillStyle='#ffb21f';cx.fillRect(cr-14*s,top-78*s,fw*.9,9*s);cx.strokeStyle=OL;cx.lineWidth=2.5;cx.strokeRect(cr-14*s,top-78*s,fw*.9,9*s);
 const sw=Math.sin(BT*2.2)*6*s,hx=cr+fw*.55,hy=top-30*s+Math.sin(BT*1.4)*8*s;cx.strokeStyle='#3a2a30';cx.lineWidth=2;cx.beginPath();cx.moveTo(hx,top-69*s);cx.lineTo(hx+sw,hy);cx.stroke();
 cx.save();cx.translate(hx+sw,hy+4*s);cx.rotate(sw*.01);cx.fillStyle='#d99a55';cx.beginPath();cx.roundRect(-34*s,0,68*s,9*s,3*s);cx.fill();ink(2.5);cx.restore();
 // frame: posts rise one by one
 const wood='#c98a4b',dark='#8f5a2b';const post=(x,y0,h)=>{cx.fillStyle=wood;cx.beginPath();cx.roundRect(x-6*s,y0-h,12*s,h,3*s);cx.fill();ink(2.5);cx.strokeStyle=dark;cx.lineWidth=1.2;cx.beginPath();cx.moveTo(x-2*s,y0-h+6*s);cx.lineTo(x-2*s,y0-6*s);cx.stroke();};
 for(let i=0;i<5;i++){const k=cl(f*3.2-i*.32,0,1),e=1-Math.pow(1-k,3);if(k>0)post(L+i*fw/4,base,fh*e);}
 // top beam slides in
 const tb=cl((f-.32)*4,0,1);if(tb>0){cx.fillStyle=wood;cx.beginPath();cx.roundRect(L-10*s,top-6*s,(fw+20*s)*tb,12*s,3*s);cx.fill();ink(2.5);}
 // roof
 const rf=cl((f-.5)*4,0,1);if(rf>0){cx.strokeStyle=wood;cx.lineWidth=10*s;cx.lineCap='round';cx.beginPath();cx.moveTo(L-8*s,top-4*s);cx.lineTo(L-8*s+(fw/2+8*s)*rf,top-4*s-48*s*rf);cx.moveTo(L+fw+8*s,top-4*s);cx.lineTo(L+fw+8*s-(fw/2+8*s)*rf,top-4*s-48*s*rf);cx.stroke();cx.strokeStyle=OL;cx.lineWidth=2;cx.stroke();}
 // wall planks fill bottom-up
 const wp=cl((f-.62)/.36,0,1),rows=6;for(let r=0;r<rows;r++){const k=cl(wp*rows-r,0,1);if(k<=0)break;const y=base-(r+1)*fh/rows;cx.fillStyle=r%2?'#e8b878':'#dfa865';cx.beginPath();cx.roundRect(L,y+1,fw*k,fh/rows-2,2);cx.fill();cx.strokeStyle='rgba(60,30,20,.55)';cx.lineWidth=1.5;cx.stroke();}
 if(f>.9){cx.save();cx.globalAlpha=(f-.9)*10*(.5+.5*Math.sin(BT*20));cx.fillStyle='#fff';cx.font=`${26*s}px system-ui`;cx.textAlign='center';cx.fillText('✨',L+fw*.2,top+10*s);cx.fillText('✨',L+fw*.85,top+40*s);cx.restore();}
 // worker with hard hat + vest, hammering the right post
 const wx=L+fw+30*s,wy=base-4*s,ws=1.15*s;staff(wx,wy,ws,2,'build',BT);
 cx.fillStyle='#ff7a1a';cx.beginPath();cx.roundRect(wx-12*ws,wy-24*ws,24*ws,20*ws,6*ws);cx.fill();ink(2);cx.fillStyle='#fff36b';cx.fillRect(wx-12*ws,wy-15*ws,24*ws,3*ws);
 cx.fillStyle='#ffd23f';cx.beginPath();cx.arc(wx,wy-38*ws,13*ws,Math.PI,0);cx.lineTo(wx+16*ws,wy-38*ws);cx.lineTo(wx-16*ws,wy-38*ws);cx.closePath();cx.fill();ink(2.5);cx.fillStyle='#f0b800';cx.fillRect(wx-2*ws,wy-50*ws,4*ws,12*ws);
 const swing=Math.sin(BT*14),ang=-1.9+(swing*.5+.5)*1.5;cx.save();cx.translate(wx-10*ws,wy-18*ws);cx.rotate(ang);cx.strokeStyle='#8a5a2b';cx.lineWidth=4*ws;cx.lineCap='round';cx.beginPath();cx.moveTo(0,0);cx.lineTo(0,-24*ws);cx.stroke();cx.fillStyle='#9aa5b1';cx.beginPath();cx.roundRect(-8*ws,-30*ws,16*ws,8*ws,2*ws);cx.fill();ink(2);cx.restore();
 if(swing<-.97&&!constr.hit){constr.hit=1;const px=L+fw+4*s,py=base-fh*.55;for(let i=0;i<7;i++){const a=Math.PI*(.8+Math.random()*.9),v=120+Math.random()*160;fx.push({x:px,y:py,vx:Math.cos(a)*v,vy:Math.sin(a)*v-60,l:.45,c:['#ffd23f','#fff36b','#ff9a2b'][i%3]});}buzz(5);snd(240+Math.random()*80,.04,'square',.05);}if(swing>0)constr.hit=0;
 // dust
 for(let i=0;i<7;i++){const ph=(BT*1.1+i/7)%1;cx.fillStyle=`rgba(235,215,185,${.65*(1-ph)})`;cx.beginPath();cx.arc(L-10*s+i*(fw+20*s)/6,base+8*s-ph*34*s,(8+ph*14)*s,0,TAU);cx.fill();}
 // caution tape
 cx.save();cx.translate(cx0,base+34*s);cx.rotate(-.04);const tw=Math.min(W-24,fw*1.9),th=20*s;cx.beginPath();cx.rect(-tw/2,-th/2,tw,th);cx.fillStyle='#ffd23f';cx.fill();cx.save();cx.clip();cx.fillStyle='#1a1220';for(let x=-tw/2-th+((BT*30)%(th*1.6));x<tw/2+th;x+=th*1.6){cx.beginPath();cx.moveTo(x,-th/2);cx.lineTo(x+th*.7,-th/2);cx.lineTo(x+th*.7-th,th/2);cx.lineTo(x-th,th/2);cx.fill();}cx.restore();cx.strokeStyle=OL;cx.lineWidth=2.5;cx.strokeRect(-tw/2,-th/2,tw,th);
 cx.fillStyle='#ffd23f';const lw=150*s;cx.beginPath();cx.roundRect(-lw/2,-th/2+2,lw,th-4,4);cx.fill();cx.fillStyle='#1a1220';cx.font=`900 ${11*s}px system-ui`;cx.textAlign='center';cx.textBaseline='middle';cx.fillText('UNDER CONSTRUCTION',0,1);cx.textBaseline='alphabetic';cx.restore();
 // progress bar
 const bw=Math.min(W-60,280),by=base+62*s,bh=26;cx.fillStyle='#1a1220';cx.beginPath();cx.roundRect(W/2-bw/2-3,by-3,bw+6,bh+6,16);cx.fill();cx.fillStyle='#3a2a48';cx.beginPath();cx.roundRect(W/2-bw/2,by,bw,bh,13);cx.fill();
 const pw=Math.max(bh,bw*f);cx.save();cx.beginPath();cx.roundRect(W/2-bw/2,by,pw,bh,13);cx.clip();cx.fillStyle='#2bb673';cx.fillRect(W/2-bw/2,by,pw,bh);cx.fillStyle='rgba(255,255,255,.22)';for(let x=W/2-bw/2-30+((BT*40)%24);x<W/2-bw/2+pw;x+=24){cx.beginPath();cx.moveTo(x,by+bh);cx.lineTo(x+12,by+bh);cx.lineTo(x+24,by);cx.lineTo(x+12,by);cx.fill();}cx.fillStyle='rgba(255,255,255,.35)';cx.fillRect(W/2-bw/2,by+3,pw,5);cx.restore();
 cx.font='900 15px system-ui';cx.textAlign='center';cx.textBaseline='middle';cx.lineWidth=4;cx.strokeStyle=OL;cx.strokeText(Math.round(f*100)+'%',W/2,by+bh/2+1);cx.fillStyle='#fff';cx.fillText(Math.round(f*100)+'%',W/2,by+bh/2+1);
 const pulse=1+Math.sin(BT*6)*.05;cx.save();cx.translate(W/2,by+bh+24);cx.scale(pulse,pulse);cx.font='900 16px system-ui';cx.lineWidth=5;cx.strokeText('👆 TAP TO BUILD FASTER',0,0);cx.fillStyle='#ffd23f';cx.fillText('👆 TAP TO BUILD FASTER',0,0);cx.restore();cx.textBaseline='alphabetic';}
// ---------- room ----------
function sky(x,y,w,h){const hr=new Date().getHours(),night=hr<6||hr>=20,dusk=hr>=17&&hr<20;const g=cx.createLinearGradient(0,y,0,y+h);
 if(night){g.addColorStop(0,'#141a44');g.addColorStop(1,'#3b2d6a');}else if(dusk){g.addColorStop(0,'#ff7a59');g.addColorStop(1,'#ffd59a');}else{g.addColorStop(0,'#5fb6ff');g.addColorStop(1,'#cdeeff');}
 cx.fillStyle=g;cx.fillRect(x,y,w,h);
 if(night){cx.fillStyle='#fff';for(let i=0;i<14;i++){cx.globalAlpha=.5+.5*Math.sin(BT*2+i);cx.fillRect(x+(i*53)%w,y+(i*29)%(h*.6),2,2);}cx.globalAlpha=1;el(x+w*.8,y+h*.25,9,9,'#fff6c8',0);}
 else{el(x+w*.8,y+h*.28,11,11,dusk?'#ffef9a':'#fff3a0',0);for(let i=0;i<2;i++){const cxp=x+((BT*8+i*120)%(w+80))-40;cx.fillStyle='rgba(255,255,255,.9)';cx.beginPath();cx.arc(cxp,y+h*.3+i*12,9,0,TAU);cx.arc(cxp+11,y+h*.3+i*12-4,11,0,TAU);cx.arc(cxp+23,y+h*.3+i*12,8,0,TAU);cx.fill();}}
 cx.fillStyle=night?'#241a40':'#7a8fb0';for(let i=0;i<7;i++){const bw=w/7,bh=h*(.25+((i*37)%10)/25);cx.fillRect(x+i*bw,y+h-bh,bw-2,bh);if(night){cx.fillStyle='#ffd27a';for(let j=0;j<3;j++)if((i+j)%2)cx.fillRect(x+i*bw+4,y+h-bh+5+j*9,4,4);cx.fillStyle='#241a40';}}
 return night;}
function room(){const night=new Date().getHours()<6||new Date().getHours()>=20;
 // wall
 const th=TH(),patio=S.view==='patio',vip=S.view==='vip';let g=cx.createLinearGradient(0,0,0,wallH);g.addColorStop(0,th.wall[0]);g.addColorStop(1,th.wall[1]);cx.fillStyle=g;cx.fillRect(0,0,W,wallH);
 if(patio){sky(0,0,W,wallH);cx.fillStyle='#8a5a38';for(let x=4;x<W;x+=22)cx.fillRect(x,wallH*.62,6,wallH*.38);cx.fillRect(0,wallH*.6,W,7);cx.fillRect(0,wallH*.82,W,5);for(const px of[.12,.5,.88]){cx.fillStyle='#b85a2e';cx.fillRect(W*px-16,wallH*.45,32,wallH*.18);cx.fillStyle='#2bb673';cx.beginPath();cx.arc(W*px,wallH*.42,20,0,TAU);cx.fill();ink(2);}}
 else{cx.fillStyle='rgba(255,255,255,.16)';for(let x=0;x<W;x+=26)cx.fillRect(x,0,10,wallH*.78);}
 if(!patio){
 // window
 const wx=W*.38,ww=W*.14,wy=wallH*.3,wh=wallH*.42;cx.fillStyle='#7a4a2a';cx.beginPath();cx.roundRect(wx-6,wy-6,ww+12,wh+12,10);cx.fill();ink(3);sky(wx,wy,ww,wh);cx.fillStyle='#7a4a2a';cx.fillRect(wx+ww/2-2,wy,4,wh);cx.fillRect(wx,wy+wh/2-2,ww,4);
 cx.fillStyle='rgba(255,255,255,.25)';cx.beginPath();cx.moveTo(wx+8,wy+wh-6);cx.lineTo(wx+28,wy+6);cx.lineTo(wx+40,wy+6);cx.lineTo(wx+20,wy+wh-6);cx.fill();
 cx.fillStyle='#d6303a';for(let i=0;i<7;i++){cx.beginPath();cx.moveTo(wx-8+i*(ww+16)/7,wy-8);cx.lineTo(wx-8+(i+1)*(ww+16)/7,wy-8);cx.lineTo(wx-8+(i+.5)*(ww+16)/7,wy+10);cx.fill();}
 // wainscot
 cx.fillStyle=th.trim[0];cx.fillRect(0,wallH*.8,W,wallH*.2);cx.fillStyle=th.trim[1];cx.fillRect(0,wallH*.8,W,5);cx.fillStyle='rgba(0,0,0,.15)';for(let x=12;x<W;x+=40)cx.fillRect(x,wallH*.84,26,wallH*.13);
 // bar (left)
 const bx=6,bw=W*.36;
 drawBarStaff(bx,bw);
 g=cx.createLinearGradient(0,wallH*.62,0,wallH+14);g.addColorStop(0,'#a8683e');g.addColorStop(1,'#6b3d22');cx.fillStyle=g;cx.beginPath();cx.roundRect(bx,wallH*.62,bw,wallH*.38+16,6);cx.fill();ink(3);cx.fillStyle='rgba(255,255,255,.12)';for(let i=1;i<4;i++)cx.fillRect(bx+i*bw/4-2,wallH*.66,4,wallH*.32);cx.fillStyle='#c98a58';cx.beginPath();cx.roundRect(bx-4,wallH*.6,bw+8,10,4);cx.fill();ink(2.5);drawBarDrinks(bx,bw);
 if(vip){cx.fillStyle='#7a1f3a';for(const d of[0,1]){const x0=d?W*.66:W*.34;cx.beginPath();cx.moveTo(x0,wallH*.25);cx.quadraticCurveTo(x0+(d?-1:1)*W*.06,wallH*.5,x0,wallH*.8);cx.lineTo(x0+(d?1:-1)*20,wallH*.8);cx.lineTo(x0+(d?1:-1)*20,wallH*.25);cx.fill();}}
 if(!vip){
 // kitchen pass (right)
 const kx=W*.56,kw=W*.2,ky=wallH*.28,kh=wallH*.36;cx.fillStyle='#c9d3dc';cx.beginPath();cx.roundRect(kx-5,ky-5,kw+10,kh+10,8);cx.fill();ink(3);g=cx.createLinearGradient(0,ky,0,ky+kh);g.addColorStop(0,'#ffcf7a');g.addColorStop(1,'#e88a3a');cx.fillStyle=g;cx.fillRect(kx,ky,kw,kh);
 const hy=ky+kh*.55+Math.sin(BT*2.5)*3;el(kx+kw*.5,hy,10,10,'#f1c27d',2);cx.fillStyle='#fff';cx.beginPath();cx.roundRect(kx+kw*.5-9,hy-22,18,12,3);cx.fill();ink(1.5);el(kx+kw*.5,hy-24,11,7,'#fff',1.5);
 for(let i=0;i<3;i++){const ph=(BT*.6+i*.33)%1;cx.fillStyle=`rgba(255,255,255,${.5*(1-ph)})`;cx.beginPath();cx.arc(kx+kw*.25+i*kw*.25,ky+kh-ph*kh,5+ph*7,0,TAU);cx.fill();}
 cx.fillStyle='#a8b4bf';cx.fillRect(kx-8,ky+kh,kw+16,8);ink(2);el(kx+kw-6,ky+kh-4,6,5,'#f2c230',2);drawPass(kx,kw,ky+kh);
 }else{for(const fx0 of[.82]){cx.fillStyle='#e0a91a';cx.beginPath();cx.roundRect(W*fx0-30,wallH*.28,60,46,4);cx.fill();ink(3);cx.fillStyle='#2a1440';cx.fillRect(W*fx0-24,wallH*.28+6,48,34);el(W*fx0,wallH*.28+23,9,12,'#ffd23f',0);}}
 }
 kitchenDoors();cityDeco();
 // floor
 const fy=wallH,fh=bot-wallH;g=cx.createLinearGradient(0,fy,0,bot);g.addColorStop(0,th.floor[0]);g.addColorStop(1,th.floor[1]);cx.fillStyle=g;cx.fillRect(0,fy,W,fh);
 const rows=9,cols=14;for(let r=0;r<rows;r++){const v0=r/rows,v1=(r+1)/rows,y0=fy+fh*Math.pow(v0,1.15),y1=fy+fh*Math.pow(v1,1.15);for(let c=-cols/2;c<cols/2;c++){if((r+c)&1)continue;const sp0=W*.30+W*.16*v0,sp1=W*.30+W*.16*v1,u0=c/3.4,u1=(c+1)/3.4;cx.fillStyle=th.tile;cx.beginPath();cx.moveTo(W/2+u0*sp0*1.3,y0);cx.lineTo(W/2+u1*sp0*1.3,y0);cx.lineTo(W/2+u1*sp1*1.3,y1);cx.lineTo(W/2+u0*sp1*1.3,y1);cx.fill();}}
 g=cx.createLinearGradient(0,fy,0,fy+28);g.addColorStop(0,'rgba(60,20,30,.3)');g.addColorStop(1,'rgba(60,20,30,0)');cx.fillStyle=g;cx.fillRect(0,fy,W,28);
 // pendant lights
 if(!patio)for(const lx of[.2,.5,.8]){const x=W*lx;cx.strokeStyle='#3a2430';cx.lineWidth=2;cx.beginPath();cx.moveTo(x,0);cx.lineTo(x,wallH*.12);cx.stroke();if(th.lantern){el(x,wallH*.17,10,13,th.lamp,2);cx.fillStyle='rgba(0,0,0,.25)';cx.fillRect(x-10,wallH*.15,20,2);cx.fillRect(x-10,wallH*.19,20,2);}else if(vip){cx.strokeStyle=th.lamp;cx.lineWidth=2;for(let i=-2;i<=2;i++){cx.beginPath();cx.moveTo(x,wallH*.12);cx.lineTo(x+i*7,wallH*.2);cx.stroke();el(x+i*7,wallH*.21,2.5,3.5,'#fff6c8',0);}}else{cx.fillStyle=th.lamp;cx.beginPath();cx.moveTo(x-14,wallH*.2);cx.lineTo(x+14,wallH*.2);cx.lineTo(x+7,wallH*.11);cx.lineTo(x-7,wallH*.11);cx.closePath();cx.fill();ink(2);el(x,wallH*.21,6,3,'#fff6c8',0);}}
 return night;}
function sign(){const st=stars(),w=Math.min(W*.62,260),x=W/2-w/2,y=6,h=38;cx.fillStyle='#2a1a2e';cx.fillRect(W/2-w*.35,0,2,y);cx.fillRect(W/2+w*.35,0,2,y);
 const neon=S.decor.includes('neon');const th=TH();cx.fillStyle=th.signC;cx.beginPath();cx.roundRect(x,y,w,h,12);cx.fill();ink(3);cx.fillStyle='#fff3d6';cx.beginPath();cx.roundRect(x+5,y+5,w-10,h-10,8);cx.fill();
 for(let i=0;i<12;i++){cx.fillStyle=(Math.floor(BT*4)+i)%2?'#ffd23f':'#fff8d0';cx.beginPath();cx.arc(x+10+i*(w-20)/11,y+3,2.2,0,TAU);cx.fill();}
 if(neon){cx.save();cx.shadowColor='#ff4fa3';cx.shadowBlur=12;}cx.fillStyle=neon?'#ff4fa3':'#7a2a32';cx.font=`900 ${Math.min(16,w/(th.sign.length*.62))}px system-ui`;cx.textAlign='center';cx.textBaseline='middle';cx.fillText(th.sign,W/2,y+h/2-1);if(neon)cx.restore();
 cx.font='900 15px system-ui';cx.fillStyle='#ffd23f';cx.strokeStyle=OL;cx.lineWidth=3;cx.strokeText(starStr(st),W/2,y+h+10);if(S.view==='main'){cx.font='900 11px system-ui';cx.lineWidth=3;cx.strokeText(LVN[st].toUpperCase(),W/2,y+h+26);cx.fillStyle='#fff';cx.fillText(LVN[st].toUpperCase(),W/2,y+h+26);cx.fillStyle='#ffd23f';}cx.fillText(starStr(st),W/2,y+h+10);cx.textBaseline='alphabetic';}
// ---------- tables ----------
function tableDraw(t,act,next){const p=P(t.u,t.v),s=p.s,x=p.x,y=p.y;
 if(!act){if(next){const a=.55+.35*Math.sin(BT*4);cx.setLineDash([6,5]);cx.strokeStyle=`rgba(122,42,50,${a})`;cx.lineWidth=3;cx.beginPath();cx.ellipse(x,y,32*s,13*s,0,0,TAU);cx.stroke();cx.setLineDash([]);
   const c=S.view==='main'?upCost(UPS[0]):rtCost(S.view),ok=S.coins>=c;cx.fillStyle=ok?'#2bb673':'#9a8a96';cx.beginPath();cx.roundRect(x-30*s,y-26*s,60*s,22*s,11*s);cx.fill();ink(2.5);cx.fillStyle='#fff';cx.font=`900 ${12*s}px system-ui`;cx.textAlign='center';cx.fillText('+ $'+c,x,y-11*s);t.hit={x,y:y-14*s,r:34*s,buy:1};}return;}
 shadow(x+3*s,y+10*s,40*s,12*s);
 // chairs + guests
 const gs=guest(t),eat=(BT+t.i)%5<2;for(const d of[-1,1]){const cxp=x+d*36*s;cx.fillStyle=S.view==='vip'?'#7a1f3a':'#6b3d22';cx.beginPath();cx.roundRect(cxp-10*s,y-30*s,20*s,34*s,6*s);cx.fill();ink(2);const k=gs.party[d<0?0:1];if(SEATED.has(gs.st)&&k!=null){person(cxp,y-2*s,s*.85,k,'',Math.sin(BT*2+k)*1.2*s,1);seatAct(gs,cxp,y-2*s,s*.85,d,t,d<0?0:1);}}
 // table
 cx.fillStyle='#4a2a18';cx.fillRect(x-3*s,y-4*s,6*s,14*s);el(x,y+10*s,12*s,4*s,'#4a2a18',2);
 el(x,y-6*s,30*s,12*s,'#fff',2.5);cx.save();cx.beginPath();cx.ellipse(x,y-6*s,30*s,12*s,0,0,TAU);cx.clip();cx.fillStyle='rgba(214,48,58,.75)';for(let i=-30;i<30;i+=10)cx.fillRect(x+i*s,y-18*s,5*s,24*s);cx.restore();
 cx.fillStyle='#fff';cx.beginPath();for(let i=0;i<=10;i++){const a=Math.PI*(i/10);cx.arc(x-Math.cos(a)*30*s,y-6*s+Math.sin(a)*12*s,3.5*s,0,TAU);}cx.fill();
 tableItems(gs,x,y,s,t);
 if(S.view==='patio'){cx.fillStyle='#8a6a3a';cx.fillRect(x-1.5*s,y-70*s,3*s,62*s);const uc=['#ff5a3c','#2fb8a3','#ffd23f'][t.i%3];for(let i=0;i<6;i++){cx.fillStyle=i%2?'#fff':uc;cx.beginPath();cx.moveTo(x,y-82*s);cx.lineTo(x-44*s+i*14.7*s,y-62*s);cx.lineTo(x-44*s+(i+1)*14.7*s,y-62*s);cx.closePath();cx.fill();}cx.beginPath();cx.moveTo(x,y-82*s);cx.lineTo(x+44*s,y-62*s);cx.lineTo(x-44*s,y-62*s);cx.closePath();ink(2.5);}
 // bubble emoji
 stateBubble(gs,x,y,s);
 // coin bubble
 const b=bubs[key(t)]||(bubs[key(t)]={});t.hit=null;if(b.ready){const by=y-62*s+Math.sin(BT*4+t.i)*4,pul=1+Math.sin(BT*7)*.06;COINQ.push(()=>{cx.save();cx.globalAlpha=.35;el(x+10*s,by,22*s*pul,22*s*pul,'#ffd23f',0);cx.restore();el(x+10*s,by,15*s*pul,15*s*pul,'#ffd23f',3);el(x+10*s,by,10*s,10*s,'#ffe680',0);cx.fillStyle='#b8860b';cx.font=`900 ${15*s}px system-ui`;cx.textAlign='center';cx.textBaseline='middle';cx.fillText('$',x+10*s,by+1);cx.textBaseline='alphabetic';});t.hit={x:x+10*s,y:by,r:Math.max(30,36*s)};}}

// ---------- guest lifecycle ----------
// ---------- guests + staff service simulation ----------
const guests={};const key=t=>S.view+':'+t.i;const ENT={u:1.55,v:.62};
const SEATED=new Set(['menu','ready','ordering','waiting','eating']);
const SPOT={pod:{u:1.12,v:.52},bus:{u:-1.04,v:.52},bar:{u:-1.02,v:.03},kit:{u:1.3,v:-.03},home:{u:.05,v:.55}};
const FOODS=['🍔','🍕','🥩','🍝','🌮','🍣','🥗','🍗'],DRK=['#ff7a3c','#7ee0ff','#ffd23f','#ff4fa3','#7cff6b','#c0213a'];
function party(){const a=Math.random()*40|0,b=Math.random()<.7?Math.random()*40|0:null;return Math.random()<.5?[a,b]:[b,a];}
function guest(t){const k=key(t);if(!guests[k]){const r=Math.random();guests[k]=r<.45?{st:'eating',t:rand(3,10),party:party(),d:2,f:2,fe:(CFOOD[S.city]||FOODS)[t.i%8],dc:DRK[t.i%6]}:r<.6?{st:'dirty',party:[null,null],clr:0}:{st:'empty',t:rand(.5,4),party:party()};}if(guests[k].st==='dirty'&&!guests[k].tq){guests[k].tq=1;task('clear',t,guests[k]);}return guests[k];}
const rush=()=>isRush()?1.6:1;
let sim={view:'',ag:[],tasks:[],barQ:[],passQ:[],door:0,sig:''};
const lvl=k=>S.tab[k]||0;
function task(type,t,g,extra){sim.tasks.push(Object.assign({type,t,g,by:null},extra||{}));}
function side(t){return{u:t.u+(t.u>0?-.02:.02),v:t.v+.13};}
function placeOrder(t,g){g.st='waiting';g.d=0;g.f=0;g.fe=(CFOOD[S.city]||FOODS)[(Math.random()*8)|0];g.dc=DRK[(Math.random()*6)|0];
 if(lvl('bartender')){sim.barQ.push({t,g,c:g.dc,ready:0,left:3.4/(1+.12*lvl('bartender')),total:3.4/(1+.12*lvl('bartender'))});}else task('drink',t,g,{make:1});
 g.cook=5.5;}
function served(g){if(g.d===2&&g.f===2){g.st='eating';g.t=rand(6,9);}}
// ---- staff agents
function want(){const a=[];const n=1+Math.min(lvl('waiter'),3);for(let i=0;i<n;i++)a.push(['server',i]);if(lvl('host'))a.push(['host',0]);for(let i=0;i<Math.min(lvl('runner'),2);i++)a.push(['runner',i]);if(lvl('busboy'))a.push(['bus',0]);if(lvl('busboy')>=4)a.push(['bus',1]);return a;}
function syncAgents(T){const sg=S.view+want().map(x=>x.join()).join('|');if(sim.sig===sg)return;const old=sim.ag;sim.ag=[];sim.sig=sg;
 if(sim.view!==S.view){sim.view=S.view;sim.tasks=[];sim.barQ=[];sim.passQ=[];for(const k in guests)if(k.startsWith(S.view+':'))delete guests[k];}
 want().forEach(([role,i])=>{const o=old.find(a=>a.role===role&&a.i===i&&!a.steps.length);const home=role==='host'?{u:SPOT.pod.u-.02,v:SPOT.pod.v+.08}:role==='bus'?{u:SPOT.bus.u+.1+i*.12,v:SPOT.bus.v+.1}:role==='runner'?{u:1.05,v:.12+i*.12}:{u:-.5+i*.38,v:.55};
  sim.ag.push(o?Object.assign(o,{home}):{role,i,u:home.u,v:home.v,home,steps:[],task:null,carry:null,act:'',hidden:0,k:role==='server'?i*2+1:role==='host'?2:role==='runner'?5+i:4,face:1,mv:0});});
 for(const tk of sim.tasks)if(tk.by&&!sim.ag.includes(tk.by)){tk.by=null;}}
const CAN={server:['order','drink','food','roll','clear'],runner:['food'],bus:['roll','clear'],host:['seat']};
function pick(a){let list=CAN[a.role].slice();if(a.role==='server'){if(lvl('runner'))list=list.filter(x=>x!=='food');if(lvl('busboy'))list=list.filter(x=>x!=='clear'&&x!=='roll');}
 let best=null;for(const tk of sim.tasks){if(tk.by||!list.includes(tk.type))continue;if(tk.type==='drink'&&tk.q&&!tk.q.ready)continue;if(!best||list.indexOf(tk.type)<list.indexOf(best.type))best=tk;}
 if(best){best.by=a;a.task=best;a.steps=plan(a,best);}}
// ---- drawing
// ---- path finding (keeps everyone in the aisles: no walking through tables or stations)
const GU0=-1.45,GV0=-.06,GDU=.05,GDV=.035,GNU=66,GNV=32;let BLK=null,BLKsig='';
function isBlocked(u,v,T){for(const t of T)if(Math.abs(u-t.u)<.3&&Math.abs(v-t.v)<.09)return 1;for(const st of[SPOT.pod,SPOT.bus])if(Math.abs(u-st.u)<.13&&Math.abs(v-st.v)<.07)return 1;return 0;}
function buildBlk(T){const sg=S.view+':'+T.length;if(BLKsig===sg)return;BLKsig=sg;BLK=new Uint8Array(GNU*GNV);for(let j=0;j<GNV;j++)for(let i=0;i<GNU;i++)BLK[j*GNU+i]=isBlocked(GU0+i*GDU,GV0+j*GDV,T);}
const cellU=i=>GU0+i*GDU,cellV=j=>GV0+j*GDV;
function nearestFree(i,j){if(!BLK[j*GNU+i])return[i,j];for(let r=1;r<12;r++)for(let dj=-r;dj<=r;dj++)for(let di=-r;di<=r;di++){const a=i+di,b=j+dj;if(a>=0&&b>=0&&a<GNU&&b<GNV&&!BLK[b*GNU+a])return[a,b];}return[i,j];}
function clear2(a,b){const n=Math.ceil(Math.hypot(b.u-a.u,(b.v-a.v)*1.6)/.02);for(let k=1;k<n;k++){const u=lerp(a.u,b.u,k/n),v=lerp(a.v,b.v,k/n),i=Math.round((u-GU0)/GDU),j=Math.round((v-GV0)/GDV);if(i>=0&&j>=0&&i<GNU&&j<GNV&&BLK[j*GNU+i])return 0;}return 1;}
function findPath(a,b){const ci=p=>[cl(Math.round((p.u-GU0)/GDU),0,GNU-1),cl(Math.round((p.v-GV0)/GDV),0,GNV-1)];
 if(clear2(a,b))return[b];const[si,sj]=nearestFree(...ci(a)),[ti,tj]=nearestFree(...ci(b)),N=GNU*GNV,g=new Float32Array(N).fill(1e9),from=new Int32Array(N).fill(-1),done=new Uint8Array(N);
 const s0=sj*GNU+si,t0=tj*GNU+ti;g[s0]=0;const open=[s0];const h=k=>Math.hypot((k%GNU-ti)*GDU,((k/GNU|0)-tj)*GDV*1.6);
 while(open.length){let bi=0;for(let k=1;k<open.length;k++)if(g[open[k]]+h(open[k])<g[open[bi]]+h(open[bi]))bi=k;const c=open.splice(bi,1)[0];if(c===t0)break;if(done[c])continue;done[c]=1;const cu=c%GNU,cv=c/GNU|0;
  for(let dj=-1;dj<=1;dj++)for(let di=-1;di<=1;di++){if(!di&&!dj)continue;const nu=cu+di,nv=cv+dj;if(nu<0||nv<0||nu>=GNU||nv>=GNV)continue;const n=nv*GNU+nu;if(BLK[n]||done[n])continue;if(di&&dj&&(BLK[cv*GNU+nu]||BLK[nv*GNU+cu]))continue;const ng=g[c]+Math.hypot(di*GDU,dj*GDV*1.6);if(ng<g[n]){g[n]=ng;from[n]=c;open.push(n);}}}
 const raw=[];let k=t0;if(from[k]<0&&k!==s0)return[b];while(k>=0&&k!==s0){raw.unshift({u:cellU(k%GNU),v:cellV(k/GNU|0)});k=from[k];}raw.push(b);
 const out=[];let cur=a,i=0;while(i<raw.length){let j=raw.length-1;while(j>i&&!clear2(cur,raw[j]))j--;out.push(raw[j]);cur=raw[j];i=j+1;}return out;}
const seatPos=(t,j)=>({u:t.u+(j?1:-1)*.2,v:t.v-.01}),appr=(t,j)=>({u:t.u+(j?1:-1)*.12,v:t.v+.14});
function along(path,d){let p=path[0];for(let k=1;k<path.length;k++){const a=path[k-1],b=path[k],L=Math.hypot(b.u-a.u,(b.v-a.v)*1.6);if(d<=L)return{u:lerp(a.u,b.u,d/L),v:lerp(a.v,b.v,d/L),done:0,dir:Math.sign(b.u-a.u)};d-=L;p=b;}return{u:p.u,v:p.v,done:1,dir:0};}
const plen=path=>{let L=0;for(let k=1;k<path.length;k++)L+=Math.hypot(path[k].u-path[k-1].u,(path[k].v-path[k-1].v)*1.6);return L;};
function startSit(t,g){g.st='sit';g.sa=0;g.lead=null;g.from=[0,1].map(j=>g.cur&&g.cur[j]?g.cur[j]:appr(t,j));}
window._dbg=()=>({sim,isBlocked,tables,nTables});
function drinkIcon(x,y,s,c){cx.fillStyle='rgba(220,235,245,.9)';cx.beginPath();cx.moveTo(x-6*s,y-9*s);cx.lineTo(x+6*s,y-9*s);cx.lineTo(x+4.5*s,y+6*s);cx.lineTo(x-4.5*s,y+6*s);cx.closePath();cx.fill();ink(1.5);cx.fillStyle=c;cx.beginPath();cx.moveTo(x-5.2*s,y-4*s);cx.lineTo(x+5.2*s,y-4*s);cx.lineTo(x+4*s,y+5*s);cx.lineTo(x-4*s,y+5*s);cx.closePath();cx.fill();cx.strokeStyle='#ff4f6b';cx.lineWidth=1.6*s;cx.beginPath();cx.moveTo(x+1*s,y-3*s);cx.lineTo(x+4*s,y-13*s);cx.stroke();}
// ---- extra spots + idle life
SPOT.pos={u:0,v:.08};SPOT.pass={u:1.12,v:.1};SPOT.queue={u:1.33,v:.62};SPOT.busFront={u:-.86,v:.52};
sim.bin=0;sim.cart='home';
const HOSTQ=()=>({u:SPOT.pod.u-.03,v:SPOT.pod.v+.09});
function idlePlan(a){const T=tables().slice(0,nTables());
 if(a.role==='server'){const seated=T.filter(t=>['waiting','eating'].includes(guest(t).st));if(seated.length&&Math.random()<.6){const t=seated[(Math.random()*seated.length)|0];return[{go:side(t)},{wait:1.3,act:'check',tt:t}];}return[{go:{u:SPOT.pos.u+(a.i%2?.06:-.06),v:SPOT.pos.v+.04}},{wait:1.6,act:'pos'}];}
 if(a.role==='runner')return[{go:{u:SPOT.pass.u-.08*a.i,v:SPOT.pass.v}},{wait:2,act:'ready'}];
 if(a.role==='bus'){const r=Math.random();if(r<.5)return[{go:SPOT.busFront},{wait:1.6,act:'tidy'}];const t=T[(Math.random()*T.length)|0];return t?[{go:{u:t.u,v:t.v+.2}},{wait:.8,act:'look'}]:[];}
 return[];}
function talkBubbles(g,p,x,y,s,isHost){const k=Math.floor(p*4);const lines=['👋','😊','✌️','👍'];if(isHost&&(k===1||k===3))bubble(x,y-62*s,lines[k],s);if(!isHost&&(k===0||k===2))bubble(x,y-58*s,lines[k],s);}
function seatAct(g,x,y,s,d,t,j){const ph=(BT*.55+t.i*.37+j*.9)%4,side=d,hx=x-side*10*s,hy=y-30*s;
 if(g.st==='menu'){cx.fillStyle='#7a1f2a';cx.save();cx.translate(x-side*4*s,y-20*s);cx.rotate(-side*.15);cx.beginPath();cx.roundRect(-8*s,-10*s,16*s,14*s,2*s);cx.fill();ink(1.5);cx.fillStyle='#ffd23f';cx.fillRect(-4*s,-6*s,8*s,1.5*s);cx.restore();return;}
 const hand=(tx,ty)=>{cx.strokeStyle=SKIN[(g.party[j]??0)%5];cx.lineWidth=4*s;cx.lineCap='round';cx.beginPath();cx.moveTo(x-side*8*s,y-16*s);cx.lineTo(tx,ty);cx.stroke();};
 const sipping=g.d===2&&ph<.9,eating=g.st==='eating'&&g.f===2&&ph>=1&&ph<2.6,talking=ph>=2.6&&(g.st==='eating'||g.st==='waiting'||g.st==='ready');
 if(sipping){const up=Math.sin(Math.min(1,ph/.45)*Math.PI/2)*(ph<.7?1:1-(ph-.7)/.2),cx0=lerp(x-side*16*s,hx,up),cy0=lerp(y-14*s,hy,up);hand(cx0,cy0+4*s);drinkIcon(cx0,cy0,s*.7,g.dc);}
 else if(eating){const e=((ph-1)/.8)%1,up=Math.sin(e*Math.PI),fx0=lerp(x-side*16*s,hx,up),fy0=lerp(y-12*s,hy+2*s,up);hand(fx0,fy0);cx.strokeStyle='#c9d3dc';cx.lineWidth=2*s;cx.beginPath();cx.moveTo(fx0,fy0);cx.lineTo(fx0-side*4*s,fy0-6*s);cx.stroke();if(up>.5){cx.fillStyle='#d9a066';cx.beginPath();cx.arc(fx0-side*4*s,fy0-6*s,2*s,0,TAU);cx.fill();}}
 else if(talking&&((Math.floor(ph*3)+j)%2===0)){const em=['💬','😂','😄','🤣','🗣️'][(t.i+j+Math.floor(BT))%5];bubble(x-side*14*s,y-56*s,em,s);}}
function busCart(x,y,s,n){shadow(x,y+4*s,24*s,6*s);cx.fillStyle='#9aa5b1';cx.beginPath();cx.roundRect(x-20*s,y-26*s,40*s,6*s,2*s);cx.fill();ink(2);cx.beginPath();cx.roundRect(x-20*s,y-10*s,40*s,6*s,2*s);cx.fill();ink(2);
 cx.strokeStyle='#6a7580';cx.lineWidth=3*s;cx.beginPath();cx.moveTo(x-18*s,y-26*s);cx.lineTo(x-18*s,y);cx.moveTo(x+18*s,y-26*s);cx.lineTo(x+18*s,y);cx.stroke();el(x-18*s,y+1*s,3*s,3*s,'#333',1);el(x+18*s,y+1*s,3*s,3*s,'#333',1);
 cx.fillStyle='#3a6ea5';cx.beginPath();cx.roundRect(x-16*s,y-38*s,32*s,12*s,2*s);cx.fill();ink(1.5);
 for(let i=0;i<n;i++){const ox=-11+i*7;el(x+ox*s,y-39*s-i*1.5*s,5*s,2*s,'#fff',1);cx.fillStyle='rgba(220,235,245,.9)';cx.fillRect(x+(ox+2)*s,y-46*s-i*2*s,3*s,6*s);}
 if(n>=4){cx.fillStyle='#ff4f6b';cx.font=`900 ${9*s}px system-ui`;cx.textAlign='center';cx.fillText('FULL',x,y-52*s);}}
function plan(a,tk){const t=tk.t,g=tk.g,S2=t?side(t):SPOT.busFront,done=()=>{sim.tasks=sim.tasks.filter(x=>x!==tk);a.task=null;};
 if(tk.type==='seat')return[{go:HOSTQ()},{until:()=>g.st==='arrive'&&g.atQ},{wait:1.8,act:'talk',g},{fn:()=>{g.st='walk';g.lead=a;a.trail=[];a.carry={type:'menu'};}},{go:{u:t.u,v:t.v+.2},slow:1},{fn:()=>{startSit(t,g);g.menus=0;a.moving={type:'menu'};a.carry=null;}},{wait:.7,act:'set',tt:t},{fn:()=>{a.moving=null;g.menus=1;done();}},{wait:.4,act:'wave'}];
 if(tk.type==='order')return[{go:S2},{fn:()=>{g.st='ordering';}},{wait:1.5,act:'write',tt:t},{fn:()=>{placeOrder(t,g);g.menus=0;done();}}];
 if(tk.type==='drink')return[{go:SPOT.bar},...(tk.make?[{wait:2.2,act:'make'}]:[]),{fn:()=>{const q=tk.q;a.grab={c:g.dc,x:q&&q.x||null,y:q&&q.y||null};if(q)sim.barQ=sim.barQ.filter(x=>x!==q);}},{wait:.4,act:'grab'},{fn:()=>{a.grab=null;a.carry={type:'drink',c:g.dc};}},{go:S2},{fn:()=>{a.moving=a.carry;a.carry=null;}},{wait:.45,act:'set',tt:t},{fn:()=>{a.moving=null;g.d=2;served(g);done();}}];
 if(tk.type==='food')return[{go:SPOT.kit},{fn:()=>{a.hidden=1;sim.door=.7;}},{wait:.8},{fn:()=>{a.hidden=0;sim.door=.7;const i=sim.passQ.findIndex(x=>x.g===g);if(i>=0)sim.passQ.splice(i,1);a.carry={type:'food',e:g.fe};}},{go:S2},{fn:()=>{a.moving=a.carry;a.carry=null;}},{wait:.45,act:'set',tt:t},{fn:()=>{a.moving=null;g.f=2;served(g);done();}}];
 if(tk.type==='clear')return[{go:S2},{fn:()=>{g.clr=0;a.carry={type:'tub',n:0};}},{wait:2.2,act:'clear',tt:t,g},{fn:()=>{g.st='empty';g.clr=0;g.t=rand(1.5,4);}},{go:SPOT.busFront},{until:()=>sim.cart==='home'},{wait:.5,act:'dump'},{fn:()=>{a.carry=null;sim.bin=Math.min(4,sim.bin+1);if(sim.bin>=4&&!sim.tasks.some(x=>x.type==='roll'))task('roll',null,null);done();}}];
 if(tk.type==='roll')return[{go:SPOT.busFront},{fn:()=>{sim.cart='moving';a.cart=1;}},{go:{u:SPOT.kit.u-.02,v:SPOT.kit.v+.05}},{fn:()=>{a.hidden=1;sim.door=.8;}},{wait:1.4},{fn:()=>{a.hidden=0;sim.door=.8;sim.bin=0;}},{go:SPOT.busFront},{fn:()=>{a.cart=0;sim.cart='home';done();}}];
 return[];}
function stepGuests(T){const dt=1/60,sp=rush();
 for(const t of T){const g=guest(t);
  if(g.st==='empty'){g.t-=dt*sp;if(g.t<=0){g.party=party();if(g.party[0]==null&&g.party[1]==null)g.party[0]=7;g.wait=0;g.cur=null;g.atQ=0;
    if(lvl('host')){g.st='arrive';const q=T.filter(x=>guest(x).st==='arrive').length;g.qi=q;g.path=[ENT,...findPath(ENT,{u:SPOT.queue.u+.1*q,v:SPOT.queue.v+.03*q})];g.L=plen(g.path);g.dd=0;task('seat',t,g);}else g.st='arrive';}}
  else if(g.st==='arrive'){g.wait+=dt;if(lvl('host')){if(!g.atQ){g.dd+=dt*sp*.36;if(g.dd>=g.L)g.atQ=1;}}else if(g.wait>1.6){g.st='walk';g.lead=null;g.path=[ENT,...findPath(ENT,{u:t.u,v:t.v+.2})];g.L=plen(g.path);g.dd=0;}}
  else if(g.st==='walk'&&!g.lead){g.dd+=dt*sp*.36;if(g.dd>=g.L+.15){startSit(t,g);g.menus=1;}}
  else if(g.st==='sit'){g.sa+=dt*sp/.9;if(g.sa>=1){g.st='menu';g.t=rand(2.5,4);}}
  else if(g.st==='menu'){g.t-=dt*sp;if(g.t<=0){g.st='ready';task('order',t,g);}}
  else if(g.st==='waiting'&&g.cook>0){g.cook-=dt*sp*(1+.1*stars());if(g.cook<=0){sim.passQ.push({t,g,e:g.fe});task('food',t,g);snd(1568,.12,'triangle',.06);pops.push({x:P(SPOT.kit.u,0).x-60,y:wallH*.55,t:'🛎️ ORDER UP',l:.9,c:'#fff'});}}
  else if(g.st==='eating'){g.t-=dt*sp;if(g.t<=0){g.st='stand';g.sa=0;const b=bubs[key(t)]||(bubs[key(t)]={});b.ready=1;}}
  else if(g.st==='stand'){g.sa+=dt*sp/.8;if(g.sa>=1){g.st='leave';g.path=[{u:t.u,v:t.v+.2},...findPath({u:t.u,v:t.v+.2},ENT)];g.L=plen(g.path);g.dd=0;g.clr=0;}}
  else if(g.st==='leave'){g.dd+=dt*sp*.36;if(g.dd>=g.L+.15){g.st='dirty';g.tq=1;task('clear',t,g);}}}
 for(const q of sim.barQ)if(!q.ready){q.left-=dt*sp;if(q.left<=0){q.ready=1;task('drink',q.t,q.g,{q});}break;}}
function stepSim(T){buildBlk(T);syncAgents(T);stepGuests(T);const dt=1/60;sim.door=Math.max(0,sim.door-dt);
 for(const a of sim.ag){if(!a.steps.length)pick(a);else if(a.steps.idle){const keep=a.steps;a.steps=[];pick(a);if(!a.steps.length)a.steps=keep;else a.idleT=0;}
  if(!a.steps.length&&!a.task&&(a.idleT||0)>1.2){a.idleT=0;const st=idlePlan(a);if(st.length){a.steps=st;a.steps.idle=1;}}
  a.mv=0;a.act='';a.tt=null;const st=a.steps[0];
  if(a.trail){a.trail.push({u:a.u,v:a.v});if(a.trail.length>240)a.trail.shift();}
  if(!st){a.idleT=(a.idleT||0)+dt;if(!a.homePath||a.homeFor!==a.home){a.homePath=findPath({u:a.u,v:a.v},a.home);a.homeFor=a.home;}const nx=a.homePath[0];if(nx){const dx=nx.u-a.u,dy=nx.v-a.v,d=Math.hypot(dx,dy*1.6),sp=.45*dt;if(d<=sp){a.u=nx.u;a.v=nx.v;a.homePath.shift();}else{a.u+=dx/d*sp;a.v+=dy/d*sp;a.mv=1;if(Math.abs(dx)>.005)a.face=dx<0?-1:1;}}continue;}
  a.homePath=null;
  if(st.go){if(!st.path)st.path=findPath({u:a.u,v:a.v},st.go);const nx=st.path[0];if(!nx){a.steps.shift();continue;}const sp=(st.slow||a.cart?.38:.72)*(1+.06*(lvl(a.role==='server'?'waiter':a.role==='bus'?'busboy':a.role)||0))*rush()*dt,dx=nx.u-a.u,dy=nx.v-a.v,d=Math.hypot(dx,dy*1.6);
   if(d<=sp){a.u=nx.u;a.v=nx.v;st.path.shift();if(!st.path.length)a.steps.shift();}else{a.u+=dx/d*sp;a.v+=dy/d*sp;a.mv=1;if(Math.abs(dx)>.005)a.face=dx<0?-1:1;}}
  else if(st.until){if(st.until())a.steps.shift();}
  else if(st.wait!=null){if(st.total==null)st.total=st.wait;st.wait-=dt*rush();a.act=st.act||'';a.tt=st.tt||null;a.prog=1-Math.max(0,st.wait)/st.total;if(st.act==='clear'&&st.g){st.g.clr=a.prog;a.carry.n=Math.min(4,Math.floor(a.prog*9));}if(st.act==='talk'&&st.g)st.g.talk=a.prog;if(st.wait<=0)a.steps.shift();}
  else if(st.fn){st.fn();a.steps.shift();if(!a.task&&a.trail&&a.role==='host'&&!a.steps.some(x=>x.go))a.trail=null;}}}
function actDraw(a,x,y,s){const t=BT*8,tp=a.tt?P(a.tt.u,a.tt.v):null,arm=(tx,ty)=>{cx.strokeStyle=SKIN[a.k%5];cx.lineWidth=5*s;cx.lineCap='round';cx.beginPath();cx.moveTo(x+6*s,y-22*s);cx.lineTo(tx,ty);cx.stroke();};
 if(a.act==='write'){cx.fillStyle='#fff';cx.beginPath();cx.roundRect(x+8*s,y-30*s,12*s,15*s,2*s);cx.fill();ink(1.5);cx.strokeStyle=OL;cx.lineWidth=1.5;cx.beginPath();cx.moveTo(x+18*s+Math.sin(t*2)*3*s,y-27*s);cx.lineTo(x+22*s+Math.sin(t*2)*3*s,y-33*s);cx.stroke();bubble(x,y-62*s,'✏️',s);}
 else if(a.act==='clear'&&tp){const ts=tp.s,p=a.prog;
  if(p<.42){const seg=p/.42*3,k=Math.floor(seg),f=seg-k,sx=tp.x+[-9,9,0][k]*ts,sy=tp.y-8*ts,tx=x,ty=y-24*s,ix=lerp(sx,tx,f),iy=lerp(sy,ty,f)-Math.sin(f*Math.PI)*14*s;arm(ix,iy);
   if(k===0)drinkIcon(ix,iy,ts*.7,'rgba(200,120,80,.6)');else if(k===1)el(ix,iy,7*ts,3*ts,'#eef2f6',1.5);else{cx.strokeStyle='#c9d3dc';cx.lineWidth=2*ts;cx.beginPath();cx.moveTo(ix-5*ts,iy);cx.lineTo(ix+5*ts,iy-3*ts);cx.stroke();}}
  else{const hx=tp.x+Math.sin(BT*9)*18*ts,hy=tp.y-7*ts+Math.cos(BT*9)*2*ts;arm(hx,hy);cx.save();cx.translate(hx,hy);cx.rotate(Math.sin(BT*9)*.3);cx.fillStyle='#7ec8f0';cx.beginPath();cx.moveTo(-8*ts,-3*ts);cx.quadraticCurveTo(0,-6*ts,8*ts,-3*ts);cx.lineTo(7*ts,3*ts);cx.quadraticCurveTo(0,5*ts,-7*ts,3*ts);cx.closePath();cx.fill();ink(1.5);cx.strokeStyle='rgba(255,255,255,.7)';cx.lineWidth=1;cx.beginPath();cx.moveTo(-5*ts,0);cx.lineTo(5*ts,-1*ts);cx.stroke();cx.restore();
   cx.fillStyle='rgba(255,255,255,.7)';for(let i=0;i<3;i++){cx.beginPath();cx.arc(hx-14*ts+i*9*ts+Math.sin(BT*7+i)*3,hy-6*ts-((BT*2+i/3)%1)*10*ts,2*ts,0,TAU);cx.fill();}
   if(p>.92){cx.font=`${14*ts}px system-ui`;cx.textAlign='center';cx.fillText('✨',tp.x,tp.y-16*ts);}}}
 else if(a.act==='make'){cx.save();cx.translate(x+16*s,y-30*s+Math.sin(t*3)*4*s);cx.rotate(Math.sin(t*3)*.4);cx.fillStyle='#c9d3dc';cx.beginPath();cx.roundRect(-5*s,-12*s,10*s,18*s,3*s);cx.fill();ink(1.5);cx.restore();}
 else if(a.act==='grab'&&a.grab){const p=a.prog,gx=a.grab.x??x+6*s,gy=a.grab.y??y-60*s,tx=x+18*s,ty=y-38*s,ix=lerp(gx,tx,p),iy=lerp(gy,ty,p)-Math.sin(p*Math.PI)*10;arm(ix,iy+6);drinkIcon(ix,iy,s*1.1,a.grab.c);}
 else if(a.act==='set'&&tp&&a.moving){const p=a.prog,ts=tp.s,sx=x+18*s,sy=y-40*s,isM=a.moving.type==='menu',tx=tp.x+(a.moving.type==='drink'?6:isM?0:-6)*ts,ty=tp.y-12*ts,ix=lerp(sx,tx,p),iy=lerp(sy,ty,p)-Math.sin(p*Math.PI)*12;arm(ix,iy+4);
  if(a.moving.type==='drink')drinkIcon(ix,iy,s*1.1,a.moving.c);else if(isM){for(const o of[-5,5]){cx.fillStyle='#7a1f2a';cx.beginPath();cx.roundRect(ix+o*s-5*s,iy-7*s,10*s,13*s,2*s);cx.fill();ink(1.2);}}else{el(ix,iy+4,10*s,3.5*s,'#fff',1.5);cx.font=`${15*s}px system-ui`;cx.textAlign='center';cx.textBaseline='middle';cx.fillText(a.moving.e,ix,iy-3);cx.textBaseline='alphabetic';}}
 else if(a.act==='talk'){talkBubbles(null,a.prog,x,y,s,1);}
 else if(a.act==='check'){bubble(x,y-62*s,(BT|0)%2?'👍':'😊',s);}
 else if(a.act==='pos'){arm(x+14*s+Math.sin(BT*12)*2*s,y-30*s);}
 else if(a.act==='ready'){cx.strokeStyle=SKIN[a.k%5];cx.lineWidth=5*s;cx.beginPath();cx.moveTo(x-8*s,y-18*s);cx.lineTo(x+8*s,y-18*s);cx.stroke();}
 else if(a.act==='tidy'||a.act==='dump'){arm(x-14*s+Math.sin(BT*8)*4*s,y-26*s);}
 else if(a.act==='look'){if(Math.sin(BT*3)>.3)bubble(x,y-62*s,'👀',s);}
 else if(a.act==='wave'){bubble(x,y-62*s,'👋',s);}}
function simEntities(){const E=[];
 {const p=P(SPOT.pod.u,SPOT.pod.v);E.push({y:p.y,f:()=>hostStand(p.x,p.y,p.s,lvl('host'))});}
 {const p=P(SPOT.bus.u,SPOT.bus.v);E.push({y:p.y,f:()=>{if(sim.cart==='home')busStation(p.x,p.y,p.s*.85,lvl('busboy'));else{cx.setLineDash([4,4]);cx.strokeStyle='rgba(60,40,50,.5)';cx.lineWidth=2;cx.strokeRect(p.x-20*p.s,p.y-30*p.s,40*p.s,32*p.s);cx.setLineDash([]);TAGS.push([p.x,p.y+12*p.s,'🧺 EMPTYING…',0]);}}});}
 {const p=P(SPOT.pos.u,SPOT.pos.v-.05);E.push({y:p.y,f:()=>{const s=p.s;shadow(p.x,p.y+2*s,10*s,3*s);cx.fillStyle='#4a4f58';cx.fillRect(p.x-2*s,p.y-22*s,4*s,22*s);cx.fillStyle='#2a2f38';cx.beginPath();cx.roundRect(p.x-11*s,p.y-34*s,22*s,14*s,2*s);cx.fill();ink(2);cx.fillStyle=Math.sin(BT*3)>0?'#7ee0ff':'#5ac8f0';cx.fillRect(p.x-9*s,p.y-32*s,18*s,10*s);}});}
 for(const a of sim.ag){if(a.hidden)continue;const p=P(a.u,a.v),s=p.s*.9,role=a.role==='server'?'srv':a.role==='bus'?'bus2':a.role,bob=a.mv?Math.abs(Math.sin(BT*9+a.i))*-2:0;
  if(a.cart){const cp=P(a.u+(a.face||1)*.12,a.v);E.push({y:cp.y,f:()=>busCart(cp.x,cp.y,cp.s*.85,sim.bin)});}
  E.push({y:p.y+14*s,f:()=>{staff(p.x,p.y+bob,s,a.k,role,BT*1.4+a.i,!a.mv,a.role==='server'&&a.i===0?youOutfit():null);carryDraw(p.x,p.y+bob,s,a.carry);actDraw(a,p.x,p.y,s);
   if(a.role==='server'&&a.i===0){cx.fillStyle='#ffd23f';cx.beginPath();cx.roundRect(p.x-13,p.y-58*s-14,26,13,6);cx.fill();ink(1.5);cx.fillStyle=OL;cx.font='900 9px system-ui';cx.textAlign='center';cx.fillText('YOU',p.x,p.y-58*s-4);}}});}
 const T=tables().slice(0,nTables());for(const t of T){const g=guest(t);if(!['arrive','walk','sit','stand','leave'].includes(g.st))continue;g.cur=g.cur||[];
  [0,1].forEach(j=>{const k=g.party[j];if(k==null)return;let u,v,sit=0,mv=1;
   if(g.st==='arrive'){if(lvl('host')&&g.path){const q=along(g.path,Math.max(0,g.dd-j*.1));u=q.u+(q.done?j*.07:0);v=q.v;mv=!q.done;}else{u=ENT.u+.05*j;v=ENT.v+.06*j;mv=0;}}
   else if(g.st==='walk'&&g.lead){const tr=g.lead.trail||[],idx=tr.length-1-14*(j+1);const q=idx>=0?tr[idx]:(g.cur[j]||ENT);u=q.u;v=q.v;mv=idx>=0;}
   else if(g.st==='walk'||g.st==='leave'){const q=along(g.path,Math.max(0,g.dd-j*.12));u=q.u;v=q.v;mv=!q.done;}
   else if(g.st==='sit'){const f0=g.from[j]||appr(t,j),ap=appr(t,j),se=seatPos(t,j),p=g.sa;if(p<.55){const e=p/.55;u=lerp(f0.u,ap.u,e);v=lerp(f0.v,ap.v,e);}else{const e=(p-.55)/.45;u=lerp(ap.u,se.u,e);v=lerp(ap.v,se.v,e);sit=e;mv=e<1;}}
   else if(g.st==='stand'){const se=seatPos(t,j),ap=appr(t,j),e=g.sa;u=lerp(se.u,ap.u,e);v=lerp(se.v,ap.v,e);sit=1-e;mv=e>.2;}
   if(g.st!=='walk'||!g.lead)g.cur[j]={u,v};else g.cur[j]={u,v};const p=P(u,v),ps=p.s*.85;
   E.push({y:(g.st==='sit'||g.st==='stand')&&sit>.3?P(t.u,t.v).y-1:p.y+12*p.s,f:()=>{if(sit<.9)shadow(p.x,p.y+14*ps,12*p.s,4*p.s);
    if(sit>0){cx.save();cx.translate(p.x,p.y+14*ps);cx.scale(1,1-.28*sit);person(0,-14*ps,ps,k,'',0,sit>.6?1:0);cx.restore();}
    else person(p.x,p.y+(mv?Math.abs(Math.sin(BT*9+j))*-3:0),ps,k,'',0,0);
    if(g.st==='arrive'&&j===0){if(lvl('host')){if(g.talk>0&&g.talk<1)talkBubbles(g,g.talk,p.x,p.y,p.s,0);else if(g.atQ&&Math.sin(BT*2)>.2)bubble(p.x,p.y-56*p.s,'⏳',p.s);}else if(Math.sin(BT*2)>-.3)bubble(p.x,p.y-56*p.s,'👀',p.s);}}});});}
 return E;}
function tableItems(g,x,y,s,t){const plates=n=>{if(n>0)el(x-9*s,y-8*s,7*s,3*s,'#eef2f6',1.5);if(n>1)el(x+9*s,y-5*s,7*s,3*s,'#eef2f6',1.5);};
 if(g.st==='dirty'||g.st==='leave'||g.st==='stand'){const c=g.clr||0;if(c<.42){const left=c<.14?3:c<.28?2:1;if(left>=3){cx.save();cx.translate(x-12*s,y-9*s);cx.rotate(1.3);cx.fillStyle='rgba(220,230,240,.9)';cx.fillRect(-3*s,-5*s,6*s,9*s);cx.restore();}if(left>=2)plates(2);
   cx.strokeStyle='#c9d3dc';cx.lineWidth=1.6*s;cx.beginPath();cx.moveTo(x-2*s,y-4*s);cx.lineTo(x+6*s,y-7*s);cx.stroke();cx.fillStyle='rgba(120,70,30,.8)';for(const [ox,oy] of[[-11,-9],[-7,-8],[8,-6],[11,-5],[0,-3]]){cx.beginPath();cx.arc(x+ox*s,y+oy*s,1.3*s,0,TAU);cx.fill();}}
  const dirt=c<.42?1:cl(1-(c-.42)/.5,0,1);if(dirt>0){cx.fillStyle=`rgba(200,60,40,${.35*dirt})`;cx.beginPath();cx.ellipse(x+8*s,y-2*s,6*s,2*s,0,0,TAU);cx.fill();cx.beginPath();cx.ellipse(x-6*s,y-9*s,4*s,1.5*s,0,0,TAU);cx.fill();}
  if(c>.42&&c<1){cx.strokeStyle='rgba(120,200,255,.55)';cx.lineWidth=2*s;cx.beginPath();cx.ellipse(x,y-6*s,22*s*(c-.3),7*s*(c-.3),0,Math.PI*.1,Math.PI*.9);cx.stroke();}return;}
 if(g.st==='sit'&&g.menus){cx.fillStyle='#7a1f2a';cx.beginPath();cx.roundRect(x-14*s,y-12*s,9*s,6*s,1.5*s);cx.fill();cx.beginPath();cx.roundRect(x+5*s,y-10*s,9*s,6*s,1.5*s);cx.fill();}
 if(!SEATED.has(g.st))return;
 if((g.st==='ready'||g.st==='ordering')&&g.menus!==0){cx.fillStyle='#7a1f2a';cx.beginPath();cx.roundRect(x-14*s,y-12*s,9*s,6*s,1.5*s);cx.fill();cx.beginPath();cx.roundRect(x+5*s,y-10*s,9*s,6*s,1.5*s);cx.fill();return;}
 if(g.f===2){plates(2);cx.font=`${11*s}px system-ui`;cx.textAlign='center';cx.textBaseline='middle';const left=g.st==='eating'?cl(g.t/7,.4,1):1;cx.fillText(g.fe,x-9*s,y-10*s);if(left>.6)cx.fillText(g.fe,x+9*s,y-7*s);cx.textBaseline='alphabetic';}
 if(g.d===2){drinkIcon(x+1*s,y-12*s,s*.75,g.dc);drinkIcon(x+13*s,y-10*s,s*.75,g.dc);}}
function busStation(x,y,s,on){cx.globalAlpha=on?1:.55;busCart(x,y,s,sim.bin);cx.globalAlpha=1;TAGS.push([x,y+12*s,on?'BUS STATION '+sim.bin+'/4':'🔒 HIRE BUSSER',on]);}
function drawBarStaff(bx,bw){const by=wallH*.6,x=bx+bw*.38;
 // back bar: shelves full of bottles + neon sign
 const sy=wallH*.34;cx.fillStyle='#4a2a18';cx.fillRect(bx+4,sy,bw-8,4);cx.fillRect(bx+4,sy+wallH*.13,bw-8,4);
 for(let r=0;r<2;r++)for(let i=0;i<7;i++){const c=['#7cff6b','#ff4fa3','#ffd23f','#7ee0ff','#ff7a3c','#c0213a','#b07cff'][(i+r*3)%7],X=bx+12+i*(bw-24)/7,Y=sy+r*wallH*.13;cx.fillStyle=c;cx.globalAlpha=.85;cx.beginPath();cx.roundRect(X,Y-15,7,15,2);cx.fill();cx.fillRect(X+2,Y-20,3,6);cx.globalAlpha=1;ink(1);}
 cx.save();cx.shadowColor='#ff4fa3';cx.shadowBlur=12+Math.sin(BT*4)*4;cx.fillStyle='#ff7ab8';cx.font='900 14px system-ui';cx.textAlign='center';cx.fillText('★ BAR ★',bx+bw/2,wallH*.24);cx.restore();
 if(!lvl('bartender'))return;const q=sim.barQ.find(q=>!q.ready),p=q?1-q.left/q.total:0;
 person(x,by+wallH*.06,1.05,3,'',Math.sin(BT*3)*1.2,1);cx.fillStyle='#1d1d26';cx.beginPath();cx.roundRect(x-12,by+wallH*.06-27,24,9,3);cx.fill();
 if(!q){cx.save();cx.translate(x+20,by-6);cx.rotate(.1);cx.fillStyle='#c9d3dc';cx.beginPath();cx.roundRect(-6,-14,12,22,3);cx.fill();ink(1.5);cx.restore();return;}
 const sx=x+20,syy=by-10;
 if(p<.32){// pour from bottle into shaker
  cx.save();cx.translate(sx-14,syy-26);cx.rotate(2.1);cx.fillStyle=q.c;cx.beginPath();cx.roundRect(-5,-14,10,22,3);cx.fill();ink(1.5);cx.fillRect(-2,-20,4,7);cx.restore();
  cx.strokeStyle=q.c;cx.lineWidth=3;cx.beginPath();cx.moveTo(sx-6,syy-24);cx.quadraticCurveTo(sx-1,syy-18,sx,syy-12);cx.stroke();
  cx.fillStyle='#c9d3dc';cx.beginPath();cx.roundRect(sx-6,syy-12,12,22,3);cx.fill();ink(1.5);bubble(x,by-wallH*.1,'🍹',1);}
 else if(p<.72){const sh=Math.sin(BT*26);cx.save();cx.translate(sx+sh*5,syy-6+Math.cos(BT*26)*5);cx.rotate(sh*.6);cx.fillStyle='#c9d3dc';cx.beginPath();cx.roundRect(-6,-14,12,24,3);cx.fill();ink(1.5);cx.fillStyle='#8a9aa8';cx.fillRect(-6,-17,12,5);cx.restore();
  cx.fillStyle='rgba(255,255,255,.85)';for(let i=0;i<4;i++){cx.beginPath();cx.arc(sx+Math.sin(BT*9+i*2)*12,syy-28-((BT*1.6+i/4)%1)*12,1.8,0,TAU);cx.fill();}}
 else{cx.save();cx.translate(sx+6,syy-8);cx.rotate(2.2);cx.fillStyle='#c9d3dc';cx.beginPath();cx.roundRect(-6,-14,12,24,3);cx.fill();ink(1.5);cx.restore();
  cx.strokeStyle=q.c;cx.lineWidth=3;cx.beginPath();cx.moveTo(sx+12,syy-4);cx.lineTo(sx+14,by+2);cx.stroke();}
 sim.pour={q,p,x:sx+14};}
function drawBarDrinks(bx,bw){const ty=wallH*.6;
 if(sim.pour&&sim.pour.q&&!sim.pour.q.ready&&sim.pour.p>=.72){const f=(sim.pour.p-.72)/.28;const X=sim.pour.x,Y=ty-9;cx.fillStyle='rgba(220,235,245,.9)';cx.beginPath();cx.moveTo(X-7,Y-10);cx.lineTo(X+7,Y-10);cx.lineTo(X+5,Y+8);cx.lineTo(X-5,Y+8);cx.closePath();cx.fill();ink(1.5);cx.save();cx.beginPath();cx.rect(X-8,Y+8-18*f,16,18*f);cx.clip();cx.fillStyle=sim.pour.q.c;cx.beginPath();cx.moveTo(X-6,Y-9);cx.lineTo(X+6,Y-9);cx.lineTo(X+4.5,Y+7);cx.lineTo(X-4.5,Y+7);cx.closePath();cx.fill();cx.restore();}
 sim.pour=null;
 cx.fillStyle='#2bb673';cx.beginPath();cx.roundRect(bx+bw-80,ty-3,76,6,3);cx.fill();cx.fillStyle='#fff';cx.font='900 9px system-ui';cx.textAlign='center';cx.fillText('PICK-UP',bx+bw-42,ty+14);
 let i=0;for(const q of sim.barQ){if(!q.ready)continue;q.x=bx+bw-14-i*17;q.y=ty-11;drinkIcon(q.x,q.y,1.25,q.c);i++;if(i>3)break;}
 tag(bx+bw/2,wallH*.9,lvl('bartender')?'🍸 BAR':'🔒 HIRE BARTENDER',lvl('bartender'));}
function drawPass(kx,kw,ly){const fl=BT*14;for(let i=0;i<2;i++){const fx0=kx+kw*.3+i*kw*.35,fy=ly-kh2();cx.fillStyle='#3a3a48';cx.fillRect(fx0-10,fy,20,3);cx.fillStyle=`rgba(255,${120+Math.sin(fl+i)*60|0},40,.9)`;cx.beginPath();cx.moveTo(fx0-7,fy);cx.quadraticCurveTo(fx0,fy-10-Math.sin(fl*1.3+i)*5,fx0+7,fy);cx.fill();
  cx.fillStyle='rgba(255,255,255,.5)';cx.beginPath();cx.arc(fx0+Math.sin(BT*3+i)*4,fy-16-((BT*.8+i*.5)%1)*14,3,0,TAU);cx.fill();}
 let i=0;for(const q of sim.passQ){const x=kx+12+i*22,y=ly-2;el(x,y,10,3.5,'#fff',1.5);cx.font='15px system-ui';cx.textAlign='center';cx.textBaseline='middle';cx.fillText(q.e,x,y-8);cx.textBaseline='alphabetic';i++;if(i>3)break;}
 if(sim.passQ.length&&Math.sin(BT*10)>0){cx.font='15px system-ui';cx.textAlign='center';cx.fillText('🛎️',kx+kw-6,ly-16);}}
function kh2(){return wallH*.08;}
function kitchenDoors(){const p=P(SPOT.kit.u,0),cxd=p.x,dw=Math.min(W*.2,90),dh=wallH*.7,y0=wallH-dh;
 cx.fillStyle='#4a2a18';cx.beginPath();cx.roundRect(cxd-dw/2-7,y0-7,dw+14,dh+7,[10,10,0,0]);cx.fill();ink(3);cx.fillStyle='#ffe9a8';cx.fillRect(cxd-dw/2,y0,dw,dh);
 const sw=sim.door>0?Math.sin((1-sim.door/.8)*Math.PI):0;
 for(const d of[-1,1]){const w=dw/2*(1-.6*sw),x0=d<0?cxd-dw/2:cxd+dw/2-w;cx.fillStyle='#c94a56';cx.beginPath();cx.roundRect(x0,y0,w,dh,3);cx.fill();ink(2.5);cx.fillStyle='#9a3440';cx.fillRect(x0+3,y0+dh*.64,w-6,dh*.3);cx.fillStyle='#d9d9d9';cx.fillRect(x0+3,y0+dh*.6,w-6,4);
  el(x0+w/2,y0+dh*.3,Math.max(2,w*.32),Math.max(2,w*.32),'#bfe6ff',2.5);cx.fillStyle='rgba(255,255,255,.6)';cx.beginPath();cx.arc(x0+w/2-w*.1,y0+dh*.27,Math.max(1,w*.08),0,TAU);cx.fill();cx.fillStyle='#c9d3dc';cx.fillRect(d<0?x0+w-7:x0+3,y0+dh*.48,4,12);}
 cx.fillStyle='#2bb673';cx.beginPath();cx.roundRect(cxd-30,y0-24,60,16,5);cx.fill();ink(2);cx.fillStyle='#fff';cx.font='900 10px system-ui';cx.textAlign='center';cx.fillText('KITCHEN',cxd,y0-12);
 cx.fillStyle='#ff4f4f';cx.beginPath();cx.roundRect(cxd-14,y0+dh*.08,28,9,3);cx.fill();cx.fillStyle='#fff';cx.font='900 7px system-ui';cx.fillText(sw>0?'IN/OUT':'STAFF',cxd,y0+dh*.08+7);}
function carryDraw(x,y,s,c){if(!c)return;
 if(c.type==='drink'||c.type==='food'){cx.strokeStyle=SKIN[1];cx.lineWidth=5*s;cx.lineCap='round';cx.beginPath();cx.moveTo(x+10*s,y-18*s);cx.lineTo(x+18*s,y-32*s);cx.stroke();el(x+18*s,y-35*s,15*s,4*s,'#dfe6ee',2);
  if(c.type==='drink'){for(const o of[-6,5]){cx.fillStyle=c.c;cx.beginPath();cx.moveTo(x+(14+o)*s,y-49*s);cx.lineTo(x+(21+o)*s,y-49*s);cx.lineTo(x+(20+o)*s,y-38*s);cx.lineTo(x+(15+o)*s,y-38*s);cx.closePath();cx.fill();ink(1.5);}}
  else{el(x+18*s,y-39*s,11*s,3.5*s,'#fff',1.5);cx.font=`${16*s}px system-ui`;cx.textAlign='center';cx.textBaseline='middle';cx.fillText(c.e,x+18*s,y-46*s);cx.textBaseline='alphabetic';}}
 else if(c.type==='tub'){cx.fillStyle='#8a9aa8';cx.beginPath();cx.roundRect(x-14*s,y-20*s,28*s,12*s,3*s);cx.fill();ink(2);el(x-5*s,y-21*s,7*s,2.5*s,'#fff',1.2);el(x+5*s,y-22*s,7*s,2.5*s,'#fff',1.2);cx.fillStyle='#c0213a';cx.fillRect(x+7*s,y-30*s,4*s,8*s);}
 else if(c.type==='menu'){cx.fillStyle='#7a1f2a';cx.save();cx.translate(x+14*s,y-20*s);cx.rotate(-.25);cx.beginPath();cx.roundRect(-6*s,-9*s,12*s,17*s,2*s);cx.fill();ink(1.5);cx.fillStyle='#ffd23f';cx.fillRect(-3*s,-5*s,6*s,1.5*s);cx.restore();}}
function bubble(x,y,e,s){cx.fillStyle='#fff';cx.beginPath();cx.roundRect(x-13,y-12,26,24,8);cx.fill();ink(2);cx.beginPath();cx.moveTo(x-4,y+11);cx.lineTo(x,y+17);cx.lineTo(x+4,y+11);cx.fillStyle='#fff';cx.fill();cx.font='14px system-ui';cx.textAlign='center';cx.textBaseline='middle';cx.fillText(e,x,y+1);cx.textBaseline='alphabetic';}
let TAGS=[],COINQ=[];function tag(x,y,txt,on){cx.font='900 9px system-ui';const w=cx.measureText(txt).width+12;x=cl(x,w/2+4,W-w/2-4);cx.fillStyle=on?'#ffd23f':'rgba(26,18,32,.8)';cx.beginPath();cx.roundRect(x-w/2,y-7,w,14,7);cx.fill();ink(1.5);cx.fillStyle=on?OL:'#fff';cx.textAlign='center';cx.textBaseline='middle';cx.fillText(txt,x,y+.5);cx.textBaseline='alphabetic';}
function hostStand(x,y,s,on){shadow(x,y+4*s,22*s,6*s);cx.globalAlpha=on?1:.55;cx.fillStyle='#6b3d22';cx.beginPath();cx.moveTo(x-16*s,y-34*s);cx.lineTo(x+16*s,y-34*s);cx.lineTo(x+12*s,y+2*s);cx.lineTo(x-12*s,y+2*s);cx.closePath();cx.fill();ink(2.5);
 cx.fillStyle='#8f5a2b';cx.fillRect(x-12*s,y-24*s,24*s,4*s);cx.fillStyle='#c98a58';cx.beginPath();cx.roundRect(x-19*s,y-40*s,38*s,8*s,2*s);cx.fill();ink(2);
 for(let i=0;i<3;i++){cx.fillStyle=['#7a1f2a','#8f2c38','#a8343f'][i];cx.beginPath();cx.roundRect(x-10*s+i*2*s,y-46*s-i*2.5*s,16*s,4*s,1*s);cx.fill();ink(1);}
 el(x+12*s,y-43*s,4*s,3*s,'#ffd23f',1.5);cx.globalAlpha=1;TAGS.push([x,y+12*s,on?'HOST STAND':'🔒 HIRE HOST',on]);}
function stateBubble(g,x,y,s){const m={menu:'📋',ready:'🙋',ordering:'',waiting:g.d<2?'🥤':'🍽️',eating:(BT*.5|0)%2?'😋':'❤️'}[g.st];if(!m)return;const bx=x-30*s,by=y-60*s+Math.sin(BT*3+x)*2;bubble(bx,by,m,s);}
const rand=(a,b)=>a+Math.random()*(b-a);window.dsRush=isRush;
function buyRT(r){const c=rtCost(r);if(S.rooms[r].tables>=8||S.coins<c)return;S.coins-=c;S.rooms[r].tables++;save();snd(880,.1,'triangle',.15);renderBuild();}
function entrance(){const p=P(1.3,.62);cx.fillStyle='rgba(122,42,50,.35)';cx.beginPath();cx.ellipse(p.x+20,p.y+6,26*p.s,9*p.s,0,0,TAU);cx.fill();cx.fillStyle='#fff';cx.font=`900 ${10*p.s}px system-ui`;cx.textAlign='center';cx.fillText('WELCOME',p.x+20,p.y+9);}
function roomPills(){const y=bot-46,items=[['main','🏠'],['patio','🌴'],['vip','💎']];let x=10;for(const [r,ic] of items){const own=r==='main'||S.rooms[r].own,on=S.view===r,w=46;cx.fillStyle=on?'#ffd23f':'rgba(26,18,32,.75)';cx.beginPath();cx.roundRect(x,y,w,30,15);cx.fill();ink(2.5);cx.font='16px system-ui';cx.textAlign='center';cx.textBaseline='middle';cx.fillText(own?ic:'🔒',x+w/2,y+15);cx.textBaseline='alphabetic';hits.push({x:x+w/2,y:y+15,r:22,room:own?r:null,lock:!own});x+=w+6;}}
function rushBanner(){if(!isRush())return;const ms=rushLeft(),m=Math.floor(ms/60000),sec=Math.floor(ms/1000)%60,t='🔥 DINNER RUSH · TIPS x2 · '+m+':'+String(sec).padStart(2,'0');cx.font='900 13px system-ui';const w=cx.measureText(t).width+24,y=62;cx.fillStyle='#ff5a3c';cx.beginPath();cx.roundRect(W/2-w/2,y,w,26,13);cx.fill();ink(2.5);cx.fillStyle='#fff';cx.textAlign='center';cx.textBaseline='middle';cx.fillText(t,W/2,y+13);cx.textBaseline='alphabetic';}
// ---------- decor & staff placements ----------
function plant(u,v){const p=P(u,v),s=p.s;shadow(p.x,p.y+4*s,16*s,5*s);cx.fillStyle='#b85a2e';cx.beginPath();cx.moveTo(p.x-12*s,p.y-16*s);cx.lineTo(p.x+12*s,p.y-16*s);cx.lineTo(p.x+9*s,p.y+4*s);cx.lineTo(p.x-9*s,p.y+4*s);cx.closePath();cx.fill();ink(2);
 for(let i=0;i<5;i++){const a=-Math.PI/2+(i-2)*.5+Math.sin(BT*1.5+i)*.05;cx.fillStyle=i%2?'#2bb673':'#3fd18a';cx.beginPath();cx.ellipse(p.x+Math.cos(a)*14*s,p.y-18*s+Math.sin(a)*16*s,7*s,14*s,a+Math.PI/2,0,TAU);cx.fill();ink(1.5);}}
function jukebox(u,v){const p=P(u,v),s=p.s,x=p.x,y=p.y;shadow(x,y+3*s,20*s,6*s);cx.fillStyle='#b3361f';cx.beginPath();cx.roundRect(x-18*s,y-50*s,36*s,52*s,[16*s,16*s,4*s,4*s]);cx.fill();ink(2.5);cx.fillStyle=`hsl(${BT*120%360},90%,65%)`;cx.beginPath();cx.roundRect(x-12*s,y-42*s,24*s,14*s,7*s);cx.fill();ink(1.5);cx.fillStyle='#ffd23f';for(let i=0;i<3;i++)cx.fillRect(x-10*s+i*8*s,y-22*s,5*s,14*s);
 for(let i=0;i<2;i++){const ph=(BT*.5+i*.5)%1;cx.globalAlpha=1-ph;cx.fillStyle=OL;cx.font=`${14*s}px system-ui`;cx.textAlign='center';cx.fillText(i?'♫':'♪',x+(i?12:-12)*s+Math.sin(BT*3+i)*4,y-56*s-ph*30);}cx.globalAlpha=1;}
function fountain(u,v){const p=P(u,v),s=p.s,x=p.x,y=p.y;shadow(x,y+6*s,30*s,9*s);el(x,y,28*s,10*s,'#9fb3c8',2.5);el(x,y-2*s,22*s,7*s,'#6ec3ff',0);cx.fillStyle='#9fb3c8';cx.fillRect(x-4*s,y-24*s,8*s,22*s);ink(1.5);el(x,y-24*s,12*s,4*s,'#9fb3c8',2);
 for(let i=0;i<8;i++){const ph=(BT*1.2+i/8)%1,a=i/8*TAU;cx.fillStyle=`rgba(180,230,255,${1-ph})`;cx.beginPath();cx.arc(x+Math.cos(a)*16*s*ph,y-28*s-Math.sin(ph*Math.PI)*16*s+ph*20*s,2.4*s,0,TAU);cx.fill();}}
function podium(u,v){const p=P(u,v),s=p.s;shadow(p.x,p.y+3*s,16*s,5*s);cx.fillStyle='#6b3d22';cx.beginPath();cx.roundRect(p.x-11*s,p.y-26*s,22*s,28*s,4*s);cx.fill();ink(2);cx.fillStyle='#fff';cx.fillRect(p.x-8*s,p.y-24*s,16*s,6*s);}
function lights(){if(!S.decor.includes('lights')&&S.view!=='patio')return;cx.strokeStyle='#3a2430';cx.lineWidth=1.5;cx.beginPath();cx.moveTo(0,wallH*.1);cx.quadraticCurveTo(W/2,wallH*.3,W,wallH*.1);cx.stroke();for(let i=1;i<14;i++){const k=i/14,x=k*W,y=(1-k)*(1-k)*wallH*.1+2*(1-k)*k*wallH*.3+k*k*wallH*.1;const c=['#ffd23f','#ff4fa3','#2fd3ff','#7cff6b'][i%4];cx.save();cx.shadowColor=c;cx.shadowBlur=10;cx.globalAlpha=.65+.35*Math.sin(BT*4+i);el(x,y+5,3.5,5,c,0);cx.restore();}cx.globalAlpha=1;}
// ---------- scene ----------
window.buildScene=function(menuBg){const now=performance.now();BT+=Math.min(.05,(now-lt)/1000);lt=now;
 const sh=$('build');bot=menuBg||sh.classList.contains('hidden')?H:Math.max(H*.4,sh.getBoundingClientRect().top+4);wallH=Math.min(bot*.4,235);
 const night=room();if(S.view==='main')rundown();
 // light pools
 cx.save();cx.globalCompositeOperation='lighter';for(const lx of[.2,.5,.8]){const x=W*lx,g=cx.createRadialGradient(x,wallH*.25,4,x,wallH*.6,bot*.5);g.addColorStop(0,'rgba(255,220,150,.32)');g.addColorStop(1,'rgba(255,220,150,0)');cx.fillStyle=g;cx.fillRect(0,0,W,bot);}cx.restore();
 lights();sign();
 // depth-sorted entities
 const T=tables(),E=[],n=nTables();T.forEach((t,i)=>E.push({y:P(t.u,t.v).y,f:()=>tableDraw(t,i<n,i===n&&n<8)}));
 stepSim(T.slice(0,n));for(const e of simEntities())E.push(e);
 const mainV=S.view==='main';if(S.view==='patio'||(mainV&&S.decor.includes('plants'))){for(const [u,v] of[[-1.2,.98],[1.2,.98],[-1.1,.02],[1.1,.02]]){const p=P(u,v);E.push({y:p.y,f:()=>plant(u,v)});}}
 if(mainV&&S.decor.includes('jukebox')){const p=P(1.17,.45);E.push({y:p.y,f:()=>jukebox(1.17,.45)});}
 if((mainV&&S.decor.includes('fountain'))||S.view==='vip'){const p=P(0,.55);E.push({y:p.y,f:()=>fountain(0,.55)});}
 entrance();E.sort((a,b)=>a.y-b.y).forEach(e=>e.f());TAGS.forEach(t=>tag(...t));TAGS=[];COINQ.forEach(f=>f());COINQ=[];
 if(night){cx.fillStyle='rgba(30,20,70,.12)';cx.fillRect(0,0,W,bot);}
 // vignette
 const vg=cx.createRadialGradient(W/2,bot*.55,Math.min(W,bot)*.3,W/2,bot*.55,Math.max(W,bot)*.8);vg.addColorStop(0,'rgba(0,0,0,0)');vg.addColorStop(1,'rgba(20,10,25,.4)');cx.fillStyle=vg;cx.fillRect(0,0,W,bot);
 rushBanner();if(menuBg){cx.fillStyle='#1a1220';cx.fillRect(0,bot,W,H-bot);return;}roomPills();
 cx.fillStyle='#1a1220';cx.fillRect(0,bot,W,H-bot);
 // fx
 const dt=1/60;for(const q of fx){q.vy+=500*dt;q.x+=q.vx*dt;q.y+=q.vy*dt;q.l-=dt;cx.globalAlpha=cl(q.l,0,1);cx.fillStyle=q.c;cx.save();cx.translate(q.x,q.y);cx.rotate(q.l*8);cx.fillRect(-4,-2,8,4);cx.restore();}cx.globalAlpha=1;fx=fx.filter(q=>q.l>0);
 const wr=$('wallet3').getBoundingClientRect(),tx=wr.left+wr.width/2,ty=wr.top+wr.height/2;
 for(const f of fly){f.t+=dt/.55;const k=Math.min(1,f.t),x=lerp(f.x,tx,k*k),y=lerp(f.y,ty,k)-Math.sin(k*Math.PI)*60;el(x,y,8,8,'#ffd23f',2);if(k>=1&&!f.d){f.d=1;S.coins+=f.v;$('wallet3').textContent='$'+S.coins;snd(1300+Math.random()*300,.05,'square',.05);}}fly=fly.filter(f=>!f.d);
 for(const q of pops){q.l-=dt;q.y-=40*dt;cx.globalAlpha=cl(q.l*2,0,1);cx.font='900 20px system-ui';cx.textAlign='center';cx.lineWidth=4;cx.strokeStyle=OL;cx.strokeText(q.t,q.x,q.y);cx.fillStyle=q.c||'#ffd23f';cx.fillText(q.t,q.x,q.y);}cx.globalAlpha=1;pops=pops.filter(q=>q.l>0);
 if(constr){constr.t-=dt;const f=cl(1-constr.t/constr.m,0,1);drawConstr(f);
  if(constr.t<=0){constr=null;confetti(W/2,bot*.5,70);pops.push({x:W/2,y:bot*.45,t:'UPGRADED!',l:1.3,c:'#7cff6b'});buzz([30,40,80]);[659,880,1175].forEach((f,i)=>setTimeout(()=>snd(f,.15,'triangle',.14),i*80));}}
 if(celeb&&!constr){celeb.l-=dt;const a=cl(celeb.l,0,1),sc=1+Math.max(0,celeb.l-2.3)*2;cx.globalAlpha=a;cx.fillStyle='rgba(20,10,25,.55)';cx.fillRect(0,0,W,bot);cx.save();cx.translate(W/2,bot*.42);cx.scale(sc,sc);cx.font='900 30px system-ui';cx.textAlign='center';cx.lineWidth=7;cx.strokeStyle=OL;cx.strokeText(celeb.t,0,0);cx.fillStyle='#ffd23f';cx.fillText(celeb.t,0,0);cx.font='900 18px system-ui';cx.lineWidth=5;cx.strokeText(celeb.s,0,34);cx.fillStyle='#7cff6b';cx.fillText(celeb.s,0,34);cx.restore();cx.globalAlpha=1;if(celeb.l<=0)celeb=null;}
};
function confetti(x,y,n=40){for(let i=0;i<n;i++){const a=Math.random()*TAU,v=150+Math.random()*300;fx.push({x,y,vx:Math.cos(a)*v,vy:Math.sin(a)*v-200,l:1+Math.random(),c:['#ffd23f','#ff4fa3','#2fd3ff','#7cff6b','#ff5a3c'][i%5]});}}
// taps on the scene
cv.addEventListener('pointerdown',e=>{if(state!=='build')return;const x=e.clientX,y=e.clientY;if(constr){constr.t-=.35;buzz(12);snd(300,.05,'square',.06);pops.push({x,y:y-10,t:'⚡ FASTER',l:.6,c:'#ffd23f'});for(let i=0;i<6;i++){const a=Math.random()*TAU,v=90+Math.random()*120;fx.push({x,y,vx:Math.cos(a)*v,vy:Math.sin(a)*v,l:.4,c:'#ffd23f'});}return;}
 for(const h of hits.slice().sort((a,b)=>Math.hypot(x-a.x,y-a.y)-Math.hypot(x-b.x,y-b.y)))if(Math.hypot(x-h.x,y-h.y)<h.r){if(h.room){S.view=h.room;save();return;}if(h.lock){bTab='rooms';renderBuild();return;}if(h.buy){if(S.view!=='main'){buyRT(S.view);return;}const b=document.querySelector('#ups [data-u="tables"]');if(b)b.click();else{bTab='staff';renderBuild();const b2=document.querySelector('#ups [data-u="tables"]');b2&&b2.click();}return;}
  bubs[h.k].ready=0;const v=Math.round(coinVal()*(ROOMS[S.view]?ROOMS[S.view].mult:1)*(isRush()?2:1));for(let k=0;k<Math.min(6,2+v/4|0);k++)fly.push({x:h.x+(Math.random()-.5)*20,y:h.y,t:-k*.06,v:k?0:v});pops.push({x:h.x,y:h.y-20,t:'+$'+v,l:1});snd(1500,.08,'square',.08);buzz(8);S.taps=(S.taps||0)+1;save();return;}});
let hits=[];window._hits=()=>hits.map(h=>({x:h.x|0,y:h.y|0,r:h.r|0,k:h.k,buy:h.buy,room:h.room}));const _tb=tableDraw;
// collect hit targets each frame
const _bs=window.buildScene;let _errN=0;window.buildScene=function(m){hits=[];try{_bs(m);}catch(e){if(_errN++<3)console.error('scene',e);try{cx.restore();cx.setTransform(DPR,0,0,DPR,0,0);}catch(_){}}};
// wrap tableDraw to record hits
tableDraw=function(t,act,next){_tb(t,act,next);if(t.hit)hits.push({...t.hit,k:key(t)});};
// ---------- panel ----------
const ICON={tables:'🍽️',waiter:'🤵',host:'🙋',bartender:'🍸',busboy:'🧹',runner:'🏃',plants:'🪴',lights:'💡',neon:'🌟',jukebox:'🎵',fountain:'⛲'};
const css=document.createElement('style');css.textContent=`#build{background:linear-gradient(180deg,#3a2350,#1a1220 60%)!important;box-shadow:0 -8px 30px rgba(0,0,0,.5);border-top:3px solid #ffd23f}
.ugrid{display:grid;grid-template-columns:1fr 1fr;gap:8px;width:100%;max-width:380px}
.ucard{all:unset;box-sizing:border-box;cursor:pointer;background:linear-gradient(180deg,#fff8e6,#ffe7bd);color:#2a1a2e;border:3px solid #2a1a2e;border-radius:16px;padding:6px 8px 7px;display:grid;grid-template-columns:auto 1fr;grid-template-rows:auto auto auto;column-gap:7px;align-items:center;box-shadow:0 4px 0 #2a1a2e;position:relative}
.ucard:active{transform:translateY(3px);box-shadow:0 1px 0 #2a1a2e}.ucard{text-align:left}.ucard .ic{grid-row:1/4;font-size:26px}.ucard b{font:900 14px system-ui;line-height:1.1;margin-right:38px;white-space:nowrap}.ucard small{font:700 10.5px system-ui;opacity:.75;line-height:1.15}
.ucard .pr{position:absolute;top:-9px;right:-6px;background:#2bb673;color:#fff;font:900 12px system-ui;padding:3px 8px;border-radius:999px;border:2.5px solid #2a1a2e}.ucard.no .pr{background:#8a7a86}.ucard.max .pr{background:#ffd23f;color:#2a1a2e}.ucard.no{filter:saturate(.6)}
.pips{display:flex;gap:3px}.pips i{width:9px;height:9px;border-radius:50%;background:#e2cfae;border:1.5px solid #2a1a2e}.pips i.on{background:#ff5a3c}
.starbar{font:800 12px system-ui;color:#ffd23f;display:flex;align-items:center;gap:8px;width:100%;max-width:380px}.starbar .tr{flex:1;height:8px;background:rgba(255,255,255,.15);border-radius:4px;overflow:hidden}.starbar .tr div{height:100%;background:linear-gradient(90deg,#ffd23f,#ff8a3d)}
#collect.glow{animation:gl 1s infinite alternate}@keyframes gl{to{box-shadow:0 6px 0 #a8321e,0 0 18px #ffd23f}}
#start{background:linear-gradient(180deg,rgba(20,10,25,.25),rgba(20,10,25,.6) 35%,rgba(20,10,25,.88))!important}`;document.head.appendChild(css);
const PERK={tables:l=>'$'+l*2+'/min · more guests',waiter:l=>l>=3?'+2 ❤ in shifts · $'+l*6+'/min':l?'+1 ❤ (+2 at Lv3) · $'+l*6+'/min':'Hire: +1 ❤ in shifts',host:l=>l?'+'+l*10+'% shift points':'Hire: +10% shift points',bartender:l=>l?'Pour/Stack/Shake '+l*6+'% slower':'Hire: slower Pour/Stack/Shake',busboy:l=>l>=4?'2 saves per shift':l?'1 save/shift (2 at Lv4)':'Hire: cancels 1 fail/shift',runner:l=>l?l+' runner'+(l>1?'s':'')+' · food out faster':'Hire: runs food from the kitchen'};
const LVN=['Run-Down Diner','Local Spot','Neighborhood Fave','Hot Spot','City Famous','Legendary'];
window.renderBuild=function(){const st=stars(),pr=prog(),nx=STAR[st],pv=st?STAR[st-1]:0;
 const sg=JSON.stringify(S.tab)+S.decor.join()+JSON.stringify(S.rooms)+S.theme;if(sig&&sig!==sg){constr={t:2.4,m:2.4};buzz([20,20,20]);}sig=sg;
 S.starAw=S.starAw||0;if(st>S.starAw){const bonus=st*100;S.coins+=bonus;S.starAw=st;save();buzz([50,50,50,50,160]);celeb={t:'⭐ '+st+'-STAR DINER!',s:'+$'+bonus+' · '+NEWG[st-1]+' new mini-games!',l:3};confetti(W/2,(bot||H*.4)*.4,90);[523,659,784,1047].forEach((f,i)=>setTimeout(()=>snd(f,.2,'triangle',.14),i*110));}
 $('wallet3').textContent='$'+S.coins;const pd=pending();$('collect').textContent=pd>0?'COLLECT $'+pd:'COLLECTED ✓';$('collect').classList.toggle('glow',pd>0);
 $('rate').outerHTML=`<div id="rate" class="starbar"><span>${starStr(st)}</span><div class="tr"><div style="width:${nx?Math.round((pr-pv)/(nx-pv)*100):100}%"></div></div><span>${nx?(nx-pr)+' to ★'+(st+1)+' · +'+NEWG[st]+' games':'ALL GAMES'}</span></div>`;
 const card=(k,name,lv,mx,eff,cost,isD)=>{const max=isD?lv:lv>=mx,can=!max&&S.coins>=cost;return `<button class="ucard ${max?'max':can?'':'no'}" data-${isD?'d':'u'}="${k}"><span class="ic">${ICON[k]}</span><b>${name}</b>${isD?'<small>+5% tips · decor</small>':`<span class="pips">${Array.from({length:mx},(_,i)=>`<i class="${i<lv?'on':''}"></i>`).join('')}</span>`}${isD?'':`<small>${eff}</small>`}<span class="pr">${max?(isD?'OWNED':'MAX'):'$'+cost}</span></button>`;};
 if(!$('tRooms')){const tb=$('tStaff').parentNode;tb.insertAdjacentHTML('beforeend','<button id="tRooms" class="ghost" style="margin:0;font-size:14px;padding:8px 14px">ROOMS</button><button id="tStyle" class="ghost" style="margin:0;font-size:14px;padding:8px 14px">STYLE</button>');$('tRooms').onclick=()=>{bTab='rooms';renderBuild();};$('tStyle').onclick=()=>{bTab='style';renderBuild();};tb.querySelectorAll('button').forEach(b=>{b.style.padding='8px 12px';b.style.fontSize='13px';});}
 $('ups').className='ugrid';$('ups').style.cssText='';
 if(bTab==='rooms'||bTab==='style'){const C2=(attr,ic,name,mid,price,can,max)=>`<button class="ucard ${max?'max':can?'':'no'}" ${attr}><span class="ic">${ic}</span><b>${name}</b>${mid}<span class="pr">${price}</span></button>`;
  $('ups').innerHTML=bTab==='rooms'?Object.entries(ROOMS).map(([r,R])=>{const o=S.rooms[r];if(!o.own)return C2(`data-r="${r}"`,R.ic,R.name,`<small>New room + its own mini-game<br>+$${R.per}/min per table · tips x${R.mult}</small>`,'$'+R.cost,S.coins>=R.cost,0);const mx=o.tables>=8,c=rtCost(r);return C2(`data-rt="${r}"`,R.ic,R.name,`<span class="pips">${Array.from({length:8},(_,i)=>`<i class="${i<o.tables?'on':''}"></i>`).join('')}</span><small>+1 table · +$${R.per}/min</small>`,mx?'MAX':'$'+c,S.coins>=c,mx);}).join('')+C2('data-go="main"','🏠','Main Room','<small>'+(S.view==='main'?'Viewing now':'Tap to view')+'</small>',S.view==='main'?'HERE':'GO',1,S.view==='main')
  :Object.entries(THEMES).filter(([k,T])=>(T.city||'nash')===(S.city||'nash')).map(([k,T])=>{const own=S.themes.includes(k),on=S.theme===k;return C2(`data-th="${k}"`,T.ic,T.name,`<small>${on?'In use':own?'Tap to use':'New look for the main room'}</small>`,on?'USING':own?'OWNED':'$'+T.cost,own||S.coins>=T.cost,on);}).join('');
  ['tStaff','tDecor','tRooms','tStyle'].forEach(id=>$(id).className=(id==='t'+bTab[0].toUpperCase()+bTab.slice(1))?'':'ghost');return;}
 if($('tRooms')){$('tRooms').className='ghost';$('tStyle').className='ghost';}
 $('ups').innerHTML=bTab==='decor'?DECOR.map(d=>card(d.k,d.name,S.decor.includes(d.k),1,'',d.cost,1)).join(''):UPS.map(u=>{const l=S.tab[u.k];return card(u.k,u.name,l,u.max,PERK[u.k](l),upCost(u),0);}).join('');
 $('tStaff').className=bTab==='decor'?'ghost':'';$('tDecor').className=bTab==='decor'?'':'ghost';};

// panel clicks for rooms & themes
$('ups').addEventListener('click',e=>{const b=e.target.closest('[data-r],[data-rt],[data-th],[data-go]');if(!b)return;const d=b.dataset;
 if(d.r){const R=ROOMS[d.r];if(S.coins<R.cost)return;S.coins-=R.cost;S.rooms[d.r].own=1;S.view=d.r;celeb={t:R.ic+' '+R.name.toUpperCase()+' OPEN!',s:'Buy tables to start earning',l:3};confetti(W/2,(bot||H*.4)*.4,80);}
 else if(d.rt){S.view=d.rt;buyRT(d.rt);}
 else if(d.th){const T=THEMES[d.th];if(!S.themes.includes(d.th)){if(S.coins<T.cost)return;S.coins-=T.cost;S.themes.push(d.th);celeb={t:T.ic+' '+T.name.toUpperCase()+'!',s:'Your diner got a makeover',l:3};confetti(W/2,(bot||H*.4)*.4,80);}S.theme=d.th;S.view='main';}
 else if(d.go){S.view='main';}
 save();renderBuild();});
// ---------- daily login rewards ----------
const REW=[50,75,100,150,200,300,750];
function loginCheck(){const d=new Date(),k=d.toDateString(),y=new Date(Date.now()-864e5).toDateString();S.login=S.login||{day:'',n:0};if(S.login.day===k)return;
 const n=S.login.day===y?S.login.n%7+1:1,amt=REW[n-1];const o=document.createElement('div');o.className='ov';o.style.cssText='z-index:9;background:rgba(20,10,25,.88)';
 o.innerHTML=`<div class="lbl">DAILY REWARD</div><h1 style="font-size:40px">DAY ${n}</h1><div style="display:grid;grid-template-columns:repeat(7,1fr);gap:5px;width:100%;max-width:350px">${REW.map((r,i)=>`<div style="border-radius:10px;padding:6px 2px;font:900 11px system-ui;border:2.5px solid #2a1a2e;background:${i+1<n?'#2bb673':i+1===n?'#ffd23f':'#3a2a48'};color:${i+1===n?'#2a1a2e':'#fff'};${i+1===n?'transform:scale(1.12)':''}">D${i+1}<br>${i===6?'🎁':'💵'}<br>$${r}</div>`).join('')}</div><p>Come back every day. Day 7 is the big one.</p><button id="lgClaim">CLAIM $${amt}</button>`;
 document.body.appendChild(o);o.querySelector('#lgClaim').onclick=()=>{S.login={day:k,n};S.coins+=amt;save();o.remove();renderMenu();[523,659,784,1047].forEach((f,i)=>setTimeout(()=>snd(f,.18,'triangle',.14),i*90));};}
loginCheck();
// menu backdrop: the restaurant
const _draw=window.draw;window.draw=function(){if(state==='menu'){cx.setTransform(DPR,0,0,DPR,0,0);hits=[];_bs(true);return;}_draw();};
// collect button juice
$('collect').addEventListener('click',()=>{confetti(W/2,(bot||H*.4)*.6,30);},true);
// ---- HD outfit preview for the shop (draws the detailed staff character)
(()=>{const PAL={classic:['#c0213a','#f2a516','#7ee0ff'],neon:['#ff2fd0','#2fffe0','#b6ff2f'],champ:['#f3d36b','#f7e7a1','#f3d36b'],boba:['#c8a27a','#d8b48c','#c8a27a']};
 window.dsPreview=(cv2,o,gl,w,h)=>{const O=OUTFITS.find(x=>x.id===o)||OUTFITS[0],d=Math.min(3,window.devicePixelRatio||1);cv2.width=Math.round(w*d);cv2.height=Math.round(h*d);cv2.style.width=w+'px';cv2.style.height=h+'px';const c2=cv2.getContext('2d');
  cx.save();cx.setTransform(d,0,0,d,0,0);cx.clearRect(0,0,w+2,h+2);const gr=cx.createRadialGradient(w/2,h*.45,4,w/2,h*.5,h*.6);gr.addColorStop(0,O.cost>=1000?'rgba(255,210,63,.55)':'rgba(255,255,255,.35)');gr.addColorStop(1,'rgba(255,255,255,0)');cx.fillStyle=gr;cx.fillRect(0,0,w,h);
  cx.fillStyle='rgba(0,0,0,.18)';cx.beginPath();cx.ellipse(w/2,h*.9,w*.3,h*.05,0,0,TAU);cx.fill();
  const s=h/80;staff(w/2,h*.74,s,0,'srv',0,1,O);
  const pal=PAL[gl]||PAL.classic;cx.strokeStyle=SKIN[0];cx.lineWidth=5*s;cx.lineCap='round';cx.beginPath();cx.moveTo(w/2+10*s,h*.74-18*s);cx.lineTo(w/2+18*s,h*.74-30*s);cx.stroke();el(w/2+18*s,h*.74-33*s,14*s,3.5*s,'#dfe6ee',2);
  if(gl==='neon'){cx.shadowColor='#2fffe0';cx.shadowBlur=12;}for(let i=0;i<3;i++)drinkIcon(w/2+(12+i*6)*s,h*.74-(42+i*1)*s,s*.95,pal[i]);cx.shadowBlur=0;
  if(O.cost>=1000){cx.font=`${10*s}px system-ui`;cx.textAlign='center';cx.globalAlpha=.6+.4*Math.sin(Date.now()/200);cx.fillText('✨',w*.2,h*.25);cx.fillText('✨',w*.8,h*.4);cx.globalAlpha=1;}
  c2.drawImage(cv,0,0,cv2.width,cv2.height,0,0,cv2.width,cv2.height);cx.restore();};})();
// ---- celebrate maxed upgrades / completed sections
(()=>{const css=document.createElement('style');css.textContent=`#celeb{position:fixed;inset:0;z-index:40;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:10px;background:rgba(15,8,22,.72);overflow:hidden;color:#fff;text-align:center;animation:cFade .3s}
#celeb .rays{position:absolute;width:220vmax;height:220vmax;background:repeating-conic-gradient(rgba(255,210,63,.28) 0 10deg,transparent 10deg 20deg);animation:cSpin 8s linear infinite;z-index:-1}
#celeb .big{font-size:110px;animation:cPop .6s cubic-bezier(.2,1.6,.4,1);filter:drop-shadow(0 8px 0 rgba(0,0,0,.4))}
#celeb h1{font:900 clamp(30px,8vw,46px) system-ui;margin:0;color:#ffd23f;text-shadow:0 5px 0 #b3361f,0 0 30px rgba(255,210,63,.8);animation:cPop .7s .1s both cubic-bezier(.2,1.6,.4,1)}
#celeb p{font:800 17px system-ui;margin:0;opacity:.95;animation:cFade .6s .4s both}#celeb button{margin-top:16px;animation:cFade .6s .7s both}
#maxPop{position:fixed;left:50%;top:18%;transform:translateX(-50%);z-index:39;background:linear-gradient(#ffe066,#ffb21f);color:#1a1220;font:900 20px system-ui;padding:12px 22px;border-radius:999px;border:4px solid #1a1220;box-shadow:0 6px 0 #1a1220,0 0 30px rgba(255,210,63,.9);animation:mPop 2.2s forwards;white-space:nowrap}
@keyframes cSpin{to{transform:rotate(360deg)}}@keyframes cPop{0%{transform:scale(0) rotate(-12deg)}100%{transform:scale(1)}}@keyframes cFade{from{opacity:0}}
@keyframes mPop{0%{transform:translateX(-50%) scale(0)}12%{transform:translateX(-50%) scale(1.15)}20%,80%{transform:translateX(-50%) scale(1)}100%{transform:translateX(-50%) translateY(-30px) scale(.9);opacity:0}}`;document.head.appendChild(css);
 const fan=()=>[523,659,784,1047,1319].forEach((f,i)=>setTimeout(()=>snd(f,.22,'triangle',.16),i*110));
 function mini(txt){const d=document.createElement('div');d.id='maxPop';d.textContent=txt;document.body.appendChild(d);setTimeout(()=>d.remove(),2300);confetti(W/2,H*.25,50);buzz([30,40,30,40,90]);[784,988,1175,1568].forEach((f,i)=>setTimeout(()=>snd(f,.15,'square',.1),i*80));}
 function big(ic,title,sub){const d=document.createElement('div');d.id='celeb';d.innerHTML=`<div class="rays"></div><div class="big">${ic}</div><h1>${title}</h1><p>${sub}</p><button id="celOk">AWESOME!</button>`;document.body.appendChild(d);
  let n=0;const iv=setInterval(()=>{confetti(W*(.2+Math.random()*.6),H*(.2+Math.random()*.3),60);if(++n>6)clearInterval(iv);},280);fan();setTimeout(fan,700);buzz([80,50,80,50,120,60,300]);
  const close=()=>{clearInterval(iv);d.remove();};$('celOk').onclick=close;setTimeout(close,6000);}
 const sections=()=>({staff:UPS.every(u=>S.tab[u.k]>=u.max),decor:DECOR.every(x=>S.decor.includes(x.k)),rooms:Object.keys(ROOMS).every(r=>S.rooms[r]&&S.rooms[r].own&&S.rooms[r].tables>=8),style:Object.keys(THEMES).every(k=>S.themes.includes(k))});
 const SEC={staff:['👔','STAFF MAXED!','Every hire, fully trained. Your crew is legendary.'],decor:['🪴','DECOR COMPLETE!','The prettiest diner in town.'],rooms:['🏢','EMPIRE BUILT!','Every room open and packed.'],style:['🎨','STYLE COLLECTION!','You own every look.']};
 function check(){if(!S.maxd){S.maxd={};UPS.forEach(u=>{if(S.tab[u.k]>=u.max)S.maxd[u.k]=1;});const sc=sections();for(const k in sc)if(sc[k])S.maxd['sec_'+k]=1;save();return;}
  let ch=0;for(const u of UPS)if(S.tab[u.k]>=u.max&&!S.maxd[u.k]){S.maxd[u.k]=1;ch=1;mini('⭐ '+u.name.toUpperCase()+' MAXED!');}
  const sc=sections();for(const k in sc)if(sc[k]&&!S.maxd['sec_'+k]){S.maxd['sec_'+k]=1;ch=1;setTimeout(()=>big(...SEC[k]),ch?900:0);}if(ch)save();}
 setInterval(()=>{if(state==='build')check();},400);window._celeb=(k)=>big(...SEC[k||'staff']);})();

// ===================== ROAD TRIP: cities =====================
function cityDeco(){if(S.view!=='main')return;const c=curCity();cx.font=`${Math.min(30,W*.07)}px system-ui`;cx.textAlign='center';cx.textBaseline='middle';const xs=[W*.47,W*.53,W*.5];c.deco.forEach((e,i)=>{cx.save();cx.translate(W*(.44+i*.06),wallH*(i===2?.1:.13));cx.rotate(Math.sin(BT*1.2+i)*.06);cx.fillText(e,0,0);cx.restore();});cx.textBaseline='alphabetic';
 const t='📍 '+c.city.toUpperCase()+', '+c.st;cx.font='900 10px system-ui';const w=cx.measureText(t).width+14;cx.fillStyle='rgba(26,18,32,.8)';cx.beginPath();cx.roundRect(W/2-w/2,wallH-18,w,15,7);cx.fill();cx.fillStyle='#fff';cx.fillText(t,W/2,wallH-7);}
const CITIES=[
 {id:'nash',city:'Nashville',st:'TN',name:"Hometown Diner",theme:'diner',ic:'🍔',x:60,y:44,deco:['🎸','🤠','🎶'],games:[],blurb:'Where it all started.'},
 {id:'mia',city:'Miami',st:'FL',name:"Salty's Seafood Shack",theme:'seafood',ic:'🦐',x:80,y:90,deco:['🛟','🐠','🌴'],games:['fish','fillet'],blurb:'Fresh catch, ocean breeze, sunburnt tourists.'},
 {id:'nola',city:'New Orleans',st:'LA',name:'Bayou Cajun Kitchen',theme:'cajun',ic:'🦞',x:58,y:76,deco:['🎺','⚜️','🎭'],games:['gumbo'],blurb:'Gumbo, jazz, and beignet sugar everywhere.'},
 {id:'atx',city:'Austin',st:'TX',name:'Lone Star Smokehouse',theme:'bbq',ic:'🍖',x:42,y:78,deco:['🐂','⭐','🌵'],games:['brisket'],blurb:'Low and slow. Lines around the block.'},
 {id:'nyc',city:'New York',st:'NY',name:"Big Apple Pizzeria",theme:'pizza',ic:'🍕',x:86,y:26,deco:['🗽','🚕','🍎'],games:['dough'],blurb:'Toss it high. Fold it in half. Walk fast.'}];
Object.assign(THEMES,{
 seafood:{name:'Seafood Shack',city:'mia',cost:0,ic:'🦐',wall:['#bfeaf0','#7fd0dc'],trim:['#1f6f8b','#2a8fb0'],floor:['#e9d7b4','#f6ead2'],tile:'rgba(31,111,139,.14)',cloth:'rgba(31,143,176,.75)',sign:"SALTY'S SEAFOOD",signC:'#1f6f8b',lamp:'#ffd23f'},
 cajun:{name:'Cajun Kitchen',city:'nola',cost:0,ic:'🦞',wall:['#3f5a3a','#2c4229'],trim:['#6b2a8a','#8a3cb0'],floor:['#5a3a24','#7a5236'],tile:'rgba(0,0,0,.2)',cloth:'rgba(255,210,63,.7)',sign:'BAYOU CAJUN KITCHEN',signC:'#6b2a8a',lamp:'#ffd23f'},
 bbq:{name:'Smokehouse',city:'atx',cost:0,ic:'🍖',wall:['#a0603a','#7a4428'],trim:['#3a2418','#5a3a24'],floor:['#6b4a32','#8a6444'],tile:'rgba(0,0,0,.18)',cloth:'rgba(192,33,58,.7)',sign:'LONE STAR SMOKEHOUSE',signC:'#3a2418',lamp:'#ff7a3c'},
 pizza:{name:'Pizzeria',city:'nyc',cost:0,ic:'🍕',wall:['#b5533c','#8f3d2b'],trim:['#1f5a32','#2c7a46'],floor:['#f2f2f2','#d9d9d9'],tile:'rgba(0,0,0,.14)',cloth:'rgba(214,48,58,.8)',sign:'BIG APPLE PIZZERIA',signC:'#1f5a32',lamp:'#ffd23f'}});
const CFOOD={nash:FOODS,mia:['🦐','🦞','🐟','🦀','🍤','🦪','🐚','🍋'],nola:['🦞','🍲','🍛','🌶️','🍤','🥖','🍩','🦐'],atx:['🍖','🥩','🌭','🍗','🌽','🥔','🍞','🥓'],nyc:['🍕','🥯','🌭','🥨','🍝','🧀','🍎','🥗']};
const curCity=()=>CITIES.find(c=>c.id===(S.city||'nash'))||CITIES[0];
window.dsCity=()=>curCity();window.dsCityFood=()=>CFOOD[S.city||'nash'];
S.city=S.city||'nash';S.trip=S.trip||{nash:{}};S.done=S.done||{};
const CK=['tab','decor','rooms','themes','theme','coins','bank','last','mgrUntil','maxd','view'];
function travel(id){if(id===S.city)return;const c=CITIES.find(x=>x.id===id);if(!c)return;accrue();const snap={};CK.forEach(k=>snap[k]=JSON.parse(JSON.stringify(S[k]===undefined?null:S[k])));S.trip[S.city]=snap;
 const t=S.trip[id];if(t&&t.tab){CK.forEach(k=>{if(t[k]!==null&&t[k]!==undefined)S[k]=t[k];});S.last=Date.now();}
 else{S.tab={tables:1,waiter:0,host:0,bartender:0,busboy:0,runner:0};S.decor=[];S.rooms={patio:{own:0,tables:0},vip:{own:0,tables:0}};S.themes=[c.theme];S.theme=c.theme;S.coins=0;S.bank=0;S.last=Date.now();S.mgrUntil=0;S.maxd=null;S.view='main';S.trip[id]={};}
 S.city=id;save();for(const k in guests)delete guests[k];sim.sig='';sim.view='';BLKsig='';if(window.renderBuild&&state==='build')renderBuild();if(window.renderMenu)renderMenu();}
const unlocked=i=>i===0||S.done[CITIES[i-1].id];
// ---- offline earnings: 10% while away unless a manager is on duty
function accrue(){const now=Date.now(),last=S.last||now;if(S.bank==null){S.bank=0;}const mins=Math.max(0,(now-last)/60000),r=rateMin();if(mins<=0){S.last=now;return;}
 let earned;if(document.hidden===false&&mins<.2)earned=r*mins;else{const mg=Math.max(0,Math.min(mins,((S.mgrUntil||0)-last)/60000));earned=r*(mg+.1*(mins-mg));}
 S.bank=Math.min(r*480,(S.bank||0)+earned);S.last=now;}
window.dsAccrue=accrue;setInterval(()=>{if(!document.hidden)accrue();},1000);
document.addEventListener('visibilitychange',()=>{accrue();save();});
const mgrOn=()=>(S.mgrUntil||0)>Date.now(),mgrLeft=()=>Math.max(0,(S.mgrUntil||0)-Date.now());
function addMgr(ms){S.mgrUntil=Math.min(Date.now()+8*3600e3,Math.max(Date.now(),S.mgrUntil||0)+ms);save();}
const fmtT=ms=>{const m=Math.round(ms/60000);return m>=60?Math.floor(m/60)+'h '+(m%60)+'m':m+'m';};
function openMgr(){const cost=Math.max(150,Math.round(rateMin()*35));const on=mgrOn();
 show2(`<div class="lbl">AWAY EARNINGS</div><div style="font-size:64px;line-height:1">🧑‍💼</div><h1 style="font-size:30px;margin:0">NIGHT MANAGER</h1>
 <div class="card" style="font-size:15px;line-height:1.45">${on?`<b style="color:#7cff6b">ON DUTY · ${fmtT(mgrLeft())} left</b><br>You earn <b>100%</b> while you're away.`:`While you're away you only earn <b style="color:#ff8a7a">10%</b>.<br>Hire a manager to earn <b style="color:#7cff6b">100%</b>.`}<br><small style="opacity:.8">Max 8 hours stacked</small></div>
 <button id="mgAd" style="width:100%;max-width:320px">▶ WATCH AD · +1 HOUR</button>
 <button id="mgPay" class="ghost" style="width:100%;max-width:320px" ${S.coins<cost?'disabled':''}>💵 PAY $${cost} · +2 HOURS</button>
 <button id="mgX" class="ghost" style="width:100%;max-width:320px">CLOSE</button>`);
 $('mgX').onclick=hide2;$('mgPay').onclick=()=>{if(S.coins<cost)return;S.coins-=cost;addMgr(2*3600e3);snd(880,.12,'square',.1);buzz([20,30,40]);openMgr();if(window.renderBuild)renderBuild();};
 $('mgAd').onclick=async()=>{const b=$('mgAd');b.disabled=true;let ok=false;if(window.dsRewardAd){b.textContent='Loading ad…';ok=await dsRewardAd();}else{b.textContent='Ad playing… 3';for(let i=2;i>=0;i--){await new Promise(r=>setTimeout(r,1000));b.textContent='Ad playing… '+i;}ok=true;}
  if(ok){addMgr(3600e3);snd(1180,.15,'triangle',.12);buzz([20,30,60]);openMgr();}else b.textContent='No ad right now · try again later';};}
function show2(h){let o=$('ov2');if(!o){o=document.createElement('div');o.id='ov2';o.className='ov';o.style.zIndex=30;document.body.appendChild(o);}o.innerHTML=h;o.classList.remove('hidden');}
function hide2(){const o=$('ov2');if(o)o.classList.add('hidden');}
window.dsOpenMgr=openMgr;
// ---- road trip map
function openMap(){accrue();const pts=CITIES.map(c=>c.x+','+c.y).join(' ');const cur=curCity();
 const segs=CITIES.slice(1).map((c,i)=>{const a=CITIES[i];const doneSeg=S.done[a.id];return `<line x1="${a.x}" y1="${a.y}" x2="${c.x}" y2="${c.y}" stroke="${doneSeg?'#ffd23f':'#fff'}" stroke-width="${doneSeg?2.2:1.6}" stroke-dasharray="${doneSeg?'0':'3 2.5'}" stroke-linecap="round"/>`;}).join('');
 const pins=CITIES.map((c,i)=>{const un=unlocked(i),isCur=c.id===S.city;return `<g class="pin" data-c="${c.id}" style="cursor:pointer"><circle cx="${c.x}" cy="${c.y}" r="${isCur?6:4.6}" fill="${S.done[c.id]?'#2bb673':un?'#ff5a3c':'#6b5a78'}" stroke="#1a1220" stroke-width="1.2"/><text x="${c.x}" y="${c.y+1.6}" font-size="${isCur?5.5:4.5}" text-anchor="middle">${un?c.ic:'🔒'}</text><text x="${c.x}" y="${c.y-(isCur?8.5:7)}" font-size="3.6" font-weight="900" text-anchor="middle" fill="#fff" stroke="#1a1220" stroke-width=".9" paint-order="stroke">${c.city.toUpperCase()}, ${c.st}</text></g>`;}).join('');
 const car=`<text x="${cur.x+7}" y="${cur.y+5}" font-size="7" class="car">🚗</text>`;
 const usa="M8,30 L18,18 L34,16 L52,18 L66,20 L74,14 L84,12 L92,16 L90,26 L86,34 L80,40 L76,50 L74,60 L78,70 L84,82 L82,96 L76,94 L72,82 L64,76 L56,80 L48,86 L40,84 L34,74 L24,72 L14,66 L8,54 Z";
 const list=CITIES.map((c,i)=>{const un=unlocked(i),isCur=c.id===S.city,tr=S.trip[c.id],cash=isCur?S.coins:(tr&&tr.coins)||0;return `<div class="tripRow ${isCur?'cur':''}"><div style="font-size:30px">${un?c.ic:'🔒'}</div><div style="flex:1;text-align:left"><b>${i+1}. ${c.city}, ${c.st}</b> ${S.done[c.id]?'<span class="tdone">★ COMPLETE</span>':''}<br><small>${c.name}${un&&(tr&&tr.tab||isCur)?` · 💵 $${cash}`:''}</small><br><small style="opacity:.75">${un?(c.games.length?'New games: '+c.games.map(g=>(G2N[g]||g)).join(', '):c.blurb):'Finish '+CITIES[i-1].city+' (★5) to unlock'}</small></div>${isCur?'<span class="here">YOU\'RE HERE</span>':un?`<button class="go" data-go="${c.id}">DRIVE</button>`:''}</div>`;}).join('');
 show2(`<div class="lbl">ROAD TRIP</div><h1 style="font-size:28px;margin:0">🗺️ THE DON'T SPILL TOUR</h1>
 <svg viewBox="0 0 100 100" style="width:100%;max-width:360px;border-radius:20px;border:4px solid #1a1220;box-shadow:0 6px 0 #1a1220;background:linear-gradient(#5ac8f0,#2f8fd0)"><path d="${usa}" fill="#7cc46a" stroke="#3f7a38" stroke-width="1.2"/><path d="${usa}" fill="url(#mp)" opacity=".25"/><defs><pattern id="mp" width="6" height="6" patternUnits="userSpaceOnUse"><circle cx="1" cy="1" r=".6" fill="#2a5a24"/></pattern></defs>${segs}${pins}${car}</svg>
 <div class="tripList">${list}</div><button id="mapX" class="ghost" style="width:100%;max-width:340px">CLOSE</button>`);
 $('mapX').onclick=hide2;document.querySelectorAll('#ov2 [data-go]').forEach(b=>b.onclick=()=>{const c=CITIES.find(x=>x.id===b.dataset.go),tr=S.trip[c.id];const fresh=!(tr&&tr.tab);
  show2(`<div style="font-size:70px">🚗💨</div><h1 style="font-size:28px;margin:0">DRIVE TO ${c.city.toUpperCase()}?</h1><div class="card" style="font-size:15px;line-height:1.5">Your <b>$${S.coins}</b> stays in ${curCity().city}.<br>${fresh?`You open <b>${c.name}</b> with <b>$0</b>.`:`Your ${c.city} restaurant is waiting with <b>$${tr.coins||0}</b>.`}</div><button id="tGo" style="width:100%;max-width:320px">LET'S ROLL 🚗</button><button id="tNo" class="ghost" style="width:100%;max-width:320px">NOT YET</button>`);
  $('tNo').onclick=openMap;$('tGo').onclick=()=>{travel(c.id);hide2();roadAnim(c);};});
 document.querySelectorAll('#ov2 .pin').forEach(p=>p.onclick=()=>{const b=document.querySelector(`#ov2 [data-go="${p.dataset.c}"]`);b&&b.click();});}
function roadAnim(c){const d=document.createElement('div');d.id='roadAnim';d.innerHTML=`<div class="rsky"></div><div class="rroad"></div><div class="rcar">🚗</div><div class="rtxt">WELCOME TO<br><b>${c.city.toUpperCase()}, ${c.st}</b><br><small>${c.name}</small></div>`;document.body.appendChild(d);
 [523,659,784,1047].forEach((f,i)=>setTimeout(()=>snd(f,.2,'triangle',.14),600+i*120));buzz([40,60,40,60,120]);setTimeout(()=>{confetti(W/2,H*.3,70);},1400);setTimeout(()=>d.remove(),3600);d.onclick=()=>d.remove();}
window.dsOpenMap=openMap;
const G2N={fish:'Reel It In',fillet:'Fillet It',gumbo:'Stir the Gumbo',brisket:'Slice the Brisket',dough:'Dough Toss'};
// city completion celebration
setInterval(()=>{if(stars()>=5&&!S.done[S.city]){S.done[S.city]=1;S.bestStars=5;save();const i=CITIES.findIndex(c=>c.id===S.city),nx=CITIES[i+1];
 show2(`<div style="font-size:80px">🏆</div><h1 style="font-size:30px;margin:0;color:#ffd23f">${curCity().city.toUpperCase()} COMPLETE!</h1><div class="card" style="font-size:15px">${nx?`Next stop on the road trip: <b>${nx.city}, ${nx.st}</b> ${nx.ic}<br>New restaurant, new games, start from $0.`:'You conquered the whole tour! More cities coming soon.'}</div><button id="cmMap" style="width:100%;max-width:320px">🗺️ OPEN ROAD TRIP MAP</button><button id="cmX" class="ghost" style="width:100%;max-width:320px">STAY HERE</button>`);
 $('cmMap').onclick=openMap;$('cmX').onclick=hide2;confetti(W/2,H*.3,90);buzz([80,50,80,50,250]);}
 S.bestStars=Math.max(S.bestStars||0,stars());},1000);
// styles
{const c=document.createElement('style');c.textContent=`#ov2{background:rgba(20,10,25,.95);display:flex;flex-direction:column;align-items:center;justify-content:center;gap:10px;padding:16px;overflow:auto;color:#fff;text-align:center}#ov2.hidden{display:none}#ov2 .card{background:rgba(255,255,255,.1);border-radius:16px;padding:12px;max-width:340px}.tripList{width:100%;max-width:360px;display:flex;flex-direction:column;gap:8px;max-height:34vh;overflow:auto}
.tripRow{display:flex;align-items:center;gap:10px;background:rgba(255,255,255,.08);border-radius:16px;padding:9px 11px;font-size:14px}.tripRow.cur{background:linear-gradient(90deg,rgba(255,210,63,.3),rgba(255,122,60,.18));box-shadow:0 0 0 2px #ffd23f}
.tripRow .go{margin:0;padding:9px 14px;font-size:14px;width:auto}.tripRow .here{font:900 11px system-ui;color:#ffd23f}.tdone{font:900 10px system-ui;color:#7cff6b}
#ov2 .car{animation:carB 1s ease-in-out infinite}@keyframes carB{50%{transform:translateY(-1px)}}
#roadAnim{position:fixed;inset:0;z-index:45;overflow:hidden;display:flex;align-items:center;justify-content:center;animation:cFade .3s}
#roadAnim .rsky{position:absolute;inset:0;background:linear-gradient(#ffb85c,#ff7a3c 55%,#4a2a5a)}#roadAnim .rroad{position:absolute;left:0;right:0;bottom:0;height:34%;background:#3a3a44;border-top:6px solid #2bb673}
#roadAnim .rroad::after{content:'';position:absolute;top:45%;left:-50%;width:200%;height:8px;background:repeating-linear-gradient(90deg,#ffd23f 0 40px,transparent 40px 80px);animation:rd .4s linear infinite}@keyframes rd{to{transform:translateX(-80px)}}
#roadAnim .rcar{position:absolute;bottom:22%;font-size:90px;transform:scaleX(-1);animation:rc 3.2s ease-in-out forwards}@keyframes rc{0%{left:-30%}40%,70%{left:35%}100%{left:120%}}
#roadAnim .rtxt{position:relative;z-index:2;text-align:center;color:#fff;font:800 20px system-ui;text-shadow:0 3px 0 #1a1220;margin-bottom:30vh;animation:cPop .6s .5s both cubic-bezier(.2,1.6,.4,1)}#roadAnim .rtxt b{font:900 clamp(30px,9vw,46px) system-ui;color:#ffd23f}`;document.head.appendChild(c);}

const _seC=simEntities;simEntities=function(){const E=_seC();if(mgrOn()&&S.view==='main'){const p=P(.2,.14),s=p.s*.9;E.push({y:p.y+14*s,f:()=>{staff(p.x,p.y,s,4,'srv',BT,1,{shirt:'#fff',vest:'#2a2a48',tie:'#ffd23f',shoe:'#000',apron:0});cx.fillStyle='#f4f4f4';cx.beginPath();cx.roundRect(p.x+8*s,p.y-28*s,11*s,14*s,2*s);cx.fill();ink(1.5);cx.fillStyle='#8a5a2b';cx.fillRect(p.x+11*s,p.y-30*s,5*s,3*s);TAGS.push([p.x,p.y-62*s,'🧑‍💼 MANAGER',1]);}});}return E;};
(()=>{const sh=$('build');if(sh&&!$('tripRow')){const r=document.createElement('div');r.id='tripRow';r.className='row';r.style.cssText='gap:8px;width:100%;margin:2px 0 8px;flex-wrap:nowrap';r.innerHTML='<button id="bMap" class="ghost" style="flex:1;margin:0;padding:9px 6px;font-size:14px">🗺️ ROAD TRIP</button><button id="bMgr" class="ghost" style="flex:1;margin:0;padding:9px 6px;font-size:14px">🧑‍💼 MANAGER</button>';const tog=$('shTog');tog?tog.after(r):sh.prepend(r);$('bMap').onclick=openMap;$('bMgr').onclick=openMgr;setInterval(()=>{const b=$('bMgr');if(b)b.textContent=mgrOn()?'🧑‍💼 ON · '+fmtT(mgrLeft()):'🧑‍💼 AWAY: 10%';},1000);}
 const go=$('go');if(go&&!$('mapBtn')){const b=document.createElement('button');b.id='mapBtn';b.style.cssText='width:100%;max-width:340px;margin:0;background:#2f8fd0;box-shadow:0 6px 0 #1a5a8a';go.parentElement.after(b);b.onclick=openMap;const u=()=>{const c=curCity();b.textContent='🗺️ ROAD TRIP · '+c.city.toUpperCase()+', '+c.st;};u();setInterval(u,2000);}})();

})();
