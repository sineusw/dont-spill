// ===== DON'T SPILL · MY RESTAURANT (polished scene, tap-to-collect, star rating) =====
(()=>{
const TAU=Math.PI*2,OL='#2a1a2e';let BT=0,lt=performance.now(),bot=0,wallH=0;
const THEMES={diner:{name:'Classic Diner',cost:0,ic:'🍔',wall:['#ffe0b8','#f6b97f'],trim:['#8f2c38','#b8434f'],floor:['#e8d3b0','#f7ead2'],tile:'rgba(122,42,50,.16)',cloth:'rgba(214,48,58,.75)',sign:"DON'T SPILL DINER",signC:'#d6303a',lamp:'#2bb673'},
 sushi:{name:'Sushi Bar',cost:1500,ic:'🍣',wall:['#f6ead5','#e2cfa8'],trim:['#2a2a38','#4a4a5a'],floor:['#c9a46a','#e0c08a'],tile:'rgba(90,50,20,.16)',cloth:'rgba(40,40,60,.75)',sign:"DON'T SPILL SUSHI",signC:'#2a2a38',lamp:'#d6303a',lantern:1},
 steak:{name:'Steakhouse',cost:3000,ic:'🥩',wall:['#7a4a2a','#4a2a18'],trim:['#1f4a32','#2c6346'],floor:['#3a2418','#5a3a24'],tile:'rgba(0,0,0,.22)',cloth:'rgba(255,255,255,.0)',sign:"DON'T SPILL STEAKHOUSE",signC:'#1f4a32',lamp:'#b8860b'}};
const ROOMS={patio:{name:'Patio',ic:'🌴',cost:750,per:4,tb:200,g:1.5,mult:1.5,wall:null,floor:['#cfc6b8','#ece5d8'],tile:'rgba(80,70,60,.16)',cloth:'rgba(47,184,163,.75)',sign:'THE PATIO',signC:'#2fb8a3',lamp:'#ffd23f'},
 vip:{name:'VIP Lounge',ic:'💎',cost:2500,per:10,tb:500,g:1.6,mult:3,wall:['#4a2470','#2a1440'],trim:['#b8860b','#e0a91a'],floor:['#4a1f3a','#6a2d56'],tile:'rgba(255,215,0,.08)',cloth:'rgba(184,134,11,.8)',sign:'VIP LOUNGE',signC:'#b8860b',lamp:'#e0a91a'}};
S.rooms=S.rooms||{patio:{own:0,tables:0},vip:{own:0,tables:0}};S.theme=S.theme||'diner';S.themes=S.themes||['diner'];S.view=S.view||'main';
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
const P=(u,v)=>({x:W/2+u*(W*.30+W*.16*v),y:wallH+(bot-wallH)*(.06+.88*v),s:(.62+.5*v)*Math.min(1.25,Math.max(.8,W/390))});
const SKIN=['#8d5524','#c68642','#f1c27d','#5c3a1e','#e0ac69'],HAIR=['#2a1a2e','#5a3a1e','#b8860b','#7a2a32','#1d1d26','#d9d9d9'],SHIRT=['#ff5a3c','#2fd3ff','#7cff6b','#ffd23f','#b07cff','#ff7ab8','#2bb673'];
// ---------- stars ----------
const prog=()=>Object.values(S.tab).reduce((a,b)=>a+b,0)-1+S.decor.length;
const STAR=[2,6,11,17,24];const stars=()=>STAR.filter(n=>prog()>=n).length;
window.dsStars=()=>stars();const NEWG=[3,3,2,2,2];
const starStr=n=>'★'.repeat(n)+'☆'.repeat(5-n);
// ---------- runtime ----------
let bubs={},fly=[],fx=[],pops=[],celeb=null,sig='';
const tables=()=>{const a=[];const cols=[-.85,-.3,.3,.85];for(let r=0;r<2;r++)for(let c=0;c<4;c++)a.push({u:cols[c],v:r?.8:.3,i:r*4+c});return a;};
function coinVal(){return Math.max(2,Math.round((S.tab.tables*2+S.tab.waiter*6)*boost()*.35/Math.max(1,S.tab.tables)+2));}
// ---------- characters ----------
function person(x,y,s,k,mood,bob=0,seated=0){const sk=SKIN[k%5],hc=HAIR[k%6],sh=SHIRT[k%7];y+=bob;
 if(!seated){cx.fillStyle='#2a2a38';cx.beginPath();cx.roundRect(x-7*s,y-2*s,6*s,16*s,3*s);cx.roundRect(x+1*s,y-2*s,6*s,16*s,3*s);cx.fill();}
 cx.fillStyle=sh;cx.beginPath();cx.roundRect(x-12*s,y-24*s,24*s,26*s,10*s);cx.fill();ink(2.5);
 el(x,y-34*s,11*s,11*s,sk,2.5);cx.fillStyle=hc;cx.beginPath();cx.arc(x,y-37*s,11.5*s,Math.PI*1.05,-.05);cx.fill();
 cx.fillStyle=OL;const bl=(BT*1.3+k)%4<.12;if(bl){cx.fillRect(x-6*s,y-34*s,4*s,1.6*s);cx.fillRect(x+2*s,y-34*s,4*s,1.6*s);}else{cx.beginPath();cx.arc(x-4*s,y-33.5*s,1.8*s,0,TAU);cx.arc(x+4*s,y-33.5*s,1.8*s,0,TAU);cx.fill();}
 cx.strokeStyle=OL;cx.lineWidth=1.8*s;cx.beginPath();if(mood==='eat'){cx.arc(x,y-28*s,2.6*s,0,TAU);}else cx.arc(x,y-30*s,3.5*s,.2*Math.PI,.8*Math.PI);cx.stroke();
 cx.fillStyle='rgba(255,120,120,.45)';cx.beginPath();cx.arc(x-7*s,y-30*s,2.2*s,0,TAU);cx.arc(x+7*s,y-30*s,2.2*s,0,TAU);cx.fill();}
function staff(x,y,s,k,role,ph){const walk=Math.sin(ph*9),sk=SKIN[k%5];shadow(x,y+15*s,15*s,5*s);
 cx.strokeStyle='#1d1d26';cx.lineWidth=6*s;cx.lineCap='round';cx.beginPath();cx.moveTo(x-5*s,y);cx.lineTo(x-5*s+walk*3*s,y+13*s);cx.moveTo(x+5*s,y);cx.lineTo(x+5*s-walk*3*s,y+13*s);cx.stroke();
 const shirt=role==='bus'?'#2fb8d3':role==='host'?'#ff5a3c':'#fff';cx.fillStyle=shirt;cx.beginPath();cx.roundRect(x-12*s,y-24*s,24*s,27*s,9*s);cx.fill();ink(2.5);
 if(role==='wait'){cx.fillStyle='#1d1d26';cx.fillRect(x-12*s,y-20*s,7*s,22*s);cx.fillRect(x+5*s,y-20*s,7*s,22*s);cx.fillStyle='#d6303a';cx.beginPath();cx.moveTo(x-4*s,y-23*s);cx.lineTo(x+4*s,y-23*s);cx.lineTo(x,y-17*s);cx.fill();}
 el(x,y-34*s,11*s,11*s,sk,2.5);cx.fillStyle=HAIR[k%6];cx.beginPath();cx.arc(x,y-37*s,11.5*s,Math.PI*1.05,-.05);cx.fill();
 cx.fillStyle=OL;cx.beginPath();cx.arc(x-4*s,y-33.5*s,1.8*s,0,TAU);cx.arc(x+4*s,y-33.5*s,1.8*s,0,TAU);cx.fill();cx.strokeStyle=OL;cx.lineWidth=1.8*s;cx.beginPath();cx.arc(x,y-30*s,3.5*s,.2*Math.PI,.8*Math.PI);cx.stroke();
 if(role==='wait'){cx.strokeStyle=sk;cx.lineWidth=5*s;cx.beginPath();cx.moveTo(x+10*s,y-18*s);cx.lineTo(x+18*s,y-30*s);cx.stroke();el(x+18*s,y-33*s,13*s,3.5*s,'#dfe6ee',2);
  cx.fillStyle=GC[k%GC.length];cx.beginPath();cx.moveTo(x+13*s,y-48*s);cx.lineTo(x+21*s,y-48*s);cx.lineTo(x+20*s,y-36*s);cx.lineTo(x+14*s,y-36*s);cx.closePath();cx.fill();ink(1.5);}
 if(role==='bus'){cx.strokeStyle='#8a6a3a';cx.lineWidth=3*s;cx.beginPath();cx.moveTo(x+12*s,y-20*s);cx.lineTo(x+20*s+Math.sin(ph*6)*4*s,y+12*s);cx.stroke();el(x+20*s+Math.sin(ph*6)*4*s,y+14*s,9*s,4*s,'#e8e8e8',2);}}
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
 const wx=W*.36,ww=W*.28,wy=wallH*.3,wh=wallH*.42;cx.fillStyle='#7a4a2a';cx.beginPath();cx.roundRect(wx-6,wy-6,ww+12,wh+12,10);cx.fill();ink(3);sky(wx,wy,ww,wh);cx.fillStyle='#7a4a2a';cx.fillRect(wx+ww/2-2,wy,4,wh);cx.fillRect(wx,wy+wh/2-2,ww,4);
 cx.fillStyle='rgba(255,255,255,.25)';cx.beginPath();cx.moveTo(wx+8,wy+wh-6);cx.lineTo(wx+28,wy+6);cx.lineTo(wx+40,wy+6);cx.lineTo(wx+20,wy+wh-6);cx.fill();
 cx.fillStyle='#d6303a';for(let i=0;i<7;i++){cx.beginPath();cx.moveTo(wx-8+i*(ww+16)/7,wy-8);cx.lineTo(wx-8+(i+1)*(ww+16)/7,wy-8);cx.lineTo(wx-8+(i+.5)*(ww+16)/7,wy+10);cx.fill();}
 // wainscot
 cx.fillStyle=th.trim[0];cx.fillRect(0,wallH*.8,W,wallH*.2);cx.fillStyle=th.trim[1];cx.fillRect(0,wallH*.8,W,5);cx.fillStyle='rgba(0,0,0,.15)';for(let x=12;x<W;x+=40)cx.fillRect(x,wallH*.84,26,wallH*.13);
 // bar (left)
 const bx=8,bw=W*.3;cx.fillStyle='#6b3d22';cx.fillRect(bx,wallH*.22,bw,5);for(let i=0;i<6;i++){const c=GC[i%GC.length];cx.fillStyle=c;cx.beginPath();cx.roundRect(bx+8+i*(bw-16)/6,wallH*.22-22,9,22,3);cx.fill();ink(1.5);cx.fillStyle=c;cx.fillRect(bx+11+i*(bw-16)/6,wallH*.22-30,3,9);}
 if(S.tab.bartender){const by=wallH*.66+Math.sin(BT*3)*2;person(bx+bw*.5,by,.8,3,'',0,1);cx.save();cx.translate(bx+bw*.5+14,by-26);cx.rotate(Math.sin(BT*14)*.5);cx.fillStyle='#c9d3dc';cx.beginPath();cx.roundRect(-5,-12,10,18,3);cx.fill();ink(1.5);cx.restore();}
 g=cx.createLinearGradient(0,wallH*.62,0,wallH+14);g.addColorStop(0,'#a8683e');g.addColorStop(1,'#6b3d22');cx.fillStyle=g;cx.beginPath();cx.roundRect(bx,wallH*.6,bw,wallH*.4+14,6);cx.fill();ink(3);cx.fillStyle='#c98a58';cx.beginPath();cx.roundRect(bx-4,wallH*.58,bw+8,9,4);cx.fill();ink(2.5);
 if(vip){cx.fillStyle='#7a1f3a';for(const d of[0,1]){const x0=d?W*.66:W*.34;cx.beginPath();cx.moveTo(x0,wallH*.25);cx.quadraticCurveTo(x0+(d?-1:1)*W*.06,wallH*.5,x0,wallH*.8);cx.lineTo(x0+(d?1:-1)*20,wallH*.8);cx.lineTo(x0+(d?1:-1)*20,wallH*.25);cx.fill();}}
 if(!vip){
 // kitchen pass (right)
 const kx=W*.68,kw=W*.3,ky=wallH*.28,kh=wallH*.4;cx.fillStyle='#c9d3dc';cx.beginPath();cx.roundRect(kx-5,ky-5,kw+10,kh+10,8);cx.fill();ink(3);g=cx.createLinearGradient(0,ky,0,ky+kh);g.addColorStop(0,'#ffcf7a');g.addColorStop(1,'#e88a3a');cx.fillStyle=g;cx.fillRect(kx,ky,kw,kh);
 const hy=ky+kh*.55+Math.sin(BT*2.5)*3;el(kx+kw*.5,hy,10,10,'#f1c27d',2);cx.fillStyle='#fff';cx.beginPath();cx.roundRect(kx+kw*.5-9,hy-22,18,12,3);cx.fill();ink(1.5);el(kx+kw*.5,hy-24,11,7,'#fff',1.5);
 for(let i=0;i<3;i++){const ph=(BT*.6+i*.33)%1;cx.fillStyle=`rgba(255,255,255,${.5*(1-ph)})`;cx.beginPath();cx.arc(kx+kw*.25+i*kw*.25,ky+kh-ph*kh,5+ph*7,0,TAU);cx.fill();}
 cx.fillStyle='#a8b4bf';cx.fillRect(kx-8,ky+kh,kw+16,8);ink(2);el(kx+kw-14,ky+kh-4,8,6,'#f2c230',2);
 }else{for(const fx0 of[.82]){cx.fillStyle='#e0a91a';cx.beginPath();cx.roundRect(W*fx0-30,wallH*.28,60,46,4);cx.fill();ink(3);cx.fillStyle='#2a1440';cx.fillRect(W*fx0-24,wallH*.28+6,48,34);el(W*fx0,wallH*.28+23,9,12,'#ffd23f',0);}}
 }
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
 cx.font='900 15px system-ui';cx.fillStyle='#ffd23f';cx.strokeStyle=OL;cx.lineWidth=3;cx.strokeText(starStr(st),W/2,y+h+10);cx.fillText(starStr(st),W/2,y+h+10);cx.textBaseline='alphabetic';}
