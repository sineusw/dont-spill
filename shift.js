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
function bg(c1,c2){const g=C.createLinearGradient(0,0,0,SH);g.addColorStop(0,c2);g.addColorStop(1,c1);C.fillStyle=g;C.globalAlpha=.8;C.fillRect(0,0,SW,SH);C.globalAlpha=1;C.fillStyle='rgba(255,255,255,.07)';for(let i=-SH;i<SW;i+=56){C.beginPath();C.moveTo(i,0);C.lineTo(i+22,0);C.lineTo(i+22+SH*.5,SH);C.lineTo(i+SH*.5,SH);C.fill();}}
// ---------- lines ----------
const ROAST={
 intro:["Faster. The kitchen's watching.","Table 7 has a coupon. Pray for us.","I've seen sloths serve faster.","Don't. Mess. This. Up.","You call that hustle?","Move like rent is due. Because it is.","Table 4 wants to 'speak to the manager.' That's me. I'm hiding.","A guy just asked if the soup of the day is 'vegan-adjacent.'","Someone ordered a water with no ice, no water. Figure it out.","Table 9 is splitting a \$12 check 6 ways. Good luck.","The Yelp reviewer is here. Smile like you're paid well.","That kid is licking the menu. Not my problem. Yours.","The cook quit again. He'll be back in 10 minutes. He always is.","Somebody wants 'medium-well, but rare.' Make it happen.","Table 2 says their coffee is too hot. It's coffee.","Big party just walked in 5 minutes before close. Love that.","A lady wants the kids' menu. She's 64.","If anyone asks, the fish is fresh. Don't ask me how fresh.","Our health inspector is 'running late.' Hide the raccoon.","A man is drying his socks under the hand dryer. Ignore him.","Table 6 asked for 'just a little' more bread. Fourth basket.","They tipped in Chuck E. Cheese tokens again. Serve faster.","Someone asked if the decaf is decaf. I don't know. Nobody knows.","Guy at the bar says he 'used to be a chef.' Don't make eye contact.","Influencer at table 3 wants the food 'in better lighting.'","Remember: the customer is always right. Unless they're wrong. Usually.","We ran out of ketchup. Act surprised.","Someone sent back the ice water for being 'too cold.'","Birthday table. If I hear that song one more time, I quit.","Table 8 wants separate checks. They're one person."],
 win:["Fine. That was adequate.","Don't let it go to your head.","Okay, who are you and what did you do with the old you?","Look at you. Barely competent.","The customers didn't cry. Progress.","Wow. I'd give you a raise, but no.","Table 5 smiled. I didn't know they could do that.","Nice. Employee of the Month is still my cousin, though.","Not bad. The dishwasher is jealous.","You did it. Now do it again. Forever.","Even the cook nodded. He never nods.","Okay, okay. Take a 30-second break. Starting... now. Over.","That was so clean I almost felt something.","The Yelp reviewer gave us 3 stars. That's a record."],
 fail:{wind:["The wind took it. And your dignity."],vip:["The VIP left. And took their friends."],swat:["The fly ate better than our customers."],sort:["Cups in the plate bin. Dishwasher is crying."],ketchup:["Ketchup on the FLOOR. Again."],bell:["Wrong time! The chef threw a spoon."],count:["Can't count? Great for a waiter."],sushi:["That was not the order. At all."],pizza:["Those aren't slices, those are crimes."],memory:["You forgot the order. Write it down!"],shake:["That shake is still ice cubes."],swipe:["Wrong way! That check went in the trash."],wipe:["Still sticky. Customers noticed.","You smeared it. Artistically."],order:["They asked for fries. You brought ice cream.","Wrong order. Table 3 is posting about us."],tray:["The drink slid off. Physics is undefeated.","Steady hands? More like spaghetti hands."],flip:["Burnt. Smoke alarm says hi.","That pancake had potential."],run:["You hit a CHILD. With soup.","The floor is not a table."],stack:["That's not a stack. That's modern art.","Gravity: 1. You: 0."],pour:["Half foam. Half shame.","I asked for a drink, not a flood."],rush:["Table 4 left. With the silverware.","They waited. You forgot."],catch:["Butterfingers. Literal butter.","That glass had a family."],tip:["You tipped yourself an IOU. Genius.","That was a cockroach. You grabbed a cockroach."]},
 over:["You're fired. Come back tomorrow.","Clean that up before the dinner rush.","I'm putting you on dish duty. Forever.","That's coming out of your paycheck.","I've seen better service at a gas station sushi bar.","You're fired. Also, can you close tonight?","Go home. Actually, finish your side work first.","That's going in your file. Your file is a box now.","The raccoon out back works harder than you.","Clock out. And take the mop with you. It misses you."],
 botWin:["Chef-Bot nailed it. Show off.","The robot's making you look bad."],botFail:["Chef-Bot dropped it! Even robots crack.","Chef-Bot.exe has stopped working."]};
// ---------- state ----------
let T=0,run=null,ptr={x:0,y:0,down:0},phase='off',phT=0,flash='';
const G={};
const rate=()=>run?Math.min(2.2,1+(run.round-1)*.05):1;
const perks=()=>{if(!run||['daily','ch','duo'].includes(run.mode))return{lives:3,bar:0,save:0,host:1,decor:1};const t=S.tab;return{lives:3+(t.waiter>=1)+(t.waiter>=3),bar:t.bartender,save:(t.busboy>=1)+(t.busboy>=4),host:1+.1*t.host,decor:1+.05*S.decor.length};};
const UNLOCK=[['run','stack','pour','catch','tip','order','flip','sort'],['swat','bell','wipe'],['shake','sushi','count'],['rush','tray'],['ketchup','memory'],['pizza','swipe']];
const stN=()=>window.dsStars?window.dsStars():0;
window.dsGameCount=()=>UNLOCK.slice(0,stN()+1).flat().length+(S.rooms&&S.rooms.patio.own?1:0)+(S.rooms&&S.rooms.vip.own?1:0);
function pool(){if(['daily','ch','duo'].includes(run.mode))return UNLOCK.flat();const a=UNLOCK.slice(0,Math.max(stN(),S.bestStars||0)+1).flat();if(window.dsCity)for(const k of dsCity().games){a.push(k);a.push(k);}if(S.rooms&&S.rooms.patio.own)a.push('wind');if(S.rooms&&S.rooms.vip.own)a.push('vip');return a;}
const sp=()=>rate()*(gs&&gs.tut?.7:1)*(gs&&['pour','stack','shake'].includes(gs.k)?Math.max(.7,1-.06*perks().bar):1);
function newRun(mode,diff,seed){R=mode==='daily'?mulberry([...dayKey()].reduce((h,c)=>h*31+c.charCodeAt(0)>>>0,7)):mode==='ch'?mulberry(seed):Math.random;FOOD=(S.city&&S.city!=='nash'&&window.dsCityFood)?dsCityFood():(FOODS[thm()]||FOODS.diner);
 run={mode,diff,round:0,lives:3,score:0,streak:0,last:'',botLives:0,botScore:0,botRes:null,won:0,cleared:0};const pk2=perks();run.lives=run.max=pk2.lives;run.saves=pk2.save;if(mode==='vs'){run.botLives=run.lives;run.ai=pk(AIS);}if(mode==='ch')run.seed=seed;if(mode==='duo')run.duo={turn:0,lives:[3,3],score:[0,0],last:[null,null]};}
const AIS=[{n:'Maya',e:'👩‍🍳'},{n:'Big Tony',e:'🧔'},{n:'Kenji',e:'👨‍🍳'},{n:'Rosa',e:'👵'},{n:'DJ Spatula',e:'🧑‍🎤'},{n:'Chef-Bot',e:'🤖'}];
const TAUNT={start:['let\'s go 🔥','you\'re going down','warmed up 😤','this one\'s mine'],win:['ez 😎','too easy','did you see that?','clean 🧼'],lose:['nooo 😩','my hand slipped','lag!!','ugh 🙄'],gg:['gg','not bad 👀','okay okay','lucky…']};
// ---------- mini-games ----------
// each: name, hint, dur(base secs), endWin (survive = win), init, upd(dt)->'win'|'fail'|undefined, draw, tap(x,y)
G.run={name:'DELIVERY RUN',hint:'DRAG to dodge the chaos!',dur:9,endWin:1,c:['#ff8a3d','#ffb35c'],
 init(g){g.x=SW/2;g.ob=[];g.sp=0;},
 upd(g,dt){if(ptr.down)g.x+=(cl(ptr.x,40,SW-40)-g.x)*Math.min(1,dt*14);g.sp-=dt;if(g.sp<=0){g.sp=rr2(.65,1.05)/sp();const k=R()<.5?'kid':'table';g.ob.push({k,x:rr2(40,SW-40),y:-60,vx:k==='kid'?rr2(-90,90):0,c:pk(['#2fd3ff','#ff4fa3','#7cff6b','#ffd23f'])});}
  const py=SH*.8;for(const o of g.ob){o.y+=(170+100*sp())*dt;o.x+=o.vx*dt;if(o.x<30||o.x>SW-30)o.vx*=-1;if(!o.h&&Math.abs(o.y-py)<46&&Math.abs(o.x-g.x)<(o.k==='table'?62:42)){o.h=1;return 'fail';}}g.ob=g.ob.filter(o=>o.y<SH+80);},
 draw(g){C.fillStyle='rgba(255,255,255,.18)';for(let y=(T*300*sp())%80-80;y<SH;y+=80)C.fillRect(SW/2-6,y,12,40);for(const o of g.ob)o.k==='kid'?kidS(o.x,o.y,30,o.c):cTable(o.x,o.y,52);const py=SH*.8;waiter(g.x,py-10,40,'scared',(ptr.x-g.x)*.0015);for(let i=0;i<3;i++)cGlass(g.x+28,py-70-i*24,22,['#c0213a','#f2a516','#7ee0ff'][i],.75);}};
