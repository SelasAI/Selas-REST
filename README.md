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

getServiceList.post('').json({"app_id": "16ac187a-dc29-49bb-ad4a-67343583fb97", 
  "key": "DcMQo=Ns(yOP&iLu", 
  "secret": "jhCdH@g%v(wY2q17",})

getAddOnList.post('').json({"app_id": "16ac187a-dc29-49bb-ad4a-67343583fb97", 
  "key": "DcMQo=Ns(yOP&iLu", 
  "secret": "jhCdH@g%v(wY2q17",})

runStableDiffusion.post('').json({"app_id": "16ac187a-dc29-49bb-ad4a-67343583fb97", 
  "key": "DcMQo=Ns(yOP&iLu", 
  "secret": "jhCdH@g%v(wY2q17",
  "prompt": "Maleficient secret",
  "batch_size": 4,})




getCountActiveWorker.post('').json({"app_id": "16ac187a-dc29-49bb-ad4a-67343583fb97", 
  "key": "DcMQo=Ns(yOP&iLu", 
  "secret": "jhCdH@g%v(wY2q17"})