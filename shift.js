// ===== DON'T SPILL · SHIFT MODE (cartoon micro-games) + DAILY + VS CHEF-BOT + LEADERBOARD =====
(()=>{
const sc=document.createElement('canvas');sc.id='sc';sc.style.cssText='position:fixed;inset:0;width:100%;height:100%;display:none;z-index:5;touch-action:none';document.body.appendChild(sc);
const g2=sc.getContext('2d');let SW,SH;
function rs(){const d=Math.min(devicePixelRatio||1,2);SW=innerWidth;SH=innerHeight;sc.width=SW*d;sc.height=SH*d;g2.setTransform(d,0,0,d,0,0);}addEventListener('resize',rs);rs();
let C=g2;const OL='#1a1220',TAU=Math.PI*2;
const cl=(v,a,b)=>Math.max(a,Math.min(b,v));
// ---------- seeded rng (daily) ----------
function mulberry(a){return()=>{a|=0;a=a+0x6D2B79F5|0;let t=Math.imul(a^a>>>15,1|a);t=t+Math.imul(t^t>>>7,61|t)^t;return((t^t>>>14)>>>0)/4294967296;};}
let R=Math.random;const rr2=(a,b)=>a+R()*(b-a),pk=a=>a[R()*a.length|0];
const dayKey=()=>{const d=new Date();return d.getFullYear()+'-'+String(d.getMonth()+1).padStart(2,'0')+'-'+String(d.getDate()).padStart(2,'0');};
// ---------- name filter (PG-13) ----------
const BAD=['fuck','fuk','shit','bitch','cunt','dick','cock','pussy','nigg','nigga','fag','slut','whore','rape','porn','penis','vagina','cum','sex','nazi','hitler','kkk','retard','twat','wank','tits','boob','anal','jizz','ass'];
function cleanName(n){n=String(n||'').replace(/[^A-Za-z0-9 _-]/g,'').trim().slice(0,12);const f=n.toLowerCase().replace(/[^a-z]/g,'').replace(/0/g,'o').replace(/1/g,'i').replace(/3/g,'e').replace(/4/g,'a').replace(/5/g,'s');if(n.length<2||BAD.some(b=>f.includes(b)))return '';return n;}
// ---------- cartoon drawing kit ----------
function rrect(x,y,w,h,r){C.beginPath();C.roundRect?C.roundRect(x,y,w,h,r):C.rect(x,y,w,h);}
function ink(w=4){C.strokeStyle=OL;C.lineWidth=w;C.lineJoin='round';C.lineCap='round';C.stroke();}
function blob(x,y,rx,ry,c,w=4){C.fillStyle=c;C.beginPath();C.ellipse(x,y,rx,ry,0,0,TAU);C.fill();ink(w);}
function eyes(x,y,s,mood,look=0){for(const d of[-1,1]){blob(x+d*s*.42,y,s*.3,s*.36,'#fff',3);C.fillStyle=OL;C.beginPath();C.arc(x+d*s*.42+look*s*.1,y+s*.06,s*.14,0,TAU);C.fill();C.fillStyle='#fff';C.beginPath();C.arc(x+d*s*.42+look*s*.1-s*.05,y,s*.05,0,TAU);C.fill();}
 if(mood==='mad'){C.beginPath();C.moveTo(x-s*.8,y-s*.5);C.lineTo(x-s*.12,y-s*.28);C.moveTo(x+s*.8,y-s*.5);C.lineTo(x+s*.12,y-s*.28);ink(5);}}
function mouth(x,y,s,mood){C.beginPath();if(mood==='happy'){C.arc(x,y,s*.32,.15*Math.PI,.85*Math.PI);C.fillStyle='#7a1f2a';C.fill();}else if(mood==='scared'){C.ellipse(x,y+s*.08,s*.16,s*.22,0,0,TAU);C.fillStyle='#7a1f2a';C.fill();}else if(mood==='mad'){C.moveTo(x-s*.3,y+s*.12);C.quadraticCurveTo(x,y-s*.1,x+s*.3,y+s*.12);}else{C.moveTo(x-s*.22,y+s*.05);C.lineTo(x+s*.22,y);}ink(4);}
function starburst(x,y,r,c1,c2,rot){C.save();C.translate(x,y);C.rotate(rot);C.fillStyle=c1;C.fillRect(-r,-r,r*2,r*2);C.fillStyle=c2;for(let i=0;i<16;i++){C.beginPath();C.moveTo(0,0);C.arc(0,0,r*1.5,i*TAU/16,(i+.5)*TAU/16);C.fill();}C.restore();}
function dots(c){C.fillStyle=c;for(let y=0;y<SH;y+=22)for(let x=(y/22&1)*11;x<SW;x+=22){C.beginPath();C.arc(x,y,3,0,TAU);C.fill();}}
function bigText(t,x,y,sz,c='#ffd23f',rot=-.05){C.save();C.translate(x,y);C.rotate(rot);C.font=`900 ${sz}px system-ui,-apple-system,sans-serif`;{const mw=SW-36,w0=C.measureText(t).width;if(w0>mw){sz*=mw/w0;C.font=`900 ${sz}px system-ui,-apple-system,sans-serif`;}}C.textAlign='center';C.textBaseline='middle';C.lineJoin='round';C.lineWidth=sz*.2;C.strokeStyle=OL;C.strokeText(t,0,0);C.fillStyle=c;C.fillText(t,0,0);C.restore();}
function waiter(x,y,s,mood='calm',tilt=0){const O=(typeof OUTFITS!=='undefined'&&OUTFITS.find(o=>o.id===S.outfit))||{shirt:'#fff',vest:'#1d1d26'};C.save();C.translate(x,y);C.rotate(tilt);
 blob(0,s*1.05,s*.7,s*.18,'rgba(0,0,0,.25)',0);
 C.fillStyle='#2a2a38';rrect(-s*.38,s*.3,s*.28,s*.7,s*.1);C.fill();ink(3);rrect(s*.1,s*.3,s*.28,s*.7,s*.1);C.fill();ink(3);
 C.fillStyle=O.shirt;rrect(-s*.55,-s*.35,s*1.1,s*.85,s*.3);C.fill();ink();C.fillStyle=O.vest;rrect(-s*.55,-s*.3,s*.32,s*.78,s*.15);C.fill();rrect(s*.23,-s*.3,s*.32,s*.78,s*.15);C.fill();
 C.fillStyle='#d6303a';C.beginPath();C.moveTo(-s*.18,-s*.36);C.lineTo(s*.18,-s*.36);C.lineTo(0,-s*.12);C.closePath();C.fill();ink(3);
 blob(0,-s*.8,s*.55,s*.52,'#a86b3c');C.fillStyle=OL;C.beginPath();C.ellipse(0,-s*1.12,s*.5,s*.22,0,Math.PI,TAU);C.fill();
 eyes(0,-s*.86,s*.5,mood);mouth(0,-s*.55,s*.5,mood);C.restore();}
function manager(x,y,s,mood='mad'){C.save();C.translate(x,y);
 C.fillStyle='#fff';rrect(-s*.9,s*.35,s*1.8,s*.9,s*.35);C.fill();ink(5);C.fillStyle='#c0213a';C.beginPath();C.moveTo(-s*.12,s*.38);C.lineTo(s*.12,s*.38);C.lineTo(s*.18,s*1.1);C.lineTo(0,s*1.22);C.lineTo(-s*.18,s*1.1);C.closePath();C.fill();ink(3);
 blob(0,-s*.05,s*.78,s*.72,'#f0b98a',5);blob(-s*.8,0,s*.15,s*.22,'#f0b98a',4);blob(s*.8,0,s*.15,s*.22,'#f0b98a',4);
 C.fillStyle='rgba(255,255,255,.5)';C.beginPath();C.ellipse(-s*.25,-s*.5,s*.22,s*.1,-.4,0,TAU);C.fill();
 eyes(0,-s*.15,s*.62,mood);C.fillStyle='#3a2418';C.beginPath();C.ellipse(-s*.24,s*.22,s*.3,s*.12,-.2,0,TAU);C.ellipse(s*.24,s*.22,s*.3,s*.12,.2,0,TAU);C.fill();ink(3);
 mouth(0,s*.42,s*.6,mood==='mad'?'mad':mood);blob(0,s*.08,s*.14,s*.11,'#e0906a',3);C.restore();}
function bot(x,y,s,mood='happy'){C.save();C.translate(x,y);C.strokeStyle=OL;C.lineWidth=4;C.beginPath();C.moveTo(0,-s*.75);C.lineTo(0,-s*1.05);C.stroke();blob(0,-s*1.1,s*.13,s*.13,'#ff4fa3',3);
 C.fillStyle='#b9c6d3';rrect(-s*.75,-s*.75,s*1.5,s*1.15,s*.3);C.fill();ink(5);C.fillStyle='#1a2a3a';rrect(-s*.58,-s*.55,s*1.16,s*.6,s*.2);C.fill();
 C.fillStyle='#2fd3ff';C.shadowColor='#2fd3ff';C.shadowBlur=10;for(const d of[-1,1]){C.beginPath();mood==='sad'?C.rect(x0(d,s)-s*.14,-s*.28,s*.28,s*.07):C.arc(x0(d,s),-s*.25,s*.12,0,TAU);C.fill();}C.shadowBlur=0;
 C.beginPath();mood==='sad'?C.arc(0,s*.22,s*.2,1.15*Math.PI,1.85*Math.PI):C.arc(0,s*.05,s*.2,.15*Math.PI,.85*Math.PI);C.strokeStyle='#2fd3ff';C.lineWidth=4;C.stroke();
 C.fillStyle=OL;C.beginPath();C.moveTo(-s*.25,s*.45);C.lineTo(0,s*.6);C.lineTo(-s*.25,s*.75);C.fill();C.beginPath();C.moveTo(s*.25,s*.45);C.lineTo(0,s*.6);C.lineTo(s*.25,s*.75);C.fill();C.restore();}
const x0=(d,s)=>d*s*.28;
function cGlass(x,y,s,c='#ff7a3c',fill=.8,rot=0){C.save();C.translate(x,y);C.rotate(rot);C.beginPath();C.moveTo(-s*.42,-s);C.lineTo(s*.42,-s);C.lineTo(s*.32,0);C.lineTo(-s*.32,0);C.closePath();C.fillStyle='rgba(220,245,255,.85)';C.fill();
 if(fill>0){C.save();C.clip();C.fillStyle=c;C.fillRect(-s,-s*fill,s*2,s*fill);C.fillStyle='rgba(255,255,255,.85)';C.fillRect(-s,-s*fill,s*2,s*.12);C.restore();}
 C.beginPath();C.moveTo(-s*.42,-s);C.lineTo(s*.42,-s);C.lineTo(s*.32,0);C.lineTo(-s*.32,0);C.closePath();ink(4);C.fillStyle='rgba(255,255,255,.7)';C.fillRect(-s*.26,-s*.85,s*.08,s*.6);C.restore();}
function cTable(x,y,s){blob(x+4,y+s*.35,s,s*.32,'rgba(0,0,0,.2)',0);C.fillStyle='#6b3d22';C.fillRect(x-s*.08,y,s*.16,s*.4);blob(x,y,s,s*.34,'#fff');blob(x,y,s*.75,s*.22,'#ff5a3c',3);}
function kidS(x,y,s,c){blob(x,y+s*.95,s*.5,s*.14,'rgba(0,0,0,.25)',0);C.fillStyle=c;rrect(-s*.4+x,y,s*.8,s*.8,s*.25);C.fill();ink();blob(x,y-s*.3,s*.45,s*.42,'#c68642');eyes(x,y-s*.36,s*.42,'calm');mouth(x,y-s*.08,s*.42,'happy');C.fillStyle=c;C.beginPath();C.arc(x,y-s*.5,s*.45,Math.PI,TAU);C.fill();ink(3);}
function coinS(x,y,s,sp=0){const k=Math.abs(Math.cos(sp));blob(x,y,s*k+2,s,'#ffd23f',4);C.fillStyle='#b8860b';C.font=`900 ${s}px system-ui`;C.textAlign='center';C.textBaseline='middle';if(k>.4)C.fillText('$',x,y+1);}
function bg(c1,c2){const g=C.createLinearGradient(0,0,0,SH);g.addColorStop(0,c2);g.addColorStop(1,c1);C.fillStyle=g;C.fillRect(0,0,SW,SH);C.fillStyle='rgba(255,255,255,.07)';for(let i=-SH;i<SW;i+=56){C.beginPath();C.moveTo(i,0);C.lineTo(i+22,0);C.lineTo(i+22+SH*.5,SH);C.lineTo(i+SH*.5,SH);C.fill();}}
// ---------- lines ----------
const ROAST={
 intro:["Faster. The kitchen's watching.","Table 7 has a coupon. Pray for us.","I've seen sloths serve faster.","Don't. Mess. This. Up.","You call that hustle?","Move like rent is due. Because it is."],
 win:["Fine. That was adequate.","Don't let it go to your head.","Okay, who are you and what did you do with the old you?","Look at you. Barely competent.","The customers didn't cry. Progress."],
 fail:{wipe:["Still sticky. Customers noticed.","You smeared it. Artistically."],order:["They asked for fries. You brought ice cream.","Wrong order. Table 3 is posting about us."],tray:["The drink slid off. Physics is undefeated.","Steady hands? More like spaghetti hands."],flip:["Burnt. Smoke alarm says hi.","That pancake had potential."],run:["You hit a CHILD. With soup.","The floor is not a table."],stack:["That's not a stack. That's modern art.","Gravity: 1. You: 0."],pour:["Half foam. Half shame.","I asked for a drink, not a flood."],rush:["Table 4 left. With the silverware.","They waited. You forgot."],catch:["Butterfingers. Literal butter.","That glass had a family."],tip:["You tipped yourself an IOU. Genius.","That was a cockroach. You grabbed a cockroach."]},
 over:["You're fired. Come back tomorrow.","Clean that up before the dinner rush.","I'm putting you on dish duty. Forever.","That's coming out of your paycheck."],
 botWin:["Chef-Bot nailed it. Show off.","The robot's making you look bad."],botFail:["Chef-Bot dropped it! Even robots crack.","Chef-Bot.exe has stopped working."]};
// ---------- state ----------
let T=0,run=null,ptr={x:0,y:0,down:0},phase='off',phT=0,flash='';
const G={};
const rate=()=>run?Math.min(2.2,1+(run.round-1)*.05):1;
const sp=()=>rate()*(gs&&gs.tut?.7:1);
function newRun(mode,diff){R=mode==='daily'?mulberry([...dayKey()].reduce((h,c)=>h*31+c.charCodeAt(0)>>>0,7)):Math.random;
 run={mode,diff,round:0,lives:3,score:0,streak:0,last:'',botLives:mode==='vs'?3:0,botScore:0,botRes:null,won:0,cleared:0};}
// ---------- mini-games ----------
// each: name, hint, dur(base secs), endWin (survive = win), init, upd(dt)->'win'|'fail'|undefined, draw, tap(x,y)
G.run={name:'DELIVERY RUN',hint:'DRAG to dodge the chaos!',dur:9,endWin:1,c:['#ff8a3d','#ffb35c'],
 init(g){g.x=SW/2;g.ob=[];g.sp=0;},
 upd(g,dt){if(ptr.down)g.x+=(cl(ptr.x,40,SW-40)-g.x)*Math.min(1,dt*14);g.sp-=dt;if(g.sp<=0){g.sp=rr2(.65,1.05)/sp();const k=R()<.5?'kid':'table';g.ob.push({k,x:rr2(40,SW-40),y:-60,vx:k==='kid'?rr2(-90,90):0,c:pk(['#2fd3ff','#ff4fa3','#7cff6b','#ffd23f'])});}
  const py=SH*.8;for(const o of g.ob){o.y+=(170+100*sp())*dt;o.x+=o.vx*dt;if(o.x<30||o.x>SW-30)o.vx*=-1;if(!o.h&&Math.abs(o.y-py)<46&&Math.abs(o.x-g.x)<(o.k==='table'?62:42)){o.h=1;return 'fail';}}g.ob=g.ob.filter(o=>o.y<SH+80);},
 draw(g){C.fillStyle='rgba(255,255,255,.18)';for(let y=(T*300*sp())%80-80;y<SH;y+=80)C.fillRect(SW/2-6,y,12,40);for(const o of g.ob)o.k==='kid'?kidS(o.x,o.y,30,o.c):cTable(o.x,o.y,52);const py=SH*.8;waiter(g.x,py-10,40,'scared',(ptr.x-g.x)*.0015);for(let i=0;i<3;i++)cGlass(g.x+28,py-70-i*24,22,['#c0213a','#f2a516','#7ee0ff'][i],.75);}};
G.stack={name:'STACK THE GLASSES',hint:'TAP to drop!',dur:12,c:['#2fd3ff','#7ee0ff'],
 init(g){g.need=4+Math.min(4,run.round/3|0);g.st=[SW/2];g.drop=null;g.ph=0;},
 upd(g,dt){g.ph+=dt*(1.3+.9*sp());if(g.drop){g.drop.y+=900*dt;const ty=topY(g);if(g.drop.y>=ty){const dx=g.drop.x-g.st[g.st.length-1];if(Math.abs(dx)<40){g.st.push(g.drop.x);g.drop=null;snd&&snd(700+g.st.length*60,.08,'triangle',.12);if(g.st.length-1>=g.need)return 'win';}else{g.miss=g.drop;g.drop=null;return 'fail';}}}},
 tap(g){if(!g.drop&&!g.miss)g.drop={x:cx2(g),y:SH*.2};},
 draw(g){const by=SH*.86;C.fillStyle='#6b3d22';rrect(SW/2-120,by,240,30,10);C.fill();ink();for(let i=0;i<g.st.length;i++)cGlass(g.st[i],by-i*44,34,['#c0213a','#f2a516','#2bb673','#ff7ab8','#7ee0ff'][i%5],i?.7:0);
  if(!g.drop&&!g.miss)cGlass(cx2(g),SH*.2,34,'#ffd23f',.7);if(g.drop)cGlass(g.drop.x,g.drop.y,34,'#ffd23f',.7);if(g.miss)cGlass(g.miss.x+30,g.miss.y+20,34,'#ffd23f',.7,1.2);
  bigText((g.st.length-1)+' / '+g.need,SW/2,SH*.34,38,'#fff',0);}};
const topY=g=>SH*.86-g.st.length*44,cx2=g=>SW/2+Math.sin(g.ph)*Math.min(140,SW*.36);
G.pour={name:'PERFECT POUR',hint:'HOLD to pour · LET GO in the green!',dur:9,c:['#7cff6b','#b6ff8a'],
 init(g){g.lv=0;g.n=0;g.need=2;g.held=0;newBand(g);},
 upd(g,dt){if(ptr.down){g.held=1;g.lv+=dt*(.32+.14*sp());if(g.lv>1){g.why='over';return 'fail';}}else if(g.held){g.held=0;if(g.lv>=g.lo&&g.lv<=g.hi){g.n++;snd&&snd(990,.12,'triangle',.14);if(g.n>=g.need)return 'win';g.lv=0;newBand(g);}else{g.why='short';return 'fail';}}},
 draw(g){const x=SW/2,y=SH*.78,s=150;C.save();C.translate(x,y);C.beginPath();C.moveTo(-s*.42,-s*1.6);C.lineTo(s*.42,-s*1.6);C.lineTo(s*.32,0);C.lineTo(-s*.32,0);C.closePath();C.fillStyle='rgba(220,245,255,.85)';C.fill();C.save();C.clip();
  C.fillStyle='rgba(43,182,115,.35)';C.fillRect(-s,-s*1.6*g.hi,s*2,s*1.6*(g.hi-g.lo));C.fillStyle='#f2a516';C.fillRect(-s,-s*1.6*g.lv,s*2,s*1.6*g.lv);C.fillStyle='#fff8e0';C.fillRect(-s,-s*1.6*g.lv,s*2,10);C.restore();
  C.beginPath();C.moveTo(-s*.42,-s*1.6);C.lineTo(s*.42,-s*1.6);C.lineTo(s*.32,0);C.lineTo(-s*.32,0);C.closePath();ink(6);C.strokeStyle='#2bb673';C.lineWidth=4;C.setLineDash([10,8]);for(const b of[g.lo,g.hi]){C.beginPath();C.moveTo(-s*.5,-s*1.6*b);C.lineTo(s*.5,-s*1.6*b);C.stroke();}C.setLineDash([]);C.restore();
  C.save();C.translate(x+40,SH*.12);C.rotate(ptr.down?1.9:1.2);C.fillStyle='#2bb673';rrect(-18,-70,36,90,12);C.fill();ink();C.fillStyle='#2bb673';C.fillRect(-8,-95,16,30);C.restore();
  if(ptr.down){C.fillStyle='#f2a516';C.fillRect(x-6,SH*.16,12,y-SH*.16-s*1.6*g.lv);}bigText('POURS '+g.n+' / '+g.need,SW/2,SH*.08+40,28,'#fff',0);}};
function newBand(g){const w=Math.max(.08,.18-.03*sp());g.lo=rr2(.55,.88-w);g.hi=g.lo+w;}
G.rush={name:'RUSH HOUR',hint:'TAP tables before they rage-quit!',dur:10,endWin:1,c:['#ff4fa3','#ff8ac4'],
 init(g){const cols=3,rows=3;g.t=[];for(let r=0;r<rows;r++)for(let c=0;c<cols;c++)g.t.push({x:SW*(.2+c*.3),y:SH*(.3+r*.2),on:0,p:0});g.sp=.3;},
 upd(g,dt){g.sp-=dt;if(g.sp<=0){g.sp=rr2(.7,1.1)/sp();const off=g.t.filter(t=>!t.on);if(off.length){const t=pk(off);t.on=1;t.p=t.max=Math.max(1.4,3.4/sp());}}for(const t of g.t)if(t.on){t.p-=dt;if(t.p<=0){t.mad=1;return 'fail';}}},
 tap(g,x,y){for(const t of g.t)if(t.on&&Math.hypot(x-t.x,y-t.y)<60){t.on=0;t.ok=.4;snd&&snd(1200,.06,'square',.1);}},
 draw(g){for(const t of g.t){cTable(t.x,t.y,44);if(t.ok>0){t.ok-=1/60;bigText('✓',t.x,t.y-6,34,'#7cff6b',0);}if(t.on||t.mad){const f=t.mad?0:t.p/t.max,s=24;kidS(t.x-48,t.y-30,s,'#6a4c93');C.fillStyle='#fff';rrect(t.x+8,t.y-82,44,44,14);C.fill();ink();C.fillStyle=f>.5?'#2bb673':f>.25?'#ffd23f':'#ff3b30';C.beginPath();C.moveTo(t.x+30,t.y-60);C.arc(t.x+30,t.y-60,16,-Math.PI/2,-Math.PI/2+TAU*f);C.fill();if(t.mad)bigText('😡',t.x+30,t.y-60,26,'#fff',0);}}}};
G.catch={name:'CATCH!',hint:'DRAG the tray under flying glasses!',dur:10,endWin:1,c:['#ffd23f','#ffe37a'],
 init(g){g.x=SW/2;g.gl=[];g.sp=.4;g.n=0;},
 upd(g,dt){if(ptr.down)g.x+=(cl(ptr.x,50,SW-50)-g.x)*Math.min(1,dt*16);g.sp-=dt;if(g.sp<=0){g.sp=rr2(1,1.5)/sp();const L=R()<.5,tx=rr2(60,SW-60),ty=SH*.78,x=L?-20:SW+20,y=SH*rr2(.3,.5),tt=rr2(1.5,1.9)/Math.sqrt(sp()),gv=900;g.gl.push({x,y,vx:(tx-x)/tt,vy:(ty-y-.5*gv*tt*tt)/tt,gv,r:0,c:pk(['#c0213a','#f2a516','#7ee0ff','#ff7ab8'])});}
  const ty=SH*.78;for(const o of g.gl){o.vy+=o.gv*dt;o.x+=o.vx*dt;o.y+=o.vy*dt;o.r+=dt*6;if(!o.d&&o.vy>0&&o.y>=ty-6){if(Math.abs(o.x-g.x)<62){o.d=1;g.n++;snd&&snd(1000+g.n*40,.08,'triangle',.12);}else{o.d=2;return 'fail';}}}g.gl=g.gl.filter(o=>o.d!==1&&o.y<SH+60);},
 draw(g){const ty=SH*.78;waiter(g.x,ty+70,36,'scared');C.fillStyle='#d6dde4';C.beginPath();C.ellipse(g.x,ty,64,12,0,0,TAU);C.fill();ink();for(const o of g.gl)cGlass(o.x,o.y,28,o.c,.7,o.r);bigText('CAUGHT '+g.n,SW/2,SH*.16,30,'#fff',0);}};
G.tip={name:'TIP JAR',hint:'TAP the cash · NOT the roaches!',dur:8,c:['#2bb673','#5fd99a'],
 init(g){g.it=[];g.sp=0;g.n=0;g.need=6+Math.min(5,run.round/3|0);},
 upd(g,dt){g.sp-=dt;if(g.sp<=0){g.sp=rr2(.35,.6)/sp();g.it.push({x:rr2(50,SW-50),y:rr2(SH*.2,SH*.75),k:R()<.68?'coin':R()<.5?'roach':'iou',l:Math.max(1,1.9/sp()),a:R()*6});}for(const o of g.it)o.l-=dt;g.it=g.it.filter(o=>o.l>0&&!o.got);},
 tap(g,x,y){for(const o of g.it)if(Math.hypot(x-o.x,y-o.y)<44){o.got=1;if(o.k==='coin'){g.n++;snd&&snd(1400,.05,'square',.08);if(g.n>=g.need)g.res='win';}else{g.bad=o;g.res='fail';}return;}},
 draw(g){C.fillStyle='rgba(220,245,255,.6)';rrect(SW/2-60,SH*.82,120,110,24);C.fill();ink();bigText('TIPS',SW/2,SH*.88,22,'#2bb673',0);
  for(const o of g.it){const p=1+Math.sin(T*12+o.a)*.06;if(o.k==='coin')coinS(o.x,o.y,26*p,T*5+o.a);else if(o.k==='roach'){blob(o.x,o.y,26,18,'#5a2d12');C.strokeStyle=OL;C.lineWidth=3;for(let i=-1;i<=1;i++){C.beginPath();C.moveTo(o.x+i*10,o.y);C.lineTo(o.x+i*14,o.y+(i?26:28));C.moveTo(o.x+i*10,o.y);C.lineTo(o.x+i*14,o.y-26);C.stroke();}blob(o.x+22,o.y,9,8,'#3a1a0a',3);}
   else{C.save();C.translate(o.x,o.y);C.rotate(-.15);C.fillStyle='#fff8d0';rrect(-34,-20,68,40,6);C.fill();ink();C.fillStyle='#c0213a';C.font='900 18px system-ui';C.textAlign='center';C.textBaseline='middle';C.fillText('IOU',0,1);C.restore();}}
  bigText('$'+g.n+' / $'+g.need,SW/2,SH*.12,32,'#fff',0);}};
G.wipe={name:'WIPE IT DOWN',hint:'SCRUB the mess off the table!',dur:9,c:['#2fb8d3','#a8ecff'],
 init(g){g.sp=[];const n=4+Math.min(3,run.round/4|0);for(let i=0;i<n;i++){const a=i/n*TAU+R(),r=.35+R()*.5;g.sp.push({x:SW/2+Math.cos(a)*r*Math.min(SW*.34,150),y:SH*.52+Math.sin(a)*r*Math.min(SW*.24,105),h:1,c:pk(['#c0213a','#f2a516','#7a3b1e','#8a2be2']),r:24+R()*10});}g.px=null;},
 upd(g,dt){if(ptr.down){const mv=g.px?Math.hypot(ptr.x-g.px[0],ptr.y-g.px[1]):0;for(const s of g.sp)if(s.h>0&&Math.hypot(ptr.x-s.x,ptr.y-s.y)<s.r+30){s.h-=mv*.0045;if(s.h<=0){s.h=0;snd&&snd(1300,.06,'triangle',.1);}}g.px=[ptr.x,ptr.y];}else g.px=null;if(g.sp.every(s=>s.h<=0))return 'win';},
 draw(g){const x=SW/2,y=SH*.52,rx=Math.min(SW*.44,190),ry=Math.min(SW*.32,135);blob(x+6,y+12,rx,ry,'rgba(0,0,0,.2)',0);blob(x,y,rx,ry,'#fff',5);C.save();C.beginPath();C.ellipse(x,y,rx-8,ry-8,0,0,TAU);C.clip();C.fillStyle='rgba(255,90,60,.18)';for(let i=-rx;i<rx;i+=28)C.fillRect(x+i,y-ry,14,ry*2);for(let j=-ry;j<ry;j+=28)C.fillRect(x-rx,y+j,rx*2,14);C.restore();
  for(const s of g.sp)if(s.h>0){C.globalAlpha=s.h;blob(s.x,s.y,s.r,s.r*.75,s.c,3);blob(s.x+s.r*.6,s.y+s.r*.4,s.r*.3,s.r*.22,s.c,2);C.globalAlpha=1;}
  if(ptr.down){C.save();C.translate(ptr.x,ptr.y);C.rotate(Math.sin(T*20)*.15);C.fillStyle='#ffd23f';rrect(-30,-20,60,40,10);C.fill();ink();C.fillStyle='#2bb673';rrect(-30,-20,60,12,6);C.fill();ink(3);C.restore();for(let i=0;i<3;i++)blob(ptr.x+Math.sin(T*9+i*2)*36,ptr.y-30-((T*60+i*20)%40),5,5,'rgba(255,255,255,.8)',1.5);}
  bigText('MESS LEFT: '+g.sp.filter(s=>s.h>0).length,SW/2,SH*.17,28,'#fff',0);}};
const FOOD=['🍔','🍟','🥤','🍕','🍦','🌮','🍩','🥗'];
function nq(g){g.want=pk(FOOD);const o=[g.want];while(o.length<3){const f=pk(FOOD);if(!o.includes(f))o.push(f);}for(let i=2;i>0;i--){const j=R()*(i+1)|0;[o[i],o[j]]=[o[j],o[i]];}g.opts=o;g.pop=0;}
G.order={name:'WHAT DID THEY ORDER?',hint:'TAP the food they asked for!',dur:10,c:['#ff7a3c','#ffc9a3'],
 init(g){g.need=4+Math.min(3,run.round/4|0);g.n=0;nq(g);},
 upd(g,dt){g.pop+=dt;},
 tap(g,x,y){if(g.res)return;g.opts.forEach((f,i)=>{const px=SW*(.2+i*.3),py=SH*.74;if(Math.hypot(x-px,y-py)<52){if(f===g.want){g.n++;snd&&snd(1100+g.n*60,.08,'triangle',.12);if(g.n>=g.need)g.res='win';else nq(g);}else{g.wrong=i;g.res='fail';}}});},
 draw(g){const s=Math.min(SW,SH)*.13;blob(SW/2,SH*.4,s*.9,s*.85,'#f1c27d',5);C.fillStyle='#5a3a1e';C.beginPath();C.ellipse(SW/2,SH*.4-s*.45,s*.85,s*.45,0,Math.PI,TAU);C.fill();ink(4);eyes(SW/2,SH*.4-s*.05,s*.7,'calm');mouth(SW/2,SH*.4+s*.4,s*.7,'happy');
  const bx=SW/2,by=SH*.18,p=Math.min(1,g.pop*6);C.save();C.translate(bx,by);C.scale(p,p);C.fillStyle='#fff';rrect(-70,-42,140,84,22);C.fill();ink(4);C.beginPath();C.moveTo(-10,40);C.lineTo(0,60);C.lineTo(12,40);C.fillStyle='#fff';C.fill();C.font='52px system-ui';C.textAlign='center';C.textBaseline='middle';C.fillText(g.want,0,2);C.restore();
  g.opts.forEach((f,i)=>{const px=SW*(.2+i*.3),py=SH*.74;blob(px,py+6,52,22,'rgba(0,0,0,.2)',0);blob(px,py,50,44,g.wrong===i?'#ffb3a8':'#fff',4);blob(px,py,36,30,'#eef2f6',2);C.font='44px system-ui';C.textAlign='center';C.textBaseline='middle';C.fillText(f,px,py+2);});
  bigText(g.n+' / '+g.need,SW/2,SH*.9,30,'#fff',0);}};
G.tray={name:'STEADY THE TRAY',hint:'DRAG left/right · keep the glass on!',dur:9,endWin:1,c:['#8a5cf6','#d3c2ff'],
 init(g){g.b=0;g.v=0;g.tl=0;g.push=0;g.pt=.6;},
 upd(g,dt){g.pt-=dt;if(g.pt<=0){g.pt=rr2(1,1.8);g.push=(R()<.5?-1:1)*rr2(.35,.55+.25*sp());}if(ptr.down)g.tl=cl((ptr.x-SW/2)/(SW*.35),-1,1);g.v+=(g.push+g.tl*1.3)*dt;g.v*=Math.pow(.6,dt);g.b+=g.v*dt;if(Math.abs(g.b)>1){g.why='slid';return 'fail';}},
 draw(g){const x=SW/2,y=SH*.6,w=Math.min(SW*.42,170);waiter(x,y+110,44,Math.abs(g.b)>.6?'scared':'calm');C.save();C.translate(x,y);C.rotate(g.tl*.28);C.fillStyle='#cfd8e2';C.beginPath();C.ellipse(0,0,w,16,0,0,TAU);C.fill();ink(5);C.fillStyle='#ff5a3c';C.fillRect(-w,-2,10,4);C.fillRect(w-10,-2,10,4);cGlass(g.b*w*.9,-8,40,'#2fd3ff',.75);C.restore();
  if(g.push){C.globalAlpha=.5+.3*Math.sin(T*8);bigText(g.push>0?'💨 →':'← 💨',x,SH*.3,34,'#fff',0);C.globalAlpha=1;}
  const mw=Math.min(SW-60,280);C.fillStyle='rgba(26,18,32,.6)';rrect(x-mw/2,SH*.2,mw,14,7);C.fill();C.fillStyle='#ff5a3c';rrect(x-mw/2,SH*.2,mw*.12,14,7);C.fill();rrect(x+mw/2-mw*.12,SH*.2,mw*.12,14,7);C.fill();blob(x+g.b*mw/2,SH*.2+7,10,10,'#ffd23f',3);}};
G.flip={name:'FLIP IT!',hint:'TAP when the pancake turns GOLDEN!',dur:11,c:['#f5a524','#ffe2a3'],
 init(g){g.n=0;g.need=3;g.ck=0;g.fl=0;},
 upd(g,dt){if(g.fl>0)g.fl-=dt;else g.ck+=dt*(.28+.1*sp());if(g.ck>1.12){g.why='burnt';return 'fail';}},
 tap(g){if(g.fl>0||g.res)return;if(g.ck>=.68&&g.ck<=.95){g.n++;g.fl=.7;g.ck=0;snd&&snd(900+g.n*120,.1,'triangle',.14);if(g.n>=g.need)g.res='win';}else{g.why=g.ck<.68?'raw':'burnt';g.res='fail';}},
 draw(g){const x=SW/2,y=SH*.58,r=Math.min(SW*.3,120);C.fillStyle='#2a2a2a';C.save();C.translate(x+r*.9,y+r*.1);C.rotate(.15);rrect(0,-12,r*1.1,24,10);C.fill();ink();C.restore();blob(x,y,r,r*.62,'#3a3a44',5);blob(x,y-4,r*.86,r*.5,'#24242c',2);
  const k=g.ck,col=k<.68?mix('#f7e7c0','#e8b860',k/.68):k<.95?mix('#e8b860','#c97a1f',(k-.68)/.27):mix('#c97a1f','#3a2410',Math.min(1,(k-.95)/.17)),hop=g.fl>0?Math.sin((1-g.fl/.7)*Math.PI)*r*1.2:0;
  C.save();C.translate(x,y-8-hop);C.scale(1,g.fl>0?Math.cos((1-g.fl/.7)*TAU):1);blob(0,0,r*.66,r*.38,col,4);if(k>.68&&k<.95&&!g.fl){C.fillStyle='rgba(255,255,255,.35)';C.beginPath();C.ellipse(-r*.2,-r*.1,r*.2,r*.07,0,0,TAU);C.fill();}C.restore();
  if(k>.95)for(let i=0;i<3;i++){const ph=(T*.8+i*.33)%1;C.fillStyle=`rgba(80,80,80,${.6*(1-ph)})`;C.beginPath();C.arc(x-20+i*20,y-30-ph*90,10+ph*14,0,TAU);C.fill();}
  const mw=Math.min(SW-60,280),my=SH*.82;C.fillStyle='#fff';rrect(x-mw/2-4,my-4,mw+8,26,13);C.fill();ink(3);C.fillStyle='#f7e7c0';rrect(x-mw/2,my,mw,18,9);C.fill();C.fillStyle='#2bb673';C.fillRect(x-mw/2+mw*.68/1.12,my,mw*.27/1.12,18);C.fillStyle=OL;C.fillRect(x-mw/2+mw*Math.min(1,k/1.12)-3,my-6,6,30);
  bigText('FLIPS '+g.n+' / '+g.need,SW/2,SH*.17,30,'#fff',0);}};
function mix(a,b,t){const p=h=>[1,3,5].map(i=>parseInt(h.slice(i,i+2),16)),A=p(a),B=p(b);return 'rgb('+A.map((v,i)=>Math.round(v+(B[i]-v)*t)).join(',')+')';}
const ORDER=['run','stack','pour','rush','catch','tip','wipe','order','tray','flip'];
// ---------- flow ----------
let cur=null,gs=null,dur=0,left=0,bag=[];
function nextGame(){if(!bag.length){bag=ORDER.slice();for(let i=bag.length-1;i>0;i--){const j=R()*(i+1)|0;[bag[i],bag[j]]=[bag[j],bag[i]];}if(bag[0]===run.last)bag.push(bag.shift());}
 const dq=new URLSearchParams(location.search).get('g'),k=dq&&G[dq]?dq:bag.shift();run.last=k;cur=G[k];S.seen=S.seen||{};gs={k,tut:!S.seen[k]};cur.init(gs);dur=cl(cur.dur/Math.sqrt(rate())*(gs.tut?1.35:1),5,15);left=dur;}
function intro(){run.round++;nextGame();phase='intro';phT=0;run.roast=run.round===1?(run.mode==='vs'?"Chef-Bot vs you. Loser washes dishes.":run.mode==='daily'?"Daily Shift. Same orders for everyone. Don't embarrass me.":"Shift Mode. Every order gets faster."):pk(ROAST.intro);}
function resolve(res){phase='result';phT=0;flash=res;const pace=rate();
 if(gs.tut){S.seen[gs.k]=1;save();}
 if(res==='win'){run.streak++;const pts=Math.round((100*pace+left*25)*Math.min(2,1+run.streak*.1));run.score+=pts;run.cleared++;run.pts='+'+pts;[523,659,784].forEach((f,i)=>setTimeout(()=>snd&&snd(f,.12,'triangle',.14),i*70));buzz&&buzz(20);run.line=pk(ROAST.win);}
 else{run.streak=0;run.lives--;run.pts='-1 ❤';noise&&noise(.3,.35);snd&&snd(180,.4,'sawtooth',.12,60);buzz&&buzz([60,30,60]);run.line=pk(ROAST.fail[gs.k]);}
 if(run.mode==='vs'&&run.botLives>0){const d={easy:[.8,.12],normal:[.9,.08],hard:[.97,.05]}[run.diff];const ok=Math.random()<cl(d[0]-(pace-1)*d[1],.35,.99);run.botRes=ok;if(ok)run.botScore+=Math.round(100*pace+Math.random()*dur*20);else run.botLives--;}}
function after(){if(run.lives<=0||(run.mode==='vs'&&run.botLives<=0))return endRun();intro();}
// ---------- loop ----------
let lastT=performance.now();
function frame(now){const dt=Math.min(.033,(now-lastT)/1000);lastT=now;if(phase==='off')return;T+=dt;phT+=dt;
 if(phase==='intro'){if(!gs.tut&&phT>Math.max(2,3/rate()))phase='play',phT=0;}
 else if(phase==='play'){left-=dt;let r=cur.upd(gs,dt)||gs.res;if(!r&&left<=0)r=cur.endWin?'win':'fail';if(r)resolve(r);}
 else if(phase==='result'){if(phT>(run.mode==='vs'?1.9:1.5))after();}
 render();requestAnimationFrame(frame);}
function hearts(x,y,n,c){for(let i=0;i<3;i++){C.font='24px system-ui';C.textAlign='left';C.globalAlpha=i<n?1:.25;C.fillText(c,x+i*26,y);}C.globalAlpha=1;}
function render(){const c=cur?cur.c:['#ff5a3c','#ff8a6a'];C.clearRect(0,0,SW,SH);
 if(phase==='intro'){bg('#ffd23f','#ffb000');const s=Math.min(SW,SH)*.16,pop=Math.min(1,phT*5);C.save();C.translate(SW/2,SH*.3);C.scale(pop,pop);manager(0,0,s,'mad');C.restore();
  C.fillStyle='#fff';const bw=Math.min(SW-30,360);rrect(SW/2-bw/2,SH*.47,bw,70,18);C.fill();ink();C.fillStyle=OL;C.font='700 16px system-ui';C.textAlign='center';C.textBaseline='middle';wrap(run.roast,SW/2,SH*.47+35,bw-24,20);
  bigText(cur.name,SW/2,SH*.66,Math.min(48,SW*.11),'#fff',-.06+Math.sin(T*8)*.02);bigText(cur.hint,SW/2,SH*.75,Math.min(22,SW*.055),'#ffd23f',0);demo(gs.k,SW/2,SH*.88);bigText(gs.tut?'FIRST TIME: PRACTICE SPEED':'ROUND '+run.round+' · SPEED x'+rate().toFixed(2),SW/2,SH*.81,15,'#fff',0);if(gs.tut||phT>.5){C.globalAlpha=.6+.4*Math.sin(T*6);bigText('TAP TO START',SW/2,SH*.95,20,'#fff',0);C.globalAlpha=1;}}
 else{bg(c[0],c[1]);cur.draw(gs);
  if(phase==='play'&&(gs.tut||phT<2.5)){C.globalAlpha=gs.tut?1:cl((2.5-phT)*2,0,1);C.fillStyle='rgba(26,18,32,.8)';const hw=Math.min(SW-24,340);rrect(SW/2-hw/2,SH-58,hw,40,20);C.fill();C.fillStyle='#ffd23f';C.font='900 16px system-ui';C.textAlign='center';C.textBaseline='middle';C.fillText(cur.hint,SW/2,SH-38);C.globalAlpha=1;}
  // timer bar + hud
  const f=cl(left/dur,0,1);C.fillStyle='#fff';rrect(14,14,SW-28,22,11);C.fill();ink(3);C.fillStyle=f>.3?'#2bb673':'#ff3b30';rrect(17,17,(SW-34)*f,16,8);C.fill();
  C.fillStyle=OL;C.font='900 18px system-ui';C.textAlign='left';C.textBaseline='alphabetic';hearts(16,64,run.lives,'❤️');C.textAlign='right';C.fillStyle='#fff';C.strokeStyle=OL;C.lineWidth=5;C.strokeText(run.score+'',SW-16,62);C.fillText(run.score+'',SW-16,62);
  if(run.mode==='vs'){C.font='900 13px system-ui';C.textAlign='right';C.strokeText('CHEF-BOT '+run.botScore,SW-16,84);C.fillText('CHEF-BOT '+run.botScore,SW-16,84);hearts(SW-96,106,run.botLives,'💙');}
  if(phase==='result'){C.fillStyle='rgba(26,18,32,.45)';C.fillRect(0,0,SW,SH);const sc2=1+Math.max(0,.15-phT)*1.5;C.save();C.translate(SW/2,SH*.42);C.scale(sc2,sc2);bigText(flash==='win'?'NAILED IT!':'SPILLED!',0,0,Math.min(64,SW*.15),flash==='win'?'#7cff6b':'#ff5a3c');C.restore();bigText(run.pts,SW/2,SH*.52,30,'#fff',0);
   C.fillStyle='#fff';const bw=Math.min(SW-30,340);rrect(SW/2-bw/2,SH*.58,bw,52,14);C.fill();ink(3);C.fillStyle=OL;C.font='700 15px system-ui';C.textAlign='center';C.textBaseline='middle';wrap('"'+run.line+'"',SW/2,SH*.58+26,bw-20,18);
   if(run.mode==='vs'&&run.botRes!==null){bot(SW/2,SH*.8,40,run.botRes?'happy':'sad');bigText(run.botRes?'BOT: ✓':'BOT: ✗',SW/2,SH*.9,22,run.botRes?'#7cff6b':'#ff5a3c',0);}}}}
function demo(k,x,y){const drag=k==='run'||k==='catch'||k==='wipe'||k==='tray',hold=k==='pour',ph=T*2.2;let fx=x,fy=y,pr=0;
 if(drag)fx=x+Math.sin(ph)*70;else if(hold){pr=Math.sin(ph)>0;}else{pr=(ph%1.4)<.3;fx=x+(k==='stack'?0:Math.sin(Math.floor(ph/1.4)*2.3)*60);}
 C.fillStyle='rgba(26,18,32,.55)';rrect(x-110,y-28,220,46,23);C.fill();if(drag){C.fillStyle='#fff';C.font='900 18px system-ui';C.textAlign='center';C.textBaseline='middle';C.fillText('◀    ▶',x,y-5);}
 if(pr){C.strokeStyle='#ffd23f';C.lineWidth=4;C.beginPath();C.arc(fx,y-8,20,0,TAU);C.stroke();}C.font='34px system-ui';C.textAlign='center';C.textBaseline='middle';C.fillText('👆',fx+4,fy+6+(pr?4:0));}
function wrap(t,x,y,w,lh){const ws=t.split(' '),L=[];let l='';for(const s of ws){const tt=l?l+' '+s:s;if(C.measureText(tt).width>w&&l){L.push(l);l=s;}else l=tt;}L.push(l);L.forEach((s,i)=>C.fillText(s,x,y+(i-(L.length-1)/2)*lh));}
// ---------- input ----------
const pos=e=>{const r=sc.getBoundingClientRect();return[e.clientX-r.left,e.clientY-r.top];};
sc.addEventListener('pointerdown',e=>{[ptr.x,ptr.y]=pos(e);ptr.down=1;if(phase==='intro'&&phT>.5){phase='play';phT=0;return;}if(phase==='play'&&cur.tap)cur.tap(gs,ptr.x,ptr.y);});
sc.addEventListener('pointermove',e=>{[ptr.x,ptr.y]=pos(e);});
addEventListener('pointerup',()=>ptr.down=0);addEventListener('pointercancel',()=>ptr.down=0);
addEventListener('keydown',e=>{if(phase==='play'&&e.code==='Space'){ptr.down=1;ptr.x=SW/2;ptr.y=SH/2;cur.tap&&cur.tap(gs,SW/2,SH/2);}});addEventListener('keyup',e=>{if(e.code==='Space')ptr.down=0;});
// ---------- UI ----------
const css=document.createElement('style');css.textContent=`.mbtn{width:100%;max-width:340px;font-size:20px}.pv{display:block}@media (max-height:720px){.pv{display:none}}.lbrow{display:flex;justify-content:space-between;padding:4px;border-bottom:1px solid rgba(255,255,255,.1);font-weight:700}.lbrow.me{color:#ffd23f}.tabs{display:flex;gap:8px}.tabs button{font-size:15px;padding:10px 18px;margin:0}.tabs button.off{background:#3a2a48;box-shadow:0 6px 0 #1e1428}@media (max-height:700px){#beatBanner{padding:6px 10px!important;font-size:13px}#beatBanner button{padding:6px 18px!important;margin-top:4px!important}}#beatBanner{background:#ff4fa3;border-radius:14px;padding:10px 14px;font-weight:900;max-width:340px;width:100%;box-sizing:border-box}#sOv.endbg,#over{background:radial-gradient(circle at 50% 22%,#6a2d96 0,#2a1440 45%,#160c1e 100%)!important}
.endbox{display:flex;flex-direction:column;align-items:center;gap:clamp(5px,1.1vh,10px);width:100%;max-width:350px}
.stamp{font:900 clamp(20px,3.6vh,28px) system-ui;color:#fff;background:#ff5a3c;padding:6px 18px;border-radius:12px;transform:rotate(-3deg);box-shadow:0 5px 0 #a8321e;border:3px solid #1a1220}.stamp.ok{background:#2bb673;box-shadow:0 5px 0 #1a7a4c}
.bub{background:#fff;color:#1a1220;font:700 14px system-ui;padding:8px 12px;border-radius:14px;border:3px solid #1a1220;position:relative;max-width:300px}
.scard{background:#fff8e6;color:#1a1220;border:4px solid #1a1220;border-radius:20px;padding:6px 14px 10px;width:100%;box-sizing:border-box;box-shadow:0 6px 0 rgba(0,0,0,.35)}
.slbl{font:900 12px system-ui;letter-spacing:3px;color:#b3361f}.sbig{font:900 clamp(40px,8vh,62px) system-ui;line-height:1;color:#1a1220}
.chips{display:flex;gap:6px;justify-content:center;flex-wrap:wrap;margin-top:6px}.chips span{background:#1a1220;color:#ffd23f;font:800 12px system-ui;padding:4px 9px;border-radius:999px}
.rew{color:#7cff6b;font-size:14px;display:flex;flex-wrap:wrap;gap:5px;justify-content:center;align-items:center}.pill{background:rgba(124,255,107,.15);border:1px solid rgba(124,255,107,.4);border-radius:999px;padding:2px 8px;font-size:12px;font-weight:800}
.endbox button.wide{width:100%;margin:2px 0 0}.erow{display:flex;gap:8px;width:100%}.erow button{flex:1;margin:0;font-size:16px;padding:12px 6px}
#over{gap:clamp(5px,1.1vh,10px)}#over #oLbl{font:900 clamp(20px,3.6vh,28px) system-ui;color:#fff;background:#ff5a3c;padding:6px 18px;border-radius:12px;transform:rotate(-3deg);box-shadow:0 5px 0 #a8321e;border:3px solid #1a1220;letter-spacing:0}
#over #tips{background:#fff8e6;color:#1a1220;border:4px solid #1a1220;border-radius:20px;padding:4px 30px;font-size:clamp(40px,8vh,60px);box-shadow:0 6px 0 rgba(0,0,0,.35)}#over #stats{font-size:13px}#over .quote{background:#fff;color:#1a1220;font-style:normal;font-weight:700;font-size:14px;padding:8px 12px;border-radius:14px;border:3px solid #1a1220}#over #earned{font-size:13px;line-height:1.35}#over #again{width:100%;max-width:340px}#over .row{width:100%;max-width:340px;flex-wrap:nowrap}#over .row button{flex:1;margin:0;font-size:16px;padding:12px 6px}
input.nm{font:800 20px system-ui;padding:12px 16px;border-radius:14px;border:3px solid #ffd23f;background:#2a1a34;color:#fff;text-align:center;width:220px}`;document.head.appendChild(css);
const mk=h=>{const d=document.createElement('div');d.innerHTML=h.trim();return d.firstChild;};
const start=$('start'),firstRow=start.querySelector('.row');
const modes=mk(`<div style="display:flex;flex-direction:column;gap:12px;align-items:center;width:100%"><div id="beatBanner" class="hidden"></div><button class="mbtn" id="smBtn" style="background:#ffd23f;color:#1a1220;box-shadow:0 6px 0 #b38a00;font-size:24px">⚡ SHIFT MODE</button><div class="row" style="width:100%;max-width:340px;flex-wrap:nowrap"><button class="ghost" id="dailyBtn" style="flex:1;margin:0;padding:13px 8px">📅 DAILY</button><button class="ghost" id="vsBtn" style="flex:1;margin:0;padding:13px 8px">🤖 VS BOT</button><button class="ghost" id="lbBtn" style="flex:1;margin:0;padding:13px 8px">🏆 TOP</button></div></div>`);
start.insertBefore(modes,firstRow);
const ov=mk(`<div id="sOv" class="ov scroll hidden" style="z-index:6;justify-content:center;background:rgba(20,10,25,.985)"></div>`);document.body.appendChild(ov);
function show(html){ov.classList.remove('endbg');ov.innerHTML=html;ov.classList.remove('hidden');}
function hide(){ov.classList.add('hidden');ov.classList.remove('endbg');}
const goMenu=()=>{hide();sc.style.display='none';phase='off';state='menu';renderMenu();start.classList.remove('hidden');};
function launch(mode,diff){try{AC=AC||new(window.AudioContext||window.webkitAudioContext)();AC.resume&&AC.resume();}catch(e){}
 hide();start.classList.add('hidden');state='shift';sc.style.display='block';rs();newRun(mode,diff);bag=[];intro();lastT=performance.now();requestAnimationFrame(frame);}
function howTo(go){if(S.smTut)return go();show(`<div class="lbl">HOW SHIFT MODE WORKS</div><h1 style="font-size:36px">QUICK<br>ORDERS</h1><div class="card" style="font-size:16px;line-height:1.5">⚡ Short mini-games, one after another<br>📋 Each one shows what to do before it starts<br>✅ Win = points &nbsp; ❌ Fail = lose a ❤️<br>❤️❤️❤️ 3 lives · it slowly speeds up<br>🐢 First time on each game = practice speed</div><button id="htGo">GOT IT</button>`);$('htGo').onclick=()=>{S.smTut=1;save();go();};}
$('smBtn').onclick=()=>howTo(()=>launch('shift'));
$('dailyBtn').onclick=()=>{const d=dayKey(),done=S.dailyDay===d;show(`<div class="lbl">📅 DAILY SHIFT</div><h1 style="font-size:40px">${d}</h1><p>Same orders, same speed, for everyone today. Your best run goes on the daily board.</p>${done?`<p style="color:#7cff6b;font-weight:800">Today's best: ${S.dailyBest||0}</p>`:''}<button id="dGo">CLOCK IN</button><button class="ghost" id="dBack">BACK</button>`);$('dGo').onclick=()=>howTo(()=>launch('daily'));$('dBack').onclick=hide;};
$('vsBtn').onclick=()=>{show(`<div class="lbl">🤖 VS CHEF-BOT</div><canvas id="botPv" class="pv" width="140" height="130"></canvas><p>Same orders, head to head. First one out of lives loses. Pick how mean the robot is.</p><button data-d="easy" style="background:#2bb673;box-shadow:0 6px 0 #1a7a4c">EASY</button><button data-d="normal">NORMAL</button><button data-d="hard" style="background:#6a1fb3;box-shadow:0 6px 0 #3d1068">HARD</button><button class="ghost" id="vBack">BACK</button>`);
 drawPv($('botPv'),()=>bot(70,80,42,'happy'));
 ov.querySelectorAll('[data-d]').forEach(b=>b.onclick=()=>howTo(()=>launch('vs',b.dataset.d)));$('vBack').onclick=hide;};
// ---------- end of run ----------
function endRun(){phase='off';const r=run,prev={rank:S.rank};
 const coins=Math.floor(r.score/15)+(r.mode==='vs'&&r.lives>0?150:0),xp=r.cleared*10+(r.mode==='vs'&&r.lives>0?40:0);S.coins+=coins;S.xp+=xp;const L=['+$'+coins+' to your wallet · +'+xp+' XP'];
 while(S.rank<RANKS.length&&S.xp>=xpNeed(S.rank)){S.xp-=xpNeed(S.rank);S.rank++;L.push('⭐ RANK UP: '+RANKS[S.rank-1].n+'!');}
 S.smBest=S.smBest||0;let nb=0;if(r.mode!=='vs'&&r.score>S.smBest){S.smBest=r.score;nb=1;}
 if(r.mode==='daily'){const d=dayKey();if(S.dailyDay!==d){S.dailyDay=d;S.dailyBest=0;}if(r.score>S.dailyBest){S.dailyBest=r.score;L.push('New daily best!');}}
 if(nb)L.push('NEW SHIFT MODE BEST!');if(S.beatTarget){L.push(r.score>S.beatTarget?'🎯 CHALLENGE BEATEN by '+(r.score-S.beatTarget)+'!':'🎯 Short of the challenge by '+(S.beatTarget-r.score));S.beatTarget=0;}save();
 let head='SHIFT OVER',win=0,chips=[`✅ ${r.cleared} orders`,`⚡ x${rate().toFixed(2)}`];if(r.mode==='vs'){win=r.lives>0||(r.botLives<=0&&r.score>=r.botScore);head=win?'YOU BEAT CHEF-BOT!':'CHEF-BOT WINS';chips=[`You ${r.score}`,`Bot ${r.botScore}`];}else chips.push(`🏆 Best ${S.smBest}`);
 const rew=`<b>+$${coins}</b> · <b>+${xp} XP</b>`+L.slice(1).map(x=>`<span class="pill">${x}</span>`).join('');
 show(`<div class="endbox"><div class="stamp ${win?'ok':''}">${head}</div><canvas id="endPv"></canvas><div class="bub">"${pk(ROAST.over)}"</div>
 <div class="scard"><div class="slbl">SCORE</div><div class="sbig">${r.score}</div><div class="chips">${chips.map(c=>`<span>${c}</span>`).join('')}</div></div>
 <div class="rew">${rew}</div>${r.mode!=='vs'?`<div id="subBox" style="width:100%"></div>`:''}
 <button id="eAgain" class="wide">${r.mode==='vs'?'REMATCH':'CLOCK BACK IN'}</button><div class="erow"><button class="ghost" id="eShare">🔗 CHALLENGE</button><button class="ghost" id="eMenu">🏠 MENU</button></div></div>`);ov.classList.add('endbg');
 const hh=cl(SH*.16,70,140);drawPv($('endPv'),()=>r.mode==='vs'&&!win?bot(hh*.6,hh*.62,hh*.36,'happy'):manager(hh*.6,hh*.42,hh*.34,win?'happy':'mad'),hh*1.2,hh);
 $('eAgain').onclick=()=>launch(r.mode,r.diff);$('eMenu').onclick=goMenu;$('eShare').onclick=()=>shareScore(r);
 if(r.mode!=='vs')subUI(r);sc.style.display='none';}
function drawPv(cv2,fn,w=140,h=120){const d=Math.min(devicePixelRatio||1,2);cv2.width=w*d;cv2.height=h*d;cv2.style.width=w+'px';cv2.style.height=h+'px';const sv=C;C=cv2.getContext('2d');C.scale(d,d);try{fn();}finally{C=sv;}}
// ---------- leaderboard ----------
const API='/api/scores';
function localLB(board){S.lb=S.lb||{};return S.lb[board]||[];}
function localAdd(board,e){S.lb=S.lb||{};const a=(S.lb[board]||[]).concat(e).sort((a,b)=>b.score-a.score).slice(0,20);S.lb[board]=a;save();}
async function fetchLB(board){try{const r=await fetch(API+'?board='+board+'&day='+dayKey(),{cache:'no-store'});if(!r.ok)throw 0;const j=await r.json();return{list:j.list||[],online:1};}catch(e){return{list:localLB(board==='daily'?'daily-'+dayKey():'all'),online:0};}}
async function submit(name,score,mode){const board=mode==='daily'?'daily':'all',e={name,score,day:dayKey()};localAdd(board==='daily'?'daily-'+dayKey():'all',e);try{const r=await fetch(API,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({board,name,score,day:dayKey(),v:sig(name,score)})});return r.ok;}catch(e){return false;}}
const sig=(n,s)=>{let h=2166136261;for(const c of n+'|'+s+'|ds')h=Math.imul(h^c.charCodeAt(0),16777619)>>>0;return h.toString(36);};
function subUI(r){const box=$('subBox');if(!box||r.score<=0)return;const nm=S.lbName||'';
 box.innerHTML=`<div style="display:flex;gap:8px;width:100%"><input class="nm" id="nmIn" maxlength="12" placeholder="YOUR NAME" value="${nm}" style="flex:1;min-width:0;width:auto;font-size:16px;padding:10px"><button id="subBtn" style="margin:0;font-size:15px;padding:10px 14px;background:#2bb673;box-shadow:0 5px 0 #1a7a4c">POST ${r.mode==='daily'?'DAILY':'SCORE'}</button></div><div id="subMsg" style="font-size:12px;min-height:14px;margin-top:4px"></div>`;
 $('subBtn').onclick=async()=>{const n=cleanName($('nmIn').value);if(!n){$('subMsg').textContent='Pick a different name (2–12 letters, keep it PG-13).';return;}S.lbName=n;save();$('subBtn').disabled=true;$('subMsg').textContent='Posting…';const ok=await submit(n,r.score,r.mode);$('subMsg').textContent=ok?'Posted! You\'re on the board.':'Saved on this phone. Online board is offline right now.';};}
async function openLB(tab='all'){show(`<div class="lbl">🏆 LEADERBOARD</div><div class="tabs"><button id="tAll" class="${tab==='all'?'':'off'}">ALL-TIME</button><button id="tDay" class="${tab==='daily'?'':'off'}">DAILY</button></div><div class="card" id="lbList">Loading…</div><button class="ghost" id="lbBack">BACK</button>`);
 $('tAll').onclick=()=>openLB('all');$('tDay').onclick=()=>openLB('daily');$('lbBack').onclick=hide;
 const {list,online}=await fetchLB(tab);const me=S.lbName;$('lbList').innerHTML=(list.length?list.slice(0,10).map((e,i)=>`<div class="lbrow ${e.name===me?'me':''}"><span>${i<3?['🥇','🥈','🥉'][i]:i+1+'.'} ${esc(e.name)}</span><span>${e.score}</span></div>`).join(''):'<div style="opacity:.8">No scores yet. Be the first.</div>')+(online?'':'<div style="font-size:12px;opacity:.7;margin-top:8px">Showing scores saved on this phone.</div>');}
const esc=s=>String(s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
$('lbBtn').onclick=()=>openLB('all');
{const ov2=$('over'),cv3=document.createElement('canvas');ov2.insertBefore(cv3,ov2.firstChild);const so=window.showOver;window.showOver=function(){so();const h=cl(innerHeight*.14,60,120);drawPv(cv3,()=>manager(h*.6,h*.42,h*.34,lastWon?'happy':'mad'),h*1.2,h);};}
// ---------- beat my score ----------
async function shareScore(r){const n=S.lbName||'A friend',m=r.mode==='daily'?'daily':'shift',u=location.origin+location.pathname+'?beat='+r.score+'&by='+encodeURIComponent(n)+'&m='+m;
 const txt=r.mode==='vs'?`🍸 DON'T SPILL: I scored ${r.score} vs Chef-Bot. Your turn:`:`🍸 DON'T SPILL: I scored ${r.score} in ${m==='daily'?"today's Daily Shift":'Shift Mode'}. Beat my score:`;
 try{if(navigator.share){await navigator.share({title:"Don't Spill",text:txt,url:u});return;}await navigator.clipboard.writeText(txt+' '+u);$('eShare').textContent='LINK COPIED!';}catch(e){}}
{const q=new URLSearchParams(location.search),b=+q.get('beat');if(b>0){const by=cleanName(q.get('by'))||'A friend',m=q.get('m')==='daily'?'daily':'shift';const bb=$('beatBanner');bb.innerHTML=`🎯 ${esc(by)} scored ${b} in ${m==='daily'?'the Daily Shift':'Shift Mode'}. Think you can beat it?<br><button id="beatGo" style="margin-top:8px;font-size:18px;padding:10px 24px">TAKE THE CHALLENGE</button>`;bb.classList.remove('hidden');$('beatGo').onclick=()=>{S.beatTarget=b;launch(m==='daily'?'daily':'shift');};}}
})();