// ---------- tables ----------
function tableDraw(t,act,next){const p=P(t.u,t.v),s=p.s,x=p.x,y=p.y;
 if(!act){if(next){const a=.55+.35*Math.sin(BT*4);cx.setLineDash([6,5]);cx.strokeStyle=`rgba(122,42,50,${a})`;cx.lineWidth=3;cx.beginPath();cx.ellipse(x,y,32*s,13*s,0,0,TAU);cx.stroke();cx.setLineDash([]);
   const c=S.view==='main'?upCost(UPS[0]):rtCost(S.view),ok=S.coins>=c;cx.fillStyle=ok?'#2bb673':'#9a8a96';cx.beginPath();cx.roundRect(x-30*s,y-26*s,60*s,22*s,11*s);cx.fill();ink(2.5);cx.fillStyle='#fff';cx.font=`900 ${12*s}px system-ui`;cx.textAlign='center';cx.fillText('+ $'+c,x,y-11*s);t.hit={x,y:y-14*s,r:34*s,buy:1};}return;}
 shadow(x+3*s,y+10*s,40*s,12*s);
 // chairs + guests
 const gs=guest(t),eat=(BT+t.i)%5<2;for(const d of[-1,1]){const cxp=x+d*36*s;cx.fillStyle=S.view==='vip'?'#7a1f3a':'#6b3d22';cx.beginPath();cx.roundRect(cxp-10*s,y-30*s,20*s,34*s,6*s);cx.fill();ink(2);const k=gs.party[d<0?0:1];if(gs.st==='seated'&&k!=null)person(cxp,y-2*s,s*.85,k,eat&&d<0?'eat':'',Math.sin(BT*2+k)*1.2*s,1);}
 // table
 cx.fillStyle='#4a2a18';cx.fillRect(x-3*s,y-4*s,6*s,14*s);el(x,y+10*s,12*s,4*s,'#4a2a18',2);
 el(x,y-6*s,30*s,12*s,'#fff',2.5);cx.save();cx.beginPath();cx.ellipse(x,y-6*s,30*s,12*s,0,0,TAU);cx.clip();cx.fillStyle='rgba(214,48,58,.75)';for(let i=-30;i<30;i+=10)cx.fillRect(x+i*s,y-18*s,5*s,24*s);cx.restore();
 cx.fillStyle='#fff';cx.beginPath();for(let i=0;i<=10;i++){const a=Math.PI*(i/10);cx.arc(x-Math.cos(a)*30*s,y-6*s+Math.sin(a)*12*s,3.5*s,0,TAU);}cx.fill();
 el(x-9*s,y-8*s,7*s,3*s,'#eef2f6',1.5);el(x+9*s,y-5*s,7*s,3*s,'#eef2f6',1.5);cx.fillStyle='#e08a2a';cx.beginPath();cx.arc(x-9*s,y-9*s,3.5*s,Math.PI,TAU);cx.fill();
 cx.fillStyle=GC[t.i%GC.length];cx.beginPath();cx.roundRect(x+6*s,y-17*s,6*s,10*s,2*s);cx.fill();ink(1.2);
 if(S.view==='patio'){cx.fillStyle='#8a6a3a';cx.fillRect(x-1.5*s,y-70*s,3*s,62*s);const uc=['#ff5a3c','#2fb8a3','#ffd23f'][t.i%3];for(let i=0;i<6;i++){cx.fillStyle=i%2?'#fff':uc;cx.beginPath();cx.moveTo(x,y-82*s);cx.lineTo(x-44*s+i*14.7*s,y-62*s);cx.lineTo(x-44*s+(i+1)*14.7*s,y-62*s);cx.closePath();cx.fill();}cx.beginPath();cx.moveTo(x,y-82*s);cx.lineTo(x+44*s,y-62*s);cx.lineTo(x-44*s,y-62*s);cx.closePath();ink(2.5);}
 // bubble emoji
 const ph=(BT*.35+t.i*.37)%3;if(ph<.9){cx.globalAlpha=Math.min(1,ph*4,(0.9-ph)*4);const e=['😋','❤️','⭐','🍔','👍'][(t.i+Math.floor(BT*.35))%5];cx.fillStyle='#fff';cx.beginPath();cx.roundRect(x-30*s-12,y-66*s,26,24,8);cx.fill();ink(2);cx.font='15px system-ui';cx.textAlign='center';cx.textBaseline='middle';cx.fillText(e,x-30*s+1,y-66*s+12);cx.textBaseline='alphabetic';cx.globalAlpha=1;}
 // coin bubble
 const b=bubs[key(t)]||(bubs[key(t)]={});t.hit=null;if(b.ready){const by=y-62*s+Math.sin(BT*4+t.i)*4,pul=1+Math.sin(BT*7)*.06;cx.save();cx.globalAlpha=.35;el(x+10*s,by,22*s*pul,22*s*pul,'#ffd23f',0);cx.restore();el(x+10*s,by,15*s*pul,15*s*pul,'#ffd23f',3);el(x+10*s,by,10*s,10*s,'#ffe680',0);cx.fillStyle='#b8860b';cx.font=`900 ${15*s}px system-ui`;cx.textAlign='center';cx.textBaseline='middle';cx.fillText('$',x+10*s,by+1);cx.textBaseline='alphabetic';t.hit={x:x+10*s,y:by,r:30*s};}}

