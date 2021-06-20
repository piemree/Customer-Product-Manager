
# customer-product-managment quick start 

## Initialize firebase for localhost


Open **firebaseConfig.js** and paste your firebase config
```bash

export default {
    apiKey: "***************-********",
    authDomain: "public-manager.firebaseapp.com",
    projectId: "public-manager",
    storageBucket: "public-manager.appspot.com",
    messagingSenderId: "***********",
    appId: "1:********:web:*********"
  };

# install dependencies
$ npm install

# serve with hot reload at localhost:3000
$ npm run dev

```
and project will work for localhost without admin.


## Set admin user locally


```bash
# create new folder
$ mkdir setAdmin

# go inside
$ cd setAdmin

# initialize npm
$ npm init

# install firebase-admin
$ npm i firebase-admin

# create app.js

# paste codes and run command
$ node app.js

const admin = require("firebase-admin");

//go firebase and create admin sdk key and paste there
const serviceAccount ={
  "type": "*************",
  "project_id": "***********",
  "private_key_id": "*************",
  "private_key": "*******",
  "client_email": "********",
  "client_id": "************",
  "auth_uri": "***************",
  "token_uri": "****************",
  "auth_provider_x509_cert_url": "*****************",
  "client_x509_cert_url": "**************"
}


admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: `https://${serviceAccount.project_id}-default-rtdb.firebaseio.com`,
});

 let uid = "*********"; //admin user id

admin
  .auth()
  .setCustomUserClaims(uid, { admin: true }) //if you want to change user status set admin=false
  .then((data) => {
    console.log(data);
  }); 

```








