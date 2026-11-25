"""App Store Connect status / metadata / submission for Don't Spill. Runs in GitHub Actions."""
import os,time,json,sys,requests,jwt
KID=os.environ['ASC_KEY_ID'];ISS=os.environ['ASC_ISSUER_ID'];KEY=os.environ['ASC_KEY_PATH'];APP='6838657045'
B='https://api.appstoreconnect.apple.com';MODE=os.environ.get('MODE','status')
def tok():return jwt.encode({'iss':ISS,'iat':int(time.time()),'exp':int(time.time())+1100,'aud':'appstoreconnect-v1'},open(KEY).read(),algorithm='ES256',headers={'kid':KID})
def api(m,p,**kw):
    r=requests.request(m,B+p if p.startswith('/') else p,headers={'Authorization':'Bearer '+tok(),'Content-Type':'application/json'},**kw)
    if r.status_code>=400:print('!!',m,p,r.status_code,r.text[:900])
    return r
def g(p):return api('GET',p).json()
import hashlib,glob
SITE='https://dont-spill-rho.vercel.app'
DESC='''Run the busiest diner in town without spilling a drop!

Don't Spill is a fast, funny restaurant game. Play quick mini-games to serve guests, earn tips, and grow a run-down diner into a five-star hot spot.

PLAY 27 MINI-GAMES
Stack glasses, pour the perfect drink, flip pancakes, swat flies, toss pizza dough, fillet fish, stir gumbo and more. Every order gets faster, and your boss has a roast ready for every spill.

BUILD YOUR RESTAURANT
Add tables, hire servers, a host, a bartender, bussers and food runners, and watch your staff seat guests, take orders and clear tables on their own. Unlock a patio and a VIP room, and restyle your place.

ROAD TRIP ACROSS AMERICA
Take your skills from Nashville to Miami, New Orleans, Austin and New York. Every city has its own restaurant, food, look and new mini-games.

BEAT THE BOSS
Think you can do the Boss's job? Play an order, then watch the Boss play the exact same one. First one out of hearts loses.

MORE TO DO
• Daily Shift: same orders for everyone, every day
• Challenge friends with a link, or pass the phone for 2 players
• Game Center leaderboard
• Dress your server in outfits and fancy glasses
• Hire a Night Manager to keep earning while you're away

No account needed. Your progress stays on your device.'''
META=dict(description=DESC,keywords='restaurant,waiter,diner,cooking,tycoon,idle,serving,food,mini games,arcade,chef,cafe,tips',promotionalText="Road trip update! Run diners in Nashville, Miami, New Orleans, Austin and New York, then try to beat the Boss at his own job.",supportUrl=SITE+'/support.html',marketingUrl=SITE+'/support.html')
def metadata():
    v=[x for x in g(f'/v1/apps/{APP}/appStoreVersions?limit=10')['data'] if x['attributes']['appStoreState'] in('PREPARE_FOR_SUBMISSION','DEVELOPER_REJECTED','REJECTED','METADATA_REJECTED')][0];vid=v['id']
    api('PATCH',f'/v1/apps/{APP}',json={'data':{'type':'apps','id':APP,'attributes':{'contentRightsDeclaration':'DOES_NOT_USE_THIRD_PARTY_CONTENT'}}})
    loc=g(f'/v1/appStoreVersions/{vid}/appStoreVersionLocalizations')['data'][0]
    r=api('PATCH',f"/v1/appStoreVersionLocalizations/{loc['id']}",json={'data':{'type':'appStoreVersionLocalizations','id':loc['id'],'attributes':META}});print('version loc',r.status_code)
    info=[i for i in g(f'/v1/apps/{APP}/appInfos')['data'] if i['attributes']['state']!='READY_FOR_DISTRIBUTION'][0];iid=info['id']
    il=g(f'/v1/appInfos/{iid}/appInfoLocalizations')['data'][0]
    r=api('PATCH',f"/v1/appInfoLocalizations/{il['id']}",json={'data':{'type':'appInfoLocalizations','id':il['id'],'attributes':{'subtitle':'Serve Fast. Build Your Diner.','privacyPolicyUrl':SITE+'/privacy.html'}}});print('info loc',r.status_code)
    r=api('PATCH',f'/v1/appInfos/{iid}',json={'data':{'type':'appInfos','id':iid,'relationships':{'primaryCategory':{'data':{'type':'appCategories','id':'GAMES'}},'primarySubcategoryOne':{'data':{'type':'appCategories','id':'GAMES_CASUAL'}},'primarySubcategoryTwo':{'data':{'type':'appCategories','id':'GAMES_SIMULATION'}}}}});print('category',r.status_code)
    ar=g(f'/v1/appInfos/{iid}/ageRatingDeclaration')['data'];new={}
    for k in ar['attributes']:
        if k in('kidsAgeBand','ageRatingOverride','ageRatingOverrideV2','koreaAgeRatingOverride','koreaAgeRatingOverrideV2','developerAgeRatingInfoUrl','seventeenPlus'):continue
        new[k]=True if k=='advertising' else 'INFREQUENT_OR_MILD' if k=='alcoholTobaccoOrDrugUseOrReferences' else 'NONE'
    for attempt in range(6):
        r=requests.patch(B+f"/v1/ageRatingDeclarations/{ar['id']}",headers={'Authorization':'Bearer '+tok(),'Content-Type':'application/json'},json={'data':{'type':'ageRatingDeclarations','id':ar['id'],'attributes':new}})
        if r.status_code<300:print('age ok',new);break
        for e in r.json().get('errors',[]):
            d=e.get('detail','');k=e.get('source',{}).get('pointer','').split('/')[-1]
            if 'Expected a BOOLEAN' in d:new[k]=(k=='advertising')
            elif 'Expected a STRING' in d or 'Expected' in d and 'STRING' in d:new[k]='NONE'
            elif 'must provide a value' in d:new[k]='NONE'
            elif k in new and ('not' in d.lower() or 'invalid' in d.lower()):new.pop(k,None)
            print('age fix',k,d[:120])
    else:print('AGE FAILED',r.text[:1500])
    # price: free
    ps=g(f'/v1/appPriceSchedules/{APP}/manualPrices').get('data',[])
    if not ps:
        pp=[p for p in g(f'/v1/apps/{APP}/appPricePoints?filter[territory]=USA&limit=10')['data'] if p['attributes']['customerPrice'] in('0.0','0.00','0')][0]['id']
        r=api('POST','/v1/appPriceSchedules',json={'data':{'type':'appPriceSchedules','relationships':{'app':{'data':{'type':'apps','id':APP}},'baseTerritory':{'data':{'type':'territories','id':'USA'}},'manualPrices':{'data':[{'type':'appPrices','id':'${p0}'}]}}},'included':[{'type':'appPrices','id':'${p0}','attributes':{'startDate':None},'relationships':{'appPricePoint':{'data':{'type':'appPricePoints','id':pp}}}}]});print('price',r.status_code)
    # review details (copy contact from 99% Impossible)
    contact={'contactFirstName':'Winsor','contactLastName':'Sineus','contactEmail':'sineusw@gmail.com'}
    for a in g('/v1/apps?filter[bundleId]=com.pettygamesstudios.ninetynineimpossible')['data']:
        for vv in g(f"/v1/apps/{a['id']}/appStoreVersions?limit=5")['data']:
            d=g(f"/v1/appStoreVersions/{vv['id']}/appStoreReviewDetail").get('data')
            if d and d['attributes'].get('contactPhone'):contact.update({k:d['attributes'][k] for k in('contactFirstName','contactLastName','contactEmail','contactPhone') if d['attributes'].get(k)});break
    notes='No login needed. Tap SHIFT MODE to play the mini-games. BUILD opens the restaurant. In-app purchases (Night Manager 8 Hours and Tip Runner 4 Hours, $0.99 consumables) are in BUILD > MANAGER and BUILD > TIP RUNNER. VS BOSS plays a computer opponent. Game Center leaderboard is under TOP.'
    rd=g(f'/v1/appStoreVersions/{vid}/appStoreReviewDetail').get('data');att=dict(contact,demoAccountRequired=False,notes=notes)
    if rd:r=api('PATCH',f"/v1/appStoreReviewDetails/{rd['id']}",json={'data':{'type':'appStoreReviewDetails','id':rd['id'],'attributes':att}})
    else:r=api('POST','/v1/appStoreReviewDetails',json={'data':{'type':'appStoreReviewDetails','attributes':att,'relationships':{'appStoreVersion':{'data':{'type':'appStoreVersions','id':vid}}}}})
    print('review',r.status_code,'phone' if contact.get('contactPhone') else 'NO PHONE')
    api('PATCH',f'/v1/appStoreVersions/{vid}',json={'data':{'type':'appStoreVersions','id':vid,'attributes':{'copyright':'2026 Petty Games Studio','releaseType':'AFTER_APPROVAL'}}})
    # screenshots
    sets=g(f"/v1/appStoreVersionLocalizations/{loc['id']}/appScreenshotSets")['data'];st=[s for s in sets if s['attributes']['screenshotDisplayType']=='APP_IPHONE_67']
    if st:
        sid=st[0]['id']
        for old in g(f'/v1/appScreenshotSets/{sid}/appScreenshots')['data']:api('DELETE',f"/v1/appScreenshots/{old['id']}")
    else:sid=api('POST','/v1/appScreenshotSets',json={'data':{'type':'appScreenshotSets','attributes':{'screenshotDisplayType':'APP_IPHONE_67'},'relationships':{'appStoreVersionLocalization':{'data':{'type':'appStoreVersionLocalizations','id':loc['id']}}}}}).json()['data']['id']
    for f in sorted(glob.glob('store/shots/app_*.png')):
        b=open(f,'rb').read()
        r=api('POST','/v1/appScreenshots',json={'data':{'type':'appScreenshots','attributes':{'fileName':os.path.basename(f),'fileSize':len(b)},'relationships':{'appScreenshotSet':{'data':{'type':'appScreenshotSets','id':sid}}}}}).json()['data']
        for op in r['attributes']['uploadOperations']:
            requests.request(op['method'],op['url'],headers={h['name']:h['value'] for h in op['requestHeaders']},data=b[op['offset']:op['offset']+op['length']])
        x=api('PATCH',f"/v1/appScreenshots/{r['id']}",json={'data':{'type':'appScreenshots','id':r['id'],'attributes':{'uploaded':True,'sourceFileChecksum':hashlib.md5(b).hexdigest()}}});print('shot',f,x.status_code)
    # game center leaderboard
    gcd=g(f'/v1/apps/{APP}/gameCenterDetail')['data']['id']
    lbs=g(f'/v1/gameCenterDetails/{gcd}/gameCenterLeaderboards?limit=50')['data'];lb=[l for l in lbs if l['attributes'].get('vendorIdentifier')=='dontspill.shift.best']
    if lb:lid=lb[0]['id'];print('leaderboard exists')
    else:
        r=api('POST','/v1/gameCenterLeaderboards',json={'data':{'type':'gameCenterLeaderboards','attributes':{'referenceName':'Best Shift','vendorIdentifier':'dontspill.shift.best','defaultFormatter':'INTEGER','submissionType':'BEST_SCORE','scoreSortType':'DESC'},'relationships':{'gameCenterDetail':{'data':{'type':'gameCenterDetails','id':gcd}}}}});print('lb create',r.status_code);lid=r.json()['data']['id'] if r.status_code<300 else None
    if lid and not g(f'/v1/gameCenterLeaderboards/{lid}/localizations')['data']:
        print('lb loc',api('POST','/v1/gameCenterLeaderboardLocalizations',json={'data':{'type':'gameCenterLeaderboardLocalizations','attributes':{'locale':'en-US','name':'Best Shift','formatterSuffix':' pts','formatterSuffixSingular':' pt'},'relationships':{'gameCenterLeaderboard':{'data':{'type':'gameCenterLeaderboards','id':lid}}}}}).status_code)
    gv=g(f'/v1/appStoreVersions/{vid}/gameCenterAppVersion').get('data')
    if not gv:print('gc version',api('POST','/v1/gameCenterAppVersions',json={'data':{'type':'gameCenterAppVersions','relationships':{'appStoreVersion':{'data':{'type':'appStoreVersions','id':vid}}}}}).status_code)
    # attach newest valid build
    bd=g(f'/v1/builds?filter[app]={APP}&filter[processingState]=VALID&sort=-uploadedDate&limit=1')['data'][0]
    if bd['attributes'].get('usesNonExemptEncryption') is None:api('PATCH',f"/v1/builds/{bd['id']}",json={'data':{'type':'builds','id':bd['id'],'attributes':{'usesNonExemptEncryption':False}}})
    print('attach build',bd['attributes']['version'],api('PATCH',f'/v1/appStoreVersions/{vid}/relationships/build',json={'data':{'type':'builds','id':bd['id']}}).status_code)
