const functions = require('firebase-functions');

var admin = require("firebase-admin");

var serviceAccount = require("./pushnotification-4f41a-firebase-adminsdk-66mb6-5514ad4cd8.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://pushnotification-4f41a.firebaseio.com"
});

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
exports.helloWorld = functions.https.onRequest((request, response) => {
 response.send("Hello from Firebase!");
});
exports.fcmSend = functions.database.ref('/messages/{userId}/{messageId}')
    .onCreate((event, context) => {
        console.log('event is', event);
        console.log('conext  is', context);
        console.log('event data is', event.val());
        console.log();
        const message = event.val();
        const userId = context.params.userId;

        const payload =  {
            notification: {
                title:message.title,
                body: message.body,
                icon: 'https://placeimg.com/250/250/people'
            }
        }

        admin.database().ref(`/fcmTokens/${userId}`)
             .once('value')
             .then( token => token.val())
             .then( userFcmToken => {
                 return admin.messaging().sendToDevice(userFcmToken,payload)
             // eslint-disable-next-line promise/always-return
             }).then( res => {
                 console.log('Sent successfully', res);
             }).catch(err => {
                 console.log('Couldnt send', err)
             });
    })
   