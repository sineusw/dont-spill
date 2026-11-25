"""Create Don't Spill in-app purchases in App Store Connect (idempotent). Runs in GitHub Actions."""
import os,time,json,hashlib,sys,requests,jwt
KID=os.environ['ASC_KEY_ID'];ISS=os.environ['ASC_ISSUER_ID'];KEY=os.environ['ASC_KEY_PATH'];APP='6838657045'
B='https://api.appstoreconnect.apple.com'
def tok():return jwt.encode({'iss':ISS,'iat':int(time.time()),'exp':int(time.time())+1100,'aud':'appstoreconnect-v1'},open(KEY).read(),algorithm='ES256',headers={'kid':KID})
def api(m,p,**kw):
    r=requests.request(m,B+p,headers={'Authorization':'Bearer '+tok(),'Content-Type':'application/json'},**kw)
    if r.status_code>=400:print('!!',m,p,r.status_code,r.text[:800])
    return r
PRODUCTS=[
 dict(pid='com.pettygames.dontspill.manager8h',name='Night Manager 8 Hours',type='CONSUMABLE',price='0.99',dn='Night Manager · 8 Hours',desc='Earn 100% of your restaurant income while away for 8 hours.'),
 dict(pid='com.pettygames.dontspill.tips4h',name='Tip Runner 4 Hours',type='CONSUMABLE',price='0.99',dn='Tip Runner · 4 Hours',desc='A Tip Runner collects every table coin for you for 4 hours.'),
 dict(pid='com.pettygames.dontspill.staffpass',name='Staff Pass',type='NON_CONSUMABLE',price='4.99',dn='Staff Pass',desc='Night Manager and Tip Runner on duty forever, in every city.')]
exist={}
r=api('GET',f'/v1/apps/{APP}/inAppPurchasesV2?limit=200')
for d in r.json().get('data',[]):exist[d['attributes']['productId']]=d
terr=[t['id'] for t in api('GET','/v1/territories?limit=200').json()['data']]
shot='store/iap-review.png';shotb=open(shot,'rb').read()
for P in PRODUCTS:
    print('==',P['pid'])
    if P['pid'] in exist:iid=exist[P['pid']]['id'];print('exists',iid,exist[P['pid']]['attributes'].get('state'))
    else:
        r=api('POST','/v2/inAppPurchases',json={'data':{'type':'inAppPurchases','attributes':{'name':P['name'],'productId':P['pid'],'inAppPurchaseType':P['type'],'reviewNote':'Purchase from the Night Manager / Tip Runner screens (Build > Manager or Tip Runner buttons). Consumables add time; Staff Pass makes both permanent.','familySharable':False},'relationships':{'app':{'data':{'type':'apps','id':APP}}}}})
        iid=r.json()['data']['id'];print('created',iid)
    # localization
    loc=api('GET',f'/v2/inAppPurchases/{iid}/inAppPurchaseLocalizations').json().get('data',[])
    if not any(l['attributes']['locale']=='en-US' for l in loc):
        api('POST','/v1/inAppPurchaseLocalizations',json={'data':{'type':'inAppPurchaseLocalizations','attributes':{'locale':'en-US','name':P['dn'],'description':P['desc']},'relationships':{'inAppPurchaseV2':{'data':{'type':'inAppPurchases','id':iid}}}}})
    # price
    sched=api('GET',f'/v2/inAppPurchases/{iid}/iapPriceSchedule')
    if sched.status_code!=200 or not sched.json().get('data'):
        pp=None;url=f'/v2/inAppPurchases/{iid}/pricePoints?filter[territory]=USA&limit=200'
        while url and not pp:
            j=api('GET',url).json()
            for d in j.get('data',[]):
                if d['attributes']['customerPrice']==P['price']:pp=d['id'];break
            nxt=j.get('links',{}).get('next');url=nxt.replace(B,'') if nxt else None
        print('pricepoint',pp)
        if pp:api('POST','/v1/inAppPurchasePriceSchedules',json={'data':{'type':'inAppPurchasePriceSchedules','relationships':{'inAppPurchase':{'data':{'type':'inAppPurchases','id':iid}},'baseTerritory':{'data':{'type':'territories','id':'USA'}},'manualPrices':{'data':[{'type':'inAppPurchasePrices','id':'${p1}'}]}}},'included':[{'type':'inAppPurchasePrices','id':'${p1}','attributes':{'startDate':None},'relationships':{'inAppPurchasePricePoint':{'data':{'type':'inAppPurchasePricePoints','id':pp}}}}]})
    # availability
    av=api('GET',f'/v2/inAppPurchases/{iid}/inAppPurchaseAvailability')
    if av.status_code!=200 or not av.json().get('data'):
        api('POST','/v1/inAppPurchaseAvailabilities',json={'data':{'type':'inAppPurchaseAvailabilities','attributes':{'availableInNewTerritories':True},'relationships':{'inAppPurchase':{'data':{'type':'inAppPurchases','id':iid}},'availableTerritories':{'data':[{'type':'territories','id':t} for t in terr]}}}})
    # review screenshot
    rs=api('GET',f'/v2/inAppPurchases/{iid}/appStoreReviewScreenshot')
    if rs.status_code!=200 or not rs.json().get('data'):
        r=api('POST','/v1/inAppPurchaseAppStoreReviewScreenshots',json={'data':{'type':'inAppPurchaseAppStoreReviewScreenshots','attributes':{'fileName':'iap-review.png','fileSize':len(shotb)},'relationships':{'inAppPurchaseV2':{'data':{'type':'inAppPurchases','id':iid}}}}})
        if r.status_code<300:
            d=r.json()['data'];sid=d['id']
            for op in d['attributes']['uploadOperations']:
                part=shotb[op['offset']:op['offset']+op['length']]
                requests.request(op['method'],op['url'],headers={h['name']:h['value'] for h in op['requestHeaders']},data=part)
            api('PATCH',f'/v1/inAppPurchaseAppStoreReviewScreenshots/{sid}',json={'data':{'type':'inAppPurchaseAppStoreReviewScreenshots','id':sid,'attributes':{'uploaded':True,'sourceFileChecksum':hashlib.md5(shotb).hexdigest()}}})
    st=api('GET',f'/v2/inAppPurchases/{iid}').json()['data']['attributes'].get('state');print('STATE',P['pid'],st)
# agreement hint
print('Done.')
