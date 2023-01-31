# Selas-REST


Install firebase tools

```
npm install -g firebase-tools 
```

Set an emulator to test the functions
```
firebase emulators:start
```

```
firebase functions:shell
```



getServiceList.post('').json({"app_id": TEST_APP_ID, 
  "key": TEST_APP_KEY,
  "secret": TEST_APP_SECRET,})

getAddOnList.post('').json({"app_id": TEST_APP_ID, 
  "key": TEST_APP_KEY,
  "secret": TEST_APP_SECRET,})

createAppUser.post('').json({"app_id": TEST_APP_ID, 
  "key": TEST_APP_KEY,
  "secret": TEST_APP_SECRET,
  "external_id": "test_user_1",})

isUser.post('').json({"app_id": TEST_APP_ID,
  "key": TEST_APP_KEY,
  "secret": TEST_APP_SECRET,
  "external_id": "test_user_2",})

createToken.post('').json({"app_id": TEST_APP_ID,
"key": TEST_APP_KEY,
"secret": TEST_APP_SECRET,
"app_user_external_id": "test_user_1",})

deleteAllTokenOfAppUser.post('').json({"app_id": TEST_APP_ID,
"key": TEST_APP_KEY,
"secret": TEST_APP_SECRET,
"app_user_external_id": "test_user_1",})

getAppUserToken.post('').json({"app_id": TEST_APP_ID,
"key": TEST_APP_KEY,
"secret": TEST_APP_SECRET,
"app_user_external_id": "test_user_1",})

setCredit.post('').json({"app_id": TEST_APP_ID,
"key": TEST_APP_KEY,
"secret": TEST_APP_SECRET,
"app_user_external_id": "test_user_1",
"amount": 352,})

getAppUserCredits.post('').json({"app_id": TEST_APP_ID,
"key": TEST_APP_KEY,
"secret": TEST_APP_SECRET,
"app_user_external_id": "test_user_1",})

getAppUserJobHistory.post('').json({"app_id": TEST_APP_ID,
"key": TEST_APP_KEY,
"secret": TEST_APP_SECRET,
"app_user_external_id": "test_user_1",
"p_limit": 10,
"p_offset": 0,})

/***************  ADD-ONS METHODS  ***************/

shareAddOn.post('').json({"app_id": TEST_APP_ID,
"key": TEST_APP_KEY,
"secret": TEST_APP_SECRET,
"add_on_name": "noggles-blip57",
"app_user_external_id": "test_user_1",})

deleteAddOn.post('').json({"app_id": TEST_APP_ID,
"key": TEST_APP_KEY,
"secret": TEST_APP_SECRET,
"add_on_name": "f-crampoute3",})

renameAddOn.post('').json({"app_id": TEST_APP_ID,
"key": TEST_APP_KEY,
"secret": TEST_APP_SECRET,
"add_on_name": "f-crampoute15",
"new_add_on_name": "f-crampoute15bis",})

publishAddOn.post('').json({"app_id": TEST_APP_ID,
"key": TEST_APP_KEY,
"secret": TEST_APP_SECRET,
"add_on_name": "f-beepboop",})

unpublishAddOn.post('').json({"app_id": TEST_APP_ID,
"key": TEST_APP_KEY,
"secret": TEST_APP_SECRET,
"add_on_name": "f-beepboop",})

/***************  JOB METHODS  ***************/

costStableDiffusion.post('').json({"app_id": TEST_APP_ID,
"key": TEST_APP_KEY,
"secret": TEST_APP_SECRET,
"prompt": "test prompt",
"batch_size": 4,})

runStableDiffusion.post('').json({"app_id": TEST_APP_ID,
"key": TEST_APP_KEY,
"secret": TEST_APP_SECRET,
"prompt": "test prompt"})


runPatchTrainer.post('').json({"app_id": TEST_APP_ID,
"key": TEST_APP_KEY,
"secret": TEST_APP_SECRET,
"dataset": dataset,
"patch_name": "rest_patch3",})


getCountActiveWorker.post('').json({"app_id": "16ac187a-dc29-49bb-ad4a-67343583fb97", 
  "key": "DcMQo=Ns(yOP&iLu", 
  "secret": "jhCdH@g%v(wY2q17"},)