G.stack={name:'STACK THE GLASSES',hint:'TAP to drop!',dur:12,c:['#2fd3ff','#7ee0ff'],
 init(g){g.need=4+Math.min(3,run.round/4|0);g.st=[SW/2];g.drop=null;g.ph=0;g.minT=3+g.need*1.35;},
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
  C.fillStyle='rgba(43,182,115,.35)';C.fillRect(-s,-s*1.6*g.hi,s*2,s*1.6*(g.hi-g.lo));C.fillStyle=POURC();C.fillRect(-s,-s*1.6*g.lv,s*2,s*1.6*g.lv);C.fillStyle='#fff8e0';C.fillRect(-s,-s*1.6*g.lv,s*2,10);C.restore();
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
 upd(g,dt){if(ptr.down)g.tx=cl(ptr.x,50,SW-50);if(g.tx!=null)g.x+=(g.tx-g.x)*Math.min(1,dt*22);g.sp-=dt;if(g.sp<=0){g.sp=rr2(1,1.5)/sp();const L=R()<.5,tx=rr2(60,SW-60),ty=SH*.78,x=L?-20:SW+20,y=SH*rr2(.3,.5),tt=rr2(1.5,1.9)/Math.sqrt(sp()),gv=900;g.gl.push({x,y,vx:(tx-x)/tt,vy:(ty-y-.5*gv*tt*tt)/tt,gv,r:0,c:pk(['#c0213a','#f2a516','#7ee0ff','#ff7ab8'])});}
  const ty=SH*.78;for(const o of g.gl){o.vy+=o.gv*dt;o.x+=o.vx*dt;o.y+=o.vy*dt;o.r+=dt*6;if(o.y>SH*.15){if(o.x<26){o.x=26;o.vx=Math.abs(o.vx)*.6;}if(o.x>SW-26){o.x=SW-26;o.vx=-Math.abs(o.vx)*.6;}}if(!o.d&&o.vy>0&&o.y>=ty-6){if(Math.abs(o.x-g.x)<72){o.d=1;g.n++;snd&&snd(1000+g.n*40,.08,'triangle',.12);}else{o.d=2;return 'fail';}}}g.gl=g.gl.filter(o=>o.d!==1&&o.y<SH+60);},
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
const FOODS={diner:['🍔','🍟','🥤','🍕','🍦','🌮','🍩','🥗'],sushi:['🍣','🍤','🍙','🥟','🍵','🍜','🍱','🍡'],steak:['🥩','🍷','🥔','🥗','🍞','🧀','🦞','🍰']};let FOOD=FOODS.diner;
const thm=()=>S.theme||'diner';
const THN={sushi:{pour:['POUR THE TEA'],flip:['FLIP THE TAMAGO','TAP when the egg turns GOLDEN!'],ketchup:['SOY SAUCE','HOLD when the roll is UNDER the bottle'],order:['WHICH ROLL?'],sushi:['CONVEYOR GRAB'],shake:['WHISK THE MATCHA','TAP FAST to whisk the matcha!'],stack:['STACK THE TEACUPS'],run:['RAMEN RUN']},
 steak:{pour:['POUR THE WINE'],flip:['SEAR THE STEAK','TAP when the steak is PERFECT!'],ketchup:['STEAK SAUCE','HOLD when the steak is UNDER the bottle'],sushi:['CARVING STATION'],shake:['SHAKE THE COCKTAIL','TAP FAST to shake it!'],stack:['STACK THE WINE GLASSES'],order:['WHAT DID THEY ORDER?']}};
const NM=k=>{const o=(THN[thm()]||{})[k]||[],g=G[k];return[o[0]||g.name,o[1]||g.hint];};
const POURC=()=>({sushi:'#8cc63f',steak:'#7a1f3a'})[thm()]||'#f2a516';
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
  const k=g.ck,pal=({steak:['#e86a7a','#b5452b','#7a2e1a'],sushi:['#fff6c0','#ffd23f','#e0a020']})[thm()]||['#f7e7c0','#e8b860','#c97a1f'],col=k<.68?mix(pal[0],pal[1],k/.68):k<.95?mix(pal[1],pal[2],(k-.68)/.27):mix(pal[2],'#3a2410',Math.min(1,(k-.95)/.17)),hop=g.fl>0?Math.sin((1-g.fl/.7)*Math.PI)*r*1.2:0;
  C.save();C.translate(x,y-8-hop);C.scale(1,g.fl>0?Math.cos((1-g.fl/.7)*TAU):1);blob(0,0,r*.66,r*.38,col,4);if(k>.68&&k<.95&&!g.fl){C.fillStyle='rgba(255,255,255,.35)';C.beginPath();C.ellipse(-r*.2,-r*.1,r*.2,r*.07,0,0,TAU);C.fill();}C.restore();
  if(k>.95)for(let i=0;i<3;i++){const ph=(T*.8+i*.33)%1;C.fillStyle=`rgba(80,80,80,${.6*(1-ph)})`;C.beginPath();C.arc(x-20+i*20,y-30-ph*90,10+ph*14,0,TAU);C.fill();}
  const mw=Math.min(SW-60,280),my=SH*.82;C.fillStyle='#fff';rrect(x-mw/2-4,my-4,mw+8,26,13);C.fill();ink(3);C.fillStyle='#f7e7c0';rrect(x-mw/2,my,mw,18,9);C.fill();C.fillStyle='#2bb673';C.fillRect(x-mw/2+mw*.68/1.12,my,mw*.27/1.12,18);C.fillStyle=OL;C.fillRect(x-mw/2+mw*Math.min(1,k/1.12)-3,my-6,6,30);
  bigText('FLIPS '+g.n+' / '+g.need,SW/2,SH*.17,30,'#fff',0);}};
function mix(a,b,t){const p=h=>[1,3,5].map(i=>parseInt(h.slice(i,i+2),16)),A=p(a),B=p(b);return 'rgb('+A.map((v,i)=>Math.round(v+(B[i]-v)*t)).join(',')+')';}
const shuf=a=>{for(let i=a.length-1;i>0;i--){const j=R()*(i+1)|0;[a[i],a[j]]=[a[j],a[i]];}return a;};
function emo(e,x,y,sz){C.font=sz+'px system-ui';C.textAlign='center';C.textBaseline='middle';C.fillText(e,x,y);}
function plate(x,y,r,c='#fff'){blob(x,y+5,r*1.04,r*.48,'rgba(0,0,0,.2)',0);blob(x,y,r,r*.88,c,4);blob(x,y,r*.72,r*.62,'#eef2f6',2);}
G.swat={name:'SWAT THE FLY',hint:'TAP the fly before it lands on the cake!',dur:9,c:['#3fbf7f','#c8f7dc'],
 init(g){g.n=0;g.need=3;g.f={x:SW/2,y:SH*.3,tx:SW/2,ty:SH*.3,t:0};g.sw=0;},
 upd(g,dt){const f=g.f;f.t-=dt;if(f.t<=0){f.tx=rr2(50,SW-50);f.ty=rr2(SH*.2,SH*.62);f.t=rr2(.45,.8)/sp();}const k=Math.min(1,dt*4*sp());f.x+=(f.tx-f.x)*k;f.y+=(f.ty-f.y)*k;g.sw=Math.max(0,g.sw-dt);},
 tap(g,x,y){g.sw=.15;g.swx=x;g.swy=y;if(Math.hypot(x-g.f.x,y-g.f.y)<50){g.n++;snd&&snd(300,.12,'square',.14,120);if(g.n>=g.need)g.res='win';else{g.f.x=x<SW/2?SW-40:40;g.f.y=SH*.25;g.f.t=0;}}},
 draw(g){plate(SW/2,SH*.8,80);emo('🍰',SW/2,SH*.78,70);const f=g.f,w=Math.sin(T*60)*.5+.5;C.globalAlpha=.7;blob(f.x-10,f.y-12,12,6+w*4,'#e8f6ff',2);blob(f.x+10,f.y-12,12,6+w*4,'#e8f6ff',2);C.globalAlpha=1;blob(f.x,f.y,15,11,'#2a2a38',3);blob(f.x+12,f.y-2,7,7,'#c0213a',2);
  if(g.sw>0){C.save();C.translate(g.swx,g.swy);C.rotate(-.4);C.fillStyle='#ff5a3c';rrect(-30,-30,60,60,10);C.fill();ink();C.strokeStyle=OL;C.lineWidth=2;for(let i=-20;i<=20;i+=10){C.beginPath();C.moveTo(i,-28);C.lineTo(i,28);C.stroke();}C.fillStyle='#8a5a38';C.fillRect(-5,28,10,60);C.restore();}
  bigText('SWATS '+g.n+' / '+g.need,SW/2,SH*.13,28,'#fff',0);}};
G.sort={name:'SORT THE DISHES',hint:'TAP LEFT for plates · RIGHT for cups',dur:11,c:['#4a8fe8','#cfe2ff'],
 init(g){g.n=0;g.need=6;g.it={k:R()<.5?'plate':'cup',y:SH*.18};},
 upd(g,dt){g.it.y+=(80+45*sp())*dt;if(g.it.y>SH*.68){g.why='late';return 'fail';}if(g.fly){g.fly.t-=dt;if(g.fly.t<=0)g.fly=null;}},
 tap(g,x){if(g.res)return;const side=x<SW/2?'plate':'cup';if(side===g.it.k){g.n++;g.fly={k:side,y:g.it.y,t:.3};snd&&snd(900+g.n*50,.08,'triangle',.12);if(g.n>=g.need)g.res='win';else g.it={k:R()<.5?'plate':'cup',y:SH*.18};}else g.res='fail';},
 draw(g){C.setLineDash([12,10]);C.strokeStyle='rgba(255,255,255,.6)';C.lineWidth=4;C.beginPath();C.moveTo(SW/2,SH*.12);C.lineTo(SW/2,SH*.95);C.stroke();C.setLineDash([]);
  for(const [x,l,k] of [[SW*.25,'PLATES','plate'],[SW*.75,'CUPS','cup']]){C.fillStyle='#2a6fd0';rrect(x-70,SH*.76,140,90,16);C.fill();ink();dish(k,x,SH*.8,.6);bigText(l,x,SH*.9,20,'#fff',0);}
  dish(g.it.k,SW/2,g.it.y,1);if(g.fly){const f=1-g.fly.t/.3;dish(g.fly.k,SW/2+(g.fly.k==='plate'?-1:1)*SW*.25*f,g.fly.y+(SH*.8-g.fly.y)*f,1-f*.4);}
  bigText(g.n+' / '+g.need,SW/2,SH*.08+20,28,'#fff',0);}};
function dish(k,x,y,s){if(k==='plate'){plate(x,y,44*s);}else{C.fillStyle='#fff';rrect(x-26*s,y-30*s,52*s,56*s,10*s);C.fill();ink();C.beginPath();C.arc(x+28*s,y-2*s,13*s,-1.3,1.3);ink(6*s);C.fillStyle='#7a3b1e';rrect(x-20*s,y-24*s,40*s,10*s,4*s);C.fill();}}
G.ketchup={name:'KETCHUP TIME',hint:'HOLD when the hot dog is UNDER the bottle',dur:10,c:['#e84545','#ffc2c2'],
 init(g){g.fill=0;g.mess=0;g.ph=R()*6;g.hx=SW/2;},
 upd(g,dt){g.ph+=dt*(.8+.3*sp());g.hx=SW/2+Math.sin(g.ph)*Math.min(SW*.3,130);const al=Math.abs(g.hx-SW/2)<72;g.al=al;if(ptr.down){if(al)g.fill+=dt*.8;else g.mess+=dt*.4;}if(g.mess>=1){g.why='mess';return 'fail';}if(g.fill>=1)return 'win';},
 draw(g){const by=SH*.62;C.fillStyle=g.al?'rgba(43,220,107,.22)':'rgba(0,0,0,.08)';C.fillRect(SW/2-72,SH*.2,144,by-SH*.2);C.fillStyle=({sushi:'#3a2418',steak:'#5a2d12'})[thm()]||'#d6303a';C.save();C.translate(SW/2,SH*.17);C.rotate(Math.PI);rrect(-26,-50,52,90,18);C.fill();ink();C.fillStyle='#fff';C.fillRect(-18,-20,36,22);C.fillStyle='#d6303a';C.font='900 11px system-ui';C.textAlign='center';C.fillText(({sushi:'SOY',steak:'SAUCE'})[thm()]||'KETCHUP',0,-5);C.restore();
  if(ptr.down){C.fillStyle=({sushi:'#3a2418',steak:'#5a2d12'})[thm()]||'#c0213a';C.fillRect(SW/2-5,SH*.24,10,by-SH*.24-6);}
  for(let i=0;i<Math.floor(g.mess*6);i++)blob(SW/2+(i%2?1:-1)*(30+i*14),by+40,14,6,'#c0213a',2);
  {const tc=({sushi:['#f5f5ec','#2a4a2a'],steak:['#dfe6ee','#7a2e1a']})[thm()]||['#e8b06a','#b5452b'];blob(g.hx,by,96,30,tc[0],4);blob(g.hx,by-8,86,16,tc[1],4);}C.strokeStyle='#e8233a';C.lineWidth=5;C.beginPath();const L=150*g.fill;for(let i=0;i<=L;i+=6){const xx=g.hx-75+i;C[i?'lineTo':'moveTo'](xx,by-10+Math.sin(i*.25)*5);}C.stroke();
  bar(SW/2,SH*.82,'TASTY',g.fill,'#2bb673');bar(SW/2,SH*.9,'MESS',g.mess,'#ff3b30');}};
