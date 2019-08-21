import * as admin     from 'firebase-admin';
import * as functions from 'firebase-functions';

admin.initializeApp();

const firestore = admin.firestore();

exports.addMessage = functions.region('europe-west1').https.onRequest( async (req, resp) => {
    const original = req.query.text;
    await firestore.collection('messages').add({original: original});

    resp.end();
});

exports.makeUppercase = functions.region('europe-west1').firestore.document('/messages/{pushId}').onCreate((snapshot, ctx) => {
    const original = snapshot.data()!.original;
    console.log('Uppercasing', ctx.params.pushId, original);

    return snapshot.ref.update('uppercase', original.toUpperCase());
});
