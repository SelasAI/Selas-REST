const test = require('firebase-functions-test')();

const myFunctions = require('../index.js');

const wrapped = test.wrap(myFunctions.getServiceList);

getServiceList.post('').json({"app_id": "16ac187a-dc29-49bb-ad4a-67343583fb97", 
  "key": "DcMQo=Ns(yOP&iLu", 
  "secret": "jhCdH@g%v(wY2q17",})

getAddOnList.post('').json({"app_id": "16ac187a-dc29-49bb-ad4a-67343583fb97", 
  "key": "DcMQo=Ns(yOP&iLu", 
  "secret": "jhCdH@g%v(wY2q17",})

  