function bar(x,y,l,v,c){const w=Math.min(SW-90,240);C.fillStyle='#fff';rrect(x-w/2,y-9,w,18,9);C.fill();ink(3);C.fillStyle=c;rrect(x-w/2+2,y-7,(w-4)*cl(v,0,1),14,7);C.fill();C.fillStyle='#fff';C.strokeStyle=OL;C.lineWidth=4;C.font='900 13px system-ui';C.textAlign='right';C.textBaseline='middle';C.strokeText(l,x-w/2-6,y);C.fillText(l,x-w/2-6,y);}
G.bell={name:'ORDER UP!',hint:'TAP the bell ONLY on GREEN',dur:10,c:['#e09b00','#ffe08a'],
 init(g){g.n=0;g.need=4;g.st='red';g.t=rr2(.9,1.6);g.ring=0;},
 upd(g,dt){g.ring=Math.max(0,g.ring-dt);g.t-=dt;if(g.t<=0){if(g.st==='red'){g.st=R()<.28?'yellow':'green';g.t=g.st==='green'?Math.max(.6,1.2/sp()):.8;}else{if(g.st==='green'){g.why='late';return 'fail';}g.st='red';g.t=rr2(.6,1.4);}}},
 tap(g){if(g.res)return;if(g.st==='green'){g.n++;g.ring=.3;g.st='red';g.t=rr2(.6,1.4);snd&&snd(1760,.4,'sine',.15);if(g.n>=g.need)g.res='win';}else g.res='fail';},
 draw(g){const c={red:'#ff3b30',yellow:'#ffd23f',green:'#2bdc6b'}[g.st];C.fillStyle='#2a2a38';rrect(SW/2-60,SH*.16,120,120,26);C.fill();ink();blob(SW/2,SH*.16+60,44,44,c,4);if(g.st==='green'){C.globalAlpha=.4;blob(SW/2,SH*.16+60,60,60,c,0);C.globalAlpha=1;}
  bigText(g.st==='green'?'GO!':g.st==='yellow'?'NOT YET':'WAIT',SW/2,SH*.42,34,c==='#ffd23f'?'#fff':c,0);
  const y=SH*.66,sh=g.ring?Math.sin(T*80)*.08:0;C.save();C.translate(SW/2,y);C.rotate(sh);C.fillStyle='#8a5a38';rrect(-80,40,160,22,8);C.fill();ink();C.fillStyle='#f2c230';C.beginPath();C.arc(0,40,70,Math.PI,TAU);C.closePath();C.fill();ink(5);blob(0,-34,10,8,'#f2c230',4);C.restore();
  bigText(g.n+' / '+g.need,SW/2,SH*.9,28,'#fff',0);}};
G.count={name:'HOW MANY GUESTS?',hint:'COUNT them · then TAP the number',dur:13,c:['#a45ee8','#ead1ff'],
 init(g){g.q=0;g.need=3;nc(g);},
 upd(g,dt){if(g.show>0)g.show-=dt;},
 tap(g,x,y){if(g.show>0||g.res)return;g.op.forEach((n,i)=>{if(Math.hypot(x-SW*(.2+i*.3),y-SH*.74)<46){if(n===g.ans){g.q++;snd&&snd(1100,.1,'triangle',.14);if(g.q>=g.need)g.res='win';else nc(g);}else{g.bad=i;g.res='fail';}}});},
 draw(g){const x=SW/2,y=SH*.42,w=Math.min(SW*.86,340),h=SH*.36;C.fillStyle='#7a4a2a';rrect(x-w/2,y-h/2,w,h,24);C.fill();ink(5);
  if(g.show>0){for(const p of g.pp)emo(p.e,x+p.x*w*.42,y+p.y*h*.36,40);bigText('LOOK FAST!',SW/2,SH*.14,34,'#fff',0);}
  else{bigText('?',x,y,90,'#fff',0);bigText('HOW MANY?',SW/2,SH*.14,30,'#fff',0);g.op.forEach((n,i)=>{const bx=SW*(.2+i*.3);blob(bx,SH*.74,42,42,g.bad===i?'#ff8a7a':'#fff',4);bigText(n+'',bx,SH*.74,34,OL,0);});}
  bigText(g.q+' / '+g.need,SW/2,SH*.9,24,'#fff',0);}};
function nc(g){const n=4+(R()*4|0)+Math.min(2,run.round/6|0);g.ans=n;g.pp=[];const cells=shuf([...Array(12).keys()]);for(let i=0;i<n;i++){const c=cells[i];g.pp.push({x:(c%4)/1.5-1+R()*.15,y:Math.floor(c/4)-1+R()*.2,e:pk(['🧑','👩','👴','👧','🧔','👱'])});}g.op=shuf([n-1,n,n+1]);g.show=Math.max(.65,1.25/sp());g.bad=-1;}
G.sushi={name:'SUSHI GRAB',hint:'TAP only the dish shown at the top',dur:11,c:['#ff6f91','#ffd6e0'],
 init(g){g.all=FOOD.slice(0,Math.min(FOOD.length,6));g.want=pk(g.all);g.n=0;g.need=6+Math.min(2,run.round/6|0);g.it=[];g.sp=0;g.bs=150+75*sp();},
 upd(g,dt){g.sp-=dt;if(g.sp<=0){g.sp=rr2(.42,.65)/sp();g.it.push({x:-40,f:R()<.35?g.want:pk(g.all.filter(f=>f!==g.want))});}g.bs+=dt*8;for(const o of g.it)o.x+=g.bs*dt;if(g.n>=3&&!g.sw){g.sw=1;g.want=pk(g.all.filter(f=>f!==g.want));g.newT=1.4;snd&&snd(500,.15,'square',.1);}g.it=g.it.filter(o=>o.x<SW+60&&!o.got);},
 tap(g,x,y){if(g.res||Math.abs(y-SH*.58)>70)return;for(const o of g.it)if(Math.abs(x-o.x)<40){if(o.f===g.want){o.got=1;g.n++;snd&&snd(1000+g.n*80,.08,'triangle',.12);if(g.n>=g.need)g.res='win';}else g.res='fail';return;}},
 draw(g){const y=SH*.58;C.fillStyle='#3a3a44';C.fillRect(0,y-48,SW,96);ink(4);C.fillStyle='rgba(255,255,255,.12)';for(let x=(T*g.bs)%60-60;x<SW;x+=60)C.fillRect(x,y-48,6,96);for(const o of g.it){plate(o.x,y,40);emo(o.f,o.x,y-2,40);}
  C.fillStyle='#fff';rrect(SW/2-90,SH*.17,180,90,22);C.fill();ink(4);C.fillStyle=OL;C.font='900 14px system-ui';C.textAlign='center';C.fillText('GRAB ONLY',SW/2,SH*.17+20);emo(g.want,SW/2,SH*.17+58,44);
  if(g.newT>0){g.newT-=1/60;bigText('NEW ORDER!',SW/2,SH*.38,34,'#ff4f6b',0);}bigText(g.n+' / '+g.need,SW/2,SH*.82,30,'#fff',0);}};
G.pizza={name:'SLICE THE PIZZA',hint:'SWIPE all the way across the pizza',dur:9,c:['#f5862b','#ffd9a8'],
 upd(){},init(g){g.cuts=[];g.need=4;g.pep=[];for(let i=0;i<8;i++)g.pep.push([R()*TAU,.25+R()*.55]);},
 up(g,sx,sy,ex,ey){const x=SW/2,y=SH*.5,r=Math.min(SW*.36,150),dx=ex-sx,dy=ey-sy,L=Math.hypot(dx,dy);if(L<r*1.1)return;const t=cl(((x-sx)*dx+(y-sy)*dy)/(L*L),0,1),d=Math.hypot(sx+dx*t-x,sy+dy*t-y);if(d<r*.4){g.cuts.push(Math.atan2(dy,dx));snd&&snd(500,.15,'sawtooth',.06,1500);if(g.cuts.length>=g.need)g.res='win';}},
 draw(g){const x=SW/2,y=SH*.5,r=Math.min(SW*.36,150);plate(x,y,r*1.2);blob(x,y,r,r,'#e0a050',5);blob(x,y,r*.86,r*.86,'#d6303a',2);blob(x,y,r*.8,r*.8,'#ffd966',0);for(const [a,d] of g.pep)blob(x+Math.cos(a)*d*r*.8,y+Math.sin(a)*d*r*.8,r*.11,r*.11,'#b3261e',2);
  C.strokeStyle='#5a2d12';C.lineWidth=4;for(const a of g.cuts){C.beginPath();C.moveTo(x-Math.cos(a)*r,y-Math.sin(a)*r);C.lineTo(x+Math.cos(a)*r,y+Math.sin(a)*r);C.stroke();}
  if(ptr.down&&!ptr.ign){C.strokeStyle='rgba(255,255,255,.85)';C.lineWidth=6;C.beginPath();C.moveTo(ptr.sx,ptr.sy);C.lineTo(ptr.x,ptr.y);C.stroke();emo('🔪',ptr.x,ptr.y,36);}
  bigText('SLICES '+g.cuts.length+' / '+g.need,SW/2,SH*.14,28,'#fff',0);}};
G.memory={name:'REMEMBER THE ORDER',hint:'MEMORIZE it · then TAP in the same order',dur:13,c:['#26b893','#c3f5e6'],
 init(g){const pool=shuf(FOOD.slice()),L=3+(run.round>10?1:0);g.seq=pool.slice(0,L);g.op=shuf(pool.slice(0,4));g.show=Math.max(1.8,3/sp());g.i=0;g.bad=-1;},
 upd(g,dt){if(g.show>0)g.show-=dt;},
 tap(g,x,y){if(g.show>0||g.res)return;g.op.forEach((f,i)=>{const bx=SW*(i%2?.68:.32),by=SH*(.58+Math.floor(i/2)*.17);if(Math.hypot(x-bx,y-by)<50){if(f===g.seq[g.i]){g.i++;snd&&snd(900+g.i*120,.08,'triangle',.12);if(g.i>=g.seq.length)g.res='win';}else{g.bad=i;g.res='fail';}}});},
 draw(g){const w=Math.min(SW-40,320);C.fillStyle='#fffbe8';rrect(SW/2-w/2,SH*.17,w,110,12);C.fill();ink(4);C.fillStyle=OL;C.font='900 13px system-ui';C.textAlign='center';C.fillText('ORDER TICKET',SW/2,SH*.17+20);
  g.seq.forEach((f,i)=>{const xx=SW/2+(i-(g.seq.length-1)/2)*62;if(g.show>0||i<g.i)emo(f,xx,SH*.17+66,42);else bigText('?',xx,SH*.17+66,36,'#bbb',0);});
  if(g.show>0)bigText('MEMORIZE!',SW/2,SH*.47,30,'#fff',0);else g.op.forEach((f,i)=>{const bx=SW*(i%2?.68:.32),by=SH*(.58+Math.floor(i/2)*.17);plate(bx,by,46,g.bad===i?'#ffb3a8':'#fff');emo(f,bx,by,40);});}};
G.shake={name:'SHAKE IT!',hint:'TAP FAST to blend the milkshake!',dur:7,c:['#f05aa8','#ffd1ec'],
 init(g){g.v=0;g.wob=0;},
 upd(g,dt){g.v=Math.max(0,g.v-dt*(.1+.05*sp()));g.wob=Math.max(0,g.wob-dt);if(g.v>=1)return 'win';},
 tap(g){g.v+=.07;g.wob=.15;snd&&snd(200+g.v*500,.04,'square',.05);},
 draw(g){const x=SW/2,y=SH*.72;C.save();C.translate(x,y);C.rotate(g.wob?Math.sin(T*70)*.06:0);C.beginPath();C.moveTo(-70,-240);C.lineTo(70,-240);C.lineTo(50,0);C.lineTo(-50,0);C.closePath();C.fillStyle='rgba(230,248,255,.85)';C.fill();C.save();C.clip();C.fillStyle='#ff9ccc';C.fillRect(-80,-240*g.v,160,240*g.v);C.fillStyle='#fff';for(let i=0;i<4;i++)blob(-40+i*27,-240*g.v,16,10,'#fff',0);C.restore();C.beginPath();C.moveTo(-70,-240);C.lineTo(70,-240);C.lineTo(50,0);C.lineTo(-50,0);C.closePath();ink(5);
  C.fillStyle='#d6303a';rrect(-60,0,120,60,14);C.fill();ink();blob(0,30,12,12,'#ffd23f',3);C.restore();bigText(Math.round(g.v*100)+'%',SW/2,SH*.13,40,'#fff',0);}};
