var functions = require('firebase-functions');

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
//});
exports.helloWord = functions.https.onRequest((request, response) => {

})


exports.calculateVotes = functions.database
  .ref('custom/{pushId}')
  .onWrite(event => {
    const post = event.data.val()
    if(post.sanitized){
      return
    }
    post.sanitized = true
    post.title = sanatize(post.title)
    post.body = sanatize(post.body)
    return event.data.ref.set(post)
  })
