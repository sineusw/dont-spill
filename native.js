// ===== DON'T SPILL · native: AdMob rewarded ads, Game Center, local notifications =====
(()=>{
const CAP=window.Capacitor,NAT=CAP&&CAP.isNativePlatform&&CAP.isNativePlatform();if(!NAT)return;
const PL=n=>(CAP.registerPlugin?CAP.registerPlugin(n):CAP.Plugins[n]);
// ---- AdMob: swap these two test IDs for your real ones (also GADApplicationIdentifier in ios/App/App/Info.plist)
const AD_REWARD_ID='ca-app-pub-3940256099942544/1712485313',AD_TESTING=true;
const AM=PL('AdMob');let amReady=null;
const amInit=()=>amReady||(amReady=AM.initialize({initializeForTesting:AD_TESTING}).catch(()=>{}));amInit();
window.dsRewardAd=async()=>{try{await amInit();let rewarded=false;
 const h1=await AM.addListener('onRewardedVideoAdReward',()=>{rewarded=true;});
 const done=new Promise(res=>{AM.addListener('onRewardedVideoAdDismissed',()=>res()).then(h=>done.h2=h);AM.addListener('onRewardedVideoAdFailedToShow',()=>res()).then(h=>done.h3=h);});
 await AM.prepareRewardVideoAd({adId:AD_REWARD_ID,isTesting:AD_TESTING});
 window.dsMusicOff&&dsMusicOff();AM.showRewardVideoAd().catch(()=>{});
 await Promise.race([done,new Promise(r=>setTimeout(r,120000))]);
 [h1,done.h2,done.h3].forEach(h=>h&&h.remove&&h.remove());return rewarded;}catch(e){return false;}};
// ---- Game Center
const GC=PL('GameCenter'),LB_ID='dontspill.shift.best';let gcOk=false;
setTimeout(()=>GC.signIn().then(r=>{gcOk=!!(r&&r.authenticated);if(gcOk&&S.smBest)GC.submitScore({leaderboardId:LB_ID,score:S.smBest|0}).catch(()=>{});}).catch(()=>{}),1500);
window.gcScore=(mode,score)=>{if(mode!=='shift'||!score)return;const go=()=>GC.submitScore({leaderboardId:LB_ID,score:score|0}).catch(()=>{});gcOk?go():GC.signIn().then(r=>{gcOk=!!(r&&r.authenticated);if(gcOk)go();}).catch(()=>{});};
window.gcShow=()=>{const go=()=>GC.showLeaderboard({leaderboardId:LB_ID}).catch(()=>{});gcOk?go():GC.signIn().then(r=>{gcOk=!!(r&&r.authenticated);if(gcOk)go();}).catch(()=>{});};
// ---- Local notifications: Dinner Rush (12pm + 5pm, daily) and daily reward (10am)
const LN=PL('LocalNotifications');
const nextAt=(h,dayOff)=>{const d=new Date();d.setDate(d.getDate()+dayOff);d.setHours(h,0,0,0);return d;};
async function schedule(){try{const p=await LN.checkPermissions();const pend=await LN.getPending();if(pend.notifications.length)await LN.cancel({notifications:pend.notifications.map(n=>({id:n.id}))});
 if(p.display!=='granted'||!S.set||!S.set.notif)return;
 const claimed=S.login&&S.login.day===new Date().toDateString(),N=[];
 N.push({id:101,title:'🔥 Dinner Rush in 5 minutes',body:'Tips are x2 and Rush Shifts pay 3×. Clock in!',schedule:{on:{hour:11,minute:55},allowWhileIdle:true}});
 N.push({id:102,title:'🔥 Dinner Rush in 5 minutes',body:'The evening rush is about to hit. Tips x2 for two hours.',schedule:{on:{hour:16,minute:55},allowWhileIdle:true}});
 for(let i=0;i<7;i++){const at=nextAt(10,i);if(at<=new Date()||(i===0&&claimed))continue;N.push({id:200+i,title:'🎁 Your daily reward is ready',body:'Your diner kept earning while you were gone. Come collect.',schedule:{at}});}
 await LN.schedule({notifications:N});}catch(e){}}
window.dsNotifAsk=async()=>{try{let p=await LN.checkPermissions();if(p.display!=='granted')p=await LN.requestPermissions();S.set.notif=p.display==='granted'?1:0;save();await schedule();return !!S.set.notif;}catch(e){return false;}};
document.addEventListener('visibilitychange',()=>{if(document.hidden)schedule();});schedule();

// ---- In-app purchases (StoreKit 2 via PettyStore plugin)
const ST=PL('PettyStore'),IAP={mgr:'com.pettygames.dontspill.manager8h',tips:'com.pettygames.dontspill.tips4h'};
window.dsIAP={ids:IAP,prices:{},ready:false,
 async load(){try{const r=await ST.products({ids:Object.values(IAP)});for(const p of r.products)this.prices[p.id]=p.price;this.ready=r.products.length>0;}catch(e){}},
 price(k,d){return this.prices[IAP[k]]||d;},
 async buy(k){try{const r=await ST.purchase({id:IAP[k]});if(r&&r.ok){window.dsGrant&&dsGrant(k);return 'ok';}return r&&r.cancelled?'cancel':r&&r.pending?'pending':'fail';}catch(e){return 'fail';}},};
dsIAP.load();
})();