G.swipe={name:'SWIPE THE CHECKS',hint:"SWIPE the way the arrow points",dur:10,c:['#22a6b8','#bdeef5'],
 init(g){g.n=0;g.need=5;g.d=pk(['L','R','U','D']);},
 upd(g,dt){if(g.fly){g.fly.t-=dt;if(g.fly.t<=0)g.fly=null;}},
 up(g,sx,sy,ex,ey){const dx=ex-sx,dy=ey-sy;if(Math.hypot(dx,dy)<40||g.res)return;const d=Math.abs(dx)>Math.abs(dy)?(dx>0?'R':'L'):(dy>0?'D':'U');if(d===g.d){g.n++;g.fly={d,t:.25};snd&&snd(700+g.n*90,.08,'triangle',.12);if(g.n>=g.need)g.res='win';else g.d=pk(['L','R','U','D']);}else g.res='fail';},
 draw(g){const ck=(x,y,d,a)=>{C.save();C.translate(x,y);C.globalAlpha=a;C.fillStyle='#fff';rrect(-90,-120,180,240,14);C.fill();ink(4);C.fillStyle='#ccc';for(let i=0;i<4;i++)C.fillRect(-60,-80+i*22,120,6);C.fillStyle=OL;C.font='900 22px system-ui';C.textAlign='center';C.fillText('TOTAL $42',0,95);C.rotate({R:0,D:Math.PI/2,L:Math.PI,U:-Math.PI/2}[d]);C.fillStyle='#ff5a3c';C.beginPath();C.moveTo(55,0);C.lineTo(5,-38);C.lineTo(5,-16);C.lineTo(-50,-16);C.lineTo(-50,16);C.lineTo(5,16);C.lineTo(5,38);C.closePath();C.fill();ink(4);C.restore();C.globalAlpha=1;};
  if(g.fly){const f=1-g.fly.t/.25,v={R:[1,0],L:[-1,0],U:[0,-1],D:[0,1]}[g.fly.d];ck(SW/2+v[0]*SW*f,SH*.5+v[1]*SH*f,g.fly.d,1-f);}ck(SW/2,SH*.5,g.d,1);bigText(g.n+' / '+g.need,SW/2,SH*.13,30,'#fff',0);}};

function perkTxt(){if(run.mode==='daily')return ' (No perks today. Fair for everyone.)';const p=perks(),a=[];if(p.lives>3)a.push('❤️+'+(p.lives-3));if(p.save)a.push('🧹 '+p.save+' save');if(p.bar)a.push('🍸 slower pours');if(p.host>1)a.push('🙋 +'+Math.round((p.host-1)*100)+'% pts');return a.length?' Your staff: '+a.join(' · '):' Hire staff to get shift perks.';}
// ===== city mini-games (road trip) =====
G.fish={name:'GONE FISHIN',hint:'Wait for the BIG SPLASH ❗ then TAP fast!',dur:13,c:['#1f7fb0','#7fd0ec'],
 init(g){g.n=0;g.need=3;nb(g);},
 upd(g,dt){g.t-=dt;if(g.st==='wait'&&g.t<=0){if(g.nib>0){g.nib--;g.st='nibble';g.t=.35;}else{g.st='bite';g.t=Math.max(.45,.85/Math.sqrt(sp()));snd&&snd(220,.2,'square',.12);buzz&&buzz(40);}}
  else if(g.st==='nibble'&&g.t<=0){g.st='wait';g.t=rr2(.5,1.1);}
  else if(g.st==='bite'&&g.t<=0){g.st='gone';g.res='fail';}
  else if(g.st==='caught'&&g.t<=0){if(g.n>=g.need)return 'win';nb(g);}},
 tap(g){if(g.res)return;if(g.st==='bite'){g.n++;g.st='caught';g.t=.8;snd&&snd(900+g.n*120,.12,'triangle',.14);buzz&&buzz([20,30,20]);}else if(g.st==='wait'||g.st==='nibble'){g.st='scared';g.res='fail';}},
 draw(g){const wy=SH*.42;C.fillStyle='#2a8fc4';C.fillRect(0,wy,SW,SH-wy);C.fillStyle='rgba(255,255,255,.18)';for(let i=0;i<10;i++){const y=wy+20+i*30,x=((T*30+i*70)%(SW+80))-40;C.fillRect(x,y,50,4);}
  C.fillStyle='#8a5a2b';rrect(-20,wy-30,SW*.42,40,10);C.fill();ink(4);emo('🧑',SW*.14,wy-60,56);
  const bx=SW*.62,dip=g.st==='bite'?22+Math.sin(T*40)*6:g.st==='nibble'?8:Math.sin(T*3)*3,by=wy+dip;
  C.strokeStyle='#5a3a1e';C.lineWidth=5;C.beginPath();C.moveTo(SW*.18,wy-70);C.quadraticCurveTo(SW*.35,wy-150,SW*.48,wy-120);C.stroke();C.strokeStyle='rgba(255,255,255,.8)';C.lineWidth=1.5;C.beginPath();C.moveTo(SW*.48,wy-120);C.lineTo(bx,by-10);C.stroke();
  blob(bx,by-6,11,11,'#ff3b3b',3);C.fillStyle='#fff';C.fillRect(bx-11,by-6,22,5);
  if(g.st==='bite'){C.fillStyle='rgba(255,255,255,.8)';for(let i=0;i<8;i++){const a=i/8*TAU;C.beginPath();C.arc(bx+Math.cos(a)*30,by+Math.sin(a)*8,5,0,TAU);C.fill();}bigText('❗ TAP NOW!',SW/2,SH*.24,46,'#ffd23f',0);}
  else if(g.st==='caught'){emo('🐟',bx,by-70-(.8-g.t)*80,64);bigText('GOT ONE!',SW/2,SH*.24,40,'#7cff6b',0);}
  else if(g.st==='scared'){bigText('TOO EARLY! 🐟💨',SW/2,SH*.24,30,'#ff8a7a',0);}
  else{emo('🐟',bx+Math.sin(T*1.5)*60,wy+110,40);bigText(g.st==='nibble'?'nibble... WAIT!':'wait for it...',SW/2,SH*.24,26,'#fff',0);}
  bigText('FISH '+g.n+' / '+g.need,SW/2,SH*.13,28,'#fff',0);}};
function nb(g){g.st='wait';g.t=rr2(.9,2.2)/Math.sqrt(sp());g.nib=R()<.6?(1+(R()*2|0)):0;}
G.fillet={name:'FILLET IT',hint:'DRAG along the dotted line · steady hand!',dur:12,c:['#2a8fb0','#bfeaf0'],
 init(g){g.n=0;g.need=3;nf(g);},
 upd(g,dt){if(ptr.down){const ly=g.ly(ptr.x);if(!g.cut){if(Math.abs(ptr.x-g.x0)<50&&Math.abs(ptr.y-g.ly(g.x0))<50){g.cut=1;g.pr=g.x0;}}else{const dy=Math.abs(ptr.y-ly);if(dy>46){g.bad={x:ptr.x,y:ptr.y};return 'fail';}if(ptr.x>g.pr){g.pr=Math.min(g.x1,ptr.x);if(R()<.3)snd&&snd(300+R()*80,.03,'sawtooth',.04);}
   if(g.pr>=g.x1-12){g.n++;snd&&snd(1100+g.n*90,.1,'triangle',.12);buzz&&buzz(15);if(g.n>=g.need)return 'win';nf(g);}}}else if(g.cut&&g.pr<g.x1-12){g.cut=0;}},
 draw(g){const cy=SH*.48;C.fillStyle='#b07a4a';rrect(SW*.05,cy-SH*.17,SW*.9,SH*.34,24);C.fill();ink(5);C.fillStyle='rgba(0,0,0,.08)';for(let i=0;i<6;i++)C.fillRect(SW*.05,cy-SH*.17+i*SH*.06,SW*.9,3);
  const fx=SW/2,fw=Math.min(SW*.3,140),fh=fw*.42;C.save();C.translate(fx,cy);C.rotate(g.a);C.fillStyle='#b8c7d4';C.beginPath();C.ellipse(0,0,fw,fh,0,0,TAU);C.fill();ink(4);C.fillStyle='#ff9a6b';C.beginPath();C.ellipse(0,fh*.15,fw*.85,fh*.55,0,0,TAU);C.fill();
  C.fillStyle='#b8c7d4';C.beginPath();C.moveTo(fw*.95,0);C.lineTo(fw*1.35,-fh*.8);C.lineTo(fw*1.35,fh*.8);C.closePath();C.fill();ink(4);blob(-fw*.7,-fh*.2,fh*.16,fh*.16,'#fff',3);C.fillStyle=OL;C.beginPath();C.arc(-fw*.7,-fh*.2,fh*.07,0,TAU);C.fill();C.restore();
  C.setLineDash([8,8]);C.strokeStyle='#fff';C.lineWidth=4;C.beginPath();C.moveTo(g.x0,g.ly(g.x0));C.lineTo(g.x1,g.ly(g.x1));C.stroke();C.setLineDash([]);
  if(g.cut){C.strokeStyle='#c0213a';C.lineWidth=6;C.beginPath();C.moveTo(g.x0,g.ly(g.x0));C.lineTo(g.pr,g.ly(g.pr));C.stroke();}
  blob(g.x0,g.ly(g.x0),12,12,g.cut?'#7cff6b':'#ffd23f',3);if(ptr.down)emo('🔪',ptr.x+14,ptr.y-14,40);bigText('FILLETS '+g.n+' / '+g.need,SW/2,SH*.14,28,'#fff',0);if(!g.cut)bigText('START ON THE YELLOW DOT',SW/2,SH*.78,16,'#fff',0);}};
function nf(g){g.a=rr2(-.22,.22);const fw=Math.min(SW*.3,140),cy=SH*.48;g.x0=SW/2-fw*.95;g.x1=SW/2+fw*.95;const a=g.a;g.ly=x=>cy+(x-SW/2)*Math.tan(a);g.cut=0;g.pr=g.x0;}
G.gumbo={name:'STIR THE GUMBO',hint:'DRAG in CIRCLES to stir · don\'t let it burn!',dur:11,c:['#6b2a8a','#e2b8ff'],
 init(g){g.p=0;g.burn=.25;g.la=null;g.ang=0;},
 upd(g,dt){const x=SW/2,y=SH*.52;g.burn+=dt*.16*sp();if(ptr.down){const a=Math.atan2(ptr.y-y,ptr.x-x);if(g.la!=null){let d=a-g.la;if(d>Math.PI)d-=TAU;if(d<-Math.PI)d+=TAU;const m=Math.min(.5,Math.abs(d));g.p+=m/TAU*.16;g.burn-=m*.09;g.ang+=d;if(m>.05&&R()<.15)snd&&snd(180+R()*60,.05,'sine',.05);}g.la=a;}else g.la=null;
  g.burn=cl(g.burn,0,1.2);if(g.burn>=1)return 'fail';if(g.p>=1)return 'win';},
 draw(g){const x=SW/2,y=SH*.52,r=Math.min(SW*.36,150);C.fillStyle='#ff7a1a';for(let i=0;i<5;i++){C.beginPath();C.moveTo(x-r*.8+i*r*.4,y+r*.95);C.quadraticCurveTo(x-r*.7+i*r*.4,y+r*.6-Math.sin(T*12+i)*12,x-r*.6+i*r*.4,y+r*.95);C.fill();}
  blob(x,y,r,r*.82,'#4a4f58',6);blob(x,y-4,r*.86,r*.68,g.burn>.7?'#3a1e0e':'#8a4a1e',3);for(let i=0;i<9;i++){const a=g.ang*.6+i*.7,d=(i%3+1)*r*.22;emo(['🦐','🌶️','🥖'][i%3],x+Math.cos(a)*d,y+Math.sin(a)*d*.8,22);}
  C.save();C.translate(x,y);C.rotate(g.ang);C.strokeStyle='#8a5a2b';C.lineWidth=10;C.lineCap='round';C.beginPath();C.moveTo(r*.3,0);C.lineTo(r*1.25,-r*.15);C.stroke();C.restore();
  C.fillStyle='rgba(255,255,255,.55)';for(let i=0;i<4;i++){C.beginPath();C.arc(x-r*.4+i*r*.27,y-r*.8-((T*30+i*23)%60),7,0,TAU);C.fill();}
  const bw=Math.min(SW*.8,320);C.fillStyle='#1a1220';rrect(SW/2-bw/2,SH*.15,bw,16,8);C.fill();C.fillStyle=g.burn>.7?'#ff3b3b':'#ff9a2b';rrect(SW/2-bw/2+2,SH*.15+2,(bw-4)*Math.min(1,g.burn),12,6);C.fill();bigText(g.burn>.7?'🔥 IT\'S BURNING!':'🔥 HEAT',SW/2,SH*.12,20,'#fff',0);
  C.fillStyle='#1a1220';rrect(SW/2-bw/2,SH*.85,bw,16,8);C.fill();C.fillStyle='#7cff6b';rrect(SW/2-bw/2+2,SH*.85+2,(bw-4)*Math.min(1,g.p),12,6);C.fill();bigText('STIRRED '+Math.round(g.p*100)+'%',SW/2,SH*.91,18,'#fff',0);}};