// ---------- guest lifecycle ----------
const guests={};const key=t=>S.view+':'+t.i;const ENT={u:1.55,v:.62};
function guest(t){const k=key(t);return guests[k]||(guests[k]=Math.random()<.6?{st:'seated',t:rand(3,14),party:party()}:{st:'empty',t:rand(.5,5),party:party()});}
function party(){const a=Math.random()*40|0,b=Math.random()<.7?Math.random()*40|0:null;return Math.random()<.5?[a,b]:[b,a];}
function stepGuests(T){const dt=1/60,sp=isRush()?1.8:1;for(const t of T){const g=guest(t);g.t-=dt*sp;
 if(g.st==='empty'&&g.t<=0){g.st='in';g.p=0;g.party=party();if(g.party[0]==null&&g.party[1]==null)g.party[0]=7;}
 else if(g.st==='in'){g.p+=dt*sp/2.6;if(g.p>=1){g.st='seated';g.t=rand(9,16);}}
 else if(g.st==='seated'&&g.t<=0){g.st='out';g.p=0;const b=bubs[key(t)]||(bubs[key(t)]={});b.ready=1;}
 else if(g.st==='out'){g.p+=dt*sp/2.6;if(g.p>=1){g.st='empty';g.t=rand(1,4);}}}}
function walkers(T){const out=[];for(const t of T){const g=guest(t);if(g.st!=='in'&&g.st!=='out')continue;[0,1].forEach(j=>{const k=g.party[j];if(k==null)return;const d=j?1:-1,f=g.st==='in'?g.p:1-g.p,e=f<.5?2*f*f:1-Math.pow(-2*f+2,2)/2,lag=j*.08;
  const ff=cl(e-lag,0,1),u=lerp(ENT.u,t.u+d*.13,ff),v=lerp(ENT.v,t.v+.02,ff),p=P(u,v);out.push({y:p.y,f:()=>{shadow(p.x,p.y+14*p.s*.85,12*p.s,4*p.s);person(p.x,p.y+Math.abs(Math.sin(BT*9+j))*-3,p.s*.85,k,'',0,0);}});});}return out;}
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
 const sh=$('build');bot=menuBg||sh.classList.contains('hidden')?H:Math.max(H*.4,sh.getBoundingClientRect().top+18);wallH=Math.min(bot*.36,190);
 const night=room();
 // light pools
 cx.save();cx.globalCompositeOperation='lighter';for(const lx of[.2,.5,.8]){const x=W*lx,g=cx.createRadialGradient(x,wallH*.25,4,x,wallH*.6,bot*.5);g.addColorStop(0,'rgba(255,220,150,.32)');g.addColorStop(1,'rgba(255,220,150,0)');cx.fillStyle=g;cx.fillRect(0,0,W,bot);}cx.restore();
 lights();sign();
 // depth-sorted entities
 const T=tables(),E=[],n=nTables();T.forEach((t,i)=>E.push({y:P(t.u,t.v).y,f:()=>tableDraw(t,i<n,i===n&&n<8)}));stepGuests(T.slice(0,n));for(const w of walkers(T.slice(0,n)))E.push(w);
 const pos=T.slice(0,Math.max(1,n)).map(t=>P(t.u,t.v+.1));
 for(let w=0;w<S.tab.waiter;w++){const L=pos.length,u=(BT*.18+w*.37)%1*L,a=pos[Math.floor(u)%L],b=pos[(Math.floor(u)+1)%L],f=u%1,e=f<.5?2*f*f:1-Math.pow(-2*f+2,2)/2,x=lerp(a.x,b.x,e),y=lerp(a.y,b.y,e)+16*a.s;E.push({y,f:()=>staff(x,y,lerp(a.s,b.s,e)*.9,w*2+1,'wait',BT+w)});}
 if(S.tab.busboy){const v=.55,u=Math.sin(BT*.35)*.95,p=P(u,v);E.push({y:p.y,f:()=>staff(p.x,p.y,p.s*.9,4,'bus',BT)});}
 if(S.tab.host){const p=P(-1.18,.62);E.push({y:p.y,f:()=>{podium(-1.18,.62);staff(p.x+16*p.s,p.y-2,p.s*.9,2,'host',0);}});}
 const mainV=S.view==='main';if(S.view==='patio'||(mainV&&S.decor.includes('plants'))){for(const [u,v] of[[-1.2,.98],[1.2,.98],[-1.1,.02],[1.1,.02]]){const p=P(u,v);E.push({y:p.y,f:()=>plant(u,v)});}}
 if(mainV&&S.decor.includes('jukebox')){const p=P(1.17,.45);E.push({y:p.y,f:()=>jukebox(1.17,.45)});}
 if((mainV&&S.decor.includes('fountain'))||S.view==='vip'){const p=P(0,.55);E.push({y:p.y,f:()=>fountain(0,.55)});}
 entrance();E.sort((a,b)=>a.y-b.y).forEach(e=>e.f());
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
 if(celeb){celeb.l-=dt;const a=cl(celeb.l,0,1),sc=1+Math.max(0,celeb.l-2.3)*2;cx.globalAlpha=a;cx.fillStyle='rgba(20,10,25,.55)';cx.fillRect(0,0,W,bot);cx.save();cx.translate(W/2,bot*.42);cx.scale(sc,sc);cx.font='900 30px system-ui';cx.textAlign='center';cx.lineWidth=7;cx.strokeStyle=OL;cx.strokeText(celeb.t,0,0);cx.fillStyle='#ffd23f';cx.fillText(celeb.t,0,0);cx.font='900 18px system-ui';cx.lineWidth=5;cx.strokeText(celeb.s,0,34);cx.fillStyle='#7cff6b';cx.fillText(celeb.s,0,34);cx.restore();cx.globalAlpha=1;if(celeb.l<=0)celeb=null;}
};
function confetti(x,y,n=40){for(let i=0;i<n;i++){const a=Math.random()*TAU,v=150+Math.random()*300;fx.push({x,y,vx:Math.cos(a)*v,vy:Math.sin(a)*v-200,l:1+Math.random(),c:['#ffd23f','#ff4fa3','#2fd3ff','#7cff6b','#ff5a3c'][i%5]});}}
// taps on the scene
cv.addEventListener('pointerdown',e=>{if(state!=='build')return;const x=e.clientX,y=e.clientY;
 for(const h of hits)if(Math.hypot(x-h.x,y-h.y)<h.r){if(h.room){S.view=h.room;save();return;}if(h.lock){bTab='rooms';renderBuild();return;}if(h.buy){if(S.view!=='main'){buyRT(S.view);return;}const b=document.querySelector('#ups [data-u="tables"]');if(b)b.click();else{bTab='staff';renderBuild();const b2=document.querySelector('#ups [data-u="tables"]');b2&&b2.click();}return;}
  bubs[h.k].ready=0;const v=Math.round(coinVal()*(ROOMS[S.view]?ROOMS[S.view].mult:1)*(isRush()?2:1));for(let k=0;k<Math.min(6,2+v/4|0);k++)fly.push({x:h.x+(Math.random()-.5)*20,y:h.y,t:-k*.06,v:k?0:v});pops.push({x:h.x,y:h.y-20,t:'+$'+v,l:1});snd(1500,.08,'square',.08);buzz(8);S.taps=(S.taps||0)+1;save();return;}});