if MODE in('metadata','submit'):metadata()
app=g(f'/v1/apps/{APP}')['data']['attributes'];print('APP',json.dumps(app)[:600])
for v in g(f'/v1/apps/{APP}/appStoreVersions?limit=10')['data']:
    a=v['attributes'];print('VERSION',v['id'],a.get('versionString'),a.get('appStoreState'),a.get('appVersionState'),a.get('releaseType'))
    for l in g(f"/v1/appStoreVersions/{v['id']}/appStoreVersionLocalizations")['data']:
        la=l['attributes'];print('  LOC',l['id'],la['locale'],{k:(len(x) if isinstance(x,str) else x) for k,x in la.items() if k!='locale'})
        for ss in g(f"/v1/appStoreVersionLocalizations/{l['id']}/appScreenshotSets")['data']:print('   SHOTSET',ss['attributes']['screenshotDisplayType'],len(g(f"/v1/appScreenshotSets/{ss['id']}/appScreenshots")['data']))
    b=g(f"/v1/appStoreVersions/{v['id']}/build").get('data');print('  BUILD',b and (b['id'],b['attributes'].get('version')))
    rd=g(f"/v1/appStoreVersions/{v['id']}/appStoreReviewDetail").get('data');print('  REVIEW',rd and rd['attributes'])
for i in g(f'/v1/apps/{APP}/appInfos')['data']:
    print('APPINFO',i['id'],i['attributes'])
    for l in g(f"/v1/appInfos/{i['id']}/appInfoLocalizations")['data']:print('  INFOLOC',l['id'],l['attributes'])
    for rel in ['primaryCategory','ageRatingDeclaration']:
        d=g(f"/v1/appInfos/{i['id']}/{rel}").get('data');print('  ',rel,d and (d['id'],d.get('attributes')))
for bd in g(f'/v1/builds?filter[app]={APP}&sort=-uploadedDate&limit=3')['data']:print('BUILDS',bd['id'],bd['attributes']['version'],bd['attributes']['processingState'],bd['attributes'].get('usesNonExemptEncryption'))
pr=api('GET',f'/v1/apps/{APP}/appPriceSchedule');print('PRICE',pr.status_code,pr.text[:300])
print('GC',api('GET',f'/v1/apps/{APP}/gameCenterDetail').text[:300])