G.brisket={name:'SLICE THE BRISKET',hint:'TAP when the knife hits the line!',dur:11,c:['#7a4428','#ffd1a8'],
 init(g){g.n=0;g.need=5;g.ph=R()*6;g.sl=[];g.tx=SW/2+rr2(-1,1)*SW*.25;},
 upd(g,dt){g.ph+=dt*(1.7+.8*sp()+g.n*.12);},
 kx(g){return SW/2+Math.sin(g.ph)*Math.min(SW*.38,170);},
 tap(g){if(g.res)return;const x=G.brisket.kx(g);if(Math.abs(x-g.tx)<20){g.sl.push(g.tx);g.n++;snd&&snd(700+g.n*90,.1,'square',.1);buzz&&buzz(15);if(g.n>=g.need){g.res='win';return;}let t;do{t=SW/2+rr2(-1,1)*Math.min(SW*.34,150);}while(Math.abs(t-g.tx)<40);g.tx=t;}else{g.bad=x;g.res='fail';}},
 draw(g){const y=SH*.55,w=Math.min(SW*.8,340),h=SH*.16;C.fillStyle='#c98a58';rrect(SW/2-w/2-16,y-h/2-20,w+32,h+40,18);C.fill();ink(5);C.fillStyle='#3a1e0e';rrect(SW/2-w/2,y-h/2,w,h,24);C.fill();ink(4);C.fillStyle='#d0606a';rrect(SW/2-w/2+10,y-h/2+10,w-20,h-20,16);C.fill();C.fillStyle='rgba(255,255,255,.18)';for(let i=0;i<8;i++)C.fillRect(SW/2-w/2+16+i*(w-32)/8,y-h/2+12,3,h-24);
  for(const s of g.sl){C.strokeStyle='#2a1208';C.lineWidth=4;C.beginPath();C.moveTo(s,y-h/2);C.lineTo(s,y+h/2);C.stroke();}
  C.setLineDash([6,6]);C.strokeStyle='#ffd23f';C.lineWidth=4;C.beginPath();C.moveTo(g.tx,y-h/2-28);C.lineTo(g.tx,y+h/2+28);C.stroke();C.setLineDash([]);
  const kx=G.brisket.kx(g);emo('🔪',kx,y-h/2-34,54);C.fillStyle='rgba(255,255,255,.6)';C.fillRect(kx-1,y-h/2-20,2,h+40);
  bigText('SLICES '+g.n+' / '+g.need,SW/2,SH*.16,28,'#fff',0);}};
G.dough={name:'DOUGH TOSS',hint:'DRAG your hands under the dough · catch it!',dur:12,endWin:1,c:['#b5533c','#ffd9c2'],
 init(g){g.hx=SW/2;g.n=0;g.need=6;g.d={x:SW/2,y:SH*.72,vx:0,vy:-760,r:0};g.puff=[];},
 upd(g,dt){if(ptr.down)g.tx=cl(ptr.x,60,SW-60);if(g.tx!=null)g.hx+=(g.tx-g.hx)*Math.min(1,dt*20);const d=g.d,gv=880*Math.min(1.3,.85+.15*sp());d.vy+=gv*dt;d.x+=d.vx*dt;d.y+=d.vy*dt;d.r+=dt*(5+g.n);if(d.x<40){d.x=40;d.vx=Math.abs(d.vx);}if(d.x>SW-40){d.x=SW-40;d.vx=-Math.abs(d.vx);}
  const hy=SH*.74;if(d.vy>0&&d.y>=hy-10&&d.y<hy+30){if(Math.abs(d.x-g.hx)<66){g.n++;d.y=hy-10;d.vy=-(700+Math.min(5,g.n)*40)*Math.min(1.15,Math.sqrt(sp()));d.vx=rr2(-1,1)*(80+g.n*30)*sp();snd&&snd(500+g.n*70,.08,'triangle',.12);buzz&&buzz(10);for(let i=0;i<8;i++)g.puff.push({x:d.x,y:hy,vx:rr2(-80,80),vy:rr2(-120,-30),l:.6});if(g.n>=g.need)return 'win';}}
  if(d.y>SH+40)return 'fail';for(const p of g.puff){p.x+=p.vx*dt;p.y+=p.vy*dt;p.l-=dt;}g.puff=g.puff.filter(p=>p.l>0);},
 draw(g){C.fillStyle='rgba(120,40,30,.25)';for(let y=0;y<SH*.6;y+=22)for(let x=((y/22)%2)*20;x<SW;x+=40)C.fillRect(x,y,36,18);
  const d=g.d;C.save();C.translate(d.x,d.y);C.rotate(d.r);C.scale(1,.55+.25*Math.abs(Math.sin(d.r)));blob(0,0,46,46,'#f4e0b8',4);C.fillStyle='rgba(200,160,110,.5)';C.beginPath();C.arc(10,-8,8,0,TAU);C.arc(-14,10,6,0,TAU);C.fill();C.restore();
  const hy=SH*.74;for(const s of[-1,1]){C.fillStyle='#fff';rrect(g.hx+s*44-14,hy+8,28,60,10);C.fill();ink(3);blob(g.hx+s*30,hy+4,20,13,'#e0ac69',3);}
  for(const p of g.puff){C.fillStyle=`rgba(255,255,255,${p.l})`;C.beginPath();C.arc(p.x,p.y,6,0,TAU);C.fill();}
  bigText('TOSSES '+g.n+' / '+g.need,SW/2,SH*.14,28,'#fff',0);}};
G.wind=Object.assign({},G.catch,{name:'WINDY PATIO',hint:'DRAG to catch · the wind pushes glasses!',c:['#1f9e8c','#b8f0e6'],
 init(g){G.catch.init(g);g.t2=R()*6;g.w=0;},
 upd(g,dt){g.t2+=dt*.9;g.w=Math.sin(g.t2)*(45+20*sp());for(const o of g.gl)if(!o.d)o.x+=g.w*dt*(o.vy>0?.6:1);return G.catch.upd(g,dt);},
 draw(g){G.catch.draw(g);C.strokeStyle='rgba(255,255,255,.55)';C.lineWidth=3;for(let i=0;i<8;i++){const y=(i*97+T*30)%SH,x=((T*g.w*4+i*131)%SW+SW)%SW;C.beginPath();C.moveTo(x,y);C.lineTo(x-Math.sign(g.w)*50,y);C.stroke();}bigText(g.w>0?'💨 →':'← 💨',SW/2,SH*.24,28,'#fff',0);}});
function nv(g){g.want=pk(FOOD);const o=[g.want];while(o.length<4){const f=pk(FOOD);if(!o.includes(f))o.push(f);}g.op=shuf(o);g.pat=g.max=Math.max(1.4,2.6/sp());g.bad=-1;}
G.vip={name:'VIP SERVICE',hint:'TAP what the VIP wants · FAST!',dur:12,c:['#7a2fd0','#e2c8ff'],
 init(g){g.n=0;g.need=4;nv(g);},
 upd(g,dt){g.pat-=dt;if(g.pat<=0){g.why='angry';return 'fail';}},
 tap(g,x,y){if(g.res)return;g.op.forEach((f,i)=>{const bx=SW*(i%2?.68:.32),by=SH*(.6+Math.floor(i/2)*.17);if(Math.hypot(x-bx,y-by)<50){if(f===g.want){g.n++;snd&&snd(1200+g.n*80,.08,'triangle',.12);if(g.n>=g.need)g.res='win';else nv(g);}else{g.bad=i;g.res='fail';}}});},
 draw(g){const f=g.pat/g.max,s=Math.min(SW,SH)*.1,x=SW*.3,y=SH*.3;blob(x,y,s,s*.95,'#c68642',5);C.fillStyle=OL;rrect(x-s*.8,y-s*.3,s*1.6,s*.4,s*.15);C.fill();C.fillStyle='rgba(255,255,255,.35)';C.fillRect(x-s*.6,y-s*.25,s*.3,s*.12);
  C.fillStyle='#ffd23f';C.beginPath();C.moveTo(x-s*.7,y-s*.7);C.lineTo(x-s*.7,y-s*1.25);C.lineTo(x-s*.35,y-s*.95);C.lineTo(x,y-s*1.35);C.lineTo(x+s*.35,y-s*.95);C.lineTo(x+s*.7,y-s*1.25);C.lineTo(x+s*.7,y-s*.7);C.closePath();C.fill();ink(4);mouth(x,y+s*.45,s,f<.35?'mad':'calm');
  C.fillStyle='#fff';rrect(SW*.5,SH*.18,SW*.42,100,20);C.fill();ink(4);emo(g.want,SW*.71,SH*.18+44,46);const bw=SW*.42-24;C.fillStyle='#eee';rrect(SW*.5+12,SH*.18+80,bw,10,5);C.fill();C.fillStyle=f>.5?'#2bb673':f>.25?'#ffd23f':'#ff3b30';rrect(SW*.5+12,SH*.18+80,bw*f,10,5);C.fill();
  g.op.forEach((ff,i)=>{const bx=SW*(i%2?.68:.32),by=SH*(.6+Math.floor(i/2)*.17);plate(bx,by,46,g.bad===i?'#ffb3a8':'#fff');emo(ff,bx,by,40);});bigText('💎 '+g.n+' / '+g.need,SW/2,SH*.47,26,'#ffd23f',0);}};
// rush shift button + game count on the menu
setTimeout(()=>{const rb=document.createElement('button');rb.id='rushBtn';rb.className='mbtn hidden';rb.style.cssText='background:#ff5a3c;font-size:17px;padding:12px 10px;margin:0';rb.textContent='🔥 RUSH SHIFT · 3× PAY';$('smBtn').after(rb);rb.onclick=()=>howTo(()=>launch('shift',null,1));
 const upd=()=>{rb.classList.toggle('hidden',!(window.dsRush&&window.dsRush()));if(window.dsGameCount)$('smBtn').innerHTML='⚡ SHIFT MODE <span style="font-size:12px;background:#1a1220;color:#ffd23f;border-radius:999px;padding:2px 7px;vertical-align:middle">'+window.dsGameCount()+'/22</span>';};
 const rm=window.renderMenu;window.renderMenu=function(){rm();upd();};setInterval(upd,20000);upd();},0);

