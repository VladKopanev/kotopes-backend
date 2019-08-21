import * as admin     from 'firebase-admin';
import * as functions from 'firebase-functions';

admin.initializeApp();

exports.addMessage = functions.https.onRequest( async (req, resp) => {
    const original = req.query.text;
    const snapshot = admin.database().ref('/messages').push({original: original});

    resp.redirect(303, snapshot.ref.toString());
});

exports.makeUppercase = functions.database.ref('/messages/{pushId}/original').onCreate((snapshot, ctx) => {
    const original = snapshot.val();
    console.log('Uppercasing', ctx.params.pushId, original);
    const uppercase = original.toUpperCase();

    return snapshot.ref.parent!.child('uppercase').set(uppercase);
});
