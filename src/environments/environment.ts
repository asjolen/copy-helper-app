// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  name: "Copybot",
  api: "http://127.0.0.1:8000",
  sessionKey: "session:key:",
  imageKitPublicKey: "public_DfcG/RuZtJpPCnju3M34DI5+EB8=",

  auth0: {
    domain: "copybot.eu.auth0.com",
    clientId: "7TYJdelR0r3hifpxJc5TbwDtYf9RUUYq",
    audience: "copybot.auth0",
  },

  firebase: {
    projectId: "copybot-4b0d0",
    appId: "1:834833953925:web:96fa1b6ad7ca77bab0a5ec",
    databaseURL: "https://copybot-4b0d0-default-rtdb.europe-west1.firebasedatabase.app",
    storageBucket: "copybot-4b0d0.appspot.com",
    apiKey: "AIzaSyANqsIP4A3O4oFNrvowWNVgEWGnrBRqoqY",
    authDomain: "copybot-4b0d0.firebaseapp.com",
    messagingSenderId: "834833953925",
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