function aiPanel(){const a=run.ai,w=150,x=SW-16-w,y=46;C.fillStyle='rgba(26,18,32,.8)';rrect(x,y,w,100,14);C.fill();emo(a.e,x+22,y+24,26);C.fillStyle='#fff';C.font='900 13px system-ui';C.textAlign='left';C.textBaseline='middle';C.fillText(a.n,x+40,y+18);C.fillStyle='#2fd3ff';C.font='800 10px system-ui';C.fillText('AI · '+(run.diff||'').toUpperCase(),x+40,y+32);
 C.fillStyle='#fff';C.font='900 15px system-ui';C.textAlign='right';C.fillText(run.botScore+'',x+w-10,y+24);C.textAlign='left';C.font='14px system-ui';C.fillText('💙'.repeat(Math.max(0,run.botLives)),x+10,y+56);
 const bp=run.bp,pr=phase==='play'&&bp?cl(phT/bp.te,0,1):phase==='result'?1:0;C.fillStyle='rgba(255,255,255,.2)';rrect(x+10,y+74,w-20,12,6);C.fill();C.fillStyle=bp&&bp.done?(bp.ok?'#2bdc6b':'#ff3b30'):'#ffd23f';rrect(x+10,y+74,(w-20)*pr,12,6);C.fill();C.fillStyle='#fff';C.font='800 9px system-ui';C.fillText(bp&&bp.done?(bp.ok?'DONE':'FAILED'):phase==='play'?'PLAYING…':'',x+10,y+94);C.textBaseline='alphabetic';}
function endDuo(){phase='off';const D=run.duo,w=D.lives[0]===D.lives[1]?(D.score[0]>=D.score[1]?0:1):(D.lives[0]>D.lives[1]?0:1);S.coins+=50;save();
 show(`<div class="endbox"><div class="stamp ok" style="background:${w?'#2fd3ff':'#ff4fa3'}">PLAYER ${w+1} WINS!</div><div class="scard"><div class="slbl">FINAL</div><div style="display:flex;justify-content:space-around;align-items:center"><div><div style="font:900 14px system-ui;color:#ff4fa3">PLAYER 1</div><div class="sbig" style="font-size:44px">${D.score[0]}</div></div><div style="font:900 22px system-ui">VS</div><div><div style="font:900 14px system-ui;color:#2fd3ff">PLAYER 2</div><div class="sbig" style="font-size:44px">${D.score[1]}</div></div></div><div class="chips"><span>${run.round} rounds</span></div></div><div class="bub">"${pk(['Player '+(2-w)+', you\'re on dishes.','Rematch. Now.','That was embarrassing for one of you.'])}"</div><button id="eAgain" class="wide">REMATCH</button><div class="erow"><button class="ghost" id="eMenu">🏠 MENU</button></div></div>`);ov.classList.add('endbg');
 $('eAgain').onclick=()=>launch('duo');$('eMenu').onclick=goMenu;sc.style.display='none';buzz&&buzz([40,40,40,40,120]);}
window.dsPreview=(cv2,o,gl,w,h)=>{const so=S.outfit,sg=S.glass;S.outfit=o;try{drawPv(cv2,()=>{waiter(w/2,h*.63,h*.2,'happy');const pal={classic:['#c0213a','#f2a516','#7ee0ff'],neon:['#ff2fd0','#2fffe0','#b6ff2f'],champ:['#f3d36b','#f7e7a1','#f3d36b'],boba:['#c8a27a','#d8b48c','#c8a27a']}[gl]||['#c0213a','#f2a516','#7ee0ff'];if(gl==='neon'){C.shadowColor='#2fffe0';C.shadowBlur=14;}for(let i=0;i<3;i++)cGlass(w/2+h*.24,h*.42-i*h*.11,h*.1,pal[i],.75);C.shadowBlur=0;C.fillStyle='#dfe6ee';C.beginPath();C.ellipse(w/2+h*.24,h*.425,h*.13,h*.025,0,0,TAU);C.fill();ink(2);},w,h);}finally{S.outfit=so;}};
const ORDER=['run','stack','pour','rush','catch','tip','wipe','order','tray','flip','swat','sort','ketchup','bell','count','sushi','pizza','memory','shake','swipe'];
// ---------- flow ----------
let cur=null,gs=null,dur=0,left=0,bag=[];
function nextGame(){if(!bag.length){bag=pool();for(let i=bag.length-1;i>0;i--){const j=R()*(i+1)|0;[bag[i],bag[j]]=[bag[j],bag[i]];}if(bag[0]===run.last)bag.push(bag.shift());}
 const dq=new URLSearchParams(location.search).get('g'),k=dq&&G[dq]?dq:bag.shift();run.last=k;cur=G[k];S.seen=S.seen||{};gs={k,tut:!S.seen[k]&&!['ch','duo','vs'].includes(run.mode)};cur.init(gs);dur=cl(cur.dur/Math.sqrt(rate())*(gs.tut?1.35:1),5,15);if(gs.minT)dur=Math.max(dur,gs.minT);left=dur;}
function intro(){if(run.mode==='duo'){run.round++;R=Math.random;nextGame();run.dseed=Math.random()*1e9|0;return duoTurn(0);}run.round++;nextGame();phase='intro';phT=0;run.roast=run.round===1?(run.mode==='vs'?run.ai.n+' (AI) wants your job. Loser washes dishes.':run.mode==='ch'?'Challenge run. Same orders as your friend. No perks.':run.mode==='daily'?"Daily Shift. Same orders for everyone. Don't embarrass me.":(run.rush?'RUSH SHIFT! We\'re short-staffed. Triple pay.':'Shift Mode. Every order gets faster.')+perkTxt()):pk(ROAST.intro);}
function duoTurn(t){run.duo.turn=t;R=mulberry(run.dseed);gs={k:gs.k,tut:false};cur.init(gs);dur=cl(cur.dur/Math.sqrt(rate()),5,15);left=dur;phase=t?'pass':'intro';phT=0;run.roast='Player '+(t+1)+', you\'re up.';}
function resolve(res){phase='result';phT=0;flash=res;const pace=rate();buzz&&buzz(res==='win'?[15,40,25]:[90,40,90]);
 if(run.mode==='duo'){const i=run.duo.turn;run.duo.last[i]=res==='win';if(res==='win'){const pts=Math.round(100*pace+left*25);run.duo.score[i]+=pts;run.pts='P'+(i+1)+' +'+pts;run.line=pk(ROAST.win);snd&&snd(784,.15,'triangle',.14);}else{run.duo.lives[i]--;run.pts='P'+(i+1)+' -1 ❤';run.line=pk(ROAST.fail[gs.k]||ROAST.over);noise&&noise(.3,.35);}return;}
 if(gs.tut){S.seen[gs.k]=1;save();}
 if(res==='win'){run.streak++;const pts=Math.round((100*pace+left*25)*Math.min(2,1+run.streak*.1)*perks().host*(gs.k==='vip'?2:gs.k==='wind'?1.5:1));run.score+=pts;run.cleared++;run.pts='+'+pts;[523,659,784].forEach((f,i)=>setTimeout(()=>snd&&snd(f,.12,'triangle',.14),i*70));buzz&&buzz(20);run.line=pk(ROAST.win);}
 else if(run.saves>0){run.saves--;run.streak=0;run.pts='🧹 BUSBOY SAVE!';run.line='The busboy cleaned that up. You owe him.';snd&&snd(500,.2,'triangle',.12);}
 else{run.streak=0;run.lives--;run.pts='-1 ❤';noise&&noise(.3,.35);snd&&snd(180,.4,'sawtooth',.12,60);buzz&&buzz([60,30,60]);run.line=pk(ROAST.fail[gs.k]||ROAST.over);}
 if(run.mode==='vs'&&run.botLives>0){const ok=run.bp?run.bp.ok:Math.random()<.85;run.botRes=ok;run.chat={t:pk(ok&&res!=='win'?TAUNT.win:!ok?TAUNT.lose:TAUNT.gg),l:2};if(ok)run.botScore+=Math.round(100*pace+Math.random()*dur*20);else run.botLives--;}}
function after(){if(run.mode==='duo'){if(run.duo.turn===0)return duoTurn(1);const L=run.duo.lives;if(L[0]<=0||L[1]<=0)return endDuo();return intro();}if(run.lives<=0||(run.mode==='vs'&&run.botLives<=0))return endRun();intro();}
// ---------- loop ----------
let lastT=performance.now();
function frame(now){const dt=Math.min(.033,(now-lastT)/1000);lastT=now;if(phase==='off')return;if(paused){requestAnimationFrame(frame);return;}T+=dt;phT+=dt;
 if(phase==='intro'){if(phT>=5)goPlay();}
 else if(phase==='play'){left-=dt;let r=cur.upd(gs,dt)||gs.res;if(!r&&left<=0)r=cur.endWin?'win':'fail';if(r)resolve(r);}
 else if(phase==='result'){if(phT>(run.mode==='vs'||run.mode==='duo'?1.9:1.5))after();}
 if(run&&run.chat){run.chat.l-=dt;if(run.chat.l<=0)run.chat=null;}if(phase==='play'&&run.mode==='vs'&&run.bp&&!run.bp.done&&phT>=run.bp.te){run.bp.done=1;run.chat={t:run.bp.ok?pk(['done ✅','finished!','✅']):pk(['oops 💥','NOOO','💀']),l:1.4};}
 render();requestAnimationFrame(frame);}
