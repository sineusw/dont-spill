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