let hits=[];const _tb=tableDraw;
// collect hit targets each frame
const _bs=window.buildScene;window.buildScene=function(m){hits=[];_bs(m);};
// wrap tableDraw to record hits
tableDraw=function(t,act,next){_tb(t,act,next);if(t.hit)hits.push({...t.hit,k:key(t)});};
// ---------- panel ----------
const ICON={tables:'🍽️',waiter:'🤵',host:'🙋',bartender:'🍸',busboy:'🧹',plants:'🪴',lights:'💡',neon:'🌟',jukebox:'🎵',fountain:'⛲'};
const css=document.createElement('style');css.textContent=`#build{background:linear-gradient(180deg,#3a2350,#1a1220 60%)!important;box-shadow:0 -8px 30px rgba(0,0,0,.5);border-top:3px solid #ffd23f}
.ugrid{display:grid;grid-template-columns:1fr 1fr;gap:8px;width:100%;max-width:380px}
.ucard{all:unset;box-sizing:border-box;cursor:pointer;background:linear-gradient(180deg,#fff8e6,#ffe7bd);color:#2a1a2e;border:3px solid #2a1a2e;border-radius:16px;padding:6px 8px 7px;display:grid;grid-template-columns:auto 1fr;grid-template-rows:auto auto auto;column-gap:7px;align-items:center;box-shadow:0 4px 0 #2a1a2e;position:relative}
.ucard:active{transform:translateY(3px);box-shadow:0 1px 0 #2a1a2e}.ucard{text-align:left}.ucard .ic{grid-row:1/4;font-size:26px}.ucard b{font:900 14px system-ui;line-height:1.1;margin-right:38px;white-space:nowrap}.ucard small{font:700 10.5px system-ui;opacity:.75;line-height:1.15}
.ucard .pr{position:absolute;top:-9px;right:-6px;background:#2bb673;color:#fff;font:900 12px system-ui;padding:3px 8px;border-radius:999px;border:2.5px solid #2a1a2e}.ucard.no .pr{background:#8a7a86}.ucard.max .pr{background:#ffd23f;color:#2a1a2e}.ucard.no{filter:saturate(.6)}
.pips{display:flex;gap:3px}.pips i{width:9px;height:9px;border-radius:50%;background:#e2cfae;border:1.5px solid #2a1a2e}.pips i.on{background:#ff5a3c}
.starbar{font:800 12px system-ui;color:#ffd23f;display:flex;align-items:center;gap:8px;width:100%;max-width:380px}.starbar .tr{flex:1;height:8px;background:rgba(255,255,255,.15);border-radius:4px;overflow:hidden}.starbar .tr div{height:100%;background:linear-gradient(90deg,#ffd23f,#ff8a3d)}
#collect.glow{animation:gl 1s infinite alternate}@keyframes gl{to{box-shadow:0 6px 0 #a8321e,0 0 18px #ffd23f}}
#start{background:linear-gradient(180deg,rgba(20,10,25,.25),rgba(20,10,25,.6) 35%,rgba(20,10,25,.88))!important}`;document.head.appendChild(css);
window.renderBuild=function(){const st=stars(),pr=prog(),nx=STAR[st],pv=st?STAR[st-1]:0;
 const sg=JSON.stringify(S.tab)+S.decor.join();if(sig&&sig!==sg){confetti(W/2,(bot||H*.4)*.5,50);pops.push({x:W/2,y:(bot||H*.4)*.45,t:'UPGRADED!',l:1.2,c:'#7cff6b'});}sig=sg;
 S.starAw=S.starAw||0;if(st>S.starAw){const bonus=st*100;S.coins+=bonus;S.starAw=st;save();celeb={t:'⭐ '+st+'-STAR DINER!',s:'+$'+bonus+' · '+NEWG[st-1]+' new mini-games!',l:3};confetti(W/2,(bot||H*.4)*.4,90);[523,659,784,1047].forEach((f,i)=>setTimeout(()=>snd(f,.2,'triangle',.14),i*110));}
 $('wallet3').textContent='$'+S.coins;const pd=pending();$('collect').textContent=pd>0?'COLLECT $'+pd:'COLLECTED ✓';$('collect').classList.toggle('glow',pd>0);
 $('rate').outerHTML=`<div id="rate" class="starbar"><span>${starStr(st)}</span><div class="tr"><div style="width:${nx?Math.round((pr-pv)/(nx-pv)*100):100}%"></div></div><span>${nx?(nx-pr)+' to ★'+(st+1)+' · +'+NEWG[st]+' games':'ALL GAMES'}</span></div>`;
 const card=(k,name,lv,mx,eff,cost,isD)=>{const max=isD?lv:lv>=mx,can=!max&&S.coins>=cost;return `<button class="ucard ${max?'max':can?'':'no'}" data-${isD?'d':'u'}="${k}"><span class="ic">${ICON[k]}</span><b>${name}</b>${isD?'<small>+5% tips · decor</small>':`<span class="pips">${Array.from({length:mx},(_,i)=>`<i class="${i<lv?'on':''}"></i>`).join('')}</span>`}${isD?'':`<small>${eff}</small>`}<span class="pr">${max?(isD?'OWNED':'MAX'):'$'+cost}</span></button>`;};
 if(!$('tRooms')){const tb=$('tStaff').parentNode;tb.insertAdjacentHTML('beforeend','<button id="tRooms" class="ghost" style="margin:0;font-size:14px;padding:8px 14px">ROOMS</button><button id="tStyle" class="ghost" style="margin:0;font-size:14px;padding:8px 14px">STYLE</button>');$('tRooms').onclick=()=>{bTab='rooms';renderBuild();};$('tStyle').onclick=()=>{bTab='style';renderBuild();};tb.querySelectorAll('button').forEach(b=>{b.style.padding='8px 12px';b.style.fontSize='13px';});}
 $('ups').className='ugrid';$('ups').style.cssText='';
 if(bTab==='rooms'||bTab==='style'){const C2=(attr,ic,name,mid,price,can,max)=>`<button class="ucard ${max?'max':can?'':'no'}" ${attr}><span class="ic">${ic}</span><b>${name}</b>${mid}<span class="pr">${price}</span></button>`;
  $('ups').innerHTML=bTab==='rooms'?Object.entries(ROOMS).map(([r,R])=>{const o=S.rooms[r];if(!o.own)return C2(`data-r="${r}"`,R.ic,R.name,`<small>New room + its own mini-game<br>+$${R.per}/min per table · tips x${R.mult}</small>`,'$'+R.cost,S.coins>=R.cost,0);const mx=o.tables>=8,c=rtCost(r);return C2(`data-rt="${r}"`,R.ic,R.name,`<span class="pips">${Array.from({length:8},(_,i)=>`<i class="${i<o.tables?'on':''}"></i>`).join('')}</span><small>+1 table · +$${R.per}/min</small>`,mx?'MAX':'$'+c,S.coins>=c,mx);}).join('')+C2('data-go="main"','🏠','Main Room','<small>'+(S.view==='main'?'Viewing now':'Tap to view')+'</small>',S.view==='main'?'HERE':'GO',1,S.view==='main')
  :Object.entries(THEMES).map(([k,T])=>{const own=S.themes.includes(k),on=S.theme===k;return C2(`data-th="${k}"`,T.ic,T.name,`<small>${on?'In use':own?'Tap to use':'New look for the main room'}</small>`,on?'USING':own?'OWNED':'$'+T.cost,own||S.coins>=T.cost,on);}).join('');
  ['tStaff','tDecor','tRooms','tStyle'].forEach(id=>$(id).className=(id==='t'+bTab[0].toUpperCase()+bTab.slice(1))?'':'ghost');return;}
 if($('tRooms')){$('tRooms').className='ghost';$('tStyle').className='ghost';}
 $('ups').innerHTML=bTab==='decor'?DECOR.map(d=>card(d.k,d.name,S.decor.includes(d.k),1,'',d.cost,1)).join(''):UPS.map(u=>{const l=S.tab[u.k];return card(u.k,u.name,l,u.max,u.eff(Math.min(u.max,l+(l<u.max?1:0))).replace('/min idle','/min'),upCost(u),0);}).join('');
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
})();