function hearts(x,y,n,c){for(let i=0;i<Math.max(3,run.max||3);i++){C.font='24px system-ui';C.textAlign='left';C.globalAlpha=i<n?1:.25;C.fillText(c,x+i*26,y);}C.globalAlpha=1;}
function render(){const c=cur?cur.c:['#ff5a3c','#ff8a6a'];C.clearRect(0,0,SW,SH);
 if(phase==='pass'){bg('#ff4fa3','#ff8ac4');bigText('PASS TO',SW/2,SH*.3,44,'#fff',0);bigText('PLAYER 2',SW/2,SH*.38,60,'#2fd3ff',-.04);emo('📱👉',SW/2,SH*.52,70);bigText('Player 1 '+(run.duo.last[0]?'nailed it ✓':'spilled ✗'),SW/2,SH*.64,22,run.duo.last[0]?'#7cff6b':'#ffd23f',0);bigText('Same game. Your turn.',SW/2,SH*.71,18,'#fff',0);C.globalAlpha=.6+.4*Math.sin(T*6);bigText('TAP WHEN READY',SW/2,SH*.86,22,'#fff',0);C.globalAlpha=1;return;}
 if(phase==='intro'){bg('#ffd23f','#ffb000');const s=Math.min(SW,SH)*.16,pop=Math.min(1,phT*5);C.save();C.translate(SW/2,SH*.3);C.scale(pop,pop);manager(0,0,s,'mad');C.restore();
  C.fillStyle='#fff';const bw=Math.min(SW-30,360);rrect(SW/2-bw/2,SH*.47,bw,70,18);C.fill();ink();C.fillStyle=OL;C.font='700 16px system-ui';C.textAlign='center';C.textBaseline='middle';wrap(run.roast,SW/2,SH*.47+35,bw-24,20);
  bigText(NM(gs.k)[0],SW/2,SH*.66,Math.min(48,SW*.11),'#fff',-.06+Math.sin(T*8)*.02);bigText(NM(gs.k)[1],SW/2,SH*.75,Math.min(22,SW*.055),'#ffd23f',0);demo(gs.k,SW/2,SH*.88);if(run.mode==='duo')bigText('PLAYER '+(run.duo.turn+1),SW/2,SH*.09,34,run.duo.turn?'#2fd3ff':'#ff4fa3',0);if(run.mode==='vs'){C.font='13px system-ui';bigText('YOU  vs  '+run.ai.e+' '+run.ai.n.toUpperCase()+' (AI)',SW/2,SH*.09,20,'#fff',0);}bigText(gs.tut?'FIRST TIME: PRACTICE SPEED':'ROUND '+run.round+' · SPEED x'+rate().toFixed(2),SW/2,SH*.81,15,'#fff',0);{const n=Math.max(1,Math.ceil(5-phT)),bw2=Math.min(SW-60,260),pul=1+Math.sin(T*8)*.03;C.save();C.translate(SW/2,SH*.945);C.scale(pul,pul);C.fillStyle='#2bb673';rrect(-bw2/2,-24,bw2,48,24);C.fill();ink(4);C.fillStyle='rgba(255,255,255,.35)';rrect(-bw2/2,-24,bw2*(1-Math.min(1,phT/5)),48,24);C.fill();C.restore();bigText('▶ START  '+n,SW/2,SH*.945,22,'#fff',0);C.save();C.globalAlpha=.25+.15*Math.sin(T*10);bigText(n+'',SW*.88,SH*.13,Math.min(70,SW*.17),'#fff',0);C.restore();}}
 else{bg(c[0],c[1]);cur.draw(gs);
  if(phase==='play'&&(gs.tut||phT<2.5)){C.globalAlpha=gs.tut?1:cl((2.5-phT)*2,0,1);C.fillStyle='rgba(26,18,32,.8)';const hw=Math.min(SW-24,340);rrect(SW/2-hw/2,SH-58,hw,40,20);C.fill();C.fillStyle='#ffd23f';C.font='900 16px system-ui';C.textAlign='center';C.textBaseline='middle';C.fillText(NM(gs.k)[1],SW/2,SH-38);C.globalAlpha=1;}
  // timer bar + hud
  const f=cl(left/dur,0,1);C.fillStyle='#fff';rrect(14,14,SW-28,22,11);C.fill();ink(3);C.fillStyle=f>.3?'#2bb673':'#ff3b30';rrect(17,17,(SW-34)*f,16,8);C.fill();
  C.fillStyle=OL;C.font='900 18px system-ui';C.textAlign='left';C.textBaseline='alphabetic';if(run.mode==='duo'){const D=run.duo;for(const i of[0,1]){C.globalAlpha=D.turn===i?1:.55;C.textAlign=i?'right':'left';bigText('',0,0,1);C.font='900 14px system-ui';C.fillStyle=i?'#2fd3ff':'#ff4fa3';C.strokeStyle=OL;C.lineWidth=4;const tx=i?SW-16:16,lbl='P'+(i+1)+' '+'❤'.repeat(Math.max(0,D.lives[i]))+'  '+D.score[i];C.strokeText(lbl,tx,62);C.fillText(lbl,tx,62);}C.globalAlpha=1;C.textAlign='left';}else hearts(16,64,run.lives,'❤️');{const P2=perks(),ch=[];if(run.saves>0)ch.push('🧹×'+run.saves);if(P2.bar&&['pour','stack','shake'].includes(gs.k))ch.push('🍸 SLOWED');if(P2.host>1)ch.push('🙋 +'+Math.round((P2.host-1)*100)+'%');let cxp=16;C.font='800 12px system-ui';C.textBaseline='middle';for(const t of ch){const w=C.measureText(t).width+14;C.fillStyle='rgba(26,18,32,.75)';rrect(cxp,76,w,20,10);C.fill();C.fillStyle='#ffd23f';C.textAlign='left';C.fillText(t,cxp+7,86);cxp+=w+5;}C.textBaseline='alphabetic';}if(run.mode!=='duo'){C.textAlign='right';C.fillStyle='#fff';C.strokeStyle=OL;C.lineWidth=5;C.strokeText(run.score+'',SW-16,62);C.fillText(run.score+'',SW-16,62);}
  if(run.mode==='vs')aiPanel();
  if(phase==='result'){C.fillStyle='rgba(26,18,32,.45)';C.fillRect(0,0,SW,SH);const sc2=1+Math.max(0,.15-phT)*1.5;C.save();C.translate(SW/2,SH*.42);C.scale(sc2,sc2);bigText(flash==='win'?'NAILED IT!':'SPILLED!',0,0,Math.min(64,SW*.15),flash==='win'?'#7cff6b':'#ff5a3c');C.restore();bigText(run.pts,SW/2,SH*.52,30,'#fff',0);
   C.fillStyle='#fff';const bw=Math.min(SW-30,340);rrect(SW/2-bw/2,SH*.58,bw,52,14);C.fill();ink(3);C.fillStyle=OL;C.font='700 15px system-ui';C.textAlign='center';C.textBaseline='middle';wrap('"'+run.line+'"',SW/2,SH*.58+26,bw-20,18);
   if(String(run.pts).startsWith('🧹')){const bx=-40+phT*SW*.9;emo('🧹',bx,SH*.78,54);for(let i=0;i<5;i++){C.globalAlpha=.5;blob(bx-30-i*18,SH*.8+Math.sin(T*20+i)*4,8+i,5,'#fff',0);}C.globalAlpha=1;}
   if(run.mode==='vs'&&run.botRes!==null){emo(run.ai.e,SW/2,SH*.8,56);bigText(run.ai.n+(run.botRes?' ✓':' ✗'),SW/2,SH*.9,22,run.botRes?'#7cff6b':'#ff5a3c',0);}}
  if(run.chat&&run.mode==='vs'){C.font='800 14px system-ui';const t=run.chat.t,w=C.measureText(t).width+20;C.globalAlpha=cl(run.chat.l*3,0,1);C.fillStyle='#fff';rrect(SW-16-w,152,w,30,14);C.fill();ink(2.5);C.fillStyle=OL;C.textAlign='center';C.textBaseline='middle';C.fillText(t,SW-16-w/2,167);C.textBaseline='alphabetic';C.globalAlpha=1;}}}
function demo(k,x,y){const drag=['wind','run','catch','wipe','tray','pizza','swipe'].includes(k),hold=k==='pour'||k==='ketchup',ph=T*2.2;let fx=x,fy=y,pr=0;
 if(drag)fx=x+Math.sin(ph)*70;else if(hold){pr=Math.sin(ph)>0;}else{pr=(ph%1.4)<.3;fx=x+(k==='stack'?0:Math.sin(Math.floor(ph/1.4)*2.3)*60);}
 C.fillStyle='rgba(26,18,32,.55)';rrect(x-110,y-28,220,46,23);C.fill();if(drag){C.fillStyle='#fff';C.font='900 18px system-ui';C.textAlign='center';C.textBaseline='middle';C.fillText('◀    ▶',x,y-5);}
 if(pr){C.strokeStyle='#ffd23f';C.lineWidth=4;C.beginPath();C.arc(fx,y-8,20,0,TAU);C.stroke();}C.font='34px system-ui';C.textAlign='center';C.textBaseline='middle';C.fillText('👆',fx+4,fy+6+(pr?4:0));}
