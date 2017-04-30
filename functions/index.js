var functions = require('firebase-functions');

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
//});

exports.calculateVotes = functions.database
              .ref('custom/${vid}')
              .onWrite(event =>{
                const vid = event.params.vid
                const value = event.data.val().positive
                const root = event.data.ref.root
                return root.child('/custom/${pin_id}/positive').once('value')
              })