function wrap(t,x,y,w,lh){const ws=t.split(' '),L=[];let l='';for(const s of ws){const tt=l?l+' '+s:s;if(C.measureText(tt).width>w&&l){L.push(l);l=s;}else l=tt;}L.push(l);L.forEach((s,i)=>C.fillText(s,x,y+(i-(L.length-1)/2)*lh));}
// ---------- input ----------
const pos=e=>{const r=sc.getBoundingClientRect();return[e.clientX-r.left,e.clientY-r.top];};
function goPlay(){phase='play';phT=0;if(run&&run.mode==='vs'){const d={easy:[.8,.12],normal:[.9,.08],hard:[.97,.05]}[run.diff],ok=Math.random()<cl(d[0]-(rate()-1)*d[1],.35,.99);run.bp={ok,te:dur*(ok?rr2(.35,.85):rr2(.2,.75)),done:0};if(Math.random()<.35)run.chat={t:pk(TAUNT.start),l:1.6};}if(ptr.down){ptr.down=0;ptr.ign=1;}}
sc.addEventListener('pointerdown',e=>{[ptr.x,ptr.y]=pos(e);ptr.sx=ptr.x;ptr.sy=ptr.y;ptr.down=1;ptr.ign=0;if(phase==='pass'){if(phT>.4){phase='intro';phT=0;}return;}if(phase==='intro'){if(phT>.3){if(Math.hypot(ptr.x-SW/2,ptr.y-SH*.945)<120||phT>.6)goPlay();}return;}buzz&&buzz(6);if(phase==='play'&&cur.tap)cur.tap(gs,ptr.x,ptr.y);});
sc.addEventListener('pointermove',e=>{[ptr.x,ptr.y]=pos(e);});
addEventListener('pointerup',e=>{const was=ptr.down&&!ptr.ign;ptr.down=0;ptr.ign=0;if(was&&phase==='play'&&cur.up){const r=sc.getBoundingClientRect();cur.up(gs,ptr.sx,ptr.sy,e.clientX-r.left,e.clientY-r.top);}});addEventListener('pointercancel',()=>ptr.down=0);
addEventListener('keydown',e=>{if(phase==='play'&&e.code==='Space'){ptr.down=1;ptr.x=SW/2;ptr.y=SH/2;cur.tap&&cur.tap(gs,SW/2,SH/2);}});addEventListener('keyup',e=>{if(e.code==='Space')ptr.down=0;});
// ---------- UI ----------
const css=document.createElement('style');css.textContent=`.mbtn{width:100%;max-width:340px;font-size:20px}.pv{display:block}@media (max-height:720px){.pv{display:none}}.lbrow{display:flex;justify-content:space-between;padding:4px;border-bottom:1px solid rgba(255,255,255,.1);font-weight:700}.lbrow.me{color:#ffd23f}.tabs{display:flex;gap:8px}.tabs button{font-size:15px;padding:10px 18px;margin:0}.tabs button.off{background:#3a2a48;box-shadow:0 6px 0 #1e1428}@media (max-height:700px){#rankCard>div:last-child{display:none}}@media (max-height:700px){#beatBanner{padding:6px 10px!important;font-size:13px}#beatBanner button{padding:6px 18px!important;margin-top:4px!important}}#beatBanner{background:#ff4fa3;border-radius:14px;padding:10px 14px;font-weight:900;max-width:340px;width:100%;box-sizing:border-box}#sOv.endbg,#over{background:radial-gradient(circle at 50% 22%,#6a2d96 0,#2a1440 45%,#160c1e 100%)!important}
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
const goMenu=()=>{paused=0;pzBtn.style.display='none';hide();sc.style.display='none';phase='off';state='menu';renderMenu();start.classList.remove('hidden');};
// ---------- pause / home during a shift ----------
let paused=0;const pzBtn=document.createElement('button');pzBtn.id='pzBtn';pzBtn.innerHTML='<span style="display:inline-block;width:5px;height:18px;background:#fff;border-radius:2px;margin:0 2.5px"></span><span style="display:inline-block;width:5px;height:18px;background:#fff;border-radius:2px;margin:0 2.5px"></span>';pzBtn.setAttribute('aria-label','Pause');pzBtn.style.cssText='position:fixed;z-index:6;top:max(10px,env(safe-area-inset-top));left:12px;width:48px;height:48px;border-radius:50%;padding:0;margin:0;font-size:22px;background:rgba(26,18,32,.85);border:2px solid #ffd23f;color:#fff;box-shadow:0 4px 0 #0c0810;display:none';document.body.appendChild(pzBtn);
setInterval(()=>{pzBtn.style.display=state==='shift'&&!paused&&['intro','play','result','pass'].includes(phase)&&ov.classList.contains('hidden')?'block':'none';},250);
pzBtn.addEventListener('pointerdown',e=>e.stopPropagation());
pzBtn.onclick=()=>{if(paused||phase==='off')return;paused=1;ptr.down=0;window.dsMusicOff&&dsMusicOff();const sc2=run.score||0,est=run.mode==='duo'?0:Math.floor(sc2/15);
 show(`<div class="lbl">PAUSED</div><h1 style="font-size:40px;margin:0">ON BREAK</h1><div class="card" style="font-size:16px;line-height:1.5">Score so far: <b>${sc2}</b>${est?`<br>You keep about <b style="color:#7cff6b">$${est}+</b> if you head home`:''}</div>
 <button id="pzGo" class="wide" style="width:100%;max-width:320px">▶ RESUME</button><button id="pzHome" class="ghost" style="width:100%;max-width:320px">🏠 HOME · KEEP MY EARNINGS</button>`);
 $('pzGo').onclick=()=>{hide();paused=0;lastT=performance.now();};
 $('pzHome').onclick=()=>{hide();paused=0;if(run.mode==='duo'||run.mode==='vs'&&!run.cleared){goMenu();return;}endRun();goMenu();};};
document.addEventListener('visibilitychange',()=>{if(document.hidden&&state==='shift'&&phase==='play'&&!paused)pzBtn.onclick();});
function launch(mode,diff,rush,seed,target){try{AC=AC||new(window.AudioContext||window.webkitAudioContext)();AC.resume&&AC.resume();}catch(e){}
 hide();start.classList.add('hidden');state='shift';sc.style.display='block';rs();newRun(mode,diff,seed||(Math.random()*1e9|0));run.target=target||0;run.rush=!!(rush&&window.dsRush&&window.dsRush());bag=[];intro();lastT=performance.now();requestAnimationFrame(frame);}
function howTo(go){if(S.smTut)return go();show(`<div class="lbl">HOW SHIFT MODE WORKS</div><h1 style="font-size:36px">QUICK<br>ORDERS</h1><div class="card" style="font-size:16px;line-height:1.5">⚡ Short mini-games, one after another<br>📋 Each one shows what to do before it starts<br>✅ Win = points &nbsp; ❌ Fail = lose a ❤️<br>❤️❤️❤️ 3 lives · it slowly speeds up<br>🐢 First time on each game = practice speed</div><button id="htGo">GOT IT</button>`);$('htGo').onclick=()=>{S.smTut=1;save();go();};}
$('smBtn').onclick=()=>howTo(()=>launch('shift'));
$('dailyBtn').onclick=()=>{const d=dayKey(),done=S.dailyDay===d;show(`<div class="lbl">📅 DAILY SHIFT</div><h1 style="font-size:40px">${d}</h1><p>Same orders, same speed, for everyone today. Your best run goes on the daily board.</p>${done?`<p style="color:#7cff6b;font-weight:800">Today's best: ${S.dailyBest||0}</p>`:''}<button id="dGo">CLOCK IN</button><button class="ghost" id="dBack">BACK</button>`);$('dGo').onclick=()=>howTo(()=>launch('daily'));$('dBack').onclick=hide;};
$('vsBtn').onclick=()=>{show(`<div class="lbl">🤖 VS AI OPPONENT</div><canvas id="botPv" class="pv" width="140" height="130"></canvas><p>Play a computer opponent on the same orders. You see them play live. First one out of lives loses.</p><button data-d="easy" style="background:#2bb673;box-shadow:0 6px 0 #1a7a4c">EASY</button><button data-d="normal">NORMAL</button><button data-d="hard" style="background:#6a1fb3;box-shadow:0 6px 0 #3d1068">HARD</button><button class="ghost" id="vBack">BACK</button>`);
 drawPv($('botPv'),()=>bot(70,80,42,'happy'));
 ov.querySelectorAll('[data-d]').forEach(b=>b.onclick=()=>howTo(()=>launch('vs',b.dataset.d)));$('vBack').onclick=hide;};
// ---------- end of run ----------
function endRun(){phase='off';const r=run,prev={rank:S.rank};
 const stm=r.mode==='daily'?1:1+.25*stN(),pm=perks().decor,rm=r.rush?3:1,coins=Math.round(Math.floor(r.score/15)*stm*pm*rm)+(r.mode==='vs'&&r.lives>0?150:0),xp=r.cleared*10+(r.mode==='vs'&&r.lives>0?40:0);S.coins+=coins;S.xp+=xp;const L=['+$'+coins+' to your wallet · +'+xp+' XP'];if(stm>1)L.push('⭐ x'+stm.toFixed(2)+' star bonus');if(rm>1)L.push('🔥 RUSH x3');
 while(S.rank<RANKS.length&&S.xp>=xpNeed(S.rank)){S.xp-=xpNeed(S.rank);S.rank++;L.push('⭐ RANK UP: '+RANKS[S.rank-1].n+'!');}
 S.smBest=S.smBest||0;let nb=0;if(r.mode!=='vs'&&r.score>S.smBest){S.smBest=r.score;nb=1;}
 if(r.mode==='daily'){const d=dayKey();if(S.dailyDay!==d){S.dailyDay=d;S.dailyBest=0;}if(r.score>S.dailyBest){S.dailyBest=r.score;L.push('New daily best!');}}
 if(nb)L.push('NEW SHIFT MODE BEST!');if(S.beatTarget){L.push(r.score>S.beatTarget?'🎯 CHALLENGE BEATEN by '+(r.score-S.beatTarget)+'!':'🎯 Short of the challenge by '+(S.beatTarget-r.score));S.beatTarget=0;}save();window.gcScore&&gcScore(r.mode,r.score);
 let head='SHIFT OVER',win=0,chips=[`✅ ${r.cleared} orders`,`⚡ x${rate().toFixed(2)}`];if(r.mode==='vs'){win=r.lives>0||(r.botLives<=0&&r.score>=r.botScore);head=win?'YOU BEAT '+r.ai.n.toUpperCase()+'!':r.ai.n.toUpperCase()+' WINS';chips=[`You ${r.score}`,`${r.ai.e} ${r.botScore}`];}else if(r.mode==='ch'&&r.target){win=r.score>r.target;head=win?'CHALLENGE WON!':'SO CLOSE…';chips=[`You ${r.score}`,`Them ${r.target}`];}else chips.push(`🏆 Best ${S.smBest}`);
 const rew=`<b>+$${coins}</b> · <b>+${xp} XP</b>`+L.slice(1).map(x=>`<span class="pill">${x}</span>`).join('');
 show(`<div class="endbox"><div class="stamp ${win?'ok':''}">${head}</div><canvas id="endPv"></canvas><div class="bub">"${pk(ROAST.over)}"</div>
 <div class="scard"><div class="slbl">SCORE</div><div class="sbig">${r.score}</div><div class="chips">${chips.map(c=>`<span>${c}</span>`).join('')}</div></div>
 <div class="rew">${rew}</div>${r.mode!=='vs'?`<div id="subBox" style="width:100%"></div>`:''}
 ${coins>0&&!['ch'].includes(r.mode)?`<button id="eAd" class="wide" style="background:#2bb673;box-shadow:0 6px 0 #1a7a4c">▶ WATCH AD · DOUBLE IT (+$${coins})</button>`:''}${r.mode==='ch'?'<button id="eShare2" class="wide" style="background:#2fd3ff;color:#1a1220;box-shadow:0 6px 0 #1a8fb0">📨 SEND THIS CHALLENGE</button>':''}<button id="eAgain" class="wide">${r.mode==='vs'?'REMATCH':'CLOCK BACK IN'}</button><div class="erow"><button class="ghost" id="eShare">🔗 CHALLENGE</button><button class="ghost" id="eMenu">🏠 MENU</button></div></div>`);ov.classList.add('endbg');
 const hh=cl(SH*.16,70,140);drawPv($('endPv'),()=>r.mode==='vs'&&!win?emo(r.ai.e,hh*.6,hh*.55,hh*.7):manager(hh*.6,hh*.42,hh*.34,win?'happy':'mad'),hh*1.2,hh);
 $('eAgain').onclick=()=>launch(r.mode,r.diff,r.rush,r.mode==='ch'&&r.target?r.seed:0,r.target);if($('eShare2'))$('eShare2').onclick=()=>shareScore(r);if($('eAd'))$('eAd').onclick=async()=>{const b=$('eAd');b.disabled=true;if(window.dsRewardAd){b.textContent='Loading ad…';const ok=await dsRewardAd();if(ok){S.coins+=coins;save();b.textContent='✓ +$'+coins+' ADDED';buzz&&buzz([20,30,20]);}else b.textContent='No ad right now · try next shift';return;}let n=3;const tk=()=>{b.textContent='AD · '+n+'  (placeholder until ads go live)';if(n--<=0){S.coins+=coins;save();b.textContent='✓ +$'+coins+' ADDED';buzz&&buzz([20,30,20]);return;}setTimeout(tk,1000);};tk();};$('eMenu').onclick=goMenu;$('eShare').onclick=()=>shareScore(r);
 if(r.mode!=='vs')subUI(r);sc.style.display='none';}
function drawPv(cv2,fn,w=140,h=120){const d=Math.min(devicePixelRatio||1,2);cv2.width=w*d;cv2.height=h*d;cv2.style.width=w+'px';cv2.style.height=h+'px';const sv=C;C=cv2.getContext('2d');C.scale(d,d);try{fn();}finally{C=sv;}}
// ---------- leaderboard ----------
const API=(location.protocol.startsWith('http')&&location.hostname.endsWith('vercel.app')?'':'https://dont-spill-rho.vercel.app')+'/api/scores';
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
window.dsFetchLB=fetchLB;window.dsShow=show;window.dsHide=hide;
const esc=s=>String(s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
$('lbBtn').onclick=()=>openLB('all');
{const ov2=$('over'),cv3=document.createElement('canvas');ov2.insertBefore(cv3,ov2.firstChild);const so=window.showOver;window.showOver=function(){so();const h=cl(innerHeight*.14,60,120);drawPv(cv3,()=>manager(h*.6,h*.42,h*.34,lastWon?'happy':'mad'),h*1.2,h);};}
// ---------- beat my score ----------
async function shareScore(r){const n=S.lbName||'A friend',m=r.mode==='daily'?'daily':'shift',u=location.origin+location.pathname+(r.mode==='ch'?'?ch='+r.seed+'&s='+r.score+'&by='+encodeURIComponent(n):'?beat='+r.score+'&by='+encodeURIComponent(n)+'&m='+m);
 const txt=r.mode==='ch'?`🍸 DON'T SPILL: I scored ${r.score}. Same exact orders for you. Beat me:`:r.mode==='vs'?`🍸 DON'T SPILL: I scored ${r.score} vs ${r.ai.n}. Your turn:`:`🍸 DON'T SPILL: I scored ${r.score} in ${m==='daily'?"today's Daily Shift":'Shift Mode'}. Beat my score:`;
 try{if(navigator.share){await navigator.share({title:"Don't Spill",text:txt,url:u});return;}await navigator.clipboard.writeText(txt+' '+u);$('eShare').textContent='LINK COPIED!';}catch(e){}}
{const q=new URLSearchParams(location.search),chs=+q.get('ch'),cs=+q.get('s');if(chs>0){const by=cleanName(q.get('by'))||'A friend';const bb=$('beatBanner');bb.innerHTML=`⚔️ ${esc(by)} challenged you! Same orders, beat ${cs}.<br><button id="chGo" style="margin-top:8px;font-size:18px;padding:10px 24px">ACCEPT</button>`;bb.classList.remove('hidden');$('chGo').onclick=()=>howTo(()=>launch('ch',null,0,chs,cs));}}
setTimeout(()=>{$('go').innerHTML='👥 FRIEND';$('go').onclick=()=>show(`<div class="lbl">👥 PLAY A FRIEND</div><h1 style="font-size:38px">WHO'S<br>BETTER?</h1><button id="fDuo" class="wide" style="width:100%;max-width:330px">📱 SAME PHONE</button><p style="font-size:13px">Take turns on the same mini-game. 3 lives each. Pass the phone.</p><button id="fOn" class="wide" style="width:100%;max-width:330px;background:#2fd3ff;color:#1a1220;box-shadow:0 6px 0 #1a8fb0">🌐 ONLINE CHALLENGE</button><p style="font-size:13px">Play a run, send the link. Your friend gets the exact same orders.</p><button class="ghost" id="fBack">BACK</button>`);
 document.addEventListener('click',e=>{if(e.target.id==='fDuo')howTo(()=>launch('duo'));if(e.target.id==='fOn')howTo(()=>launch('ch'));if(e.target.id==='fBack')hide();});$('vsBtn').innerHTML='🤖 VS AI';},0);
{const q=new URLSearchParams(location.search),b=+q.get('beat');if(b>0){const by=cleanName(q.get('by'))||'A friend',m=q.get('m')==='daily'?'daily':'shift';const bb=$('beatBanner');bb.innerHTML=`🎯 ${esc(by)} scored ${b} in ${m==='daily'?'the Daily Shift':'Shift Mode'}. Think you can beat it?<br><button id="beatGo" style="margin-top:8px;font-size:18px;padding:10px 24px">TAKE THE CHALLENGE</button>`;bb.classList.remove('hidden');$('beatGo').onclick=()=>{S.beatTarget=b;launch(m==='daily'?'daily':'shift');};}}
})();
